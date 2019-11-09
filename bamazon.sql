DROP DATABASE if EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jumprope", "fitness", 5.99, 25), ("10 lb. dumbbell", "weight lifting", 15.00, 10), ("ankle weights", "fitness", 18.99, 45), ("yoga mat", "fitness", 9.50, 8), ("25 lb. dumbbell", "weight lifting", 35.10, 5), ("Doctor Barbie", "toys", 9.99, 25), ("Jenga", "toys", 3.99, 20), ("Toy Story", "movie", 5.00, 13), ("Gymnast Barbie", "toys", 9.99, 30), ("CandyLand", "toys", 3.99, 5), ("Black Panther", "movies", 15.50, 13), ("Lego Land", "toys", 6.50, 20), ("Avengers", "movies", 9.99, 25);




