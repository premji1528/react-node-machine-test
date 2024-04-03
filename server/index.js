const express = require('express');
const mysql = require('mysql');
const app = express(), cors = require('cors');

app.use(cors());
const studentMock = require("./studentsMock.json");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentlist'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }

    let createStudentTable = `create table if not exists students(
        id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(32) NOT NULL,
        marks varchar(32) DEFAULT NULL, dep varchar(32) DEFAULT NULL,
        status tinyint(1) not null default 0
    )`;

    connection.query(createStudentTable, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    console.log('Connected to the database as ID ' + connection.threadId);
});

app.get('/api/students1', (req, res) => {
    connection.query('SELECT * FROM students where status = 1', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch active students' });
        }

        res.status(200).json(results);
    });
});

app.get('/api/students2', (req, res) => {
    connection.query('SELECT * FROM students where status = 0', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch in active students' });
        }

        res.status(200).json(results);
    });
});

app.get('/api/students/seed', (req, res) => {
    connection.query('INSERT INTO students (name, marks, dep, status) VALUES ?', [studentMock], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to insert user' });
        }

        // Send a success response
        res.json({ message: 'User inserted successfully', status: results });
    });
});

// Start the server
app.listen(3100, () => {
    console.log('Server is running on port 3100');
});
