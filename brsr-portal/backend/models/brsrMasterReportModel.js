const mongoose = require('mongoose');

// BRSR Master Report schema.
//
// Previously a single ~3100-line flat schema. The field definitions now live in
// per-prefix modules under ./brsrMasterReportFields/ and are composed here via
// object spread. The resulting document shape is identical to the original.
// Regenerate via scripts/split_master_model.cjs.
const aFields = require('./brsrMasterReportFields/a.js');
const actionFields = require('./brsrMasterReportFields/action.js');
const addressFields = require('./brsrMasterReportFields/address.js');
const amountFields = require('./brsrMasterReportFields/amount.js');
const amountsFields = require('./brsrMasterReportFields/amounts.js');
const anFields = require('./brsrMasterReportFields/an.js');
const antiFields = require('./brsrMasterReportFields/anti.js');
const anyFields = require('./brsrMasterReportFields/any.js');
const areFields = require('./brsrMasterReportFields/are.js');
const aspirationalFields = require('./brsrMasterReportFields/aspirational.js');
const assuranceFields = require('./brsrMasterReportFields/assurance.js');
const assurerFields = require('./brsrMasterReportFields/assurer.js');
const averageFields = require('./brsrMasterReportFields/average.js');
const basisFields = require('./brsrMasterReportFields/basis.js');
const batteryFields = require('./brsrMasterReportFields/battery.js');
const benefitFields = require('./brsrMasterReportFields/benefit.js');
const bioFields = require('./brsrMasterReportFields/bio.js');
const boundaryFields = require('./brsrMasterReportFields/boundary.js');
const briefFields = require('./brsrMasterReportFields/brief.js');
const categoryFields = require('./brsrMasterReportFields/category.js');
const channelsFields = require('./brsrMasterReportFields/channels.js');
const companyFields = require('./brsrMasterReportFields/company.js');
const complaintsFields = require('./brsrMasterReportFields/complaints.js');
const complianceFields = require('./brsrMasterReportFields/compliance.js');
const constructionFields = require('./brsrMasterReportFields/construction.js');
const consumerFields = require('./brsrMasterReportFields/consumer.js');
const contactFields = require('./brsrMasterReportFields/contact.js');
const corporateFields = require('./brsrMasterReportFields/corporate.js');
const correctiveFields = require('./brsrMasterReportFields/corrective.js');
const costFields = require('./brsrMasterReportFields/cost.js');
const countryFields = require('./brsrMasterReportFields/country.js');
const csrFields = require('./brsrMasterReportFields/csr.js');
const dateFields = require('./brsrMasterReportFields/date.js');
const deductedFields = require('./brsrMasterReportFields/deducted.js');
const desclosureFields = require('./brsrMasterReportFields/desclosure.js');
const describeFields = require('./brsrMasterReportFields/describe.js');
const descriptionFields = require('./brsrMasterReportFields/description.js');
const designationFields = require('./brsrMasterReportFields/designation.js');
const detailsFields = require('./brsrMasterReportFields/details.js');
const didFields = require('./brsrMasterReportFields/did.js');
const discloseFields = require('./brsrMasterReportFields/disclose.js');
const disclosureFields = require('./brsrMasterReportFields/disclosure.js');
const districtFields = require('./brsrMasterReportFields/district.js');
const doFields = require('./brsrMasterReportFields/do.js');
const doesFields = require('./brsrMasterReportFields/does.js');
const eFields = require('./brsrMasterReportFields/e.js');
const eiaFields = require('./brsrMasterReportFields/eia.js');
const energyFields = require('./brsrMasterReportFields/energy.js');
const entityFields = require('./brsrMasterReportFields/entity.js');
const environmentalFields = require('./brsrMasterReportFields/environmental.js');
const financialFields = require('./brsrMasterReportFields/financial.js');
const financialYearFields = require('./brsrMasterReportFields/financialYear.js');
const frequencyFields = require('./brsrMasterReportFields/frequency.js');
const fromFields = require('./brsrMasterReportFields/from.js');
const grievanceFields = require('./brsrMasterReportFields/grievance.js');
const grossFields = require('./brsrMasterReportFields/gross.js');
const hasFields = require('./brsrMasterReportFields/has.js');
const hazardousFields = require('./brsrMasterReportFields/hazardous.js');
const highFields = require('./brsrMasterReportFields/high.js');
const humanFields = require('./brsrMasterReportFields/human.js');
const inFields = require('./brsrMasterReportFields/in.js');
const indicateFields = require('./brsrMasterReportFields/indicate.js');
const initiativeFields = require('./brsrMasterReportFields/initiative.js');
const intellectualFields = require('./brsrMasterReportFields/intellectual.js');
const isFields = require('./brsrMasterReportFields/is.js');
const itFields = require('./brsrMasterReportFields/it.js');
const locationFields = require('./brsrMasterReportFields/location.js');
const lostFields = require('./brsrMasterReportFields/lost.js');
const materialFields = require('./brsrMasterReportFields/material.js');
const mechanismsFields = require('./brsrMasterReportFields/mechanisms.js');
const medianFields = require('./brsrMasterReportFields/median.js');
const methodFields = require('./brsrMasterReportFields/method.js');
const nFields = require('./brsrMasterReportFields/n.js');
const nameFields = require('./brsrMasterReportFields/name.js');
const natureFields = require('./brsrMasterReportFields/nature.js');
const netFields = require('./brsrMasterReportFields/net.js');
const ngrbcFields = require('./brsrMasterReportFields/ngrbc.js');
const nicFields = require('./brsrMasterReportFields/nic.js');
const notesFields = require('./brsrMasterReportFields/notes.js');
const numberFields = require('./brsrMasterReportFields/number.js');
const otherFields = require('./brsrMasterReportFields/other.js');
const outcomeFields = require('./brsrMasterReportFields/outcome.js');
const ownedFields = require('./brsrMasterReportFields/owned.js');
const particulateFields = require('./brsrMasterReportFields/particulate.js');
const percentageFields = require('./brsrMasterReportFields/percentage.js');
const performanceFields = require('./brsrMasterReportFields/performance.js');
const persistentFields = require('./brsrMasterReportFields/persistent.js');
const plasticFields = require('./brsrMasterReportFields/plastic.js');
const processesFields = require('./brsrMasterReportFields/processes.js');
const productFields = require('./brsrMasterReportFields/product.js');
const projectFields = require('./brsrMasterReportFields/project.js');
const provideFields = require('./brsrMasterReportFields/provide.js');
const publicFields = require('./brsrMasterReportFields/public.js');
const purposeFields = require('./brsrMasterReportFields/purpose.js');
const radioactiveFields = require('./brsrMasterReportFields/radioactive.js');
const rationaleFields = require('./brsrMasterReportFields/rationale.js');
const reachFields = require('./brsrMasterReportFields/reach.js');
const reasonsFields = require('./brsrMasterReportFields/reasons.js');
const reclaimedFields = require('./brsrMasterReportFields/reclaimed.js');
const recycledFields = require('./brsrMasterReportFields/recycled.js');
const recyclingFields = require('./brsrMasterReportFields/recycling.js');
const remarkFields = require('./brsrMasterReportFields/remark.js');
const remarksFields = require('./brsrMasterReportFields/remarks.js');
const remarksforFields = require('./brsrMasterReportFields/remarksfor.js');
const reportingFields = require('./brsrMasterReportFields/reporting.js');
const retentionFields = require('./brsrMasterReportFields/retention.js');
const returnFields = require('./brsrMasterReportFields/return.js');
const revenueFields = require('./brsrMasterReportFields/revenue.js');
const sFields = require('./brsrMasterReportFields/s.js');
const safeFields = require('./brsrMasterReportFields/safe.js');
const siaFields = require('./brsrMasterReportFields/sia.js');
const specificFields = require('./brsrMasterReportFields/specific.js');
const stakeholderFields = require('./brsrMasterReportFields/stakeholder.js');
const stateFields = require('./brsrMasterReportFields/state.js');
const statementFields = require('./brsrMasterReportFields/statement.js');
const statusFields = require('./brsrMasterReportFields/status.js');
const stepsFields = require('./brsrMasterReportFields/steps.js');
const telephoneFields = require('./brsrMasterReportFields/telephone.js');
const theFields = require('./brsrMasterReportFields/the.js');
const topicsFields = require('./brsrMasterReportFields/topics.js');
const totalFields = require('./brsrMasterReportFields/total.js');
const turnoverFields = require('./brsrMasterReportFields/turnover.js');
const typeFields = require('./brsrMasterReportFields/type.js');
const valueFields = require('./brsrMasterReportFields/value.js');
const volatileFields = require('./brsrMasterReportFields/volatile.js');
const wasteFields = require('./brsrMasterReportFields/waste.js');
const waterFields = require('./brsrMasterReportFields/water.js');
const webFields = require('./brsrMasterReportFields/web.js');
const weblinkFields = require('./brsrMasterReportFields/weblink.js');
const websiteFields = require('./brsrMasterReportFields/website.js');
const whatFields = require('./brsrMasterReportFields/what.js');
const whetherFields = require('./brsrMasterReportFields/whether.js');

