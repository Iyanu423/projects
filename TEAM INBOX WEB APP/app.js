/*========= SIDEBAR MENU SECTION ==========*/

const switchThemeOption = document.querySelector('#Theme-switcher');
const dropDownIcon = document.querySelector('#Theme-switcher img:last-of-type');
const themesIcon = document.querySelector('#Theme-switcher img:first-of-type');
const themeMenu = document.querySelector('#theme-switcher-menu ');
const sideBar = document.querySelector('#side-bar-menu');
const collapseMenuIcon = document.querySelector('#collapse-menu-desktop');
const menuOptionContent = document.querySelectorAll(' #side-bar-menu b ');
const menuImg = document.querySelectorAll('.menu-option img');
const mobileMenu = document.querySelector('#mobile-menu-icon');
const mobileExit = document.querySelector('#mobile-exit-icon');
const menuoption = document.querySelectorAll('.menu-option');


// Flag variable to track whether the theme dropdown menu is open or closed
let themeMenuOpen = false;

// Close the themes menu
function resetMenu() {
    themeMenuOpen = false;
    themeMenu.style.height = 0;
    dropDownIcon.style.rotate = 'initial'
}

// Event listener to toggle the visibility of the theme dropdown menu
// When clicked, it expands or collapses the menu and rotates the dropdown icon accordingly
switchThemeOption.addEventListener('click', () => {
    !themeMenuOpen ?
        (themeMenu.style.height = '300px', dropDownIcon.style.rotate = '180deg', themeMenuOpen = true) : resetMenu();
});


const darkModeStylesheet = document.querySelector('#darkmode-style');

// Initialize theme based on localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    darkModeStylesheet.disabled = false;
    // Update theme switcher UI radio buttons
    themeMenu.children[0].querySelector('input').checked = false;
    themeMenu.children[1].querySelector('input').checked = true;
} else {
    darkModeStylesheet.disabled = true;
    themeMenu.children[0].querySelector('input').checked = true;
    themeMenu.children[1].querySelector('input').checked = false;
}

// Lightmode option (switch app to light mode and close the themes menu)
themeMenu.children[0].addEventListener('click', () => {
    darkModeStylesheet.disabled = true;
    localStorage.setItem('theme', 'light');
    resetMenu();
});

// Darkmode option (switch app to dark mode and close the themes menu)
themeMenu.children[1].addEventListener('click', () => {
    darkModeStylesheet.disabled = false;
    localStorage.setItem('theme', 'dark');
    resetMenu();
});



// Event listener to toggle the sidebar menu width and icon rotation for desktop and laptop views
// Adjusts styles to collapse or expand the sidebar and hide/show menu content accordingly
let sideBarOpen = true;
collapseMenuIcon.addEventListener('click', function openMenu() {
    if (sideBarOpen) {
        sideBar.setAttribute('style', 'width: 80px');
        collapseMenuIcon.setAttribute('style', 'inset: 30px 0 0 50%;  translate: -50%; rotate: 360deg');
        dropDownIcon.setAttribute('style', 'display: none');
        menuImg.forEach(el => el.setAttribute('style', 'inset: -0 0 0 5px;'));
        themesIcon.style.insetInlineStart = '4px';
        menuOptionContent.forEach(el => el.style.display = 'none');
        sideBarOpen = false;
    } else {
        sideBar.setAttribute('style', 'width: 300px');
        collapseMenuIcon.setAttribute('style', 'inset: 30px 0 0 90%;  translate: -100%; rotate: -180deg');
        dropDownIcon.setAttribute('style', 'display: inline;');
        menuImg.forEach(el => el.setAttribute('style', 'inset: 0;'));
        themesIcon.style.insetInlineStart = '-4px';
        menuOptionContent.forEach(el => el.style.display = 'inline');
        sideBarOpen = true;
    }
});


