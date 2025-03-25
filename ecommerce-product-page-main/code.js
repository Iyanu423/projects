const cartSummary = document.querySelector('#cart-summary');
const mainPhoto = document.querySelector('.main-photo');
const minusIcon = document.querySelector('.counter-wrapper span:first-child');
const plusIcon = document.querySelector('.counter-wrapper span:last-child');
const counterValue = document.querySelector('.counter-value');
const checkoutBtn = document.querySelector('.checkout-btn');
const atcBtn = document.querySelector('.atcBtn');
const selectedProduct = document.querySelector('.selected-product');
const deleteIcon = document.querySelector('#delete-icon');
const cartIcon = document.querySelector('#cart-icon');
const menuIcon = document.querySelector('#menu-icon');
const exitIcon = document.querySelector('#exit-icon');
const atcNotification = document.querySelector('#atc-notification');


menuIcon.addEventListener('click', () => {
    document.querySelector('nav').style.width = '75%';
})
exitIcon.addEventListener('click', () => {
    document.querySelector('nav').style.width = 0;
})

const prodArray = [];
const displaySum = [];


setInterval(checkProdArray, .1);
function checkProdArray() {
    if (!prodArray.length) {
        checkoutBtn.style.display = 'none';
        cartIcon.style.outlineColor = 'orange';
        cartIcon.removeAttribute('class', 'pulse-animation');
    }
    else {
        checkoutBtn.style.display = 'block';
        cartIcon.style.outlineColor = 'green';
        cartIcon.setAttribute('class', 'pulse-animation');
    }
};

atcBtn.addEventListener('click', (e) => {

    atcNotification.setAttribute('style', 'height: auto; padding: 1rem');
    atcNotification.textContent = 'Item successfully added to your cart';
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
    totalCost.textContent = '$' + prodPriceVal * prodCountVal;

    selectedProd.setAttribute('style', 'display:flex');
    selectedProd.querySelector('.selected-prod-name').textContent = prodName;
    checkoutBtn.insertAdjacentElement('beforebegin', selectedProd);

    prodArray.push(selectedProd);
    displaySum.push(parseInt(totalCost.textContent.slice(1)));


    //selectedProd.children[2] represents the delete icon in the DOM
    selectedProd.children[2].addEventListener('click', (e) => {
        e.target.closest('li').remove();
        prodArray.pop();
    })
});



//This code handles the track bar that follows the users cursor when header elements are hovered on
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
    trackBar.style.width = '240px';
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
        trackBar.style.width = '240px';
    })
})


//This code handles the selected product summary pop up
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
    })




//This code handles the view photo thuumbnail 
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

//This code handles the product counter
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

