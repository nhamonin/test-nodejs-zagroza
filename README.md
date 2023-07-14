# ZAGROZA Test Project

This project implements a simple REST-API server with Bearer Authorization with the following endpoints:

- `POST /login` - returns a token.
- `POST /file-upload` - requires authorization and processes uploaded CSV files.

## Features

- Authorization and authentication with JSON Web Tokens (JWT)
- File upload and CSV processing
- CSV file validation and processing
- Two specific types of CSV table processing
- Saving processed data to PostgreSQL database or locally
- Basic client for server testing

## Project Structure

The project consists of a server built with Express.js and a simple client for testing server functionality.

## Endpoints

1. `POST /login` - Use this endpoint to obtain a JWT token. This token must be included in the `Authorization` header for requests to the `/file-upload` endpoint.

2. `POST /file-upload` - This endpoint expects a `multipart/form-data` payload with a CSV file attached. The server will validate and process the CSV file according to the specifications provided.

## CSV Processing

The server supports two types of CSV tables:

1. **simpleUsers:** This table should include the following headers: `Username`, `Identifier`, `First name`, `Last name`. After the server validates the CSV file, it will save the data to a PostgreSQL database.

2. **passwordRecovery:** This table should include the following headers: `Username`, `Identifier`, `One-time password`, `Recovery code`, `First name`, `Last name`, `Department`, `Location`. After the server validates the CSV file, it will save the file locally.

## Client

The client is a basic web application used for testing the server. Use it to log in, obtain a JWT token, and upload CSV files.

## Project Hosting

This project is hosted at [http://185.166.216.70:3000/](http://185.166.216.70:3000/). The Swagger API documentation is available at [http://185.166.216.70:3000/api-docs/](http://185.166.216.70:3000/api-docs/).

## Project Repository

The code for this project is available in the repository at [https://github.com/nhamonin/test-nodejs-zagroza](https://github.com/nhamonin/test-nodejs-zagroza).

## Disclaimer

This is a test project and is not part of the ZAGROZA company's workflow. The result of the candidate's work is their intellectual property and will not be used by the company for commercial purposes.

## Dependencies

This project is built with Node.js and uses the following packages:

- [`csv-parser`](https://www.npmjs.com/package/csv-parser) for parsing CSV files.
- [`dotenv`](https://www.npmjs.com/package/dotenv) for environment variable management.
- [`express`](https://www.npmjs.com/package/express) for creating the server and handling HTTP requests.
- [`fast-csv`](https://www.npmjs.com/package/fast-csv) for working with CSV files.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) for JWT authentication.
- [`multer`](https://www.npmjs.com/package/multer) for handling `multipart/form-data` requests.
- [`pg`](https://www.npmjs.com/package/pg) and [`sequelize`](https://www.npmjs.com/package/sequelize) for interfacing with the PostgreSQL database.
- [`swagger-jsdoc`](https://www.npmjs.com/package/swagger-jsdoc) and [`swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express) for generating API documentation.

In development, this project uses [`nodemon`](https://www.npmjs.com/package/nodemon) for hot-reloading the server during development.
