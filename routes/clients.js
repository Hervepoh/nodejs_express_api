import express from 'express';
import mysql2 from 'mysql2';
import pool  from '../pool.js';

const router = express.Router();
const table  = 'TMP_PERACE_CLIENT';

router.get('/', (req, res) => {
    
    pool.getConnection((err) => {
        if (err) throw err;
        console.log("Connected!");
        res.send(`Connected to the database !!`);
    });
   
});

router.get('/list', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query("SELECT * FROM "+ table, function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});

router.get('/compteur', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        var compteur = req.params;
        conn.query(`SELECT * FROM ${table} WHERE COMPTEUR = ${compteur}`, function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});

router.get('/count', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query("SELECT count(*) FROM TMP_PERACE_CLIENT", function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});

router.get('/recap', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query("SELECT REGION, DIVISION, AGENCE, COUNT(*) AS NB_CLIENTS FROM TMP_PERACE_CLIENT GROUP BY REGION, DIVISION, AGENCE", function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});


export default router;