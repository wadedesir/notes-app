# 📝 Notes App Backend Overview

### 👋🏿 Introduction
Welcome to the [**Notes.app**](http://18.116.34.64:8420/) Backend. Powered by Node.js, Express.js, Mongoose, and Docker, this API provides a simple way to manage notes & is designed to be readable and easy to use as a template for future APIs.

Ready to explore the API? Check out the [Notes API Spec](#-notes-api-spec) below!

Want to dive into our tests? Check out our [Testing & Linting Details](#-testing--linting) below!

For an overview on the architecture, check out the [Implementation Overview Section](#implementation-overview) below!

# 🚀 Installing & Starting the Service
### Clone the repository:
`git clone https://github.com/wadedesir/notes-app.git`

### If you don't have Docker installed, you can run the app using MongoDB Atlas:
1. Make an .env file and set the `MONGODB_URI` environment variable.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Run the backend: `npm run dev`

### If you have Docker installed:
1. Navigate to the backend directory: `cd backend`
2. Run the backend: `docker compose up`

#### Your API is now running at http://localhost:8420.

# 🧪 Testing & Linting
Whenever a new PR is made, tests are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo). Otherwise, running unit tests and linting the project manually is pretty straightforward.

1. If you don't have Docker installed, run `npm run lint` to lint & `npm run test` to test.
2. If you have Docker installed, run `docker compose run api npm run lint` to lint & `docker compose run api npm run test` to test.

### Integration Test Details
The integration test for the notes api is handled through `backend/test/note_api.test.js`. This suite will test the application logic of the API to make sure it has the correct behavior & make sure we're getting the data we expect.


We're using [super test](https://github.com/visionmedia/supertest) for the backend API testing. The test imports the express app from the main module (index.js) and wraps it with the supertest function into a so-called superagent object. We use this 'superagent object' to make our test API requests.

### Integration Test Setup & Config
We define some `setup` & `teardown` logic for jest in [setup.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/setup.js) & [teardown.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/teardown.js). All we're doing in here is making jest a global variable in the `setup`, and making sure our process ends with exit code 0 which tells the 'shell' running our test command that everything went fine


We're using the User & Note model in a top level `beforeAll` function to wipe the User & Note collection data so we're not relying on the databases previous state (which could introduce false positives & other issues to our tests). This `beforeAll` logic will run once before all the other tests in this file.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L16C1-L19C3

### Integration Test Implementation Overview

#### GET USER /v1/users/ (Get all users)
a GET request to `/v1/users/` should return all the users, so when there are some initial users ( after we POST a test user ), we should be able to see them when we hit the `/v1/users/` endpoint with a GET request.

All we're doing here is hitting the `/v1/users/` endpoint and mapping the returned object array into a new object array that just has the name for each object. Then we step through that array with jest `expects(contents).toContain(testUserName)` to make sure it contains the user name for the test user we just created.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L37C1-L47C3
#### POST USER /v1/users/ (Create a user)
When no users are added, we test that we can actually create a user. We create a mock user object and post it to the `/v1/users/` endpoint, which should create a new user and respond back with 201 & the data for the new user.
https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L21C1-L35C3
#### GET USERS /v1/users/${ID} (Return a user by ID)
#### PUT USERS /v1/users/${ID} (Update a user by ID)
#### DELETE USERS /v1/users/${ID} (Delete a user by ID)

#### GET NOTE /v1/notes/ (Get all notes)
#### POST NOTE /v1/notes/ (Create a note)
#### GET NOTES /v1/notes/${ID} (Return a note by ID)
#### PUT NOTES /v1/notes/${ID} (Update a note by ID)
#### DELETE NOTES /v1/notes/${ID} (Delete a note by ID)

#### POST LOGIN /v1/login/ (Create a new login token)

NEED MORE DOCUMENTATION HERE


# Implementation Overview

### 📦 Deployment
To deploy our application, we opted for AWS EC2 due to its compatibility with our multi-container setup, as Fly.io does not support docker-compose. 😥
( You can still run the application on Fly.io if you want to use MongoDB Atlas over Docker, since you wont need the extra container to run mongoDB )

To deploy to AWS, follow these steps:
1. Set up an AWS account and create an EC2 instance.
2. Access the EC2 instance via SSH and install necessary dependencies such as docker, docker-compose, git, and npm.
3. **Code deployment**: Use AWS CodeDeploy or GitHub Actions with a self-hosted runner to automatically pull in the code. Alternatively, you can manually run `git clone` from inside the EC2 instance.
4. **Build and copy frontend**: Use AWS CodeDeploy or GitHub Actions (with a self-hosted runner) to build the frontend and copy it to the backend's /dist folder.
5. Run `docker-compose up` in the backend folder on the EC2 instance.
6. Modify inbound traffic rules to allow traffic to port 8420 on the EC2 instance.

### 🗂 Backend File Structure
The backend follows a modular architecture, with distinct components responsible for handling different aspects of the application logic.
```
├── index.js           // Main entry point into the app
├── routes             // Express routes
│   ├── LoginRouter.js
│   ├── UserRouter.js
│   ├── NoteRouter.js
├── controllers        // Application logic implementations
│   ├── NoteController.js
│   ├── UserController.js
│   ├── LoginController.js
├── models             // Database object interfaces
│   ├── User.js
│   ├── Note.js
├── util               // Utility functions
│   ├── db_util.js
│   ├── logger.js
│   ├── config.js
│   ├── middleware.js
├── tests              // Jest tests (automatically run through GitHub Actions)
```
#### 1. Routes
- **LoginRouter.js**: Defines routes related to user authentication.
- **UserRouter.js**: Handles CRUD operations for user management.
- **NoteRouter.js**: Manages CRUD operations for notes.

#### 2. Controllers
- **LoginController.js**: Contains logic for user authentication.
- **UserController.js**: Implements methods for user CRUD operations.
- **NoteController.js**: Implements methods for note CRUD operations.

#### 3. Models
- **User.js**: Defines the schema and methods for interacting with user data in the database.
- **Note.js**: Defines the schema and methods for interacting with note data in the database.

#### 4. Utilities
- **db_util.js**: Provides utility functions for interacting with the database.
- **logger.js**: Handles logging throughout the application.
- **config.js**: Manages application configuration settings.
- **middleware.js**: Contains middleware functions for request processing.

# 📝 Notes API Spec
The following outlines the various responses from the API.

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
