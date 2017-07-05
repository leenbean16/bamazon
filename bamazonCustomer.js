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

var colors = require('colors');
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');
var purchased = [];
var command = process.argv[2]

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "display:none;",
    database: 'bamazon'
});

console.log("\n=========================================================================".rainbow);
console.log("                              Welcome to Bamazon.                        ".bgBlue);
console.log("=========================================================================".rainbow);
console.log("        Type node bamazonCustomer.js customer/manager/supervisor.        ".bgBlue);
console.log("=========================================================================".rainbow);

var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [13, 13, 14, 13, 13]
});

var checkAndBuy2 = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].itemID, res[i].ProductName, res[i].Department, res[i].Price.toFixed(2), res[i].StockQuantity]
            );
        }

        console.log(table.toString());

        runCommand(process.argv[2]);

        function runCommand(command) {
            inquirer.prompt([{
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
            }]).then(function(answer) {
                var chosenId = answer.itemId - 1
                var chosenProduct = res[chosenId]
                var chosenQuantity = answer.Quantity
                if (chosenQuantity < res[chosenId].StockQuantity) {
                    console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].ProductName + " is: " + res[chosenId].Price.toFixed(2) * chosenQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        StockQuantity: res[chosenId].StockQuantity - chosenQuantity
                    }, {
                        id: res[chosenId].id
                    }], function(err, res) {
                        //console.log(err);
                        checkAndBuy2();
                    });

                } else {
                    console.log("Sorry, we only have" + res[chosenId].StockQuantity + " in our Inventory.");

                }
            })
        }
    });
}



checkAndBuy2();
