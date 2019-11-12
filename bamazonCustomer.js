//npm modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//local connection parameters
var connection = mysql.createConnection({
    host: "192.168.99.100",
    port: "3306",
    user: "root",
    password: "docker",
    database: "bamazon_DB"
});

//establish connection
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!")
    start();
});

//start function to show inventory in log
function start() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        console.log(" - - - - - - - - - - - - - - - ")
        console.log("item id: " + res[i].item_id);
        console.log("item: " + res[i].product_name);
        console.log("price: $" + res[i].price);
        console.log("stock quantity: " + res[i].stock_quantity);
    }
        bamazonQuestions();
})    
    };

//initial inquirer prompt questions
function bamazonQuestions(){
    inquirer
        .prompt([
        {
            type: "input",
            name: "id",
            message: "what is the ID of the item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("Please enter a valid item ID");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "what quantity of the item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('/n Please enter a valid quantity number');
                    return false;
                }
            }
        }
        ]).then(function(answer) {

        //query the user inputs from prompt questions
      connection.query("SELECT  * FROM products WHERE ?", {item_id: answer.id}, function (err, res) {
          if (err) throw err;
        
        //converting string to integer
          var quantity = parseInt(answer.quantity);

          if (res[0].stock_quantity >= quantity) {    
            console.log("Okay, your total to pay is = $" + parseFloat(res[0].price * quantity));         
            
            var updatedQuantity = res[0].stock_quantity - quantity;
         
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity},{item_id:answer.id} ], function(err,res){
                if (err) throw err;
                console.log("Updated quantity for item number" + " " + answer.id + " " + "is " + updatedQuantity);
                console.log("Thank you for shopping! Please come again!");
                connection.end();
            })
        } 
      
          if (res[0].stock_quantity < quantity){
            inquirer
            .prompt([
              {
                type: "input",
                message: "Out of Stock. Would you like to try a different order?",
                name: "continue"
              }
             ]).then(function(answer){
                if (answer.continue == 'yes' || answer.continue == 'y') {
                     bamazonQuestions();
                } 
              });
              
        }    
      })})};

        