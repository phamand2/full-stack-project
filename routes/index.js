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

router.post('/team', (req, res) => {
  if (!req.body || !req.body.teamName) {
    res.status(400).json({
      error: 'Provide todo text',
    });
    return;
  }

  db.Team.create({
      teamName: req.body.teamName,
      ownerNotes: '',
      playerNotes: '',
      UserId: req.user.id
    })
    .then((newTeam) => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error
      })
    })
});

// Display roles to dashboard
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

router.get('/players', (req, res) => {
  console.log(req.query.playerName)
  db.Player.findAll({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: req.query.playerName
        }
      }
    })
    .then((players) => {
      res.json(players)

    })
    .catch((error) => {
      console.log(error)
    })

})


router.get('/teams', (req, res) => {
  db.Team.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then((teams) => {
      res.json(teams)

    })
    .catch((error) => {
      console.log(error)
    })

})

// Delete roles
router.delete('/roles/:id', (req, res) => {
  const {
    id
  } = req.params
  db.Player.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    })
    .then((deleted) => {
      if (deleted === 0) {
        res.status(404).json({
          error: `Could not find Player with id: ${id}`
        })
      }
      res.status(204).json()
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        error: "A database error occurred"
      })
    })
});

module.exports = router;