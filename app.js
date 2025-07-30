const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.get('/', (req, res)=>{
    res.send('Hello Node.JS');
});

app.get('/products', (req, res) => {
    /* fetch all goods data and return JSON*/
    const sql = 'SELECT * FROM products WHERE is_deleted = 0';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        }else {
            res.status(200).json(results);
        }
        
    });
})

app.get('/products/:id', (req, res) => {
    /* fetch goods data based on id */
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM products WHERE id = ? AND is_deleted = 0';
    db.query(sql, [id], (err, results) => {
        if(err) {
            res.status(500).json({ message: 'Error occurred while retrieveing product.', error: err});
        } else{
            if (results.length === 0) {
                res.status(404).json({ message: 'Product not found.' });
            } else {
                res.status(200).json({ message: 'Product retrieved successfully.', data: results });
            }
        }
    });
});

app.get('/products/search/:keyword', (req, res) => {
    /* find goods with keyword(find it from name) */
    const keyword = req.params.keyword;
    const sql = 'SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0';
    db.query(sql, [`%${keyword}%`], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error occurred while retrieving products.', error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
})

app.post('/products', (req, res) => {
    /* create new goods */
    const { name, price, discount, review_count, image_url } = req.body;
    db.query(
        'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, price, discount, review_count, image_url],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error occurred while creating product.', error: err.message });
            } else {
                res.status(201).json({ message: 'Product created successfully.', data: { id: results.insertId, name, price, discount, review_count, image_url } });
            }
        }
    );
});
/*undo soft delete*/
app.put('/products/restore/:id', (req, res) => {
    db.query('UPDATE products SET is_deleted = 0 WHERE id = ?',[req.params.id],(err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error occurred while restoring product.', error: err });
            } else {
                res.status(200).json({ message: 'Product restored successfully.' });
            }
        }
    )
})
/*Soft delete*/
app.delete('/products/:id', (req, res) => {
    /* delete goods based on id */
    db.query(
        'UPDATE products SET is_deleted = 1 WHERE id = ?',
        [req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error occurred while deleting product.', error: err });
            } else {
                res.status(200).json({ message: 'Product deleted successfully.' });
            }
        }
    )
})

app.listen(3000, () => console.log(' Server running on port 3000'))


