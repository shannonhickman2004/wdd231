import { temples } from '../data/temples.js'
//console.log(temples)

import { url } from '../data/temples.js'
//console.log(url)
//gets the reference to the division where we display the items
const showHere = document.querySelector("#showHere")
//gets a reference to the html dialog element and it's children
const mydialog = document.querySelector('#mydialog')
const mytitle = document.querySelector('#mydialog h2')
const myinfo = document.querySelector('#mydialog p')
const myclose = document.querySelector('#mydialog button')
myclose.addEventListener("click", () => mydialog.close())

//loops through the array of json items
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name
    photo.addEventListener('click', () => showStuff(x));
        showHere.appendChild(photo)
    })  //end loop
}//end the function

// start displaying all the items in the json file
displayItems(temples)

//populate the dialog with information when the image is click
function showStuff(x) {
    mytitle.innerHTML = x.name;  // Correctly set title
    myinfo.innerHTML = `
        <strong>Dedicated:</strong> ${x.dedicated}<br>
        <strong>Person:</strong> ${x.person}
    `;
    mydialog.showModal();
}
