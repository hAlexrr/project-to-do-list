const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const bcrypt = require("bcrypt")
const mysql = require('mysql2');
const e = require('express');

const app = express();

// environment variables or you can say constants
env.config();

// Create connection to database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_TABLE,
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.post('/userProjects', (req, res) => {
    const userId = req.headers.userid;

    db.query(`SELECT 
                    * 
             FROM 
                projectAccess as t1
                INNER JOIN projects as t2 ON t1.projectId = t2.projectId 
                INNER JOIN projectPriority as t3 ON t2.projectPriority = t3.priorityId
                WHERE userId = ?`
            ,[userId]
            ,(error, results) => {
                const returnResult = {status: 200, message: 'Success', data: [] };

                if (error) {
                    returnResult.status = 500;
                    returnResult.message = error;
                } else {            
                    returnResult.data = results.map((item) => {
                            // Convert the item.projectCreatedDate to a readable format
                            const date = new Date(item.projectCreatedDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});

                            return {
                                projectId: item.projectId,
                                projectName: item.projectName,
                                projectDescription: item.projectDescription,
                                projectDate: date ,
                                projectTime: item.projectTime,
                                projectPriority: item.priorityName,
                                projectStatus: item.projectStatus,
                            }    
                        })
                }
                res.send(returnResult);
            });    
});

app.get('/hashpassword', (req, res) => {
    const password = req.query.password;
    const saltRounds = 10;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            res.send(hash);
        });    
    });
});



app.listen(9000, () => {
    db.connect()
    console.log('Server is running on port http://localhost:9000');
})

process.on('SIGINT', () => { 
    db.end() 
    console.log('Connection closed')
} );
process.on('SIGTERM', () => { 
    db.end() 
    console.log('Connection closed')
});
