//========================
// Elements
//========================

const intro = document.getElementById("intro");
const form = document.getElementById("form");

const envelope = document.querySelector(".envelope");

const yesButtons = document.querySelectorAll(".yes");

const noButton = document.getElementById("runaway");

const message = document.getElementById("message");

const progress = document.getElementById("progressBar");

//========================
// Answers
//========================

const answers = {

createdAt : "",

accept : "",

date : "",

time : "",

place : "",

comment : ""

};

// Google Apps Script URL

const API_URL =
"https://script.google.com/macros/s/AKfycbxfVAxIbqAUWfyfq1PL3bX0Fmh8LrJJKG0SMo28MK2yKJeVAloJ439zAYYf8Kf3L-qxWQ/exec";

//========================
// Intro
//========================

envelope.addEventListener("click",()=>{

envelope.classList.add("open");

flowerRain();

setTimeout(()=>{

intro.classList.remove("active");

form.classList.add("active");

},900);

});


//========================
// Run Away Button
//========================

let noCount = 0;

const funnyMessages = [

"😂 این گزینه هنوز در دست تعمیره",

"🤭 نه نه... این یکی کار نمی‌کنه!",

"💖 فکر کنم بهتره یکی از دو گزینه دیگه رو امتحان کنی."

];

function moveButton(){

const card = document.querySelector(".card");

const padding = 20;

const maxX = card.clientWidth - noButton.offsetWidth - padding;

const maxY = card.clientHeight - noButton.offsetHeight - padding;

const x = Math.random() * maxX;

const y = Math.random() * maxY;

noButton.style.left = x + "px";

noButton.style.top = y + "px";

noButton.style.position = "absolute";

}

function escapeButton(){

message.innerHTML = funnyMessages[
Math.floor(Math.random()*funnyMessages.length)
];

noCount++;

moveButton();

const scale = Math.max(0.45,1-noCount*0.12);

noButton.style.transform = `scale(${scale})`;

if(noCount>=5){

noButton.innerHTML="❤️";

setTimeout(()=>{

noButton.style.opacity="0";

noButton.style.pointerEvents="none";

},800);

}

}

noButton.addEventListener("mouseenter",escapeButton);

noButton.addEventListener("touchstart",escapeButton);

//========================
// Yes Buttons
//========================

yesButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

answers.accept = btn.innerText;

showYesAnimation();

});

});


//========================
// Animation
//========================

function showYesAnimation(){
if(document.getElementById("yesScreen")) return;
confetti({

particleCount:200,

spread:120,

origin:{y:0.6}

});

document.body.insertAdjacentHTML(

"beforeend",

`

<div id="yesScreen">

<div>

<h1>🎉🎉🎉</h1>

<h2>گفت آره ❤️</h2>

</div>

</div>

`

);

setTimeout(() => {

document.getElementById("yesScreen").remove();

go(1);

},2200);

}
//======================
// Slides
//======================

const slides=document.querySelectorAll(".slide");

let current=0;

function go(index){

if(index>=slides.length){

return;

}

slides[current].classList.remove("active");

current=index;

slides[current].classList.add("active");

progress.style.width=((current+1)*(100/slides.length))+"%";

window.scrollTo({

top:0,

behavior:"smooth"

});

}
document.querySelectorAll(".next").forEach(btn=>{

btn.onclick=()=>{

go(current+1);

}

});

//======================
// Place Buttons
//======================

document.querySelectorAll(".place").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".place").forEach(b=>{

            b.style.background="white";
            b.style.color="#444";

        });

        btn.style.background="#ff4d8d";
        btn.style.color="white";

        answers.place = btn.innerText;

        go(current+1);

    };

});

//======================
// Submit
//======================

document
.getElementById("submitForm")
.addEventListener("click", sendAnswers);

async function sendAnswers(){

try{

const btn =
document.getElementById("submitForm");

if(!answers.date){

alert("لطفاً تاریخ را انتخاب کن 🌸");

return;

}

if(!answers.time){

alert("لطفاً ساعت را انتخاب کن ⏰");

return;

}

if(!answers.place){

alert("محل قرار را انتخاب کن ❤️");

return;

}


btn.disabled = true;

btn.innerHTML = "در حال ارسال...";


answers.createdAt = new Date().toLocaleString("fa-IR");

const response = await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(answers)

});

const result = await response.text();

if(response.ok && result==="OK"){

btn.innerHTML="❤️ ثبت شد";

setTimeout(()=>{

alert("💜 پاسخ با موفقیت ثبت شد.");

location.reload();

},800);

}else{

throw new Error();

}

}catch{

alert("❌ خطا در ارسال اطلاعات");

document.getElementById("submitForm").disabled=false;

document.getElementById("submitForm").innerHTML="ثبت پاسخ ❤️";

}

}

//========================
// Flower Rain
//========================

function flowerRain(){

for(let i=0;i<35;i++){

setTimeout(()=>{

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=
(3+Math.random()*3)+"s";

petal.style.fontSize=
(18+Math.random()*20)+"px";

document.body.appendChild(petal);

setTimeout(()=>{

petal.remove();

},6000);

},i*80);

}

}

const dateInput = document.getElementById("date");

if(dateInput){

dateInput.addEventListener("change",()=>{

answers.date = dateInput.value;

});

}

const timeInput = document.getElementById("time");

if(timeInput){

timeInput.addEventListener("change",()=>{

answers.time = timeInput.value;

});

}

const comment = document.getElementById("comment");

if(comment){

comment.addEventListener("input",()=>{

answers.comment = comment.value;

});

}