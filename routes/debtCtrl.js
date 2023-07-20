// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
var mysql2 = require('mysql2');

// Constants
const ITEMS_LIMIT = 50;
const pool = mysql2.createPool({
  host:"10.241.132.93",
  database:"PERACESDB",
  user:"peracesadmin",
  password:"Welcome123!",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
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

    pool.getConnection(function(err, conn) {
      if (err) throw err;
      conn.query("SELECT * FROM TMP_PERACE_DEBT", function(err, result, fields) {
          if (err) throw err;
          res.send(result);
      });  
      pool.releaseConnection(conn);    
    });
  
  },

  count: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId == -1) {
      res.status(401).json({ "error": "Unauthorized ressource , you need to authentify" });
    }

    pool.getConnection(function(err, conn) {
      if (err) throw err;
      conn.query("SELECT COUNT(*) AS NB FROM TMP_PERACE_DEBT", function(err, result, fields) {
          if (err) throw err;
          res.send(result);
      });  
      pool.releaseConnection(conn);    
    });
  },

  contrat: function (req, res) {
    
    pool.getConnection(function(err, conn) {
      if (err) throw err;
      var $contrat = req.params.contrat;
      conn.query(`SELECT * FROM TMP_PERACE_DEBT WHERE CONTRAT = ${$contrat}`, function(err, result, fields) {
          if (err) throw err;
          res.send(result);
      }); 
      pool.releaseConnection(conn);    
  });
   
  }
}