# 📝 Notes App Frontend Overview

## 👋🏿 Introduction
Welcome to the [**Notes App**](http://18.116.34.64:8420/) Frontend. Powered by React, Vite.js, and Tailwind CSS, the frontend provides a user-friendly interface for managing notes & interacting with the Notes API. The components are designed for simplicity and ease of use, offering features such as adding, editing, and deleting notes, as well as user authentication with login and signup forms.

## 🗂 Frontend File Structure
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
The Note component represents a single note in the application. It includes features such as editing, deleting, and marking a note as important. The component displays the note content, creation date, and allows users to interact with the notes.

#### 4. SignUpForm
The SignUpForm component handles user registration with a username and password. It includes input fields for the username, password, and confirmation password. Password matching is validated, and an error message is displayed if they do not match.

## 📄 Pages
#### 1. Home
The Home page is the main interface for managing notes. It displays existing notes, allows users to add new notes, and provides options for editing and deleting notes.

#### 2. Login
The Login page includes a login form for users to authenticate. It also provides a link to the signup page for new users.

#### 3. SignUp
The SignUp page includes a signup form for users to create a new account. It also provides a link to the login page for existing users.

## 💻 App
The App component sets up the routing for the application using react-router-dom. It includes routes for the home page, login, and signup pages.

## 🚀 Getting Started 
1. Clone the repository: `git clone https://github.com/wadedesir/notes-app.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Run the frontend: `npm run dev`
5. Open your browser and visit http://localhost:5173 to access the application.

<br>
<br>
<hr style="border: 5px solid black">
<br>
<br>

# 🧪 Testing & Linting
Whenever a new PR is made, tests are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo).

## Code Style & Linting Details
The frontend code base is using eslint to enforce good code style & do static code analysis. The code style in use is the 'standard' preset with no extra rules.

To run linting tests locally:
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the frontend: `npm run lint`

Note: You can run `npx eslint --fix .` while in the frontend directory to automatically fix some linting problems

## Unit and Integration Test Details

### Component: AddNote
#### Test
#### Test

### LoginForm Component
#### Test #1: Renders LoginForm component
Ensures that the LoginForm component renders inputs for "Username" and "Password" along with a login button.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L13-L34

#### Test #2: Calls authenticate function on click event
Verifies that the authenticate function is called when the login button is clicked.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L59-L64

### Test #3: Calls setUsername with value from username input
Ensures that the setUsername function is called with the correct value when there is a change in the "Username" input.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L66-L74

### Test #4: Calls setPassword with value from password input
Validates that the setPassword function is called with the correct value when there is a change in the "Password" input.
https://github.com/wadedesir/notes-app/blob/8a2b94eb8af7730bd972c8e6c4635fe0c17d6489/frontend/__tests__/LoginForm.test.js#L76-L84

### Component: Note
#### Test
#### Test

### SignUp Form Component
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

### Test #5: Does not call authenticate if passwords do not match
Ensures that the SignUpForm component does not call the authenticate function if the passwords do not match. The test sets up a scenario where passwords mismatch, clicks the submit button, and checks that the authenticate function is not called.
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/SignUpForm.test.js#L77-L96

### Page: Home
#### Test
#### Test

### Login Page
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

### SignUp Page
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

### App
#### Test
#### Test

## 🔚 End To End Test Details
End-to-end testing for the Notes App is conducted using Cypress, a modern testing framework for web applications. 
Unit tests are for testing components in isolation & integration tests try to test different components together in a kind of isolated environment - but end to end tests try to test the entire system as a whole from the user interface to the database. To do this, you have to automate testing the user flow like a real user would by writing scripts that will control a browser & act like a person using our UI. We also bypass the UI some times when testing the database.

## 🚀 Running End to End Tests
To run the Cypress end-to-end tests locally, follow these steps:

1. Make sure the frontend & backend servers are running. If not, start it by running `npm run dev` in the `frontend` directory & `export NODE_ENV=e2e && docker-compose up` in the `backend` directory.
2. Navigate to frontend directory & run Cypress by executing the command `npm run cypress:open` to run the e2e tests visually or `npm run test:e2e` to run them in headless mode.

## 🧪 End to End Test Coverage
The Cypress end-to-end tests cover various scenarios to ensure the functionality and integrity of the Notes App. Here's an overview of what the tests cover:

- **Front Page Interaction**: Verifies that the front page can be opened and the login form is accessible. We don't call the cy.visit() function here because we're calling it at the end of the `beforeEach` function, which runs before each of our tests.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L14-L17
- **Login Functionality**: Tests the login form's functionality, ensuring users can log in successfully.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L19-L26
- **Note Management**: Validates that users can create new notes, mark notes as important, and perform other note-related actions.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L33-L37
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L39-L51
- **Before Each Function**: before each test gets ran, we do some set up logic to wipe the database clean, create a new user, and navigate to the login page.
https://github.com/wadedesir/notes-app/blob/4593e16b1d0a5b557bc0c70bf520bbf457eed42c/frontend/cypress/e2e/note_app.cy.js#L2-L12