import { Page, Locator, expect } from '@playwright/test';

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
        await expect(this.dashboardHeading).toBeVisible();
    }

    async navigateToPIM() {
        await this.pimMenu.click();
    }

}