const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Order = require('../models/Order');

// Helper: format a course document to include instructor name and computed stats
const formatCourse = (course) => {
  const obj = course.toObject ? course.toObject({ virtuals: true }) : course;
  return {
    ...obj,
    instructor: obj.educator?.name || 'Unknown Instructor',
  };
};

// @desc    Get all published courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('educator', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses: courses.map(formatCourse),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('educator', 'name email');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({
      success: true,
      course: formatCourse(course),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new course (educator only)
// @route   POST /api/courses
// @access  Private (educator)
exports.createCourse = async (req, res) => {
  try {
    const { courseTitle, courseDescription, courseThumbnail, category, coursePrice, discount, chapters } = req.body;

    if (!courseTitle || coursePrice === undefined) {
      return res.status(400).json({ success: false, message: 'Course title and price are required' });
    }

    const course = await Course.create({
      courseTitle,
      courseDescription,
      courseThumbnail,
      category,
      coursePrice: parseFloat(coursePrice) || 0,
      discount: parseFloat(discount) || 0,
      educator: req.user._id,
      chapters: chapters || [],
    });

    await course.populate('educator', 'name email');

    res.status(201).json({
      success: true,
      course: formatCourse(course),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get educator's own courses with enrollment counts
// @route   GET /api/educator/courses
// @access  Private (educator)
exports.getEducatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ educator: req.user._id })
      .populate('educator', 'name email')
      .sort({ createdAt: -1 });

    // Get enrollment counts for each course
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const enrollmentCount = await Enrollment.countDocuments({
          course: course._id,
          paymentStatus: { $in: ['demo_paid', 'paid'] },
        });

        const orders = await Order.find({
          course: course._id,
          status: 'completed',
        });
        const earnings = orders.reduce((sum, o) => sum + o.amount, 0);

        const obj = formatCourse(course);
        return {
          ...obj,
          enrolledCount: enrollmentCount,
          earnings: parseFloat(earnings.toFixed(2)),
        };
      })
    );

    res.status(200).json({
      success: true,
      courses: coursesWithStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get educator dashboard stats
// @route   GET /api/educator/dashboard
// @access  Private (educator)
exports.getEducatorDashboard = async (req, res) => {
  try {
    // Get all educator's courses
    const myCourses = await Course.find({ educator: req.user._id })
      .populate('educator', 'name email')
      .sort({ createdAt: -1 });

    const myCourseIds = myCourses.map((c) => c._id);

    // Total earnings from completed orders
    const orders = await Order.find({
      course: { $in: myCourseIds },
      status: 'completed',
    });
    const totalEarnings = parseFloat(orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2));

    // Total unique enrolled students
    const enrollments = await Enrollment.find({
      course: { $in: myCourseIds },
      paymentStatus: { $in: ['demo_paid', 'paid'] },
    }).populate('student', 'name email');

    const uniqueStudentIds = new Set(enrollments.map((e) => e.student._id.toString()));
    const totalStudents = uniqueStudentIds.size;

    // Recent enrollments (last 20)
    const recentEnrollments = await Enrollment.find({
      course: { $in: myCourseIds },
      paymentStatus: { $in: ['demo_paid', 'paid'] },
    })
      .populate('student', 'name email')
      .populate('course', 'courseTitle chapters')
      .sort({ createdAt: -1 })
      .limit(20);

    const recentStudents = recentEnrollments.map((e) => {
      const totalLectures = (e.course?.chapters || []).reduce(
        (sum, ch) => sum + (ch.chapterContent?.length || 0),
        0
      );
      const progress =
        totalLectures > 0 ? Math.round((e.completedLectures.length / totalLectures) * 100) : 0;

      return {
        id: e._id.toString(),
        name: e.student?.name || 'Unknown',
        email: e.student?.email || '',
        courseTitle: e.course?.courseTitle || 'Unknown Course',
        date: e.createdAt?.toISOString().split('T')[0] || '',
        progress,
      };
    });

    // My courses with stats
    const coursesWithStats = await Promise.all(
      myCourses.map(async (course) => {
        const enrollmentCount = await Enrollment.countDocuments({
          course: course._id,
          paymentStatus: { $in: ['demo_paid', 'paid'] },
        });
        const courseOrders = await Order.find({ course: course._id, status: 'completed' });
        const courseEarnings = parseFloat(
          courseOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)
        );
        return {
          ...formatCourse(course),
          enrolledCount: enrollmentCount,
          earnings: courseEarnings,
        };
      })
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalEarnings,
        totalStudents,
        coursesCreated: myCourses.length,
        myCourses: coursesWithStats,
        recentStudents,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
