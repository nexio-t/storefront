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

  // Global variables 
  var purchaseQuantity; 

  var newQuantity; 

  var grandTotal; 


  function startAgainOrExit () {

    inquirer
    .prompt({
      name: "startOrExit",
      type: "list",
      message: "Would you like to buy another product?",
      choices: ["BUY AGAIN", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.startOrExit === "BUY AGAIN") {
        start();
      }
      else{
        connection.end();
      }
    });


  }

  function start() {
    
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;

        var displayTable = new Table({
            head: ["ID", "Product", "Price"], 
            colWidths: [6, 30, 40]
          });

        for (var i = 0; i < res.length; i++) {

            displayTable.push([res[i].item_id, res[i].product_name, res[i].price]); 

        }
        console.log(displayTable.toString());


    
       setTimeout(function() {questions();  }, 500);  
  
  function questions() { // function start 
    inquirer
    .prompt([
      {
      name: "product_id",
      type: "rawlist",
      message: "What is the ID of the product you'd like to purchase?",
      choices: function displayProductIDs() {

          var productList = []; 

          for (var i = 0; i < res.length; i++) {
              productList.push(res[i].item_id); 
          }
          return productList; 
            }
        }, 
      {
        name: "desired_units",
        type: "input",
        message: "How many units of the product would you like to purchase? ",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false + console.log(" Please enter a number!"); 
        }
      }
    ])
    .then(function(answer) { 
 
      // pull item id for that product in mysql
      
      itemID = answer.product_id; 
      
      connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        {
          item_id: answer.product_id,
        },
        function(err, result) {

          if (err) throw err;

            purchaseQuantity = parseInt(answer.desired_units); 

            if (answer.desired_units > result[0].stock_quantity) {
                console.log("Sorry, we only have " + result[0].stock_quantity + " in stock! Enter a smaller quantity or choose another product."); 
                setTimeout(function() {questions();  }, 3000);  
            } else {

                newQuantity = result[0].stock_quantity - answer.desired_units; 

                totalPrice(); 
                // updateStock(); 
            }
         
        }
      ); // connection.query end

    }); // inquirer then end 
  } // function end 

}); // connection.query end 

} // function start end 


function totalPrice() {
 
    connection.query(
        "SELECT price FROM products WHERE ?",
        {
          item_id: itemID,
        },
        function(err, result) {
    
          if (err) throw err;

          grandTotal = result[0].price * purchaseQuantity; 

          console.log("Your total is: $" + result[0].price * purchaseQuantity); 

          updateStock(); 

        }
      ); 

}; 

function updateStock() {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: newQuantity,
          product_sales: grandTotal
        },
        {
          item_id: itemID
        }],
        function(err) {
    
          if (err) throw err;

        }
      ); 

      setTimeout(function() {startAgainOrExit();  }, 500); 

}; 