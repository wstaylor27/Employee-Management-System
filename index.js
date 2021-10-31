const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const db = require("./config/connection");
const cTable = require("console.table");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const employeeSystem = () => {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
      }
    });
};

// View all employees
const viewEmployees = () => {
  const sql = `
    SELECT 
        employee.id, 
        employee.first_name AS "first name", 
        employee.last_name AS "last name", 
        roles.title, 
        department.department_name AS "department", 
        roles.salary AS "salary",
        CONCAT(manager.first_name, " ", manager.last_name) AS "manager"
    FROM employee
    LEFT JOIN roles
        ON roles.id = employee.role_id
    LEFT JOIN department
        ON department.id = roles.department_id
    LEFT JOIN employee manager
        ON manager.id = employee.manager_id
    ORDER BY employee.id`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);

    employeeSystem();
  });
};

// Add an employee
const addEmployee = () => {
  let roleChoices = [];
  let managerChoices = [];
  db.promise()
    .query("SELECT id, title FROM company_db.roles;")
    .then(([rows, fields]) => {
      roleChoices = rows.map((row) => ({
        name: row.title,
        value: row.id,
      }));

      db.promise()
        .query(
          `SELECT id, concat(first_name, " ", last_name) AS name FROM company_db.employee;`
        )
        .then(([rows, fields]) => {
          managerChoices = rows.map((row) => ({
            name: row.name,
            value: row.id,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "roleID",
                message: "What is the employee's role?",
                choices: roleChoices,
              },
              {
                type: "list",
                name: "managerID",
                message: "Who is the manager?",
                choices: managerChoices,
              },
            ])
            .then((answer) => {
              console.log("****", answer);
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
              db.query(
                sql,
                [
                  answer.firstName,
                  answer.lastName,
                  answer.roleID,
                  answer.managerID,
                ],
                (err, res) => {
                  if (err) throw err;
                },
                console.log("success!")
              );
              employeeSystem();
            });
        });
    });
};
// Update an employee
const updateEmployee = () => {
  let employeeChoices = [];
  let roleChoices = [];
  let managerChoices = [];

  db.promise()
    .query(
      `SELECT id, concat(first_name, " ", last_name) AS name FROM company_db.employee;`
    )
    .then(([rows, fields]) => {
      employeeChoices = rows.map((row) => ({
        name: row.name,
        value: row.id,
      }));

      db.promise()
        .query(`SELECT id, title FROM company_db.roles;`)
        .then(([rows, fields]) => {
          roleChoices = rows.map((row) => ({
            name: row.title,
            value: row.id,
          }));

          db.promise()
            .query(
              `SELECT id, concat(first_name, " ", last_name) AS name FROM company_db.employee;`
            )
            .then(([rows, fields]) => {
              managerChoices = rows.map((row) => ({
                name: row.name,
                value: row.id,
              }));
              db.promise()
        .query(`SELECT id, department_name FROM company_db.department`)
        .then(([rows, fields]) => {
            departmentChoices = rows.map((row) => ({
                name: row.department_name,
                value: row.id,
            }))

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "currentEmployeeID",
                    message: "Who is the employee you want to update?",
                    choices: employeeChoices,
                  },
                  {
                    type: "list",
                    name: "newRole",
                    message: "What is their new title?",
                    choices: roleChoices,
                  },
                  {
                    type: "input",
                    name: "newSalary",
                    message: "What is their new salary?",
                  },
                  {
                    type: "list",
                    name: "managerID",
                    message: "Who is the manager?",
                    choices: managerChoices,
                  },
                  {
                    type: "list",
                    name: "newDepartment",
                    message: "What department do they belong to?",
                    choices: departmentChoices
                  },
                ])
                .then((answer) => {
                  const sql = `UPDATE role SET id = ?, salary = ?, manager_id = ?, department_id = ? WHERE id =?`;
                  console.log(answer);
                  db.query(
                    sql,
                    [
                      answer.currentEmployeeID,
                      answer.newRole,
                      answer.newSalary,
                      answer.managerID,
                      answer.newDepartment,
                    ],
                    (err, res) => {
                      if (err) throw err;
                    },
                    console.log("success!")
                  );
                  employeeSystem();
                });
            });
        });
    });
});
};
// View all roles
const viewRoles = () => {
  const sql = `SELECT id, title, salary, department_id FROM roles`;

  db.query(sql, (err, res) => {
    console.table(res);
    employeeSystem();
  });
};

// Add a role
const addRole = () => {
    let departmentChoices = [];
    db.promise()
        .query(`SELECT id, department_name FROM company_db.department`)
        .then(([rows, fields]) => {
            departmentChoices = rows.map((row) => ({
                name: row.department_name,
                value: row.id,
            }))
                    
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "departmentID",
        message: "What is the department of this role?",
        choices: departmentChoices
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(
        sql,
        [answer.title, answer.salary, answer.departmentID],
        (err, res) => {
          if (err) throw err;
        },
        console.log("success!")
        
        );
        
        employeeSystem();
      
      
    });
    
})
};

// View all departments
const viewDepartments = () => {
  const sql = `SELECT id, department_name FROM department`;

  db.query(sql, (err, res) => {
    console.table(res);
    employeeSystem();
  });
};

// Add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(
        sql,
        [answer.name],
        (err, res) => {
          if (err) throw err;
        },
        console.log("success!")
      );
      employeeSystem();
    });
};

employeeSystem();
