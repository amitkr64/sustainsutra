# BRSR Data Integration Analysis

## Executive Summary

This document provides a comprehensive analysis of static data usage in the BRSR Analysis module, NIC code data integration, emission factor database integration, and recommendations for removing demo data and connecting to the real database.

---

## 1. Static Data in BRSR Analysis

### Current State

The BRSR Analysis module currently uses demo data when the application runs in demo mode (`global.isDemoMode`).

#### Demo Data Location
- **File**: `backend/server.js` (lines 13-340)
- **Global Variable**: `global.mockBRSRAnalysis`

#### Demo Data Structure
```javascript
global.mockBRSRAnalysis = [
  {
    _id: 'mock-1',
    companyName: 'SustainSutra Technologies Pvt Ltd',
    cin: 'U72900KA2021PTC123456',
    financialYear: '2023-24',
    esgScore: 78,
    indicators: { /* extensive BRSR indicators */ },
    metrics: { /* calculated metrics */ },
    dataQuality: { /* data quality scores */ },
    greenwashing: { /* risk assessment */ },
    decarbonization: { /* targets, trends, initiatives */ },
    // ... more mock reports
  }
];
```

#### Controllers Using Demo Data
1. **brsrAnalysisController.js** (lines 29-40, 82-84, 101-104)
   - `uploadXBRL()` - Returns mock report when in demo mode
   - `getAnalysisReports()` - Returns `global.mockBRSRAnalysis`
   - `getComparison()` - Filters mock reports by IDs

### Frontend Components Displaying Static Data

#### OverviewContainer.jsx
- **Location**: `src/components/BRSRAnalysis/BRSROverview/OverviewContainer.jsx`
- **Static Elements**:
  - Hardcoded certifications (lines 13-18)
  - Static industry benchmark values (lines 145-149)
  - Fixed ESG score calculation logic

#### BRSRAnalysisDashboard.jsx
- **Location**: `src/pages/BRSRAnalysisDashboard.jsx`
- **Static Elements**:
  - Theme color definitions (lines 24-38)
  - Chart configurations
  - Data quality thresholds

---

## 2. NIC Code Data Integration

### Available NIC Code Database

#### Files
1. **Full Database**: `nic_database_full.json` (root directory)
2. **Frontend Database**: `src/constants/nic_database.json` (10,431 lines)
3. **Extracted Text**: `nic_extracted.txt`
4. **PDF Reference**: `NIC_Sector.pdf`

