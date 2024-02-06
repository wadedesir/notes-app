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
3. Your API is now running at http://localhost:8420


# 🧪 Testing & Linting
The backend api is using `eslint` to enforce good code style & do static code analysis. The code style in use is the 'standard' preset with no extra rules.
Whenever a new PR is made, the tests located in `/backend/tests` are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo). 

To run unit / integration tests and lint the project manually
1. Run npm run lint . to run linting
1. If you don't have Docker installed, `npm run test` to run jest tests.
2. If you have Docker installed, run `docker compose run api npm run test` to run jest tests.

Note: if you want to automatically fix what you can run `npx eslint --fix .` while in the root of the backend

### Integration Test Details
The integration test for the notes api is handled through `backend/test/note_api.test.js`. This suite will test the application logic of the API to make sure it has the correct behavior & make sure we're getting the data we expect.


We're using [super test](https://github.com/visionmedia/supertest) for the backend API testing. The test imports the express app from the main module (index.js) and wraps it with the supertest function into a so-called superagent object. We use this superagent object to make our test API requests.

### Integration Test Setup & Config
We define some setup & teardown logic for jest in [setup.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/setup.js) & [teardown.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/teardown.js). What we're doing here is making jest a global variable in `setup.js`, and making sure our process ends with exit code 0 in `teardown.js` which tells the 'shell' running our test command that everything went fine.

We're using the User & Note model in a top level `beforeAll` function to wipe the User & Note collection data so we're not relying on the databases previous state (which could introduce false positives & other issues to our tests). This `beforeAll` logic will run once before all the other tests in this file.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L16-L19

### Integration Test Implementation Overview

#### GET USER TEST /v1/users/ (Get all users)
a GET request to `/v1/users/` should return all the users, so when there are some initial users ( after we POST a test user ), we should be able to see them when we hit the `/v1/users/` endpoint with a GET request.

What we're doing here is hitting the `/v1/users/` endpoint and mapping the returned object array into a new object array that just has the name for each object. Then we step through that array with jest `expects(contents).toContain(testUserName)` to make sure it contains the user name for the test user we just created.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L21-L35

#### POST USER TEST /v1/users/ (Create a user)
When no users are added, we test that we can actually create a user. We create a mock user object and post it to the `/v1/users/` endpoint, which should create a new user and respond back with 201 & the data for the new user.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L37-L47

#### PUT USER TEST /v1/users/${userId} (Update a user)
When a user has been added, we test that we can use the. We use the HTTP PUT method to update the users data. 

https://github.com/wadedesir/notes-app/blob/7400dcdd46191c5fa9beed56bdefef9eb9d9e799/backend/tests/note_api.test.js#L86-L96

#### DELETE USER TEST /v1/users/${userId} (Delete a user)
After all our tests are done running, we delete the user we used for our tests.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L235-L239

#### GET NOTE TEST /v1/notes/ (Get all notes)
When we're logged in we should be able to get back all the notes. We hit the `/v1/notes` end point and check that it gives up back 200.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L78-L84

#### POST NOTE TEST /v1/notes/ (Create a note)
When we're logged in, we should be able to create a new note. The user token from when we logged in got saved to the test's top level scope so it's available in all our test cases. We use the token here to make a post request to the notes endpoint and then we check the status code to make sure everything came back as expected.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L86-L100

#### GET NOTES TEST /v1/notes/${ID} (Return a note by ID)
In this test we're trying to make sure that we get the correct note by ID. We first grab all the notes in the database directly through our Note Model with `notesInDb()`. After we get all the notes, we grab the first note in the collection and use its ID in the request to the GET `/v1/notes/${ID}` endpoint.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L123-L135

#### DELETE NOTES TEST /v1/notes/${ID} (Delete a note by ID)
In this test we're trying to make sure that we delete the right note. We first grab all the notes in the database directly through our Note Model with `notesInDb()`. After we get all the notes, we grab the first note in the collection and use its ID in the request to the DELETE `/v1/notes/${ID}` endpoint.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L194-L213

#### POST LOGIN TEST /v1/login/ (Create a new login token)
In this test we first check to make sure we cant log in with bad credentials. We send bad credentials on purpose and check to see if we get back a `401` unauthorized request.
After making sure we cant log in with bad creds, we use the correct information to log in. We post to the same endpoint & check to see if it's response is 200, then we set the user token & user id to variables.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L49-L76


# Implementation Overview

### 📦 Deployment
To deploy our application, we opted for AWS EC2 due to its compatibility with our multi-container setup, and setting up multiple containers on Fly.io is non-trivial
( You can still run the application on Fly.io if you want to use MongoDB Atlas over Docker, since you wont need the extra container to run mongoDB. To do this youd need to replace the MONGODB_URI environment variable to point to a MongoDB Atlas instance with a .env file)

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
