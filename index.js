const db = require("./db/connection");
const inquirer = require("inquirer");

function mainQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee",
          "QUIT",
        ],
        name: "choice",
      },
    ])
    .then(({ choice }) => {
      switch (choice) {
        // return: formatted table showing department names and department ids
        case "View all departments":
          viewDepartments();
          break;
        // return: job title, role id, department that role belongs to, salary for that role
        case "View all roles":
          viewRoles();
          break;
        // return: formatted table showing employee data: employee ids firt and last names, job titles, departments, slaraiesmanagers
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee":
          updateEmployee();
          break;
        default:
          process.exit(0);
          break;
      }
    });
}

mainQuestion();

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    setTimeout(mainQuestion, 5000);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    setTimeout(mainQuestion, 5000);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    setTimeout(mainQuestion, 5000);
  });
}

