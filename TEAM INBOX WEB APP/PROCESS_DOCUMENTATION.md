# Team Inbox Web App - Process Documentation

## Introduction and Project Overview

The Team Inbox Web App is a modern, web-based email management application designed to streamline team communication and collaboration. It provides a centralized inbox where team members can view, manage, and respond to emails efficiently. The app features a rich text editor for composing emails, advanced search and filtering capabilities, and supports dark mode for comfortable usage in low-light environments.

Built using standard web technologies including HTML, CSS, and JavaScript, Team Inbox offers a responsive and intuitive user interface that enhances productivity and simplifies email handling for teams of any size. The app uses a local JSON file as a mock data source for emails, enabling easy testing and development without backend dependencies.

---

## Development Process

### Initial Setup and Project Structure

The development of Team Inbox began with setting up a clean project structure using HTML, CSS, and JavaScript files. The main files include:

- `index.html`: The login page for user authentication.
- `app.html`: The main application interface where users manage emails.
- `app.js`: Contains the core JavaScript logic for UI interactions, email management, and application features.
- Multiple CSS files (`appstyle.css`, `darkmode.css`, `loginpage-styles.css`, etc.) to style the app and support dark mode.
- `emails.json`: A local JSON file used as a mock data source for emails.
- `richtexteditor/`: An integrated external rich text editor library folder to provide rich text composing capabilities.
- `icons/`: Folder containing icons used throughout the app, sourced from Icons8.


### UI Features and Functionality

The app implements a variety of user interface features to enhance usability:

- **Sidebar Menu**: A collapsible sidebar menu for navigation between inbox, sent, drafts, spam, settings, and profile management.
- **Theme Switching**: Support for light and dark modes with a toggle switch, persisting user preference using localStorage.
- **Email Management**: Users can view emails categorized by status (Inbox, Sent, Drafts, Spam), compose new emails using a rich text editor, save drafts, mark emails as spam, and delete emails.
- **Search and Filter**: Advanced search and filtering capabilities to quickly find emails.
- **Responsive Design**: The app layout adapts to different screen sizes, including mobile devices, with appropriate UI adjustments.
- **Profile and Status Management**: Users can manage their profile information and set custom email statuses.

### Data Handling

Emails are fetched from the local `emails.json` file and dynamically rendered into the UI. The app uses JavaScript functions to create email elements, display full email content, and update email counts in real-time. Email sending, saving drafts, and marking spam are handled entirely on the client side for demonstration purposes.

### Integration of External Libraries

A key feature of the app is the integration of a rich text editor library located in the `richtexteditor/` folder. This library provides a comprehensive toolbar and editing capabilities for composing formatted emails. The app also uses icons from Icons8 and Google Fonts for consistent typography and visual appeal.

---

## Challenges and Issues Faced During Development

### 1. Icon Display Issues
- **Description**: Some icons failed to render correctly or appeared distorted on certain browsers, especially older versions or less common browsers.
- **Cause**: This was primarily due to browser caching issues or incompatibility with certain icon formats.
- **Solution**: Clearing the browser cache and using latest versions of popular browsers like Chrome or Firefox ensured better compatibility and resolved the problem.

### 2. Inconsistent Dark Mode Styling
- **Description**: Dark mode styles were inconsistently applied across different pages, leading to some UI elements appearing in light mode even when dark mode was enabled.
- **Cause**: This was due to missing or improperly linked dark mode CSS files on certain pages.
- **Solution**: Ensured that the dark mode CSS files (`darkmode.css` and `loginpage-darkmode.css`) were properly linked and loaded on all relevant pages.

### 3. Email Data Synchronization Issues
- **Description**: Changes made to emails (such as marking as spam or deleting) were not always immediately reflected in the UI or persisted across sessions.
- **Cause**: Since the app uses a local JSON file as a mock data source without backend integration, changes were only stored in memory and lost on page reload.
- **Workaround**: Users were informed through the readme that the app is a demo and changes are temporary.
- **Future Improvements**: Integrating a backend or local storage mechanism to persist changes would enhance functionality.

---

## External Libraries Used

- **Rich Text Editor**: The app integrates the open-source [Rich Text Editor](https://www.richtexteditor.com/) library, providing advanced email composing features with formatting options, toolbar plugins, and multi-language support.

- **Icons8**: Icons used throughout the app are sourced from [Icons8](https://icons8.com/), offering a wide range of high-quality icons for UI elements such as buttons, menus, and notifications.

- **Google Fonts**: The app uses Google Fonts for consistent and attractive typography, including fonts like Cascadia Mono, Onest, and Roboto.

---

## Steps Taken to Build and Run the App Locally

1. **Clone or Download the Repository**: Obtain the project files on your local machine.

2. **Open the Project Folder**: Use a code editor such as Visual Studio Code to open the project directory.

3. **Launch the Application**: Open `index.html` or `app.html` in a modern web browser to start the app. No server setup is required as this is a client-side application.

4. **Modify and Extend**: To customize or extend the app, edit JavaScript files (`app.js`, `login.js`, `searchFilter.js`), CSS files (`appstyle.css`, `darkmode.css`, `loginpage-styles.css`), or HTML files as needed.

5. **Test Email Data**: The app uses `emails.json` as a mock data source. Modify this file to test different email scenarios.

---

## Acknowledgements

- The open-source Rich Text Editor library for providing powerful email composing capabilities.
- Icons8 for supplying high-quality icons used throughout the app.
- Google Fonts for beautiful and consistent typography.

---

Thank you for using the Team Inbox Web App. For any questions or support, please contact me.

Email: iyanu423@gmail.com
