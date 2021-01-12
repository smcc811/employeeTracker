const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const promptMessages = {
  viewEmployees: "View All Employees",
  viewDepartment: "View All Departments",
  viewRoles: "View All Roles",
  addDepartment: "Add Department",
  addEmployee: "Add An Employee",
  addRole: "Add Role",
  removeEmployee: "Remove An Employee",
  removeDepartment: "Remove Department",
  removeRole: "Remove Role",
  updateRole: "Update Role",
  updateEmployee: "Update Employee",
  updateDepartment: "Update Department",
  exit: "Exit",
};

const db = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "9655STEVEN",
  database: "employee_information",
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected");
  prompt();
});

function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        promptMessages.viewEmployees,
        promptMessages.viewDepartment,
        promptMessages.viewRoles,
        promptMessages.addDepartment,
        promptMessages.addEmployee,
        promptMessages.addRole,
        promptMessages.removeEmployee,
        promptMessages.removeDepartment,
        promptMessages.removeRole,
        promptMessages.updateRole,
        promptMessages.updateEmployee,
        promptMessages.updateDepartment,
        promptMessages.exit,
      ],
    })
    .then((answer) => {
      console.log("answer", answer);
      switch (answer.action) {
        case promptMessages.viewEmployees:
          viewEmployees();
          break;

        case promptMessages.viewDepartment:
          viewDepartments();
          break;

        case promptMessages.viewRoles:
          viewRoles();
          break;

        case promptMessages.addDepartment:
          addDepartment();
          break;

        case promptMessages.addEmployee:
          addEmployee();
          break;

        case promptMessages.addRole:
          addRole();
          break;

        case promptMessages.removeEmployee:
          removeEmployee();
          break;

        case promptMessages.removeDepartment:
          removeDepartment();
          break;

        case promptMessages.removeRole:
          removeRole();
          break;

        case promptMessages.updateRole:
          updateRole();
          break;

        case promptMessages.updateEmployee:
          updateEmployee();
          break;

        case promptMessages.updateDepartment:
          updateDepartment();
          break;

        case promptMessages.exit:
          db.end();
          break;
      }
    });
}

// add role logic

function addRole() {
  const questions = [
    {
      type: "input",
      name: "titleInfo",
      message: "please enter job title",
      description: "title info",
    },

    {
      type: "input",
      name: "salary",
      message: " Please enter salary",
      description: "salary",
    },

    {
      type: "input",
      name: "department",
      message: "Please enter department",
      description: "department",
    },
  ];

  inquirer.prompt(questions).then((response) => {
    db.query(
      "INSERT INTO role SET ?",
      {
        TITLE: response.titleInfo,
        SALARY: response.salary,
        DEPARTMENT_ID: response.department,
      },
      (err, res) => {
        if (err) throw err;
        console.log("record inserted into Role Table");
        console.log("");
        console.log("");
        prompt();
      }
    );
  });
}

// add new employee logic starts here

function addEmployee() {
  const questions1 = [
    {
      type: "input",
      name: "firstName",
      message: "please enter first  name",
      description: "first name info",
    },

    {
      type: "input",
      name: "lastName",
      message: "please enter last  name",
      description: "last name info",
    },

    {
      type: "input",
      name: "roleID",
      message: "please enter role ID",
      description: "role ID info",
    },

    {
      type: "input",
      name: "mgrID",
      message: "please enter manager id",
      description: "mgr id info",
    },
  ];

  inquirer.prompt(questions1).then((response) => {
    console.log(response);

    db.query(
      "INSERT INTO employee SET ?",
      {
        firstName: response.firstName,
        lastName: response.lastName,
        roleID: response.roleID,
        managerID: response.mgrID,
      },
      (err, res) => {
        if (err) throw err;
        console.log("record inserted into employee table");
        console.log("");
        console.log("");
        prompt();
      }
    );
  });
}

// add department logic starts here

