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
            viewProducts();
            break; 

          case "View low inventory":
            lowInventory(); 
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

function viewProducts() {

    connection.query(
        "SELECT * FROM products",
        
        function(err, result) {
    
          if (err) throw err;

          var displayTable = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock"], 
            colWidths: [5, 40, 22, 22, 22]
          });

          for (var i = 0; i < result.length; i++) {

              displayTable.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]); 

          }
          console.log(displayTable.toString()); 

          setTimeout(function() {start();  }, 1000);  

        }
      ); 

}; 

function lowInventory() {

    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", 
      
        function(err, result) {
    
          if (err) throw err;

          var displayTable = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock"], 
            colWidths: [5, 40, 22, 22, 22]
          });

          for (var i = 0; i < result.length; i++) {

              displayTable.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]); 

          }
          console.log(displayTable.toString()); 

          setTimeout(function() {start();  }, 1000);  

        }
      ); 

}

function addInventory() {

    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", 
      
        function(err, result) {
          console.log(result); 
          if (err) throw err;

        }


      ); 

}

