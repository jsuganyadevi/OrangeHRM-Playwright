import { Page, Locator, expect } from '@playwright/test';

export class EmployeeList {
    readonly page: Page;
    readonly employeeIdInput: Locator;
    readonly searchButton: Locator;
    readonly recordFound: Locator;
    readonly confirmDeleteButton: Locator;




    constructor(page: Page) {
        this.page = page;
        this.employeeIdInput = page
            .locator('div.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.searchButton = page.getByRole('button', {
            name: 'Search'
        });

        this.recordFound = page.getByText('(1) Record Found');

        this.confirmDeleteButton = this.page.getByRole('button', {
            name: 'Yes, Delete'
        });

    }

    private getEmployeeRow(
        employeeId: string,
        firstName: string,
        lastName: string
    ) {
        return this.page
            .locator('.oxd-table-card')
            .filter({ hasText: employeeId })
            .filter({ hasText: firstName })
            .filter({ hasText: lastName });
    }

    async searchEmployee(employeeId: string) {
        await this.employeeIdInput.fill(employeeId);
        await this.searchButton.click();
    }

    async verifyEmployeeFound() {
        await expect(this.recordFound).toBeVisible();
    }

    async verifyEmployee(
        employeeId: string,
        firstName: string,
        lastName: string
    ) {
        const employeeRow = this.getEmployeeRow(
            employeeId,
            firstName,
            lastName
        );

        await expect(employeeRow).toBeVisible();
    }

    async deleteEmployee(
        employeeId: string,
        firstName: string,
        lastName: string
    ) {
        const employeeRow = this.getEmployeeRow(
            employeeId,
            firstName,
            lastName
        );

        await employeeRow
            .locator('button')
            .filter({ has: this.page.locator('i.bi-trash') })
            .click();
        await this.confirmDeleteButton.click();

    }

    async verifyEmployeeDeleted() {
        await expect(
            this.page.locator('span').filter({
                hasText: /^No Records Found$/
            })
        ).toBeVisible();
    }

    async cleanupEmployee(
        employeeId: string,
        firstName: string,
        lastName: string
    ) {
        try {
            await this.employeeIdInput.fill(employeeId);
            await this.searchButton.click();

            const employeeRow = this.getEmployeeRow(
                employeeId,
                firstName,
                lastName
            );

            if (await employeeRow.count() === 0) {
                return;
            }

            await employeeRow
                .locator('button')
                .filter({ has: this.page.locator('i.bi-trash') })
                .click();

            await this.confirmDeleteButton.click();

        } catch (error) {
            console.log('Cleanup could not delete employee:', error);
        }
    }

}