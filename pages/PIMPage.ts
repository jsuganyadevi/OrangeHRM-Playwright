import {Page,Locator,expect} from '@playwright/test';

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
        await expect(this.pimHeading).toBeVisible();
    }
   
    async navigateToAddEmployee() {
        await this.addButton.click();
    }
    
}