const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Endpoint CRUD Course (Bisa diproteksi menggunakan verifyToken)
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', verifyToken, courseController.addCourse);
router.patch('/courses/:id', verifyToken, courseController.updateCourse);
router.delete('/courses/:id', verifyToken, courseController.deleteCourse);

module.exports = router;
