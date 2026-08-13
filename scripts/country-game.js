let answer;
let currentRow = 0;
const maxRow = 5;
const curDate = (new Date()).toLocaleDateString('en-US');
// box colours
const greyColour = "#272727";
const yellowColour = "#bdaa40";
const greenColour = "#409c34e8";
let wonGame = false;
let sessionGivesStreak = true;
if(localStorage.getItem("resetDate") == curDate) {
    sessionGivesStreak = false;
    console.log("reset")
}

if(localStorage.getItem("streak") == null) {
    localStorage.setItem("streak", 0);
}

if(localStorage.getItem("date") == null) {
    localStorage.setItem("date", "/");
}

const guessDistance = 10;
async function dataLoaded() {
    await window.countryDataPromise;
    getAnswer();
    answer = getCountry(localStorage.getItem("todays-answer"));
    loadGuesses();
    if(wonGame) {     
        endPopup();
    }

    addEventListener('countrySelection', (event) => {
        console.log(currentRow)
        console.log(maxRow)        
        if(!wonGame) {
            guess(testBorders(false), testIdeology(), testFactories(), testContinent());
        }
        if(currentRow > maxRow) {
            endPopup();
        }
        if(wonGame) {     
        endPopup();
        }
    });
}

dataLoaded(); 

function getCountry(txt) {

    for(let x of window.countryData) {
        if(x.country == txt) {
            return x;
        }
    }
}

function testBorders(loadingGuesses) {

        if(window.selected.country == answer.country) {
            //if correct
            wonGame = true;
            if(!loadingGuesses && sessionGivesStreak){
                localStorage.setItem("streak", parseInt(localStorage.getItem("streak"))+1);
            }
            return 2;
        } else if(window.selected.border.includes(answer.country)){
            //if bordering
            return 1;
        } else {
            //no borders
            return 0;
        }
}

function testIdeology() {

    if(window.selected.ideology == answer.ideology) {
        //ideology correct
        return 2;
    } else {
        return 0;
    }
}


//same here with 2 functions below lol
function testFactories() {

    const ansF = answer.factories;
    const guessF = window.selected.factories;
    if(guessF == ansF) {
        return 'correct';
    } else if(ansF > guessF && ansF <= guessF + guessDistance) {
        return 'up close';
    } else if(ansF < guessF && ansF >= guessF - guessDistance){
        return 'down close';
    } else if(ansF > guessF){
        return 'up far';
    } else {
        return 'down far';
    }
}

function testContinent() {

    const ans = answer.continent;
    const guess = window.selected.continent;

    const contBorders = {
        "Europe": ["West Asia", "Asia"],
        "Africa": "West Asia",
        "North America": "South America",
        "South America": "North America",
        "Oceania": "N/A",
        "Asia": ["West Asia", "China"],
        "West Asia": ["Europe", "Asia", "Africa"],
        "China": "Asia"
    }

    if(ans == guess) {
        return 2;
    } else if(contBorders[ans].includes(guess)) {
        return 1;
    } else {
        return 0;
    }
}

function guess(borders, ideology, factories, continent, automatic) {
    
    const rowObjects = [document.getElementById(`c-${currentRow}`),
        document.getElementById(`i-${currentRow}`),
        document.getElementById(`f-${currentRow}`),
        document.getElementById(`cont-${currentRow}`)
    ];

    rowObjects[0].textContent = window.selected.country;
    rowObjects[1].textContent = window.selected.ideology;
    rowObjects[2].textContent = window.selected.factories;
    rowObjects[3].textContent = window.selected.continent;

    simpleCheck(borders, rowObjects[0]);
    simpleCheck(ideology, rowObjects[1]);
    complexCheck(factories, rowObjects[2]);
    simpleCheck(continent, rowObjects[3]);
    currentRow++;
}

function simpleCheck(toCheck, obj) {

    switch(toCheck){

        case 2:
            changeColour(obj, greenColour);
            break;
        case 1:
            changeColour(obj, yellowColour);
            break;
        case 0:
            changeColour(obj, greyColour);
            break;
    }
}

