const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let prophetsData = []; // Store the fetched prophets globally

// Fetch and process data
const getProphetData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        prophetsData = data.prophets; // Save prophets globally
        displayProphets(prophetsData); // Display all prophets initially
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Display prophets as cards
const displayProphets = (prophets) => {
    cards.innerHTML = ""; // Clear any existing cards
    prophets.forEach((prophet, index) => {
        // Create card elements
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let details = document.createElement('p');

        // Populate h2 with full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Configure the image element with prophet number
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute(
            'alt',
            `Portrait of ${prophet.name} ${prophet.lastname} - ${index + 1}th Latter-day President`
        );
        portrait.setAttribute('loading', 'lazy');

        // Add Date of Birth and Place of Birth
        details.textContent = `Date of Birth: ${prophet.birthdate} | Place of Birth: ${prophet.birthplace}`;

        // Append elements to card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(details);

        // Add card to the DOM
        cards.appendChild(card);
    });
};

// Filter Functions
const filterProphets = (condition) => {
    const filteredProphets = prophetsData.filter(condition);
    displayProphets(filteredProphets); // Display filtered data
};

// Filter Conditions
const bornInUtah = (prophet) => prophet.birthplace === "Utah";
const bornOutsideUS = (prophet) => prophet.birthplace !== "United States";
const livedTo95 = (prophet) => {
    const birthYear = new Date(prophet.birthdate).getFullYear();
    const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
    return deathYear - birthYear >= 95;
};
const tenOrMoreChildren = (prophet) => prophet.numofchildren >= 10;
const presidentFor15Years = (prophet) => prophet.length !== undefined && prophet.length >= 15;

// Event Listeners for Filters
document.getElementById("born-in-utah").addEventListener("click", () => filterProphets(bornInUtah));
document.getElementById("born-outside-us").addEventListener("click", () => filterProphets(bornOutsideUS));
document.getElementById("lived-95").addEventListener("click", () => filterProphets(livedTo95));
document.getElementById("ten-children").addEventListener("click", () => filterProphets(tenOrMoreChildren));
document.getElementById("president-15-years").addEventListener("click", () => filterProphets(presidentFor15Years));

// Call the function to fetch and display data
getProphetData(url);
