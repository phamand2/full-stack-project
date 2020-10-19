const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// Load User model
const db = require('../models');
const {
  siteMapAuthenticated,
  siteMapNonAuthenticated
} = require('../config/auth');

//forwardAuthenticated == not logged in
//ensureAuthenticated == logged in 

router.get('/', siteMapAuthenticated, (req, res) => {
    res.render('sitemap-loggedin', {
        locals: {
            title: 'sitemap',
            user:req.user,
        },
        partials: {
            head: '/partials/head',
            foot: '/partials/foot'
        }
    }) 
})
router.get('/public',siteMapNonAuthenticated, (req, res) => {
    res.render('sitemap-loggedout', {
        locals: {
            title: 'sitemap',
        },
        partials: {
            head: '/partials/head',
            foot: '/partials/foot'
        }
    }) 
})
module.exports = router;