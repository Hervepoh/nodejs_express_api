// Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{8,255}$/;

// Routes
module.exports = {

  register: function (req, res) {

    // Params
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

    if (email == null || username == null || password == null || password_confirm == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (password != password_confirm) {
      return res.status(400).json({ 'error': 'password invalid (password and password_confirm most be the same' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 8 - 255 and include 1 number at least)' });
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          attributes: ['username'],
          where: { username: username }
        })
          .then(function (userFound) {
            done(null, userFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },
      function (userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function (userFound, bcryptedPassword, done) {
        var newUser = models.User.create({
          email: email,
          username: username,
          password: bcryptedPassword,
          isAdmin: 0
        })
          .then(function (newUser) {
            done(newUser);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'cannot add user' });
          });
      }
    ], function (newUser) {
      if (newUser) {
        return res.status(201).json({
          'userId': newUser.id,
          'username': newUser.username,
          'email': newUser.email,
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });


  },

  login: function (req, res) {

    // Params
    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          where: { username: username }
        })
          .then(function (userFound) {
            done(null, userFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },
      function (userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function (userFound, resBycrypt, done) {
        if (resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function (userFound) {
      if (userFound) {
        return res.status(200).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });

  },

  getUserProfile: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    console.log(headerAuth);
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(401).json({ 'error': 'Authorization information is missing or invalid.' });

    models.User.findOne({
      attributes: ['id', 'email', 'username'],
      where: { id: userId }
    }).then(function (user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    }).catch(function (err) {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  },

  updateUserProfile: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    
    if (userId < 0)
      return res.status(401).json({ 'error': 'Authorization information is missing or invalid.' });

    // Params
    var email = req.body.email;
    var password = req.body.password;

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          attributes: ['id'],
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },
      function (userFound, done) {
        if (userFound) {
          userFound.update({
            email: (email ? email : userFound.email),
            password: (password ? password : userFound.password)
          }).then(function () {
            done(userFound);
          }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function (userFound) {
      if (userFound) {
        return res.status(200).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
  }
}