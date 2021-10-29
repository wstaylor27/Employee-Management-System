const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '704taylor',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Create an Employee
app.post('/api/new-employee', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  
  const sql = `INSERT INTO employee (employee_name)
    VALUES (?)`;
  
  db.query(sql, first_name + last_name, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: req.body
    });
  });
});

// Read all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT id, first_name, last_name AS title FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
        return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete an employee
app.delete('api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});



// Create a Department
app.post('/api/new-department', (req, res) => {
  const department_name = req.body.department_name;
  const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
  
  db.query(sql, department_name, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: req.body
    });
  });
});

// Read all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT id, department_name AS title FROM department`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all roles and associated department name using LEFT JOIN
app.get('/api/roles', (req, res) => {
  const sql = `SELECT department.department_name AS department, roles.title, roles.id FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.department_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Update roles
app.put('/api/roles/:id', (req, res) => {
  const sql = `UPDATE roles SET title = ? WHERE id = ?`;
  const params = [req.body.title, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
