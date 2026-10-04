import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly pimMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
    }

    async verifyDashboard() {
        await Logger.operation('verify the Dashboard is displayed', () =>
            expect(this.dashboardHeading).toBeVisible()
        );
    }

    async navigateToPIM() {
        await Logger.operation('navigate to the PIM module', () =>
            this.pimMenu.click()
        );
    }

}