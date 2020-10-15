const express = require('express');
const db = require('../models');
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');
const router = express.Router();

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome', {
  locals: {
    title: 'Welcome'
  },
  partials: {
    head: '/partials/head',
    foot: '/partials/foot'
  }
}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {

  // db.User.findOne({
  //   where: {
  //     name: db.User.name
  //   }
  // }).then(name => {
  res.render('dashboard', {
    locals: {
      user: req.user
    }
  })
  // .catch(err => {
  //   console.log(err)
  // });
})

module.exports = router;