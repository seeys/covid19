let xhr = new XMLHttpRequest();

let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'; 
let queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'GQqiREOcM%2F3AHdkas%2Fo%2BJGk3Ob2%2FhdS%2FnezrKYTgJ5Hesf1UiC9LnLxzhUqOJrIE6JtRu711e8JIFptS7%2B0Z9g%3D%3D'; 
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); 
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20210125'); 
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20210125'); 
xhr.open('GET', url + queryParams);

xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        let text = new DOMParser();
        text = this.responseXML;   
        let text2 = text.getElementsByTagName("decideCnt")[0].childNodes[0].nodeValue;
        let doc = document.querySelector(".asd");
        doc.innerHTML = text2;
    }
};
xhr.send('');


/*fetch(`http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=GQqiREOcM%2F3AHdkas%2Fo%2BJGk3Ob2%2FhdS%2FnezrKYTgJ5Hesf1UiC9LnLxzhUqOJrIE6JtRu711e8JIFptS7%2B0Z9g%3D%3D&startCreateDt=20210125&endCreateDt=20210125`
    ).then(function(response){
        console.log(response.json());
    }) */



