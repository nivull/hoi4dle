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
    const first = [];
    const matching = countryData.filter((elem)=> {
        if(elem.country.toLowerCase().includes(input.toLowerCase())) {
            //if first letter
            if(elem.country.toLowerCase().startsWith(input.toLowerCase())){
                first.push(elem);
                return false;
            }
            return true;
        } else{
            return false;
        }

    });
    total = matching.length + first.length;
    updateSelection(first.sort(), input, total);
    updateSelection(matching.sort(), input, total);
    }

function updateSelection(matching, input, total) {

    if(total.length === 0) {
        selectionZone.style.visibility = "hidden";
    }
    else {
        selectionZone.style.visibility = "visible";
        for(let x of matching) {

            const regex = new RegExp(input, 'gi');
            const processedWord = x.country.replace(regex, `<b>$&</b>`);
            const li = document.createElement('li');
            li.className= "selectionOption";
            li.innerHTML = `<li>${processedWord}</li>`
            li.addEventListener('click', (event) => {
                let selectedText = event.target.textContent;
                window.selected = getSelectedCountry(selectedText);
                const selectionEvent = new CustomEvent('countrySelection');
                window.dispatchEvent(selectionEvent);

            })
            list.appendChild(li);
        }
    }
}

function getSelectedCountry(txt) {

    for(let x of window.countryData) {
        if(x.country == txt) {
            return x;
        }
    }
}