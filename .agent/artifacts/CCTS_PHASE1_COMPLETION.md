# CCTS Implementation - Phase 1 Completion Report

**Date:** January 23, 2026  
**Phase:** Phase 1 - Database Schema & Models  
**Status:** ✅ COMPLETED

---

## Summary

Phase 1 of the CCTS (Carbon Credit Trading Scheme) dashboard integration has been successfully completed. All database models, calculation engines, and seeding infrastructure are now in place.

---

## Deliverables Completed

### 1. Database Models Created (6 + 1 Updated)

#### ✅ CCTSEntity Model (`backend/models/cctsEntityModel.js`)
- **Purpose**: Store obligated entity profiles
- **Key Fields**:
  - Registration number (unique identifier)
  - Sector and sub-sector classification
  - Baseline year data (production, GHG intensity)
  - Multi-year targets with GEI targets
  - Plant address and contact details
- **Features**:
  - Virtual for current compliance year calculation
  - Method to get target for specific year
  - Method to calculate reduction trajectory
  - Indexed for fast queries by registration number, sector, status

#### ✅ MonitoringData Model (`backend/models/monitoringDataModel.js`)
- **Purpose**: Track emissions data and "gate-to-gate" boundary monitoring
- **Key Sections**:
  - **Inputs**: Raw materials, fuels, purchased electricity, purchased heat
  - **Outputs**: Production data, exported energy, captured CO2
  - **Calculations**: Automated emission breakdowns (direct, indirect, deductions)
  - **Verification**: Status workflow, verifier assignment, report uploads
- **Features**:
  - Pre-save hook to calculate total equivalent production
  - Method to check submission readiness
  - Method to submit for verification
  - Support for Type I (default) and Type II (site-specific) emission factors
  - Biomass exclusion flags

#### ✅ EmissionFactor Model (`backend/models/emissionFactorModel.js`)
- **Purpose**: Reference library for default and custom emission factors
- **Key Fields**:
  - Source, category, sub-category
  - Value and unit
  - Scope (1, 2, or 3)
  - Reference document (IPCC, Annexure IV, CEA)
  - Region/state specificity
  - Validity period with version control
  - NCV values for fuels
- **Features**:
  - Text search index
  - Static method to find applicable factor with preference for defaults
  - Virtual to check current validity
  - Approval workflow for custom factors

#### ✅ VerificationReport Model (`backend/models/verificationReportModel.js`)
- **Purpose**: Third-party verification workflow (Form A & Form B)
- **Key Sections**:
  - **Assessment (Form A)**: Data accuracy, compliance status, gaps, recommendations
  - **Verified Data**: Adjusted emissions and production with uncertainty
  - **Materiality Assessment**: Threshold checking (2% default)
  - **Site Visit**: Inspection records, interviews
  - **Documents**: Form A, Form B, supporting docs
- **Features**:
  - Pre-save hook to calculate materiality percentage
  - Method to approve verification (cascades to monitoring data)
  - Unique index on monitoring data (one report per submission)
  - Regulator approval workflow

#### ✅ CarbonCreditBalance Model (`backend/models/carbonCreditBalanceModel.js`)
- **Purpose**: Calculate and track CCC issuance, surrender requirements, and net position
- **Key Calculations**:
  - Intensity difference (target - achieved)
  - Credit issuance (if outperformed)
  - Surrender requirement (if underperformed)
  - Net position with offsets, purchases, sales
  - Compliance gap analysis
- **Features**:
  - **Pre-save hook**: Performs all CCC calculations automatically
  - Offset application tracking
  - Credit trading (purchase/sale) history
  - Carryover management
  - Financial valuation
  - Audit trail for all changes
  - Unique index per entity-year

#### ✅ OffsetProject Model (`backend/models/offsetProjectModel.js`)
- **Purpose**: Track approved offset projects (Green Hydrogen, CCUS, Biochar, etc.)
- **Key Fields**:
  - Project type (10+ categories)
  - Owner (obligated/non-obligated entity)
  - Credits generated/verified/issued/retired/available
  - Registration and verification status
  - Methodology and baseline scenario
  - Monitoring reports by period
  - Eligibility criteria for CCTS
- **Features**:
  - Method to retire credits
  - Method to issue credits
  - Method to add monitoring reports
  - Static method to find available credits by type
  - Project lifecycle tracking

#### ✅ User Model Updated (`backend/models/userModel.js`)
- **Added Roles**: `ccts-entity`, `ccts-verifier`, `ccts-admin`
- **Added Fields**:
  - `cctsEntity`: Reference to associated entity
  - `verifierAccreditation`: Accreditation number, authority, validity, scope, certificate
