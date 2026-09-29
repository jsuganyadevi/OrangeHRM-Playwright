import { test as base } from '@playwright/test';

import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { EmployeeForm } from '../components/EmployeeForm';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';
import { EmployeeList } from '../components/EmployeeList';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    pimPage: PIMPage;
    employeeForm: EmployeeForm;
    employeeDetailsPage: EmployeeDetailsPage;
    employeeList: EmployeeList;
};

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    pimPage: async ({ page }, use) => {
        await use(new PIMPage(page));
    },

    employeeForm: async ({ page }, use) => {
        await use(new EmployeeForm(page));
    },

    employeeDetailsPage: async ({ page }, use) => {
        await use(new EmployeeDetailsPage(page));
    },

    employeeList: async ({ page }, use) => {
        await use(new EmployeeList(page));
    },
});

export { expect } from '@playwright/test';