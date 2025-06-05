let productsData = [];

// Fetch products.json and store data
async function fetchProducts() {
    try {
        const res = await fetch('products.json');
        productsData = await res.json();
        displayProducts(productsData);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products using createProduct function
function displayProducts(products) {
    const prodGrid = document.querySelector('#other-products-grid');
    prodGrid.innerHTML = '';
    products.forEach(product => {
        createProduct(
            product.image,
            product.shortName,
            product.fullName,
            product.description,
            product.price,
            product.oldPrice
        );
    });
}

// Filter products based on search input
function filterProducts(searchValue) {
    const noResultsSpan = document.querySelector('#search-fieldset span');
    if (!searchValue) {
        displayProducts(productsData);
        if (noResultsSpan) noResultsSpan.style.display = 'none';
    } else {
        const filtered = productsData.filter(product =>
            product.shortName.toLowerCase().includes(searchValue.toLowerCase())
        );
        displayProducts(filtered);
        if (noResultsSpan) {
            if (filtered.length === 0) {
                noResultsSpan.style.display = 'flex';
            } else {
                noResultsSpan.style.display = 'none';
            }
        }
    }
}

// Event listener for search input
const searchInput = document.querySelector('#search-products');
const otherProductsGrid = document.querySelector('#other-products-grid');

if (searchInput) {
    // Listen for input changes to filter products dynamically
    searchInput.addEventListener('input', (e) => {
        filterProducts(e.target.value);
    });

    // Ensure other products grid is visible when search input is focused
    searchInput.addEventListener('focus', () => {
        if (otherProductsGrid) {
            otherProductsGrid.style.display = 'grid';
        }
    });
} else {
    console.error('Search input element not found');
}

// Initialize by fetching products on page load
fetchProducts();
