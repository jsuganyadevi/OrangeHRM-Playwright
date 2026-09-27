import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/admin.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.ORANGE_USERNAME;
    const password = process.env.ORANGE_PASSWORD;

    if (!username || !password) {
        throw new Error(
            'ORANGE_USERNAME and ORANGE_PASSWORD must be defined in .env'
        );
    }

    await loginPage.goto();

    await loginPage.login(
        username,
        password
    );

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await page.context().storageState({
        path: authFile
    })

});

