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


  function start() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);
    
       setTimeout(function() {questions();  }, 500);  
  
  function questions() { // function start 
    inquirer
    .prompt({
      name: "product_id",
      type: "rawlist",
      message: "What is the ID of the product you'd like to purchase?",
      choices: function displayProductIDs() {

          var productList = []; 

          for (var i = 0; i < res.length; i++) {
              productList.push(res[i].item_id); 
          }
          return productList; 
      }, 
      {

      }

    })
    .then(function(answer) { 
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "POST") {
        postAuction();
      }
      else if(answer.postOrBid === "BID") {
        bidAuction();
      } else{
        connection.end();
      }
    }); // inquirer then end 
  } // function end 

}); // connection.query end 

} // function start end 