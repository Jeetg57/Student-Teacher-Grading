const server = 'http://localhost:3000';
var studentId;
var studentName;
var studentGrade;
var totalStudents = document.getElementById("totalStudents");
var failingStudents = document.getElementById("failingStudents");
var topStudents = document.getElementById("topStudents");

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
    drawCharts(students);
    totalStudents.innerHTML = students.length;
}

function populateContent(students) {
    var table = document.getElementById('content');
    table.innerHTML = "<thead class='thead-dark'><tr><th>#</th><th>Student ID</th><th>Full Name</th><th>Grade</th></tr></thead><tbody>";
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
        row.appendChild(numberingId);
        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataName2);

        table.appendChild(row);
    });
    table.innerHTML += "</tbody>"
}


function drawCharts(students){
var modeStat = mode(students);
var meanStat = mean(students);
var medianStat = median(students);
console.log(modeStat);
var stats = {
    mean: meanStat,
    mode: modeStat,
    median: medianStat
}
var marks = {
    highest: 0,
    lowest:100, 
    AandAMinus: 0,
    BandAMinus: 0,
    CandAMinus: 0,
    DandDMinus: 0,
    Fail: 0
}
students.forEach(student => {
    if(student.grade>marks.highest){
        marks.highest = student.grade;
    }
    if(marks.lowest>student.grade){
        marks.lowest = student.grade;
    }
    if(student.grade >= 90){
        marks.AandAMinus +=1;
    }
    else if(student.grade >= 80){
        marks.BandAMinus +=1;
    }
    else if(student.grade >= 70){
        marks.CandAMinus += 1;
    }
    else if(student.grade >=60){
        marks.DandDMinus += 1;
    }
    else{
        marks.Fail +=1;
    }
});
topStudents.innerHTML = marks.AandAMinus;
failingStudents.innerHTML = marks.Fail;

var ctx = document.getElementById('performanceChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['A', 'B', 'C', 'D', 'Fail',],
        datasets: [{
            label: 'Grade Distribution',
            data: [marks.AandAMinus, marks.BandAMinus, marks.CandAMinus, marks.DandDMinus, marks.Fail],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(192, 57, 43, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(192, 57, 43, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]
        }
    }
});
var ctx2 = document.getElementById('statistics').getContext('2d');
var statisticsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Mean', 'Median'],
        datasets: [{
            label: 'Statistic',
            data: [stats.mean, stats.median],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'     
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // stepSize: 1
                }
            }]
        }
    }
});
var ctx4 = document.getElementById('rangeChart').getContext('2d');
var range = marks.highest - marks.lowest;
var rangeChart = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ['Highest Grade', 'Lowest Grade', 'Range'],
        datasets: [{
            label: 'Grades',
            data: [marks.highest, marks.lowest, range],
            backgroundColor: [
                'rgba(75, 192, 192, 0.4)',
                'rgba(192, 57, 43, 0.4)',
                'rgba(35, 155, 86, 0.4)',

            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(192, 57, 43, 1)',
                'rgba(35, 155, 86, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // stepSize: 1
                }
            }]
        }
    }
});
var ctx3 = document.getElementById('modeChart').getContext('2d');
var modeChart = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: stats.mode,
        datasets: [{
            label: 'Mode',
            data: stats.mode,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // stepSize: 1
                }
            }]
        }
    }
});

}


function mode(students) {
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < students.length; i += 1) {
        number = students[i].grade;
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}

function mean(grades) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i].grade;
        count++;
    }
    let avg = sum / count;
    return avg;
}

function median(students) {
    var median = 0, numsLen = students.length;
    var marks = [];
    students.forEach(student => {
        marks.push(student.grade);
    });
    marks.sort();
    if (
        numsLen % 2 === 0 
    ) {
        median = (marks[numsLen / 2 - 1] + marks[numsLen / 2]) / 2;
    } else {  
        median = marks[(numsLen - 1) / 2];
    }
    console.log(median);
    return median;
}