- **Purpose**: Support multi-role access control for CCTS workflows

---

### 2. Calculation Engine (`backend/services/cctsCalculations.js`)

#### ✅ Core Functions Implemented

**`calculateTotalGHG(monitoringData)`**
- Calculates: Direct (combustion + process) + Indirect (electricity + heat) - Deductions (exported energy + captured CO2)
- Returns: Detailed breakdown by category
- Handles: Biomass exclusions, NCV-based calculations, multiple unit conversions

**`calculateGEI(totalGHG, production)`**
- Formula: Total GHG / Total Equivalent Production
- Handles: Multi-product equivalence factors
- Returns: GEI in tCO2e/tonne with 6 decimal precision

**`calculateCCC(entity, achievedGEI, totalProduction, complianceYear)`**
- Determines: Credit issuance (outperformance) or surrender requirement (underperformance)
- Returns: Net position, compliance status, performance rating
- Calculates: Improvement from baseline

**`performCompleteCalculation(monitoringData, entity)`**
- Pipeline: Runs all calculations in sequence
- Updates: Monitoring data with results
- Returns: Comprehensive result object

**`validateMonitoringData(monitoringData)`**
- Checks: Production data, emission sources, emission factors, NCVs
- Returns: Validation status with specific errors

**`calculateTrajectory(entity, historicalData)`**
- Generates: Multi-year trajectory (baseline → targets → achieved)
- Sorts: Chronologically
- Returns: Array for visualization

---

### 3. Emission Factor Seeder (`backend/seeders/cctsEmissionFactors.js`)

#### ✅ Default Factors Seeded (17 Total)

**Fuels - Stationary Combustion (8)**
- Coal (Domestic & Imported)
- Natural Gas
- Diesel
- Fuel Oil
- Petcoke
- LPG
- Biomass (Carbon Neutral)

**Electricity (2)**
- Grid Electricity (India Average: 0.82 tCO2e/MWh)
- Renewable Energy (Zero emissions)

**Heat/Steam (1)**
- Purchased Steam (0.05 tCO2e/GJ)

**Process Emissions (2)**
- Limestone (Cement calcination)
- Soda Ash

**Mobile Combustion (2)**
- Diesel (Vehicles)
- Petrol (Vehicles)

**Refrigerants (2)**
- R-134a (HFC)
- R-410a (HFC)

**Data Sources:**
- IPCC 2006 Guidelines
- Annexure IV, CCTS Guidelines 2024
- CEA CO2 Baseline Database (2023-24)

---

## Database Indexes Created

For optimal query performance:

```javascript
// CCTSEntity
- registrationNumber (unique)
- user
- sector + subSector
- status

// MonitoringData
- entity + reportingPeriod.complianceYear
- verificationStatus
- verifier + verificationStatus

// EmissionFactor
- source + category + region
- isDefault + isApproved
- category + scope
- applicableSectors
- Text index (source, category, referenceDocument)

// VerificationReport
- monitoringData (unique)
- entity + reportingPeriod.complianceYear
- verifier + status
- status
- verificationDate

// CarbonCreditBalance
- entity + complianceYear (unique)
- complianceStatus
- regulatorApproval.status
- calculatedAt

// OffsetProject
- projectId (unique, sparse)
- entity
- projectType
- registrationStatus
- verificationStatus
- status
- location.state
- Text index (projectName, projectDescription, projectType)
```

---

## File Structure Created

```
backend/
├── models/
│   ├── cctsEntityModel.js                 ✅ NEW
│   ├── monitoringDataModel.js             ✅ NEW
│   ├── emissionFactorModel.js             ✅ NEW
│   ├── verificationReportModel.js         ✅ NEW
│   ├── carbonCreditBalanceModel.js        ✅ NEW
│   ├── offsetProjectModel.js              ✅ NEW
│   └── userModel.js                       ✅ UPDATED
│
├── services/
│   └── cctsCalculations.js                ✅ NEW
│
└── seeders/
    └── cctsEmissionFactors.js             ✅ NEW
```

---

## Key Features Implemented

### 1. **Multi-Role Access Control**
- Entity users
- Verifiers (with accreditation tracking)
- Administrators

### 2. **Complete Calculation Pipeline**
- Automated emission calculations
- GEI calculation with equivalence factors
- CCC issuance/surrender determination
- Real-time validation

### 3. **Verification Workflow**
- Draft → Submitted → Under Review → Verified
- Materiality threshold checking (2% default)
- Form A (Assessment) and Form B (Certificate) support
- Site visit documentation

