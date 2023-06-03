
describe('GIVEN some already implementets urls', () => {
    
    const createUserUrl = 'http://localhost:8081/create';
    const displayUsersUrl = 'http://localhost:8081/users';
    const baseUrl = 'http://localhost:8081/';

    
    describe('GIVEN that i want to reach user creation page', () => {

        beforeAll(async () => {
            await page.goto(createUserUrl);

            const createUserLinkSelector = 'li.nav-item router-link[to="/create"]';
            await page.waitForSelector(createUserLinkSelector, { visible: true });

            const createUserLink = await page.$(createUserLinkSelector);
            await createUserLink.click();
          });
    
        it('THEN I can see name input area', async () => {
            const fieldName = await page.$('#name');
            expect(fieldName).toBeTruthy();
         });

        it('THEN I can see name input area empty', async () => {
            const fieldName = await page.$('#name');
            const name = await fieldName.textContent();
            expect(name).toEqual('');
        }); 

        it('THEN I can see balance input area', async () => {
            const fieldName = await page.$('#balance');
            expect(fieldName).toBeTruthy();
        }); 

        it('THEN I can see balance input area set to 0', async () => {
            const fieldName = await page.$('#balance');
            const balance = await fieldName.textContent();
            expect(balance).toEqual('0');
        }); 

        it('THEN I can see the Submit button', async () => {
            const fieldName = await page.$('#createUser');
            expect(fieldName).toBeTruthy();
        });

  
    });

    describe('GIVEN that i want to reach user list page', () => {

        beforeAll(async () => {
            await page.goto(displayUsersUrl);

            const listUserLinkSelector = 'li.nav-item router-link[to="/users"]';
            await page.waitForSelector(listUserLinkSelector, { visible: true });

            const createUserLink = await page.$(listUserLinkSelector);
            await createUserLink.click();
        });

        it('THEN I can see the correct title', async () => {
            const title = 'id="title"'
            await page.waitForSelector(title);
            expect(title).toEqual('Users List');
        });

        it ('THEN I can see the list of users', async () => {
            // Controlla se la lista degli utenti ha almeno un utente
            const hasUsers = await page.evaluate(() => {
                const userListElement = document.getElementById('userList');
                const userListItems = userListElement.querySelectorAll('li');
                return userListItems.length > 0;
            });
            expect(hasUsers).toBe(true);
        });    

        it ('THEN I can see the correct footer', async () => {
            const footer = 'id="infoMessage"'
            await page.waitForSelector(footer);
            expect(footer).toEqual('Please click on a User...');
        });
  
    });
    
  });