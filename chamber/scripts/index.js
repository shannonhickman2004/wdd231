// Set the current year dynamically
const currentYear = new Date().getFullYear();
const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}

// Set the last modified date dynamically
const lastModifiedDate = new Date(document.lastModified);
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Updated: ${lastModifiedDate.toLocaleDateString()}`;
}

// Hamburger Menu Functionality
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const directory = document.querySelector('#directory');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Close the menu when a navigation link is clicked (for mobile view)
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('open');
        hamButton.classList.remove('open');
    });
});

// Fetch Business Data and Process
const url = 'data/members.json';
let businessesData = []; // This will store the business data

// Fetch and process data
const getBusinessData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        businessesData = data;
        displayBusinesses(businessesData); 
        displaySpotlights(businessesData); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Display Businesses in Grid View
const displayBusinesses = (businesses) => {
    const directory = document.getElementById('directory'); 
    if (directory) {
        directory.innerHTML = ""; // Clear previous content
        directory.classList.add('grid-view'); 

        businesses.forEach((business) => {
            // Create card elements
            const card = document.createElement('section');
            card.className = 'member-card';

            const name = document.createElement('h2');
            name.textContent = business.name;

            const image = document.createElement('img');
            image.setAttribute('src', `images/${business.image}`);
            image.setAttribute('alt', `Logo of ${business.name}`);
            image.setAttribute('loading', 'lazy');

            const address = document.createElement('p');
            address.textContent = business.address;

            const phone = document.createElement('p');
            phone.textContent = business.phone;

            const website = document.createElement('a');
            website.textContent = business.website;
            website.setAttribute('href', business.website);
            website.setAttribute('target', '_blank');
            website.classList.add('website-link');

            // Append elements to card
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);

            // Add card to the DOM
            directory.appendChild(card);
        });
    }
};


// Filter and Display Spotlight Members
const displaySpotlights = (members) => {
    const spotlightContainer = document.querySelector('.spotlight-container'); // Select spotlight container
    spotlightContainer.innerHTML = ''; // Clear any previous content

    // Filter for Gold and Silver members
    const eligibleMembers = members.filter(member =>
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    // Shuffle and take 3 random members
    const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Inject cards for each selected member
    randomMembers.forEach(member => {
        const spotlightCard = `
            <div class="spotlight-card">
                <img src="images/${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
            </div>
        `;
        spotlightContainer.innerHTML += spotlightCard;
    });
};

// Initialize spotlight display
document.addEventListener('DOMContentLoaded', () => {
    getBusinessData(url);
});