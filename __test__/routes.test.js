'use strict';

process.env.SECRET = "TEST_SECRET";
const { app } = require('../auth/server'); 
const supertest = require('supertest');
const { sequelize } = require('../auth/models/index');

const mockRequest = supertest(app);

let userData = {
  testUser: { username: 'username', password: 'pass' , role:'admin'},
};
let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});
 
describe('Auth Router', () => {

  it('create new user', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;

    expect(response.status).not.toBe(500);
  });

  it('signin with basic auth ', async () => {
    let username1=userData.testUser.username;
    let password1=userData.testUser.password;

    const response = await mockRequest.post('/signin')
      .auth(username1, password1);

    const userObject = response.body;
    expect(response.status).not.toBe(500);
  });

  it('signin with bearer auth token', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin')
      .auth(username, password);

    accessToken = response.body.token;

    const bearerResponse = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(bearerResponse.status).not.toBe(500);
  });

  
  it('Succeeds with a valid token', async () => {

    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).not.toBe(500);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });

  it('Secret Route fails with invalid token', async () => {
    const response = await mockRequest.get('/secretstuff')
      .set('Authorization', `bearer accessgranted`);

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Signin");
  });
});
afterAll(async () => {
    await sequelize.drop();
  });
  