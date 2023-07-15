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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to create?",
        name: "name",
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO department SET ?", answers, function (err) {
        if (err) throw err;
        console.log("Department Created");
        setTimeout(mainQuestion, 2000);
      });
    });
}

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    const departments = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role you would like to create?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department does this role belong to?",
          name: "department_id",
          choices: departments,
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO role SET ?", answers, function (err) {
          if (err) throw err;
          console.log("Role Created");
          setTimeout(mainQuestion, 2000);
        });
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    const roles = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", function (err, results) {
      const employees = results.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the first name of the employee you want to add?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the last name of the employee you want to add?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What role does this employee have?",
            name: "role_id",
            choices: roles,
          },
          {
            type: "list",
            message: "What manager does this employee have?",
            name: "manager_id",
            choices: employees,
          },
        ])
        .then((answers) => {
          db.query("INSERT INTO employee SET ?", answers, function (err) {
            if (err) throw err;
            console.log("Employee Created");
            setTimeout(mainQuestion, 2000);
          });
        });
    });
  });
}

function updateEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    const roles = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", function (err, results) {
      const employees = results.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "What employee do you want to update?",
            name: "employee_id",
            choices: employees,
          },
          {
            type: "list",
            message: "What is this employees new role?",
            name: "role_id",
            choices: roles,
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            answers,
            function (err) {
              if (err) throw err;
              console.log("Employee Updated");
              setTimeout(mainQuestion, 2000);
            }
          );
          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
            roleId,
            employeeId,
          ]);
        });
    });
  });
}