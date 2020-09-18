//added onload animation
const div = document.querySelector('.mainDiv');
const secondDiv = document.querySelector('.secondDiv');
const form = document.querySelector('#form');
window.addEventListener('DOMContentLoaded', () => {
    div.style.opacity = 0;
    secondDiv.style.opacity = 0;
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
//arrays of the table
let columns = [];
let column = [];
//input the id so it can match the data from an api and display it later in a table 
const inputID = document.querySelector('#id');
const queryID = async () => {
    let url = `https://api.adamix.net/apec/cedula/${inputID.value}`;
    const request = await fetch(url);
    const response = await request.json();
    //fields specified
    const {Nombres, Apellido1, FechaNacimiento, IdSexo ,foto} = response;
    column.push(Nombres)
    column.push(Apellido1)
    column.push(FechaNacimiento)
    column.push(IdSexo)
    column.push(foto)
}

//validating the form
const mail = document.querySelector('#mail');
const image = document.querySelector('#image');
const submit = document.querySelector('#submit')

const formValidation = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        if(inputID.value === ''||mail.value === '' || selectSchools.selectedIndex == 0 || selectComp.selectedIndex == 0|| image.value == ''){
            console.log('empty fields')
        }
        else{
            const fill = () => {
                column.push(inputID.value)
                column.push(mail.value)
                column.push(selectSchools.options[selectSchools.options.selectedIndex].text)
                column.push(selectComp.options[selectComp.options.selectedIndex].text)
                column.push(image.value);
                
                columns.push(column);
                const data = JSON.stringify(columns);
                localStorage.setItem('data', data);
            }
            fill()
            alert('Registration completed!')
        }
    }); 

    const querySubmit = document.querySelector('#querySubmit');

    querySubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const showData = () => {
        const tBody = document.querySelector('#tbodyData');
        tBody.innerHTML = '';
            setTimeout(() => {
                secondDiv.style.opacity = 1;
            }, 0500);

            for(let x = 0; x < columns.length; x++){
                let tr = document.createElement('tr');
                column = columns[x];

                for(let y = 0; y < column.length; y++){
                    let data = column[y];
                    let td = document.createElement('td');
                    td.innerHTML = data;
                    tr.appendChild(td)
                }
                tBody.appendChild(tr);
            }
        }
        showData();
        const data = localStorage.getItem('data');
        if(data != null){
            columns = JSON.parse(data);
            showData();
        }
    });
}
formValidation();
