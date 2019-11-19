DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL, 
  price DECIMAL(10,2) NOT NULL, 
  stock_quantity INTEGER NOT NULL, 
  product_sales INTEGER, 
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Dr. Bronner's Soap", "Beauty and Personal Care", 7.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Head and Shoulders Shampoo", "Beauty and Personal Care", 6.99, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Panasonic Lumix Camera", "Electronics", 349.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Sony 4K TV", "Electronics", 899.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Glad 13 Gallon Garbage Bags", "Household Supplies", 10.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("AA Batteries", "Household Supplies", 14.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Cascade Dishwasher Detergent", "Household Supplies", 7.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Kleenex Ultra Soft Tissues", "Beauty and Personal Care", 4.99, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Nonstick 13-inch Skillet", "Kitchen", 28.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Wooden Spoon", "Kitchen", 2.99, 20);


CREATE TABLE departments(
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs INTEGER NOT NULL, 
  PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs) values ("Beauty and Personal Care", 5000);

INSERT INTO departments (department_name, over_head_costs) values ("Electronics", 10000);

INSERT INTO departments (department_name, over_head_costs) values ("Household Supplies", 4000);

INSERT INTO departments (department_name, over_head_costs) values ("Kitchen", 3000);


