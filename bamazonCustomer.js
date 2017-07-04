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

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "display:none;",
    database: 'bamazon'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("\n=========================================================================".rainbow);
    console.log("                              Welcome to Bamazon.                        ".bgBlue);
    console.log("=========================================================================".rainbow);
    console.log("        Type node bamazonCustomer.js customer/manager/supervisor.        ".bgBlue);
    console.log("=========================================================================".rainbow);
});

var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [13, 13, 14, 13, 13]
});

con.query('SELECT * FROM products;', function(err, res) {

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].itemID, res[i].ProductName, res[i].Department, res[i].Price.toFixed(2), res[i].StockQuantity]
            );
        }
        console.log(table.toString());

        runCommand(process.argv[2]);

        function runCommand(command) {
            inquirer.prompt([{
                    type: "list",
                    message: "What would you like to purchase?",
                    choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                    name: "option"
                }, {
                    type: "confirm",
                    message: "Are you sure:",
                    name: "confirm",
                    default: true
                }, {
                    type: "amount",
                    message: "How many would you like?",
                    name: "amount"
                }, {
                    type: "list",
                    message: "What do you want to do?",
                    choices: ["Keep Shopping", "Check Out"],
                    name: "choice"
                }, ])
        }
    }

);
