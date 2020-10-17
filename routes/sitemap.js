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

router.get('/sitemap', siteMapAuthenticated, (req, res) => {
    res.render('sitemap-loggedin', {
        partials: {
            head: '/partials/head',
            foot: '/partials/foot'
        }
    }) 
})
router.get('/sitemap',siteMapNonAuthenticated, (req, res) => {
    res.render('sitemap-loggedout')
})
