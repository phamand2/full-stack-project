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
  res.render('dashboard', {
    locals: {
      user: req.user
    }
  })
})

// Post player details to database
router.post('/role', (req, res) => {
  if (!req.body || !req.body.name || !req.body.role || !req.body.email || !req.body.phone) {
    res.status(400).json({
      error: 'Provide todo text',
    });
    return;
  }

  db.Player.create({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
      ownerNotes: '',
      playerNotes: '',
      UserId: req.user.id
    })
    .then((newPlayer) => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error
      })
    })
});

router.get('/roles', (req, res) => {
  db.Player.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then((players) => {
      res.json(players)

    })
    .catch((error) => {
      console.log(error)
    })

})

module.exports = router;