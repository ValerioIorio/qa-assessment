const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

describe('GIVEN valid data for an existing user', () => {
  const name = 'Alex';
  const balance = 1000;

  let userId;

  describe('WHEN I retrive a user using GET', () => {
    const expectedStatus = 201;
    const postRequestParams = {
    
      url: 'http://localhost:8080/api/users',
      method: 'GET',
      data: {
        name,
        balance,
      }
    };

    let retriveUserApiResponse;


    beforeAll(async () => {
      await makeAxiosRequestWithExpectedStatus(postRequestParams, expectedStatus);

      userId = retriveUserApiResponse.data.id;

      retriveUserApiResponse = await makeAxiosRequestWithExpectedStatus(userId, expectedStatus);
    });

    it('THEN the retrived user is returned in the response', () => {
      expect(retriveUserApiResponse.data.name).toBe(name);
      expect(retriveUserApiResponse.data.balance).toBe(balance);
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


describe('GIVEN  data for a  non existinguser', () => {
  
  let userId = 75795;
  const expectedNotFoundMessage = 'Cannot find User with id=75795.';
  const expectedNotFoundStatus = 404;

  describe('WHEN I retrive the user using GET', () => {
    

    let retriveUserApiResponse;
    
    //try to delete thge user in case it exists
    beforeAll(async () => {
      const expectedStatus = 200;
      const requestParams = {
        url: `http://localhost:8080/api/users/${userId}`,
        method: 'DELETE',
      };
      makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus)

      const getRequestParams = {
          url: `http://localhost:8080/api/users/${userId}`,
          method: 'GET',
        };
      retriveUserApiResponse = await makeAxiosRequestWithExpectedStatus(getRequestParams, expectedNotFoundStatus);

    });

    it('THEN the retrived user is returned in the response', () => {
      expect(retriveUserApiResponse.data).toBe(expectedNotFoundMessage);
      expect(retriveUserApiResponse.status).toBe(expectedNotFoundStatus);
    }
    );
  });
});

    




    