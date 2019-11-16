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

  var purchaseQuantity; 
  var itemPrice;    

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

            if (answer.desired_units > result) {
                console.log("Sorry, we only have " + result + " in stock left! Enter a smaller quantity"); 
            } else {
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

          console.log("purchase quantity typeof " + typeof purchaseQuantity); 

          var price = parseInt(result); 

          console.log(purchaseQuantity * result); 

          console.log("Price typeof " + typeof price);

          var quantityInt = parseInt(purchaseQuantity); 

          console.log("Quantity typeof " + quantityInt); 
    
          if (err) throw err;

          console.log("total cost is: " + (price * purchaseQuantity)); 

        }
      ); 

}; 

// function updateStock() {


// }; 