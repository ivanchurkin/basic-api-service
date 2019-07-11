const request = require('supertest');
const server = require('../app.js');

async function handlerBeforeAll() {
  // do something before anything else runs
  console.log('Jest starting!');
}

function handlerAfterAll() {
  server.close();
  console.log('server closed!');
}

async function testGetPageHome() {
  const response = await request(server).get('/');

  expect(response.status).toEqual(200);
  expect(response.text).toContain('Hello World!');
}

async function testGetPageDogs() {
  const response = await request(server).get('/dogs');
  expect(response.status).toEqual(200);
  expect(response.text).toContain('affenpinscher');
}

function testBasicRoutes() {
  test('get home route GET /', testGetPageHome);
}

function testDogRoutes() {
  test('get all dogs  GET /dogs', testGetPageDogs);
}

beforeAll(handlerBeforeAll);
afterAll(handlerAfterAll);

describe('basic route tests', testBasicRoutes);
describe('dog tests', testDogRoutes);
