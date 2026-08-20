/**
 * Content seeder — real SustainSutra work product, ready for launch.
 *
 * Seeds:
 *   - 8 published blog posts (Insights) — drawn from actual engagement
 *     experience and regulatory knowledge.
 *   - 4 anonymized case studies (Resources, type=casestudy).
 *   - 4 downloadable templates (type=template) — files served from
 *     public/downloads/.
 *   - 6 regulatory updates (type=update).
 *
 * Idempotent: every seeded doc carries tag/marker "ss-seed"; re-running
 * deletes previous seeded docs of that kind first. Manually-created admin
 * content is never touched.
 *
 * Usage: cd backend && node seeders/contentSeeder.js
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/blogModel');
const Resource = require('../models/resourceModel');
const connectDB = require('../config/db');

dotenv.config();

const AUTHOR = 'Amit Kumar';
const AUTHOR_BIO = 'Founder & CEO, SustainSutra GreenTech LLP. ISO 14064 Lead Verifier (GHG) and EPD/PCF verification expert working across carbon accounting, CBAM compliance, ESG reporting, energy and water audits for industry.';

/* ------------------------------------------------------------------ */
/* BLOG POSTS                                                          */
/* ------------------------------------------------------------------ */
const blogs = [
    {
        title: 'EU CBAM 2026: The Definitive Period Has Begun — What Exporters Must Do Now',
        slug: 'eu-cbam-2026-definitive-period-exporter-actions',
        excerpt: 'The CBAM transitional reporting era is over. From 2026, embedded emissions in imported steel, aluminium, cement, fertilisers, hydrogen and electricity carry a real financial cost. Here is the practical compliance path.',
        category: 'Carbon Markets',
        tags: ['CBAM', 'EU', 'Exporters', 'Carbon Pricing', 'Compliance'],
        featuredImage: '/images/blog/cbam-definitive-2026.jpg',
        publishDate: 'Aug 18, 2026',
        readTime: '7 min read',
        content: `The European Union’s Carbon Border Adjustment Mechanism has moved from paperwork to payment. After the transitional reporting phase, the definitive period that began in January 2026 means importers of iron and steel, aluminium, cement, fertilisers, hydrogen and electricity must surrender CBAM certificates priced against EU ETS allowances — with the free allocation phase-out ramping up through 2032.

## What actually changed in 2026

During transition, the risk was inaccurate reports. Now the risk is financial: every tonne of embedded emissions above free-allocation benchmarks carries a certificate cost tied to EU ETS prices. For Indian exporters of long steel, primary aluminium and cement — sectors with some of the highest embedded emission intensities in the world — this is a direct margin event.

The math is unforgiving. A BF-BOF steel route exporting to the EU can carry roughly 2-2.5 tCO2e per tonne of product against EU benchmark allocations that are far lower. As the phase-out schedule advances, the payable share grows every year through 2032.

## The four things exporters must have in place

### 1. Actual embedded emissions data
Default values are the expensive option — they are deliberately set conservatively. Installing an actual-data measurement approach per the implementing regulation (facility-level, product-level, following the CBAM communication template) usually reduces declared intensity significantly versus defaults. This requires a functioning metering and data-management system at the installation, not a spreadsheet assembled at quarter-end.

### 2. A verification-ready data chain
From 2026, emissions data must withstand verification. That means documented data collection procedures, controlled calculation files, traceable source documents for every activity datapoint, and an internal review before declaration. In our verification practice, the most common finding is not wrong mathematics — it is missing evidence trails.

### 3. De minimis and value-chain clarity
Know precisely which precursor goods and minor flows enter your product system. Simplified procedures exist for small importers, but exporters supplying multiple EU importers need one consistent product carbon footprint, not ad-hoc numbers per customer questionnaire.

### 4. A commercial strategy, not just a compliance plan
CBAM cost allocation is already appearing in EU procurement negotiations. Exporters with verified, lower-than-default intensities hold a genuine commercial advantage — and can defend price. Those without data accept whatever default-based deduction the importer applies.

## Where we see companies lose money

> Treating CBAM as a reporting exercise rather than a pricing exposure. The declaration is the output; the margin protection comes from measurement discipline, verification readiness and negotiation preparedness.

Common failure points: using default values out of convenience, excluding precursor inputs that must be counted, inconsistent boundaries between the CBAM report and the company GHG inventory, and leaving verification findings unresolved until the filing deadline.

## The window that still exists

Certificate purchases scale with the phase-out schedule, so 2026 exposure is the lowest it will ever be. That makes this year the cheapest possible time to build the measurement system, run a pre-verification gap assessment, and correct data-chain weaknesses — before the payable share grows.

SustainSutra runs CBAM readiness engagements covering embedded emissions calculation, data-chain hardening and verification preparation. If you export covered goods into the EU, start with an exposure screening — it costs a fraction of one quarter of avoidable certificate over-payment.`,
    },
    {
        title: "UK CBAM Arrives January 2027: Why Early Preparation Beats Late Scrambling",
        slug: 'uk-cbam-2027-preparation-for-exporters',
        excerpt: 'The UK\u2019s own Carbon Border Adjustment Mechanism starts on 1 January 2027 covering iron, steel, aluminium, cement, fertilisers and hydrogen. Exporters already handling EU CBAM should not assume one system covers both.',
        category: 'Carbon Markets',
        tags: ['CBAM', 'UK', 'Exporters', 'Trade Policy'],
        featuredImage: '/images/blog/uk-cbam-2027.jpg',
        publishDate: 'Aug 14, 2026',
        readTime: '5 min read',
        content: `The United Kingdom confirmed its Carbon Border Adjustment Mechanism will apply from 1 January 2027, covering iron and steel (including downstream products), aluminium, cement, fertilisers and hydrogen — a list deliberately close to the EU regime, with ceramics and glass added to the scope later.

## Same idea, two different systems

The UK scheme prices embedded emissions against the UK ETS allowance price, with its own registration, reporting and certificate mechanics administered by HMRC. For exporters, the practical consequence is that EU CBAM compliance does not transfer automatically: product coverage, benchmark logic, default values and filing calendars differ.

A steel product just outside EU CBAM scope may still fall inside UK scope — the UK list includes certain downstream steel and aluminium goods that the EU excludes. Exporters serving both markets need a coverage matrix per product code, not a single assumption.

## What to do between now and January 2027

### Map your exposure precisely
Classify every exported product against both regimes' commodity codes. Determine which customers are UK importers of record and what they will demand from you contractually.

### Re-use your measurement investment
The expensive part — installation-level metering, product-level carbon accounting, evidence trails — serves both regimes. Build the data system once; format outputs twice.

### Negotiate contract terms now
Forward contracts signed in 2026 for 2027 delivery should already allocate CBAM liability, specify the data the exporter will provide, and set the verification standard. Silence here becomes a dispute later.

> Exporters who treated EU CBAM preparation as a one-off are about to pay for that assumption twice.

## The India-UK trade angle

For Indian exporters, UK CBAM has become a live topic in India-UK FTA implementation discussions, alongside steel safeguard measures. Whatever the negotiation outcome, the compliance machinery arrives on schedule — trade remedies may change the level of the burden, not the need to measure embedded emissions accurately.

SustainSutra maintains a joint EU+UK CBAM exposure workbook for clients covering both scopes from a single dataset. The marginal cost of adding UK readiness to an existing EU programme is small; retrofitting it after January 2027 under deadline pressure is not.`,
    },
    {
        title: "India’s Carbon Credit Trading Scheme: From Obligation to Opportunity",
        slug: 'india-ccts-compliance-to-carbon-credits',
        excerpt: 'The Carbon Credit Trading Scheme creates India\u2019s first domestic compliance carbon market. Here is how the offset mechanism, obligated entities and compliance cycle fit together — and where non-obligated industries can benefit.',
        category: 'Carbon Markets',
        tags: ['CCTS', 'India', 'Carbon Credits', 'Energy Conservation Act', 'Offset Projects'],
        featuredImage: '/images/blog/india-ccts-explained.jpg',
        publishDate: 'Aug 8, 2026',
        readTime: '6 min read',
        content: `India’s Carbon Credit Trading Scheme (CCTS), notified under the amended Energy Conservation Act, is the country’s first compliance-grade domestic carbon market. It runs on two tracks: a compliance mechanism for obligated entities (the energy-intensive designated consumers), and an offset mechanism that lets non-obligated projects generate tradable carbon credit certificates.

## How the two tracks work

### The compliance track
Obligated entities receive emission intensity targets for their sector. Entities that beat their target sell surplus certificates; entities that miss it buy certificates to cover the shortfall. The first compliance cycles have begun rolling out sector by sector, with targets moving from intensity-based reductions toward deeper cuts over time.

### The offset mechanism
Projects in eligible activities — renewable energy, energy efficiency, afforestation, waste management, green hydrogen among the notified categories — can register and issue Carbon Credit Certificates after following the approved methodology, registration and verification process. These certificates flow to the compliance market and to voluntary buyers.

## Where the opportunity sits for industry

> Most medium-sized plants are neither obligated entities nor registered offset projects — and are therefore standing still while a market forms around them.

For obligated-sector plants, the priority is simple: a credible baseline. Emission intensity targets reward plants that can document current performance precisely, because targets and trajectory are set against that baseline. Weak baseline data locks in a weak position for years.

For non-obligated plants, the offset mechanism converts projects that already make economic sense — waste-heat recovery, process efficiency, biogas, solar — into assets with a second revenue line. The critical questions are additionality, methodology fit and MRV (measurement, reporting, verification) readiness before any registration investment.

## What we advise clients to do now

### 1. Establish whether you are obligated
Check the designated-consumer notifications against your sector and energy consumption thresholds. Obligation changes your entire compliance calendar.

### 2. Build the MRV spine
Whether for compliance baselines or offset projects, verified data is the entry ticket. Activity data, metering, calculation procedures and internal review — the same discipline our ISO 14064 verification practice demands.

### 3. Screen the project portfolio
Not every project qualifies, and registration costs are real. Screen for additionality risk, methodology match and expected credit volumes before spending on registration.

CCTS is no longer a policy announcement — it is an operating market with real pricing ahead. Plants that engage early will set their baselines on their own terms.`,
    },
    {
        title: 'Scope 3: The 80% of Your Footprint You Cannot See',
        slug: 'scope-3-emissions-supply-chain-primer',
        excerpt: 'For most industrial companies, Scope 3 dominates the GHG inventory — often 70-90% of total emissions. A practical guide to the 15 categories, data strategies that actually work, and where to start when everything seems material.',
        category: 'GHG Accounting',
        tags: ['Scope 3', 'GHG Protocol', 'Value Chain', 'Supplier Engagement', 'ISO 14064'],
        featuredImage: '/images/blog/scope-3-primer.jpg',
        publishDate: 'Jul 30, 2026',
        readTime: '8 min read',
        content: `Ask a manufacturer to estimate their carbon footprint and they will usually describe their boilers, furnaces, DG sets and electricity bills — Scope 1 and Scope 2. For most industrial companies those scopes are the minority of the story. Purchased materials, inbound and outbound logistics, product use and end-of-life collectively dominate: commonly 70-90% of the total footprint sits in the value chain.

## The 15 categories, grouped by where the data lives

The GHG Protocol’s Scope 3 standard defines 15 categories. The practical way to handle them is by data source:

### Spend-based and supplier-driven (upstream)
Purchased goods and services (Category 1) is almost always the largest single category for manufacturers — raw materials, chemicals, packaging, outsourced services. Capital goods (Category 2), business travel (Category 6) and purchased services follow the same pattern.

### Operational data-driven (both directions)
Fuel- and energy-related activities (Category 3), upstream and downstream transport (Categories 4 and 9), waste generated in operations (Category 5) — these come from your own operational records.

### Product-linked (downstream)
Use of sold products (Category 11) dominates for fuel-burning equipment and energy-consuming goods; end-of-life treatment (Category 12) for packaging-intensive products. For some sectors — cement sold into concrete, for instance — downstream categories dwarf everything upstream.

## The data strategy that actually works

> The most common Scope 3 failure is paralysis: waiting for supplier-specific data that will never arrive, or screening everything at maximum precision on day one.

The professional sequence is:

### 1. Screen first
Run all 15 categories with spend-based or average-data methods. The result is approximate — deliberately. Its job is to tell you which categories matter.

### 2. Refine where it counts
Take the top two or three categories and improve method quality: supplier-specific data for key materials, distance-based logistics calculations, product-use modelling. This is where reporting-grade accuracy lives.

### 3. Engage suppliers strategically
Do not send a data request to 400 suppliers. Send it to the 20 that cover 80% of Category 1 impact, with a clear template and a deadline. Then decide whether to weight the rest by spend.

### 4. Set the boundary honestly
Declaring categories excluded and why is a requirement of the standard, not an admission of defeat. An inventory that claims completeness it cannot support fails verification; one that documents its boundary passes.

## Scope 3 under verification

ISO 14064-3 verification of a Scope 3-containing inventory focuses on: method selection justification, data quality indicators, and the treatment of estimates. Verifiers do not reject estimation — they reject undocumented estimation. Every number needs a trail: source, method, uncertainty and reviewer.

## Why this matters commercially

CBAM embeds your process emissions in your customer’s import cost. BRSR and ISSB-aligned disclosures push value-chain questions down to suppliers. CDP supply-chain programmes do the same. The manufacturers who can answer a customer’s Scope 3 questionnaire in two weeks — with methods and evidence — win tenders against those who take two months or answer with platitudes.

Scope 3 is where the footprint is. Increasingly, it is also where the procurement decisions are.`,
    },
    {
        title: 'BRSR Beyond Compliance: Building a Report That Stands Up to Assurance',
        slug: 'brsr-beyond-compliance-assurance-readiness',
        excerpt: 'BRSR now covers India\u2019s top listed entities with assurance moving from optional to expected. The difference between a report that survives scrutiny and one that does comes down to data architecture, not writing quality.',
        category: 'ESG & Reporting',
        tags: ['BRSR', 'SEBI', 'ESG Reporting', 'Assurance', 'NGRBC'],
        featuredImage: '/images/blog/brsr-assurance-readiness.jpg',
        publishDate: 'Jul 22, 2026',
        readTime: '6 min read',
        content: `India’s Business Responsibility and Sustainability Reporting framework, mandated by SEBI for the top listed entities and progressively widened, has moved Indian corporate disclosure from voluntary narrative to structured, indicator-based reporting aligned with the nine NGRBC principles. With the top 1000 (and expanding universe) filing annually and external assurance increasingly expected, the question is no longer whether to report but whether the report will hold.

## What BRSR actually demands architecturally

BRSR is not a writing exercise. It is a data exercise: hundreds of quantitative indicators across energy, water, emissions, waste, employment, governance and value chain — each requiring a number, a basis of preparation, and increasingly an assurance trail.

The reports that fail assurance share the same failure mode: numbers assembled at filing time from scattered emails, with no consistent basis of preparation between years and no reconciliation to statutory or financial records.

## The four disciplines of a defensible report

### 1. One data backbone, many disclosures
Energy consumption should reconcile across the BRSR section, the energy audit, and statutory filings. Water withdrawal should match CGWA/no-objection records where they exist. Build the indicator set as a structured data model with owners and sources — the report then becomes an output, not an assembly project.

### 2. Defined boundaries, stated honestly
Consolidated vs standalone, which subsidiaries are in, how value-chain disclosures are handled — these must be explicit and consistent. Verifiers test boundary consistency before they test any number.

### 3. Year-on-year restatement discipline
When methodology improves, restate the comparison year and say so. Silent methodology changes are the single most common assurance finding we see.

### 4. Leadership indicator strategy
The leadership indicators separate adequate reports from strong ones. Decide deliberately which to pursue — supply-chain ESG engagement, lifecycle assessments, third-party assurance itself — and build the underlying capability rather than aspirational ticks.

## The commercial reading

BRSR data feeds ESG ratings, lender assessments and large-tender questionnaires. The same data backbone that makes assurance smooth also makes rating responses fast. Companies that treat BRSR as an annual data emergency pay for it three times: in assurance findings, in weak ratings, and in missed tenders.

> A BRSR report is a by-product of a working sustainability data system. Build the system; the report writes itself.

SustainSutra runs BRSR readiness and reporting engagements on exactly this principle: indicator data model first, evidence trails alongside, report generation last. For entities approaching their first assured cycle, the preparation gap is usually six months of data discipline — cheap insurance against a qualified assurance conclusion.`,
    },
    {
        title: 'EPD Verification Under EN 15804+A2: What Verifiers Actually Check',
        slug: 'epd-verification-en15804-a2-findings',
        excerpt: 'Environmental Product Declarations are becoming procurement requirements in construction and industry. From the verifier\u2019s side of the table: the common findings that stall declarations under EN 15804+A2 — and how to avoid them.',
        category: 'LCA & EPD',
        tags: ['EPD', 'EN 15804+A2', 'LCA', 'Verification', 'ISO 14025', 'Construction'],
        featuredImage: '/images/blog/epd-verification-findings.jpg',
        publishDate: 'Jul 15, 2026',
        readTime: '7 min read',
        content: `Environmental Product Declarations are shifting from differentiator to requirement — green building rating systems, public procurement and large industrial buyers increasingly demand verified EPDs to EN 15804+A2. Having sat on the verification side of this process, I can say the pattern of delays is remarkably consistent. Here is what actually gets checked, and what goes wrong.

## The two-document reality

An EPD verification is really two parallel checks: the background LCA report against the calculation rules, and the EPD document itself against the programme and standard requirements. Weak submissions almost always conflate them — a polished EPD resting on a thin LCA report, or a strong LCA wrapped in an EPD that omits required content.

## Where declarations stall — the recurring findings

### Declared vs functional unit confusion
The unit must match how the product is actually specified and compared. For construction products, the functional unit with its reference service life drives everything downstream. Mismatched units surface at verification, sometimes after the LCA is complete.

### Module coverage and the A1-A3 trap
EN 15804+A2 requires declared modules to be explicit, with A1-A3 mandatory. Stages marked as "not declared" need justification; stages marked as included need numbers behind them. The frequent finding: A4-A5 declared with transport distances that trace to nothing.

### Electricity modelling
Grid electricity is where plausibility is tested hardest. Country-specific consumption mixes, supplier-specific data, and the treatment of exported electricity must follow the programme’s calculation rules. Generic assumptions copied from another country’s dataset are flagged immediately.

### Biogenic carbon and end-of-life
A2 tightened this area substantially: biogenic carbon accounting, the end-of-life module and the treatment of packaging each draw specific checks. One-directional carbon neutrality claims that ignore the full cycle do not survive.

### Data quality documentation
Every significant dataset needs a documented source, geography, and vintage. Verifiers sample: if the three largest inputs trace to ten-year-old secondary data with no comment, the whole inventory inherits that doubt.

## How to reach verification smoothly

> Prepare the LCA report as if the verifier will audit every number — because a competent one samples until a pattern is established, and the pattern is set by your largest flows.

The clean path: calculation rules followed from the start (not retrofitted), declared units and modules fixed before modelling begins, electricity and end-of-life treated explicitly, data quality documented inline, and the EPD drafted directly from the programme template with nothing paraphrased.

For manufacturers in steel, cement, aluminium, chemicals and construction products targeting EPDs, the economic case increasingly writes itself — verified declarations unlock green-building procurement and export markets. The verification itself is predictable for those who prepare; it is only painful for those who treat it as an afterthought.`,
    },
    {
        title: 'The Hidden Profit in Your Water Balance: Lessons from a Chemical Complex Audit',
        slug: 'water-audit-hidden-profit-chemical-complex',
        excerpt: 'An integrated water audit at a coal-tar and carbon black complex mapped every kilolitre from borewell to discharge — and found more annual savings in the steam condensate system than in all the "water" projects combined.',
        category: 'Resource Efficiency',
        tags: ['Water Audit', 'Water Balance', 'Condensate Recovery', 'Chemical Industry', 'Resource Efficiency'],
        featuredImage: '/images/blog/water-audit-hidden-profit.jpg',
        publishDate: 'Jul 5, 2026',
        readTime: '7 min read',
        content: `When we begin an industrial water audit, clients expect the findings in the obvious places: cooling tower cycles, effluent treatment recycling, rainwater harvesting. At a recent integrated water audit of a coal-tar processing and carbon black complex in Bihar, the single largest finding was somewhere few plants look — the steam condensate return system.

## What the numbers showed

The complex consumed roughly 5,050 kld of fresh water. The water balance — built source by source, use by use, with every unmetered stream flagged rather than assumed — revealed that boiler DM water makeup was around 700 kld while condensate returning to the boiler house was only 30-40 kld.

A return rate of 5-6%. Industry good practice for a process complex of this type runs 75-85%.

## Why this is a money problem, not just a water problem

Every kilolitre of condensate dumped carries three costs: the water itself, the heat invested in making that condensate, and the demineralisation chemicals and regeneration that treated it. Valued together, each lost kilolitre costs the plant roughly Rs 190.

At 660 kld of avoidable loss per day, that is on the order of Rs 4.6 crore per year — larger than every other identified water saving combined, and larger than most energy projects the plant had evaluated that year.

## The recovery programme we specified

### Steam trap survey and repair
Aged trap populations leak silently; systematic survey and replacement is the cheapest first step.

### Condensate receivers and return pumping
Modest capital, immediate return — targeted at the 250-350 kld band of recoverable condensate closest to the boiler house.

### Flash steam recovery
High-pressure condensate dumps flash steam at atmosphere; recovery captures both heat and water.

### Insulation and metering
You cannot manage what the balance cannot see — flow meters on return lines make the recovery rate a daily visible KPI.

## The methodological lesson

Two disciplines made this finding possible, and both are transferable to any plant:

> First: the balance is built from measurements, not assumptions. Where data did not exist, we marked the gap as a gap — with a named verification action — rather than papering over it with plausible arithmetic. Gaps are findings too; they tell you where meters and procedures are missing.

Second: cooling tower evaporation was recalculated from blowdown using the cycles-of-concentration relationship — evaporation equals blowdown multiplied by (CoC minus 1) — rather than rule-of-thumb estimates. That single correction moved the reconciliation gap from unexplainable to small enough to investigate.

Water audits pay when they follow the energy. Steam systems, condensate return, cooling chemistry — the largest "water" savings usually live where water and energy interact. If your plant runs boilers and returns little condensate, you do not need an audit to know your first project.`,
    },
    {
        title: 'GHG Verification: Materiality, Evidence and the Discipline Verifiers Look For',
        slug: 'ghg-verification-materiality-evidence-discipline',
        excerpt: 'ISO 14064-3 verification is less about recalculation than about evidence. What materiality actually means in a GHG verification, how sampling works, and the internal habits that make an inventory verification-ready.',
        category: 'GHG Accounting',
        tags: ['ISO 14064', 'Verification', 'Materiality', 'GHG Inventory', 'Assurance'],
        featuredImage: '/images/blog/ghg-verification-discipline.jpg',
        publishDate: 'Jun 25, 2026',
        readTime: '6 min read',
        content: `A greenhouse gas verification under ISO 14064-3 is often imagined as an auditor recalculating your inventory line by line. In practice it is an evidence evaluation: the verifier builds an opinion by sampling data trails, testing your procedures, and establishing whether your numbers can be reproduced from your records. Inventories fail not because the arithmetic is wrong but because the trail is missing.

## Materiality — the concept most teams misread

Materiality in GHG verification has both quantitative and qualitative dimensions. The quantitative thresholds (commonly 5% at the inventory level, tighter for individual categories in some programmes) guide whether a discrepancy is tolerable. The qualitative dimension is harsher: a systematic error, a boundary that excludes a significant source by choice rather than justification, or an inconsistency with prior-year methods can be material regardless of tonnage.

> A small error repeated across every fuel record is more serious than one large error found and corrected. System is always more material than size.

## How the sampling actually works

The verifier stratifies your inventory: large sources, key categories, and estimates receive proportionally deeper testing. For each sampled item, the trail runs: source document, transcription into the data system, emission factor selection, calculation, aggregation, and reporting. Any break in that chain — a logbook that does not match the invoice, a factor with no cited source, a spreadsheet with no owner — weakens the opinion.

## The habits that make verification smooth

### Version-controlled calculation files
Named, dated, with change history. Anonymous final_v7.xlsx undermines confidence before any number is examined.

### Documented factor selection
Every emission factor cited with source and vintage. Where professional judgement chose a factor, the rationale is written down.

### Internal review before submission
A second person checks the inventory against the checklist the verifier will use. Most findings are self-findable.

### Consistency across disclosures
The GHG report, the sustainability report, the BRSR filing and the CBAM declaration must tell one story with one set of numbers. Cross-document inconsistency is the fastest route to a qualified conclusion.

### Uncertainty acknowledged, not hidden
An inventory that states its uncertainty and data quality honestly is more credible — and easier to verify — than one claiming precision it cannot evidence.

## Why verification-readiness is a year-round practice

Plants that pass verification comfortably treat the inventory as a living system: metering maintained, records filed as generated, data owners named, and quarterly internal checks. Plants that assemble the inventory in the final month before verification pay for it in findings, delays and re-verification cost.

Verification is not an exam to cram for. It is an audit of whether your environmental data system exists — and it rewards the same disciplines financial reporting learned decades ago.`,
    },
];

