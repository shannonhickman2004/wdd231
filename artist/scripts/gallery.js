document.addEventListener('DOMContentLoaded', () => {
    setDynamicDates();
    setupMenuToggle();

    const currentPage = document.body.classList.contains('gallery-page') ? 'gallery' : 'home';
    if (currentPage === 'gallery') {
        initializeGallery();
    } else if (currentPage === 'home') {
        initializeSpotlight();
    }

    // Handle form submission for the contact page
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Save form data to sessionStorage
            sessionStorage.setItem('formData', JSON.stringify(data));

            // Redirect to the thank you page
            window.location.href = 'thankyou.html';
        });
    }
});

// Display form data on the thankyou.html page
window.addEventListener('DOMContentLoaded', () => {
    const formSummaryContainer = document.getElementById('formSummary');
    if (formSummaryContainer) {
        const formData = JSON.parse(sessionStorage.getItem('formData'));
        if (formData) {
            formSummaryContainer.innerHTML = `
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Art Title:</strong> ${formData['art-title']}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
            `;
        } else {
            formSummaryContainer.innerHTML = `<p>No form data available.</p>`;
        }
    }
});

// Function to set the current year and last modified date dynamically
function setDynamicDates() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    const lastModifiedDate = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = `Last Updated: ${lastModifiedDate.toLocaleDateString()}`;
}

// Function to toggle the mobile menu
function setupMenuToggle() {
    const hamButton = document.getElementById('menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// Function to initialize the gallery page
async function initializeGallery() {
    const directory = document.getElementById('directory');
    const filterDropdown = document.getElementById('filter-price-level');
    let artPiecesData = [];

    try {
        const response = await fetch('data/artist.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        artPiecesData = await response.json();

        populateFilterOptions(artPiecesData);
        applySavedFilter(filterDropdown, artPiecesData);
        displayArtPieces(artPiecesData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Save filter selection to localStorage
    filterDropdown.addEventListener('change', () => {
        localStorage.setItem('selectedFilter', filterDropdown.value);
        const selectedLevel = filterDropdown.value;
        const filteredPieces = selectedLevel === 'all'
            ? artPiecesData
            : artPiecesData.filter(piece => piece.pricelevel === selectedLevel);
        displayArtPieces(filteredPieces);
    });

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

    function applySavedFilter(filterDropdown, artPieces) {
        const savedFilter = localStorage.getItem('selectedFilter');
        if (savedFilter) {
            filterDropdown.value = savedFilter;
            const filteredPieces = savedFilter === 'all'
                ? artPieces
                : artPieces.filter(piece => piece.pricelevel === savedFilter);
            displayArtPieces(filteredPieces);
        }
    }

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

            image.addEventListener('click', () => openImageModal(image.src, piece.name));

            const location = document.createElement('p');
            location.textContent = `Subject: ${piece.subject}`;

            const price = document.createElement('p');
            price.textContent = `Price Level: ${piece.pricelevel}`;

            card.append(image, title, location, price);
            directory.appendChild(card);
        });
    }

    function openImageModal(imageSrc, titleText) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');

        modalImage.src = imageSrc;
        modalTitle.textContent = titleText;
        modal.showModal();
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('imageModal').close();
    });
}

// Function to initialize the spotlight on the homepage
async function initializeSpotlight() {
    const spotlightContainer = document.querySelector('.spotlight-container');

    try {
        const response = await fetch('data/artist.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const artPiecesData = await response.json();

        // Select 3 random art pieces
        const randomPieces = getRandomItems(artPiecesData, 3);

        // Display the spotlight items
        displaySpotlight(randomPieces, spotlightContainer);

    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }

    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displaySpotlight(artPieces, container) {
        container.innerHTML = '';
        artPieces.forEach(piece => {
            const card = document.createElement('section');
            card.className = 'spotlight-card';

            const title = document.createElement('h2');
            title.textContent = piece.name;

            const image = document.createElement('img');
            image.src = `images/${piece.image}`;
            image.alt = `Spotlight Image of ${piece.name}`;
            image.loading = 'lazy';

            const description = document.createElement('p');
            description.textContent = piece.subject;

            card.append(image, title, description);
            container.appendChild(card);
        });
    }
}
