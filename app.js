const express = require("express")
const app = express ();

// utilities
const cookieParser = require ("cookie-parser");
const path = require ("path");

// db
const db = require('./config/mongoose-connection');

// routes
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

app.use (express. json());
app.use(express.urlencoded(({extended: true })))
app.use (cookieParser());
app.use (express.static(path.join(__dirname, "public")));
app.set ("view engine", "ejs");

app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)

app.listen(3000);