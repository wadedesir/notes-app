# 📝 Notes App Frontend Overview

### 👋🏿 Introduction
Welcome to the **Notes App Frontend**. Powered by React, Vite.js, and Tailwind CSS, the frontend provides a user-friendly interface for managing notes & interacting with the Notes API. The components are designed for simplicity and ease of use, offering features such as adding, editing, and deleting notes, as well as user authentication with login and signup forms.

### 🚀 Installation & Run
1. Clone the repository: `git clone https://github.com/wadedesir/notes-app.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Run the frontend: `npm run dev`
5. Open your browser and visit http://localhost:5173 to access the application.

### 🧪 Testing & Linting
Whenever a new PR is made, tests are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo).

NEED MORE DOCUMENTATION HERE

### 🗂 Frontend File Structure
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

### 🗃️ Components
#### 1. AddNote
The AddNote component provides a form for users to add new notes to the application. It includes an input field for the note content and a button to submit the note.

#### 2. LoginForm
The LoginForm component handles user authentication with a username and password. It includes input fields for the username and password, as well as a button to authenticate the user.

#### 3. Note
The Note component represents a single note in the application. It includes features such as editing, deleting, and marking a note as important. The component displays the note content, creation date, and allows users to interact with the notes.

#### 4. SignUpForm
The SignUpForm component handles user registration with a username and password. It includes input fields for the username, password, and confirmation password. Password matching is validated, and an error message is displayed if they do not match.

### 📄 Pages
#### 1. Home
The Home page is the main interface for managing notes. It displays existing notes, allows users to add new notes, and provides options for editing and deleting notes.

#### 2. Login
The Login page includes a login form for users to authenticate. It also provides a link to the signup page for new users.

#### 3. SignUp
The SignUp page includes a signup form for users to create a new account. It also provides a link to the login page for existing users.

### 💻 App
The App component sets up the routing for the application using react-router-dom. It includes routes for the home page, login, and signup pages.