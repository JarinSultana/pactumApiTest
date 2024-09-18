PactumJS API Testing Example
Description

This project provides a demonstration of API integration testing using PactumJS. It includes a simple Express server with CRUD (Create, Read, Update, Delete) endpoints and comprehensive test cases for each endpoint. The goal is to illustrate how to set up and use PactumJS for testing API endpoints.
Table of Contents

    Installation
    Usage
    API Endpoints
    Contributing
    License
    Contact Information

Installation
Prerequisites

    Node.js (v14 or higher)
    npm

Setup

    Clone the repository:

    bash

git clone https://github.com/your-username/pactum-api-test.git
cd pactum-api-test

Install dependencies:

bash

npm install

Start the server:

bash

    node server.js

Usage
Running the Server

To start the Express server, use the following command:

bash

node server.js

The server will run at http://localhost:3000.
Running Tests

To execute the test cases using PactumJS, run:

bash

npm test

The tests will automatically connect to the running server at http://localhost:3000 and perform API integration checks.
Example Requests

    GET User by ID:

    bash

curl http://localhost:3000/api/user/1

POST Create User:

bash

curl -X POST http://localhost:3000/api/user -H "Content-Type: application/json" -d '{"name": "New User", "email": "new.user@example.com"}'

PUT Update User:

bash

curl -X PUT http://localhost:3000/api/user/1 -H "Content-Type: application/json" -d '{"name": "Updated Name", "email": "updated.email@example.com"}'

PATCH Partially Update User:

bash

curl -X PATCH http://localhost:3000/api/user/1 -H "Content-Type: application/json" -d '{"email": "patched.email@example.com"}'

DELETE User:

bash

    curl -X DELETE http://localhost:3000/api/user/1

API Endpoints
GET /api/user/:id

    Description: Retrieve user details by ID.
    Response:

    json

    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }

POST /api/user

    Description: Create a new user.
    Request Body:

    json

{
  "name": "New User",
  "email": "new.user@example.com"
}

Response:

json

    {
      "message": "User created successfully",
      "user": {
        "name": "New User",
        "email": "new.user@example.com"
      }
    }

PUT /api/user/:id

    Description: Update user details by ID.
    Request Body:

    json

{
  "name": "Updated Name",
  "email": "updated.email@example.com"
}

Response:

json

    {
      "message": "User updated successfully",
      "user": {
        "id": 1,
        "name": "Updated Name",
        "email": "updated.email@example.com"
      }
    }

PATCH /api/user/:id

    Description: Partially update user details by ID.
    Request Body:

    json

{
  "email": "patched.email@example.com"
}

Response:

json

    {
      "message": "User partially updated successfully",
      "user": {
        "id": 1,
        "name": "Updated Name",
        "email": "patched.email@example.com"
      }
    }

DELETE /api/user/:id

    Description: Delete a user by ID.
    Response:

    json

{
  "message": "User deleted successfully"
}
