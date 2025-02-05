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

const url = 'data/artist.json';  // JSON file with art pieces
let artPiecesData = [];           // To store the fetched data

// Fetch and process data
const getArtPiecesData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        artPiecesData = data;
        displayArtPieces(artPiecesData, 'grid');  // Display in grid view by default
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Display art pieces in grid or list view
const displayArtPieces = (artPieces, view) => {
    const directory = document.getElementById('directory');
    if (!directory) return;

    directory.innerHTML = "";  // Clear previous content
    directory.className = view === 'grid' ? 'grid-view' : 'list-view';  // Toggle view classes

    artPieces.forEach(piece => {
        // Create card elements for each art piece
        const card = document.createElement('section');
        card.className = 'art-card';

        const title = document.createElement('h2');
        title.textContent = piece.name;

        const image = document.createElement('img');
        image.setAttribute('src', `images/${piece.image}`);
        image.setAttribute('alt', `Image of ${piece.name}`);
        image.setAttribute('loading', 'lazy');

        const artist = document.createElement('p');
        artist.textContent = `Artist Location: ${piece.subject}`;

        const price = document.createElement('p');
        price.textContent = `Value: ${piece.pricelevel}`;
        

        // Append elements to the card
        card.append(image, title, artist, price);
        directory.appendChild(card);
    });
};

// Toggle between grid and list views
document.getElementById('grid-view')?.addEventListener('click', () => displayArtPieces(artPiecesData, 'grid'));
document.getElementById('list-view')?.addEventListener('click', () => displayArtPieces(artPiecesData, 'list'));

// Initialize data fetch and display
getArtPiecesData(url);
