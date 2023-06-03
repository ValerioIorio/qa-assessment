const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

describe('GIVEN valid data for a user', () => {
  const name = 'Alex';
  const balance = 1000;
  let userId;

  describe('WHEN I create a new user using POST', () => {
    const expectedStatus = 201;
    const requestParams = {
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      data: {
        name,
        balance,
      }
    };
    let createUserApiResponse;
    beforeAll(async () => {
      createUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('THEN the user created is returned in the response', () => {
      expect(createUserApiResponse.data.name).toBe(name);
      expect(createUserApiResponse.data.balance).toBe(balance);
      userId = createUserApiResponse.data.id;
    });
  });

  afterAll(async () => {
    const expectedStatus = 200;
    const requestParams = {
      url: `http://localhost:8080/api/users/${userId}`,
      method: 'DELETE',
    };
    await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus)
  });
});

describe('GIVEN invalid data for a user', () => {

  const validName = 'Alex';
  const validBalance = 1000;

  const invalidName = '';
  const invalidNameMessage = '"Name field must be present in the body"';

  const invalidBalance = -1000;
  const invalidBalanceMessage = '"Balance field must be a positive number"'; //not implemented yet in the Api


  describe('WHEN I create a new user using POST whit an invalid name', () => {
    const expectedStatus = 400;
    const requestParams = {
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      data: {
        invalidName,
        validBalance,
      }
    };
    let createUserApiResponse;
    beforeAll(async () => {
      createUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('THEN i expect an error message', () => {
      expect(createUserApiResponse.data.message).toBe(invalidNameMessage);
    });

    it('AND i expect the correct ststus', () => {
      expect(createUserApiResponse.status).toBe(expectedStatus);
    });

  });

  describe('WHEN I create a new user using POST whit an invalid balance', () => {
    const expectedStatus = 400;
    const requestParams = {
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      data: {
        validName,
        invalidBalance,
      }
    };
    let createUserApiResponse;
    beforeAll(async () => {
      createUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('THEN i expect an error message', () => {
      expect(createUserApiResponse.data.message).toBe(invalidBalanceMessage);
    });

    it('AND i expect the correct ststus', () => {
      expect(createUserApiResponse.status).toBe(expectedStatus);
    });

  });

  
});