/* ------------------------------------------------------------------ */
/* CASE STUDIES (type=casestudy)                                       */
/* ------------------------------------------------------------------ */
const caseStudies = [
    {
        title: 'Integrated Water Audit, Coal-Tar & Carbon Black Complex',
        client: 'Coal-tar processing and carbon black complex, Bihar (identity confidential)',
        clientIndustry: 'Chemicals & Carbon Products',
        date: '2026',
        challenge: 'A multi-plant chemical complex processing coal tar into downstream products, with carbon black manufacturing, consumed ~5,050 kld of fresh water daily across process, cooling, boiler and domestic uses. Multiple borewells, partially metered distribution, dilution practices in effluent management, and no consolidated water balance meant management had no reliable picture of where water went — or what reduction was realistically achievable.',
        solution: 'We built a full source-to-discharge water balance: every borewell measured individually, every use point characterised (DM plant, softeners, cooling towers, quench, pelletising, floor wash, bathing, canteen), and every unmetered stream explicitly flagged as a verification gap rather than papered over with assumptions. Cooling tower evaporation was recalculated from blowdown and cycles of concentration using the CoC relationship. The audit produced a 45% reduction roadmap (to ~2,775 kld) sequencing 12 measures by payback — from condensate return recovery and CT plume condensation to pelletisation exhaust heat recovery and MEE brine recovery.',
        results: '45% fresh-water reduction roadmap (~2,275 kld/day); single largest finding — condensate return rate of 5-6% against a 75-85% benchmark, valued at ~Rs 4.6 crore/year across water, heat and DM chemicals; CT evaporation correction closed the water balance reconciliation gap from ~1,350 to ~130 kld.',
        impact: 'The complex moved from an unmeasured water position to a costed, sequenced reduction programme with named verification actions for every data gap — turning water from an operational blind spot into a managed cost line.',
        image: '/images/cases/water-audit-complex.jpg',
    },
    {
        title: 'Decentralised STP Programme: 3 Plants, 215 kld Design Suite',
        client: 'Coal-tar & carbon black complex, Bihar (identity confidential)',
        clientIndustry: 'Chemicals & Carbon Products',
        date: '2026',
        challenge: 'The complex needed sewage treatment for three separate catchments — plant-bathing/canteen areas and the main township — totalling 215 kld. Bathing water from carbon black plant areas carries 30-100 mg/L of carbon black fines, which would destroy conventional biological treatment biomass if untreated. Seven technology configurations (MBBR and attached-growth variants, with and without nitrification, DAF pre-treatment options) had to be evaluated per site.',
        solution: 'We delivered seven plant-specific Detailed Project Reports with full engineering: SALR-based MBBR and attached-growth reactor sizing, DAF pre-treatment sized for carbon black removal (97-99% on soapy water at design air-to-solids ratio), complete solids balance sizing sludge drying on captured TSS plus biomass (not biomass alone), nitrification oxygen demand at 4.57 kg O2 per kg N, life-cycle costing with sensitivity analysis, and GFC-input drawing packages explicitly scoped for licensed structural engineering sign-off.',
        results: '7 DPRs across 3 sites (75 + 40 + 100 kld) with 50-54 tables each; inter-stage BOD loading check redesigned one configuration to protect nitrification; capital programme of ~Rs 2 crore with Rs 41 lakh/year operating basis; design-basis honesty framework separating measured flows from typical-values assumptions with a composite-sampling verification protocol.',
        impact: 'The client received investment-grade engineering documents for every site, with treatment trains selected per catchment chemistry — and a clear, honest data-verification path before construction commitment.',
        image: '/images/cases/stp-programme.jpg',
    },
    {
        title: 'Phenol-Laden Effluent: Engineering the End of Dilution',
        client: 'Coal-tar chemical complex, Bihar (identity confidential)',
        clientIndustry: 'Chemicals & Carbon Products',
        date: '2026',
        challenge: 'High-strength phenolic effluent (phenol 2,700-4,000 mg/L, high TDS) was being diluted with ~360 kld of fresh water before biological treatment — consuming enormous fresh-water volume while loading the biology with the same pollutant mass. Management needed to know whether dilution could genuinely be eliminated, and by which treatment train, without a full-scale gamble.',
        solution: 'We ran a structured technology feasibility assessment: energy-balance rejection of direct incineration (effluent is ~99% water — net energy deficit with refractory risk from melted salts), MEE-versus-MVR comparison (MVR cheaper on OPEX but unacceptable scaling/foaming risk with 40 ppm silica), and a biological pathway — IFAS (Integrated Fixed-film Activated Sludge) with protected biofilm carriers and 15-25 day SRT — able to degrade phenol at 2,000+ mg/L after a staged 8-week acclimatisation. Physical-chemical tertiary (DAF + filtration + activated carbon) was positioned after biology, where carbon lasts months — not before, where it saturates in hours.',
        results: 'Dilution elimination confirmed feasible with source pretreatment + IFAS biology; fresh-water saving of 360 kld/day; net annual benefit of ~Rs 47-96 lakh after treatment costs; phenol revenue recovery via solvent extraction recommended as complementary, not mandatory.',
        impact: 'A plant that was spending crores on dilution water learned that the pollutant molecule — not the water volume — was the problem. The engineering case replaced a practice that could never have worked with one that demonstrably does.',
        image: '/images/cases/phenol-treatment.jpg',
    },
    {
        title: 'ESMS Framework for a 43-Site Renewable Energy Portfolio',
        client: 'Renewable energy independent power producer (43 sites: 23 solar, 15 hydro, 5 BESS)',
        clientIndustry: 'Renewable Energy',
        date: '2026',
        challenge: 'An RFP required an Environmental & Social Management System covering 43 operating sites across three technologies — solar farms, run-of-river hydro and battery energy storage — under IFC Performance Standards alignment, within a structured 16-week programme and lumpsum-plus-reimbursable commercial format.',
        solution: 'We structured an 8-phase ESMS engagement: policy and gap baseline, risk-rated site screening (biodiversity, community, labour, safety per technology type), ESMS documentation architecture, site-level management plans, grievance and stakeholder frameworks, training and rollout, internal audit, and an optional third-party audit phase quoted separately in remote and site modes with explicit per-site pricing.',
        results: 'Winning-format proposal delivered with full team CV matrix (engagement director, senior environmental/H&S specialists, biodiversity lead, ESG governance, data experts, field executives, legal and finance), 6-milestone payment structure, and a two-phase reimbursables budget separated from the lumpsum fee.',
        impact: 'The engagement demonstrates SustainSutra\u2019s capability to structure lender-standard environmental & social governance programmes for multi-technology portfolios — the same discipline applied to our industrial clients\u2019 single-site compliance systems.',
        image: '/images/cases/esms-portfolio.jpg',
    },
];

