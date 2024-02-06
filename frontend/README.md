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

### Component: Login
#### Test
#### Test

### Component: Note
#### Test
#### Test

### Component: SignUpForm
#### Test
#### Test

### Page: Home
#### Test
#### Test

### Page: Login
#### Test
#### Test

### Page: SignUp page
#### Test
#### Test

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