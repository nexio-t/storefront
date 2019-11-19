USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL, 
  price DECIMAL(10,2) NOT NULL, 
  stock_quantity INTEGER NOT NULL, 
  PRIMARY KEY (item_id)
);