/* ------------------------------------------------------------------ */
/* TEMPLATES (type=template) — files in public/downloads/              */
/* ------------------------------------------------------------------ */
const templates = [
    {
        title: 'CBAM Exporter Readiness Checklist',
        type: 'template',
        description: 'A structured 40-point self-assessment for exporters of CBAM-covered goods into the EU: product scoping, embedded emissions data readiness, verification preparedness, contract terms and timeline discipline.',
        fileUrl: '/downloads/SustainSutra_CBAM_Exporter_Readiness_Checklist.pdf',
        date: '2026',
    },
    {
        title: 'BRSR Readiness Self-Assessment',
        type: 'template',
        description: 'A readiness diagnostic across the BRSR disclosure architecture: data backbone, boundaries, principle-wise KPI coverage, leadership indicators and assurance preparation — with gap columns for each block.',
        fileUrl: '/downloads/SustainSutra_BRSR_Readiness_Checklist.pdf',
        date: '2026',
    },
    {
        title: 'SPCB Consent & Compliance Calendar (Excel)',
        type: 'template',
        description: 'Working Excel calendar for Red/Orange/Green category industries: consent-to-operate validity tracking, environmental statement (Sept 30), hazardous waste returns (Jun 30), monthly/quarterly lab monitoring, OCEMS checks — with auto-status formulas.',
        fileUrl: '/downloads/SustainSutra_Consent_Compliance_Calendar.xlsx',
        date: '2026',
    },
    {
        title: 'GHG Inventory Data Collection Template (Excel)',
        type: 'template',
        description: 'Scope 1/2/3 data collection workbook aligned with ISO 14064-1:2018 categories — activity data fields, factor source columns, data-owner and uncertainty fields designed to survive verification sampling.',
        fileUrl: '/downloads/SustainSutra_GHG_Data_Collection_Template.xlsx',
        date: '2026',
    },
];

