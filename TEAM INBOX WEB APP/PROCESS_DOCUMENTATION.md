# Team Inbox Web App - Process Documentation

## Introduction and Project Overview

The Team Inbox Web App is a modern, web-based email management application designed to streamline team communication and collaboration. It provides a centralized inbox where team members can view, manage, and respond to emails efficiently. The app features a rich text editor for composing emails, advanced search and filtering capabilities, and supports dark mode for comfortable usage in low-light environments.

Built using standard web technologies including HTML, CSS, and JavaScript, Team Inbox offers a responsive and intuitive user interface that enhances productivity and simplifies email handling for teams of any size. The app uses a local JSON file as a mock data source for emails, enabling easy testing and development without backend dependencies.

This documentation provides a comprehensive overview of the development process, architecture, features, challenges, and future plans for the Team Inbox Web App.


## Development Process

### Initial Setup and Project Structure

The development of Team Inbox began with setting up a clean and modular project structure using HTML, CSS, and JavaScript files. The main files and directories include:

- `index.html`: The login page for user authentication.
- `app.html`: The main application interface where users manage emails.
- `app.js`: Contains the core JavaScript logic for UI interactions, email management, and application features.
- Multiple CSS files (`appstyle.css`, `darkmode.css`, `loginpage-styles.css`, etc.) to style the app and support dark mode.
- `emails.json`: A local JSON file used as a mock data source for emails.
- `richtexteditor/`: An integrated external rich text editor library folder to provide rich text composing capabilities.
- `icons/`: Folder containing icons used throughout the app, sourced from Icons8.

The development workflow followed an iterative approach with frequent testing and UI refinements to ensure responsiveness and usability across devices.


### Tools and Technologies Used

- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: Rich Text Editor (open-source), Icons8 icons, Google Fonts
- **Development Environment**: Visual Studio Code, modern web browsers (Chrome and Firefox)

---

## UI Features and Functionality

The app implements a variety of user interface features to enhance usability and user experience:

- **Sidebar Menu**: A collapsible sidebar menu for navigation between inbox, sent, drafts, spam, settings, and profile management. The menu supports smooth animations and state persistence.
- **Theme Switching**: Support for light and dark modes with a toggle switch, persisting user preference using `localStorage`. The dark mode styles are applied consistently across all pages.
- **Email Management**: Users can view emails categorized by status (Inbox, Sent, Drafts, Spam), compose new emails using a rich text editor, save drafts, mark emails as spam, and delete emails. Email counts update dynamically.
- **Search and Filter**: Advanced search and filtering capabilities allow users to quickly find emails by sender, subject, or content keywords. The search is case-insensitive and updates results in real-time.
- **Responsive Design**: The app layout adapts to different screen sizes, including mobile devices, with appropriate UI adjustments using CSS media queries.
- **Profile and Status Management**: Users can manage their profile information and set custom email statuses, which are reflected in the UI.

---

## Data Handling and State Management

Emails are fetched from the local `emails.json` file and dynamically rendered into the UI. The app uses JavaScript functions to:

- Create and insert email elements into the DOM.
- Display full email content on selection.
- Update email counts and statuses in real-time.
- Handle email actions such as sending, saving drafts, marking spam, and deleting.

Since the app uses a static JSON file as a mock data source without backend integration, all changes are stored in memory and lost on page reload. This limitation is documented for users, and future plans include integrating persistent storage or backend services.

---

## Integration of External Libraries

