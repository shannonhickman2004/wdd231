document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        const localTimestamp = now.toLocaleString('en-GB', { hour12: false }).replace(',', '');
        timestampField.value = localTimestamp;
    }
});

// Get modal and elements
const modal = document.getElementById('membershipModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// Membership details (example data)
const membershipDetails = {
    np: {
        title: 'NP Membership',
        description: 'Access to non-profit networking events, volunteer opportunities, and community activities.',
        cost: '$0/year',
    },
    bronze: {
        title: 'Bronze Membership',
        description: 'Includes invitations to special events, business training, and directory listing.',
        cost: '$150 - $250/year',
    },
    silver: {
        title: 'Silver Membership',
        description: 'All Bronze benefits plus premium advertising, event discounts, and advanced workshops.',
        cost: '$400 - $600/year',
    },
    gold: {
        title: 'Gold Membership',
        description: 'All Silver benefits, plus sponsorship opportunities, marketing support, and leadership roles.',
        cost: '$900 - $1,200/year',
    },
};

// Ensure modal elements exist before adding event listeners
if (modal && closeModalBtn && modalTitle && modalDescription) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const membership = card.dataset.membership;
            const details = membershipDetails[membership];

            if (details) {
                modalTitle.textContent = details.title;
                modalDescription.textContent = details.description;
                modal.showModal();
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

// Extract the query string from the URL
const currentUrl = window.location.href;
const urlParts = currentUrl.split('?');

if (urlParts.length > 1) {
    const queryString = urlParts[1];
    const formData = queryString.split('&');

    // Function to retrieve values by key
    function show(key) {
        let result = '';
        formData.forEach((element) => {
            if (element.startsWith(key)) {
                result = decodeURIComponent(element.split('=')[1].replace(/\+/g, ' '));
            }
        });
        return result;
    }

    // Inject the form data into the results section
    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `
        <h2>Membership Application Details</h2>
        <p><strong>Name:</strong> ${show('first')} ${show('last')}</p>
        <p><strong>Organizational Title:</strong> ${show('title')}</p>
        <p><strong>Email:</strong> ${show('email')}</p>
        <p><strong>Mobile Number:</strong> ${show('phone')}</p>
        <p><strong>Business Name:</strong> ${show('org')}</p>
        <p><strong>Membership Level:</strong> ${show('membership')}</p>
        <p><strong>Description:</strong> ${show('description')}</p>
        <p><strong>Submitted on:</strong> ${show('timestamp')}</p>
    `;
} 