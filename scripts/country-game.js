var answer;
let currentRow = 0;
const maxRow = 4;
// box colours
const greyColour = "#272727";
const yellowColour = "#bdaa40";
const greenColour = "#409c34e8";
let wonGame = false;

const guessDistance = 10;
async function dataLoaded() {
    await window.countryDataPromise;
    console.log("Country data loaded");
    console.log(window.countryData)

    answer = getCountry("France");
    addEventListener('countrySelection', (event) => {

        if(!wonGame) {
            guess(testBorders(), testIdeology(), testFactories(), testContinent());
        }
            
        if(wonGame) {
            console.log("You Win!");
        }
         else if(currentRow < maxRow) {
            currentRow++;
        } else{
            console.log("You Lost :(");
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

//these two functions below could be the same but im too lazy to fix it
function testBorders() {

        if(window.selected.country == answer.country) {
            //if correct
            //console.log("Correct Country")
            wonGame = true;
            return 2;
        } else if(window.selected.border.includes(answer.country)){
            //if bordering
            //console.log("Bordering");
            return 1;
        } else {
            //no borders
            //console.log("Not Bordering");
            return 0;
        }
}

function testIdeology() {

    if(window.selected.ideology == answer.ideology) {
        //ideology correct
        //console.log("Correct Ideology");
        return 2;
    } else {
        //console.log("Incorrect Ideology");
        return 0;
    }
}


//same here with 2 functions below lol
function testFactories() {

    const ansF = answer.factories;
    const guessF = window.selected.factories;
    if(guessF == ansF) {
        //factories correct
        //console.log("Correct Factories");
        return 'correct';
    } else if(ansF > guessF && ansF <= guessF + guessDistance) {
        //factories close up
        //console.log("Close Factories Up");
        return 'up close';
    } else if(ansF < guessF && ansF >= guessF - guessDistance){
        //factories close down
        //console.log("Factories Close Down");
        return 'down close';
    } else if(ansF > guessF){
        //factories far up
        //console.log("Factories Far Up");
        return 'up far';
    } else {
        //factories far down
        //console.log("Factories Far Down");
        return 'down far';
    }
}

function testContinent() {

    const ans = answer.continent;
    const guess = window.selected.continent;

    const contBorders = {
        "Europe": "Asia",
        "Africa": "Asia",
        "North America": "South America",
        "South America": "North America",
        "Oceania": "N/A"
    }

    if(ans == guess) {
        return 2;
    } else if(contBorders[ans] == guess) {
        return 1;
    } else {
        return 0;
    }




}

function guess(borders, ideology, factories, continent) {

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
