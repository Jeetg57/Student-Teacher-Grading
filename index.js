const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const port = 3000;

const studentRoute = require("./routes/students.js")
const statisticsRoute = require("./routes/statistics.js")

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use("/students", studentRoute);
app.use("/statistics", statisticsRoute);

app.get("/", (req, res) =>
    res.render("homepage")
);

app.listen(port, ()=>console.log(`Server Started on port ${port}`));
