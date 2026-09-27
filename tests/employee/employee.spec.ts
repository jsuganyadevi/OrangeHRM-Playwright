import { expect, test } from '../../fixtures/testFixtures';
import { employeeData } from '../../test-data/employeeData';

let employeeId = '';
let employeeCreated = false;

test.afterEach(async ({ page, employeeList }, testInfo,) => {
    try {
        // Cleanup only when the test fails
        if (testInfo.status === testInfo.expectedStatus || !employeeId) {
            return;
        }

        await page.goto('/pim/viewEmployeeList', {
            waitUntil: 'commit',
            timeout: 30000
        });

        await employeeList.employeeIdInput.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await employeeList.cleanupEmployee(
            employeeId,
            employeeData.firstName,
            employeeData.lastName
        );

    } catch (error) {
        console.log('Test cleanup failed:', error);
    } finally {
        employeeId = '';
        employeeCreated = false;
    }
});

test('Verify complete employee workflow', async ({
    page,
    dashboardPage,
    pimPage,
    employeeForm,
    employeeDetailsPage,
    employeeList
}) => {

    await page.goto('/');

    await dashboardPage.verifyDashboard();

    await dashboardPage.navigateToPIM();

    await pimPage.verifyPIMPage();

    await pimPage.navigateToAddEmployee();

    await employeeForm.enterEmployeeDetails(
        employeeData.firstName,
        '',
        employeeData.lastName
    );

    employeeId = await employeeForm.getEmployeeID();

    await employeeForm.saveEmployee();

    await employeeDetailsPage.verifySuccessMessage();

    await employeeDetailsPage.verifyEmployeeDetailsUrl();

    await employeeDetailsPage.verifyEmployeeDetails(
        employeeData.firstName,
        employeeData.lastName,
        employeeId
    );

    await dashboardPage.navigateToPIM();

    await employeeList.searchEmployee(employeeId);

    await employeeList.verifyEmployeeFound();

    await employeeList.verifyEmployee(
        employeeId,
        employeeData.firstName,
        employeeData.lastName
    );

    await employeeList.deleteEmployee(employeeId,
        employeeData.firstName,
        employeeData.lastName);

    await employeeList.searchEmployee(employeeId);

    await employeeList.verifyEmployeeDeleted();
});



