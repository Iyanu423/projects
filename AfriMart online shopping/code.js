/**
 * Main DOM element selectors
 */
const cartSummary = document.querySelector('#cart-summary');
const mainPhoto = document.querySelector('.main-photo');
const minusIcon = document.querySelector('.counter-wrapper span:first-child');
const plusIcon = document.querySelector('.counter-wrapper span:last-child');
const counterValue = document.querySelector('.counter-value');
const checkoutBtn = document.querySelector('.checkout-btn');
const cancelPayment = document.querySelector('#payment-modal h6:first-of-type');
const modalBackdrop = document.querySelector('#bg-layer');
const payNowBtn = document.querySelector('#pay-now-btn');
const successModal = document.querySelector('#success-msg');
const continueShpng = document.querySelector('#success-msg button');
const paymentModal = document.getElementById('payment-modal');


cancelPayment.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    modalBackdrop.style.display = 'none';
});

payNowBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    modalBackdrop.style.display = 'none';
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
    successModal.showModal();
});

continueShpng.addEventListener('click', () => {
    successModal.close();
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
    location.reload();
});


/**
 * Event listener for checkout button click
 * Alerts the total price of all products in the cart summary
 */
checkoutBtn.addEventListener('click', () => {
    if (displaySum.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Append chosen products to the payment modal final products list
    const finalProductsList = document.getElementById('final-products');
    // Clear existing products in the payment modal
    finalProductsList.innerHTML = '';

    // Clone and append each product from prodArray to finalProductsList
    prodArray.forEach(product => {
        const productClone = product.cloneNode(true);
        // Remove delete icon from cloned product in payment modal
        const deleteIcon = productClone.querySelector('#delete-icon');
        if (deleteIcon) {
            deleteIcon.remove();
        }
        finalProductsList.appendChild(productClone);
    });

    // Calculate total sum and update the total in payment modal
    const totalSum = displaySum.reduce((acc, val) => acc + val, 0);
    const formattedTotalSum = totalSum.toLocaleString();
    const totalSpan = document.getElementById('total');
    if (totalSpan) {
        totalSpan.innerHTML = `TOTAL &nbsp; <str>N${formattedTotalSum}</str>`;
    }

    paymentModal.style.display = 'block';
    modalBackdrop.style.display = 'block';
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
});


const atcBtn = document.querySelector('.atcBtn');
const selectedProduct = document.querySelector('.selected-product');
const deleteIcon = document.querySelector('#delete-icon');
const cartIcon = document.querySelector('#cart-icon');
const menuIcon = document.querySelector('#menu-icon');
const exitIcon = document.querySelector('#exit-icon');
const atcNotification = document.querySelector('#atc-notification');

/**
 * Event listeners for menu open and close
 */
menuIcon.addEventListener('click', () => {
    document.querySelector('nav').style.width = '75%';
});
exitIcon.addEventListener('click', () => {
    document.querySelector('nav').style.width = 0;
});

/**
 * Arrays to track products and their total costs
 */
const prodArray = [];
const displaySum = [];

/**
 * Periodically checks the product array to update checkout button visibility and cart icon styles
 */
setInterval(checkProdArray, 100);
function checkProdArray() {
    if (!prodArray.length) {
        checkoutBtn.style.display = 'none';
        cartIcon.style.outline = 'none';
        cartIcon.removeAttribute('class', 'pulse-animation');
    } else {
        checkoutBtn.style.display = 'block';
        cartIcon.style.outline = '2px solid orange';
        cartIcon.setAttribute('class', 'pulse-animation');
    }
}

/**
 * Event listener for Add to Cart button click
 * Clones the selected product, updates its details, calculates total cost, and adds it to the cart summary
 */
atcBtn.addEventListener('click', e => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });

    atcNotification.setAttribute('style', 'height: auto; padding: 1rem');
    atcNotification.textContent = 'Item successfully added to your cart ✔';
    setTimeout(() => {
        atcNotification.setAttribute('style', 'height: 0;padding: 0;overflow: hidden');
        atcNotification.textContent = '';
    }, 3000);

    const selectedProd = selectedProduct.cloneNode(true);
    const prodName = e.target.parentElement.closest('section').children[0].textContent;

    const prodImageUrl = e.target.parentElement.closest('section').previousElementSibling.children[0].src;
    const prodImage = selectedProd.querySelector('.selected-prod-image');
    prodImage.style.backgroundImage = 'url(' + prodImageUrl + ')';

    const prodPrice = selectedProd.children[1].querySelector('.total-cost-wrapper').children[0];
    const prodPriceVal = e.target.parentElement.closest('section').querySelector('.current-price-wrapper').children[1].textContent;
    prodPrice.textContent = prodPriceVal;

    const prodCount = selectedProd.children[1].querySelector('.total-cost-wrapper').children[2];
    const prodCountVal = e.target.parentElement.closest('section')
        .querySelector('.counter-and-atcBtn-wrapper').children[0].querySelector('.counter-value').textContent;
    prodCount.textContent = prodCountVal;

    const totalCost = selectedProd.children[1].querySelector('.total-cost-wrapper').querySelector('.total-cost');

    // Remove commas from price and parse to number
    const priceNumber = Number(prodPriceVal.replace(/,/g, ''));
    const countNumber = Number(prodCountVal);

    // Calculate total cost
    const total = priceNumber * countNumber;

    // Format total cost with commas
    const formattedTotal = total.toLocaleString();

    totalCost.textContent = 'N' + formattedTotal;

    selectedProd.setAttribute('style', 'display:flex');
    selectedProd.querySelector('.selected-prod-name').textContent = prodName;
    checkoutBtn.insertAdjacentElement('beforebegin', selectedProd);

    prodArray.push(selectedProd);
    // Remove commas and parse as number to correctly store total cost
    displaySum.push(Number(totalCost.textContent.slice(1).replace(/,/g, '')));

    //selectedProd.children[2] represents the delete icon in the DOM
    selectedProd.children[2].addEventListener('click', (e) => {
        e.target.closest('li').remove();
        prodArray.pop();
    });
});

