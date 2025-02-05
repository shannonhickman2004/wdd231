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

const url = './data/artist.json';  // JSON file with art pieces

// Function to fetch data and display spotlight
const getArtData = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        displaySpotlights(data);  // Display the spotlight section
        displayArtPieces(data, 'grid');  // Display all art pieces in grid view by default
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to display spotlights
const displaySpotlights = (artPieces) => {
    const spotlightContainer = document.querySelector('.spotlight-container');
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = "";

    // Group art pieces by price level
    const priceGroups = { Low: [], Medium: [], High: [] };

    artPieces.forEach(piece => {
        if (priceGroups[piece.pricelevel]) {
            priceGroups[piece.pricelevel].push(piece);
        }
    });

    // Randomly select and display one piece from each price level
    Object.keys(priceGroups).forEach(level => {
        if (priceGroups[level].length > 0) {
            const randomPiece = priceGroups[level][Math.floor(Math.random() * priceGroups[level].length)];
            const spotlightCard = `
                <div class="spotlight-card">
                    <img src="images/${randomPiece.image}" alt="${randomPiece.name}">
                    <h3>${randomPiece.name}</h3>
                    <p>Location: ${randomPiece.subject}</p>
                    <p>Value: ${randomPiece.pricelevel}</p>
                </div>
            `;
            spotlightContainer.innerHTML += spotlightCard;
        }
    });
};

// Function to display art pieces
const displayArtPieces = (artPieces, view) => {
    const directory = document.getElementById('directory');
    if (!directory) return;

    directory.innerHTML = "";
    directory.className = view === 'grid' ? 'grid-view' : 'list-view';

    artPieces.forEach(piece => {
        const card = document.createElement('section');
        card.className = 'art-card';

        const title = document.createElement('h2');
        title.textContent = piece.name;

        const image = document.createElement('img');
        image.setAttribute('src', `images/${piece.image}`);
        image.setAttribute('alt', `Image of ${piece.name}`);
        image.setAttribute('loading', 'lazy');

        const artist = document.createElement('p');
        artist.textContent = `Location: ${piece.subject}`;

        const price = document.createElement('p');
        price.textContent = `Value: ${piece.pricelevel}`;

        card.append(image, title, artist, price);
        directory.appendChild(card);
    });
};

// Event listeners for toggling grid and list views
document.getElementById('grid-view')?.addEventListener('click', () => displayArtPieces(artPiecesData, 'grid'));
document.getElementById('list-view')?.addEventListener('click', () => displayArtPieces(artPiecesData, 'list'));

// Initialize data fetch and display
document.addEventListener('DOMContentLoaded', getArtData);
