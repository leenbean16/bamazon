var colors = require('colors');
var mysql = require('mysql');
var Table = require('cli-table');
var mysql = require('mysql');
var purchased = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "display:none;",
    database: 'bamazon'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Bamazon!");
});
 
// instantiate 
var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Stock']
  , colWidths: [13, 13, 14, 13, 13]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends 
table.push(
    ['itemID', 'ProductName', 'DepartmentName', 'Price', 'StockQuantity']
);
 
console.log(table.toString());