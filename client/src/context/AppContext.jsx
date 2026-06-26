import React, { createContext, useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets.js";

export const AppContext = createContext();

// ─── Static testimonials (not DB-backed) ──────────────────────────────────────
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

// ─── Auth-aware fetch helper ──────────────────────────────────────────────────
const makeAuthFetch = (BACKEND_URL) => async (path, options = {}) => {
  const token = localStorage.getItem("lms_token");
  const url = path.startsWith("http") ? path : `${BACKEND_URL}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};

export const AppContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const authFetch = makeAuthFetch(BACKEND_URL);

  // ─── Auth state ──────────────────────────────────────────────────────────────
  const [authUser, setAuthUser] = useState(null);
  const [userRole, setUserRole] = useState("student");

  // ─── Courses (loaded from backend) ──────────────────────────────────────────
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // ─── Student enrollments ─────────────────────────────────────────────────────
  const [enrollments, setEnrollments] = useState([]); // full enrollment objects with populated course
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);

  // ─── Educator dashboard ──────────────────────────────────────────────────────
  const [educatorDashboard, setEducatorDashboard] = useState(null);
  const [educatorLoading, setEducatorLoading] = useState(false);

  // ─── Search ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");

  // ─── Fetch all published courses ─────────────────────────────────────────────
  const fetchCourses = useCallback(async () => {
    setCoursesLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/courses`);
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setCoursesLoading(false);
    }
  }, [BACKEND_URL]);

  // ─── Fetch student enrollments ───────────────────────────────────────────────
  const fetchMyEnrollments = useCallback(async () => {
    setEnrollmentsLoading(true);
    try {
      const res = await authFetch("/api/enrollments/my");
      const data = await res.json();
      if (data.success) setEnrollments(data.enrollments);
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    } finally {
      setEnrollmentsLoading(false);
    }
  }, [BACKEND_URL]);

  // ─── Fetch educator dashboard ────────────────────────────────────────────────
  const fetchEducatorDashboard = useCallback(async () => {
    setEducatorLoading(true);
    try {
      const res = await authFetch("/api/educator/dashboard");
      const data = await res.json();
      if (data.success) {
        setEducatorDashboard(data.dashboard);
        return data.dashboard;
      }
    } catch (err) {
      console.error("Failed to fetch educator dashboard:", err);
    } finally {
      setEducatorLoading(false);
    }
    return null;
  }, [BACKEND_URL]);

  // ─── Load courses on mount ───────────────────────────────────────────────────
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ─── Restore session on mount ────────────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("lms_token");
      if (!token) return;
      try {
        const res = await authFetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setAuthUser(data.user);
          setUserRole(data.user.role || "student");
        } else {
          localStorage.removeItem("lms_token");
          setAuthUser(null);
        }
      } catch (err) {
        console.error("Session restore failed:", err);
      }
    };
    restoreSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Fetch enrollments when user logs in ─────────────────────────────────────
  useEffect(() => {
    if (authUser?.role === "student") {
      fetchMyEnrollments();
    } else {
      setEnrollments([]);
    }
  }, [authUser]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── AUTH ACTIONS ─────────────────────────────────────────────────────────────

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message || "Invalid credentials." };
      if (data.token) localStorage.setItem("lms_token", data.token);
      setAuthUser(data.user);
      setUserRole(data.user.role || "student");
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Something went wrong." };
    }
  };

  const signup = async ({ name, email, password, role }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message || "Signup failed." };
      if (data.token) localStorage.setItem("lms_token", data.token);
      setAuthUser(data.user);
      setUserRole(data.user.role || "student");
      setEnrollments([]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Something went wrong." };
    }
  };

  const logout = async () => {
    try {
      await authFetch("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("lms_token");
    setAuthUser(null);
    setUserRole("student");
    setEnrollments([]);
    setEducatorDashboard(null);
  };

  const changeUserRole = (role) => {
    setUserRole(role);
    setAuthUser((prev) => (prev ? { ...prev, role } : prev));
  };

  // ─── ENROLLMENT ACTIONS ───────────────────────────────────────────────────────

  const enrollInCourse = async (courseId) => {
    try {
      const res = await authFetch(`/api/enrollments/checkout/${courseId}`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchMyEnrollments();
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some((e) => {
      const id = e.course?._id || e.course;
      return id?.toString() === courseId?.toString();
    });
  };

  const getEnrolledCourses = () => {
    return enrollments
      .map((e) => (typeof e.course === "object" ? e.course : courses.find((c) => c._id === e.course)))
      .filter(Boolean);
  };

  const getEnrollmentForCourse = (courseId) => {
    return enrollments.find((e) => {
      const id = e.course?._id || e.course;
      return id?.toString() === courseId?.toString();
    });
  };

  // ─── PROGRESS ACTIONS ────────────────────────────────────────────────────────

  const getCompletedLectures = (courseId) => {
    const enrollment = getEnrollmentForCourse(courseId);
    return enrollment?.completedLectures || [];
  };

  const toggleLectureCompletion = async (courseId, lectureId) => {
    const enrollment = getEnrollmentForCourse(courseId);
    if (!enrollment) return;

    const alreadyCompleted = enrollment.completedLectures?.includes(lectureId);

    // Optimistic update
    setEnrollments((prev) =>
      prev.map((e) => {
        const id = e.course?._id || e.course;
        if (id?.toString() !== courseId?.toString()) return e;
        const updated = alreadyCompleted
          ? (e.completedLectures || []).filter((id) => id !== lectureId)
          : [...(e.completedLectures || []), lectureId];
        return { ...e, completedLectures: updated };
      })
    );

    try {
      const res = await authFetch(`/api/enrollments/${courseId}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ lectureId, completed: !alreadyCompleted }),
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments((prev) =>
          prev.map((e) => {
            const id = e.course?._id || e.course;
            if (id?.toString() !== courseId?.toString()) return e;
            return { ...e, completedLectures: data.completedLectures };
          })
        );
      }
    } catch (err) {
      console.error("Failed to update progress:", err);
      // Revert optimistic update on error
      await fetchMyEnrollments();
    }
  };

  const getCourseProgressPercent = (courseId) => {
    const enrollment = getEnrollmentForCourse(courseId);
    if (!enrollment) return 0;

    const course =
      typeof enrollment.course === "object"
        ? enrollment.course
        : courses.find((c) => c._id === courseId);
    if (!course) return 0;

    const completed = enrollment.completedLectures || [];
    let totalLectures = 0;
    (course.chapters || []).forEach((ch) => {
      totalLectures += ch.chapterContent?.length || 0;
    });

    if (totalLectures === 0) return 0;
    return Math.round((completed.length / totalLectures) * 100);
  };

  const rateCourse = async (courseId, rating) => {
    try {
      const res = await authFetch(`/api/enrollments/${courseId}/rate`, {
        method: "POST",
        body: JSON.stringify({ rating }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchCourses();
        await fetchMyEnrollments();
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ─── COURSE CREATION ─────────────────────────────────────────────────────────

  const addCourse = async (courseData) => {
    try {
      const res = await authFetch("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          courseTitle: courseData.title,
          courseDescription: courseData.description,
          courseThumbnail: courseData.thumbnail,
          category: courseData.category,
          coursePrice: courseData.price,
          discount: courseData.discount,
          chapters: courseData.chapters,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchCourses();
        return { success: true, courseId: data.course._id };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ─── Educator metrics (backward-compat wrapper) ───────────────────────────────
  const getEducatorMetrics = () => {
    if (educatorDashboard) return educatorDashboard;
    return { totalEarnings: 0, totalStudents: 0, coursesCreated: 0, myCourses: [], recentStudents: [] };
  };

  // ─── Derived values ──────────────────────────────────────────────────────────
  const isAuthenticated = Boolean(authUser);

  const currentStudent = authUser
    ? { ...authUser, avatar: authUser.avatar || assets.profile_img }
    : { name: "Guest", email: "guest@academy.com", avatar: assets.user_icon, role: "student", isLoggedIn: false };

  // ─── Context value ────────────────────────────────────────────────────────────
  const value = {
    // Courses
    courses,
    coursesLoading,
    fetchCourses,

    // Auth
    authUser,
    userRole,
    currentStudent,
    isAuthenticated,
    login,
    signup,
    logout,
    changeUserRole,

    // Enrollments
    enrollments,
    enrollmentsLoading,
    fetchMyEnrollments,
    enrollInCourse,
    isEnrolled,
    getEnrolledCourses,
    getEnrollmentForCourse,

    // Progress
    getCompletedLectures,
    toggleLectureCompletion,
    getCourseProgressPercent,
    rateCourse,

    // Course creation
    addCourse,

    // Educator
    educatorDashboard,
    educatorLoading,
    fetchEducatorDashboard,
    getEducatorMetrics,

    // Search
    searchQuery,
    setSearchQuery,

    // Static
    testimonials: INITIAL_TESTIMONIALS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
