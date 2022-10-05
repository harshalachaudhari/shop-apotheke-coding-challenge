# shop-apotheke-coding-challenge

The task here is to finish the provided 'barebone' backend by implementing an endpoint to find all popular github repository based on stars and with option to provide limit and language, date options.

For the backend I have used NodeJs, ExpressJs, and Jest, supertest for unit testing

Command lines:

- `npm run start:dev` for running in local
- `npm run test` for running unit tests

### Endpoint

-Example: http://localhost:3000/popular/repositories?limit=50&language=javascript

- GET /popular/repositories with below optional filtering parameters:

  - `limit` Limit the number of results returned
  - `language` The prefered coding language for repositories
  - `beforedate` Return only /repos created before Date.
  - `afterdate` Return only /repos created since Date.
  - `sort` searches for repositories most stars/forks etc.
  - `requestType` could be most_rated/least_rated (only works with sort parameter)

### Testing

- Used Jest for testing the endpoint.
- `npm run test` command to run tests

### Dockerize App

- Commands to build docker image and run this app
- To Build : `docker build -t backend_challenge-1.0.0 .`
- To Run : `docker run -p 3000:3000 -d backend_challenge-1.0.0`
