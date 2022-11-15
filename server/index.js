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

const checkTokenAccess = (projectId, userId, token, res) => {
    if(tokenAccess[userId] === undefined) {
        res.send({status: 401, message: 'Unauthorized', data: {} });
        return false;
    } else if(tokenAccess[userId].token !== token || tokenAccess[userId].projectId !== projectId) {
        res.send({status: 401, message: 'Unauthorized', data: {} });
        return false;
    } 
    return true
}

let tokenAccess = {
}

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.post('/tasksStatusNames', (req, res) => {
    const projectId = req.headers.projectid;
    const userId = req.headers.userid;
    const token = req.headers.token;

    if(!checkTokenAccess(projectId, userId, token, res)) {
        return;
    }
    
    db.query(`SELECT * FROM projectTasksNames WHERE isActive=1`, (error, results) => {
        const returnResult = {status: 200, message: 'Success', data: [] };

        if (error) {
            returnResult.status = 500;
            returnResult.message = error;
        }
        returnResult.data = results;
        res.send(returnResult);
    });
});

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

app.post('/checkProjectAccess', (req, res) => {
    const projectId = req.headers.projectid;
    const userId = req.headers.userid;

    // const projectId = req.query.id
    // const userId = req.query.userid


    db.query(`SELECT
                    *
                FROM
                    projects as t1
                    INNER JOIN projectPriority as t2 ON t1.projectPriority = t2.priorityId
                    INNER JOIN projectAccess as t3 ON t3.userId = ? AND t3.projectId = t1.projectId
                WHERE t1.projectId = ?`
            ,[userId, projectId]
            ,(error, results) => {
                const returnResult = {status: 200, message: 'Success', token:'' };

                if (error) {
                    returnResult.status = 500;
                    returnResult.message = error;
                } else {            
                    if(results.length === 0) {
                        returnResult.status = 401;
                        returnResult.message = 'Unauthorized';
                    } else {
                        returnResult.token = require('crypto').randomBytes(64).toString('hex');
                        tokenAccess[userId] = {token: returnResult.token, projectId: projectId};
                    }
                }
                console.log(tokenAccess)
                res.send(returnResult);
            })
});

app.post('/projectData', (req, res) => {
    const projectId = req.headers.projectid;
    const userId = req.headers.userid;
    const token = req.headers.token;
    
    // const projectId = req.query.id
    // const userId = req.query.userid
    // const token = req.query.token

    if(!checkTokenAccess(projectId, userId, token, res))
        return;

    db.query(`SELECT
                    *
                FROM
                    projects as t1
                    INNER JOIN projectPriority as t2 ON t1.projectPriority = t2.priorityId
                WHERE t1.projectId = ?`
            ,[projectId]
            ,(error, results) => {
                const returnResult = {status: 200, message: 'Success', data: {} };

                if (error) {
                    returnResult.status = 500;
                    returnResult.message = error;
                } else {
                    if(results.length === 0) {
                        returnResult.status = 404;
                        returnResult.message = 'Not found';
                    } else {
                        // Convert the item.projectCreatedDate to a readable format
                        const date = new Date(results[0].projectCreatedDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
                        returnResult.data = {
                            projectId: results[0].projectId,
                            projectName: results[0].projectName,
                            projectDescription: results[0].projectDescription,
                            projectDate: date ,
                            projectTime: results[0].projectTime,
                            projectPriority: results[0].priorityName,
                            projectStatus: results[0].projectStatus,
                        }
                    }
                }
                res.send(returnResult);
            })
});

app.post('/projectTasks', (req, res) => {
    const projectId = req.headers.projectid;
    const userId = req.headers.userid;
    const token = req.headers.token;

    // const projectId = req.query.id;
    // const userId = req.query.userid;
    // const token = req.query.token;

    if(!checkTokenAccess(projectId, userId, token, res))
        return;


    db.query(`SELECT
                    t1.id,
                    t1.taskUserId,
                    t1.taskName,
                    t1.taskDescription,
                    t1.taskCreatedDate,
                    t3.name as taskStatus,
                    t2.priorityName as taskPriority
                FROM
                    projectTasks as t1
                    INNER JOIN projectPriority as t2 ON t1.taskPriority = t2.priorityId
                    INNER JOIN projectTasksNames as t3 ON t1.taskStatus = t3.id
                WHERE 
                    t1.projectId = ?`
            ,[projectId]
            ,(error, results) => {
                const returnResult = {status: 200, message: 'Success', data: [] };

                if (error) {
                    returnResult.status = 500;
                    returnResult.message = error;
                } else {
                    if(results.length === 0) {
                        returnResult.status = 404;
                        returnResult.message = 'Not found';
                    } else {
                        returnResult.data = results.map((item) => {
                            // Convert the item.taskCreatedDate to a readable format
                            const date = new Date(item.taskCreatedDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
                            return {
                                taskId: item.taskId,
                                taskName: item.taskName,
                                taskDescription: item.taskDescription,
                                taskDate: date,
                                taskTime: item.taskTime,
                                taskPriority: item.priorityName,
                                taskStatus: item.taskStatus,
                                taskUserId: item.taskUserId,
                            }
                        })
                    }
                }
                res.send(returnResult);
            })
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
