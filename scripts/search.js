let data;
async function loadData() {
  const response = await fetch('./scripts/countries.json');
  data = await response.json();
}

loadData();
const inputbar = document.getElementById("input-bar");

inputbar.addEventListener('input', (event)=> {
    if(event.target.value != ''){
        findMatching(event.target.value);
    } else {
        
    }
});

function findMatching(input) {

    const matching = data.filter((elem)=> {

        if(elem.country.toLowerCase().includes(input.toLowerCase())) {
            return true;
        } else{
            return false;
        }

    });
    console.log(matching)


}