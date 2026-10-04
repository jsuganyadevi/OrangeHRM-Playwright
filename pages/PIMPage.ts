import {Page,Locator,expect} from '@playwright/test';
import { Logger } from '../utils/Logger';

export class PIMPage{
    readonly page : Page;
    readonly pimHeading: Locator;
    readonly addButton: Locator;



    constructor(page:Page){
        this.page = page;
        this.pimHeading = page.getByRole('heading' ,{name: 'PIM'});
        this.addButton = page.getByRole('button' ,{name: 'Add'});
    }

    async verifyPIMPage() {
        await Logger.operation('verify the PIM page is displayed', () =>
            expect(this.pimHeading).toBeVisible()
        );
    }
   
    async navigateToAddEmployee() {
        await Logger.operation('open the Add Employee form', () =>
            this.addButton.click()
        );
    }
    
}