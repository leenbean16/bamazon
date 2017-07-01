var colors = require('colors');
var mysql = require('mysql');
var Table = require('cli-table');
var purchased = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "display:none;",
    database: 'bamazon'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Bamazon!".yellow);
});
 
// instantiate 
var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Stock']
  , colWidths: [13, 13, 14, 13, 13]
});

con.query('SELECT * FROM products;',function(err,res){

   for(var i=0;i<res.length;i++){
        table.push(
          [res[i].itemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
          );
    }
    console.log(res);
});
 
console.log(table.toString());