- **Rich Text Editor**: The app integrates the open-source [Rich Text Editor](https://www.richtexteditor.com/) library, providing advanced email composing features with formatting options, toolbar plugins, and multi-language support. The editor is customized to fit the app's UI and functionality requirements.
- **Icons8**: Icons used throughout the app are sourced from [Icons8](https://icons8.com/), offering a wide range of high-quality icons for UI elements such as buttons, menus, and notifications.
- **Google Fonts**: The app uses Google Fonts for consistent and attractive typography, including fonts like Cascadia Mono, Onest, and Roboto.

---

## Challenges and Issues Faced During Development

### 1. Icon Display Issues
- **Description**: Some icons failed to render correctly on certain browsers, especially older versions or less common browsers.
- **Cause**: This was primarily due to browser caching issues and incompatibility with certain icon formats.
- **Solution**: Clearing the browser cache and using latest versions of popular browsers like Chrome ensured better compatibility and resolved the problem.

### 2. Inconsistent Dark Mode Styling
- **Description**: Dark mode styles were inconsistently applied across different pages, leading to some UI elements appearing in light mode even when dark mode was enabled.
- **Cause**: This was due to improperly linked dark mode CSS files on certain pages.
- **Solution**: Ensured that the dark mode CSS files (`darkmode.css` and `loginpage-darkmode.css`) were properly linked and loaded on all relevant pages.

### 3. Email Data Synchronization Issues
- **Description**: Changes made to emails (such as marking as spam or deleting) were not always immediately reflected in the UI
- **Cause**: Since the app uses a local JSON file as a mock data source without backend integration, changes were only stored in memory and lost on page reload.
- **Workaround**: Users were informed through the readme that the app is a demo and changes are temporary.
- **Future Improvements**: Integrating a backend or local storage mechanism to persist changes would enhance functionality.

### 4. Emails JSON Loading Issue
- **Description**: Email user interfaces could not be autopopulated from the `emails.json` file in Google Chrome.
- **Cause**: Google Chrome's CORS policy restricts loading local JSON files via file:// protocol, blocking the request.
- **Fix**: Run the app using a local web server (e.g., using `Live Server` extension or `python -m http.server`) to avoid CORS restrictions, or configure the browser to disable CORS for development purposes.

---


## JavaScript I am Proud Of

One of the key functions that powers the entire Team Inbox Web App is the `createNewMail` function. This function is responsible for creating and appending new email elements to the user interface dynamically.

### How `createNewMail` Works

The `createNewMail` function accepts several parameters including the email content, date sent, the UI element to append the email to (such as inbox, sent, drafts, or spam), sender's email address, email status, subject, read status, CC, BCC, and optionally the sender's profile picture URL.

Inside the function, it creates various DOM elements to represent different parts of an email item, such as the sender's picture or initial, sender's email, email content preview, subject, date sent, and action icons for deleting or marking emails as spam.

Event listeners are attached to these elements to handle user interactions like deleting an email or marking it as spam. Clicking on the email (except on the delete or spam icons) triggers the display of the full email content in a dedicated view.

The function then appends the newly created email element to the specified UI container, allowing the app to dynamically update the email lists without reloading the page.

### Role in the App

This function is central to the app's dynamic behavior, enabling the rendering of emails fetched from the local JSON file as well as newly composed, sent, drafted, or spam-marked emails. It abstracts the complexity of DOM manipulation and event handling into a reusable component, making the app modular and maintainable.

By using `createNewMail`, the app ensures consistent email item creation and interaction handling across different email categories, powering the core user experience of managing emails efficiently.

---

## Testing Strategy

Testing was carried out manually due to the client-side nature of the app:

- **Functional Testing**: Verified UI interactions such as email composing, sending, deleting, marking spam, and theme switching.
- **Cross-Browser Testing**: Ensured compatibility across major browsers (Chrome, Firefox, Edge).
- **Responsive Testing**: Tested UI responsiveness on various screen sizes including desktops, tablets, and mobile devices.

---

## Coding Standards and Best Practices

- Followed consistent code formatting and naming conventions for readability.
- Modularized JavaScript code into functions for maintainability.
- Used semantic HTML5 elements for accessibility.
- Applied CSS best practices including BEM naming conventions and responsive design principles.
- Documented code with comments for clarity.

---

## Future Enhancements and Roadmap

- **Backend Integration**: Connect the app to a backend service or database to persist email data and user settings.
- **User Authentication**: Implement secure login and user management.
- **Accessibility Improvements**: Enhance support for keyboard only navigation.
- **Additional Features**: Additional email categories and profile picture editing

---

## Steps Taken to Build and Run the App Locally

1. **Clone or Download the Repository**: Obtain the project files on your local machine.

2. **Open the Project Folder**: Use a code editor such as Visual Studio Code to open the project directory.

3. **Launch the Application**: Open `index.html` or `app.html` in a modern web browser to start the app. No server setup is required as this is a client-side application.

4. **Modify and Extend**: To customize or extend the app, edit JavaScript files (`app.js`, `login.js`, `searchFilter.js`), CSS files (`appstyle.css`, `darkmode.css`, `loginpage-styles.css`), or HTML files as needed.

5. **Test Email Data**: The app uses `emails.json` as a mock data source. Modify this file to test different email scenarios.

6. **Troubleshooting**: Clear browser cache if icons or styles do not load correctly. Use developer tools to debug JavaScript errors.

---

## Acknowledgements

- The open-source Rich Text Editor library for providing powerful email composing capabilities.
- Icons8 for supplying high-quality icons used throughout the app.
- Google Fonts for beautiful and consistent typography.

---

Thank you for using the Team Inbox Web App. For any questions or support, please contact me.

Email: iyanu423@gmail.com
