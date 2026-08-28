const { Op } = require('sequelize');
const Course = require('../models/courseModel');

const getCourses = async (req, res) => {
  const { topic, sortBy, search } = req.query;
  let whereClause = {};
  let orderClause = [['createdAt', 'DESC']];

  if (topic) whereClause.topic = topic;
  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }
  if (sortBy) {
    const sortOrder = sortBy.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    orderClause = [['title', sortOrder]];
  }

  try {
    const courses = await Course.findAll({
      where: whereClause,
      order: orderClause,
    });
    res.json({ message: 'Berhasil mengambil data course', data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course)
      return res.status(404).json({ message: 'Course tidak ditemukan' });
    res.json({ message: 'Berhasil mengambil detail course', data: course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res
      .status(201)
      .json({ message: 'Course berhasil ditambahkan', data: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Gagal menambah course', error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course)
      return res.status(404).json({ message: 'Course tidak ditemukan' });
    await course.update(req.body);
    res.json({ message: 'Course berhasil diperbarui', data: course });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Gagal mengupdate course', error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course)
      return res.status(404).json({ message: 'Course tidak ditemukan' });
    await course.destroy();
    res.json({ message: 'Course berhasil dihapus' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Gagal menghapus course', error: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
