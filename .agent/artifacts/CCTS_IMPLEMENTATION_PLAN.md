# CCTS Dashboard Implementation Plan

## Overview
Integration of Carbon Credit Trading Scheme (CCTS) compliance and tracking system into SustainSutra.

## Architecture Integration

### Existing Stack (Compatible)
- ✅ **Frontend**: React.js (Already using React 18)
- ✅ **Backend**: Node.js + Express (Current backend)
- ✅ **Database**: MongoDB (Current) - Will need structured schema design
- ✅ **Authentication**: JWT-based (Already implemented)

### New Components Required
- CCTS-specific models and schemas
- Calculation engine (emission formulas)
- Multi-role authentication enhancement
- File upload system for verification documents
- Reporting/export functionality (PDF generation for Form E2, Form A, Form B)

---

## Phase 1: Database Schema & Models (Week 1)

### 1.1 New Mongoose Models

#### CCTSEntity Model
```javascript
{
  entityName: String,
  plantAddress: Object,
  registrationNumber: String (unique),
  sector: String (enum),
  subSector: String,
  baselineYear: String,
  baselineProduction: Number,
  baselineGHGIntensity: Number,
  targets: [{
    complianceYear: String,
    targetGEI: Number
  }],
  user: ObjectId (ref: User),
  status: String (enum: active, suspended),
  createdAt: Date,
  updatedAt: Date
}
```

#### MonitoringData Model
```javascript
{
  entity: ObjectId (ref: CCTSEntity),
  reportingPeriod: { startDate: Date, endDate: Date },
  
  // Inputs
  rawMaterials: [{
    name: String,
    quantity: Number,
    unit: String,
    ncv: Number,
    emissionFactor: Number,
    emissionFactorType: String (Type I/Type II),
    labCertificate: String (URL)
  }],
  
  fuels: [/* similar structure */],
  
  purchasedElectricity: {
    grid: Number,
    openAccess: Number,
    emissionFactor: Number
  },
  
  purchasedHeat: Number,
  
  // Outputs
  production: [{
    productType: String,
    quantity: Number,
    equivalentFactor: Number
  }],
  
  exportedEnergy: Number,
  capturedCO2: Number,
  
  // Calculations (Auto-computed)
  totalGHGEmissions: Number,
  ghgEmissionIntensity: Number,
  
  // Verification
  verificationStatus: String (enum: draft, pending, verified, rejected),
  verifier: ObjectId (ref: User),
  verificationDate: Date,
  verificationReport: String (URL),
  
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

#### EmissionFactor Model (Reference Library)
```javascript
{
  source: String (Coal, Natural Gas, Diesel, Grid Electricity),
  category: String (Fuel, Material, Electricity),
  region: String (India/State-specific),
  value: Number (tCO2e per unit),
  unit: String,
  referenceDocument: String (IPCC, CEA, etc.),
  isDefault: Boolean,
  validFrom: Date,
  validUntil: Date
}
```

#### VerificationReport Model
```javascript
{
  monitoringData: ObjectId (ref: MonitoringData),
  verifier: ObjectId (ref: User),
  verificationDate: Date,
  materialityThreshold: Number (default: 2%),
  assessment: {
    dataAccuracy: String,
    complianceStatus: String,
    gaps: [String],
    recommendations: [String]
  },
  formADocument: String (URL),
  formBDocument: String (URL),
  status: String (enum: draft, submitted, approved),
  createdAt: Date
}
```

#### CarbonCreditBalance Model
```javascript
{
  entity: ObjectId (ref: CCTSEntity),
  complianceYear: String,
  targetGEI: Number,
  achievedGEI: Number,
  production: Number,
  creditIssuance: Number (positive if surplus),
  surrenderRequirement: Number (positive if deficit),
  offsetsApplied: [{
    projectId: ObjectId (ref: OffsetProject),
    creditsUsed: Number
  }],
  netPosition: Number,
  status: String (compliant/non-compliant),
  calculatedAt: Date
}
```

#### OffsetProject Model
```javascript
{
  projectName: String,
  projectType: String (enum: Green Hydrogen, CCUS, Biochar, etc.),
  entity: ObjectId (ref: CCTSEntity or null for external),
  creditsGenerated: Number,
  creditsAvailable: Number,
  verificationStatus: String,
  registrationDate: Date,
  expiryDate: Date
}
```

### 1.2 User Model Enhancement
```javascript
// Add new role to existing User model
role: String (enum: [...existing, 'ccts-entity', 'ccts-verifier', 'ccts-admin'])

