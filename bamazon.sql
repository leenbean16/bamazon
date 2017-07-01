DROP DATABASE bamazon;

create database bamazon;

use bamazon;

CREATE TABLE products (
	id integer(11) auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price integer(10) not null,
    stock_quantity integer(10) not null,
    primary key (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("shirt", "fashion", 30, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("pants", "fashion", 25, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("shoes", "shoes", 50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("shorts", "fashion", 20, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("skirt", "fashion", 40, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("bra", "lingerie", 40, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("undies", "lingerie", 20, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("gloves", "fashion", 10, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("hat", "fashion", 50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
value("scarf", "fashion", 10, 15);

select * from products;
