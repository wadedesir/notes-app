# 📝 Notes App Backend Overview

## 👋 Introduction
Welcome to the [**Notes App**](http://18.116.34.64:8420/) Backend. Powered by Node.js, Express.js, Mongoose, and Docker, this API provides a simple way to manage notes & is designed to be readable and easy to use as a template for future APIs.

## 🚀 Getting Started 
#### Clone the repository:
`git clone https://github.com/wadedesir/notes-app.git`

#### If you don't have Docker installed, you can run the app using MongoDB Atlas:
1. Make an .env file and set the `MONGODB_URI` environment variable.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Run the backend: `npm run dev`

#### If you have Docker installed:
1. Navigate to the backend directory: `cd backend`
2. Run the backend: `docker compose up`
3. Your API is now running at http://localhost:8420

## 🗂️ Backend File Structure
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

<br>
<br>
<hr style="border: 5px solid black">
<br>
<br>

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
<br>
<br>
<hr style="border: 5px solid black">
<br>
<br>

# 🧪 Testing & Linting
Whenever a new PR is made, tests located in `/backend/tests` are run automatically through GitHub Actions (check out the .github/workflows folder at the root of the repo).

## 💅 Code Style & Linting Details
The backend API uses eslint to enforce good code style & perform static code analysis. The code style in use is the 'standard' preset with no extra rules.

To run linting tests locally:
1. Navigate to the backend directory: `cd backend`
1. Run linting: `npm run lint`

Note: You can run `npx eslint --fix .` while in the backend directory to automatically fix any linting problems.

## 🚀 Running Unit and Integration Tests
To run the app's unit and integration tests, follow these steps:
1. If you don't have Docker installed: `npm test`
2. If you have Docker installed: `docker compose run api npm run test`

## 🔬 Integration Test Overview
Integration tests for the notes API are handled through `backend/test/note_api.test.js`. This suite tests the application logic of the API to ensure correct behavior and that we're getting the data we expect.

We use [super test](https://github.com/visionmedia/supertest) for the backend API testing. The test imports the Express app from the main module (index.js) and wraps it with the supertest function into a so-called superagent object. We use this superagent object to make our test API requests.

## 🔬 Integration Test Setup & Config
We define some setup & teardown logic for jest in [setup.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/setup.js) & [teardown.js](https://github.com/wadedesir/notes-app/blob/main/backend/tests/teardown.js). What we're doing here is making jest a global variable in `setup.js`, and making sure our process ends with exit code 0 in `teardown.js` which tells the 'shell' running our test command that everything went fine.

We're using the User & Note model in a top level `beforeAll` function to wipe the User & Note collection data, so we're not relying on the databases previous state (which could introduce false positives & other issues to our tests). This `beforeAll` logic will run once before all the other tests in this file.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L16-L19

## 🔬 Integration Test Coverage

#### GET USER TEST /v1/users/ (Get all users)
A GET request to `/v1/users/` should return all the users, so when there are some initial users (after we POST a test user), we should be able to see them when we hit the `/v1/users/` endpoint with a GET request.

What we're doing here is hitting the `/v1/users/` endpoint and mapping the returned object array into a new object array that just has the name for each object. Then we step through that array with jest `expects(contents).toContain(testUserName)` to make sure it contains the user name for the test user we just created.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L21-L35

#### POST USER TEST /v1/users/ (Create a user)
When no users are present, we test that we can actually create a user. We create a mock user object and post it to the `/v1/users/` endpoint, which should create a new user and respond back with 202 & the data for the new user.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L37-L47

#### PUT USER TEST /v1/users/${userId} (Update a user)
When a user has been added, we test that we can update the database with the user's data by using the HTTP PUT method.

https://github.com/wadedesir/notes-app/blob/7400dcdd46191c5fa9beed56bdefef9eb9d9e799/backend/tests/note_api.test.js#L86-L96

#### DELETE USER TEST /v1/users/${userId} (Delete a user)
After all our tests are done running, we delete the user we used for our tests.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L235-L239

#### GET NOTE TEST /v1/notes/ (Get all notes)
When we're logged in, we should be able to retrieve all the notes. We hit the `/v1/notes` end point and check that it returns a 200 response.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L78-L84

#### POST NOTE TEST /v1/notes/ (Create a note)
When we're logged in, we should be able to create a new note. The user token from when we logged in got saved to the test's top level scope, so it's available in all our test cases. We use the token here to make a POST request to the notes endpoint, and then we check the status code to make sure everything came back as expected.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L86-L100

#### GET NOTES TEST /v1/notes/${ID} (Return a note by ID)
In this test, we're trying to make sure that we get the correct note by ID. We first grab all the notes in the database directly through our Note Model with `notesInDb()`. After we get all the notes, we grab the first note in the collection and use its ID in the request to the GET `/v1/notes/${ID}` endpoint.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L123-L135

#### DELETE NOTES TEST /v1/notes/${ID} (Delete a note by ID)
In this test, we're trying to make sure that we delete the right note. We first grab all the notes in the database directly through our Note Model with `notesInDb()`. After we get all the notes, we grab the first note in the collection and use its ID in the request to the DELETE `/v1/notes/${ID}` endpoint.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L194-L213

#### POST LOGIN TEST /v1/login/ (Create a new login token)
In this test, we first check to make sure we can't log in with invalid credentials. We send invalid credentials on purpose and check to see if we get back a 401 unauthorized request.
After making sure we can't log in with invalid credentials, we use correct information to log in. We post to the same endpoint & check to see if its response is 200. Then we set the user token & user ID to variables.

https://github.com/wadedesir/notes-app/blob/da9820c45348238941af9a44a88a6e4f61461024/backend/tests/note_api.test.js#L49-L76

## 🔬 Unit Test Overview
The unit tests for the both the notes and user apis are found at `backend/test/note_api_unit.test.js`, `backend/test/user_unit.test.js`, and `backend/test/getTokenFrom.test.js`. These suites will test the logic of the API to make sure  our APIs are behaving as expected.

### Unit Test: ECMAScript Special Case
The unit tests in `user_unit.test.js` test the `findUserById` api. You may notice these tests look different than the others. 

That is because this suite includes an experiemental mocking module from Jest that tests ECMAScript Modules. In this application, we are using static import declaration which is a feature of ECMAScript as opposed to importing using require() which is a feature of CommonJS. ESM evaluates static `import` statements before looking at code however jest mocks must be set prior to importing the module that is being mocked. Therefore the hoisting of `jest.mock` calls that happen in CJS won't work for ESM. 

Let's break down the following test:
https://github.com/wadedesir/notes-app/blob/main/backend/tests/user_unit.test.js#L3-L50

1. In this test, we are executing an asynchronous setup function
```javascript
beforeAll(async () => { 
      
})
```
---
2. We then use the `jest.unstable_mockModule` to mock our `User` module to be used in our test. Since ES6 modules are hoisted, we need to set our mocks, prior to running code that uses the User model
```javascript
jest.unstable_mockModule('../models/User', () => ({...})
```
---
3. Here we are insuring that the default export of the `User` module is imported
```javascript
jest.unstable_mockModule('../models/User', () => ({
  default:{...}}))
```
---
4. Here we are mocking the `findById()` function so that our mock user has a mock `findById()` method as it does in the `User` module
```javascript
...{
  findById: jest.fn().mockImplementation(id => {...}
```
---
5. In the UserController, we call `User.findById()` and it can resolve to a value that `findUserById` uses for two different branches: **user found**  or **user not found**.
---
6. In our mock, we are using `Promise.resolve` to immediately return mock values that simulate each pathway. One where our user's id is in the DB, so we return the user. The other where the user is not found and `null` is returned. Note that since the id is the only data needed for the scope of these tests, the complete user data that the query may return is not mocked.
```javascript
...{
  if (id === '123456789') {
    return Promise.resolve({
      _id: '123456789'})
  } else {
    return Promise.resolve(null)}
  }
```
---
7. Once the mock is set, we can dynamically import the UserController. Since the mock User was set prior to this import, our imported api can utilize the mock User in the test environment
```javascript
findUserById = (await import('../controllers/UserController')).findUserById
```
---
8. Here we are testing the happy pathway where a user is present in our DB. We are mocking a user that we want to query our db for. We are also mocking the express `req` HTTP request object and `res` HTTP response object as we are not actually making the api call to the database. We then call `findUserById` using the value of `req.params.id` to similulate the call => `User.findById(req.params.id)`. In this test, we expect that a user is found and `res.json` will be called with the correct 'user' from the database
```javascript
test('when valid ID return user ', async () => {
  const mockUser = { _id: '123456789' }
  const req = {
    params: { id: '123456789' }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  await findUserById(req, res)

  expect(res.json).toHaveBeenCalledWith(mockUser)
  })
```
---
9. The second test, we are testing the other scenario, where our database does not have the user and `findUserById` responds with the appropriate error message and status. In this test, both assertions must be true in order for the test to pass
```javascript
test('when user id is not found, return 404', async () => {
  const req = {
    params: { id: 'ID NOT Found IN DB' }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  await findUserById(req, res)

  expect(res.json).toHaveBeenCalledWith({
    error: 'user with id:ID NOT Found IN DB not found'
  })
  expect(res.status).toHaveBeenCalledWith(404)
  })
```
