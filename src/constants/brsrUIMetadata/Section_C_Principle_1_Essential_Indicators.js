// Section: Section C: Principle 1 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_1_Essential_Indicators = [
  {
    "id": "p1_e1_training_awareness",
    "title": "1. Percentage coverage by training and awareness programmes on any of the Principles during the financial year:",
    "type": "table",
    "storageField": "assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker",
    "dynamic": true,
    "disableAddDelete": true,
    "columns": [
      {
        "id": "segment",
        "label": "Segment"
      },
      {
        "id": "total_number",
        "label": "Total number of training and awareness programmes held",
        "uiType": "number"
      },
      {
        "id": "topics_covered",
        "label": "Topics/principles covered under the training and its impact"
      },
      {
        "id": "percentage_covered",
        "label": "%age of persons in respective category covered by the awareness programmes",
        "uiType": "number"
      }
    ],
    "defaultRows": [
      {
        "segment": "Board of Directors",
        "total_number": "",
        "topics_covered": "",
        "percentage_covered": ""
      },
      {
        "segment": "Key Managerial Personnel",
        "total_number": "",
        "topics_covered": "",
        "percentage_covered": ""
      },
      {
        "segment": "Employees other than BoD and KMPs",
        "total_number": "",
        "topics_covered": "",
        "percentage_covered": ""
      },
      {
        "segment": "Workers",
        "total_number": "",
        "topics_covered": "",
        "percentage_covered": ""
      }
    ]
  },
  {
    "id": "p1_e2_fines_penalties",
    "title": "2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):",
    "type": "table",
    "fixedRows": true,
    "columns": [
      {
        "id": "category",
        "label": ""
      },
      {
        "id": "case_details",
        "label": ""
      }
    ],
    "rows": [
      {
        "id": "monetary_header",
        "label": "Monetary",
        "isHeader": true
      },
      {
        "id": "penalty",
        "label": "Penalty/ Fine"
      },
      {
        "id": "settlement",
        "label": "Settlement"
      },
      {
        "id": "compounding",
        "label": "Compounding fee"
      },
      {
        "id": "non_monetary_header",
        "label": "Non- Monetary",
        "isHeader": true
      },
      {
        "id": "imprisonment",
        "label": "Imprisonment"
      },
      {
        "id": "punishment",
        "label": "Punishment"
      }
    ],
    "fields": [
      {
        "name": "brief_of_the_monetary_case_for_penalty_or_fine_explanatory_text_block",
        "mapping": "case_details",
        "row": "penalty",
        "uiType": "popup",
        "label": "Add Details",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "ngrbc_principle",
            "label": "NGRBC Principle"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          },
          {
            "id": "amount_in_inr",
            "label": "Amount (In INR)",
            "uiType": "number"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the Case"
          },
          {
            "id": "has_appeal_been_preferred",
            "label": "Has an appeal been preferred? (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          }
        ],
        "defaultRow": {
          "ngrbc_principle": "",
          "regulatory_agency_name": "",
          "amount_in_inr": "",
          "brief_of_case": "",
          "has_appeal_been_preferred": "No"
        }
      },
      {
        "name": "brief_of_the_monetary_case_for_settlement_explanatory_text_block",
        "mapping": "case_details",
        "row": "settlement",
        "uiType": "popup",
        "label": "Add Details",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "ngrbc_principle",
            "label": "NGRBC Principle"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          },
          {
            "id": "amount_in_inr",
            "label": "Amount (In INR)",
            "uiType": "number"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the Case"
          },
          {
            "id": "has_appeal_been_preferred",
            "label": "Has an appeal been preferred? (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          }
        ],
        "defaultRow": {
          "ngrbc_principle": "",
          "regulatory_agency_name": "",
          "amount_in_inr": "",
          "brief_of_case": "",
          "has_appeal_been_preferred": "No"
        }
      },
      {
        "name": "brief_of_the_monetary_case_for_compounding_fee_explanatory_text_block",
        "mapping": "case_details",
        "row": "compounding",
        "uiType": "popup",
        "label": "Add Details",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "ngrbc_principle",
            "label": "NGRBC Principle"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          },
          {
            "id": "amount_in_inr",
            "label": "Amount (In INR)",
            "uiType": "number"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the Case"
          },
          {
            "id": "has_appeal_been_preferred",
            "label": "Has an appeal been preferred?",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          }
        ],
        "defaultRow": {
          "ngrbc_principle": "",
          "regulatory_agency_name": "",
          "amount_in_inr": "",
          "brief_of_case": "",
          "has_appeal_been_preferred": "No"
        }
      },
      {
        "name": "brief_of_the_monetary_case_for_imprisonment_explanatory_text_block",
        "mapping": "case_details",
        "row": "imprisonment",
        "uiType": "popup",
        "label": "Add Details",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "ngrbc_principle",
            "label": "NGRBC Principle"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the Case"
          },
          {
            "id": "has_appeal_been_preferred",
            "label": "Has an appeal been preferred? (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          }
        ],
        "defaultRow": {
          "ngrbc_principle": "",
          "regulatory_agency_name": "",
          "brief_of_case": "",
          "has_appeal_been_preferred": "No"
        }
      },
      {
        "name": "brief_of_the_monetary_case_for_punishment_explanatory_text_block",
        "mapping": "case_details",
        "row": "punishment",
        "uiType": "popup",
        "label": "Add Details",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "ngrbc_principle",
            "label": "NGRBC Principle"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the Case"
          },
          {
            "id": "has_appeal_been_preferred",
            "label": "Has an appeal been preferred? (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          }
        ],
        "defaultRow": {
          "ngrbc_principle": "",
          "regulatory_agency_name": "",
          "brief_of_case": "",
          "has_appeal_been_preferred": "No"
        }
      }
    ]
  },
  {
    "id": "p1_e3_appeals",
    "title": "3. Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of Appeal/ Revision",
        "name": "details_of_the_appeal_or_revision_preferred_in_cases_where_monetary_or_non_monetary_action_has_been_appealed",
        "uiType": "popup",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "case_details",
            "label": "Case Details"
          },
          {
            "id": "regulatory_agency_name",
            "label": "Name of the regulatory/ enforcement agencies/ judicial institutions"
          }
        ],
        "defaultRow": {
          "case_details": "",
          "regulatory_agency_name": ""
        }
      }
    ]
  },
  {
    "id": "p1_e4_anti_corruption",
    "title": "4. Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy.",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "Anti-corruption/bribery policy (Yes/No/NA)",
        "name": "does_the_entity_have_an_anti_corruption_or_anti_bribery_policy",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "Policy Details",
        "name": "anti_corruption_or_anti_bribery_policy_explanatory_text_block",
        "uiType": "textarea",
        "dependsOn": {
          "field": "does_the_entity_have_an_anti_corruption_or_anti_bribery_policy",
          "value": "Yes"
        }
      },
      {
        "label": "Web Link",
        "name": "web_link_at_anti_corruption_or_anti_bribery_policy_is_place",
        "uiType": "text",
        "dependsOn": {
          "field": "does_the_entity_have_an_anti_corruption_or_anti_bribery_policy",
          "value": "Yes"
        }
      },
      {
        "label": "If No/NA, provide details",
        "name": "details_for_the_entity_have_not_applicable_an_anti_corruption_or_anti_bribery_policy_explanatory_text_block",
        "uiType": "textarea",
        "dependsOn": {
          "field": "does_the_entity_have_an_anti_corruption_or_anti_bribery_policy",
          "value": [
            "No",
            "NA"
          ]
        }
      }
    ]
  },
  {
    "id": "p1_e5_disciplinary_action",
    "title": "5. Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law enforcement agency for the charges of bribery/ corruption:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "name": "number_of_directors_against_whom_disciplinary_action_was_taken",
        "label": "Directors (FY)",
        "uiType": "number"
      },
      {
        "name": "number_of_km_ps_against_whom_disciplinary_action_was_taken",
        "label": "KMPs (FY)",
        "uiType": "number"
      },
      {
        "name": "number_of_employees_against_whom_disciplinary_action_was_taken",
        "label": "Employees (FY)",
        "uiType": "number"
      },
      {
        "name": "number_of_workers_against_whom_disciplinary_action_was_taken",
        "label": "Workers (FY)",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p1_e6_conflict_interest",
    "title": "6. Details of complaints with regard to conflict of interest:",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors",
        "label": "Directors - Number (FY)",
        "uiType": "number"
      },
      {
        "name": "remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors",
        "label": "Directors - Remarks (FY)",
        "uiType": "text"
      },
      {
        "name": "number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_km_ps",
        "label": "KMPs - Number (FY)",
        "uiType": "number"
      },
      {
        "name": "remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_kmps",
        "label": "KMPs - Remarks (FY)",
        "uiType": "text"
      }
    ]
  },
  {
    "id": "p1_e7_corrective_action",
    "title": "7. Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Corrective Action Details",
        "name": "details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest_explanatory_text_block",
        "uiType": "textarea"
      }
    ]
  },
  {
    "id": "p1_e8_accounts_payable",
    "title": "8. Number of days for which payment is due to MSME and other creditors:",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "amount_of_accounts_payable_during_the_year",
        "label": "(i) Accounts Payable during the year (INR)",
        "uiType": "number"
      },
      {
        "name": "cost_of_goods_or_services_procured_during_the_year",
        "label": "(ii) Cost of goods/services procured during the year (INR)",
        "uiType": "number"
      },
      {
        "name": "number_of_days_of_accounts_payable",
        "label": "(iii) Number of days of accounts payable",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p1_e9_openness",
    "title": "9. Open-ness of Business",
    "type": "table",
    "label": "Concentration and RPTs",
    "storageField": "assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties",
    "dynamic": true,
    "disableAddDelete": true,
    "subtitle": "Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:",
    "columns": [
      {
        "id": "category",
        "label": "Parameter"
      },
      {
        "id": "metric",
        "label": "Metrics"
      },
      {
        "id": "fy",
        "label": "FY (Current Financial Year)",
        "uiType": "number"
      },
      {
        "id": "py",
        "label": "PY (Previous Financial Year)",
        "uiType": "number"
      }
    ],
    "defaultRows": [
      {
        "id": "cp_a_i",
        "category": "Concentration of Purchases",
        "metric": "a. i) Purchases from trading houses",
        "fy": "",
        "py": ""
      },
      {
        "id": "cp_a_ii",
        "category": "Concentration of Purchases",
        "metric": "ii) Total purchases",
        "fy": "",
        "py": ""
      },
      {
        "id": "cp_a_iii",
        "category": "Concentration of Purchases",
        "metric": "iii) % of total purchases",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "cp_b",
        "category": "Concentration of Purchases",
        "metric": "b. Number of trading houses where purchases are made",
        "fy": "",
        "py": ""
      },
      {
        "id": "cp_c_i",
        "category": "Concentration of Purchases",
        "metric": "c. i) Purchases from top 10 trading houses",
        "fy": "",
        "py": ""
      },
      {
        "id": "cp_c_ii",
        "category": "Concentration of Purchases",
        "metric": "ii) Total purchases from trading houses",
        "fy": "",
        "py": ""
      },
      {
        "id": "cp_c_iii",
        "category": "Concentration of Purchases",
        "metric": "iii) % of total purchases from trading houses",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "cs_a_i",
        "category": "Concentration of Sales",
        "metric": "a. i) Sales to dealer / distributors",
        "fy": "",
        "py": ""
      },
      {
        "id": "cs_a_ii",
        "category": "Concentration of Sales",
        "metric": "ii) Total Sales",
        "fy": "",
        "py": ""
      },
      {
        "id": "cs_a_iii",
        "category": "Concentration of Sales",
        "metric": "iii) % of total sales",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "cs_b",
        "category": "Concentration of Sales",
        "metric": "b. Number of dealers / distributors to whom sales are made",
        "fy": "",
        "py": ""
      },
      {
        "id": "cs_c_i",
        "category": "Concentration of Sales",
        "metric": "c. i) Sales to top 10 dealers",
        "fy": "",
        "py": ""
      },
      {
        "id": "cs_c_ii",
        "category": "Concentration of Sales",
        "metric": "ii) Total Sales to dealer / distributors",
        "fy": "",
        "py": ""
      },
      {
        "id": "cs_c_iii",
        "category": "Concentration of Sales",
        "metric": "iii) % of total sales to dealer / distributors",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "rpt_a_i",
        "category": "Share of RPTs in",
        "metric": "a. i) Purchases (with related parties)",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_a_ii",
        "category": "Share of RPTs in",
        "metric": "ii) Total Purchases",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_a_iii",
        "category": "Share of RPTs in",
        "metric": "iii) % of Total Purchases",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "rpt_b_i",
        "category": "Share of RPTs in",
        "metric": "b. i) Sales (to related parties)",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_b_ii",
        "category": "Share of RPTs in",
        "metric": "ii) Total Sales",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_b_iii",
        "category": "Share of RPTs in",
        "metric": "iii) % of Total Sales",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "rpt_c_i",
        "category": "Share of RPTs in",
        "metric": "c. i) Loans & advances given to related parties",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_c_ii",
        "category": "Share of RPTs in",
        "metric": "ii) Total loans & advances",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_c_iii",
        "category": "Share of RPTs in",
        "metric": "iii) % of Total loans & advances",
        "fy": "",
        "py": "",
        "readOnly": true
      },
      {
        "id": "rpt_d_i",
        "category": "Share of RPTs in",
        "metric": "d. i) Investments in related parties",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_d_ii",
        "category": "Share of RPTs in",
        "metric": "ii) Total Investments made",
        "fy": "",
        "py": ""
      },
      {
        "id": "rpt_d_iii",
        "category": "Share of RPTs in",
        "metric": "iii) % of Total Investments made",
        "fy": "",
        "py": "",
        "readOnly": true
      }
    ]
  }
];
