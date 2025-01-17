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

    // Adjust the directory's margin to always be below the menu
    if (navigation.classList.contains('open')) {
        directory.style.marginTop = `${navigation.offsetHeight + 16}px`;
    } else {
        directory.style.marginTop = '1rem';
    }
});

// Close the menu when a navigation link is clicked (for mobile view)
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('open');
        hamButton.classList.remove('open');
        directory.style.marginTop = '1rem'; // Reset margin
    });
});

// Fetch Business Data and Process
const url = 'data/members.json';
let businessesData = []; // This fetches and stores the business data

// Fetch and process data
const getBusinessData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        businessesData = data; // Save all the businesses
        displayBusinesses(businessesData, 'grid'); // Display in grid view by default
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Display Businesses in Grid or List View
const displayBusinesses = (businesses, view) => {
    directory.innerHTML = ""; // Clear previous content
    directory.className = view === 'grid' ? 'grid-view' : 'list-view'; // Toggle between grid and list classes

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
};

// Toggle between Grid and List Views
document.getElementById('grid-view').addEventListener('click', () => displayBusinesses(businessesData, 'grid'));
document.getElementById('list-view').addEventListener('click', () => displayBusinesses(businessesData, 'list'));

// Call the function to fetch and display data
getBusinessData(url);
