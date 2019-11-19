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
    // do this 
    


  };


  function createNewDept() {
    // do this
  };