const list = document.getElementById('countries');
const inputbar = document.getElementById("input-bar");
const selectionZone = document.getElementById("countries");
async function loadData() {
    //set up loaded signal thing
    window.countryDataPromise = new Promise((resolve) => {
        window.resolveData = resolve;
    });
        const response = await fetch('./scripts/countries.json');
        window.countryData = await response.json();
        //data done loadin
        window.resolveData();
}

loadData();


inputbar.addEventListener('input', (event)=> {
    if(event.inputType == 'deleteContentBackward') {
        selectionZone.style.visibility = 'hidden';
    }
    list.replaceChildren();
    if(event.target.value != ''){
        findMatching(event.target.value);
    }

});

function findMatching(input) {

    let first = [];
    const matching = countryData.filter((elem)=> {

        if(elem.country.toLowerCase().includes(input.toLowerCase())) {
            //if first letter
            if(elem.country.toLowerCase()[0] == input.toLowerCase()){
                first.push(elem);
                return false;
            }
            return true;
        } else{
            return false;
        }

    });
    
    updateSelection(first.sort(), input);
    updateSelection(matching.sort(), input);
    
    }

function updateSelection(matching, input) {

    console.log(matching)
    if(matching.length == 0) {
        selectionZone.style.visibility = "hidden";
    }
    else {
        selectionZone.style.visibility = "visible";
        for(let x of matching) {

            const regex = new RegExp(input, 'gi');
            const processedWord = x.country.replace(regex, `<b>$&</b>`);
            console.log(processedWord)



            const li = document.createElement('li');
            li.className= "selectionOption";
            li.innerHTML = `<li>${processedWord}</li>`
            li.addEventListener('click', (event) => {
                window.selected = event.target.textContent;
                //console.log(window.selected);
            })
            list.appendChild(li);
            console.log(li.outerHTML)
    }
    }
}