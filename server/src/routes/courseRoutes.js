const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  getEducatorCourses,
  getEducatorDashboard,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.post('/', protect, authorize('educator', 'admin'), createCourse);

// Single course - must be after specific routes to avoid param conflicts
router.get('/:id', getCourseById);

module.exports = router;
