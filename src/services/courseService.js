const CourseModel = require('../models/courseModel');

const CourseService = {
  getAllCourses: async () => {
    return await CourseModel.findAll();
  },

  getCourseById: async (id) => {
    const course = await CourseModel.findById(id);
    if (!course) throw new Error('Course not found');
    return course;
  },

  createCourse: async (data) => {
    const insertId = await CourseModel.create(data);
    return { id: insertId, ...data };
  },

  updateCourse: async (id, data) => {
    const affected = await CourseModel.update(id, data);
    if (affected === 0) throw new Error('Course not found');
    return { id, ...data };
  },

  deleteCourse: async (id) => {
    const affected = await CourseModel.delete(id);
    if (affected === 0) throw new Error('Course not found');
    return true;
  },
};

module.exports = CourseService;
