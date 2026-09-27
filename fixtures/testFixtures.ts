import { test as base } from '@playwright/test';

import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { EmployeeForm } from '../components/EmployeeForm';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';
import { EmployeeList } from '../components/EmployeeList';

type Fixtures = {
    dashboardPage: DashboardPage;
    pimPage: PIMPage;
    employeeForm: EmployeeForm;
    employeeDetailsPage: EmployeeDetailsPage;
    employeeList: EmployeeList;
};

export const test = base.extend<Fixtures>({
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