var mysql = require("mysql");
var inquirer = require("inquirer");
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

// Connection ID  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId); 
    start(); 
  });


/********TO DO: 
 
    (1) Add connection.end() somewhere 

 *************/

// Start Function 

  function start() {

    inquirer
    .prompt({
      name: "managerOptions",
      type: "list",
      message: "What would you like to do?",
      choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
    })
    .then(function(answer) {
      
      
      switch(answer.managerOptions) {

          case "View products for sale":
            console.log("this works");  
            // viewProducts();
            break; 

          case "View low inventory":
            console.log("this works"); 
            // lowInventory(); 
            break; 

          case "Add to inventory":
            console.log("this works"); 
            // addInventory(); 
            break; 

          case "Add new product":
            console.log("this works"); 
            // newProduct(); 
            break;
          case "Exit": 
            console.log("this works"); 
            connection.end();
            break; 

      }; // switch end 
    }); // then end 
  } // start() end 