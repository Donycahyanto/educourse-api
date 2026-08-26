const db = require('../config/database');

const CourseModel = {
  // 1. GET ALL
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM course');
    return rows;
  },

  // 2. GET BY ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM course WHERE course_id = ?', [
      id,
    ]);
    return rows[0];
  },

  // 3. CREATE (INSERT) - Tanpa diskon
  create: async (data = {}) => {
    const {
      title = '',
      subtitle = '',
      description = '',
      price = 0,
      mentor = '',
      rolementor = '',
      photos = '',
      avatar = '',
    } = data;

    const [result] = await db.query(
      'INSERT INTO course (title, subtitle, description, price, mentor, rolementor, photos, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle, description, price, mentor, rolementor, photos, avatar]
    );
    return result.insertId;
  },

  // 4. UPDATE (PUT/PATCH) - Tanpa diskon
  update: async (id, data) => {
    const {
      title,
      subtitle,
      description,
      price,
      mentor,
      rolementor,
      photos,
      avatar,
    } = data;

    const [result] = await db.query(
      'UPDATE course SET title = ?, subtitle = ?, description = ?, price = ?, mentor = ?, rolementor = ?, photos = ?, avatar = ? WHERE course_id = ?',
      [
        title,
        subtitle,
        description,
        price,
        mentor,
        rolementor,
        photos,
        avatar,
        id,
      ]
    );
    return result.affectedRows;
  },

  // 5. DELETE
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM course WHERE course_id = ?', [
      id,
    ]);
    return result.affectedRows;
  },
};

module.exports = CourseModel;
