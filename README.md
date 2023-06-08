# REST API with Clean Architecture

This project is a personal learning project aimed at building a REST API using Typescript with a clean architecture approach. The technology stack used includes Express, PostgreSQL, and Redis.

## Features

- User authentication and authorization
- CRUD operations for user and posts entities
- JSON Web Token (JWT) based authentication
- PostgreSQL database integration
- Redis caching for improved performance

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ilhamnyto/tsexpress-fw.git`
2. Install the required dependencies: `npm install`
3. Copy the env files: `cp .env.example .env`.
4. Set up the Server host, port, PostgreSQL database, Redis and configure the connection details in `.env`.
5. Run the database migrations: `npm run migrate`
5. Run the server: `npm start`

## API Documentation

For detailed information on the API endpoints and their usage, refer to the [API Documentation](https://documenter.getpostman.com/view/13820554/2s93eZzBrj).

## Configuration

The project's configuration is stored in the `.env` file. Update this file to adjust the server port, database connection details, Redis configuration, and other settings as needed.


## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgments

This project was made possible by the following open-source libraries:

- [Echo](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)

