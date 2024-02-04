# 📝 Notes App Backend Overview!

### 👋🏿 Introduction
Welcome to the **Notes API**. This service provides a simple way to manage ascend notes. Powered by Node.js, Docker, Express.js, and Mongoose, this API is designed to readable and easy to use as a template for future APIs.

Ready to explore the API? Check out the [Notes API Spec](#-notes-api-spec) below!

### 🚀 Installation & Run
Getting started is ez-pz! Simply follow these steps:
1. If you don't have Docker installed, don't worry! You can still run the app using MongoDB Atlas. Set the `MONGODB_URI` environment variable ( dotenv is installed so create a .env) and run the dev server on your local machine with `npm install` & `npm run dev`.
2. If you have Docker installed, navigate to the backend directory and run `docker compose up`.
3. That's it! Your API is now up and running at http://localhost:8420.

### 🧪 Testing & Linting
These tests are ran automatically through github actions ( check out the .github/workflows/ folder at the root of the repo ) when creating a new PR to main!
But running unit tests & linting the project manually is pretty straight forward.

1. If you don't have Docker installed, don't worry! To lint the project just do `npm run lint` to lint, and `npm run test` to run test!.
2. If you have Docker installed, do `docker compose run api npm run lint` to lint, and `docker compose run api npm run test` to run tests!

### 🗂 Structure
Here's an overview of the project structure:
```
├── index.js // main entry point into the app
├── routes // all the express routes
│   ├── LoginRouter.js
│   ├── UserRouter.js
│   ├── NoteRouter.js
├── controllers // application logic implementations
│   ├── NoteController.js
│   ├── UserController.js
│   ├── LoginController.js
├── models // database object interfaces
│   ├── User.js
│   ├── Note.js
├── util // utility functions
│   ├── db_util.js
│   ├── logger.js
│   ├── config.js
│   ├── middleware.js
├── tests // jest tests - everything in here gets ran automatically through github actions when tryna merge so make sure youre passing!
```
# 📝 Notes API Spec

Welcome to the Notes API Spec. This Spec outlines the various responses from the API

## 🛣️ Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/v1/users](#getv1users) | Get all users |
| POST | [/v1/users](#postv1users) | Create a new user |
| GET | [/v1/users/{id}](#getv1usersid) | Get user by ID |
| PUT | [/v1/users/{id}](#putv1usersid) | Update user by ID |
| DELETE | [/v1/users/{id}](#deletev1usersid) | Delete user by ID |
| GET | [/v1/notes](#getv1notes) | Get all notes |
| POST | [/v1/notes](#postv1notes) | Create a new note |
| GET | [/v1/notes/{id}](#getv1notesid) | Get note by ID |
| PUT | [/v1/notes/{id}](#putv1notesid) | Update note by ID |
| DELETE | [/v1/notes/{id}](#deletev1notesid) | Delete note by ID |
| POST | [/v1/login](#postv1login) | Authenticate user |

## 📚 Reference Table

| Name | Path | Description |
| --- | --- | --- |
| User | [#/components/schemas/User](#componentsschemasuser) | 🥷🏾 User Schema |
| UserCreate | [#/components/schemas/UserCreate](#componentsschemasusercreate) | 🚪 User Creation Schema |
| UserUpdate | [#/components/schemas/UserUpdate](#componentsschemasuserupdate) | 🛠️ User Update Schema |
| Note | [#/components/schemas/Note](#componentsschemasnote) | 📝 Note Schema |
| NoteCreate | [#/components/schemas/NoteCreate](#componentsschemasnotecreate) | 📝 Note Creation Schema |
| NoteUpdate | [#/components/schemas/NoteUpdate](#componentsschemasnoteupdate) | 🛠️ Note Update Schema |
| LoginCredentials | [#/components/schemas/LoginCredentials](#componentsschemaslogincredentials) | 🔑 Login Credentials Schema |
| LoginResponse | [#/components/schemas/LoginResponse](#componentsschemasloginresponse) | 🔑 Login Response Schema |

## 🌟 Path Details

***

### [GET]/v1/users

- **Summary:** Get all users

#### Responses

- **200 OK:** A list of users.

```json
[
  {
    "id": "string",
    "name": "string",
    "username": "string"
  }
]
```

***

### [POST]/v1/users

- **Summary:** Create a new user

#### Request Body

- **application/json**

```json
{
  "name": "string",
  "username": "string",
  "password": "string"
}
```

#### Responses

- **201 Created:** The created user.

```json
{
  "id": "string",
  "name": "string",
  "username": "string"
}
```

- **400 Bad Request.**

***

### [GET]/v1/users/{id}

- **Summary:** Get user by ID

#### Responses

- **200 OK:** The user.

```json
{
  "id": "string",
  "name": "string",
  "username": "string"
}
```

- **404 Not Found.**

***

### [PUT]/v1/users/{id}

- **Summary:** Update user by ID

#### Request Body

- **application/json**

```json
{
  "name": "string",
  "username": "string",
  "password": "string"
}
```

#### Responses

- **200 OK:** The updated user.

```json
{
  "id": "string",
  "name": "string",
  "username": "string"
}
```

- **404 Not Found.**

***

### [DELETE]/v1/users/{id}

- **Summary:** Delete user by ID

#### Responses

- **204 No Content:** User deleted successfully.

- **404 Not Found.**

***

### [GET]/v1/notes

- **Summary:** Get all notes

#### Responses

- **200 OK:** A list of notes.

```json
[
  {
    "id": "string",
    "content": "string",
    "important": true,
    "user": {
      "id": "string",
      "name": "string",
      "username": "string"
    }
  }
]
```

***

### [POST]/v1/notes

- **Summary:** Create a new note

#### Request Body

- **application/json**

```json
{
  "content": "string",
  "important": true
}
```

#### Responses

- **201 Created:** The created note.

```json
{
  "id": "string",
  "content": "string",
  "important": true,
  "user": {
    "id": "string",
    "name": "string",
    "username": "string"
  }
}
```

- **400 Bad Request.**

- **401 Unauthorized.**

***

### [GET]/v1/notes/{id}

- **Summary:** Get note by ID

#### Responses

- **200 OK:** The note.

```json
{
  "id": "string",
  "content": "string",
  "important": true,
  "user": {
    "id": "string",
    "name": "string",
    "username": "string"
  }
}
```

- **404 Not Found.**

***

### [PUT]/v1/notes/{id}

- **Summary:** Update note by ID

#### Request Body

- **application/json**

```json
{
  "content": "string",
  "important": true
}
```

#### Responses

- **200 OK:** The updated note.

```json
{
  "id": "string",
  "content": "string",
  "important": true,
  "user": {
    "id": "string",
    "name": "string",
    "username": "string"
  }
}
```

- **404 Not Found.**

***

### [DELETE]/v1/notes/{id}

- **Summary:** Delete note by ID

#### Responses

- **204 No Content:** Note deleted successfully.

- **404 Not Found.**

***

### [POST]/v1/login

- **Summary:** Authenticate user

#### Request Body

- **application/json**

```json
{
  "username": "string",
  "password": "string"
}
```

#### Responses

- **200 OK:** Login successful.

```json
{
  "token": "string"
}
```

- **400 Bad Request.**

- **401 Unauthorized.**

## References

### #/components/schemas/User

```json
{
  "id": "string",
  "name": "string",
  "username": "string"
}
```

### #/components/schemas/UserCreate

```json
{
  "name": "string",
  "username": "string",
  "password": "string"
}
```

### #/components/schemas/UserUpdate

```json
{
  "name": "string",
  "username": "string",
  "password": "string"
}
```

### #/components/schemas/Note

```json
{
  "id": "string",
  "content": "string",
  "important": true,
  "user": {
    "id": "string",
    "name": "string",
    "username": "string"
  }
}
```

### #/components/schemas/NoteCreate

```json
{
  "content": "string",
  "important": true
}
```

### #/components/schemas/NoteUpdate

```json
{
  "content": "string",
  "important": true
}
```

### #/components/schemas/LoginCredentials

```json
{
  "username": "string",
  "password": "string"
}
```

### #/components/schemas/LoginResponse

```json
{
  "token": "string"
}
```
