import express from 'express';
import mysql2 from 'mysql2';

const router = express.Router();



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
        conn.query("SELECT * FROM TMP_PERACE_DEBT", function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });  
        pool.releaseConnection(conn);    
      });
   
});


router.get('/contrat/:contrat', (req, res) => {
    
    pool.getConnection(function(err, conn) {
        if (err) throw err;
        var $contrat = req.params.contrat;
        conn.query(`SELECT * FROM TMP_PERACE_DEBT WHERE CONTRAT = ${$contrat}`, function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        }); 
        pool.releaseConnection(conn);    
    });
   
});


export default router;