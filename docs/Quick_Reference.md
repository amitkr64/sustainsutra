# BRSR XBRL Mapping - Quick Reference Guide

## Overview
This guide provides quick commands and workflows for working with BRSR XBRL mapping implementation.

---

## File Locations

### Core Files
- **UI Metadata:** `src/constants/brsrUIMetadata.js`
- **XBRL Mapper:** `backend/utils/brsrXBRLMapper.js`
- **XBRL Taxonomy:** `Taxonomy_BUSINESS_RESPONSIBILITY_SUSTAINABILITY_REPORTING/BRSR/in-capmkt-pre-2025-05-31.xml`

### Documentation
- **Principle 1 Alignment:** `docs/BRSR_Principle1_XBRL_Alignment.md`
- **Overall Progress:** `docs/Implementation_Progress.md`

### Testing & Migration
- **Unit Tests:** `backend/tests/principle1.test.js`
- **Migration Script:** `backend/migrations/migrate_principle1_fields.js`

---

## Common Commands

### Run Development Servers
```bash
# Frontend
cd d:\Application_Dev\SustainSutra
npm run dev

# Backend
cd d:\Application_Dev\SustainSutra\backend
npm run dev
```

### Run Tests
```bash
# All tests
cd backend
npm test

# Specific test file
npm test -- principle1.test.js

# With coverage
npm test -- --coverage
```

### Run Migration
```bash
cd backend
node migrations/migrate_principle1_fields.js
```

### Health Check
```bash
curl http://127.0.0.1:5000/api/health
```

---

## XBRL Taxonomy Line References

| Principle | Lines | Status |
|-----------|-------|--------|
| Section A | 147-311 | ✅ Complete |
| Section B | 312-1448 | ✅ Complete |
| Principle 1 | 1449-1703 | ✅ Complete |
| Principle 2 | 1704-1844 | 🔄 Next |
| Principle 3 | 1845-2XXX | ⏳ Pending |
| Principle 4 | ... | ⏳ Pending |
| Principle 5 | ... | ⏳ Pending |
| Principle 6 | ... | ⏳ Pending |
| Principle 7 | ... | ⏳ Pending |
| Principle 8 | ... | ⏳ Pending |
| Principle 9 | ... | ⏳ Pending |

---

## Principal 1 Field Mappings - Quick Reference

### Essential Indicators

| UI Question | Old Field Name | New XBRL Field Name | Type |
|-------------|---------------|---------------------|------|
| E1: Training | (table) | Table with segments | Table/JSON |
| E2: Fines/Penalties | (multiple popups) | 5 separate table elements | Table/JSON |
| E3: Appeals | (popup) | `details_of_the_appeal_or_revision...` | Table/JSON |
| E4: Anti-Corruption | `whether_details_and_weblink...` | `does_the_entity_have_an_anti_corruption...` + 3 others | Grid |
| E5: Disciplinary Actions | (table) | `number_of_directors_against_whom...` + 3 others | Grid |
| E6: Conflict of Interest | (table) | `number_of_complaints_received...` + 3 others | Grid |
| E7: Corrective Action | (textarea) | `details_of_any_corrective_action..._explanatory_text_block` | Textarea |
| E8: Accounts Payable | (table) | `amount_of_accounts_payable...` + 2 others | Grid |
| E9: Concentration/RPTs | (complex table) | Multiple individual elements | Table/JSON |

### Leadership Indicators

| UI Question | XBRL Field Name | Type |
|-------------|-----------------|------|
| L1: Value Chain Awareness | Table with total, topics, percentage | Table/JSON |
| L2: Board Conflict Processes | `does_the_entity_have_processes...` + 2 details fields | Grid |

---

## Data Migration Notes

### Q4: Anti-Corruption Policy
**Old Structure:**
- Single Yes/No/NA field
- Combined details/weblink field

**New Structure:**
- `does_the_entity_have_an_anti_corruption_or_anti_bribery_policy` (Yes/No/NA)
- `anti_corruption_or_anti_bribery_policy_explanatory_text_block` (details when Yes)
- `web_link_at_anti_corruption_or_anti_bribery_policy_is_place` (web link when Yes)
- `details_for_the_entity_have_not_applicable_an_anti_corruption_or_anti_bribery_policy_explanatory_text_block` (details when No/NA)

**Migration Strategy:** Auto-detect URLs in combined field using regex

### Q5, Q6, Q8: Table to Grid Conversion
**Old:** Table with rows
**New:** Individual grid fields
**Migration:** Extract specific rows by category/id and map to individual fields

---

## Testing Workflow

### 1. Unit Tests
```bash
# Run tests
npm test -- principle1.test.js

# Expected: All tests pass
# Tests cover: E1, E4, E5, E6, E8, L2, table helpers, null handling
```

### 2. Integration Test
1. Start frontend and backend servers
2. Navigate to BRSR Report Wizard → Principle 1
3. Enter data for each indicator
4. Save report
5. Export XBRL
6. Validate XBRL against taxonomy schema

### 3. Data Migration Test
1. **Backup database**
2. Run migration script
3. Check logs for errors
4. Verify data in UI
5. Test XBRL export with migrated data

---

## Troubleshooting

### Issue: addPrinciple1 not called
**Solution:** Verify it's called in `addSectionC()` method

### Issue: XBRL export is empty
**Solution:** Check field names match exactly (case-sensitive)

### Issue: Table data not exporting
**Solution:** Verify JSON structure and `addTableElement()` helper

### Issue: Migration fails
**Solution:** Check JSON.parse errors, verify field names in old data

---

## Best Practices

### When Adding New Fields
1. ✅ Check XBRL taxonomy for exact element name
2. ✅ Use CamelCase for XBRL element names (first letter capital)
3. ✅ Use snake_case for UI field names
4. ✅ Add `_explanatory_text_block` suffix for text areas (if in taxonomy)
5. ✅ Document in alignment doc

### When Creating Tables
1. ✅ Store as JSON in database
2. ✅ Use `addTableElement()` helper in mapper
3. ✅ Define proper axis name
4. ✅ Test with sample data

### When Writing Tests
1. ✅ Test each indicator separately
2. ✅ Test with realistic data
3. ✅ Test edge cases (null, empty, malformed JSON)
4. ✅ Verify element names, values, contexts, unit refs

---

## Next: Principle 2 Implementation

### Step 1: Analyze UI Metadata
```bash
# View current P2 structure
grep -A 50 "Section C: Principle 2" src/constants/brsrUIMetadata.js
```

### Step 2: Cross-reference with Taxonomy
- Open taxonomy XML (lines 1704-1843)
- Compare field names
- Document misalignments

### Step 3: Update UI Metadata
- Update field names
- Update structures (table vs grid)
- Add conditional dependencies

### Step 4: Update Backend Mapper
- Create `addPrinciple2()` method
- Map all E1-E4 essential indicators
- Map all L1-L5 leadership indicators

### Step 5: Test & Document
- Create tests
- Create migration (if needed)
- Update documentation

---

## Questions? Issues?

- Check `docs/BRSR_Principle1_XBRL_Alignment.md` for detailed mappings
- Review `backend/utils/principle1XBRLMapping.js` for reference implementation
- Run tests to verify correctness

**Status:** Principle 1 ✅ Complete | Ready for Principle 2 🚀
