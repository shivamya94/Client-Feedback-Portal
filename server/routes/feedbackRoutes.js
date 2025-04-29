const express = require('express');
const { createFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createFeedback);
router.get('/', protect, adminOnly, getAllFeedbacks);

module.exports = router;