#### NIC Database Structure
```json
{
  "sections": [
    {
      "id": "A",
      "description": "Agriculture, forestry and fishing",
      "divisions": [
        {
          "id": "01",
          "description": "Crop and animal production...",
          "groups": [
            {
              "id": "011",
              "description": "Growing of non-perennial crops",
              "classes": [
                {
                  "id": "0111",
                  "description": "Growing of cereals...",
                  "subclasses": [
                    {
                      "id": "01111",
                      "description": "Growing of wheat"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Current NIC Code Integration

#### XBRL Parser (brsrXBRLParser.js)
- **Location**: `backend/utils/brsrXBRLParser.js` (lines 273-312)
- **Method**: `extractSectorFromCIN(cin)`
- **Issue**: Uses a limited hardcoded mapping (only ~30 NIC codes)

```javascript
const nicMapping = {
    '10100': 'Trading',
    '10101': 'Wholesale Trading', '10102': 'Retail Trading',
    '10200': 'Manufacturing',
    // ... limited mapping
};
```

#### NIC Selector Component
- **Location**: `src/components/BRSRShared/NICSelector.jsx`
- **Status**: ✅ Uses full NIC database from `src/constants/nic_database.json`
- **Functionality**:
  - Search by NIC code or description
  - Browse by section
  - Returns selected NIC code

### Industry Sector Mapping

#### BRSR Analysis Model
```javascript
{
    sector: { type: String, default: 'General' },
    industry: { type: String }
}
```

#### Data Flow
1. XBRL file uploaded
2. Parser extracts CIN (Corporate Identity Number)
3. Parser extracts NIC code from CIN (6-digit code)
4. Parser maps NIC code to industry sector
5. Report stored with sector and industry fields

---

## 3. Emission Factor Database Integration

### Available Emission Factor Data

#### Files
1. **Excel Files**: 
   - `EFDB_output.xlsx`
   - `EFDB_output (1).xlsx`
2. **Static JavaScript**: `src/constants/emissionFactors.js` (403 lines)
3. **Database Model**: `backend/models/emissionFactorModel.js`
4. **Seeder Script**: `backend/scripts/seedEmissionFactors.js`

#### Emission Factor Model Schema
```javascript
{
    efId: String,              // Unique ID (e.g., "IND-GRID-2024")
    category: String,          // fuels, electricity, transport, etc.
    subcategory: String,
    name: String,
    gas: String,              // CO2, CH4, N2O, etc.
    value: Number,
    unit: String,
    description: String,
    source: String,            // IPCC EFDB
    ipccCategory: String,
    region: String,
    year: Number,
    gwp: Number,              // Global Warming Potential
    tags: [String],
    metadata: Object,
    isActive: Boolean
}
```

### Static Emission Factors (src/constants/emissionFactors.js)

#### Structure
```javascript
export const EMISSION_FACTORS = {
    fuels: {
        coal: { name: 'Coal (Generic)', co2: 2.42, ch4: 0.001, n2o: 0.00015, unit: 'kg fuel', source: 'IPCC 2006 Guidelines' },
        // ... more fuels
    },
    electricity: {
        // ... electricity factors
    },
    transport: {
        // ... transport factors
    }
};
```

### Database Integration

#### Emission Factor Service
- **Location**: `src/services/emissionFactorService.js`
- **API Endpoints**:
  - `GET /api/emission-factors` - Get all factors with pagination
  - `GET /api/emission-factors/search` - Full-text search
  - `GET /api/emission-factors/categories` - Get categories
  - `GET /api/emission-factors/:id` - Get by MongoDB ID
  - `GET /api/emission-factors/ef/:efId` - Get by EFDB ID
  - `GET /api/emission-factors/curated/:type` - Get curated sets

#### Emission Factor Controller
- **Location**: `backend/controllers/emissionFactorController.js`
- **Features**:
  - Full-text search with MongoDB text indexes
  - Category and subcategory filtering
  - Region-specific factors
  - Curated factor sets for BRSR, carbon calculator, etc.

---

## 4. Demo Mode Implementation

### Demo Mode Activation

#### Database Connection (backend/config/db.js)
```javascript
const connectDB = async (retryCount = 2) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ MongoDB Connected');
        global.isDemoMode = false;  // ✅ Real database
    } catch (error) {
        console.warn('⚠ WARNING: Entering [DEMO MODE]');
        global.isDemoMode = true;   // ⚠️ Demo mode
    }
};
```

### Controllers with Demo Mode Checks

| Controller | Demo Mode Check | Lines |
|------------|----------------|-------|
| brsrAnalysisController | `global.isDemoMode` | 29, 82, 101 |
| teamController | `global.isDemoMode` | 8, 21, 48, 79 |
| cctsEntityController | `global.isDemoMode` | 13, 56, 82, 115, 202, 252, 321, 338, 436 |
| registrationController | `global.isDemoMode` | 14, 69, 105, 136 |
| resourceController | `global.isDemoMode` | 10, 25 |
| newsletterController | `global.isDemoMode` | 8, 21, 46 |
| userController | `global.isDemoMode` | 23, 115 |
| courseController | `global.isDemoMode` | 149, 164, 179, 199, 217, 243 |
| blogController | `global.isDemoMode` | 10, 21, 39, 69, 102 |
| monitoringController | `global.isDemoMode` | 14, 71, 111 |
| brsrMasterReportController | `global.isDemoMode` | 8, 20, 45, 77, 113 |
| appointmentController | `global.isDemoMode` | 11, 24, 51 |

---

## 5. Recommendations

### 5.1 Remove Demo Data

#### Immediate Actions
1. **Remove mock data arrays from `server.js`** (lines 13-340)
2. **Remove demo mode checks from controllers**
3. **Require MongoDB connection for production**

### 5.2 Enhance NIC Code Integration

#### Actions Required
1. **Create NIC code lookup service**
   - Load full NIC database into MongoDB
   - Create API endpoint for NIC code lookup
   - Update XBRL parser to use database instead of hardcoded mapping

2. **Industry Sector Mapping**
   - Use full NIC database for accurate sector classification
   - Map 5-digit NIC codes to industry sectors
   - Store full NIC code information in BRSR reports

### 5.3 Emission Factor Database

#### Actions Required
1. **Import Excel files to MongoDB**
   - Use `scripts/process_efdb.py` to parse Excel files
   - Seed emission factors to database
   - Create indexes for performance

2. **Update frontend to use database**
   - Replace static `emissionFactors.js` with API calls
   - Cache emission factors for performance
   - Implement real-time updates

### 5.4 Database Connection Requirements

#### Environment Variables
```env
MONGO_URI=mongodb://localhost:27017/sustainsutra
NODE_ENV=production
```

#### Database Collections Needed
1. `users` - User authentication
2. `brsranalyses` - BRSR analysis reports
3. `emissionfactors` - Emission factor database
4. `niccodes` - NIC code database (optional, can use static file)
5. `brsrmasterreports` - BRSR master reports
6. `cctsentities` - CCTS entities
7. `teams` - Team members
8. `blogs` - Blog posts
9. `resources` - Resources
10. `appointments` - Appointments
11. `courses` - Courses
12. `newsletters` - Newsletter subscribers
13. `monitoringdata` - Monitoring data
14. `carboncreditbalances` - Carbon credit balances
15. `offsetprojects` - Offset projects
16. `verificationreports` - Verification reports

---

## 6. Implementation Priority

### Phase 1: Critical (Immediate)
- [ ] Remove demo data from `server.js`
- [ ] Remove demo mode checks from BRSR analysis controller
- [ ] Ensure MongoDB connection is required
- [ ] Import emission factors from Excel to MongoDB

### Phase 2: High Priority
- [ ] Update NIC code extraction to use full database
- [ ] Create NIC code lookup API endpoint
- [ ] Update frontend to use emission factor API
- [ ] Remove static emission factors file

### Phase 3: Medium Priority
- [ ] Remove demo mode checks from other controllers
- [ ] Create database seeding scripts
- [ ] Implement data validation
- [ ] Add error handling for database failures

### Phase 4: Low Priority
- [ ] Add database monitoring
- [ ] Implement caching strategies
- [ ] Create database backup procedures
- [ ] Add performance optimization

---

## 7. Data Flow Diagrams

### BRSR Report Upload Flow
```
User Uploads XBRL File
    ↓
