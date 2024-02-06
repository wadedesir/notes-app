# 📝 Notes App Frontend Overview

## 👋 Introduction
Welcome to the [**Notes App**](http://18.116.34.64:8420/) Frontend. Powered by React, Vite.js, and Tailwind CSS, the frontend provides a user-friendly interface for managing notes & interacting with the Notes API. The components are designed for simplicity and ease of use, offering features such as adding, editing, and deleting notes, as well as user authentication with login and signup forms.

## 🚀 Getting Started 
1. Clone the repository: `git clone https://github.com/wadedesir/notes-app.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Run the frontend: `npm run dev`
5. Open your browser and visit http://localhost:5173 to access the application.

## 🗂️ Frontend File Structure
```
├── components          
│   ├── AddNote.js
│   ├── LoginForm.js
│   ├── Note.js
│   ├── SignUpForm.js
├── pages               
│   ├── Home.js
│   ├── Login.js
│   ├── SignUp.js
├── App.js
├── index.css
├── main.jsx
```

## 🗃️ Components
#### 1. AddNote
The AddNote component provides a form for users to add new notes to the application. It includes an input field for the note content and a button to submit the note.

#### 2. LoginForm
The LoginForm component handles user authentication with a username and password. It includes input fields for the username and password, as well as a button to authenticate the user.

#### 3. Note
The Note component represents a single note in the application. It includes features such as editing, deleting, and marking a note as important. The component displays the note content and creation date, and allows users to interact with the notes.

#### 4. SignUpForm
The SignUpForm component handles user registration with a username and password. It includes input fields for the username, password, and confirmation password. Password matching is validated, and an error message is displayed if they do not match.

## 📑 Pages
#### 1. Home
The Home page is the main interface for managing notes. It displays existing notes, allows users to add new notes, and provides options for editing and deleting notes.

#### 2. Login
The Login page includes a login form for users to authenticate. It also provides a link to the signup page for new users.

#### 3. SignUp
The SignUp page includes a signup form for users to create a new account. It also provides a link to the login page for existing users.

## 💻 App
The App component sets up the routing for the application using react-router-dom. It includes routes for the home page, login, and signup pages.

<br>
<br>
<hr style="border: 5px solid black">
<br>
<br>

# 🧪 Testing & Linting
Whenever a new PR is made, tests located in `/frontend/__tests__` are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo).

## 💅 Code Style & Linting Details
The frontend codebase uses eslint to enforce good code style & perform static code analysis. The code style in use is the 'standard' preset with no extra rules.

To run linting tests locally:
1. Navigate to the frontend directory: `cd frontend`
2. Run linting: `npm run lint`

Note: You can run `npx eslint --fix .` while in the frontend directory to automatically fix any linting problems.

## 🔬 Unit and Integration Test Overview
Unit and integration tests for the Notes App are conducted using Jest and React Testing Library. Jest, a JavaScript testing framework by Facebook, is renowned for simplicity and speed. React Testing Library focuses on testing React components in a user-centric manner.

## 🚀 Running Unit and Integration Tests
To run the app's unit and integration tests, follow these steps:
1. Navigate to the frontend directory: `cd frontend`
2. Run tests: `npm test`

## 🧪 Unit and Integration Test Coverage
![Full frontend testing coverage](./src/assets/tests.png)

We are super proud to achieve 100% frontend testing coverage. From here, let's discuss the tests for each component and page!

### 👉 AddNote Component
#### Test #1: Component renders input and button
Ensures that the AddNote component renders an input field with the placeholder "I need to remember..." and a button with the label "Add." The test checks for the presence of these elements.
https://github.com/wadedesir/notes-app/blob/768ca3843ae005a16d0c4bd8bc19fba8df782757/frontend/__tests__/AddNote.test.js#L10-L31

#### Test #2: Component updates parent state and calls handler
Verifies that the AddNote component updates the parent state and calls the provided handler when a user types into the input field and clicks the "Add" button. The test simulates user interactions, checks if the createNote function is called, and ensures that the setNote function records the correct value.
https://github.com/wadedesir/notes-app/blob/768ca3843ae005a16d0c4bd8bc19fba8df782757/frontend/__tests__/AddNote.test.js#L33-L58

### 👉 LoginForm Component
#### Test #1: Renders LoginForm component
Ensures that the LoginForm component renders inputs for "Username" and "Password" along with a login button. The test checks for the presence of these elements.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L13-L33

#### Test #2: Calls authenticate function on click event
Verifies that the authenticate function is called when the login button is clicked. This test simulates a user clicking the login button and checks if the authenticate function is invoked.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L56-L61

#### Test #3: Calls setUsername with value from username input
Ensures that the setUsername function is called with the correct value when there is a change in the "Username" input. This test simulates a user inputting a username and checks if the setUsername function is invoked with the correct value.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L63-L71

#### Test #4: Calls setPassword with value from password input
Validates that the setPassword function is called with the correct value when there is a change in the "Password" input. This test simulates a user inputting a password and checks if the setPassword function is invoked with the correct value.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L73-L81

### 👉 Note Component
#### Test #1: Renders without crashing
Ensures that the Note component renders without errors, displaying the provided note content.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L23-L26

#### Test #2: Displays the date
Verifies that the Note component displays the provided date.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L28-L31

#### Test #3: Displays edit, delete & pin buttons on mouse hover
Tests if the Note component shows edit, delete, and pin buttons when the mouse hovers over the note.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L33-L51

#### Test #4: Hides edit, delete & pin buttons on mouse leave
Confirms that the Note component hides edit, delete, and pin buttons when the mouse leaves the note.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L53-L85

#### Test #5: Displays modal elements when edit button is clicked
Ensures that the Note component displays modal elements (cancel and save buttons) when the edit button is clicked.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L87-L102

#### Test #6: Hides modal elements after clicking save button
Checks if the modal elements are hidden after clicking the save button.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L104-L120

#### Test #7: Hides modal elements after clicking cancel button
Validates that the modal elements are hidden after clicking the cancel button.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L122-L138

#### Test #8: Notes can be toggled as important (an un-toggled) via the pin button
Verifies that the Note component allows toggling between important and unimportant states via the pin toggle.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L141-L155

#### Test #9: Notes can be deleted
Tests if the Note component allows deletion by clicking the delete button.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L157-L168

#### Test #10: Allows editing and updates data after clicking save button
Ensures that the Note component allows editing and updates the data after clicking the save button.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L170-L192

#### Test #11: Displays content when not in editing mode
Validates that the Note component displays content when not in editing mode and does not render the input field.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L194-L202

#### Test #12: Applies styling for important notes
Confirms that the Note component applies the appropriate styling for important notes.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Note.test.js#L204-L210

### 👉 SignUp Form Component
#### Test #1: Renders SignUpForm component
Ensures that the SignUpForm component is rendered successfully by checking for the presence of input placeholders for "Username," "Password," and "Confirm password."
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L7-L12

#### Test #2: Displays error message for mismatched passwords
Verifies that the SignUpForm component displays an error message when the passwords provided do not match. The test simulates user input, triggering the error message to appear, and checks if it is rendered.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L15-L30

#### Test #3: Does not display error message when passwords match
Ensures that the SignUpForm component does not display an error message when the provided passwords match. The test confirms that the error message disappears when passwords are identical.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L33-L50

#### Test #4: Calls authenticate function when passwords match and button is clicked
Verifies that the SignUpForm component calls the authenticate function when the passwords match, and the submit button is clicked. The test uses a mock authenticate function and checks if it is called exactly once.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L53-L75

#### Test #5: Does not call authenticate if passwords do not match
Ensures that the SignUpForm component does not call the authenticate function if the passwords do not match. The test sets up a scenario where passwords mismatch, clicks the submit button, and checks that the authenticate function is not called.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L77-L96

### 👉 Home Page
#### Test #1: All components render
Ensures that critical components, including the logo, note input field, and the "Add" button, are successfully rendered on the Home page. It confirms that the essential elements are present for users to interact with.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L45-L60

#### Test #2: Notes are rendered on load
Verifies that notes are correctly rendered when the Home page is loaded. It checks that the component fetches and displays notes from the backend, indicating that the initial rendering of notes functions as expected.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L62-L74

#### Test #3: Submitting form sends correct request to backend
Validates that submitting a note through the form sends the correct request to the backend. It also ensures that the note input field is reset after submission, maintaining a smooth user experience.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L76-L99

#### Test #4: Empty note doesn't create a new note
Confirms that attempting to submit an empty note does not result in the creation of a new note on the backend. It guarantees that the form handles empty submissions appropriately and maintains the note input in an empty state.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L101-L122

#### Test #5: Deleting removes note from page
Examines the functionality of deleting a note. It ensures that when a user triggers the deletion of a note, it is successfully removed from the Home page. This validates the integration between the frontend and backend for deleting notes.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L124-L151

#### Test #6: Editing changes contents of note
Focuses on the edit functionality. It checks whether editing a note results in the expected changes to the note's contents and updates the display accordingly. It validates that the editing feature functions correctly.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/Home.test.js#L153-L189

### 👉 Login Page
#### Test #1: Renders Login component
Verifies that the Login component is rendered successfully.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L13-L15

#### Test #2: Renders Login component with logo
Ensures that the Login component displays the logo with the correct styling by checking for the presence of the logo and confirming it has the expected class names.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L18-L23

#### Test #3: Renders login form with input fields
Validates that the login form within the Login component renders input fields for "Username" and "Password," along with a login button.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L26-L35

#### Test #4: Renders link to sign up page
Ensures that the Login component renders a link to the sign-up page.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L38-L44

#### Test #5: Correct credentials trigger successful login
Tests the Login component's response to correct credentials, triggering a successful login. This test simulates user input, mocks a successful response from the server, and checks if the login call was made with the correct credentials.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L46-L69

#### Test #6: Wrong credentials result do not log in
Verifies that incorrect credentials do not lead to a successful login. This test simulates user input, mocks a failed response from the server, and checks if the login call was made.
https://github.com/wadedesir/notes-app/blob/a14b8cd7519d57ebd33cd54b5380679df39ebda7/frontend/__tests__/Login.test.js#L71-L90

### 👉 SignUp Page
#### Test #1: Renders SignUp component
Ensures that the SignUp component is rendered successfully by checking for the presence of the "Already have an account?" text.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUp.test.js#L9-L14

#### Test #2: Renders SignUp component with logo
Ensures that the SignUp component displays the logo with the correct styling by checking for the presence of the logo and confirming it has the expected class names.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUp.test.js#L17-L22

#### Test #3: Form submission with valid data and successful response
Ensures that the SignUp component handles form submission correctly with valid data and responds appropriately. This test simulates user input, triggers a form submission, and mocks a successful response from the server. It checks if the navigation to the login page is triggered after a successful signup.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUp.test.js#L25-L48

#### Test #4: Wrong credentials result in failure
Ensures that the SignUp component handles incorrect credentials properly. This test simulates user input with incorrect credentials, triggers a form submission, and mocks a response from the server indicating a failure (status code 400). The test checks if the axios.post method was called, indicating that a login attempt was made with wrong credentials.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUp.test.js#L50-L71

### 👉 App
#### Renders login page on launch
Verifies that the App component renders the login page when initially launched. It ensures that the login page elements, including the logo, username input, password input, and login button, are correctly displayed. This test confirms that the routing is functioning as expected.
https://github.com/wadedesir/notes-app/blob/a75026ab3c384ca3ac54fe5ef1be9978b54dad03/frontend/__tests__/App.test.js#L6-L25

## 🔚 End-To-End Test Overview
End-to-end testing for the Notes App is conducted using Cypress, a modern testing framework designed for web applications. This testing approach ensures the robustness of the entire system by validating the user interface, the interaction with components, and the integration with the database. Unlike unit tests that isolate components and integration tests that evaluate the collaboration of different components, end-to-end tests assess the system's functionality from the user's perspective to the database backend.

## 🚀 Running End-To-End Tests
To run the Cypress end-to-end tests locally, follow these steps:
1. Make sure the frontend & backend servers are running. If not, start it by running `npm run dev` in the `frontend` directory & `export NODE_ENV=e2e && docker-compose up` in the `backend` directory.
2. Navigate to frontend directory & run Cypress by executing the command `npm run cypress:open` to run the e2e tests visually or `npm run test:e2e` to run them in headless mode.

## 🧪 End-To-End Test Coverage
The Cypress end-to-end tests cover various scenarios to ensure the functionality and integrity of the Notes App. Here's what the tests cover:

#### #1: Front Page Interaction
Verifies that the front page can be opened and the login form is accessible. We don't call the cy.visit() function here because we're calling it at the end of the `beforeEach` function, which runs before each of our tests.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L14-L17

#### #2: Login Functionality
Tests the login form's functionality, ensuring users can log in successfully.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L19-L26

#### #3: Note Management
Validates that users can create new notes, mark notes as important, and perform other note-related actions.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L33-L37
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L39-L51

#### #4: Before Each Function
Before each test is run, we perform some set-up logic to wipe the database clean, create a new user, and navigate to the login page.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L2-L12
