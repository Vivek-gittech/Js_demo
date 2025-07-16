const express = require('express');
const mysql = require('mysql2');
const path=require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'VivekPatel@1146', // Replace with your MySQL password
  database: 'Student_database'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


// app.get('/register', (req, res) => {
//   const query = 'SELECT * FROM stu_login';
//   db.query(query,(err, result) => {
//     if (err) {
//       res.status(500).send('Error registering user');
//     } else {
//       res.status(201).json(result)
//     }
//   });
// });



app.post('/register', (req, res) => {
  console.log('Body',req.body);
  const { username, password } = req.body;

  const query = 'INSERT INTO stu_login (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Error registering user');
    } else {
      res.redirect('/index.html');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
