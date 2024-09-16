const typingText=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time=document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const btn=document.querySelector('button');

// set values

let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;



function loadParagraph(){
    const paragraph=["A small bakery in a bustling city was celebrating a milestone: its 100th customer of the day. The owner, David, had started the business with just $1,000 in savings and a passion for baking. Through word-of-mouth and positive online reviews, the bakery had steadily grown its customer base. On this special day, David decided to surprise the 100th customer with a free cake and a handwritten thank-you note. The gesture went viral on social media, with the hashtag #100thCustomer trending locally. In the following weeks, the bakery saw a 30% increase in foot traffic and online orders. David's simple act of kindness had not only delighted one customer but also created a ripple effect of positive publicity and increased sales." , "A virtual assistant (typically abbreviated to VA) is generally self-employed and provides professional administrative, technical, or creative assistance to clients remotely from a home office.","The role of administrative professionals is evolving as technology continues to reshape the workplace. Automation and artificial intelligence are taking over routine tasks like data entry and scheduling, freeing up administrative staff to focus on higher-level responsibilities. The future of administrative work will likely involve more strategic and analytical tasks. Administrative professionals will be expected to leverage technology to streamline processes, analyze data, and make informed decisions."];

    const randomIndex=Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML="";
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML+=`<span>${char}</span>`;
        typingText.querySelectorAll('span')[0].classList.add('active');
        document.addEventListener('keydown',()=>input.focus());
        typingText.addEventListener("click",()=>{
            input.focus();
        })
    }
}

//  handle user input

function initTyping(){

    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
        if (!isTyping) {
            timer=setInterval(initTime , 1000);
            isTyping=true;
        }
        if (char[charIndex].innerText=== typedChar) {
            char[charIndex].classList.add('correct');
            console.log("correct");
            
        }else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText= mistake;
        cpm.innerHTML = charIndex - mistake;
    }else{

    }
}

function initTime(){
    if (timeLeft>0) {
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText=wpmVal;
    }else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value="";
    
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;

}

input.addEventListener('input',initTyping);
btn.addEventListener("click",reset)


loadParagraph();
