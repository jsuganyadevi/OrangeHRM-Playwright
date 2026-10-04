import { expect, test as setup } from '../fixtures/testFixtures';
import { Logger } from '../utils/Logger';


const authFile = 'playwright/.auth/admin.json';

setup('authenticate', async ({ loginPage, page }) => {

    const username = process.env.ORANGE_USERNAME;
    const password = process.env.ORANGE_PASSWORD;

    if (!username || !password) {
        throw new Error(
            'ORANGE_USERNAME and ORANGE_PASSWORD must be set as environment variables'
        );
    }

    await loginPage.goto();

    await loginPage.login(
        username,
        password
    );

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    Logger.info('Authentication succeeded; Dashboard is visible.');

    await Logger.operation('save the authenticated browser state', () =>
        page.context().storageState({ path: authFile })
    );

});
