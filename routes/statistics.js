const router = require("express").Router();
const fs = require("fs");
const fileName = "StudentGrades.json";

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

router.get("/", (req, res) => {
    res.render("statistics")
})
router.get('/studentData', (req, res) => {
    res.send(data);
});

module.exports = router;