import {Page,Locator} from '@playwright/test';

export class EmployeeForm{
     readonly page: Page;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByRole('textbox', {
            name: 'First Name'
        });

        this.middleNameInput = page.getByRole('textbox', {
            name: 'Middle Name'
        });

        this.lastNameInput = page.getByRole('textbox', {
            name: 'Last Name'
        });

        this.employeeIdInput = page.locator('div.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');

        this.saveButton = page.getByRole('button', {
            name: 'Save'
        });
    }

    async enterEmployeeDetails(
        firstName: string,
        middleName: string,
        lastName: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
    }

    async getEmployeeID():Promise<string>{
         return await this.employeeIdInput.inputValue();
    }

    async saveEmployee() {
        await this.saveButton.click();
    }

}