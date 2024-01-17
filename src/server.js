const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cookieParser = require("cookie-parser");
const path = require("path");

/* ===============>
     -- Environment Configuration --
 <=============== */

/* --- .env --- */
if (!process.env.DOCKER) {
    const dotenv = require("dotenv");
    dotenv.config({path: '../.env'});
}

/* --- MySQL Database connection --- */
const database = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log(database);

/* ===============>
     --  Express Configuration --
 <=============== */
const app = express();

/* --- Backend Configuration --- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* --- Frontend Configuration --- */
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "frontend", "views"));

/* ===============>
     -- Routing --
 <=============== */

/* --- Frontend GET request --- */
app.get('/', (req, res) => {
    res.render('index');
})

/* --- Backend Routing --- */
app.use('/user',  require('./backend/routes/users'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });