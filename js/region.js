import API_KEY from "./secret.js";

function getDate() {
  let today = new Date();

  if (today.getHours() < 10) {
    /* 10시 전에 업데이트 하지않고 어제 것을 보여줌*/
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

function parseData(date) {
  let xhr = new XMLHttpRequest(); /* xhr 불러오기 */
  let url =
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
  let queryParams = "?" + "ServiceKey" + "=" + API_KEY;
  queryParams += "&" + "pageNo" + "=" + "1";
  queryParams += "&" + "numOfRows" + "=" + "10";
  queryParams += "&" + "startCreateDt" + "=" + `${date}`;
  queryParams += "&" + "endCreateDt" + "=" + `${date}`;

  xhr.open("GET", url + queryParams);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let total;
      let increase;
      let doc;

      for (let x = 0; x < 18; x++) {
        /*누적 확진수와 증가한 환자 수 가져오기*/

        total = this.responseXML
          .getElementsByTagName("items")[0]
          .childNodes[x].getElementsByTagName("defCnt")[0]
          .childNodes[0].nodeValue;
        increase = this.responseXML
          .getElementsByTagName("items")[0]
          .childNodes[x].getElementsByTagName("incDec")[0]
          .childNodes[0].nodeValue;

        doc = document.querySelector(
          `.kmap div:nth-of-type(${x + 1}) span:nth-child(2)`
        );
        doc.innerHTML = total;

        doc = document.querySelector(
          `.kmap div:nth-of-type(${x + 1}) span:nth-child(3)`
        );
        if (increase > 0) {
          doc.innerHTML = `↑ ${increase}`;
          doc.classList.add("incre"); /* 숫자가 0보다 크면 빨갛게 표시 */
        } else {
          doc.innerHTML = `- ${increase}`;
          doc.classList.add("noincre");
        }
      }
    }
  };
  xhr.send("");
}

function init() {
  let date = getDate();
  parseData(date);
}

init();