uploadXBRL() Controller
    ↓
brsrXBRLParser.parseXBRL()
    ↓
Extract Indicators
    ↓
Extract CIN → Extract NIC Code → Map to Industry Sector
    ↓
Calculate Metrics & ESG Score
    ↓
Save to MongoDB (BRSRAnalysis Model)
    ↓
Return Report to Frontend
```

### Emission Factor Lookup Flow
```
Frontend Request
    ↓
emissionFactorService.getFactors()
    ↓
API: /api/emission-factors
    ↓
emissionFactorController.getEmissionFactors()
    ↓
EmissionFactor.searchFactors()
    ↓
MongoDB Query with Filters
    ↓
Return Factors to Frontend
```

### NIC Code Lookup Flow
```
CIN Extracted from XBRL
    ↓
extractSectorFromCIN()
    ↓
Extract 6-digit NIC Code
    ↓
Lookup in NIC Database
    ↓
Return Industry Sector
```

---

## 8. Testing Checklist

### BRSR Analysis
- [ ] Upload XBRL file successfully
- [ ] Parse all indicators correctly
- [ ] Extract CIN and map to industry sector
- [ ] Calculate metrics accurately
- [ ] Store report in MongoDB
- [ ] Retrieve report from database
- [ ] Compare multiple reports

### Emission Factors
- [ ] Import Excel data to MongoDB
- [ ] Query emission factors by category
- [ ] Search emission factors by text
- [ ] Get curated factor sets
- [ ] Calculate GHG emissions using factors

### NIC Codes
- [ ] Load NIC database
- [ ] Search by NIC code
- [ ] Search by description
- [ ] Map CIN to industry sector
- [ ] Browse by section/division

---

## 9. Migration Steps

### Step 1: Database Setup
```bash
# Connect to MongoDB
# Create database: sustainsutra
# Create collections as listed in Section 5.4
```

### Step 2: Import Emission Factors
```bash
cd backend
node scripts/seedEmissionFactors.js
```

### Step 3: Remove Demo Data
```bash
# Edit backend/server.js
# Remove lines 13-340 (mock data arrays)
# Remove global.isDemoMode initialization
```

### Step 4: Update Controllers
```bash
# Remove global.isDemoMode checks from:
# - brsrAnalysisController.js
# - Other controllers (Phase 3)
```

### Step 5: Update XBRL Parser
```bash
# Edit backend/utils/brsrXBRLParser.js
# Replace hardcoded NIC mapping with database lookup
# Or use full NIC database file
```

### Step 6: Test
```bash
# Start server
cd backend
npm start

# Test BRSR upload
# Test emission factor lookup
# Test NIC code mapping
```

---

## 10. Conclusion

The BRSR Analysis module has a solid foundation with:
- ✅ NIC code database available
- ✅ Emission factor database available
- ✅ MongoDB models defined
- ⚠️ Demo mode needs to be removed
- ⚠️ Static data needs to be replaced with database calls

The recommended approach is to:
1. Remove demo data immediately
2. Import emission factors to MongoDB
3. Update NIC code extraction to use full database
4. Remove static emission factors file
5. Test thoroughly

This will ensure the application uses real data from the database and provides accurate BRSR analysis.
