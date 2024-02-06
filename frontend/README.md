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

Note: You can run `npx eslint --fix .` while in the frontend directory to automatically fix any linting problems

## Unit and Integration Test Details

### Component: AddNote
Testing the AddNote component was fairly straightforward. This was a simple unit test as it did not require working with any other components. There were only a couple things that needed to be tested:
1.  Does it render sucessfully
2. Does it call the correct functions and update states correctly

Those were tested using two test cases respectively. 

#### Component renders input and button
To test if it rendered we had to do a test render with the react-testing-library render function like so:

https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/AddNote.test.js#L17-L22

This also involved creating mock functions to provide to setNote & createNote using jest.fn()

https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/AddNote.test.js#L12-L13

afterwards all that needed to be done was to:
- grab the input field and submit button using the provided screen util
- check that they actually existed on the page

#### Component updates parent state and calls handler

This time around we already checked if the component was getting successfully rendered on the page, now all we had to do was check if click the submit button triggered the correct action

To test this we used the userEvent module provided by react-testing-library

All we had to do was call the setup function:
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/AddNote.test.js#L48

Then grab the input and submit button from the page again and follow that up by emulating a keyboard input and button press for the form:
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/AddNote.test.js#L50-L54

Finally we used expect() to assert that the createNote function was called and setNote was given the correct input values:
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/AddNote.test.js#L56-L57

### Component: Login
#### Test
#### Test

### Component: Note
#### Test 1: `renders without crashing`

- **Objective:**
  - Ensure that the `Note` component renders without errors.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Check if the content of the note is present on the screen.

#### Test 2: `displays the date`

- **Objective:**
  - Confirm that the date associated with the note is displayed.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Check if the date is present on the screen.

#### Test 3: `displays edit, delete & pin buttons on mouse hover`

- **Objective:**
  - Verify that the edit, delete, and pin buttons are displayed when the user hovers over the note.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Check if the edit, delete, and pin buttons are rendered.

#### Test 4: `hides edit, delete & pin buttons on mouse leave`

- **Objective:**
  - Confirm that the edit, delete, and pin buttons are hidden when the user stops hovering over the note.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Check if the edit, delete, and pin buttons are rendered.
  4. Move the mouse away from the note element.
  5. Check if the edit, delete, and pin buttons are hidden.

#### Test 5: `displays modal elements when edit button is clicked`

- **Objective:**
  - Ensure that the modal elements are displayed when the user clicks the edit button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the edit button.
  4. Check if the modal elements (cancel and save buttons) are rendered.

#### Test 6: `hides modal elements after clicking save button`

- **Objective:**
  - Confirm that the modal elements are hidden after the user clicks the save button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the edit button.
  4. Click the save button.
  5. Check if the modal elements are no longer present on the screen.

#### Test 7: `hides modal elements after clicking cancel button`

- **Objective:**
  - Confirm that the modal elements are hidden after the user clicks the cancel button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the edit button.
  4. Click the cancel button.
  5. Check if the modal elements are no longer present on the screen.

#### Test 8: `can be marked as important/unimportant via the 📌 toggle`

- **Objective:**
  - Confirm that the note can be marked as important or unimportant by toggling the 📌 button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the 📌 toggle button.
  4. Check if the mock `editNote` function is called with the correct parameters.

#### Test 9: `can be deleted`

- **Objective:**
  - Confirm that the note can be deleted by clicking the delete button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the delete button.
  4. Check if the mock `deleteNote` function is called with the correct parameters.

#### Test 10: `allows editing and updates data after clicking save button`

- **Objective:**
  - Confirm that the note allows editing, and the data is updated after clicking the save button.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Hover over the note element.
  3. Click the edit button.
  4. Change the note content.
  5. Click the save button.
  6. Check if the mock `editNote` function is called with the updated content.

#### Test 11: `displays content when not in editing mode`

- **Objective:**
  - Ensure that the content is displayed when the note is not in editing mode.
  
- **Steps:**
  1. Render the `Note` component with the provided props.
  2. Check if the content is displayed.
  3. Check if the input field is not rendered.

#### Test 12: `applies styling for important notes`

- **Objective:**
  - Confirm that styling for important notes is applied.
  
- **Steps:**
  1. Render the `Note` component with the provided props (important: true).
  2. Check if the styling for important notes is applied.


### Component: SignUpForm
#### Test
#### Test

### Page: Home
#### `beforeEach` and `afterEach` Setup

- **Mocking Axios:**
  - Mocks GET, POST, DELETE, and PUT requests with specific responses for testing scenarios.
  - Resets mocks between tests to ensure isolation.

#### Test 1: `All components render`

- **Objective:**
  - Ensure that all required components (logo, note input, and add button) render correctly on the `Home` page.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Verify the presence of the logo, note input, and add button.

#### Test 2: `Notes should be rendered on load`

- **Objective:**
  - Confirm that notes are rendered on the page after the component loads.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Query all rendered notes.
  4. Verify that Axios GET request is called.
  5. Ensure at least one note is rendered on the page.

#### Test 3: `Submitting form sends correct request to backend`

- **Objective:**
  - Ensure that submitting the form sends the correct POST request to the backend with the provided data.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Simulate user input and click on the add button.
  4. Verify that the Axios POST request is called.
  5. Check if the correct data is submitted.
  6. Ensure the note input is reset.

#### Test 4: `Empty note doesn't create a new note`

- **Objective:**
  - Confirm that submitting an empty note does not trigger a POST request.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Click on the add button without entering any text.
  4. Verify that Axios POST request is not called.
  5. Ensure the note input remains empty.

#### Test 5: `Deleting note should remove note from page`

- **Objective:**
  - Ensure that deleting a note removes it from the page.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Mouse over the note, reveal delete button, and click it.
  4. Verify that Axios DELETE request is called.
  5. Ensure the note is removed from the page.

#### Test 6: `Editing changes contents of note`

- **Objective:**
  - Confirm that editing a note changes its content.
  
- **Steps:**
  1. Wait for component states to update.
  2. Render the `Home` page.
  3. Mouse over the note, reveal edit button, and click it.
  4. Input new text and submit the edited note.
  5. Verify that Axios PUT request is called.
  6. Ensure the old note is no longer displayed.
  7. Check if the new note content is displayed on the page.

### Page: Login
#### Test
#### Test

### Page: SignUp page
#### Test
#### Test

### App
#### Renders login page on launch
This test ensures that the App component correctly renders the login page with the expected elements. It uses the React Testing Library and Jest for assertions.

1. Waiting for component states to update:
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/App.test.js#L10-L12
The waitFor function is used to wait for asynchronous updates in the component states before rendering.

2. Asserting the presence of elements:
https://github.com/wadedesir/notes-app/blob/3a93fc3bcdd5559d8a17ec374169f79dcd60cb86/frontend/__tests__/App.test.js#L13-L22

- `getByRole`: Finds an element by its role attribute.
- `getByPlaceholderText`: Finds an input element by its placeholder text.
- `findByText`: Finds an element with the specified text, waiting for it to appear asynchronously.

The test ensures that the login page contains the logo, username input field, password input field, and a login button.

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