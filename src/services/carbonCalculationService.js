// Carbon Calculation Service - Handles carbon footprint calculations

const CALCULATIONS_KEY = 'sustainsutra_calculations';

// Scope 3 Categories (all 15)
export const scope3Categories = [
    { id: 'cat1', name: 'Category 1: Purchased Goods and Services' },
    { id: 'cat2', name: 'Category 2: Capital Goods' },
    { id: 'cat3', name: 'Category 3: Fuel and Energy Related Activities' },
    { id: 'cat4', name: 'Category 4: Upstream Transportation and Distribution' },
    { id: 'cat5', name: 'Category 5: Waste Generated in Operations' },
    { id: 'cat6', name: 'Category 6: Business Travel' },
    { id: 'cat7', name: 'Category 7: Employee Commuting' },
    { id: 'cat8', name: 'Category 8: Upstream Leased Assets' },
    { id: 'cat9', name: 'Category 9: Downstream Transportation and Distribution' },
    { id: 'cat10', name: 'Category 10: Processing of Sold Products' },
    { id: 'cat11', name: 'Category 11: Use of Sold Products' },
    { id: 'cat12', name: 'Category 12: End-of-Life Treatment of Sold Products' },
    { id: 'cat13', name: 'Category 13: Downstream Leased Assets' },
    { id: 'cat14', name: 'Category 14: Franchises' },
    { id: 'cat15', name: 'Category 15: Investments' }
];

export const carbonCalculationService = {
    // Calculate emissions for a single activity
    calculateActivity: (quantity, emissionFactor) => {
        // If value is already in CO2e terms, use it directly
        if (emissionFactor.unit?.includes('CO2e') || emissionFactor.gas === 'CO2e') {
            return quantity * emissionFactor.value;
        }
        // Otherwise, convert to CO2e using GWP
        return quantity * emissionFactor.value * (emissionFactor.gwp || 1) / 100;
    },

    // Calculate total for a scope
    calculateScope: (activities) => {
        return activities.reduce((total, activity) => {
            return total + carbonCalculationService.calculateActivity(
                activity.quantity,
                activity.emissionFactor
            );
        }, 0);
    },

    // Calculate complete carbon footprint with gas breakdown
    calculateFootprint: (data) => {
        const scope1Total = data.scope1 ? carbonCalculationService.calculateScope(data.scope1) : 0;
        const scope2Total = data.scope2 ? carbonCalculationService.calculateScope(data.scope2) : 0;
        const scope3Total = data.scope3 ? carbonCalculationService.calculateScope(data.scope3) : 0;

        // Calculate gas breakdown for each scope
        const scope1GasBreakdown = carbonCalculationService.calculateGasBreakdown(data.scope1 || []);
        const scope2GasBreakdown = carbonCalculationService.calculateGasBreakdown(data.scope2 || []);
        const scope3GasBreakdown = carbonCalculationService.calculateGasBreakdown(data.scope3 || []);

        return {
            scope1: scope1Total,
            scope2: scope2Total,
            scope3: scope3Total,
            total: scope1Total + scope2Total + scope3Total,
            gasBreakdown: {
                scope1: scope1GasBreakdown,
                scope2: scope2GasBreakdown,
                scope3: scope3GasBreakdown
            },
            breakdown: {
                scope1Activities: data.scope1 || [],
                scope2Activities: data.scope2 || [],
                scope3Activities: data.scope3 || []
            }
        };
    },

    // Save calculation
    saveCalculation: (userEmail, calculationData, metadata = {}) => {
        const calculations = JSON.parse(localStorage.getItem(CALCULATIONS_KEY) || '[]');

        const newCalculation = {
            id: `calc-${Date.now()}`,
            userEmail: userEmail || 'guest',
            data: calculationData,
            result: carbonCalculationService.calculateFootprint(calculationData),
            metadata: {
                organizationName: metadata.organizationName || '',
                reportingPeriod: metadata.reportingPeriod || '',
                ...metadata
            },
            createdAt: new Date().toISOString()
        };

        calculations.push(newCalculation);
        localStorage.setItem(CALCULATIONS_KEY, JSON.stringify(calculations));
        return newCalculation;
    },

    // Get user calculations
    getUserCalculations: (userEmail) => {
        const calculations = JSON.parse(localStorage.getItem(CALCULATIONS_KEY) || '[]');
        return calculations.filter(c => c.userEmail === userEmail);
    },

    // Get calculation by ID
    getCalculationById: (id) => {
        const calculations = JSON.parse(localStorage.getItem(CALCULATIONS_KEY) || '[]');
        return calculations.find(c => c.id === id);
    },

    // Delete calculation
    deleteCalculation: (id) => {
        const calculations = JSON.parse(localStorage.getItem(CALCULATIONS_KEY) || '[]');
        const filtered = calculations.filter(c => c.id !== id);
        localStorage.setItem(CALCULATIONS_KEY, JSON.stringify(filtered));
        return true;
    },

    // Generate PDF report data (for paid feature)
    generateReportData: (calculation) => {
        const { result, metadata } = calculation;

        return {
            summary: {
                total: result.total,
                scope1: result.scope1,
                scope2: result.scope2,
                scope3: result.scope3,
                scope1Percentage: (result.scope1 / result.total * 100).toFixed(1),
                scope2Percentage: (result.scope2 / result.total * 100).toFixed(1),
                scope3Percentage: (result.scope3 / result.total * 100).toFixed(1)
            },
            metadata: metadata,
            breakdown: result.breakdown,
            recommendations: carbonCalculationService.generateRecommendations(result),
            generatedAt: new Date().toISOString()
        };
    },

    // Generate recommendations based on results
    generateRecommendations: (result) => {
        const recommendations = [];
        const total = result.total;

        // Scope 1 recommendations
        if (result.scope1 / total > 0.3) {
            recommendations.push({
                scope: 'Scope 1',
                priority: 'High',
                recommendation: 'Consider switching to renewable energy sources for stationary combustion and transitioning fleet to electric vehicles.'
            });
        }

        // Scope 2 recommendations
        if (result.scope2 / total > 0.4) {
            recommendations.push({
                scope: 'Scope 2',
                priority: 'High',
                recommendation: 'Invest in on-site renewable energy generation or purchase renewable energy certificates (RECs).'
            });
        }

        // Scope 3 recommendations
        if (result.scope3 / total > 0.5) {
            recommendations.push({
                scope: 'Scope 3',
                priority: 'Medium',
                recommendation: 'Engage with suppliers to reduce upstream emissions and optimize logistics and business travel.'
            });
        }

        // General recommendations
        recommendations.push({
            scope: 'General',
            priority: 'Medium',
            recommendation: 'Set science-based targets aligned with the Paris Agreement and establish a net-zero roadmap.'
        });

        return recommendations;
    },

    // Format number for display
    formatEmissions: (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)} Mt CO₂e`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(2)} t CO₂e`;
        } else {
            return `${value.toFixed(2)} kg CO₂e`;
        }
    }
};
