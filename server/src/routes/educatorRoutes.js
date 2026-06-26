const express = require('express');
const { getEducatorCourses, getEducatorDashboard } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All educator routes require authentication and educator role
router.use(protect, authorize('educator', 'admin'));

router.get('/courses', getEducatorCourses);
router.get('/dashboard', getEducatorDashboard);

module.exports = router;
