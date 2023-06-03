
describe('GIVEN valid data for a user', () => {
  const name = 'Alex';
  const balance = '1000';

  describe('GIVEN that I can create a user', () => {

    const createUserUrl = 'http://localhost:8081/create';
    const displayUsersUrl = 'http://localhost:8081/users';
    const expectedSuccessMessage = 'You submitted successfully!';

    beforeAll(async () => {
      await page.goto(createUserUrl);

      // enter name
      await page.waitForSelector('#name', { visible: true });
      const fieldName = await page.$('#name');
      await fieldName.click({ clickCount: 3 })
      await fieldName.type(name);

      // enter balance
      await page.waitForSelector('#balance', { visible: true });
      const fieldBalance = await page.$('#balance');
      await fieldBalance.click({ clickCount: 3 })
      await fieldBalance.type(balance);

      // click submit
      await page.waitForSelector('#createUser', { visible: true });
      await page.click('#createUser');
    });

    it('THEN I can see the success message', async () => {
      const isSuccessMessageVisible = await page.waitForSelector('#successMessage', { visible: true });
      expect(isSuccessMessageVisible).toBeTruthy();
    });

    it('THEN I can see the correct success message', async () => {
      const successMessage = await page.waitForSelector('#successMessage', { visible: true });
      const successMessageText = await successMessage.textContent();
      expect(successMessageText).toEqual(expectedSuccessMessage);
    });

    it('THEN I can see the user on the users page', async () => {
      const userId = 1; //Get this from the response

      await page.goto(displayUsersUrl);
      const user = await page.waitForSelector(`#user-${userId}`, { visible: true });
      expect(user).toBeTruthy();
    });

  });

});


describe('GIVEN invalid Data for a user', () => {

  const invalidName = '';
  const invalidBalance = '-1000';

  describe('GIVEN that balance input field cannot be less than 0 and name cannot be empty', () => {

    const createUserUrl = 'http://localhost:8081/create';

    beforeAll(async () => {
      await page.goto(createUserUrl);

      // enter name
      await page.waitForSelector('#name', { visible: true });
      const fieldName = await page.$('#name');
      await fieldName.click({ clickCount: 3 })
      await fieldName.type(invalidName);

      // enter balance
      await page.waitForSelector('#balance', { visible: true });
      const fieldBalance = await page.$('#balance');
      await fieldBalance.click({ clickCount: 3 })
      await fieldBalance.type(invalidBalance);

      // click submit
      await page.waitForSelector('#createUser', { visible: true });
      await page.click('#createUser');
    });

    it('THEN I cant see the success message', async () => {
      const isSuccessMessageNotVisible = await page.waitForSelector('#successMessage', { visible: false });
      expect(isSuccessMessageNotVisible).toBeTruthy();
    });

  });
  
})
