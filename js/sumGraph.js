const API_KEYS='pZs%2BQbjTvsjYdeBc40z2fD7QRRi3lynCg2GLLsEj2n8%2B1thhngNGdz5RitRWetZTfHRlD0Etu%2BGFU6rTWSmIHg%3D%3D';
let decSum = [];
let dateSum = [];
function paintGraph(){
    //그래프 그리기
    decSum.reverse();
    dateSum.reverse();
    var ctx = document.getElementById('sumgraph').getContext('2d');
    var coronaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateSum,
            datasets: [{
                label: '누적 확진자 그래프',
                backgroundColor: "rgb(100,100,100)",
                borderColor: "rgb(100,100,100)",
                data: decSum,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'test'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'day'
                    },
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 80
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks:{
                        suggestedMin: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'count'
                    }
                }]
            }
        }
    });
}

//현재까지 
function parseDateToday(){                       /* 10시 전 업데이트 x 어제의 날짜 가져오기*/
    let today = new Date();
    
    if(today.getHours() < 10){
        let yesterday = today.getTime() - (1*24*60*60*1000);
        today.setTime(yesterday);
    }

    let year = today.getFullYear();
    let month = today.getMonth()+1;
    if(month < 10){
        month = '0'+ month;
    }
    let date = today.getDate();
    if(date < 10){
        date = '0'+ date;
    }
    return (`${year}${month}${date}`);
}

function parseData(){

    let xhr = new XMLHttpRequest();
    let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'; 
    let queryParams = '?' + 'ServiceKey' + '=' + API_KEYS;
    queryParams += '&' + 'pageNo' + '=' + '1'; 
    queryParams += '&' + 'numOfRows' + '=' + '10'; 
    queryParams += '&' + 'startCreateDt'+ '=' + '20200204';
    queryParams += '&' + 'endCreateDt' + '=' + `${parseDateToday()}`;

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) { //데이터 받은 상태
            let data;
            let date;
            let cnt = this.responseXML.getElementsByTagName("totalCount")[0].childNodes[0].nodeValue;
            console.log(cnt);
            for(let x=0; x<cnt ; x++){
                data = this.responseXML.getElementsByTagName("items")[0].childNodes[x].getElementsByTagName("decideCnt")[0].childNodes[0].nodeValue;
                date = this.responseXML.getElementsByTagName("items")[0].childNodes[x].getElementsByTagName("stateDt")[0].childNodes[0].nodeValue;
                decSum.push(data);
                dateSum.push(date);
                //console.log(data);
            }
            console.log(decSum);
        }
        
    }
    xhr.send('');
}

function init(){
    parseData();
    setTimeout(function(){
        paintGraph();
    },500);
}

init();