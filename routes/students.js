const router = require("express").Router();
const fs = require("fs");
const fileName = "StudentGrades.json";

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

router.get("/", (req, res) => {
    res.render("students")
})

router.get('/studentData', (req, res) => {
    data.sort((a, b) => (a.studentName > b.studentName) ? 1 : -1 );
    res.send(data);
});

router.post("/", (req, res)=>{
    var exists = false;
    data.forEach(student => {
        if(student.id === req.body.id){
            exists = true;
            res.status(400).json({text: "This student has already been registered", error: true});
        }
    });
    if(!exists){
    try{
        data.push(req.body);
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        res.status(200).json({text: "Success", error: false});
    }
    
    catch(e){
        res.status(400).json({text: "An error occured", error: true});
    }
}
})

router.delete("/delete", (req, res) =>{
    var newData = data.filter((item) => item.id != req.body.idNum);
    fs.writeFileSync(fileName, JSON.stringify(newData, null, 2));
    newData.sort((a, b) => (a.studentName > b.studentName) ? 1 : -1 );
    data = newData;
    res.send(data);
})

router.patch("/edit", (req, res)=> {
    data.forEach(student => {
        if(student.id === req.body.id){
            student.studentName = req.body.studentName,
            student.grade = req.body.grade
        }
    });
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    data.sort((a, b) => (a.studentName > b.studentName) ? 1 : -1 );
    res.json({text : "Successfully Changed"});
})

module.exports = router;