// Control the opening/closing of the sidebar menu on mobile devices
const menuLayer = document.querySelector('#menu-layer');
if (window.innerWidth <= 768) {

    // Open the sidebar menu
    mobileMenu.addEventListener('click', () => {
        sideBar.setAttribute('style', 'width: 60vw;padding: 5rem 1rem 1rem .1rem;');
        menuLayer.style.display = 'block';
    });

    // Close the sidebar menu
    mobileExit.addEventListener('click', () => {
        sideBar.removeAttribute('style');
        menuLayer.style.display = 'none';
    });

    // Close the sidebar menu when a menu option is clicked
    menuoption.forEach(option => {
        option.addEventListener('click', e => {
            sideBar.removeAttribute('style');
            menuLayer.style.display = 'none';
        })
    });
}



/*========== APP LAYOUT SETTINGS ==========*/

const layoutIcon = document.querySelector('.setting-option:nth-of-type(2)');
const layoutOptions = document.querySelectorAll('.applayout-menu li');
const mainEle = document.querySelector('main');


// CHANGE APP TO FULL SCREEN MODE
const fullScreenIcon = document.querySelector('#fullscreen-icon');

// Flag variable to monitor fullscreen state
let fullScreen = false;

fullScreenIcon.addEventListener('click', () => {

    if (!fullScreen) {

        // Enable fullscreen mode
        document.documentElement.requestFullscreen();
        fullScreenIcon.children[0].src = 'icons/icons8-exit-full-screen-78.png';
        fullScreenIcon.children[1].textContent = 'Disable fullscreen';
        displayNotif('Fullscreen enabled', 2000);

        // Scroll to page top for consistent visibility
        window.scroll({ top: 0, behavior: 'smooth' });

        fullScreen = true;
    }
    else {
        // Disable fullscreen mode
        document.exitFullscreen();
        fullScreenIcon.children[0].src = 'icons/icons8-full-screen-96.png';
        fullScreenIcon.children[1].textContent = 'Fullscreen mode';
        displayNotif('Disabled', 2000);

        // Scroll to page top for consistent visibility
        window.scroll({ top: 0, behavior: 'smooth' });

        fullScreen = false;
    }
});


// CHANGE APP LAYOUT DIRECTION

// Show layout options menu on layout icon click
layoutIcon.addEventListener('click', e => {

    const arrow = e.target.children[1];
    const menu = e.target.nextElementSibling;

    // Open the app-layout menu and rotate the dropdown icon accordingly
    menu.setAttribute('style', 'height: 95px; box-shadow: 0 0 0 2px var(--faded-gray);display:block');
    arrow.style.rotate = '180deg';
});


// Hide layout options menu when a layout option is selected
layoutOptions.forEach(option => {
    option.addEventListener('click', e => {
        const arrow = e.target.closest('ul').previousElementSibling.children[1];
        const menu = e.target.closest('ul');

        menu.setAttribute('style', 'height: 0; box-shadow: none;display:none');
        arrow.style.rotate = 'initial';
    });
});


// Move sidebar to the left
layoutOptions[0].addEventListener('click', () => {

    mainEle.style.flexDirection = 'row';

    collapseMenuIcon.onclick = function () {
        openMenu();
    }
});


// Move sidebar to the right
layoutOptions[1].addEventListener('click', e => {
    mainEle.style.flexDirection = 'row-reverse';

    sideBarOpen ?
        collapseMenuIcon.setAttribute('style', 'inset: 30px 0 0 8px; translate: 50%; rotate: 360deg') :
        collapseMenuIcon.setAttribute('style', 'inset: 30px 0 0 50%;  translate: -50%; rotate: -180deg');

    collapseMenuIcon.onclick = e => {
        sideBarOpen ?
            e.target.setAttribute('style', 'inset: 30px 0 0 8px; translate: 50%; rotate: 360deg') :
            e.target.setAttribute('style', 'inset: 30px 0 0 50%;  translate: -50%; rotate: -180deg');
    };
});




/*========== HIDE AND DISPLAY USER INTERFACES ==========*/

