import express from 'express';
import pool  from '../pool.js';

const router = express.Router();
const table  = 'TMP_PERACE_WR';


router.get('/', (req, res) => {
    
    pool.getConnection((err) => {
        if (err) throw err;
        console.log("Connected!");
        res.send(`Specified the Contract number for debt!!`);
    });
   
});

router.get('/list', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query("SELECT * FROM " + table , function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});


router.get('/info/:wr', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        var $wr = req.params.wr;
        conn.query(`SELECT * FROM ${table} WHERE WORK_REQUEST_ID = '${$wr}'`, function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        }); 
        pool.releaseConnection(conn);    
    });
   
});


export default router;