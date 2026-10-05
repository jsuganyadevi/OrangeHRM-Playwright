export const employeeData = {
    firstName: 'Suganya',
    lastName: `Test${Date.now()}`,
};

export const createUniqueEmployeeId = (generatedEmployeeId: string): string => {
    return `${generatedEmployeeId}${Math.floor(100000 + Math.random() * 900000)}`;
}; 