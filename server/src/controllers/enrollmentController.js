const Enrollment = require('../models/Enrollment');
const Order = require('../models/Order');
const Course = require('../models/Course');

// @desc    Demo checkout: create order + enrollment
// @route   POST /api/enrollments/checkout/:courseId
// @access  Private (student)
exports.checkout = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    // Get course to determine price
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const finalAmount = parseFloat(
      (course.coursePrice * (1 - course.discount / 100)).toFixed(2)
    );

    // Create order
    const order = await Order.create({
      student: studentId,
      course: courseId,
      amount: finalAmount,
      status: 'completed',
      paymentMethod: 'demo',
    });

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      paymentStatus: 'demo_paid',
      amount: finalAmount,
      completedLectures: [],
    });

    res.status(201).json({
      success: true,
      message: 'Enrollment successful',
      enrollment,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all enrollments for the logged-in student (with full course data)
// @route   GET /api/enrollments/my
// @access  Private (student)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
      paymentStatus: { $in: ['demo_paid', 'paid'] },
    }).populate({
      path: 'course',
      populate: { path: 'educator', select: 'name' },
    });

    // Format courses inside enrollments to include instructor field
    const formatted = enrollments.map((e) => {
      const obj = e.toObject({ virtuals: true });
      if (obj.course && obj.course.educator) {
        obj.course.instructor = obj.course.educator.name;
        // Compute lecturesCount and duration since virtuals may not carry
        let lecturesCount = 0;
        let duration = 0;
        (obj.course.chapters || []).forEach((ch) => {
          lecturesCount += ch.chapterContent?.length || 0;
          (ch.chapterContent || []).forEach((lec) => {
            duration += lec.lectureDuration || 0;
          });
        });
        obj.course.lecturesCount = lecturesCount;
        obj.course.duration = duration;
      }
      return obj;
    });

    res.status(200).json({ success: true, enrollments: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check if logged-in student is enrolled in a specific course
// @route   GET /api/enrollments/check/:courseId
// @access  Private
exports.checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId,
      paymentStatus: { $in: ['demo_paid', 'paid'] },
    });

    res.status(200).json({ success: true, isEnrolled: Boolean(enrollment) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle lecture completion for a course
// @route   PATCH /api/enrollments/:courseId/progress
// @access  Private (student)
exports.updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureId, completed } = req.body;

    if (!lectureId) {
      return res.status(400).json({ success: false, message: 'lectureId is required' });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    if (completed) {
      // Add lectureId if not already present
      if (!enrollment.completedLectures.includes(lectureId)) {
        enrollment.completedLectures.push(lectureId);
      }
    } else {
      // Remove lectureId
      enrollment.completedLectures = enrollment.completedLectures.filter((id) => id !== lectureId);
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      completedLectures: enrollment.completedLectures,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Rate a course
// @route   POST /api/enrollments/:courseId/rate
// @access  Private (student)
exports.rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    // Save rating on enrollment
    enrollment.rating = rating;
    await enrollment.save();

    // Recalculate course ratings
    const ratedEnrollments = await Enrollment.find({
      course: courseId,
      rating: { $exists: true, $ne: null }
    });

    const numRatings = ratedEnrollments.length;
    const averageRating = numRatings > 0 
      ? parseFloat((ratedEnrollments.reduce((sum, e) => sum + e.rating, 0) / numRatings).toFixed(1))
      : 0;

    await Course.findByIdAndUpdate(courseId, {
      rating: averageRating,
      numRatings: numRatings
    });

    res.status(200).json({
      success: true,
      message: 'Course rated successfully',
      rating: averageRating,
      numRatings: numRatings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
