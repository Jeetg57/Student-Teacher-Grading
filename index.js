const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const expressJsonParser = express.json();
const port = 3000;
const fileName = "StudentGrades.json";

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get("/", (req, res) =>
    res.render("homepage")
);

app.listen(port);
console.log(`server listening on port ${port}`);