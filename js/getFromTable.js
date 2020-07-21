const ctxElem = document.getElementById("myChart");
const ctx = ctxElem.getContext('2d');
const btnFromTable = document.getElementById("read-table");
const dataFromTable = {
  // "headers": []
  // "line": [],
  // "color": []
};
btnFromTable.addEventListener("click", getDataFromeTable, false);

function getDataFromeTable() {
  const table = document.getElementById("table");
  if (table) {
    const elemRows = table.querySelectorAll("tr");
    const elemTD = table.querySelectorAll("td");
    const columns = elemRows[0].querySelectorAll("td").length;

    const rows = Array.from(elemTD).map(elem => elem.textContent);
    dataFromTable["headers"] = rows.filter((el, i) => i < columns);
    dataFromTable["line0"] = rows.filter((el, i) => i >= columns && ((i % columns) === 0))
    dataFromTable["line1"] = rows.filter((el, i) => i >= columns && ((i % columns) !== 0))
    
    paintChart();
    // getPDF();
    // console.log(rows); // 
    // console.log(dataFromTable);
 
  } else {
    console.log("Table is empty");
  }
}

function getColors(num, lum) {
    const step = 360 / num;
    const lumen = lum || 50;
    // console.log(`'hsla(${0 * step}, 100%, ${lumen}%, 0.2)'`);
    
    return Array(num).fill().map((elem, i) => `hsla(${i * step}, 100%, ${lumen}%, 0.2)`)
}

function paintChart() {
var myChart = new Chart(ctx, {
    // type: 'bar',
    // type: 'line',
    // type: 'pie',
    type: 'doughnut',
    data: {
        labels:dataFromTable["line0"],
        datasets: [{
            label: '# of Votes',
            data: dataFromTable["line1"],
            backgroundColor: getColors(dataFromTable["line1"].length),
            borderColor: getColors(dataFromTable["line1"].length, 25),
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}