const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.post('/', CourseController.create);
router.patch('/:id', CourseController.update);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.delete);

module.exports = router;
