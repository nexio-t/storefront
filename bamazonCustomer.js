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

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId); 
    start(); 
  });

  // Global variables 
  var purchaseQuantity; 
  var itemPrice;    
  var newQuantity; 

  function start() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);
    
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
                console.log("Sorry, we only have " + result[0].stock_quantity + " in stock left! Enter a smaller quantity or choose another product."); 
                setTimeout(function() {questions();  }, 3000);  
            } else {

                newQuantity = result[0].stock_quantity - answer.desired_units;

                console.log("New quantity is: " + newQuantity); 

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

          console.log("Your total is: $" + result[0].price * purchaseQuantity); 

          updateStock(); 

        }
      ); 

}; 

function updateStock() {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: newQuantity
        },
        {
          item_id: itemID
        }],
        function(err) {
    
          if (err) throw err;

        }
      ); 

      setTimeout(function() {start();  }, 3000); 

}; 