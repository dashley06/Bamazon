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
        });
};

        function viewProducts(){
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                console.log("ANSWER:", res);
                for (var i = 0; i < res.length; i++) {
                  console.log(" - - MANAGER MENU -  - ")
                  console.log("item id: " + res[i].item_id);
                  console.log("item: " + res[i].product_name);
                  console.log("price: $" + res[i].price);
                  console.log("stock quantity: " + res[i].stock_quantity);
              };
          });
        };

        function viewLow(){
            connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                  console.log(" - - - - - - - - - - - - - - - ");
                  console.log("item id: " + res[i].item_id);
                  console.log("item: " + res[i].product_name);
                  console.log("price: $" + res[i].price);
                  console.log("stock quantity: " + res[i].stock_quantity);
              }
          })
        };

        function addInventory(){
            inquirer    
            .prompt([{
                message: "What item ID would you like to add to?",
                name: "manageradd",
                type:"input"
            },
            {
                message: "What quantity amount would you like to add?",
                name: "managerquantity",
                type:"input",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log('Please enter a valid quantity number');
                        return false;
                    }
                }
            }]).then(function(answer){
             
            connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id: answer.manageradd}, function(err,res){
                            if (err) throw err;

                        // console.log("manager add answer",answer);
                        // console.log("manager add res", res);
            
                            var newquantity = parseInt(answer.managerquantity) + res[0].stock_quantity;
                          //  console.log(newquantity);

            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity:newquantity}, {item_id: answer.manageradd}], function(err,res){
                if (err) throw err;
                console.log("New quantity for this item is updated to "+ newquantity);
                console.log("----------------------------------------");

                manager();
            })
                });
                        }); 
                    }; 
       
                    
    function addNew(){
        inquirer    
        .prompt([{
            message: "What item would you like to add?",
            name: "manageritem",
            type:"input"
        },
        {
            message: "What is the price of the item you would like to add?",
            name: "managerprice",
            type: "input"
        },
        {
            message: "What is the department of the item you would like to add?",
            name: "managerdepartment",
            type: "input"
        },
        {
            message: "What quantity amount would you like to add?",
            name: "managerquantity",
            type: "input",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('Please enter a valid quantity number');
                    return false;
                }
            }
        }]).then(function(answer){
         
        connection.query("INSERT INTO products SET ?", 
        [{product_name: answer.manageritem},
        {department_name: answer.managerdepartment},
        {price: answer.managerprice},
        {stock_quantity:answer.managerquantity}], function(err,res){
                        if (err) throw err;

        console.log("New Product Added!!!")
       viewProducts();
            });
                    }); 



    }