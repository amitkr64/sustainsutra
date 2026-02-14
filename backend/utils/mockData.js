/**
 * Mock Data for Demo Mode
 */

const mockUsers = [
    {
        _id: 'mock-user-123',
        name: 'Demo Admin',
        email: 'admin@sustainsutra.com',
        role: 'admin',
        cctsRole: 'ccts-admin'
    },
    {
        _id: 'mock-user-456',
        name: 'Demo Entity',
        email: 'entity@sustainsutra.com',
        role: 'user',
        cctsRole: 'ccts-entity'
    }
];

const mockEntities = [
    {
        _id: 'mock-entity-1',
        entityName: 'Demo Steel Plant',
        registrationNumber: 'REG-123456',
        sector: 'Iron & Steel',
        subSector: 'Integrated Steel Plant',
        status: 'active',
        user: 'mock-user-456',
        baselineYear: 2020,
        baselineProduction: 1000000,
        baselineGHGIntensity: 2.1,
        targets: [
            { year: 2024, targetGEI: 2.0 },
            { year: 2025, targetGEI: 1.9 }
        ]
    }
];

const mockMonitoringData = [
    {
        _id: 'mock-mon-1',
        entity: 'mock-entity-1',
        reportingPeriod: {
            startDate: '2023-04-01',
            endDate: '2024-03-31',
            complianceYear: 2024
        },
        verificationStatus: 'verified',
        totalGHGEmissions: 1950000,
        totalProduction: 980000,
        ghgEmissionIntensity: 1.98
    }
];

const mockBRSRReports = [
    {
        _id: 'mock-brsr-1',
        entity: 'mock-user-456',
        companyName: 'Demo Steel Plant',
        financialYear: '2023-24',
        status: 'submitted',
        createdAt: new Date().toISOString()
    }
];

const initializeMockData = () => {
    global.mockUsers = mockUsers;
    global.mockEntities = mockEntities;
    global.mockMonitoringData = mockMonitoringData;
    global.mockBRSRReports = mockBRSRReports;
    console.log('✓ Mock data initialized for Demo Mode');
};

module.exports = {
    initializeMockData,
    mockUsers,
    mockEntities,
    mockMonitoringData,
    mockBRSRReports
};
