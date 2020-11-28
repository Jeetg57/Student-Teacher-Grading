const express = require("express");
const app = express();

//We will not use body parser as express has its own parser 
app.use(express.json());
const port = 3000;

const studentRoute = require("./routes/students.js")

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

//route details in routes folder
app.use("/students", studentRoute);


app.get("/", (req, res) =>
    res.render("homepage")
);

app.listen(port, ()=>console.log(`Server Started on port ${port}`));
