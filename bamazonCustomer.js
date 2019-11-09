var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 2233,
    user: "root",
    password: "docker",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    bamazonQuestions();
});

function bamazonQuestions(){
    inquirer
        .prompt([
            type: "input",
            name: "askAmount",
            message: "what quantity of the item would you like to buy?"


        ]).then(answers => {


        });



}