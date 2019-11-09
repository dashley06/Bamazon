var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
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
            name: "askID",
            message: "what is the ID of the item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('\nPlease enter a valid item ID.');
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "askAmount",
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
        ]).then(answers => {


        });



}