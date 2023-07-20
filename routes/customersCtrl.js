// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
var mysql = require('mysql');

// Constants
const ITEMS_LIMIT = 50;
const table = 'TMP_PERACE_CLIENT';
var con = mysql.createConnection({
  host: "10.241.132.93",
  database: "PERACESDB",
  user: "peracesadmin",
  password: "Welcome123!"
});


// Routes
module.exports = {

  list: function (req, res) {

    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId == -1) {
      res.status(401).json({ "error": "Unauthorized ressource , you need to authentify" });
    }

    // Getting Query
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;

    offset = (!isNaN(offset)) ? offset : 1;
    limit = (!isNaN(limit)) ? limit : ITEMS_LIMIT;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    con.query(`SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });

  },

  count: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId == -1) {
      res.status(401).json({ "error": "Unauthorized ressource , you need to authentify" });
    }

    con.query(`SELECT COUNT(*) AS NB FROM ${table}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });

  },

  recap: function (req, res) {

    con.connect(function (err) {
      if (err) throw err;
      con.query(`SELECT REGION, DIVISION, AGENCE, COUNT(*) FROM ${table} GROUP BY REGION, DIVISION, AGENCE`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });

  }
}