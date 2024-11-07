# Next API Demo

This is a demo of the Next API. The concept for the Next App was created by Team Next at the 2024 Code Hack. The Next App is intended to improve the patient's experience in an emergency unit. The main features are an estimated wait time, patient status, and a feature that allows the user to escalate issues to staff.

The mobile web app can be found [here](https://github.com/ElMarchk0/next_mobile_ui)


This API is built with Next [Nest](https://github.com/nestjs/nest) and [PostgreSQL](https://www.postgresql.org/)

## Project setup

Install

```sql
CREATE USER next WITH PASSWORD 'NextTest2024'
CREATE DATABASE next_api OWNER next;
```

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```