/* ------------------------------------------------------------------ */
/* REGULATORY UPDATES (type=update)                                    */
/* ------------------------------------------------------------------ */
const regulatoryUpdates = [
    {
        title: 'EU CBAM definitive period in operation — certificate obligations begin',
        summary: 'The Carbon Border Adjustment Mechanism’s definitive period is now running: EU importers of covered goods (iron & steel, aluminium, cement, fertilisers, hydrogen, electricity) must manage certificate purchases against verified embedded emissions, with the free-allocation phase-out scaling annually through 2032. Exporters into the EU should confirm their actual-data declarations and verification readiness now — defaults are the expensive path.',
        authority: 'European Commission (DG TAXUD)',
        link: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en',
        date: 'Jan 2026',
    },
    {
        title: 'UK Carbon Border Adjustment Mechanism confirmed for 1 January 2027',
        summary: 'The UK CBAM will apply from 1 January 2027 to iron and steel (including certain downstream products), aluminium, cement, fertilisers and hydrogen, priced against the UK ETS. Product scope is not identical to the EU regime — exporters serving both markets need a per-product coverage matrix rather than a single assumption.',
        authority: 'HM Treasury / HMRC',
        link: 'https://www.gov.uk/government/publications/introduction-of-a-uk-carbon-border-adjustment-mechanism',
        date: 'Ongoing 2026',
    },
    {
        title: 'India CCTS compliance and offset mechanics progressing',
        summary: 'The Carbon Credit Trading Scheme under the amended Energy Conservation Act is operationalising its dual structure: emission-intensity targets for obligated designated consumers, and an offset mechanism issuing Carbon Credit Certificates from registered non-obligated projects. Baseline data quality determines both compliance position and credit eligibility.',
        authority: 'Ministry of Power / Bureau of Energy Efficiency',
        link: 'https://beeindia.gov.in',
        date: 'Ongoing 2026',
    },
    {
        title: 'SEBI BRSR: assurance expectations tightening for listed entities',
        summary: 'Business Responsibility & Sustainability Reporting continues across India\u2019s listed universe with external assurance increasingly expected by investors and lenders. Verifier attention concentrates on boundary consistency, year-on-year restatement discipline and reconciliation of ESG data with statutory records.',
        authority: 'SEBI',
        link: 'https://www.sebi.gov.in',
        date: 'Ongoing 2026',
    },
    {
        title: 'EPR obligations expanding across waste streams',
        summary: 'Extended Producer Responsibility regimes under the Plastic Waste Management Rules, E-Waste (Management) Rules and Battery Waste Management Rules now drive registration, target fulfilment and annual returns on CPCB portals. Packaging-intensive and electronics businesses should track target trajectories, which tighten yearly.',
        authority: 'CPCB',
        link: 'https://cpcb.nic.in',
        date: 'Ongoing 2026',
    },
    {
        title: 'ISSB/IFRS S1-S2 adoption broadening across jurisdictions',
        summary: 'IFRS S1 and S2 sustainability disclosures are being adopted or referenced by a growing list of jurisdictions, pushing climate-risk and governance reporting toward a global baseline. Indian multinationals and exporters face these requirements through investors, lenders and overseas listing/linkage rules.',
        authority: 'ISSB / IFRS Foundation',
        link: 'https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/',
        date: 'Ongoing 2026',
    },
];

