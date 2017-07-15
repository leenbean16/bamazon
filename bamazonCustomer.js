// node bamazon application.
// variables:
let colors = require('colors');
let math = require('math');
let mysql = require('mysql');
let Table = require('cli-table');
let inquirer = require('inquirer');
let cart = [];
let command = process.argv[2]
let secondCommand = process.argv[3]
let receipt = [];

// Connection to MySQL database.
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "display:none;",
    database: 'bamazon'
});

// Welcome banner.
function welcome() {
    console.log("\n-----------------------------------------------------------".rainbow);
    console.log("                     Welcome to Bamazon.                   ");
    console.log("-----------------------------------------------------------".rainbow);
    console.log("\n");
};

welcome();

// brings up table with contents from mysql.
let shop = function() {
    let table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
        colWidths: [4, 13, 14, 13, 8]
    });
    // connect to mysql
    connection.query('SELECT * FROM products', function(err, res) {
        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].itemID, res[i].ProductName, res[i].Department, res[i].Price.toFixed(2), res[i].StockQuantity]
            );
        }
        // inquirer shopping prompt
        runCommand(process.argv[2]);

        // kind of a long function :/
        function runCommand(command) {
            console.log(table.toString());
            // table
            inquirer.prompt([{
                // itemID picker prompt.
                name: "itemId",
                type: "input",
                message: "What is the item ID you would like to buy?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                // how many do you want?
                name: "Quantity",
                type: "input",
                message: "How many of this item would you like to buy?",
                validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    // Updates inventory and lets customer know their total.
            }]).then(function(answer) {
                let chosenId = answer.itemId - 1
                let chosenProduct = res[chosenId]
                let chosenQuantity = answer.Quantity
                if (chosenQuantity < chosenProduct.StockQuantity) {
                    // Views total cost for chosen product * amount.
                    console.log("\n-----------------------------------------------------------".rainbow);
                    console.log("\nYour total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].ProductName + " is: " + res[chosenId].Price.toFixed(2) * chosenQuantity);
                    console.log("                                                           ");
                    console.log("-----------------------------------------------------------".rainbow);
                    // push items to receipt
                    receipt.push(res[chosenId].ProductName + " : " + res[chosenId].Price.toFixed(2) * chosenQuantity + " ");
                    cart.push(res[chosenId].Price.toFixed(2) * chosenQuantity);
                    //Update stock.
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        StockQuantity: chosenProduct.StockQuantity - chosenQuantity
                    }, {
                        itemID: chosenProduct.itemID
                    }], function(err, res) {
                        shopOrExit()
                    });
                } else {
                    // This displays when stock is too low.
                    console.log("\n-----------------------------------------------------------".rainbow);
                    console.log("\nSorry, our stock of " + res[chosenId].ProductName + "'s" + " is too low right now.");
                    console.log("                                                           ");
                    console.log("-----------------------------------------------------------".rainbow);
                    shop()
                }
            })
        }
    });
}

function shopOrExit() {
    inquirer.prompt([{
        // What does the customer want to do now?
        type: "list",
        message: "What do you want to do?",
        choices: ["Keep Shopping", "Receipt", "Cart", "Exit"],
        name: "choice",
    }]).then(function(inquirerResponse) {
        if (inquirerResponse.choice === "Keep Shopping") {
            shop()
        } else if (inquirerResponse.choice === "Receipt") {
            console.log("\nYour receipt.");
            console.log(receipt);
            console.log("Total: $" + Math.sum(cart));

            console.log("\n");
            shopOrExit()
        } else if (inquirerResponse.choice === "Cart") {
            console.log("\n-----------------------------------------------------------".rainbow);
            console.log("Your cart consists of: ");
            console.log(receipt);
            console.log("                                                           ");
            console.log("-----------------------------------------------------------".rainbow);
            shopOrExit()
        } else if (inquirerResponse.choice === "Exit") {
            console.log("\n-----------------------------------------------------------".rainbow);
            console.log("\n                   Thank you. Come again.");
            console.log("                                                           ");
            console.log("-----------------------------------------------------------".rainbow);
        }
    });
}

shop();



// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items 
// available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet 
// the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