const inbox = document.querySelector('#inbox-UI');
const sent = document.querySelector('#sent-mail-UI');
const drafts = document.querySelector('#drafts-UI');
const spam = document.querySelector('#spam-UI');
const settings = document.querySelector('#settings-UI');
const profileUi = document.querySelector('#account-mgt-UI');
const writeMailUi = document.querySelector('#write-mail-UI');
const viewMailUi = document.querySelector('#view-email-UI');
const searchInput = document.querySelector('#search-input');
const filtersWrapper = document.querySelector('#filter-options');
const searchUI = document.querySelector('#search-UI');
const filterOptions = document.querySelectorAll('.filter-option');
const exitViewUI = document.querySelector('#view-email-UI nav > img');
const composeMailIcon = document.querySelector('#compose-mail');
const mailCategories = document.querySelectorAll('.menu-option');
const settingsIcon = document.querySelector('#settings-icon');
const exitIcon = document.querySelector('#exit-icon');
const acountMGTIcon = document.querySelector('.setting-option:first-of-type');
const staffProfilePic = document.querySelector('#user-profile-image');


// Clear all search results in the search UI except ( the search ui description header )
function clearSearchUI() {
    while (searchUI.children.length > 1) {
        searchUI.removeChild(searchUI.lastChild);
    }
};


// Reset all email filters in the search UI when the user navigates to anoher user interface
const filterCheckboxes = filtersWrapper.querySelectorAll('input[type="checkbox"]');
function clearFilters() {
    filterCheckboxes.forEach(cb => {
        if (cb) {
            cb.checked = false;
            cb.parentElement.querySelector('.checkmark-emoji')?.remove();
        }
    });
};


// This function hides all user interfaces except the UI or UI's passed in as an argument
function hideAllExcept(...elements) {
    const all = [inbox, sent, drafts, spam, settings, profileUi, writeMailUi, viewMailUi, searchUI];
    all.forEach(ui => {
        ui.style.display = elements.includes(ui) ? 'block' : 'none';
    });
};


// This function displays any UI passed in as an argument and resets the search UI
function showandReset(ui) {

    filtersWrapper.removeAttribute('style');
    searchInput.value = '';

    hideAllExcept(ui);
    clearSearchUI();
    clearFilters();
};


// Event listeners to show and hide staff profile UI
acountMGTIcon.addEventListener('click', () => profileUi.style.display = 'block');
exitIcon.addEventListener('click', () => profileUi.style.display = 'none');


// Hides all other user interfaces when the search input is clicked
searchInput.addEventListener('click', e => {

    // Display the email filters and search UI
    filtersWrapper.setAttribute('style', 'height: 50px; border-bottom : 2px solid gray');
    hideAllExcept(searchUI);
});



/*--- Flag variable to track the page the user was interacting with before clicking an email
    * This allows the user to return to the previous UI seamlessly
  
   NOTE: The value of the 'previous' variable gets updated when the displayEmail function is called in the createNewMail function

---*/
let previous = inbox;

// Hides the viewMail UI when the the exitView icon is clicked
exitViewUI.addEventListener('click', e => hideAllExcept(previous));


// Display staff profile settings when the staff's profile picture is clicked
staffProfilePic.addEventListener('click', () => {
    showandReset(settings);
    profileUi.style.display = 'block';
});

// Display write new mail UI and hide other UIs
composeMailIcon.addEventListener('click', () => showandReset(writeMailUi));


// DOM reference to select the inbox, sent , draft , spam and settings menu option
const emailInterface = Array.from(mailCategories).slice(0, 5);

// Display the different email UI's onclick
emailInterface.forEach((option, index) => {

    const uiArray = [inbox, sent, drafts, spam, settings];
    option.addEventListener('click', () => showandReset(uiArray[index]));
});





/*========== STAFF PROFILE AND EMAIL STATUS MANAGEMENT ==========*/

const userEmail = document.querySelector('#user-email-address');
const staffEmailInput = document.querySelector('#user-email-edit');
const staffNameInput = document.querySelector('#lb-name + input');
const staffRoleInput = document.querySelector('#lb-role + input');
const staffDeptInput = document.querySelector('#lb-department + input');
const staffEmailStatus = document.querySelector('#lb-status + input');
const changeEmailDialog = document.querySelector('#email-change');
const editBtn = document.querySelector('#edit-staff-email');
const applyChangesBtn = document.querySelector('#email-change button:first-of-type');
const unsaveChanges = document.querySelector('#email-change button:last-of-type');

