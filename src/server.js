const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");


/* ===============>
     -- Environment Configuration --
 <=============== */
if (!process.env.DOCKER) {
    /* TODO: DOCKER IS RUNNING WTF??? */
    console.log(process.env.DOCKER);
    const dotenv = require("dotenv");
    dotenv.config({path: '.env'});
}
console.log('after check');

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


/*

/* ===============>
     -- Routing --
 <=============== */

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/user',  require('./backend/routes/users'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });