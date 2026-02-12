/**
 * Emission Factor Categories Configuration
 * Provides user-friendly names, descriptions, and visual indicators for emission factor categories
 */

export const CATEGORY_CONFIG = {
    fuels: {
        id: 'fuels',
        name: 'Stationary Combustion',
        shortName: 'Fuels',
        description: 'Heating, boilers, furnaces, and process heat',
        icon: 'flame',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        examples: [
            'Natural gas for heating',
            'Diesel generators',
            'Coal boilers',
            'LPG for cooking',
            'Fuel oil for industrial processes'
        ],
        subcategories: {
            'natural gas': 'Natural Gas',
            'diesel': 'Diesel',
            'coal': 'Coal',
            'lpg': 'LPG/Propane',
            'fuel oil': 'Fuel Oil',
            'kerosene': 'Kerosene',
            'petrol': 'Petrol/Gasoline',
            'biomass': 'Biomass',
            'other': 'Other Fuels'
        }
    },
    electricity: {
        id: 'electricity',
        name: 'Grid Electricity',
        shortName: 'Electricity',
        description: 'Power consumption from electrical grid',
        icon: 'zap',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        examples: [
            'Office electricity consumption',
            'Industrial power usage',
            'Data center energy',
            'Lighting and appliances',
            'Electric vehicle charging'
        ],
        subcategories: {
            'grid': 'National Grid',
            'regional': 'Regional Grid',
            'renewable': 'Renewable Mix',
            'imported': 'Imported Power',
            'other': 'Other Sources'
        }
    },
    transport: {
        id: 'transport',
        name: 'Transportation',
        shortName: 'Transport',
        description: 'Road, rail, air, and maritime freight & travel',
        icon: 'truck',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        examples: [
            'Company vehicle fleet',
            'Business travel flights',
            'Employee commuting',
            'Freight and logistics',
            'Public transport usage'
        ],
        subcategories: {
            'passenger': 'Passenger Vehicles',
            'freight': 'Freight & Logistics',
            'air': 'Air Travel',
            'rail': 'Rail Transport',
            'maritime': 'Maritime Shipping',
            'public': 'Public Transport'
        }
    },
    industrial: {
        id: 'industrial',
        name: 'Industrial Processes',
        shortName: 'Industrial',
        description: 'Manufacturing, cement, steel, and chemical processes',
        icon: 'factory',
        color: 'text-slate-500',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/20',
        examples: [
            'Cement production',
            'Steel manufacturing',
            'Aluminum smelting',
            'Chemical production',
            'Glass manufacturing'
        ],
        subcategories: {
            'cement': 'Cement',
            'steel': 'Steel & Iron',
            'aluminum': 'Aluminum',
            'chemicals': 'Chemicals',
            'glass': 'Glass',
            'paper': 'Paper & Pulp',
            'other': 'Other Processes'
        }
    },
    waste: {
        id: 'waste',
        name: 'Waste Management',
        shortName: 'Waste',
        description: 'Landfill, wastewater, and waste treatment',
        icon: 'trash-2',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        examples: [
            'Landfill disposal',
            'Wastewater treatment',
            'Composting',
            'Incineration',
            'Recycling processes'
        ],
        subcategories: {
            'landfill': 'Landfill',
            'wastewater': 'Wastewater',
            'incineration': 'Incineration',
            'composting': 'Composting',
            'recycling': 'Recycling',
            'other': 'Other Waste'
        }
    },
    agriculture: {
        id: 'agriculture',
        name: 'Agriculture & Forestry',
        shortName: 'Agriculture',
        description: 'Livestock, crops, fertilizers, and land use',
        icon: 'leaf',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        examples: [
            'Livestock emissions',
            'Rice cultivation',
            'Synthetic fertilizers',
            'Manure management',
            'Agricultural soils'
        ],
        subcategories: {
            'livestock': 'Livestock',
            'crops': 'Crop Production',
            'fertilizers': 'Fertilizers',
            'manure': 'Manure Management',
            'soils': 'Agricultural Soils',
            'other': 'Other Agriculture'
        }
    },
    refrigerants: {
        id: 'refrigerants',
        name: 'Refrigeration & AC',
        shortName: 'Refrigerants',
        description: 'Air conditioning, refrigeration, and cooling systems',
        icon: 'snowflake',
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        examples: [
            'Building HVAC systems',
            'Commercial refrigeration',
            'Vehicle air conditioning',
            'Industrial cooling',
            'Heat pump systems'
        ],
        subcategories: {
            'hfc': 'HFCs',
            'hcfc': 'HCFCs',
            'natural': 'Natural Refrigerants',
            'other': 'Other Refrigerants'
        }
    },
    other: {
        id: 'other',
        name: 'Other Sources',
        shortName: 'Other',
        description: 'Miscellaneous emission sources',
        icon: 'more-horizontal',
        color: 'text-gray-500',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-500/20',
        examples: [
            'Fugitive emissions',
            'Process emissions',
            'Specialty chemicals',
            'Research activities',
            'Other sources'
        ]
    }
};

