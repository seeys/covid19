/*시계 담당*/

function getDate(){
    let today = new Date();

    let hour= today.getHours();
    if(hour < 10) hour = '0'+ hour;

    let min = today.getMinutes();
    if(min < 10) min = '0'+ min;

    let sec = today.getSeconds();
    if(sec < 10) sec = '0'+ sec;

    let str = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${hour}시 ${min}분 ${today.getSeconds()}초`
    const text = document.querySelector(".sub-header__clock span:nth-child(2)")
    text.innerHTML = str;

}

function getUpdateDate(){

    let today = new Date();
    let doc = document.querySelector(".sub-header__clock span:first-child");
    
    if(today.getHours() < 10){
        let yesterday = today.getTime() - (1*24*60*60*1000);
        today.setTime(yesterday);
    }
    
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate();
    
    doc.innerHTML = `(${year}년 ${month}월 ${date}일 기준 업데이트)`;
}

/* 다크모드 */

function setDarkMode(){

    console.log("dark mode work");
    document.body.style.background="#121212";

    let doc = document.querySelector(".cotitle");
    doc.classList.add("isDark-fontcolor");
    
    doc = document.querySelector(".sub-header__clock");
    doc.classList.add("isDark-fontcolor");

    doc = document.querySelector(".information__box");
    doc.classList.remove("bg-light");
    doc.classList.add("bg-darkmode");
    doc.classList.add("isDark-fontcolor");

    doc = document.querySelectorAll(".kmap__box");

    for(let x =0 ; x<18 ; x++){
        doc[x].classList.remove("bg-light");
        doc[x].classList.add("bg-darkmode");
        doc[x].classList.add("isDark-fontcolor");
    }

    doc = document.querySelector(".brightness");
    doc.style.backgroundColor = "#f1f1f1";

    localStorage.setItem("isDark","true");

}

function setWhiteMode(){

    console.log("white mode work");
    document.body.style.background="#ffffff";

    let doc = document.querySelector(".cotitle");
    doc.classList.remove("isDark-fontcolor");

    doc = document.querySelector(".sub-header__clock");
    doc.classList.remove("isDark-fontcolor");

    doc = document.querySelector(".information__box");
    doc.classList.add("bg-light");
    doc.classList.remove("bg-darkmode");
    doc.classList.remove("isDark-fontcolor");

    doc = document.querySelectorAll(".kmap__box");
    for(let x =0 ; x<18 ; x++){
        doc[x].classList.add("bg-light");
        doc[x].classList.remove("bg-darkmode");
        doc[x].classList.remove("isDark-fontcolor");
    }

    doc = document.querySelector(".brightness");
    doc.style.backgroundColor = "transparent";

    localStorage.setItem("isDark","false");
}

function clickButton(){
    let loadedSet = localStorage.getItem("isDark");
    if(loadedSet === null){
        localStorage.setItem("isDark", "false");
    }

    if(loadedSet === "false" ) setDarkMode();
    else setWhiteMode();
}

function init(){
    const BUTTON = document.querySelector(".brightness");
    BUTTON.addEventListener("click", clickButton);

    if(localStorage.getItem("isDark") === "true") setDarkMode();

    getDate();
    setInterval(getDate,1000);
    getUpdateDate();

}

init();