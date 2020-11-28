
const server = 'http://localhost:3000';
var studentId;
var studentName;
var studentGrade;
var studentEditId;
var studentEditName;
var studentEditGrade;
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modalContent")

 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
}  
async function fetchStudents() {
    const url = server + '/students/studentData';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const students = await response.json();
    populateContent(students);
}

async function addStudent() {
    const url = server + '/students';
    const student = { id: studentId, studentName: studentName, grade: studentGrade };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }
    var x = document.getElementById("snackbar");
    const response = await fetch(url, options).then(response => response.json());
    console.log(response.error);
    if (response.error) {
        x.style.background = "red";
    }
  
    x.className = "show";
    x.innerHTML = response.text;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function populateContent(students) {
    var table = document.getElementById('content');
    table.innerHTML = "<thead class='thead-dark'><tr><th>#</th><th>Student ID</th><th>Full Name</th><th>Grade</th><th class='col-xs-2'>Actions</th></tr></thead><tbody>";
    students.forEach((student, index) => {
        var row = document.createElement('tr');
        var numberingId = document.createElement('td');
        var numberId = document.createTextNode(index + 1);
        numberingId.appendChild(numberId);
        var dataId = document.createElement('td');
        var textId = document.createTextNode(student.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(student.studentName);
        var dataName2 = document.createElement('td');
        var textName2 = document.createTextNode(student.grade + "%");
        if(student.grade < 60){
            row.className = "text-danger";
        }
        dataName.appendChild(textName);
        dataName2.appendChild(textName2);
        var dataName3 = document.createElement('td');
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.name = "Delete";
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.setAttribute('onClick', `deleteItem(${student.id})`);
        var deleteBtnIcon = document.createElement("i");
        deleteBtnIcon.className = "fas fa-trash-alt";
        deleteBtn.append(deleteBtnIcon);
        var editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.name = "Edit";
        editBtn.className = "btn btn-sm btn-success mr-3";
        editBtn.setAttribute('onClick', `editItem(${student.id}, '${student.studentName}' ,${student.grade})`);
        var editBtnIcon = document.createElement("i");
        editBtnIcon.className = "fas fa-edit";
        editBtn.append(editBtnIcon);
        dataName3.append(editBtn);
        dataName3.append(deleteBtn);
        row.appendChild(numberingId);
        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataName2);
        row.appendChild(dataName3);
        table.appendChild(row);
    });
    table.innerHTML += "</tbody>"
}

async function deleteItem (idNumber)  {
    const url = server + '/students/delete';
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"idNum":idNumber}),
    }

    // var x = document.getElementById("snackbar");
    var response = await fetch(url, options);
    var students = await response.json()
    populateContent(students);
}
async function editItem (idNumber, studNames, grade){
    modal.style.display = "block";
    modalContent.innerHTML = `
        <h1>Edit Student</h1>
        <form id="studentEditForm">
        <div class="row">
                <div class="form-group col">
                    <label for="idNum">ID number</label>
                    <input type="number" min="0" max="999999" class="form-control" id="idNum1"
                        placeholder="Student ID e.g 675837" required value=${idNumber} disabled>
                </div>
                <div class="form-group col">
                    <label for="studentName">Student Name</label>
                    <input type="text" class="form-control" id="studentName1" placeholder="Student Name" value='${studNames}' required>
                </div>
                <div class="form-group col">
                    <label for="studentGrade">Student Grade</label>
                    <input type="number" min="0" max="100" class="form-control" id="studentGrade1"
                        placeholder="Student Grade" value=${grade} required>
                </div>
            </div>
            <div class="text-right">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button id="cancel" type="reset" class="btn btn-secondary">Cancel</button>
            </div>
        </form>
    `;
    document.getElementById("cancel").addEventListener("click", () =>{
        modal.style.display = "none"
    })
    document.getElementById("studentEditForm").addEventListener("submit", (e) => {
        studentEditId = document.getElementById('idNum1').value;
        studentEditName = document.getElementById('studentName1').value;
        studentEditGrade = document.getElementById('studentGrade1').value;
        if (studentEditId && studentEditName && studentEditGrade) {
            studentEditId = parseInt(studentEditId);
            studentEditGrade = parseInt(studentEditGrade);
            editStudent();
            fetchStudents();
        }
        else {
            var formError = document.getElementById("formError");
            formError.innerHTML = "Please fill out all the fields";
        }
        e.preventDefault();
    });
}
async function editStudent(){
    const url = server + '/students/edit';
    const student = { id: studentEditId, studentName: studentEditName, grade: studentEditGrade };
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }
    const response = await fetch(url, options).then(response => response.json());
    modal.style.display = "none";
     var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = response.text;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}



document.getElementById('studentAddForm').addEventListener('submit', (e) => {
    studentId = document.getElementById('idNum').value;
    studentName = document.getElementById('studentName').value;
    studentGrade = document.getElementById('studentGrade').value;
    if (studentId && studentName && studentGrade) {
        studentId = parseInt(studentId);
        studentGrade = parseInt(studentGrade);
        addStudent();
        fetchStudents();
    }
    else {
        var formError = document.getElementById("formError");
        formError.innerHTML = "Please fill out all the fields";
    }
    e.preventDefault();
});



