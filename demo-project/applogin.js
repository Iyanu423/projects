/*========== PAGE HEADER SECTION ==========*/

const getHelpIcon = document.querySelector('header img:first-of-type');
const helpMenu = document.querySelector(' header aside');

getHelpIcon.addEventListener('click', () => {
    helpMenu.setAttribute('style', 'scale: 1');
});

/**
 * Event listener on the document to close the help menu when clicking outside of it.
 * Checks if the clicked target is not inside the help menu and not the help icon itself.
 * Removes the inline style to hide the menu.
 */
document.addEventListener('click', e => {
    if (!helpMenu.contains(e.target) && e.target !== getHelpIcon) {
        helpMenu.removeAttribute('style');
    };
});



/*========== THEME TOGGLING SECTION ==========*/

const themeToggle = document.querySelector('header img:last-of-type');
const darkModeStyles = document.querySelector('#darkmode-style');

let lightMode = true;

// Initialize theme based on localStorage if available
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    lightMode = false;
    darkModeStyles.disabled = false;
    themeToggle.src = 'icons/icons8-light-mode-78.png';
} else {
    lightMode = true;
    darkModeStyles.disabled = true;
    themeToggle.src = 'icons/icons8-dark-mode-100.png';
}

themeToggle.addEventListener('click', e => {
    if (lightMode) {
        // Switch to dark mode: enable dark mode stylesheet and update icon
        e.target.src = 'icons/icons8-light-mode-78.png';
        lightMode = false;
        darkModeStyles.disabled = false;
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light mode: disable dark mode stylesheet and update icon
        e.target.src = 'icons/icons8-dark-mode-100.png';
        lightMode = true;
        darkModeStyles.disabled = true;
        localStorage.setItem('theme', 'light');
    }
});



/*========== STAFF LOGIN FORM HANDLING ==========*/

// Each input field contains dummy data at the moment. You can clear the input fields to test for error handling 
const formFields = document.querySelectorAll('form fieldset:not(form fieldset:last-of-type) input');
const submitBtn = document.querySelector('form button:first-of-type');
const newUserBtn = document.querySelector('form button:last-of-type');
const clearInputs = document.querySelector('#reset-fields');
const successNotif = document.querySelector('#notifications');
const loader = document.querySelector('.loader');

// Clear the values of all input fields in the form.
clearInputs.addEventListener('click', () => formFields.forEach(input => input.value = ''));

function displayError(formInput, valid) {
    const errorMsg = formInput.closest('fieldset').nextElementSibling;
    if (valid) {
        formInput.style.outline = '2px solid red';
        errorMsg.style.display = 'block';
    } else {
        formInput.style.removeProperty('outline');
        errorMsg.style.removeProperty('display');
    }
};


/**
 * NOTE: Basic form handling is implemented here because there is currently no backend validation.
 * Future updates would include backend validation against a database.
 */
submitBtn.addEventListener('click', e => {

    // Prevent form submission beacause this is still a demo
    e.preventDefault();

    let valid = true;

    formFields.forEach(field => {
        if (!field.value.trim()) {
            //Display error message if the form field is empty
            displayError(field, true);
            valid = false;
        } else {
            // Hide the error message if the form field contains valid input
            displayError(field, false);
        }
    });
    // Display success message and redirect the user to the main app
    if (valid) loginSuccess();
});


function loginSuccess() {

    loader.style.display = 'block';


    setTimeout(() => {

        loader.style.display = 'none';

        submitBtn.setAttribute('disabled', 'true');
        successNotif.setAttribute('style', 'padding: 1rem; height: max-content; ');

        getPage();

    }, 2000);
}

// Redirect the user to the main page
function getPage() {
    setTimeout(() => {
        location.assign('main.html');
    }, 2000);
}