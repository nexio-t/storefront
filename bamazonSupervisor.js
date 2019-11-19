var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');
require("dotenv").config(); 


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.MY_SQL_PASS,
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId); 
    start(); 
  });


  function start() {
    inquirer
    .prompt({
      name: "managerOptions",
      type: "list",
      message: "What would you like to do?",
      choices: ["View product sales by department", "Create new department", "Exit"]
    })
    .then(function(answer) {
      
      switch(answer.managerOptions) {

          case "View product sales by department":
            viewProductsByDept();
            break; 

          case "Create new department":
            createNewDept()
            break; 

          case "Exit": 
            connection.end();
            break; 

      }; // switch end 
    }); // then end 

  } // start function end

  function viewProductsByDept() {

    // do an inner join 
    // then during push, just subtract diff. from product and sales

    // "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments JOIN products ON department.department_id = products.department_name"

    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id",
        
        function(err, result) {
    
          if (err) throw err;

          var displayTable = new Table({
            head: ["ID", "Department", "Overhead", "Sales", "Total Profit"], 
            colWidths: [6, 40, 40, 15, 15]
          });

          for (var i = 0; i < result.length; i++) {

            var profit = result[i].over_head_costs - result[i].sales; 

              displayTable.push([result[i].department_id, result[i].department_name, result[i].over_head_costs, result[i].sales, profit]); 

          }
          console.log(displayTable.toString()); 

          setTimeout(function() {start();  }, 1000);  

        }
      ); 







  };


  function createNewDept() {

    inquirer
    .prompt(
    [{
      name: "departmentName",
      type: "input",
      message: "What is the new department's name?"
    },
    {
        name: "ohCosts",
        type: "input",
        message: "What are the department's fixed overhead costs?"
    }]).then(function(answer) {

        console.log("Department successfully added!"); 
        setTimeout(function() {start();  }, 1000);  

        var department = answer.departmentName;
        var costs = answer.ohCosts; 

        connection.query(
            "INSERT INTO departments SET ?",
            [{
              department_name: department,
              over_head_costs: costs
            }],
            function(err) {
        
              if (err) throw err;
    
            }

          ); // connection query end 
    }); // then end 

  };