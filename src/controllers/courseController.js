const CourseService = require('../services/courseService');

const CourseController = {
  getAll: async (req, res) => {
    try {
      const courses = await CourseService.getAllCourses();
      res
        .status(200)
        .json({ message: 'Success get all courses', data: courses });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      res
        .status(200)
        .json({ message: 'Success get course detail', data: course });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const newCourse = await CourseService.createCourse(req.body);
      res
        .status(201)
        .json({ message: 'Course created successfully', data: newCourse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await CourseService.updateCourse(req.params.id, req.body);
      res
        .status(200)
        .json({ message: 'Course updated successfully', data: updated });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await CourseService.deleteCourse(req.params.id);
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = CourseController;