/* ------------------------------------------------------------------ */
/* SEED LOGIC                                                          */
/* ------------------------------------------------------------------ */
const run = async () => {
    await connectDB();

    // Idempotency: remove previously seeded content only.
    const removedBlogs = await Blog.deleteMany({ tags: 'ss-seed' });
    console.log(`Removed ${removedBlogs.deletedCount} previously seeded blogs`);

    for (const b of blogs) {
        await Blog.create({
            ...b,
            author: AUTHOR,
            authorBio: AUTHOR_BIO,
            status: 'published',
            tags: [...(b.tags || []), 'ss-seed'],
        });
        console.log(`  + blog: ${b.title}`);
    }

    const removedResources = await Resource.deleteMany({ tags: 'ss-seed' });
    console.log(`Removed ${removedResources.deletedCount} previously seeded resources`);

    for (const cs of caseStudies) {
        await Resource.create({ ...cs, type: 'casestudy', tags: ['ss-seed'] });
        console.log(`  + case study: ${cs.title}`);
    }
    for (const tpl of templates) {
        await Resource.create({ ...tpl, tags: ['ss-seed'] });
        console.log(`  + template: ${tpl.title}`);
    }
    for (const upd of regulatoryUpdates) {
        await Resource.create({ ...upd, type: 'update', tags: ['ss-seed'] });
        console.log(`  + update: ${upd.title}`);
    }

    const blogCount = await Blog.countDocuments();
    const csCount = await Resource.countDocuments({ type: 'casestudy' });
    const tplCount = await Resource.countDocuments({ type: 'template' });
    const updCount = await Resource.countDocuments({ type: 'update' });
    console.log('\nDone.');
    console.log(`  Blogs total:        ${blogCount}`);
    console.log(`  Case studies:       ${csCount}`);
    console.log(`  Templates:          ${tplCount}`);
    console.log(`  Regulatory updates: ${updCount}`);

    await mongoose.connection.close();
};

run().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
