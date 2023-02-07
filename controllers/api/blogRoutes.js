const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

router.post('/', withAuth, async (req, res) => {
  try {
    const blogFormat = {
      username: req.body.username,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    };

    const newBlog = await Blog.create(blogFormat);

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