const notification = document.querySelector('#notifications span');
const settingLoader = document.querySelector('#settings-loader');

const statusMenu = document.querySelector('.profile-menu');
const statusMenuOption = document.querySelectorAll('.profile-menu li:not(.profile-menu li:first-child,.profile-menu li:last-of-type)');
const statusIcon = document.querySelector('.status-icon');
const mobileStatusIcon = document.querySelector('#mobile-status-icon');

const customStatusMenu = document.querySelector('#custom-status-menu');
const customStatusIcon = document.querySelector('#custom-icon');
const customPresets = document.querySelectorAll('#custom-presets li');
const cancelBtn = document.querySelector('.btn-wrapper button:first-child');
const saveBtn = document.querySelector('.btn-wrapper button:last-child');
const statusInput = document.querySelector('#write-status');


// Display notification messages in the notification area
function displayNotif(msg, delay) {

    notification.textContent = msg;
    notification.closest('section').setAttribute('style', 'display: flex');
    setTimeout(() => {
        notification.closest('section').removeAttribute('style');
    }, delay);
}


// Display the email status menu and hide the loading animation
function displayStatusMenu() {
    statusMenu.setAttribute('style', 'scale: 1;box-shadow: 0 0 0 2px gray');
    settingLoader.style.scale = 0;
}


// Show email status menu on (mobile devices)
mobileStatusIcon.addEventListener('click', e => {
    e.preventDefault();

    // Toggle status menu visibility
    if (statusMenu.style.scale === '1') {
        statusMenu.removeAttribute('style');
    } else {
        statusMenu.setAttribute('style', 'scale: 1;box-shadow: 0 0 0 2px gray');
    }

    // Scroll to page top for consistent menu visibility
    window.scroll({ top: 0, behavior: 'smooth' });
});


// Show the email status menu on status-icon click on (tablet and pc)
statusIcon.addEventListener('click', e => {

    // Reset the dropdown menu arrow
    const arrow = statusIcon.children[1];
    arrow.style.rotate = '180deg';

    settingLoader.style.scale = 1;
    setTimeout(displayStatusMenu, 1000);
});


// Close the email status-menu when clicking outside the status icon, mobile status icon, and status menu
document.addEventListener('click', e => {

    const target = e.target;

    if (!statusIcon.contains(target) && !mobileStatusIcon.contains(target) && !statusMenu.contains(target)) {
        statusMenu.removeAttribute('style');

        // Reset the dropdown menu arrow
        const arrow = statusIcon.children[1];
        arrow.style.rotate = 'initial';
    }
});


// Update email status using preset values (Active , Away)
statusMenuOption.forEach(option => {
    option.onclick = e => {

        // Reset the dropdown menu arrow
        const arrow = statusIcon.children[1];
        arrow.style.rotate = 'initial';

        // Display the newly updated email status
        statusIcon.children[0].textContent = option.textContent;

        // Close the email status menu and update the status value in the staff profile
        statusMenu.removeAttribute('style');
        staffEmailStatus.value = option.textContent;
        displayNotif('Status updated successfully', 2000);
    };
});


// CUSTOM EMAIL STATUS MAMNAGEMENT

// Open custom email status dialog
customStatusIcon.addEventListener('click', () => {
    customStatusMenu.showModal();
    statusInput.focus();
});


// Cancel custom email status input and reset styles
cancelBtn.addEventListener('click', () => {

    // Reset the dropdown menu arrow
    const arrow = statusIcon.children[1];
    arrow.style.rotate = 'initial';

    customStatusMenu.close();

    // Reset the input values
    statusInput.value = '';
    statusInput.placeholder = 'Write custom status';
    statusInput.style.borderBottom = '2px solid var(--global-deep-purple)';
});


// Apply custom email status presets on-click
customPresets.forEach(preset => {
    preset.addEventListener('click', () => {
        statusInput.value = preset.textContent;
    });
});


