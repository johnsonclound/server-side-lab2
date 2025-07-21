CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  discount DECIMAL(10,2),
  review_count INT,
  image_url TEXT
);
