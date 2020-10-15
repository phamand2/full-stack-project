const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// Load User model
const db = require('../models');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login', {
  locals: {
    title: 'Login'
  },
  partials: {
    head: '/partials/head',
    foot: '/partials/foot',
  }
}));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register', {
  locals: {
    title: 'Register'
  },
  partials: {
    head: '/partials/head',
    foot: '/partials/foot',
  }
}));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;


  if (!name || !email || !password || !password2) {
    res.render('register', {
      locals: {
        // error: 'Please submit all required fields'
      }
    })
  }

  if (password != password2) {
    res.render('register', {
      locals: {
        // error: 'Password does not match'
      }
    })
  }

  if (password.length < 6) {
    res.render('register', {
      locals: {
        // error: 'Password length is less than 6 characters'
      }
    })
    return
  }
  bcrypt.hash(password, 10, (err, hash) => {
    db.User.create({
      name,
      email,
      password: hash
    })
      .then((result) => {
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        );
        res.redirect('/users/login');
      })
      .catch(err => console.log(err));
  });
});



// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
