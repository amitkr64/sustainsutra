// Section: Section C: Principle 3 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_3_Leadership_Indicators = [
  {
    "id": "p3_l1_life_insurance",
    "title": "1. Does the entity extend any life insurance or any compensatory package in the event of death of",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "(A) Employees (Y/N)",
        "name": "p3_l1_employees_insurance",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "(B) Workers (Y/N)",
        "name": "p3_l1_workers_insurance",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },
  {
    "id": "p3_l2_statutory_dues",
    "title": "2. Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Click to Add Details",
        "name": "p3_l2_statutory_dues_measures",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p3_l3_rehabilitation",
    "title": "3. Provide the number of employees / workers having suffered high consequence work related injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:",
    "type": "table",
    "fixedRows": true,
    "columns": [
      {
        "id": "category",
        "label": ""
      },
      {
        "id": "total_affected_fy",
        "label": "Total no. of affected employees/ workers - FY (-)"
      },
      {
        "id": "total_affected_py",
        "label": "Total no. of affected employees/ workers - PY (-)"
      },
      {
        "id": "rehab_fy",
        "label": "No. of employees/workers that are rehabilitated... - FY (-)"
      },
      {
        "id": "rehab_py",
        "label": "No. of employees/workers that are rehabilitated... - PY (-)"
      }
    ],
    "rows": [
      {
        "id": "employees",
        "label": "Employees"
      },
      {
        "id": "workers",
        "label": "Workers"
      }
    ],
    "fields": [
      {
        "name": "p3_l3_emp_total_affected_fy",
        "row": "employees",
        "mapping": "total_affected_fy",
        "uiType": "number"
      },
      {
        "name": "p3_l3_emp_total_affected_py",
        "row": "employees",
        "mapping": "total_affected_py",
        "uiType": "number"
      },
      {
        "name": "p3_l3_emp_rehab_fy",
        "row": "employees",
        "mapping": "rehab_fy",
        "uiType": "number"
      },
      {
        "name": "p3_l3_emp_rehab_py",
        "row": "employees",
        "mapping": "rehab_py",
        "uiType": "number"
      },
      {
        "name": "p3_l3_worker_total_affected_fy",
        "row": "workers",
        "mapping": "total_affected_fy",
        "uiType": "number"
      },
      {
        "name": "p3_l3_worker_total_affected_py",
        "row": "workers",
        "mapping": "total_affected_py",
        "uiType": "number"
      },
      {
        "name": "p3_l3_worker_rehab_fy",
        "row": "workers",
        "mapping": "rehab_fy",
        "uiType": "number"
      },
      {
        "name": "p3_l3_worker_rehab_py",
        "row": "workers",
        "mapping": "rehab_py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p3_l4_transition_assistance",
    "title": "4. Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment? (Yes/ No/ NA)",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "Select Status",
        "name": "p3_l4_transition_status",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "Transition Assistance Details",
        "name": "p3_l4_transition_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p3_l4_transition_status",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p3_l5_value_chain_assessment",
    "title": "5. Details on assessment of value chain partners:",
    "type": "table",
    "fixedRows": true,
    "columns": [
      {
        "id": "category",
        "label": ""
      },
      {
        "id": "pct_assessed",
        "label": "% of value chain partners (by value of business done with such partners) that were assessed"
      }
    ],
    "rows": [
      {
        "id": "health_safety",
        "label": "Health and safety practices"
      },
      {
        "id": "working_conditions",
        "label": "Working Conditions"
      }
    ],
    "fields": [
      {
        "name": "p3_l5_health_safety_pct",
        "row": "health_safety",
        "mapping": "pct_assessed",
        "uiType": "number"
      },
      {
        "name": "p3_l5_working_conditions_pct",
        "row": "working_conditions",
        "mapping": "pct_assessed",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p3_l6_corrective_actions",
    "title": "6. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Click to Add Details",
        "name": "p3_l6_corrective_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p3_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "General Notes",
        "name": "p3_general_notes",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];
