CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  discount DECIMAL(10,2),
  review_count INT,
  image_url TEXT
);