const brsrMasterReportSchema = mongoose.Schema({
    ...aFields,
    ...actionFields,
    ...addressFields,
    ...amountFields,
    ...amountsFields,
    ...anFields,
    ...antiFields,
    ...anyFields,
    ...areFields,
    ...aspirationalFields,
    ...assuranceFields,
    ...assurerFields,
    ...averageFields,
    ...basisFields,
    ...batteryFields,
    ...benefitFields,
    ...bioFields,
    ...boundaryFields,
    ...briefFields,
    ...categoryFields,
    ...channelsFields,
    ...companyFields,
    ...complaintsFields,
    ...complianceFields,
    ...constructionFields,
    ...consumerFields,
    ...contactFields,
    ...corporateFields,
    ...correctiveFields,
    ...costFields,
    ...countryFields,
    ...csrFields,
    ...dateFields,
    ...deductedFields,
    ...desclosureFields,
    ...describeFields,
    ...descriptionFields,
    ...designationFields,
    ...detailsFields,
    ...didFields,
    ...discloseFields,
    ...disclosureFields,
    ...districtFields,
    ...doFields,
    ...doesFields,
    ...eFields,
    ...eiaFields,
    ...energyFields,
    ...entityFields,
    ...environmentalFields,
    ...financialFields,
    ...financialYearFields,
    ...frequencyFields,
    ...fromFields,
    ...grievanceFields,
    ...grossFields,
    ...hasFields,
    ...hazardousFields,
    ...highFields,
    ...humanFields,
    ...inFields,
    ...indicateFields,
    ...initiativeFields,
    ...intellectualFields,
    ...isFields,
    ...itFields,
    ...locationFields,
    ...lostFields,
    ...materialFields,
    ...mechanismsFields,
    ...medianFields,
    ...methodFields,
    ...nFields,
    ...nameFields,
    ...natureFields,
    ...netFields,
    ...ngrbcFields,
    ...nicFields,
    ...notesFields,
    ...numberFields,
    ...otherFields,
    ...outcomeFields,
    ...ownedFields,
    ...particulateFields,
    ...percentageFields,
    ...performanceFields,
    ...persistentFields,
    ...plasticFields,
    ...processesFields,
    ...productFields,
    ...projectFields,
    ...provideFields,
    ...publicFields,
    ...purposeFields,
    ...radioactiveFields,
    ...rationaleFields,
    ...reachFields,
    ...reasonsFields,
    ...reclaimedFields,
    ...recycledFields,
    ...recyclingFields,
    ...remarkFields,
    ...remarksFields,
    ...remarksforFields,
    ...reportingFields,
    ...retentionFields,
    ...returnFields,
    ...revenueFields,
    ...sFields,
    ...safeFields,
    ...siaFields,
    ...specificFields,
    ...stakeholderFields,
    ...stateFields,
    ...statementFields,
    ...statusFields,
    ...stepsFields,
    ...telephoneFields,
    ...theFields,
    ...topicsFields,
    ...totalFields,
    ...turnoverFields,
    ...typeFields,
    ...valueFields,
    ...volatileFields,
    ...wasteFields,
    ...waterFields,
    ...webFields,
    ...weblinkFields,
    ...websiteFields,
    ...whatFields,
    ...whetherFields
}, {
    timestamps: true
});

const BRSRMasterReport = mongoose.model('BRSRMasterReport', brsrMasterReportSchema);
module.exports = BRSRMasterReport;