/**
 * Get category configuration by ID
 */
export const getCategoryConfig = (categoryId) => {
    return CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.other;
};

/**
 * Get all categories as array for iteration
 */
export const getAllCategories = () => {
    return Object.values(CATEGORY_CONFIG);
};

/**
 * Get subcategory display name
 */
export const getSubcategoryName = (categoryId, subcategoryId) => {
    const category = CATEGORY_CONFIG[categoryId];
    if (!category || !category.subcategories) {
        return subcategoryId;
    }
    return category.subcategories[subcategoryId] || subcategoryId;
};

/**
 * Get gas type display name
 */
export const GAS_CONFIG = {
    'CO2': { name: 'Carbon Dioxide', formula: 'CO₂', color: 'gray' },
    'CH4': { name: 'Methane', formula: 'CH₄', color: 'blue' },
    'N2O': { name: 'Nitrous Oxide', formula: 'N₂O', color: 'purple' },
    'HFCs': { name: 'Hydrofluorocarbons', formula: 'HFCs', color: 'cyan' },
    'PFCs': { name: 'Perfluorocarbons', formula: 'PFCs', color: 'teal' },
    'SF6': { name: 'Sulfur Hexafluoride', formula: 'SF₆', color: 'green' },
    'NF3': { name: 'Nitrogen Trifluoride', formula: 'NF₃', color: 'indigo' },
    'CO2e': { name: 'Carbon Dioxide Equivalent', formula: 'CO₂e', color: 'orange' },
    'NOx': { name: 'Nitrogen Oxides', formula: 'NOₓ', color: 'red' },
    'CO': { name: 'Carbon Monoxide', formula: 'CO', color: 'rose' },
    'NMVOC': { name: 'Non-Methane VOC', formula: 'NMVOC', color: 'amber' },
    'OTHER': { name: 'Other Gases', formula: 'Other', color: 'gray' }
};

/**
 * Get gas configuration by ID
 */
export const getGasConfig = (gasId) => {
    return GAS_CONFIG[gasId] || GAS_CONFIG.OTHER;
};

/**
 * Common emission factors for quick access
 */
export const COMMON_FACTORS = [
    {
        efId: 'IND-GRID-2024',
        name: 'India National Grid Electricity',
        category: 'electricity',
        subcategory: 'grid',
        value: 0.82,
        unit: 'kgCO2e/kWh',
        region: 'India',
        description: 'Average emission factor for Indian national electricity grid',
        isCommon: true
    },
    {
        efId: 'NATURAL-GAS-2024',
        name: 'Natural Gas (Stationary Combustion)',
        category: 'fuels',
        subcategory: 'natural gas',
        value: 2.01,
        unit: 'kgCO2e/m³',
        region: 'Global',
        description: 'Natural gas for heating and industrial processes',
        isCommon: true
    },
    {
        efId: 'DIESEL-2024',
        name: 'Diesel Fuel',
        category: 'fuels',
        subcategory: 'diesel',
        value: 2.68,
        unit: 'kgCO2e/liter',
        region: 'Global',
        description: 'Diesel for vehicles and generators',
        isCommon: true
    },
    {
        efId: 'PETROL-2024',
        name: 'Petrol/Gasoline',
        category: 'fuels',
        subcategory: 'petrol',
        value: 2.31,
        unit: 'kgCO2e/liter',
        region: 'Global',
        description: 'Petrol for passenger vehicles',
        isCommon: true
    },
    {
        efId: 'LPG-2024',
        name: 'LPG/Propane',
        category: 'fuels',
        subcategory: 'lpg',
        value: 1.52,
        unit: 'kgCO2e/kg',
        region: 'Global',
        description: 'LPG for cooking and heating',
        isCommon: true
    }
];
