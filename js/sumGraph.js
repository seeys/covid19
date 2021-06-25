const API_KEYS='pZs%2BQbjTvsjYdeBc40z2fD7QRRi3lynCg2GLLsEj2n8%2B1thhngNGdz5RitRWetZTfHRlD0Etu%2BGFU6rTWSmIHg%3D%3D';
let decSum = [];
function paintGraph(){
    //일주일 날짜 리스트에 저장
    let today = new Date();
    let thisWeek = [];
    let d = 0;
    if (today.getHours() < 10) {
        let yesterday = today.getTime() - (1 * 24 * 60 * 60 * 1000);
        today.setTime(yesterday);
    }
    for (let i = 0; i < 7; i++) {
        let pastday = today.getDate();
        today.setDate(pastday - d);
        let mm = 1 + today.getMonth();
        mm = mm >= 10 ? mm : '0' + mm;
        let dd = today.getDate();
        dd = dd >= 10 ? dd : '0' + dd;
        thisWeek[i] = mm + '.' + dd;
        d = 1;
    }
    //그래프 그리기
    thisWeek.reverse();
    decSum.reverse();
    const ctx = document.getElementById('sumgraph').getContext('2d');
    const coronaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: thisWeek,
            datasets: [{
                label: '일주일 누적 확진자 그래프',
                data: decSum,
                backgroundColor: "rgb(100,100,200)",
                borderColor: "rgb(100,100,200)",
                fill: false,
                barThickness: 20,
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}

//오늘 날짜 가져오기
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
//일주일 날짜 계산
function parseDate7day() {
    /* 10시 전 업데이트 x 어제의 날짜 가져오기*/
    let today = new Date();

    if (today.getHours() < 10) {
        let yesterday = today.getTime() - (1 * 24 * 60 * 60 * 1000);
        today.setTime(yesterday);
    }

    yesterday = today.getTime() - (1 * 24 * 60 * 60 * 1000 * 7);
    today.setTime(yesterday);

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let date = today.getDate();
    if (date < 10) {
        date = '0' + date;
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
            for(let x=0; x< 7 ; x++){
                data = this.responseXML.getElementsByTagName("items")[0].childNodes[x].getElementsByTagName("decideCnt")[0].childNodes[0].nodeValue;
                decSum.push(data);
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