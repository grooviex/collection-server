const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require('mysql2');

/* ===============>
     -- Environment Configuration --
 <=============== */

if (!process.env.DOCKER) {
    /* Configuration for local Machine */
    const dotenv = require("dotenv");
    dotenv.config({path: '../.env'});
}

/* --- MySQL Database connection --- */
const database = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

database.connect((error) => {
    if (error) console.error({status: 'ERROR', message: error});
    else console.log({status: "INFO", message: "Connection to MySQL server successfully established"});
});

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