### 4. **Offset Integration**
- Support for 10+ project types
- Credit lifecycle (generated → verified → issued → retired)
- Eligibility checks for CCTS compliance

### 5. **Audit & Compliance**
- Complete audit trails on all models
- Regulator approval workflows
- Document versioning
- Historical tracking

---

## Testing Checklist

### ✅ Model Validation Tests Needed
- [ ] CCTSEntity: Registration number format validation
- [ ] MonitoringData: Calculation accuracy tests
- [ ] EmissionFactor: Factor lookup tests
- [ ] VerificationReport: Materiality calculation tests
- [ ] CarbonCreditBalance: CCC calculation tests
- [ ] OffsetProject: Credit retirement tests

### ✅ Calculation Engine Tests Needed
- [ ] GHG calculation with various fuel combinations
- [ ] GEI calculation with multi-product scenarios
- [ ] CCC issuance scenario (outperformance)
- [ ] CCC surrender scenario (underperformance)
- [ ] Validation error detection

---

## Next Steps (Phase 2)

Now that all models are in place, **Phase 2: Backend API Development** can begin:

1. ✅ Create controllers:
   - `cctsEntityController.js`
   - `monitoringController.js`
   - `verificationController.js`
   - `emissionFactorController.js`
   - `offsetProjectController.js`
   - `cccBalanceController.js`

2. ✅ Create routes:
   - `/api/ccts/entities`
   - `/api/ccts/monitoring`
   - `/api/ccts/verification`
   - `/api/ccts/emission-factors`
   - `/api/ccts/offset-projects`
   - `/api/ccts/ccc-balance`

3. ✅ Implement middleware:
   - CCTS role-based authorization
   - File upload for certificates
   - PDF generation for reports

4. ✅ Testing:
   - Unit tests for controllers
   - Integration tests for workflows
   - API endpoint testing

---

## Dependencies Required

The following packages are already available in the backend:
- ✅ `mongoose` (ODM)
- ✅ `bcryptjs` (Password hashing)
- ✅ `jsonwebtoken` (JWT auth)
- ✅ `express-async-handler` (Async error handling)
- ✅ `dotenv` (Environment variables)

**Additional packages needed for Phase 2:**
```bash
npm install multer        # File uploads
npm install pdfkit        # PDF generation
```

---

## Git Commit Strategy

Phase 1 changes can be committed in a single commit or split as follows:

```bash
# Option 1: Single commit
git add backend/models/ccts* backend/models/emission* backend/models/verification* backend/models/carbon* backend/models/offset* backend/models/userModel.js backend/services/cctsCalculations.js backend/seeders/cctsEmissionFactors.js
git commit -m "feat: implement CCTS Phase 1 - database models, calculation engine, and emission factor seeder"

# Option 2: Split commits
git add backend/models/ccts*
git commit -m "feat(ccts): add CCTSEntity, MonitoringData, and related verification models"

git add backend/models/emission* backend/models/offset*
git commit -m "feat(ccts): add EmissionFactor and OffsetProject models"

git add backend/services/cctsCalculations.js
git commit -m "feat(ccts): implement core calculation engine for GHG, GEI, and CCC"

git add backend/seeders/cctsEmissionFactors.js
git commit -m "feat(ccts): add emission factor seeder with Annexure IV defaults"

git add backend/models/userModel.js
git commit -m "feat(ccts): extend User model with CCTS roles and verifier accreditation"
```

---

## Estimated Progress

**Overall CCTS Implementation:**
- ✅ Phase 1: Database Models (100% Complete)
- ⏳ Phase 2: Backend APIs (0% - Next)
- ⏳ Phase 3: Frontend Pages (0%)
- ⏳ Phase 4: Integration (0%)
- ⏳ Phase 5: Testing (0%)

**Total Progress: ~14% (1 of 7 phases complete)**

---

## Questions for Stakeholder Review

Before proceeding to Phase 2, please confirm:

1. ✅ Are the sector enums comprehensive? Should we add more sectors?
2. ✅ Is the materiality threshold of 2% correct per regulations?
3. ✅ Should we support state-specific grid emission factors beyond the national average?
4. ✅ Do we need support for interim reporting (quarterly/half-yearly)?
5. ✅ Should credit trading be peer-to-peer or through a central exchange?

---

**Status:** ✅ Ready for Phase 2 Implementation  
**Estimated Time for Phase 2:** 2 weeks  
**Next Milestone:** Functional API endpoints with Postman documentation

---

*Generated: January 23, 2026*  
*Implementation Lead: SustainSutra Development Team*
