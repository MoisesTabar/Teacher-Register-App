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
        }, 0500)
    }, 0100)
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
const urlSchools = 'http://localhost:3000/schools';
const fillSchools = async () => {
    const request = await fetch(urlSchools);
    const response = await request.json();
    const {name} = response;

    for(elements in response){
       selectSchools.options[selectSchools.options.length] = new Option(JSON.stringify(response[elements].name));
    }
}

const urlComps = 'http://localhost:3000/computers';
const fillComps = async () => {
    const request = await fetch(urlComps);
    const response = await request.json();

    for(elements in response){
        selectComp.options[selectComp.options.length] = new Option(JSON.stringify(response[elements]));
    }
}
fillSchools();
fillComps();

//input the id so it can match the data from an api and display it later in a table 
const inputID = document.querySelector('#id').value;
const url = `https://api.adamix.net/apec/cedula/${inputID}`;

const queryID = async () => {
    const request = await fetch(url);
    const response = await request.json();
    console.log(response);
}
queryID();

//validating the form
const mail = document.querySelector('#mail');
const image = document.querySelector('#image');
const submit = document.querySelector('#submit')
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
