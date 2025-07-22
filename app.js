const express = require('express');
const app = express();

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
})

app.get('/products/:id', (req, res) => {
    /* fetch goods data based on id */
})

app.get('/products/search/:keyword', (req, res) => {
    /* find goods with keyword(find it from name) */
})
app.listen(3000, () => console.log(' Server running on port 3000'))


