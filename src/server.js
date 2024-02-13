const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { Sequelize } = require('sequelize');

const { port, roles} = require('./config');

/* ===============>
     -- Environment Configuration --
 <=============== */

if (!process.env.DOCKER) {
    /* Configuration for local Machine */
    const dotenv = require("dotenv");
    dotenv.config({path: '../.env'});
}

/* --- MySQL Database connection --- */
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
});

/* Initialising the Model on sequelize */
const userModel = require("./common/models/users.model");
userModel.init(sequelize);

sequelize.sync().then(() => {
    console.info("Connection to MySQL successfully established");
}).catch((err) => {
    console.error('Connection to MySQL failed: \n' + err)
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
app.get('/dashboard', (req, res) => {
    res.render('index');
})

/* --- Backend Routing --- */
app.use('/users',  require('./backend/routes/users/routes'));
app.use('/auth',  require('./backend/routes/authorization/routes'));


const PORT = port || 3000;
app.listen(PORT, () => { console.info(`Server is running on port ${PORT}`)});