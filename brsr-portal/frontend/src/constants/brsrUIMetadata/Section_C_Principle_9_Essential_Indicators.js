// Section: Section C: Principle 9 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_9_Essential_Indicators = [
  {
    "id": "p9_e1_consumer_complaints",
    "title": "1. Describe the mechanisms in place to receive and respond to consumer complaints and feedback",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Describe the mechanisms in place to receive and respond to consumer complaints and feedback",
        "name": "describe_the_mechanisms_in_place_to_receive_and_respond_to_consumer_complaints_and_feedback_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_e2_product_info",
    "title": "2. Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "As a percentage to total turnover",
        "name": "p9_e2_percentage_label",
        "uiType": "section_header"
      }
    ]
  },
  {
    "id": "p9_e2_product_info_table",
    "title": "",
    "type": "table",
    "popup": false,
    "columns": [
      {
        "id": "parameter",
        "label": ""
      },
      {
        "id": "fy",
        "label": ""
      },
      {
        "id": "py",
        "label": ""
      }
    ],
    "rows": [
      {
        "id": "env_soc",
        "label": "Environmental and social parameters relevant to the product"
      },
      {
        "id": "safe_usage",
        "label": "Safe and responsible usage"
      },
      {
        "id": "disposal",
        "label": "Recycling and/or safe disposal"
      }
    ],
    "fields": [
      {
        "name": "p9_e2_env_soc_fy",
        "row": "env_soc",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p9_e2_env_soc_py",
        "row": "env_soc",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p9_e2_safe_usage_fy",
        "row": "safe_usage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p9_e2_safe_usage_py",
        "row": "safe_usage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p9_e2_disposal_fy",
        "row": "disposal",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p9_e2_disposal_py",
        "row": "disposal",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p9_e3_consumer_complaints",
    "title": "3. Number of consumer complaints in respect of the following:",
    "type": "table",
    "popup": false,
    "headerRows": [
      [
        {
          "label": "",
          "colSpan": 1
        },
        {
          "label": "FY (-)",
          "colSpan": 3
        },
        {
          "label": "PY (-)",
          "colSpan": 3
        }
      ],
      [
        {
          "label": "",
          "colSpan": 1
        },
        {
          "label": "Received during the year",
          "colSpan": 1
        },
        {
          "label": "Pending resolution at end of year",
          "colSpan": 1
        },
        {
          "label": "Remark",
          "colSpan": 1
        },
        {
          "label": "Received during the year",
          "colSpan": 1
        },
        {
          "label": "Pending resolution at end of year",
          "colSpan": 1
        },
        {
          "label": "Remark",
          "colSpan": 1
        }
      ]
    ],
    "columns": [
      {
        "id": "category",
        "label": ""
      },
      {
        "id": "fy_received",
        "label": ""
      },
      {
        "id": "fy_pending",
        "label": ""
      },
      {
        "id": "fy_remarks",
        "label": ""
      },
      {
        "id": "py_received",
        "label": ""
      },
      {
        "id": "py_pending",
        "label": ""
      },
      {
        "id": "py_remarks",
        "label": ""
      }
    ],
    "rows": [
      {
        "id": "privacy",
        "label": "Data privacy"
      },
      {
        "id": "advertising",
        "label": "Advertising"
      },
      {
        "id": "cyber",
        "label": "Cyber-security"
      },
      {
        "id": "essential",
        "label": "Delivery of essential services"
      },
      {
        "id": "restrictive",
        "label": "Restrictive Trade Practices"
      },
      {
        "id": "unfair",
        "label": "Unfair Trade Practices"
      },
      {
        "id": "other",
        "label": "Other"
      }
    ],
    "fields": [
      {
        "name": "p9_e3_privacy_fy_received",
        "row": "privacy",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_privacy_fy_pending",
        "row": "privacy",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_privacy_fy_remarks",
        "row": "privacy",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_privacy_py_received",
        "row": "privacy",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_privacy_py_pending",
        "row": "privacy",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_privacy_py_remarks",
        "row": "privacy",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_advertising_fy_received",
        "row": "advertising",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_advertising_fy_pending",
        "row": "advertising",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_advertising_fy_remarks",
        "row": "advertising",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_advertising_py_received",
        "row": "advertising",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_advertising_py_pending",
        "row": "advertising",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_advertising_py_remarks",
        "row": "advertising",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_cyber_fy_received",
        "row": "cyber",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_cyber_fy_pending",
        "row": "cyber",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_cyber_fy_remarks",
        "row": "cyber",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_cyber_py_received",
        "row": "cyber",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_cyber_py_pending",
        "row": "cyber",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_cyber_py_remarks",
        "row": "cyber",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_essential_fy_received",
        "row": "essential",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_essential_fy_pending",
        "row": "essential",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_essential_fy_remarks",
        "row": "essential",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_essential_py_received",
        "row": "essential",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_essential_py_pending",
        "row": "essential",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_essential_py_remarks",
        "row": "essential",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_restrictive_fy_received",
        "row": "restrictive",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_restrictive_fy_pending",
        "row": "restrictive",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_restrictive_fy_remarks",
        "row": "restrictive",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_restrictive_py_received",
        "row": "restrictive",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_restrictive_py_pending",
        "row": "restrictive",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_restrictive_py_remarks",
        "row": "restrictive",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_unfair_fy_received",
        "row": "unfair",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_unfair_fy_pending",
        "row": "unfair",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_unfair_fy_remarks",
        "row": "unfair",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_unfair_py_received",
        "row": "unfair",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_unfair_py_pending",
        "row": "unfair",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_unfair_py_remarks",
        "row": "unfair",
        "mapping": "py_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_other_fy_received",
        "row": "other",
        "mapping": "fy_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_other_fy_pending",
        "row": "other",
        "mapping": "fy_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_other_fy_remarks",
        "row": "other",
        "mapping": "fy_remarks",
        "uiType": "text"
      },
      {
        "name": "p9_e3_other_py_received",
        "row": "other",
        "mapping": "py_received",
        "uiType": "number"
      },
      {
        "name": "p9_e3_other_py_pending",
        "row": "other",
        "mapping": "py_pending",
        "uiType": "number"
      },
      {
        "name": "p9_e3_other_py_remarks",
        "row": "other",
        "mapping": "py_remarks",
        "uiType": "text"
      }
    ]
  },
  {
    "id": "p9_e4_product_recalls",
    "title": "4. Details of instances of product recalls on account of safety issues:",
    "type": "table",
    "popup": false,
    "columns": [
      {
        "id": "parameter",
        "label": ""
      },
      {
        "id": "number",
        "label": "Number"
      },
      {
        "id": "reasons",
        "label": "Reasons for recall"
      }
    ],
    "rows": [
      {
        "id": "voluntary",
        "label": "Voluntary recalls"
      },
      {
        "id": "forced",
        "label": "Forced recalls"
      }
    ],
    "fields": [
      {
        "name": "p9_e4_voluntary_number",
        "row": "voluntary",
        "mapping": "number",
        "uiType": "number"
      },
      {
        "name": "p9_e4_voluntary_reasons",
        "row": "voluntary",
        "mapping": "reasons",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      },
      {
        "name": "p9_e4_forced_number",
        "row": "forced",
        "mapping": "number",
        "uiType": "number"
      },
      {
        "name": "p9_e4_forced_reasons",
        "row": "forced",
        "mapping": "reasons",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_e5_cyber_security",
    "title": "5. Does the entity have a framework/ policy on cyber security and risks related to data privacy?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Does the entity have a framework/ policy on cyber security and risks related to data privacy? (Yes/No/NA)",
        "name": "whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If available, provide a web-link of the policy",
        "name": "if_available_provide_a_web_link_of_cyber_security_and_data_privacy_policy",
        "uiType": "text",
        "dependsOn": {
          "field": "whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p9_e5_cyber_security_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p9_e6_corrective_actions",
    "title": "6. Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services",
        "name": "provide_details_of_any_corrective_actions_taken_or_underway_on_issues_relating_to_advertising_and_delivery_of_essential_services_cyber_security_and_data_privacy_of_customers_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_e7_data_breaches",
    "title": "7. Provide the following information relating to data breaches:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "a. Number of instances of data breaches along-with impact",
        "name": "p9_e7_data_breaches_number",
        "uiType": "number"
      },
      {
        "label": "b. Percentage of data breaches involving personally identifiable information of customers",
        "name": "p9_e7_data_breaches_percentage",
        "uiType": "number"
      },
      {
        "label": "c. Impact, if any, of the data breaches",
        "name": "p9_e7_data_breaches_impact",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  }
];
