
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
