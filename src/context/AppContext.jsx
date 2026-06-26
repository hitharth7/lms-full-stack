import React, { createContext, useState, useEffect } from "react";
import uniqid from "uniqid";

export const AppContext = createContext();

// Default rich courses data for visual rendering
const INITIAL_COURSES = [
  {
    _id: "course-react-nextjs",
    courseTitle: "Complete React & Next.js Masterclass: Zero to Production",
    courseDescription: "<p>Become a professional frontend developer. Learn React 19, Next.js 15, state management, animations, and deploy production-ready applications.</p><h3>What you'll learn:</h3><ul><li>React 19 Hooks and Component Architecture</li><li>Next.js App Router, Server Components, & SSR</li><li>State management with Tailwind styling</li><li>Optimizing performance and accessibility</li></ul>",
    courseThumbnail: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)", // custom styled thumbnail
    coursePrice: 99.99,
    discount: 20, // 20% discount
    isPublished: true,
    category: "Development",
    rating: 4.8,
    numRatings: 324,
    instructor: "Sarah Jenkins",
    duration: 90000, // in seconds (25 Hours)
    lecturesCount: 12,
    chapters: [
      {
        chapterId: "c1",
        chapterTitle: "Section 1: Course Overview & Basic Concepts",
        chapterContent: [
          { lectureId: "l1_1", lectureTitle: "01. Introduction & Welcome", lectureDuration: 300, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "l1_2", lectureTitle: "02. React 19 Setup & Core Concepts", lectureDuration: 900, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l1_3", lectureTitle: "03. Building Your First Component", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "c2",
        chapterTitle: "Section 2: Mastering Tailwind CSS in React Projects",
        chapterContent: [
          { lectureId: "l2_1", lectureTitle: "04. Tailwind CSS V4 Overview", lectureDuration: 600, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "l2_2", lectureTitle: "05. Layouts & Responsive Design", lectureDuration: 1500, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l2_3", lectureTitle: "06. Flexbox, Grid, & Absolute Layouts", lectureDuration: 1800, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "c3",
        chapterTitle: "Section 3: Routing & Next.js Navigation",
        chapterContent: [
          { lectureId: "l3_1", lectureTitle: "07. What is Next.js App Router?", lectureDuration: 800, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l3_2", lectureTitle: "08. Creating Dynamic Routes", lectureDuration: 1400, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l3_3", lectureTitle: "09. Link Component & Routing Programmatically", lectureDuration: 1100, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "c4",
        chapterTitle: "Section 4: Final Project Build & Deployment",
        chapterContent: [
          { lectureId: "l4_1", lectureTitle: "10. Full Stack Project Setup", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l4_2", lectureTitle: "11. Deploying to Vercel", lectureDuration: 900, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "l4_3", lectureTitle: "12. Summary & Next Steps", lectureDuration: 500, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course-figma-design",
    courseTitle: "Figma UI/UX Design Fundamentals: Master Modern Product Design",
    courseDescription: "<p>Learn design principles, wireframing, high-fidelity UI design, prototyping, and developer handoff in Figma. No design experience required.</p><h3>What you'll learn:</h3><ul><li>UX/UI core principles & theories</li><li>Typography, grids, and responsive components</li><li>Prototyping with interactive transitions</li><li>Setting up responsive Auto-Layouts</li></ul>",
    courseThumbnail: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    coursePrice: 89.99,
    discount: 15, // 15% discount
    isPublished: true,
    category: "Design",
    rating: 4.6,
    numRatings: 184,
    instructor: "David Kovac",
    duration: 54000, // 15 Hours
    lecturesCount: 8,
    chapters: [
      {
        chapterId: "d1",
        chapterTitle: "Section 1: Designing for Humans (UX)",
        chapterContent: [
          { lectureId: "ld1_1", lectureTitle: "01. Introduction to Product Design", lectureDuration: 400, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "ld1_2", lectureTitle: "02. Wireframing & User Research Basics", lectureDuration: 1000, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "d2",
        chapterTitle: "Section 2: Mastering Figma Tools",
        chapterContent: [
          { lectureId: "ld2_1", lectureTitle: "03. Canvas Navigation & Vector Networks", lectureDuration: 900, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "ld2_2", lectureTitle: "04. Working with Colors, Gradients & Shadows", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "ld2_3", lectureTitle: "05. Understanding Components & Variants", lectureDuration: 1600, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "d3",
        chapterTitle: "Section 3: Responsive layouts (Auto-Layout)",
        chapterContent: [
          { lectureId: "ld3_1", lectureTitle: "06. Auto-Layout 101: Alignment & Spacing", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "ld3_2", lectureTitle: "07. Wrapping & Filling Containers", lectureDuration: 1500, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "ld3_3", lectureTitle: "08. Creating Interactive Accordions & Modals", lectureDuration: 1800, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course-digital-marketing",
    courseTitle: "Digital Marketing Strategy & SEO Bootcamp",
    courseDescription: "<p>Master SEO, Google Analytics, social media ads, email marketing, and content strategies. Drive organic traffic and conversion rates.</p>",
    courseThumbnail: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    coursePrice: 79.99,
    discount: 10,
    isPublished: true,
    category: "Marketing",
    rating: 4.5,
    numRatings: 98,
    instructor: "Mia Wong",
    duration: 43200, // 12 Hours
    lecturesCount: 6,
    chapters: [
      {
        chapterId: "m1",
        chapterTitle: "Section 1: SEO Fundamentals",
        chapterContent: [
          { lectureId: "lm1_1", lectureTitle: "01. Search Engine Mechanics", lectureDuration: 600, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lm1_2", lectureTitle: "02. Keyword Research & Competitor Analysis", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lm1_3", lectureTitle: "03. On-Page vs Off-Page Optimizations", lectureDuration: 1400, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "m2",
        chapterTitle: "Section 2: Social Media Marketing & Campaigns",
        chapterContent: [
          { lectureId: "lm2_1", lectureTitle: "04. Facebook & Instagram Ad Setup", lectureDuration: 1500, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lm2_2", lectureTitle: "05. Copywriting for Conversion Optimization", lectureDuration: 1100, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lm2_3", lectureTitle: "06. Analyzing Campaign ROAS in GA4", lectureDuration: 1800, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course-python-ds",
    courseTitle: "Python for Data Science & AI Foundations",
    courseDescription: "<p>Learn Python programming, NumPy, Pandas, Matplotlib, Seaborn, and introductory Machine Learning models. Solve data analytics problems.</p>",
    courseThumbnail: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    coursePrice: 129.99,
    discount: 25,
    isPublished: true,
    category: "Development",
    rating: 4.9,
    numRatings: 412,
    instructor: "Dr. Albert Stern",
    duration: 108000, // 30 Hours
    lecturesCount: 9,
    chapters: [
      {
        chapterId: "py1",
        chapterTitle: "Section 1: Python Basics",
        chapterContent: [
          { lectureId: "lpy1_1", lectureTitle: "01. Introduction to Python & Jupyter", lectureDuration: 500, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lpy1_2", lectureTitle: "02. Variables, Conditionals, & Loops", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpy1_3", lectureTitle: "03. Python Lists, Tuples, & Dictionaries", lectureDuration: 1400, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "py2",
        chapterTitle: "Section 2: Data Manipulation with Pandas",
        chapterContent: [
          { lectureId: "lpy2_1", lectureTitle: "04. Loading Data into DataFrames", lectureDuration: 1100, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lpy2_2", lectureTitle: "05. Cleaning and Filtering Datasets", lectureDuration: 1500, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpy2_3", lectureTitle: "06. Grouping and Merging Tables", lectureDuration: 1600, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "py3",
        chapterTitle: "Section 3: Data Visualization & Intro to ML",
        chapterContent: [
          { lectureId: "lpy3_1", lectureTitle: "07. Plotting Line & Bar Charts", lectureDuration: 900, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpy3_2", lectureTitle: "08. Creating Heatmaps & Pairplots", lectureDuration: 1000, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpy3_3", lectureTitle: "09. Building Your First Linear Regression", lectureDuration: 1800, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course-product-management",
    courseTitle: "Product Management 101: Launch Successful Products",
    courseDescription: "<p>Learn user journey mapping, writing PRDs, product design sprints, agile methods, roadmap building, and how to work with devs and stakeholders.</p>",
    courseThumbnail: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    coursePrice: 109.99,
    discount: 0, // no discount
    isPublished: true,
    category: "Business",
    rating: 4.7,
    numRatings: 67,
    instructor: "Marcus Vance",
    duration: 36000, // 10 Hours
    lecturesCount: 6,
    chapters: [
      {
        chapterId: "pm1",
        chapterTitle: "Section 1: The Product Lifecycle",
        chapterContent: [
          { lectureId: "lpm1_1", lectureTitle: "01. Role of a Product Manager", lectureDuration: 400, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lpm1_2", lectureTitle: "02. Market Research & User Persona Design", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpm1_3", lectureTitle: "03. Defining the MVP & Feature Prioritization", lectureDuration: 1400, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      },
      {
        chapterId: "pm2",
        chapterTitle: "Section 2: Agile PM & Roadmapping",
        chapterContent: [
          { lectureId: "lpm2_1", lectureTitle: "04. Writing a Product Requirements Document (PRD)", lectureDuration: 1600, videoUrl: "Ke90Tje7VS0", isPreview: true },
          { lectureId: "lpm2_2", lectureTitle: "05. Agile Sprints, Scrums, & Kanban Boards", lectureDuration: 1200, videoUrl: "Ke90Tje7VS0", isPreview: false },
          { lectureId: "lpm2_3", lectureTitle: "06. Constructing a Multi-Quarter Roadmap", lectureDuration: 1800, videoUrl: "Ke90Tje7VS0", isPreview: false }
        ]
      }
    ]
  }
];

const INITIAL_TESTIMONIALS = [
  {
    name: "Emily Watson",
    role: "Junior Web Developer at Spotify",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    rating: 5,
    feedback: "The React & Next.js Masterclass was life-changing! I built a full-stack portfolio that helped me land my dream job as a front-end developer. The accordion content and structure made learning extremely intuitive."
  },
  {
    name: "Jason Ramirez",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    rating: 5,
    feedback: "Figma UI/UX course was phenomenal. The explanation of Auto-Layout variables was the best I've ever found. Highly recommend it to anyone transitioning into UX design!"
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    rating: 4.8,
    feedback: "Mia Wong's explanations of SEO algorithms were super clear. Our organic traffic went up by 40% after implementing the project's strategy guide."
  }
];

export const AppContextProvider = ({ children }) => {
  // --- STATE DECLARATIONS ---
  // Load courses
  const [courses, setCourses] = useState(() => {
    const local = localStorage.getItem("lms_courses");
    return local ? JSON.parse(local) : INITIAL_COURSES;
  });

  // Load user role ('student' or 'educator')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("lms_user_role") || "student";
  });

  // Student progress tracker: { courseId: [lectureId1, lectureId2] }
  const [completedLectures, setCompletedLectures] = useState(() => {
    const local = localStorage.getItem("lms_completed_lectures");
    return local ? JSON.parse(local) : {};
  });

  // Student enrolled courses: array of course IDs
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    const local = localStorage.getItem("lms_enrolled_ids");
    // Default enroll in the React course for nice UI demo, if empty
    return local ? JSON.parse(local) : ["course-react-nextjs"];
  });

  // Global search input
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated Logged in User Profile
  const currentStudent = {
    name: "Alex Morgan",
    email: "alex.morgan@academy.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    isLoggedIn: true
  };

  // --- LOCALSTORAGE STORAGE SYNC ---
  useEffect(() => {
    localStorage.setItem("lms_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("lms_user_role", userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem("lms_completed_lectures", JSON.stringify(completedLectures));
  }, [completedLectures]);

  useEffect(() => {
    localStorage.setItem("lms_enrolled_ids", JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  // --- ACTIONS / UTILITIES ---

  // Role switching
  const changeUserRole = (role) => {
    setUserRole(role);
  };

  // Course purchasing/enrollment
  const enrollInCourse = (courseId) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
      // Initialize completed list for this course
      setCompletedLectures((prev) => ({
        ...prev,
        [courseId]: []
      }));
      return true;
    }
    return false;
  };

  // Check if student is enrolled in a specific course
  const isEnrolled = (courseId) => {
    return enrolledCourseIds.includes(courseId);
  };

  // Get list of actual course objects student is enrolled in
  const getEnrolledCourses = () => {
    return courses.filter((c) => enrolledCourseIds.includes(c._id));
  };

  // Toggle lecture completed state
  const toggleLectureCompletion = (courseId, lectureId) => {
    setCompletedLectures((prev) => {
      const currentList = prev[courseId] || [];
      let newList;
      if (currentList.includes(lectureId)) {
        newList = currentList.filter((id) => id !== lectureId);
      } else {
        newList = [...currentList, lectureId];
      }
      return {
        ...prev,
        [courseId]: newList
      };
    });
  };

  // Get progress percent for course
  const getCourseProgressPercent = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return 0;
    const completed = completedLectures[courseId] || [];
    
    // Count total lectures
    let totalLectures = 0;
    course.chapters.forEach((ch) => {
      totalLectures += ch.chapterContent.length;
    });

    if (totalLectures === 0) return 0;
    return Math.round((completed.length / totalLectures) * 100);
  };

  // Educator Add Course builder
  const addCourse = (courseData) => {
    const newCourse = {
      _id: `course-${uniqid()}`,
      courseTitle: courseData.title || "Untitled Course",
      courseDescription: courseData.description || "",
      courseThumbnail: courseData.thumbnail || "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      coursePrice: parseFloat(courseData.price) || 0,
      discount: parseFloat(courseData.discount) || 0,
      isPublished: true,
      category: courseData.category || "Development",
      rating: 5.0,
      numRatings: 0,
      instructor: "Alex Morgan", // Current user is the educator
      duration: courseData.duration || 0,
      lecturesCount: courseData.lecturesCount || 0,
      chapters: courseData.chapters || []
    };

    setCourses((prev) => [newCourse, ...prev]);
    return newCourse._id;
  };

  // Reset database back to default
  const resetDatabase = () => {
    setCourses(INITIAL_COURSES);
    setEnrolledCourseIds(["course-react-nextjs"]);
    setCompletedLectures({});
    setUserRole("student");
  };

  // Educator analytics calculators
  const getEducatorMetrics = () => {
    // Total courses created by Alex Morgan
    const myCourses = courses.filter((c) => c.instructor === "Alex Morgan");
    const coursesCount = myCourses.length;

    // Simulate some realistic values based on our default mock, plus created courses
    // Every enrolled course represents dynamic sales. Let's make sales values:
    const mockBaseEarnings = 14230;
    const mockBaseStudents = 328;

    // Let's count created courses details
    let createdCoursesEarnings = 0;
    let createdCoursesStudents = 0;

    // Dynamic simulated enrollment additions
    myCourses.forEach((c) => {
      // simulate 15 students per course
      createdCoursesStudents += 15;
      createdCoursesEarnings += (c.coursePrice * (1 - c.discount / 100)) * 15;
    });

    // Enrolled students lists across educator's courses
    const studentList = [
      { id: "s1", name: "David Miller", email: "david@example.com", courseTitle: "Complete React & Next.js Masterclass: Zero to Production", date: "2026-06-25", progress: 75 },
      { id: "s2", name: "Sophia Martinez", email: "sophia@example.com", courseTitle: "Complete React & Next.js Masterclass: Zero to Production", date: "2026-06-24", progress: 30 },
      { id: "s3", name: "Liam Johnson", email: "liam@example.com", courseTitle: "Figma UI/UX Design Fundamentals: Master Modern Product Design", date: "2026-06-22", progress: 95 },
      { id: "s4", name: "Emma Thompson", email: "emma@example.com", courseTitle: "Python for Data Science & AI Foundations", date: "2026-06-21", progress: 10 }
    ];

    // Add extra student rows for newly added courses
    myCourses.forEach((c) => {
      studentList.push({
        id: `s-${uniqid()}`,
        name: "Chloe Bennett",
        email: "chloe@example.com",
        courseTitle: c.courseTitle,
        date: new Date().toISOString().split("T")[0],
        progress: 0
      });
    });

    return {
      totalEarnings: parseFloat((mockBaseEarnings + createdCoursesEarnings).toFixed(2)),
      totalStudents: mockBaseStudents + createdCoursesStudents,
      coursesCreated: coursesCount,
      myCourses: myCourses,
      recentStudents: studentList
    };
  };

  const value = {
    courses,
    userRole,
    changeUserRole,
    completedLectures,
    enrolledCourseIds,
    searchQuery,
    setSearchQuery,
    currentStudent,
    enrollInCourse,
    isEnrolled,
    getEnrolledCourses,
    toggleLectureCompletion,
    getCourseProgressPercent,
    addCourse,
    resetDatabase,
    getEducatorMetrics,
    testimonials: INITIAL_TESTIMONIALS
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
