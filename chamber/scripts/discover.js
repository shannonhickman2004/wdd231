import { places } from '../data/places.mjs';

// Grab a reference to the section where we display the items
const showHere = document.querySelector('#allplaces');

// Loop through the array of places and display each as a card
function displayItems(places) {
    places.forEach(place => {
        // Create the card element
        const theCard = document.createElement('div');
        theCard.classList.add('card');

        // Create the photo element
        const thePhoto = document.createElement('img');
        thePhoto.src = `images/${place.photo_link}`;
        thePhoto.alt = place.name;
        thePhoto.classList.add('place-photo');
        theCard.appendChild(thePhoto);

        // Create the title element
        const theTitle = document.createElement('h2');
        theTitle.textContent = place.name;
        theCard.appendChild(theTitle);

        // Create the address element
        const theAddress = document.createElement('address');
        theAddress.textContent = place.address;
        theCard.appendChild(theAddress);

        // Create the description element
        const theDesc = document.createElement('p');
        theDesc.textContent = place.description;
        theCard.appendChild(theDesc);

        // Create the "Learn More" button
        const learnMoreButton = document.createElement('button');
        learnMoreButton.textContent = 'Learn More';
        learnMoreButton.classList.add('learn-more');
        theCard.appendChild(learnMoreButton);

        // Append the card to the display section
        showHere.appendChild(theCard);
    });
}

// Display all the items
displayItems(places);

// Visitor Message Feature
const visitorMessageElement = document.querySelector('#visitor-message');

// Function to calculate the number of days between two dates
function getDaysBetweenDates(date1, date2) {
    const msToDays = 86400000; // 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
    return Math.floor((date2 - date1) / msToDays);
}

// Get the current date and the last visit date from localStorage
const currentDate = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

// Determine which message to display
if (!lastVisit) {
    // First visit
    visitorMessageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSinceLastVisit = getDaysBetweenDates(Number(lastVisit), currentDate);

    if (daysSinceLastVisit < 1) {
        visitorMessageElement.textContent = "Back so soon! Awesome!";
    } else {
        const dayLabel = daysSinceLastVisit === 1 ? 'day' : 'days';
        visitorMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayLabel} ago.`;
    }
}

// Store the current date as the last visit date
localStorage.setItem('lastVisit', currentDate);
