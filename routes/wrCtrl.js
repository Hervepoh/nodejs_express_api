// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
var mysql = require('mysql');

// Constants
const ITEMS_LIMIT = 50;
var con = mysql.createConnection({
  host: "10.241.132.93",
  database: "PERACESDB",
  user: "peracesadmin",
  password: "Welcome123!"
});
const table = 'TMP_PERACE_WR';

// Routes
module.exports = {

  list: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId == -1) {
      res.status(401).json({ "error": "Unauthorized ressource , you need to authentify" });
    }

    con.query("SELECT * FROM " + table, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });

  },

  info: function (req, res) {

    con.connect(function (err) {
      if (err) throw err;
      var $wr = req.params.wr;
      conn.query(`SELECT * FROM ${table} WHERE WORK_REQUEST_ID = '${$wr}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });

  }
}