// Save custom email status ( validation and visual feedback included ) 
saveBtn.addEventListener('click', () => {

    if (statusInput.value === '') {
        // Prevent the user from saving an empty email status
        statusInput.placeholder = 'Must choose or write a status!';
        statusInput.style.borderBottom = '2px solid red';
        displayNotif('Provide a valid email status', 2000);
        return false;
    }

    // Close the custom status menu and update the email status value in the staff profile UI
    customStatusMenu.close();
    statusMenu.removeAttribute('style');
    statusIcon.children[0].textContent = statusInput.value;
    staffEmailStatus.value = statusInput.value;
    statusInput.placeholder = 'Write custom status';
    statusInput.style.borderBottom = '2px solid var(--global-deep-purple)';
    statusIcon.children[1].style.rotate = 'initial';
    statusInput.value = '';
    displayNotif('Custom status updated', 3000);
    return true;
});


// STAFF PROFILE MANAGEMENT

// Open change email modal on edit button click
editBtn.addEventListener('click', () => {
    changeEmailDialog.showModal();
    changeEmailDialog.children[0].focus();

    // Scroll to page top for consistent menu visibility
    window.scroll({ top: 0, behavior: 'smooth' });
});


// Regex pattern to validate email input for new email address
const invalidEmailPattern = /(@|@team|@team\.com|\.com)/gi;


// Apply changes to staff email ( validation and visual feedback included )
applyChangesBtn.addEventListener('click', () => {

    // Error handling when an invalid email pattern is inputed by the user
    if (changeEmailDialog.children[0].value === '' || changeEmailDialog.children[0].value.match(invalidEmailPattern)) {
        changeEmailDialog.children[0].placeholder = 'Please input a valid name';
        changeEmailDialog.children[0].style.borderBottom = '2.5px solid red';
        displayNotif('Please input a valid email', 2000);
        return false;
    }

    // Apply the new email address
    staffEmailInput.value = changeEmailDialog.children[0].value.trim().concat('@team.com');
    userEmail.textContent = staffEmailInput.value;

    // Reset the email modal input styles
    changeEmailDialog.children[0].value = '';
    changeEmailDialog.children[0].placeholder = 'Write new email...';
    changeEmailDialog.children[0].style.borderBottom = '2.5px solid var(--global-deep-purple)';
    changeEmailDialog.close();
    displayNotif('Email updated successfully', 5000);
    return true;
});


// Cancel email change process and reset input styles
unsaveChanges.addEventListener('click', () => {
    changeEmailDialog.close();
    changeEmailDialog.children[0].value = '';
    changeEmailDialog.children[0].placeholder = 'Write new email...';
    changeEmailDialog.children[0].style.borderBottom = '2.5px solid var(--global-deep-purple)';
});




/*========== WRITE NEW EMAIL SECTION ==========*/

const senderMenu = document.querySelector('.from-and-to:nth-of-type(4) > img');
const emailContent = document.querySelector('#email-content');
const emailSubject = document.querySelector('#email-subject');
const recieversMail = document.querySelector('#recievers-email');
const sendMsgIcon = document.querySelector('#send-icon');
const discardMsgIcon = document.querySelector('#discard-icon');
const sendMsgLoader = document.querySelector('#new-mail-loader');
const mailTemplate = document.querySelectorAll('.template-emails');
const dummyMailCont = document.querySelector('.template-mail-content');
const deleteMail = document.querySelectorAll('.delete-mail');
const spamIcon = document.querySelectorAll('.mrk-as-spam');
const saveAsDraft = document.querySelector('#save-as-draft');
const ccToggle = document.querySelector('.from-and-to:nth-of-type(2) img');
const ccMenu = document.querySelector('#cc-wrapper');
const ccField = document.querySelector('#cc-input span');
const bccField = document.querySelector('#bcc-input span');


// Flag variable to track CC and BCC fields visibility
ccMenuOpen = false;

// Event listener to toggle visibility of CC and BCC fields in compose mail UI
ccToggle.addEventListener('click', () => {
    if (!ccMenuOpen) {
        ccMenu.setAttribute('style', 'height: auto');
        ccToggle.style.rotate = '180deg';
        ccMenuOpen = true;
    } else {
        ccMenu.removeAttribute('style');
        ccToggle.style.rotate = 'initial';
        ccMenuOpen = false;
    }
});


