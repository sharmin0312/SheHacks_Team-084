const express = require('express');
const router = express.Router();
 const bcrypt = require('bcryptjs');
const passport = require('passport')
// Load User model
const Service = require('../models/service');
 const { forwardAuthenticated } = require('../config/auth1');

// Login Page
router.get('/login',forwardAuthenticated, (req, res) => res.render('login1'));

// Register Page
router.get('/register', forwardAuthenticated,(req, res) => res.render('register1'));

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
    res.render('register1', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //Validation passed
    Service.findOne({ email: email }).then(service=> {
      if (service) {
        errors.push({ msg: 'Email already exists' });
        res.render('register1', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newService = new Service({
          name,
          email,
          password
        });
        

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newService.password, salt, (err, hash) => {
            if (err) throw err;
            newService.password = hash;
            newService
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/service/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
 });

// Login
router.post('/login', (req, res, next) => {
  // passport.authenticate('local', {
  //   successRedirect: '/dashboard1',
  //   failureRedirect: '/dashboard1',
  //   failureFlash: true

  // })(req, res, next);
  res.render('/dashboard1');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/service/login');
});

module.exports = router;
