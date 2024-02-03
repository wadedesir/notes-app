# Note App API

> Version 1.0.0

API Spec for the Notes App

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/v1/users](#getv1users) | Returns a list of users. |
| POST | [/v1/users](#postv1users) | Creates a new user. |
| GET | [/v1/users/{userId}](#getv1usersuserid) | Returns a user by ID. |
| PUT | [/v1/users/{userId}](#putv1usersuserid) | Update a user by ID |
| DELETE | [/v1/users/{userId}](#deletev1usersuserid) | delete a user by ID. |
| GET | [/v1/notes](#getv1notes) | Returns a list of notes. |
| POST | [/v1/notes](#postv1notes) | Creates a new note. |
| GET | [/v1/notes/{noteId}](#getv1notesnoteid) | Returns a note by ID. |
| PUT | [/v1/notes/{noteId}](#putv1notesnoteid) | Update a note by ID |
| DELETE | [/v1/notes/{noteId}](#deletev1notesnoteid) | delete a note by ID. |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| User | [#/components/schemas/User](#componentsschemasuser) |  |
| Note | [#/components/schemas/Note](#componentsschemasnote) |  |

## Path Details

***

### [GET]/v1/users

- Summary  
Returns a list of users.

- Description  
Optional extended description in CommonMark or HTML.

#### Responses

- 200 A JSON array of user names

`application/json`

```ts
[]
```

***

### [POST]/v1/users

- Summary  
Creates a new user.

#### RequestBody

- application/json

```ts
{
  id: integer
  name: string
}
```

#### Responses

- 201 Created

***

### [GET]/v1/users/{userId}

- Summary  
Returns a user by ID.

#### Responses

- 200 A user object.

`application/json`

```ts
{
  id: integer
  name: string
}
```

- 400 The specified user ID is invalid (not a number).

- 404 A user with the specified ID was not found.

- default Unexpected error

***

### [PUT]/v1/users/{userId}

- Summary  
Update a user by ID

#### Responses

- 200 A user object.

`application/json`

```ts
{
  id: integer
  name: string
}
```

- 400 The specified user ID is invalid (not a number).

- 404 A user with the specified ID was not found.

- default Unexpected error

***

### [DELETE]/v1/users/{userId}

- Summary  
delete a user by ID.

#### Responses

- 200 A user object.

`application/json`

```ts
{
  id: integer
  name: string
}
```

- 400 The specified user ID is invalid (not a number).

- 404 A user with the specified ID was not found.

- default Unexpected error

***

### [GET]/v1/notes

- Summary  
Returns a list of notes.

- Description  
Optional extended description in CommonMark or HTML.

#### Responses

- 200 A JSON array of note names

`application/json`

```ts
[]
```

***

### [POST]/v1/notes

- Summary  
Creates a new note.

#### RequestBody

- application/json

```ts
{
  id: integer
  content: string
  important?: boolean
}
```

#### Responses

- 201 Created

***

### [GET]/v1/notes/{noteId}

- Summary  
Returns a note by ID.

#### Responses

- 200 A note object.

`application/json`

```ts
{
  id: integer
  content: string
  important?: boolean
}
```

- 400 The specified note ID is invalid (not a number).

- 404 A note with the specified ID was not found.

- default Unexpected error

***

### [PUT]/v1/notes/{noteId}

- Summary  
Update a note by ID

#### Responses

- 200 A note object.

`application/json`

```ts
{
  id: integer
  content: string
  important?: boolean
}
```

- 400 The specified note ID is invalid (not a number).

- 404 A note with the specified ID was not found.

- default Unexpected error

***

### [DELETE]/v1/notes/{noteId}

- Summary  
delete a note by ID.

#### Responses

- 200 A note object.

`application/json`

```ts
{
  id: integer
  content: string
  important?: boolean
}
```

- 400 The specified note ID is invalid (not a number).

- 404 A note with the specified ID was not found.

- default Unexpected error

## References

### #/components/schemas/User

```ts
{
  id: integer
  name: string
}
```

### #/components/schemas/Note

```ts
{
  id: integer
  content: string
  important?: boolean
}
```
