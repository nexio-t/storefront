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
            addInventory(); 
            break; 

          case "Add new product":
            console.log("this works"); 
            newProduct(); 
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
            colWidths: [6, 30, 40, 30, 30]
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
    console.log("this works!"); 

    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, result) {
    
        if (err) throw err;

        console.table(result);

        var displayTable = new Table({
            head: ["ID", "Product", "Stock"], 
            colWidths: [6, 30, 40, 30, 30]
          });

        for (var i = 0; i < result.length; i++) {

            displayTable.push([result[i].item_id, result[i].product_name, result[i].stock_quantity]); 

        }
        console.log(displayTable.toString());

    inquirer
    .prompt(
    {
      name: "productID",
      type: "rawlist",
      message: "To which product would you like to add inventory?", 
      choices: function displayProducts() {

        var productList = []; 

          for (var i = 0; i < result.length; i++) {
              productList.push(result[i].item_id); 
          }
          return productList; 
    
      } // function end 
    })
    .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        
        
        console.log(asnwer.productID); 

      });

    });

}

function newProduct() {

    inquirer
    .prompt(
    [{
      name: "productName",
      type: "input",
      message: "What is the product name?"
    },
    {
        name: "productDept",
        type: "input",
        message: "What is the relevant department for this product?"
    },
    {
        name: "productPrice",
        type: "input",
        message: "What is the price of this product ($)?"
    }, 
    {
        name: "productStock",
        type: "input",
        message: "What is this item's inventory?"
    }
    ]).then(function(answer) {

        console.log("Product successfully added!"); 
        setTimeout(function() {start();  }, 1000);  

        var product = answer.productName;
        var department = answer.productDept; 
        var price = answer.productPrice; 
        var stock = answer.productStock; 

        connection.query(
            "INSERT INTO products SET ?",
            [{
              product_name: product,
              department_name: department,
              price: price,
              stock_quantity: stock
            }],
            function(err) {
        
              if (err) throw err;
    
            }

          ); // connection query end 
    }); // then end 
}; // new product function end 

