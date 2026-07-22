/**
 * CCTS Emission Factor Seeder
 * Seeds default emission factors from Annexure IV and other regulatory sources
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EmissionFactor = require('../models/emissionFactorModel');
const connectDB = require('../config/db');

dotenv.config();

// Default Emission Factors from CCTS Guidelines (Annexure IV) and IPCC
const defaultEmissionFactors = [
    // ==================== FUELS - STATIONARY COMBUSTION ====================
    {
        source: 'Coal - Domestic',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 2.41,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'Annexure IV, CCTS Guidelines 2024',
        ncv: 20.09,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['Cement', 'Steel', 'Thermal Power Plant', 'Textile'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Average emission factor for Indian domestic coal'
    },
    {
        source: 'Coal - Imported',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 2.86,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'Annexure IV, CCTS Guidelines 2024',
        ncv: 25.80,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['Cement', 'Steel', 'Thermal Power Plant'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'Natural Gas',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.0561,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        ncv: 48.0,
        ncvUnit: 'GJ/1000 m³',
        applicableSectors: ['Fertilizer', 'Petrochemical', 'Thermal Power Plant'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Default IPCC emission factor for natural gas'
    },
    {
        source: 'Diesel',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.0741,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        ncv: 43.0,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'Fuel Oil (Furnace Oil)',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.0774,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        ncv: 40.4,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['Textile', 'Cement', 'Steel'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'Petcoke (Petroleum Coke)',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.1003,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        ncv: 32.5,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['Cement', 'Thermal Power Plant'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'LPG (Liquefied Petroleum Gas)',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.0631,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        ncv: 47.3,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'Biomass - Wood',
        category: 'Fuel',
        subCategory: 'Stationary Combustion',
        value: 0.0,
        unit: 'tCO2e/GJ',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines (Carbon Neutral)',
        ncv: 15.6,
        ncvUnit: 'GJ/tonne',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Biomass is considered carbon neutral under IPCC guidelines'
    },

    // ==================== ELECTRICITY (SCOPE 2) ====================
    {
        source: 'Grid Electricity - India Average',
        category: 'Electricity',
        subCategory: 'Purchased Electricity',
        value: 0.82,
        unit: 'tCO2e/MWh',
        scope: 'Scope 2',
        region: 'India',
        referenceDocument: 'CEA CO2 Baseline Database (2023-24)',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2023-04-01'),
        validUntil: new Date('2024-03-31'),
        notes: 'National average grid emission factor for FY 2023-24'
    },
    {
        source: 'Renewable Energy - Solar/Wind',
        category: 'Electricity',
        subCategory: 'Purchased Electricity',
        value: 0.0,
        unit: 'tCO2e/MWh',
        scope: 'Scope 2',
        region: 'India',
        referenceDocument: 'CCTS Guidelines 2024',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Renewable energy from certified sources has zero emissions'
    },

    // ==================== HEAT/STEAM (SCOPE 2) ====================
    {
        source: 'Purchased Steam',
        category: 'Heat',
        subCategory: 'Purchased Heat',
        value: 0.05,
        unit: 'tCO2e/GJ',
        scope: 'Scope 2',
        region: 'India',
        referenceDocument: 'CCTS Guidelines 2024',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Average emission factor for purchased steam/heat'
    },

    // ==================== PROCESS EMISSIONS (SECTOR-SPECIFIC) ====================
    {
        source: 'Limestone - Cement Calcination',
        category: 'Process',
        subCategory: 'Industrial Process',
        value: 0.44,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        applicableSectors: ['Cement'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Process emissions from calcination of limestone in cement production'
    },
    {
        source: 'Soda Ash (Na2CO3) - Process',
        category: 'Process',
        subCategory: 'Industrial Process',
        value: 0.415,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        applicableSectors: ['Glass', 'Chemical'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },

    // ==================== MOBILE COMBUSTION ====================
    {
        source: 'Diesel - Mobile Combustion (Vehicles)',
        category: 'Fuel',
        subCategory: 'Mobile Combustion',
        value: 2.68,
        unit: 'tCO2e/kL',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },
    {
        source: 'Petrol - Mobile Combustion (Vehicles)',
        category: 'Fuel',
        subCategory: 'Mobile Combustion',
        value: 2.31,
        unit: 'tCO2e/kL',
        scope: 'Scope 1',
        region: 'India',
        referenceDocument: 'IPCC 2006 Guidelines',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01')
    },

    // ==================== REFRIGERANTS (SCOPE 1) ====================
    {
        source: 'R-134a (HFC-134a)',
        category: 'Refrigerant',
        subCategory: 'Fugitive Emissions',
        value: 1430,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'Global',
        referenceDocument: 'IPCC 5th Assessment Report (AR5)',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'Global Warming Potential (GWP) = 1430 over 100 years'
    },
    {
        source: 'R-410a (HFC-410a)',
        category: 'Refrigerant',
        subCategory: 'Fugitive Emissions',
        value: 2088,
        unit: 'tCO2e/tonne',
        scope: 'Scope 1',
        region: 'Global',
        referenceDocument: 'IPCC 5th Assessment Report (AR5)',
        applicableSectors: ['All'],
        isDefault: true,
        isApproved: true,
        validFrom: new Date('2024-01-01'),
        notes: 'GWP = 2088'
    }
];

// Seed function
const seedEmissionFactors = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing emission factors...');
        await EmissionFactor.deleteMany({ isDefault: true });

        console.log('📊 Seeding default emission factors...');
        const factors = await EmissionFactor.insertMany(defaultEmissionFactors);

        console.log(`✅ Successfully seeded ${factors.length} emission factors:`);
        console.log('   - Fuels (Stationary): 8');
        console.log('   - Electricity: 2');
        console.log('   - Heat/Steam: 1');
        console.log('   - Process Emissions: 2');
        console.log('   - Mobile Combustion: 2');
        console.log('   - Refrigerants: 2');
        console.log('');
        console.log('📋 Emission factors are now available for CCTS entities');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding emission factors:', error);
        process.exit(1);
    }
};

// Run seeder if executed directly
if (require.main === module) {
    seedEmissionFactors();
}

module.exports = { defaultEmissionFactors, seedEmissionFactors };
