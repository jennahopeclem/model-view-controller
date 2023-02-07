const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogPost = await Blog.bulkCreate(blogData, {
    user_id: users.id,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      blog_id: comment.blog_id,
    });
  }

  process.exit(0);
};

seedDatabase();
