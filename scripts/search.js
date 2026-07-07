let data;
const list = document.getElementById('countries');
async function loadData() {
  const response = await fetch('./scripts/countries.json');
  data = await response.json();
}

loadData();
const inputbar = document.getElementById("input-bar");

inputbar.addEventListener('input', (event)=> {
    list.replaceChildren();
    if(event.target.value != ''){
        findMatching(event.target.value);
    } else {

    }
});

function findMatching(input) {

    let first = [];
    const matching = data.filter((elem)=> {

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
    
    updateSelection(first.sort());
    updateSelection(matching.sort());
    
    }


function updateSelection(matching) {

    for(let x of matching) {
        const li = document.createElement('li');
        li.innerHTML = `<li>${x.country}</li>`;
        list.appendChild(li);

    }
}