// Add CCTS-specific fields
cctsEntity: ObjectId (ref: CCTSEntity)
verifierAccreditation: {
  accreditationNumber: String,
  validUntil: Date,
  scope: [String] (sectors authorized to verify)
}
```

---

## Phase 2: Backend API Development (Week 2-3)

### 2.1 New Controllers

#### cctsEntityController.js
- `createEntity`: Register new obligated entity
- `getMyEntity`: Get logged-in user's entity details
- `getAllEntities`: Admin view all entities
- `updateEntity`: Update entity profile
- `getEntityDashboard`: Get summary stats and compliance status

#### monitoringController.js
- `submitMonitoringData`: Create new monitoring report
- `getMonitoringData`: Retrieve reports by entity/period
- `updateMonitoringData`: Edit draft reports
- `calculateEmissions`: Run calculation engine
- `submitForVerification`: Change status to pending

#### verificationController.js
- `getAssignedReports`: Verifier gets pending reports
- `submitVerification`: Verifier submits Form A & B
- `approveVerification`: Admin approval workflow

#### calculationEngine.js (Service Layer)
```javascript
function calculateTotalGHG(monitoringData) {
  // Direct Emissions: Combustion + Process
  // Indirect: Electricity + Heat
  // Subtract: Exported Energy + Captured CO2
  return totalGHG;
}

function calculateGEI(totalGHG, production) {
  return totalGHG / production;
}

function calculateCCC(entity, achievedGEI, production) {
  const targetGEI = getTargetForYear(entity, currentYear);
  if (achievedGEI < targetGEI) {
    return { 
      type: 'issuance',
      amount: (targetGEI - achievedGEI) * production 
    };
  } else {
    return { 
      type: 'surrender',
      amount: (achievedGEI - targetGEI) * production 
    };
  }
}
```

#### reportingController.js
- `generateFormE2`: Export PDF of annual energy/GHG report
- `generateComplianceReport`: Dashboard export

### 2.2 New Routes

```javascript
// routes/cctsRoutes.js
router.post('/entities', protect, cctsAdmin, createEntity);
router.get('/entities/my-entity', protect, cctsEntity, getMyEntity);
router.post('/monitoring', protect, cctsEntity, submitMonitoringData);
router.put('/monitoring/:id/calculate', protect, calculateEmissions);
router.post('/monitoring/:id/submit', protect, cctsEntity, submitForVerification);
router.get('/verification/pending', protect, cctsVerifier, getAssignedReports);
router.post('/verification/:id/verify', protect, cctsVerifier, submitVerification);
router.get('/dashboard/entity', protect, cctsEntity, getEntityDashboard);
router.get('/reports/form-e2/:id', protect, generateFormE2);
```

---

## Phase 3: Frontend Development (Week 4-5)

### 3.1 New Pages

#### `/ccts/entity-registration`
- Form to register new obligated entity
- Input fields for all entity profile data
- Baseline data entry

#### `/ccts/dashboard`
**For Entity Users:**
- Compliance status widget (Green/Red indicator)
- Trajectory graph (Baseline vs. Target vs. Achieved GEI)
- Gap analysis card: "X tCO2e from target"
- Quick actions: "Submit New Monitoring Data", "View Reports"

**For Verifiers:**
- List of pending verification requests
- Entity compliance summary table

**For Admins:**
- All entities overview
- Sector-wise compliance statistics
- Target achievement rates

#### `/ccts/monitoring-data/new`
- Multi-step form for data entry:
  - Step 1: Reporting Period & Production Data
  - Step 2: Raw Materials & Fuels (dynamic rows)
  - Step 3: Energy Inputs (Electricity, Heat)
  - Step 4: Exclusions & Offsets
  - Step 5: Review & Calculate
- Real-time emission calculations
- Save as draft / Submit for verification

#### `/ccts/monitoring-data/:id`
- View detailed monitoring report
- Show calculated emissions
- Verification status badge
- Download Form E2 (PDF)

#### `/ccts/verification/:id`
**For Verifiers:**
- Review submitted data
- Input fields for Form A & B
- Upload verification certificate
- Approve/Reject with comments

#### `/ccts/emission-factors`
- Reference library of default emission factors
- Search and filter by source/region
- Admin can add custom factors

#### `/ccts/offset-projects`
- List of registered offset projects
- Add new offset project
- Track credits generated/used

### 3.2 New Components

#### `CCTSDashboardWidget.jsx`
- Reusable KPI cards (Total Emissions, GEI, Compliance Status)
- Uses Recharts for trajectory graphs

#### `MonitoringDataForm.jsx`
- Complex form with dynamic rows for fuels/materials
- Auto-fetch emission factors from library
- Client-side validation

#### `ComplianceTrajectoryChart.jsx`
- Line chart: Baseline → Target → Achieved over years

#### `VerificationWorkflow.jsx`
- Stepper component showing workflow status
- Color-coded progress

#### `EmissionCalculationSummary.jsx`
- Breakdown table: Direct + Indirect - Exported - Captured

---

## Phase 4: Calculation Engine & Business Logic (Week 3)

### 4.1 Core Calculation Functions (Backend)

```javascript
// services/cctsCalculations.js

