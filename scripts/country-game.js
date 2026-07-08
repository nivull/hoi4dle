var answer;
const factoryDistance = 10;
async function dataLoaded() {
    await window.countryDataPromise;
    console.log("Country data loaded");
    console.log(window.countryData);

    answer = getCountry("Estonia");
    addEventListener('countrySelection', (event) => {

        testBorders();
        testIdeology();
        testFactories();
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

function testBorders() {

        if(window.selected.country == answer.country) {
            //if correct
            console.log("Correct Country")
            return 2;
        } else if(window.selected.border.includes(answer.country)){
            //if bordering
            console.log("Bordering");
            return 1;
        } else {
            //no borders
            console.log("Not Bordering");
            return 0;
        }
}

function testIdeology() {

    if(window.selected.ideology == answer.ideology) {
        //ideology correct
        console.log("Correct Ideology");
        return 2;
    } else {
        console.log("Incorrect Ideology");
        return 0;
    }

}

function testFactories() {

    const ansF = answer.factories;
    const guessF = window.selected.factories;
    if(guessF == ansF) {
        //factories correct
        console.log("Correct Factories");
        return 'correct';
    } else if(ansF > guessF && ansF <= guessF + factoryDistance) {
        //factories close up
        console.log("Close Factories Up");
        return 'up close';
    } else if(ansF < guessF && ansF >= guessF - factoryDistance){
        //factories close down
        console.log("Factories Close Down");
        return 'down close';
    } else if(ansF > guessF){
        //factories far up
        console.log("Factories Far Up");
        return 'up far';
    } else {
        //factories far down
        console.log("Factories Far Down");
        return 'down far';
    }
}
