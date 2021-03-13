const express = require('express');
const router = express.Router();
 const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User_parent');
 const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login',forwardAuthenticated, (req, res) => res.render('login'));

// Login Page
router.get('/login/complete',forwardAuthenticated, (req, res) => res.render('complete'));

// Register Page
router.get('/register', forwardAuthenticated,(req, res) => res.render('register'));

// // Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
 });


 //users/login/complete
 router.post('/login/complete', (req, res) => {
  const {  email, adhaar, cage,hrs} = req.body;
  let errors = [];

  if ( !email || !adhaar || !cage || !hrs)
    errors.push({ msg: 'Please enter all fields' });
  }



  if (cage < 0) {
    errors.push({ msg: 'Age cant be negative' });
  }
  if (adhar.length < 12) {
    errors.push({ msg:'Fill a valid adhaar number' });
  }

  if (errors.length > 0) {
    res.render('complete', {
      errors,
      email,
      adhaar,
      cage,hrs
    });
  } else {
    //Validation passed
    ParentDetails.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('complete', {
          errors,
          email,
        adhaar,cage,hrs
        });
      } else {
        const newParentDetails = new User({
          email,
          adhaar,
          cage,
          hrs
        });
        
        newParentDetails
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Your profile is now complete!'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
 });
//
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