/**
 * Calculate total GHG emissions from monitoring data
 */
exports.calculateTotalGHG = (monitoringData) => {
  let directEmissions = 0;
  
  // Combustion Emissions
  monitoringData.fuels.forEach(fuel => {
    const emission = fuel.quantity * fuel.ncv * fuel.emissionFactor;
    directEmissions += emission;
  });
  
  // Process Emissions (if applicable - e.g., cement calcination)
  // Add logic here based on sector
  
  // Indirect Emissions - Electricity
  const electricityEmissions = 
    (monitoringData.purchasedElectricity.grid + 
     monitoringData.purchasedElectricity.openAccess) * 
    monitoringData.purchasedElectricity.emissionFactor;
  
  // Indirect Emissions - Heat
  const heatEmissions = monitoringData.purchasedHeat * HEAT_EF;
  
  const indirectEmissions = electricityEmissions + heatEmissions;
  
  // Deductions
  const exportedEnergy = monitoringData.exportedEnergy * EXPORT_EF;
  const capturedCO2 = monitoringData.capturedCO2;
  
  const totalGHG = directEmissions + indirectEmissions - exportedEnergy - capturedCO2;
  
  return {
    directEmissions,
    indirectEmissions,
    exportedEnergy,
    capturedCO2,
    totalGHG
  };
};

/**
 * Calculate GHG Emission Intensity
 */
exports.calculateGEI = (totalGHG, production) => {
  const totalEquivalentProduction = production.reduce((sum, p) => {
    return sum + (p.quantity * p.equivalentFactor);
  }, 0);
  
  return totalGHG / totalEquivalentProduction;
};

/**
 * Determine CCC issuance or surrender requirement
 */
exports.calculateCCC = (entity, achievedGEI, production, complianceYear) => {
  const target = entity.targets.find(t => t.complianceYear === complianceYear);
  
  if (!target) {
    throw new Error('No target set for compliance year');
  }
  
  const totalProduction = production.reduce((sum, p) => sum + p.quantity, 0);
  
  if (achievedGEI < target.targetGEI) {
    // Entity outperformed - gets credits
    return {
      type: 'issuance',
      amount: (target.targetGEI - achievedGEI) * totalProduction,
      status: 'compliant'
    };
  } else {
    // Entity underperformed - must surrender
    return {
      type: 'surrender',
      amount: (achievedGEI - target.targetGEI) * totalProduction,
      status: 'non-compliant'
    };
  }
};
```

### 4.2 Emission Factor Library Seeding

```javascript
// backend/seeders/emissionFactors.js
const defaultFactors = [
  {
    source: 'Coal (Domestic)',
    category: 'Fuel',
    value: 2.41,
    unit: 'tCO2e/tonne',
    referenceDocument: 'Annexure IV, CCTS Guidelines 2024',
    region: 'India',
    isDefault: true
  },
  {
    source: 'Natural Gas',
    category: 'Fuel',
    value: 2.69,
    unit: 'tCO2e/1000 m³',
    referenceDocument: 'IPCC 2006',
    region: 'India',
    isDefault: true
  },
  {
    source: 'Grid Electricity',
    category: 'Electricity',
    value: 0.82,
    unit: 'tCO2e/MWh',
    referenceDocument: 'CEA CO2 Baseline Database (2023-24)',
    region: 'India',
    isDefault: true
  },
  // Add all factors from Annexure IV
];
```

---

## Phase 5: File Upload & Document Management (Week 5)

### 5.1 Multer Configuration (Backend)
```javascript
// middleware/fileUpload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/ccts/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|xlsx|jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, XLSX, and image files allowed'));
  }
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
```

### 5.2 Upload Routes
```javascript
router.post('/upload/lab-certificate', protect, upload.single('certificate'), uploadLabCertificate);
router.post('/upload/verification-report', protect, cctsVerifier, upload.single('report'), uploadVerificationReport);
```

---

## Phase 6: PDF Report Generation (Week 6)

### 6.1 Install Dependencies
```bash
npm install pdfkit
```

### 6.2 Form E2 Generator
```javascript
// services/pdfGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateFormE2 = async (monitoringData, entity) => {
  const doc = new PDFDocument();
  const filename = `FormE2_${entity.registrationNumber}_${Date.now()}.pdf`;
  const filepath = `./exports/${filename}`;
  
  doc.pipe(fs.createWriteStream(filepath));
  
  // Header
  doc.fontSize(18).text('Form E2: Annual Energy & GHG Report', { align: 'center' });
  doc.moveDown();
  
  // Entity Details
  doc.fontSize(12).text(`Entity: ${entity.entityName}`);
  doc.text(`Registration No.: ${entity.registrationNumber}`);
  doc.text(`Sector: ${entity.sector} / ${entity.subSector}`);
  doc.moveDown();
  
  // Reporting Period
  doc.text(`Reporting Period: ${monitoringData.reportingPeriod.startDate} to ${monitoringData.reportingPeriod.endDate}`);
  doc.moveDown();
  
  // GHG Emissions Summary
  doc.fontSize(14).text('GHG Emissions Summary', { underline: true });
  doc.fontSize(10);
  doc.text(`Total GHG Emissions: ${monitoringData.totalGHGEmissions.toFixed(2)} tCO2e`);
  doc.text(`GHG Intensity: ${monitoringData.ghgEmissionIntensity.toFixed(4)} tCO2e/tonne`);
  
  // ... Add tables for fuel consumption, production, etc.
  
  doc.end();
  
  return filepath;
};
```

---

## Phase 7: Integration with Existing SustainSutra (Week 6)

### 7.1 Navigation Updates
```javascript
// src/components/Header.jsx - Add CCTS menu items

