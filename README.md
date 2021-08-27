# NestJS task

## Info

Application generated with NestCLI, created with Node v14.15.0 & npm 6.14.8

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO's

What needs to be mentioned -> feel free to reorganize EVERYTHING in this app to your needs. Main purpose of this task is to present your skills :rocket: so if U have any kind of pattern / template / approach go with it!

- [Task 1] We would like to add new item using POST endpoint /vizlib/items
- [Task 2] We would like to validate somehow that newly added item before saving it into the database (not empty + min length = 3)
- [Task 3] We would like to cast those items to specific format before returning to the UI (to not expose too much -> omit updated field)

Additional points / Things we will be also looking at ;>

- Proper status codes
- Any kind of error handling implementation
- Documentation (approach doesn't matter)
- Versioning
- Any kind of tests (just to show how U're testing apps)
- Migration (for example extending Item model with additional column)
- Soft deletes (new endpoint + migration)

## Q&A

It would be great if You can fork this repository and create a PR with finished task ;)

Treat us as total noobs so everything what can be "fancy" would be nice to explain somehow -> comment in the code / README

Good Luck!!!

## Documentation

Api was documented using Swagger. After running `npm run start` you can find swagger UI under `http://localhost:3000/api/`
