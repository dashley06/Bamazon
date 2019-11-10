var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "192.168.99.100",
    port: "3306",
    user: "root",
    password: "docker",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!")
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        console.log(" - - - - - - - - - - - - - - - ")
        console.log("item id: " + res[i].item_id)
        console.log("item: " + res[i].product_name)
        console.log("price: $" + res[i].price)
    }
        bamazonQuestions();
})    
    };

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
                    console.log('\nPlease enter a valid quantity number');
                    return false;
                }
            }
        }
        ]).then(function(answer) {
        connection.query("SELECT  * FROM products WHERE ?", {item_id: answer.id}, function (err, res) {
          if (err) throw err;
            console.log("res", res)
            console.log("quantity",answer.quantity) 
            console.log("stock", res[0].stock_quantity);
          if (answer.quantity > res[0].stock_quantity){
              console.log("!")
            inquirer
            .prompt([
              {
                type: "input",
                message: "Out of Stock. Would you like to try a different order?",
                name: "continue"
              }
             ]).then(function(answer){
                if(answer.continue == 'yes' || answer.continue == 'y') {
                bamazonQuestions();

                } else if (totalCost >= 0) {
                  console.log("Okay, Total to pay is ", parseFloat(Math.round(totalCost * 100) / 100));
                  connection.end();

                } else {
                  console.log("See you soon!");
                }
              });
              
          }

        });
        })};