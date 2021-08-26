const { Router } = require('express');

const authService = require('../services/authServices');

const router = new Router();

router.get('/profile', async (req, res) => {
  const id = req.user._id;
  try {
    let userProfile = await authService.getProfileById(id);
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put('/profile', (req, res, next) => {
  const { profile } = req.body;
  authService
    .updateProfile(profile)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/register', (req, res, next) => {
  let { user } = req.body;
  user.username = user.username.toLowerCase();

  authService
    .register(user)
    .then((createdUser) => {
      res.status(201).json({
        user: createdUser,
        message: 'Successfull registration!',
        expiresIn: 10,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/login', (req, res, next) => {
  let { user } = req.body;
  user.username = user.username.toLowerCase();

  authService
    .login(user)
    .then((userData) => {
      const { username, token, id, avatar } = userData;

      res.status(200).json({
        user: {
          id,
          username,
          token,
          avatar,
        },
        message: 'Successful login!',
        expiresIn: 10,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/social-login', (req, res, next) => {
  //auth token not implemented
  //use provider field

  const { email, photoUrl } = req.body;

  const user = { email };

  if (photoUrl) {
    user.avatar = photoUrl;
  }

  authService
    .authenticateSocialUser(user)
    .then((user) => {
      res.status(201).json({
        user,
        message: 'Successfull autentication!',
        expiresIn: 10,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/current-user', async (req, res, next) => {
  let user = {
    user: null,
  };
  if (req.user && req.token) {
    const profile = await authService.getProfileById(req.user._id);
    user = {
      id: req.user._id,
      username: req.user.username,
      token: req.token,
      avatar: profile.avatar,
      email: profile.email,
    };
  }
  res.status(200).json({ user });
});

router.post('/username-exsists', (req, res, next) => {
  const { username } = req.body;

  if (!username || username.length < 8) {
    res.status(200).json({ usernameExists: false });
  }

  authService
    .usernameExists(username)
    .then((exists) => {
      res.status(200).json({ usernameExists: exists });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