function complexCheck(toCheck, obj) {

    let arrow;

    switch (toCheck) {

        case 'correct':
            changeColour(obj, greenColour);
            break;
        case 'up close':

            arrow = document.createRange().createContextualFragment(`<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="white"><path stroke-thickness="5rem" d="M448-242.67V-632L286.67-472.67 240-520l240.67-240.67L721.33-520l-46.66 46.67-160-160v390.66H448Z"/></svg>`);
            obj.appendChild(arrow);
            changeColour(obj, yellowColour)
            break;
        case 'up far':
            arrow = document.createRange().createContextualFragment(`<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="white"><path stroke-thickness="5rem" d="M448-242.67V-632L286.67-472.67 240-520l240.67-240.67L721.33-520l-46.66 46.67-160-160v390.66H448Z"/></svg>`);
            obj.appendChild(arrow);
            changeColour(obj, greyColour);
            break;            
        case 'down close':
            arrow = document.createRange().createContextualFragment(`<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M479.33-240 238.67-480.67 285.33-528l161.34 159.33V-758h66.66v390.67l160-160L720-480.67 479.33-240Z"/></svg>`);
            obj.appendChild(arrow);
            changeColour(obj, yellowColour);
            break;
        case 'down far':
            arrow = document.createRange().createContextualFragment(`<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M479.33-240 238.67-480.67 285.33-528l161.34 159.33V-758h66.66v390.67l160-160L720-480.67 479.33-240Z"/></svg>`);
            obj.appendChild(arrow);
            changeColour(obj, greyColour);
    }
}

function changeColour(obj, clr) {

    obj.style.backgroundColor = clr;
    obj.style.borderColor = clr;
}

//get today's game answer

function getAnswer() {
    if(localStorage.getItem("date") != curDate){
        const newCountry = window.countryData[Math.floor(Math.random() * window.countryData.length - 1) + 1].country;
        localStorage.setItem("todays-answer", newCountry);
    }
}

function endPopup() {

    let titleText;

    if(wonGame) {
        titleText = "Good Job!"
    } else {
        titleText = "Nice Try!"
        if(sessionGivesStreak) {   
            localStorage.setItem("streak", 0);
        } 
    }

    const correctAnswer = localStorage.getItem("todays-answer");
    const popup = document.createElement('div')
    popup.id = 'popup'

    popup.innerHTML = ` 
    <svg id="popupClose" xmlns="http://www.w3.org/2000/svg" 
    height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" onclick="document.getElementById('popup').remove();">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>

    <h1 id="popupTitle">${titleText}</h1>
    
    <h2 id="popupReveal">The answer was ${correctAnswer}</h2>    
    <h3 style="position: relative">Current Streak: ${localStorage.getItem("streak")}🔥</h3>
    <button type="button" id="replay-button" onclick="playAgain()">Play Again Today?</button>
    <p style="padding-inline: 10%">(Playing more than once in a day does not contribute to your streak)</p>
    `;

    document.body.appendChild(popup);
    const inputBar = document.getElementById("input-bar");
    inputBar.readOnly = true;
}

//play again within same day
function playAgain() {
    localStorage.setItem("resetDate", curDate);
    localStorage.setItem("date", "reset");
    window.location.reload();
}



//load all the stuff guessed for this day
function loadGuesses() {
    console.log(curDate);
    if(localStorage.getItem("date") != curDate || localStorage.getItem("savedGuesses") == null) {
        localStorage.setItem("date", curDate);
        localStorage.setItem("savedGuesses", JSON.stringify([]));
    } else {
        const getSaved = localStorage.getItem("savedGuesses");
        window.savedArray = JSON.parse(getSaved);    
        for(let countryName of savedArray) {
            window.selected = getSelectedCountry(countryName);
            guess(testBorders(true), testIdeology(), testFactories(), testContinent(), true);
        } 
        if(savedArray.length == maxRow+1) {
            endPopup();
        }
    }
}

