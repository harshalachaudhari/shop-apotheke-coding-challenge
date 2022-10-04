/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/config.json');
jest.mock('../src/config/config.json');

beforeEach((done) => {
  jest.clearAllMocks();
  jest.setTimeout(15000);
  done();
});

describe('Test the /health path', () => {
  test('It should response the GET method', () => {
    console.log(config);
    return request(app).get('/health').expect(200);
  });
});

describe('Test the /popular/repositories path', () => {
  test('Fetch popular github repos by default when no params provided', () => {
    return request(app).get('/popular/repositories').expect(200);
  });
});

describe('Test the /popular/repositories path with limits', () => {
  // Extra test
  /*test('Fetch popular github repos by limit 10', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ limit: '10' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        expect(res.body.items.length).toEqual(10);
      });
  });*/

  test('Fetch popular github repos by limit 100', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ limit: '100' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        expect(res.body.items.length).toEqual(100);
      });
  });

  test('Fetch popular github repos by limit 50', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ limit: '50' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        expect(res.body.items.length).toEqual(50);
      });
  });
});

describe('Test the /popular/repositories path with sort by [stars,forks,updated,help-wanted-issues]', () => {
  test('Fetch popular github repos by sort by stars', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ sort: 'stars' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
      });
  });

  test('Fetch popular github repos by sort by forks', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ sort: 'forks' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
      });
  });
  /* Extra Tests
  test('Fetch popular github repos by sort by updated', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ sort: 'forks' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
      });
  });

  test('Fetch popular github repos by sort by help-wanted-issues', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ sort: 'help-wanted-issues' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
      });
  });*/
});

describe('Test the /popular/repositories path with resultType order parameter', () => {
  test('Fetch popular github repos by resultType most_rated', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ resultType: 'most_rated' })
      .expect(200)
      .then((res) => {
        let firstRepoStarsCount = res.body.items[0]?.stargazers_count;
        let lastRepoStarsCount =
          res.body.items[res.body.items.length - 1]?.stargazers_count;
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        expect(firstRepoStarsCount > lastRepoStarsCount).toBeTruthy();
      });
  });
});

describe('Test the /popular/repositories path with language parameter', () => {
  test('Fetch popular github repos by language java', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ language: 'java' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body?.items).toBeTruthy();
        expect(res.body?.items[0]?.language.toUpperCase()).toEqual('JAVA');
      });
  });

  test('Fetch popular github repos by language javascript', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ language: 'javascript' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        expect(res.body.items[0].language.toUpperCase()).toEqual('JAVASCRIPT');
      });
  });
});

describe('Test the /popular/repositories path with date parameter', () => {
  test('Fetch popular github repos created onwards 2020-01-01', () => {
    return request(app)
      .get('/popular/repositories')
      .query({ afterDate: '2020-01-01' })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body.items).toBeTruthy();
        res.body.items.forEach((item) =>
          expect(
            new Date(item.created_at).getFullYear()
          ).toBeGreaterThanOrEqual(2020)
        );
      });
  });
});
