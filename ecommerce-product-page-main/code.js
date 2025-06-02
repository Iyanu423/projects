/**
 * Main DOM element selectors
 */
const cartSummary = document.querySelector('#cart-summary');
const mainPhoto = document.querySelector('.main-photo');
const minusIcon = document.querySelector('.counter-wrapper span:first-child');
const plusIcon = document.querySelector('.counter-wrapper span:last-child');
const counterValue = document.querySelector('.counter-value');
const checkoutBtn = document.querySelector('.checkout-btn');

/**
 * Event listener for checkout button click
 * Alerts the total price of all products in the cart summary
 */
checkoutBtn.addEventListener('click', () => {
    if (displaySum.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    const totalSum = displaySum.reduce((acc, val) => acc + val, 0);
    const formattedTotalSum = totalSum.toLocaleString();
    alert('Total price of all products in the cart summary: N' + formattedTotalSum);
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
atcBtn.addEventListener('click', (e) => {
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
const supportIcon = document.querySelector('.extra-settings img:last-child');

supportIcon.addEventListener('click', () => document.querySelector('#devs-page').click());

let darkmode = false;
themeIcon.addEventListener('click', e => {
    if (!darkmode) {
        darkModeStyle.disabled = false;
        e.target.src = 'images/icons8-light-mode-78.png';
        darkmode = true;
    } else {
        darkModeStyle.disabled = true;
        e.target.src = 'images/icons8-dark-mode-100.png';
        darkmode = false;
    }
});

/**
 * Fullscreen toggle logic
 */
let fullScreen = false;
fullScreenIcon.addEventListener('click', e => {
    if (!fullScreen) {
        document.documentElement.requestFullscreen();
        e.target.style.rotate = '90deg';
        fullScreen = true;
    } else {
        document.exitFullscreen();
        e.target.style.rotate = 'initial';
        fullScreen = false;
    }
});