/**
 * Handles the track bar that follows the user's cursor when header elements are hovered on
 */
const trackBar = document.querySelector('#track-bar');
const navOptions = document.querySelectorAll('nav span');

const avatarIcon = document.querySelector('#avatar-icon');
avatarIcon.addEventListener('mouseover', (e) => {
    document.querySelector('.fancy-text').style.color = 'hsl(219, 9%, 45%)';
    const avatarPosition = e.target.getBoundingClientRect();
    const translate = avatarPosition.x - 26;
    trackBar.style.translate = `${translate}px`;
    trackBar.style.width = '40px';
    e.target.style.border = '3px solid orange';
});

avatarIcon.addEventListener('mouseout', (e) => {
    document.querySelector('.fancy-text').style.color = 'hsl(26, 100%, 55%)';
    trackBar.style.translate = 0;
    trackBar.style.width = '140px';
    e.target.style.border = 'none';
});

navOptions.forEach(navOption => {
    navOption.addEventListener('mouseover', (e) => {
        document.querySelector('.fancy-text').style.color = 'hsl(219, 9%, 45%)';
        const navOptionPosition = e.target.getBoundingClientRect();
        const trackBarPosition = trackBar.getBoundingClientRect();
        const translate = navOptionPosition.x - 25;
        trackBar.style.translate = `${translate}px`;
        trackBar.style.width = '70px';
    });
    navOption.addEventListener('mouseout', () => {
        document.querySelector('.fancy-text').style.color = 'hsl(26, 100%, 55%)';
        trackBar.style.translate = 0;
        trackBar.style.width = '140px';
    });
});

/**
 * Handles the selected product summary pop up toggle
 */
let cartSummaryVisible = false;
const atcIcon = document.querySelector('#cart-icon')
    .addEventListener('click', () => {
        if (!cartSummaryVisible) {
            cartSummary.style.scale = '1';
            cartSummaryVisible = true;
        } else {
            cartSummary.style.scale = '0';
            cartSummaryVisible = false;
        }
    });

/**
 * Handles the view photo thumbnail click to update main photo
 */
const productPhotos = document.querySelectorAll('.product-photo');
productPhotos.forEach(photo => [
    photo.addEventListener('click', (e) => {
        const photoStyle = window.getComputedStyle(e.target);
        const photoUrl = photoStyle.getPropertyValue('background-image');
        const imagesIndex = photoUrl.indexOf('images');
        const properPhotoUrl = photoUrl.slice(imagesIndex, photoUrl.length - 2);
        mainPhoto.src = `${properPhotoUrl}`;
    })
]);

/**
 * Product counter logic with increment and decrement buttons
 */
counter = 1;
counterValue.textContent = counter;

minusIcon.addEventListener('click', e => {
    if (counter <= 1) {
        e.preventDefault();
        return false;
    }
    counter--;
    counterValue.textContent = counter;
    return true;
});

plusIcon.addEventListener('click', e => {
    counter++;
    counterValue.textContent = counter;
});

/**
 * Dark mode toggle logic
 */
const darkModeStyle = document.querySelector('#darkmodeStyle');
const extraSettings = document.querySelector('.extra-settings');
const themeIcon = document.querySelector('#theme-icon');
const fullScreenIcon = document.querySelector('#full-screen');
const supportIcon = document.querySelector('.extra-settings img:nth-of-type(3)');
const scrollToTop = document.querySelector('.extra-settings img:last-of-type');


// Theme persistence and toggling for main.html
document.addEventListener('DOMContentLoaded', () => {
    const darkmodeStyle = document.getElementById('darkmodeStyle');
    const themeIcon = document.getElementById('theme-icon');

    // Initialize theme based on localStorage
    let lightMode = true;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        lightMode = false;
        darkmodeStyle.disabled = false;
        themeIcon.src = 'images/icons8-light-mode-78.png';
    } else {
        lightMode = true;
        darkmodeStyle.disabled = true;
        themeIcon.src = 'images/icons8-dark-mode-100.png';
    }

    // Toggle theme on icon click
    themeIcon.addEventListener('click', () => {
        if (lightMode) {
            themeIcon.src = 'images/icons8-light-mode-78.png';
            darkmodeStyle.disabled = false;
            localStorage.setItem('theme', 'dark');
            lightMode = false;
        } else {
            themeIcon.src = 'images/icons8-dark-mode-100.png';
            darkmodeStyle.disabled = true;
            localStorage.setItem('theme', 'light');
            lightMode = true;
        }
    });
});


/**
 * Fullscreen toggle logic
 */
let fullScreen = false;
fullScreenIcon.addEventListener('click', e => {
    if (!fullScreen) {
        document.documentElement.requestFullscreen();
        e.target.src = 'images/icons8-exit-full-screen-78.png';
        fullScreen = true;
    } else {
        document.exitFullscreen();
        e.target.src = 'images/icons8-full-screen-96.png';
        fullScreen = false;
    }
});

scrollToTop.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});


// Auto populate the app with products from the email.json file
const prodGrid = document.querySelector('#other-products-grid');
const prodPic = document.querySelector('.product-gallery-main-wrapper');
const prodViewer = document.querySelector('.product-description-wrapper');


function createProduct(imagePath, short, full, descrp, newPrice, prevPrice) {

    const mainWrapper = document.createElement('div');
    const prodImage = document.createElement('img');
    prodImage.loading = 'lazy';
    const shortName = document.createElement('span');
    const fullName = document.createElement('span');
    const description = document.createElement('span');
    const price = document.createElement('span');
    const oldPrice = document.createElement('span');

    prodImage.src = imagePath;
    shortName.textContent = short;
    fullName.textContent = full;
    description.textContent = descrp;

    price.textContent = `N ${newPrice.toLocaleString()}`;
    oldPrice.textContent = prevPrice;

    const atcButton = document.createElement('button');
    atcButton.textContent = '🛒 Add to cart';

    // Add event listener to the add to cart button in other products grid
    atcButton.addEventListener('click', (e) => {

        atcNotification.setAttribute('style', 'height: auto; padding: 1rem');
        atcNotification.textContent = 'Item successfully added to your cart ✔';
        setTimeout(() => {
            atcNotification.setAttribute('style', 'height: 0;padding: 0;overflow: hidden');
            atcNotification.textContent = '';
        }, 3000);

        // Clone the selected product template for cart summary
        const selectedProd = selectedProduct.cloneNode(true);

        // Set product name
        selectedProd.querySelector('.selected-prod-name').textContent = short;

        // Set product image
        const prodImageUrl = imagePath;
        const prodImageDiv = selectedProd.querySelector('.selected-prod-image');
        prodImageDiv.style.backgroundImage = 'url(' + prodImageUrl + ')';

        // Set product price
        const prodPrice = selectedProd.querySelector('.total-cost-wrapper').children[0];
        prodPrice.textContent = `N ${newPrice.toLocaleString()}`;

        // Set product count to 1 (default for other products grid)
        const prodCount = selectedProd.querySelector('.total-cost-wrapper').children[2];
        prodCount.textContent = '1';

        // Calculate total cost
        const priceNumber = Number(newPrice);
        const countNumber = 1;
        const total = priceNumber * countNumber;
        const formattedTotal = total.toLocaleString();

        const totalCost = selectedProd.querySelector('.total-cost-wrapper').querySelector('.total-cost');
        totalCost.textContent = 'N' + formattedTotal;

        selectedProd.setAttribute('style', 'display:flex');

        // Insert the selected product before the checkout button
        checkoutBtn.insertAdjacentElement('beforebegin', selectedProd);

        prodArray.push(selectedProd);
        displaySum.push(Number(totalCost.textContent.slice(1).replace(/,/g, '')));

        // Add event listener to delete icon
        selectedProd.children[2].addEventListener('click', (e) => {
            e.target.closest('li').remove();
            prodArray.pop();
        });
    });

    mainWrapper.setAttribute('class', 'other-product');
    mainWrapper.append(prodImage, shortName, fullName, description, price, oldPrice, atcButton);

    mainWrapper.addEventListener('click', () => {

        window.scroll({ top: 0, behavior: 'smooth' });

        prodPic.querySelector('img:first-child').src = imagePath;

        prodViewer.querySelector('h1:first-child').textContent = short.toUpperCase();
        prodViewer.querySelector('h2:first-of-type').textContent = full;
        prodViewer.querySelector('p:first-of-type').textContent = descrp;
        prodViewer.querySelector('.current-price-wrapper').children[1].textContent = newPrice.toLocaleString();
        prodViewer.querySelector('.previous-price').textContent = `N${prevPrice.toLocaleString()}`;
    });

    prodGrid.append(mainWrapper);
}


async function getProduts() {
    const res = await fetch('products.json');
    const data = await res.json();

    try {
        data.forEach(product => {
            createProduct(product.image, product.shortName, product.fullName, product.description, product.price, product.oldPrice);
        });
    }
    catch (error) {
        console.error(error);
    }
}

window.onload = getProduts();