const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log('GET /');
    const blogData = await Blog.findAll({
      order: [['date_created', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    const blog = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blogpost', withAuth, async (req, res) => {
  console.log(`GET /blogpost`);
  res.render('addBlog', {
    logged_in: true,
  });
});

router.get('/blog', withAuth, async (req, res) => {
  console.log(`GET /blog`);
  try {
    const blogData = await Blog.findAll({
      order: [['date_created', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['comment', 'blog_id', 'id', 'date_created', 'user_id'],
        },
        {
          model: User,
          attributes: ['first_name', 'last_name', 'id'],
        },
      ],
    });
    console.log(blogData);

    const blogpost = blogData.map((blog) => blog.get({ plain: true }));

    res.render('blogpost', {
      blogpost,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  console.log(`GET /login`);
  res.render("signup");
});

router.get("/login", async (req, res) => {
  console.log(`GET /login`);
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/logout", async (req, res) => {
  console.log(`GET /logout`);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
      return;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
