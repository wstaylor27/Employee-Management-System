const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const connection = require("./config/connection");
const cTable = require("console.table");
const express = require("express");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const employeeSystem = () => {
    inquirer.prompt({
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
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();

            }
        })
}

employeeSystem();

viewEmployees = () => {
    const sql = `SELECT id, first_name, last_name AS title FROM employee`;

    db.query(sql, (err, res) => {
        console.table(res);
        employeeSystem();
    });
}

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });