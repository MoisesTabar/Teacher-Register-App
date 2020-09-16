
//added onload animation
const div = document.querySelector('.mainDiv');
const form = document.querySelector('#form');
window.addEventListener('DOMContentLoaded', () => {
    div.style.opacity = 0;
    form.style.opacity = 0;
    setTimeout(() =>{
        div.style.opacity = 1;
        setTimeout(() => {
            form.style.opacity = 1;
        }, 2000)
    }, 1000)
})

//populate select boxes with data from my local json servers
//displaying a default option in school and Computers select boxes
let defaultOptionSchools = document.createElement('option');
let defaultOptionComps = document.createElement('option');
const selectSchools = document.querySelector('#school');
const selectComp = document.querySelector('#computer');

selectSchools.length = 0;
defaultOptionSchools.text = '-Select an option-';
selectSchools.add(defaultOptionSchools);
selectSchools.selectedIndex = 0;

selectComp.length = 0;
defaultOptionComps.text = '-Select an option-';
selectComp.add(defaultOptionComps);
selectComp.selectedIndex = 0;

//displaying in the select boxes
const urlSchools = 'http://localhost:3000/schools/1';

const fillSchools = async () => {
    const request = await fetch(urlSchools);
    const response = await request.json;
    const {name} = response;

    for(elements in name){
       selectSchools.options[selectSchools.options.length] = new Option(JSON.stringify(name[elements], elements));
    }
}
fillSchools();