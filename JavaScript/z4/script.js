let labels = [];
let data = [];
let count = 0;
labels.push(count + "s");
let temp2 = document.getElementById("Number_of_requests");
let count2 = 0;
let temp3 = document.getElementById("Error_requests");
let count3 = 0;
function CPU()
{
    function f()
    {
        let xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            'http://exercise.develop.maximaster.ru/service/cpu/',
            false
        );
        xhr.send()
        return JSON.parse(xhr.responseText)
    }
    count2++
    temp2.innerHTML = (count2).toString();
    count += 5;
    labels.push(count + "s");
    let temp = f();
    if (temp !== 0) {data.push(temp);}
    else {count3++}
    temp3.innerHTML = Math.round((count3 * 100)/count2) + "%".toString();
    console.log(data);
    lineChart.update();
}
let speedCanvas = document.getElementById("CPU_Time_Chart");
let speedData = {
    labels: labels,
    datasets: [{
        label: "CPU Time Chart",
        data: data,
        fill: true
    }]
};

let chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
            boxWidth: 80,
            fontColor: 'black'
        }
    },
    scales: {
        y:
            {
                min: 0,
                max: 100,
                ticks:{
                    callback: function(value) {
                        return value + "%"
                    }
                }
        }
    }
};

let lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: speedData,
    options: chartOptions
});
CPU();
setInterval(CPU, 5000);