import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class EmployeeForm {
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
        await Logger.operation('enter employee details', async () => {
            await this.firstNameInput.fill(firstName);
            await this.middleNameInput.fill(middleName);
            await this.lastNameInput.fill(lastName);
        });
    }

    async setEmployeeID(employeeId: string) {
        await Logger.operation('set a unique employee ID', () =>
            this.employeeIdInput.fill(employeeId)
        );
    }

    async getEmployeeID() {
        return Logger.operation(
            'read the generated employee ID',
            () => this.employeeIdInput.inputValue()
        );
    }

    async saveEmployee() {
        await Logger.operation('save the employee record', () =>
            this.saveButton.click()
        );
    }

}