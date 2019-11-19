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
      choices: ["View product sales by department", "Create new deparment", "Exit"]
    })
    .then(function(answer) {
      
      switch(answer.managerOptions) {

          case "View product sales by department":
            console.log("this works"); 
            viewProductsByDept();
            break; 

          case "Create new department":
            console.log("this works"); 
            createNewDept(); 
            break; 

          case "Exit": 
            console.log("this works"); 
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
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id",
        
        function(err, result) {
    
          if (err) throw err;
          console.table(result); 

        //   var displayTable = new Table({
        //     head: ["ID", "Product", "Department", "Price", "Stock"], 
        //     colWidths: [6, 30, 40, 30, 30]
        //   });

        //   for (var i = 0; i < result.length; i++) {

        //       displayTable.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]); 

        //   }
        //   console.log(displayTable.toString()); 

        //   setTimeout(function() {start();  }, 1000);  

        }
      ); 







  };


  function createNewDept() {
    // do this
  };