/*THE CREATE NEW MAIL FUNCTION CREATES A NEW EMAIL AND APPENDS IT TO ANY UI YOU SPECIFY

 ACCEPTED ARGUMENTS:

* The main content of the email
* The date the email was sent
* The UI that the email should be appended to
* Senders email address
* Email status checks if the email is an inbox , spam , sent or draft email
* Email subject
* Email is read or not
* Profile picture of the sender (default alphabet is shown if sendersPicUrl returns false);*/

function createNewMail(mailContent, dateSent, appendAt, senderMail, mailStatus, mailSUbject, isRead, cc, bcc, sendersPicUrl) {

    const newMailWrapper = document.createElement('aside');
    const pic = document.createElement('span');
    const sender = document.createElement('span');
    const content = document.createElement('span');
    const deleteMail = document.createElement('img');
    const markSpam = document.createElement('img');
    const date = document.createElement('span');
    const emailStatus = document.createElement('span');
    const subject = document.createElement('span');
    const mailIsRead = document.createElement('span');
    const ccField = document.createElement('span');
    const bccField = document.createElement('span');


    newMailWrapper.setAttribute('class', 'template-emails');
    pic.setAttribute('class', 'template-sender-pic');
    sender.setAttribute('class', 'template-sender-email');
    content.setAttribute('class', 'template-mail-content');
    deleteMail.setAttribute('class', 'delete-mail');
    markSpam.setAttribute('class', 'mrk-as-spam');
    date.setAttribute('class', 'date-sent');
    subject.setAttribute('class', 'email-subject');
    mailIsRead.setAttribute('class', 'email-isRead');
    emailStatus.setAttribute('class', 'email-status');
    ccField.setAttribute('class', 'cc-input-field');
    bccField.setAttribute('class', 'bcc-input-field');


    emailStatus.textContent = mailStatus;
    subject.textContent = mailSUbject;
    mailIsRead.textContent = isRead;
    ccField.textContent = cc;
    bccField.textContent = bcc;

    const mailString = senderMail;

    markSpam.src = 'icons/dsdddsfdfsd.png';
    markSpam.addEventListener('click', e => {
        const mailElement = e.target.closest('aside');
        mailElement.style.boxShadow = '0 0 0 2px red';

        // REMOVE THE YELLOW HIGHLIGHT FROM AN EMAIL WHEN IT IS MARKED AS SPAM

        // The yellow highlight is a side effect of highlighting text that match the search value in the search UI
        const contentElem = mailElement.querySelector('.template-mail-content');
        const senderElem = mailElement.querySelector('.template-sender-email');
        if (contentElem) { contentElem.innerHTML = contentElem.textContent || contentElem.innerText || ''; }
        if (senderElem) { senderElem.innerHTML = senderElem.textContent || senderElem.innerText || ''; }

        spam.insertAdjacentElement('afterbegin', mailElement);
        displayNotif('Mail marked as spam', 3000);
    });

    content.innerHTML = mailContent;
    sender.innerHTML = mailString;
    date.textContent = dateSent;

    // REMOVE HTML TAGS FROM 'senderMail' TO OBTAIN THE FIRST LETTER AS A DEFAULT PROFILE PICTURE
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = senderMail;
    const plainSenderMail = tempDiv.textContent || tempDiv.innerText || '';

    // DEFAULT ALPHABET IS SHOWN IF YOU DON'T SPECIFY THE URL PATH TO AN IMAGE
    sendersPicUrl ? pic.style.background = `url(${sendersPicUrl});` : pic.textContent = plainSenderMail.charAt(0).toUpperCase();

    // SETS THE ICON FOR DELETING EMAILS
    deleteMail.src = 'icons/icons8-delete-64.png';
    deleteMail.addEventListener('click', e => {
        e.target.closest('aside').remove();
        displayNotif('Deleted', 3000);
    });

    newMailWrapper.append(emailStatus, subject, mailIsRead, ccField, bccField, pic, sender, content, deleteMail, markSpam, date);

    // ALLOW THE USER TO VIEW THE FULL CONTENT OF A CLICKED EMAIL
    newMailWrapper.addEventListener('click', (e) => {

        if (e.target.className === 'mrk-as-spam' || e.target.className === 'delete-mail') {
            return false;
        } else {

            // Display full content of clicked email
            displayEmail(mailSUbject, plainSenderMail.charAt(0).toUpperCase(), mailStatus, mailContent, dateSent, plainSenderMail, appendAt);
        }
    });


    // APPEND THE NEW EMAIL TO THE SPECIFIED USER INTERFACE
    appendAt.insertBefore(newMailWrapper, appendAt.children[1]);
};


