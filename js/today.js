import API_KEY from "./secret.js";
function getDate() {
  /* 10시 전 업데이트 x 어제의 날짜 가져오기*/
  let today = new Date();

  if (today.getHours() < 10) {
    let yesterday = today.getTime() - 1 * 24 * 60 * 60 * 1000;
    today.setTime(yesterday);
  }

  let year = today.getFullYear();

  let month = today.getMonth() + 1;
  if (month < 10) month = "0" + month;

  let date = today.getDate();
  if (date < 10) date = "0" + date;

  return `${year}${month}${date}`;
}

function getYesterDate() {
  /* 10시 전 업데이트 x 어제의 날짜 가져오기*/
  let today = new Date();

  if (today.getHours() < 10) {
    let yesterday = today.getTime() - 1 * 24 * 60 * 60 * 1000 * 2;
    today.setTime(yesterday);
  } else {
    let yesterday = today.getTime() - 1 * 24 * 60 * 60 * 1000;
    today.setTime(yesterday);
  }

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let date = today.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  return `${year}${month}${date}`;
}

function makeUrl(date1, date2) {
  let url =
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
  let queryParams = "?" + "ServiceKey" + "=" + API_KEY;
  queryParams += "&" + "pageNo" + "=" + "1";
  queryParams += "&" + "numOfRows" + "=" + "10";
  queryParams += "&" + "startCreateDt" + "=" + `${date1}`;
  queryParams += "&" + "endCreateDt" + "=" + `${date2}`;

  console.log(url + queryParams);
  return url + queryParams;
}

function ParseData(date) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", makeUrl(getYesterDate(), getDate()));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let td; /* 오늘 데이터 */
      let yd; /* 어제 데이터 */
      let doc; /* 쿼리셀렉터 */

      const tag = ["decideCnt", "deathCnt", "examCnt", "clearCnt"];

      for (let x = 0; x < 2; x++) {
        td = this.responseXML.getElementsByTagName(`${tag[x]}`)[0].childNodes[0]
          .nodeValue;
        yd = this.responseXML.getElementsByTagName(`${tag[x]}`)[1].childNodes[0]
          .nodeValue;

        doc = document.querySelector(
          `.information__box div:nth-child(${x + 1}) span:nth-child(2)`
        );
        doc.innerHTML = td;
        doc = document.querySelector(
          `.information__box div:nth-child(${x + 1}) span:nth-child(3)`
        );
        if (td - yd > 0) {
          doc.innerHTML = `↑ ${td - yd}`;
          doc.classList.add("incre-big"); /* 숫자가 0보다 크면 빨갛게 표시 */
        } else {
          doc.innerHTML = `- ${td - yd}`;
          doc.classList.add("noincre-big");
        }
        console.log(td, yd);
      }
    }
  };
  xhr.send("");
}

function init() {
  ParseData();
}

init();
