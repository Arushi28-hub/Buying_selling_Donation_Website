// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Fade-in animations for sections
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach((section) => {
  observer.observe(section);
});

// Modal functionality
const sellItemBtn = document.getElementById('sell-item-btn');
const donateItemBtn = document.getElementById('donate-item-btn');
const applyForDonationBtn = document.getElementById('apply-for-donation-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Open modals
if (sellItemBtn) {
  sellItemBtn.addEventListener('click', () => {
    document.getElementById('sell-item-modal').style.display = 'flex';
  });
}

if (donateItemBtn) {
  donateItemBtn.addEventListener('click', () => {
    document.getElementById('donate-item-modal').style.display = 'flex';
  });
}

if (applyForDonationBtn) {
  applyForDonationBtn.addEventListener('click', () => {
    document.getElementById('apply-for-donation-modal').style.display = 'flex';
  });
}

// Close modals
closeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').style.display = 'none';
  });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Handle selling form submission
if (document.getElementById('sell-item-form')) {
  document.getElementById('sell-item-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemCategory = document.getElementById('item-category').value;

    // Validate inputs
    if (!itemName || !itemDescription || !itemPrice || !itemCategory) {
      alert('Please fill out all fields.');
      return;
    }

    // Create a new listing card
    const listingCard = document.createElement('div');
    listingCard.classList.add('listing-card');
    listingCard.setAttribute('data-category', itemCategory);

    listingCard.innerHTML = `
      <h3>${itemName}</h3>
      <p>${itemDescription}</p>
      <p><strong>Price:</strong> $${itemPrice}</p>
      <p><strong>Category:</strong> ${itemCategory}</p>
      <button class="btn">View Details</button>
    `;

    // Add the new listing to the listings container
    document.getElementById('listings-container').appendChild(listingCard);

    // Display success message
    alert(`Your item "${itemName}" has been listed successfully!`);

    // Close modal and reset form
    document.getElementById('sell-item-modal').style.display = 'none';
    e.target.reset();
  });
}

// Handle donating form submission
if (document.getElementById('donate-item-form')) {
  document.getElementById('donate-item-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = document.getElementById('donate-item-name').value;
    const itemDescription = document.getElementById('donate-item-description').value;

    // Validate inputs
    if (!itemName || !itemDescription) {
      alert('Please fill out all fields.');
      return;
    }

    // Create a new donation card
    const donationCard = document.createElement('div');
    donationCard.classList.add('listing-card');

    donationCard.innerHTML = `
      <h3>${itemName}</h3>
      <p>${itemDescription}</p>
      <button class="btn">Apply for Donation</button>
    `;

    // Add the new donation to the donations container
    document.getElementById('donations-container').appendChild(donationCard);

    // Display success message
    alert(`Your item "${itemName}" has been donated successfully!`);

    // Close modal and reset form
    document.getElementById('donate-item-modal').style.display = 'none';
    e.target.reset();
  });
}

// Handle buying form submission
if (document.getElementById('buying-form')) {
  document.getElementById('buying-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const category = document.getElementById('filter-category').value;
    const listings = document.querySelectorAll('#listings-container .listing-card');

    // Clear previous search results
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Search for matching products
    listings.forEach((listing) => {
      const itemName = listing.querySelector('h3').textContent.toLowerCase();
      const itemCategory = listing.getAttribute('data-category');

      if (
        (keyword === '' || itemName.includes(keyword)) &&
        (category === 'all' || itemCategory === category)
      ) {
        const listingCard = listing.cloneNode(true);
        searchResults.appendChild(listingCard);
      }
    });

    if (searchResults.children.length === 0) {
      searchResults.innerHTML = '<p>No matching products found.</p>';
    }
  });
}

// Handle review form submission
if (document.getElementById('review-form')) {
  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = document.getElementById('review-item-name').value;
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = document.getElementById('review-rating').value;

    // Validate inputs
    if (!itemName || !reviewText || !reviewRating) {
      alert('Please fill out all fields.');
      return;
    }

    // Create a new review card
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    reviewCard.innerHTML = `
      <h3>${itemName}</h3>
      <p><strong>Rating:</strong> ${reviewRating}/5</p>
      <p>${reviewText}</p>
    `;

    // Add the new review to the reviews container
    document.getElementById('reviews-container').appendChild(reviewCard);

    // Display success message
    alert('Thank you for your review!');

    // Reset form
    e.target.reset();
  });
}
