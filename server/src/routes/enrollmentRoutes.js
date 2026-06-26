const express = require('express');
const {
  checkout,
  getMyEnrollments,
  checkEnrollment,
  updateProgress,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All enrollment routes require authentication
router.use(protect);

router.post('/checkout/:courseId', checkout);
router.get('/my', getMyEnrollments);
router.get('/check/:courseId', checkEnrollment);
router.patch('/:courseId/progress', updateProgress);

module.exports = router;
