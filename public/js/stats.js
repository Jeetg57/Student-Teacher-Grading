const server = 'http://localhost:3000';

async function fetchCharts() {
    const url = server + '/students/studentData';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const students = await response.json();
    drawCharts(students);
}
function drawCharts(students){
var marks = {
    AandAMinus: 0,
    BandAMinus: 0,
    CandAMinus: 0,
    DandDMinus: 0,
    Fail: 0
}
students.forEach(student => {
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
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['A and A minus', 'B and B minus', 'C and C minus', 'D and D minus', 'Fail',],
        datasets: [{
            label: 'Grade Distribution',
            data: [marks.AandAMinus, marks.BandAMinus, marks.CandAMinus, marks.DandDMinus, marks.Fail],
            backgroundColor: [

                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}