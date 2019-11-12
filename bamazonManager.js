// Create a new Node application called `bamazonManager.js`. Running this application will:
//     * List a set of menu options:
//   * View Products for Sale
//   * View Low Inventory
//   * Add to Inventory
//   * Add New Product
// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

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
    manager();
});

function manager(){
    inquirer
        .prompt([
        {
            type: "list",
            name: "managerMenu",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }]).then(function(answer){
            switch (answer.managerMenu){
                case "View Products for Sale": 
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNew();
                    break;
                case "Exit":
                    console.log("Goodbye");
                    connection.end();
                    break;
            }


        })
};