function addDepartment() {
  const questions2 = [
    {
      type: "input",
      name: "Name",
      message: "please enter department name",
      description: "department name info",
    },
  ];

  inquirer.prompt(questions2).then((response) => {
    console.log(response);

    db.query(
      "INSERT INTO department SET ?",
      {
        NAME: response.Name,
      },
      (err, res) => {
        if (err) throw err;
        console.log("record inserted into Department Table");
        prompt();
      }
    );
  });
}

function viewDepartments() {
  const query = `SELECT id, NAME
  FROM department `;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompt();
  });
}

function viewEmployees() {
  const query = `SELECT id, firstName, lastName,roleID,managerID
     FROM employee`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompt();
  });
}

function viewRoles() {
  const query = `SELECT id, title, salary, department_ID
  FROM role`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompt();
  });
}

// // delete employee data
function removeEmployee() {
  const query = `SELECT id, firstName, lastName, roleID, managerID
    FROM employee`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id when deleting row");

    const questions6 = [
      {
        type: "input",
        name: "answer",
        message: "delete role by id",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      console.log(response.answer);

      const sql = `DELETE FROM employee WHERE id = ?`;

      db.query(sql, response.answer, (err, res) => {
        if (err) throw err;
        console.log("record has been removed");
        prompt();
      });
    });
  });
}

function removeDepartment() {
  const query = `SELECT id, NAME
    FROM department`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id when deleting row");

    const questions6 = [
      {
        type: "input",
        name: "answer",
        message: "delete role by id",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      console.log(response.answer);

      const sql = `DELETE FROM department WHERE id = ?`;

      db.query(sql, response.answer, (err, res) => {
        if (err) throw err;
        console.log("record has been removed");
        prompt();
      });
    });
  });
}

function removeRole() {
  const query = `SELECT id, TITLE, SALARY, DEPARTMENT_ID
      FROM role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id when deleting row");
    //});

    const questions6 = [
      {
        type: "input",
        name: "answer",
        message: "delete role by id",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      console.log(response.answer);
      //});

      const sql = `DELETE FROM role WHERE id = ?`;

      db.query(sql, response.answer, (err, res) => {
        if (err) throw err;
        console.log("record has been removed");
        prompt();
      });
    });
  });
}

//update role logic here

function updateRole() {
  const query = `SELECT id, SALARY
      FROM role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id when updating row");
    //});

    const questions6 = [
      {
        type: "input",
        name: "role_id",
        message: "Enter role id",
      },

      {
        type: "input",
        name: "salary",
        message: "Enter Salary",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      console.log(response.role_id);
      console.log(response.salary);

      const sql = `UPDATE role SET salary = ? where id = ?`;
      let data = [response.salary, response.role_id];

      db.query(sql, data, (err, res) => {
        if (err) throw err;
        console.log("record has been updated");
        prompt();
      });
    });
  });
}

function updateEmployee() {
  const query = `SELECT id, firstName, lastName, roleID, managerID FROM employee`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id(s) when updating row");
    //});

    const questions6 = [
      {
        type: "input",
        name: "employee_id",
        message: "Enter employee id on far left",
      },

      {
        type: "input",
        name: "role_id",
        message: "Enter role id",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      const sql = `UPDATE employee SET roleID = ?  WHERE id = ?`;
      let data = [response.role_id, response.employee_id];

      db.query(sql, data, (err, res) => {
        if (err) throw err;
        console.log("record has been updated");
        prompt();
      });
    });
  });
}

function updateDepartment() {
  const query = `SELECT id, NAME
    FROM department`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("");
    console.log("please select id when updating row");

    const questions6 = [
      {
        type: "input",
        name: "department_id",
        message: "Enter department id on far left",
      },

      {
        type: "input",
        name: "NAME",
        message: "Enter  Department name ",
      },
    ];

    inquirer.prompt(questions6).then((response) => {
      const sql = `UPDATE department SET NAME = ? where id = ?`;
      let data = [response.NAME, response.department_id];

      db.query(sql, data, (err, res) => {
        if (err) throw err;
        console.log("record has been updated");
        prompt();
      });
    });
  });
}
