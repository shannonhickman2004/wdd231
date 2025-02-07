document.addEventListener('DOMContentLoaded', async () => {
    // Set the current year and last modified date dynamically
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    const lastModifiedDate = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = `Last Updated: ${lastModifiedDate.toLocaleDateString()}`;

    // Menu toggle for mobile view
    const hamButton = document.getElementById('menu');
    const navigation = document.querySelector('.navigation');
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    // Load and display art pieces with filtering functionality
    const url = 'data/artist.json';
    const directory = document.getElementById('directory');
    const filterDropdown = document.getElementById('filter-price-level');
    let artPiecesData = [];

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        artPiecesData = await response.json();
        populateFilterOptions(artPiecesData);
        displayArtPieces(artPiecesData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Populate filter options dynamically
    function populateFilterOptions(artPieces) {
        const priceLevels = [...new Set(artPieces.map(piece => piece.pricelevel))];
        filterDropdown.innerHTML = '<option value="all">All Price Levels</option>';
        priceLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            filterDropdown.appendChild(option);
        });
    }

    // Filter and display art pieces based on selected price level
    filterDropdown.addEventListener('change', () => {
        const selectedLevel = filterDropdown.value;
        const filteredPieces = selectedLevel === 'all'
            ? artPiecesData
            : artPiecesData.filter(piece => piece.pricelevel === selectedLevel);
        displayArtPieces(filteredPieces);
    });

    // Display art pieces and add click event for image focus
    function displayArtPieces(artPieces) {
        directory.innerHTML = '';
        artPieces.forEach(piece => {
            const card = document.createElement('section');
            card.className = 'art-card';

            const title = document.createElement('h2');
            title.textContent = piece.name;

            const image = document.createElement('img');
            image.src = `images/${piece.image}`;
            image.alt = `Image of ${piece.name}`;
            image.loading = 'lazy';

            image.addEventListener('click', () => {
                focusImage.src = image.src;
                focusBox.classList.add('active');
            });

            const location = document.createElement('p');
            location.textContent = `Location: ${piece.subject}`;

            const price = document.createElement('p');
            price.textContent = `Price Level: ${piece.pricelevel}`;

            card.append(image, title, location, price);
            directory.appendChild(card);
        });
    }

    // Handle image focus functionality
    const focusBox = document.getElementById('imageFocusBox');
    const focusImage = document.getElementById('focusImage');

    focusBox.addEventListener('click', () => {
        focusBox.classList.remove('active');
    });
});
