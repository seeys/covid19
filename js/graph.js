let decNum = [];
function graph7Date(){
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
     decNum.reverse();
     const ctx = document.getElementById('daygraph').getContext('2d');
     const coronaChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: thisWeek,
             datasets: [{
                 label: '일주일 확진자 그래프',
                 data: decNum,
                 backgroundColor: "rgb(200,100,100)",
                 borderColor: "rgb(200,100,100)",
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
function parseDateToday() {
    let today = new Date();

    if (today.getHours() < 10) {
        let yesterday = today.getTime() - (1 * 24 * 60 * 60 * 1000);
        today.setTime(yesterday);
    }

    let year = today.getFullYear();

    let month = today.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let date = today.getDate();
    if (date < 10) date = '0' + date;

    return (`${year}${month}${date}`);
}

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

function parseData() {

    let xhr = new XMLHttpRequest();
    let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
    let queryParams = '?' + 'ServiceKey' + '=' + API_KEY;
    queryParams += '&' + 'pageNo' + '=' + '1';
    queryParams += '&' + 'numOfRows' + '=' + '10';
    queryParams += '&' + 'startCreateDt' + '=' + `${parseDate7day()}`;
    queryParams += '&' + 'endCreateDt' + '=' + `${parseDateToday()}`;

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) { //데이터 받은 상태
            let data;
            for (let x = 0; x < 7; x++) {
                data = this.responseXML.getElementsByTagName("items")[0].childNodes[18 + (19 * x)].getElementsByTagName("incDec")[0].childNodes[0].nodeValue;
                decNum.push(parseInt(data));
            }
            console.log(decNum);
        }
    }
    xhr.send('');
}


function init() {
    parseData();
    setTimeout(function () {
       graph7Date();
    }, 500);
}

init();