-- DROP DATABASE bamazon;
create database bamazon;

use bamazon;

CREATE TABLE products (
    itemID INTEGER(11) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(30) NOT NULL,
    Department VARCHAR(30) NOT NULL,
    Price INTEGER(10) NOT NULL,
    StockQuantity INTEGER(10) NOT NULL,
    PRIMARY KEY (itemID)
);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("shirt", "fashion", 30, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("pants", "fashion", 25, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("shoes", "shoes", 50, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("shorts", "fashion", 20, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("skirt", "fashion", 40, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("bra", "lingerie", 40, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("undies", "lingerie", 20, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("gloves", "fashion", 10, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("hat", "fashion", 50, 15);

INSERT INTO products (ProductName, Department, Price, StockQuantity)
value("scarf", "fashion", 10, 15);

UPDATE products
SET StockQuantity=100
WHERE itemID=10;

SELECT 
    *
FROM
    products;