{user && user.role === 'ccts-entity' && (
  <DropdownMenuItem onClick={() => navigate('/ccts/dashboard')}>
    CCTS Dashboard
  </DropdownMenuItem>
)}

{user && user.role === 'ccts-verifier' && (
  <DropdownMenuItem onClick={() => navigate('/ccts/verification')}>
    Verification Queue
  </DropdownMenuItem>
)}
```

### 7.2 Admin Dashboard Tab
```javascript
// src/pages/AdminDashboard.jsx - Add CCTS tab

<TabsList>
  {/* Existing tabs */}
  <TabsTrigger value="ccts">CCTS Compliance</TabsTrigger>
</TabsList>

<TabsContent value="ccts">
  <CCTSAdminPanel />
</TabsContent>
```

### 7.3 Services Page Link
```javascript
// src/pages/ServicesLandingPage.jsx - Add CCTS service card

{
  title: "CCTS Compliance Dashboard",
  description: "Track your carbon credit obligations under India's CCTS",
  icon: <TrendingDown />,
  link: "/ccts/dashboard"
}
```

---

## Phase 8: Testing & Validation (Week 7)

### 8.1 Unit Tests
- Calculation engine accuracy tests
- Emission factor lookup tests
- CCC issuance/surrender logic tests

### 8.2 Integration Tests
- End-to-end workflow: Entity submits → Verifier reviews → CCC calculated
- File upload and retrieval
- PDF generation

### 8.3 User Acceptance Testing
- Test with sample data from Textile, Cement, and Steel sectors
- Validate against known baseline/target scenarios

---

## Implementation Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1** | Week 1 | Database models, schemas designed and implemented |
| **Phase 2** | Week 2-3 | Backend APIs, calculation engine, routes |
| **Phase 3** | Week 4-5 | Frontend pages, forms, dashboard components |
| **Phase 4** | Week 3 (parallel) | Core calculation logic, emission factor library |
| **Phase 5** | Week 5 (parallel) | File upload system, document storage |
| **Phase 6** | Week 6 | PDF generation for Form E2, A, B |
| **Phase 7** | Week 6 (parallel) | Integration with existing SustainSutra |
| **Phase 8** | Week 7 | Testing, bug fixes, UAT |

**Total Estimated Time: 7 Weeks**

---

## Deployment Considerations

### Environment Variables
```bash
# Add to .env
CCTS_BASELINE_YEAR=2023-24
CCTS_MATERIALITY_THRESHOLD=2
UPLOAD_MAX_SIZE=10485760
PDF_EXPORT_DIR=/app/exports
```

### Docker Updates
```yaml
# docker-compose.yml - Add volume for file uploads
volumes:
  - ./uploads:/app/uploads
  - ./exports:/app/exports
```

### MongoDB Indexes
```javascript
// Optimize query performance
db.cctsEntities.createIndex({ registrationNumber: 1 }, { unique: true });
db.monitoringData.createIndex({ entity: 1, reportingPeriod: 1 });
db.verificationReports.createIndex({ verificationStatus: 1 });
```

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Calculation errors | High | Extensive unit testing, peer review of formulas |
| Data loss during upload | Medium | Implement backup and audit trails |
| Regulatory changes | Medium | Design flexible schema, version control for emission factors |
| Performance with large datasets | Medium | Implement pagination, caching, indexed queries |

---

## Next Steps

1. **Review and Approve Plan**: Stakeholder sign-off
2. **Set Up Development Environment**: Create `ccts` branch
3. **Start Phase 1**: Database schema implementation
4. **Weekly Progress Reviews**: Track milestones

Would you like me to proceed with implementation starting with Phase 1 (Database Models)?
