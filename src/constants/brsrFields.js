// Barrel file for BRSR field definitions. Re-exports per-section modules.
//
// The original monolithic file was ~5171 lines. Each field now lives in a
// section module under ./brsrFields/. We reassemble them into BRSR_FIELDS.
//
// NOTE on ordering: the sole consumer (BRSRReportWizard) selects fields with
// `.filter(f => f.section === ...)`, so only per-section ordering is
// observable. We sort by `name` for a stable, reproducible ordering.
// Regenerate via scripts/split_brsr_constants.cjs.
import { General_DisclosuresFields } from './brsrFields/General_Disclosures.js';
import { AssuranceFields } from './brsrFields/Assurance.js';
import { Principle_1Fields } from './brsrFields/Principle_1.js';
import { Principle_2Fields } from './brsrFields/Principle_2.js';
import { Principle_3Fields } from './brsrFields/Principle_3.js';
import { Principle_4Fields } from './brsrFields/Principle_4.js';
import { Principle_5Fields } from './brsrFields/Principle_5.js';
import { Principle_6Fields } from './brsrFields/Principle_6.js';
import { Principle_7Fields } from './brsrFields/Principle_7.js';
import { Principle_8Fields } from './brsrFields/Principle_8.js';
import { Principle_9Fields } from './brsrFields/Principle_9.js';
import { ComplianceFields } from './brsrFields/Compliance.js';

const _all = [
    General_DisclosuresFields,
    AssuranceFields,
    Principle_1Fields,
    Principle_2Fields,
    Principle_3Fields,
    Principle_4Fields,
    Principle_5Fields,
    Principle_6Fields,
    Principle_7Fields,
    Principle_8Fields,
    Principle_9Fields,
    ComplianceFields
].flat();

export const BRSR_FIELDS = _all.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
