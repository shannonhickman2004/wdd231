import {places} from'/data/discover.mjs'

//Grab a reference to the division where we display the items
const showHere = document.querySelector('allplaces')

//loop through the array of json items
function displayItems(places) {
    places.forEach(x => {
        //build the card element
        const thecard = document.createElement('div')
        //build the photo element
        const thephoto = document.createElement('img')
        thephoto.src = 'images/${x.photo_link}'
        thephoto.alt = x.name
        thecard.appendChild(thephoto)
        //build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        //build the address element
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)
        //build the description element
        const thedesc = document.createElmenet('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)

        showHere.appendChild(thecard)
    }) //end loop
} // end function

//Start displaying all items in the json file
displayItems(places)
