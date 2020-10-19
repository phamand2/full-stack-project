module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  //EDITS BY KATE AND JAX START HERE
  siteMapAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    //if the user is NOT authenticated, pass them the NON authenticated sitemap
    res.redirect('/sitemap/public')
  },
  siteMapNonAuthenticated: function(req, res, next) {
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/sitemap')
  }
};