// The display email function allows the user to view the full content of an email
const viewSubject = document.querySelector('#view-subject');
const replyEmail = document.querySelector('#view-email-UI nav span:last-child');
const viewPic = document.querySelector('#email-details span:first-child');
const viewLabel = document.querySelector('#email-details span:nth-child(2) b:first-child str');
const viewEmail = document.querySelector('#email-details span:nth-child(2) b:last-child');
const viewDate = document.querySelector('#email-details span:last-child');
const viewContent = document.querySelector('#view-content');

function displayEmail(subject, pic, label, content, date, sender, previousPage) {

    // Enable the user to return to the previous page when the exitViewUI icon is clicked
    previous = previousPage;

    // Display the view-email user interface
    hideAllExcept(viewMailUi);

    // Display 'No sunject' message if the user drafts or sends an email without an email-subject
    subject === '' ? viewSubject.textContent = 'No subject' : viewSubject.textContent = subject;

    viewPic.textContent = pic;
    viewLabel.textContent = label;
    viewContent.innerHTML = content;
    viewDate.textContent = date;
    viewEmail.textContent = sender;

    // Enable the user to reply emails
    replyEmail.addEventListener('click', () => {
        hideAllExcept(writeMailUi);
        
        // Add the subject and recievers email-address to the write-mail-UI
        viewSubject.textContent.startsWith('Re') ? emailSubject.value = subject : emailSubject.value = `Re: ${subject}`;
        recieversMail.textContent = viewEmail.textContent;

        // Reset email content
        editor1.setHTMLCode('');
    });

    // Scroll to page top for consistent visibility
    window.scroll({ top: 0, behavior: 'smooth' });
};


// Generate real time dates
function getRealDate() {
    return new Date().toISOString().split('T')[0];
}


// Reset all email fields in the write new mail UI ( except senders and recievers email address for demo purposes )
function clearAllFields() {

    editor1.setHTMLCode('');
    emailSubject.value = '';
    ccField.textContent = '';
    bccField.textContent = '';
};


// Display loading animation when an email is being sent
function showSendingLoader() {
    sendMsgLoader.style.scale = 1;
    sendMsgLoader.children[1].textContent = 'Sending mail...';
    setTimeout(() => {
        sendMsgLoader.children[1].textContent = 'Sent...redirecting to sent-inbox';
    }, 1000);

    setTimeout(() => {
        sendMsgLoader.style.scale = 0;
        showandReset(sent);
    }, 3000);
}

// Strip HTML tags from any string
function removeHTMLtags(string) { return string.replace(/<[^>]*>/g, '') };


// Event listener to send an email
sendMsgIcon.addEventListener('click', e => {
    if (emailContent.value === '' || recieversMail.textContent === '') {

        // Prevent the email from being sent if there is no content or recievers email
        e.preventDefault();
        displayNotif('System won\'t send empty emails', 2000);

    } else {

        // Append the sent email to the sent UI
        createNewMail(editor1.getHTMLCode().trim(), getRealDate(), sent, recieversMail.textContent, 'Sent', removeHTMLtags(emailSubject.value), true,
            ccField.textContent, bccField.textContent);

        showSendingLoader();
        displayNotif('Sending mail', 3000);

        // Reset all email fields after sending email
        clearAllFields();

    }
});


// Discard email
discardMsgIcon.addEventListener('click', () => {
    showandReset(inbox);
    // Reset all email fields
    clearAllFields();
});


