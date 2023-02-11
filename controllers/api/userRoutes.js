const router = require('express').Router();
const { User } = require('../../models');



router.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const formattedUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const userData = await User.create(formattedUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      console.log(userData.id);
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post('/logout', (req, res) => {
  console.log('POST /logout');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
