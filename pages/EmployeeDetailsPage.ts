import {Page,Locator,expect} from '@playwright/test';

export class EmployeeDetailsPage{
    readonly page: Page;

    readonly successMessage: Locator;
    readonly personalDetailsHeading: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.successMessage = page.getByText('Successfully Saved');

        this.personalDetailsHeading = page.getByRole('heading', {
            name: 'Personal Details'
        });

        this.firstNameInput = page.getByRole('textbox', {
            name: 'First Name'
        });

        this.lastNameInput = page.getByRole('textbox', {
            name: 'Last Name'
        });

        this.employeeIdInput = page.locator('div.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

    async verifyEmployeeDetails(
        firstName: string,
        lastName: string,
        employeeId: string
    ) {
        await expect(this.personalDetailsHeading).toBeVisible({
            timeout: 15000
        });

        await expect(this.firstNameInput).toHaveValue(firstName);

        await expect(this.lastNameInput).toHaveValue(lastName);

        await expect(this.employeeIdInput).toHaveValue(employeeId);
    } 

        async verifyEmployeeDetailsUrl() {
        await expect(this.page).toHaveURL(
            /\/pim\/viewPersonalDetails\/empNumber\/\d+$/
        );
    }


}