// Event listener to save email as draft
saveAsDraft.addEventListener('click', () => {
    showandReset(drafts);

    // Append the drafted email to the drafts UI
    createNewMail(editor1.getHTMLCode().trim(), getRealDate(), drafts, recieversMail.textContent, 'Drafts', removeHTMLtags(emailSubject.value), true,
        ccField.textContent, bccField.textContent);

    displayNotif('Mail saved as draft', 3000);

    // Reset all email fields
    clearAllFields();
});


// Event listeners to mark emails as spam
spamIcon.forEach(icon => {
    icon.addEventListener('click', e => {
        spam.insertAdjacentElement('afterbegin', e.target.closest('aside'));
        displayNotif('Mail marked as spam', 2000);
    });
});


// Event listeners to permanently delete emails
deleteMail.forEach(icon => {
    icon.addEventListener('click', e => {
        e.target.closest('aside').remove();
        displayNotif('Deleted', 2000);
    });
});



// Display the total number of emails in each email category
function displayMailCount() {
    const emptyText = document.querySelectorAll('.empty-text');
    const inboxCounter = document.querySelector('.menu-option:nth-of-type(1) b:nth-child(3)');
    inboxCounter.textContent = inbox.children.length - 2;

    const sentCounter = document.querySelector('.menu-option:nth-of-type(2)  b:nth-child(3)');
    sentCounter.textContent = sent.children.length - 2;

    const draftsCounter = document.querySelector('.menu-option:nth-of-type(3) b:nth-child(3)');
    draftsCounter.textContent = drafts.children.length - 2;

    const spamCounter = document.querySelector('.menu-option:nth-of-type(4)  b:nth-child(3)');
    spamCounter.textContent = spam.children.length - 2;

    // DISPLAY -EMPTY- MESSAGE IF AN EMAIL UI IS EMPTY
    emptyText.forEach(text => {
        if (text.closest('section').children.length < 3) {
            text.style.display = 'block';
        } else {
            text.style.display = 'none';
        }
    });
}

// Update mail counts every 100 milliseconds
setInterval(displayMailCount, 100);



/*========== AUTO POPULATE USER INTERFACES WITH EMAILS ==========*/

// Automatically append emails to their respective email UI after the app launches
getEmails();

// Fetch emails from emails.JSON and populate UI
async function getEmails() {
    
    try {
        const res = await fetch('emails.json');
        const data = await res.json();
        for (let i = 0; i < data.emails.length; i++) {

            // Append emails to their UIs based on the value of their status property
            if (data.emails[i].status === 'Inbox') {
                createNewMail(data.emails[i].content, data.emails[i].timestamp, inbox, data.emails[i].from, data.emails[i].status, data.emails[i].subject, data.emails[i].isRead);
            } else if (data.emails[i].status === 'Spam') {
                createNewMail(data.emails[i].content, data.emails[i].timestamp, spam, data.emails[i].from, data.emails[i].status, data.emails[i].subject, data.emails[i].isRead);
            } else if (data.emails[i].status === 'Sent') {
                createNewMail(data.emails[i].content, data.emails[i].timestamp, sent, data.emails[i].from, data.emails[i].status, data.emails[i].subject, data.emails[i].isRead);
            } else if (data.emails[i].status === 'Draft') {
                createNewMail(data.emails[i].content, data.emails[i].timestamp, drafts, data.emails[i].from, data.emails[i].status, data.emails[i].subject, data.emails[i].isRead);
            }
        };
    } catch (error) {
        console.error(`ERROR MSG: ${error}`);
    };
};



/*========== LOG OUT SECTION ==========*/
const logOutOption = document.querySelector('#log-out');
const logOutModal = document.querySelector('#log-out-modal');
const logOutBtn = document.querySelector('#log-out-modal button:first-of-type');
const cancelLogOut = document.querySelector('#log-out-modal button:last-of-type');

logOutOption.addEventListener('click', () => {
    logOutModal.showModal();

    // Scroll to page top for consistent menu visibility
    window.scroll({ top: 0, behavior: 'smooth' });
});

// Log-out of the app when the log-out btn is clicked
logOutBtn.addEventListener('click', () => {
    location.assign('index.html');
});

// Cancel the logout process on cancel button click
cancelLogOut.addEventListener('click', () => {
    logOutModal.close();
});





