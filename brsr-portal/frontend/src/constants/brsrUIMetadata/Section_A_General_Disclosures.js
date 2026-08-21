// Section: Section A: General Disclosures
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_A_General_Disclosures = [
  {
    "id": "subsection_1_part1",
    "title": "I. Details of the listed entity",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "corporate_identity_number",
        "label": "1. Corporate Identity Number (CIN)",
        "uiType": "text"
      },
      {
        "name": "name_of_the_company",
        "label": "2. Name of the Listed Entity",
        "uiType": "text"
      },
      {
        "name": "date_of_incorporation",
        "label": "3. Date of incorporation",
        "uiType": "date"
      },
      {
        "name": "address_of_registered_office_of_company",
        "label": "4. Registered office address",
        "uiType": "textarea"
      },
      {
        "name": "address_of_corporate_office_of_company",
        "label": "5. Corporate office address",
        "uiType": "textarea"
      },
      {
        "name": "e_mail_of_the_company",
        "label": "6. E-mail",
        "uiType": "text"
      },
      {
        "name": "telephone_of_company",
        "label": "7. Telephone",
        "uiType": "text"
      },
      {
        "name": "website_of_company",
        "label": "8. Website",
        "uiType": "text"
      },
      {
        "name": "date_of_start_of_financial_year",
        "label": "9. (a) Current Financial Year - Start Date",
        "uiType": "date"
      },
      {
        "name": "date_of_end_of_financial_year",
        "label": "9. (a) Current Financial Year - End Date",
        "uiType": "date"
      },
      {
        "name": "date_of_start_of_previous_year",
        "label": "9. (b) Previous Financial Year - Start Date",
        "uiType": "date"
      },
      {
        "name": "date_of_end_of_previous_year",
        "label": "9. (b) Previous Financial Year - End Date",
        "uiType": "date"
      },
      {
        "name": "date_of_start_of_prior_to_previous_year",
        "label": "9. (c) Year Prior to Previous FY - Start Date",
        "uiType": "date"
      },
      {
        "name": "date_of_end_of_prior_to_previous_year",
        "label": "9. (c) Year Prior to Previous FY - End Date",
        "uiType": "date"
      }
    ]
  },
  {
    "id": "subsection_stock_exchanges",
    "title": "Details of the Stock Exchanges",
    "type": "table",
    "padding": "0px",
    "dynamic": true,
    "storageField": "name_of_stock_exchange_where_the_company_is_listed",
    "label": "10. Details of stock exchanges where shares are listed",
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "name",
        "label": "Name of the Stock exchange",
        "uiType": "select",
        "options": [
          "BSE",
          "NSE",
          "MSEI",
          "Others"
        ]
      },
      {
        "id": "code",
        "label": "Description of other stock exchange",
        "dependsOn": {
          "id": "name",
          "value": "Others"
        }
      },
      {
        "id": "country",
        "label": "Name of the Country",
        "dependsOn": {
          "id": "name",
          "value": "Others"
        }
      }
    ],
    "defaultRow": {
      "name": "",
      "code": "",
      "country": ""
    }
  },
  {
    "id": "subsection_1_part2",
    "title": "I. Details of the listed entity (Contd.)",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "paid_up_capital",
        "label": "11. Paid-up Capital (In Rs.)",
        "uiType": "number"
      },
      {
        "id": "contact_details",
        "label": "12. Name and contact details of the person who may be contacted in case of any queries on the BRSR report",
        "type": "group",
        "fields": [
          {
            "name": "name_of_contact_person",
            "label": "Name",
            "uiType": "text"
          },
          {
            "name": "contact_number_of_contact_person",
            "label": "Telephone",
            "uiType": "text"
          },
          {
            "name": "e_mail_of_contact_person",
            "label": "Email",
            "uiType": "text"
          }
        ]
      },
      {
        "name": "reporting_boundary",
        "label": "13. Reporting boundary",
        "uiType": "select",
        "options": [
          "Standalone",
          "Consolidated"
        ]
      },
      {
        "label": "14. Whether the company has undertaken assessment or assurance of the BRSR Core? (Yes/No)",
        "name": "whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If No, provide details.",
        "name": "assurance_no_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core",
          "value": "No"
        }
      },
      {
        "label": "15. Name of the assessment or assurance provider",
        "name": "name_of_the_company_or_llp_or_firm_of_assessment_or_assurance_provider",
        "uiType": "popup",
        "subType": "table",
        "dependsOn": {
          "field": "whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core",
          "value": "Yes"
        },
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "company_name",
            "label": "Company / LLP / Firm Name"
          },
          {
            "id": "registration_no",
            "label": "Company ID / LLP ID / Firm Registration No."
          },
          {
            "id": "provider_name",
            "label": "Name of assessment or assurance provider"
          },
          {
            "id": "designation",
            "label": "Designation of assessor or assurer"
          },
          {
            "id": "signing_date",
            "label": "Date of signing"
          }
        ],
        "defaultRow": {
          "company_name": "",
          "registration_no": "",
          "provider_name": "",
          "designation": "",
          "signing_date": ""
        }
      },
      {
        "label": "16. Type of assurance obtained",
        "name": "type_of_assurance_for_section_a_general_disclosures",
        "uiType": "popup",
        "subType": "table",
        "dependsOn": {
          "field": "whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core",
          "value": "Yes"
        },
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "particulars",
            "label": "Particulars"
          },
          {
            "id": "status",
            "label": "Assessment / Assurance"
          },
          {
            "id": "details",
            "label": "Assessment / Assurance details",
            "uiType": "textarea"
          },
          {
            "id": "remarks",
            "label": "Remarks",
            "uiType": "textarea"
          }
        ],
        "columnOptions": {
          "particulars": [
            "Section A: I.1 Corporate Identity Number (CIN) of the Listed Entity",
            "Section A: I.2 Name of the Listed Entity",
            "Section A: I.3 Date of Incorporation",
            "Section A: I.4 Registered office address",
            "Section A: I.5 Corporate address",
            "Section A: I.6 E-mail",
            "Section A: I.7 Telephone",
            "Section A: I.8 Website",
            "Section A: I.9 Financial year for which reporting is being done",
            "Section A: I.10 Name of the Stock Exchange(s) where shares are listed",
            "Section A: I.11 Paid-up Capital (In Rs)",
            "Section A: I.12 Name and contact details (telephone, email address) of the person who may be contacted",
            "Section A: I.13 Reporting boundary",
            "Section A: II.14 Details of business activities (accounting for 90% of the Turnover)",
            "Section A: II.15 Products/Services sold by the entity (accounting for 90% of the entity's Turnover)",
            "Section A: III.16 Number of locations where plants and/or operations/offices of the entity are situated",
            "Section A: III.17 Markets served by the entity",
            "Section A: IV.18 Details as at the end of Financial Year (Employees & Workers)",
            "Section A: IV.19 Participation/Inclusion/Representation of women",
            "Section A: IV.20 Turnover rate for permanent employees and workers",
            "Section A: V.21 Names of holding / subsidiary / associate companies / joint ventures",
            "Section A: VI.22 Whether CSR is applicable as per section 135 of Companies Act, 2013",
            "Section A: VII.23 Complaints/Grievances on any of the principles (Principles 1 to 9)",
            "Section A: VII.24 Overview of the entity's material responsible business conduct issues",
            "Section B: I.1 Whether your entity's policy/policies cover each principle and its core elements",
            "Section B: I.2 Whether the entity has translated the policy into procedures",
            "Section B: I.3 Do the enlisted policies extend to your value chain partners?",
            "Section B: I.4 Name of the national and international codes/certifications/labels/ standards adopted",
            "Section B: I.5 Specific commitments, goals and targets set by the entity",
            "Section B: I.6 Performance of the entity against the specific commitments, goals and targets",
            "Section B: II.7 Statement by director responsible for the business responsibility report",
            "Section B: II.8 Details of the highest authority responsible for implementation and oversight",
            "Section B: II.9 Does the entity have a specified Committee of the Board/ Director responsible?",
            "Section B: II.10(A) Details of Review of NGRBCs by the Company: Performance against above policies",
            "Section B: II.10(B) Details of Review of NGRBCs by the Company: Compliance with statutory requirements",
            "Section B: II.11 Has the entity carried out independent assessment/ evaluation of the working of its policies?",
            "Section B: II.12 Reasons if policies not covered (If answer to question 1 is No)",
            "Principle 1: E1 Percentage coverage by training and awareness programmes",
            "Principle 1: E2 Details of fines / penalties /punishment/ award/ compounding fees",
            "Principle 1: E3 Details of the Appeal/ Revision preferred in cases where monetary action has been appealed",
            "Principle 1: E4 Does the entity have an anti-corruption or anti-bribery policy?",
            "Principle 1: E5 Number of Directors/KMPs/employees/workers against whom disciplinary action was taken",
            "Principle 1: E6 Details of complaints with regard to conflict of interest",
            "Principle 1: E7 Provide details of any corrective action taken or underway on issues related to fines / penalties",
            "Principle 1: E8 Number of days of accounts payables",
            "Principle 1: E9 Open-ness of business",
            "Principle 1: L1 Awareness programmes conducted for value chain partners",
            "Principle 1: L2 Does the entity have processes to avoid/ manage conflict of interests involving members of the Board?",
            "Principle 2: E1 Percentage of R&D and capital expenditure (capex) investments in specific technologies",
            "Principle 2: E2 Does the entity have procedures in place for sustainable sourcing?",
            "Principle 2: E3 Describe the processes in place to safely reclaim your products for reusing, recycling and disposing",
            "Principle 2: E4 Whether Extended Producer Responsibility (EPR) is applicable to the entity's activities",
            "Principle 2: L1 Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products?",
            "Principle 2: L2 Briefly describe ESG concerns arising from production or disposal and action taken to mitigate",
            "Principle 2: L3 Percentage of recycled or reused input material to total material (by value)",
            "Principle 2: L4 Reclaimed products and their packaging reclaimed at end of life (Amount in metric tonnes)",
            "Principle 2: L5 Reclaimed products and their packaging materials (As percentage of products sold)",
            "Principle 3: E1 Details of measures for the well-being of employees and workers",
            "Principle 3: E2 Details of retirement benefits, for Current FY and Previous Financial Year",
            "Principle 3: E3 Accessibility of workplaces to differently abled employees and workers",
            "Principle 3: E4 Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act?",
            "Principle 3: E5 Return to work and Retention rates of permanent employees and workers that took parental leave",
            "Principle 3: E6 Is there a mechanism available to receive and redress grievances for employees and worker?",
            "Principle 3: E7 Membership of employees and worker in association(s) or Unions recognised by the entity",
            "Principle 3: E8 Details of training given to employees and workers",
            "Principle 3: E9 Details of performance and career development reviews of employees and worker",
            "Principle 3: E10 Health and safety management system coverage and implementation",
            "Principle 3: E11 Details of safety related incidents, in the following format",
            "Principle 3: E12 Describe the measures taken by the entity to ensure a safe and healthy work place",
            "Principle 3: E13 Number of Complaints on the following made by employees and workers",
            "Principle 3: E14 Assessments for the year (Health & Safety)",
            "Principle 3: E15 Provide details of any corrective action taken or underway to address safety-related incidents",
            "Principle 3: L1 Does the entity extend any life insurance or any compensatory package in the event of death?",
            "Principle 3: L2 Provide the measures undertaken by the entity to ensure that statutory dues have been deducted",
            "Principle 3: L3 Provide the number of employees / workers having suffered high consequence work-related injury",
            "Principle 3: L4 Does the entity provide transition assistance programs to facilitate continued employability?",
            "Principle 3: L5 Details on assessment of value chain partners",
            "Principle 3: L6 Provide details of any corrective actions taken or underway regarding value chain partners",
            "Principle 4: E1 Describe the processes for identifying key stakeholder groups of the entity",
            "Principle 4: E2 List stakeholder groups identified as key for your entity and the frequency of engagement",
            "Principle 4: L1 Provide the processes for consultation between stakeholders and the Board",
            "Principle 4: L2 Whether stakeholder consultation is used to support the identification and management of ESG topics",
            "Principle 4: L3 Provide details of instances of engagement with, and actions taken to, address concerns",
            "Principle 5: E1 Employees and workers who have been provided training on human rights issues and policy(ies)",
            "Principle 5: E2 Details of minimum wages paid to employees and workers",
            "Principle 5: E3 Details of remuneration/salary/wages, in the following format",
            "Principle 5: E4 Do you have a focal point (Individual/ Committee) responsible for addressing human rights impacts?",
            "Principle 5: E5 Describe the internal mechanisms in place to redress grievances related to human rights issues",
            "Principle 5: E6 Number of Complaints on the following made by employees and workers (Human Rights)",
            "Principle 5: E7 Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment",
            "Principle 5: E8 Do human rights requirements form part of your business agreements and contracts?",
            "Principle 5: E9 Assessments for the year (Human Rights)",
            "Principle 5: E10 Provide details of any corrective actions taken or underway arising from assessments",
            "Principle 5: L1 Details of a business process being modified / introduced as a result of addressing complaints",
            "Principle 5: L2 Details of the scope and coverage of any Human rights due-diligence conducted",
            "Principle 5: L3 Is the premise/office of the entity accessible to differently abled visitors?",
            "Principle 5: L4 Details on assessment of value chain partners (Human Rights)",
            "Principle 5: L5 Provide details of any corrective actions taken or underway for value chain partners (HR)",
            "Principle 6: E1 Details of total energy consumption and energy intensity",
            "Principle 6: E2 Does the entity have any sites / facilities identified as designated consumers (DCs) under PAT?",
            "Principle 6: E3 Provide details of the following disclosures related to water",
            "Principle 6: E4 Provide the following details related to water discharged",
            "Principle 6: E5 Has the entity implemented a mechanism for Zero Liquid Discharge?",
            "Principle 6: E6 Please provide details of air emissions (other than GHG emissions) by the entity",
            "Principle 6: E7 Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity",
            "Principle 6: E8 Does the entity have any project related to reducing Green House Gas emission?",
            "Principle 6: E9 Provide details related to waste management by the entity",
            "Principle 6: E10 Briefly describe the waste management practices adopted in your establishments",
            "Principle 6: E11 Operations/offices in/around ecologically sensitive areas where environmental approvals are required",
            "Principle 6: E12 Details of environmental impact assessments of projects undertaken by the entity",
            "Principle 6: E13 Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India?",
            "Principle 6: L1 Water withdrawal, consumption and discharge in areas of water stress",
            "Principle 6: L2 Please provide details of total Scope 3 emissions & its intensity",
            "Principle 6: L3 Details of significant direct & indirect impact of the entity on biodiversity in sensitive areas",
            "Principle 6: L4 Specific initiatives or used innovative technology to improve resource efficiency",
            "Principle 6: L5 Does the entity have a business continuity and disaster management plan?",
            "Principle 6: L6 Disclose any significant adverse impact to the environment arising from the value chain",
            "Principle 6: L7 Percentage of value chain partners that were assessed for environmental impacts",
            "Principle 6: L8 How many Green Credits have been generated or procured",
            "Principle 7: E1 (a) Number of affiliations with trade and industry chambers (b) List top 10 affiliations",
            "Principle 7: E2 Provide details of corrective action taken or underway on issues related to anti-competitive conduct",
            "Principle 7: L1 Details of public policy positions advocated by the entity",
            "Principle 8: E1 Details of Social Impact Assessments (SIA) of projects undertaken by the entity",
            "Principle 8: E2 Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken",
            "Principle 8: E3 Describe the mechanisms to receive and redress grievances of the community",
            "Principle 8: E4 Percentage of input material (inputs to total inputs by value) sourced from suppliers",
            "Principle 8: E5 Job creation in smaller towns",
            "Principle 8: L1 Provide details of actions taken to mitigate any negative social impacts identified in SIA",
            "Principle 8: L2 Provide information on CSR projects undertaken by your entity in designated aspirational districts",
            "Principle 8: L3 (a) Preferential procurement policy (b) Source of procurement (c) Percentage of total procurement",
            "Principle 8: L4 Details of the benefits derived and shared from the intellectual properties owned or acquired",
            "Principle 8: L5 Details of corrective actions taken or underway based on any adverse order in IP related disputes",
            "Principle 8: L6 Details of beneficiaries of CSR Projects",
            "Principle 9: E1 Describe the mechanisms in place to receive and respond to consumer complaints and feedback",
            "Principle 9: E2 Turnover of products/services as a percentage of turnover from all products that carry info",
            "Principle 9: E3 Number of consumer complaints in respect of the following (Principle 9)",
            "Principle 9: E4 Details of instances of product recalls on account of safety issues",
            "Principle 9: E5 Does the entity have a framework/ policy on cyber security and risks related to data privacy?",
            "Principle 9: E6 Provide details of any corrective actions taken or underway on issues relating to advertising",
            "Principle 9: E7 Provide the following information relating to data breaches and number of instances",
            "Principle 9: L1 Channels / platforms where information on products and services of the entity can be accessed",
            "Principle 9: L2 Steps taken to inform and educate consumers about safe and responsible usage of products",
            "Principle 9: L3 Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services",
            "Principle 9: L4 Display product information above mandate / Did your entity carry out any survey regarding consumer satisfaction?"
          ],
          "status": [
            "Full",
            "Partial",
            "None",
            "Not Applicable"
          ]
        },
        "defaultRow": {
          "particulars": "",
          "status": "None",
          "details": "",
          "remarks": ""
        }
      }
    ]
  },
  {
    "id": "subsection_business_activities",
    "title": "II. Products/services",
    "type": "table",
    "label": "17. Details of business activities (accounting for 90% of the Turnover):",
    "dynamic": true,
    "storageField": "description_of_business_activity",
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "activity",
        "label": "Description of Main Activity",
        "uiType": "textarea"
      },
      {
        "id": "description",
        "label": "Description of Business Activity",
        "uiType": "textarea"
      },
      {
        "id": "turnover",
        "label": "% of Turnover of the entity",
        "uiType": "number"
      }
    ],
    "defaultRow": {
      "activity": "",
      "description": "",
      "turnover": ""
    },
    "note": {
      "name": "note_description_of_business_activity",
      "label": "Note",
      "uiType": "textarea"
    }
  },
  {
    "id": "subsection_products_services",
    "title": "II. Products/services (Contd.)",
    "type": "table",
    "dynamic": true,
    "storageField": "products_or_services_sold_by_the_entity_accounting_for_ninety_percent_of_the_turnover",
    "label": "18. Products/Services sold by the entity (accounting for 90% of the entity's Turnover)",
    "helperLink": "https://www.ncs.gov.in/Documents/NIC_Sector.pdf",
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "product",
        "label": "Product/Service"
      },
      {
        "id": "nic_code",
        "label": "NIC Code",
        "uiType": "nic_search"
      },
      {
        "id": "turnover",
        "label": "% of total Turnover contributed",
        "uiType": "number"
      }
    ],
    "defaultRow": {
      "product": "",
      "nic_code": "",
      "turnover": ""
    },
    "note": {
      "name": "note_products_or_services_sold",
      "label": "Note",
      "uiType": "textarea"
    }
  },
  {
    "id": "subsection_operations_locations",
    "title": "III. Operations",
    "type": "table",
    "label": "19. Number of locations where plants and/or operations/offices of the entity are situated",
    "columns": [
      {
        "id": "particulars",
        "label": "Location"
      },
      {
        "id": "plants",
        "label": "Number of plants",
        "uiType": "number"
      },
      {
        "id": "offices",
        "label": "Number of offices",
        "uiType": "number"
      },
      {
        "id": "total",
        "label": "Total",
        "uiType": "number"
      }
    ],
    "rows": [
      {
        "id": "nat",
        "label": "National"
      },
      {
        "id": "int",
        "label": "International"
      }
    ],
    "disabledCells": [
      {
        "rowId": "nat",
        "colId": "total"
      },
      {
        "rowId": "int",
        "colId": "total"
      }
    ],
    "fields": [
      {
        "name": "number_of_plants_national",
        "mapping": "plants",
        "row": "nat"
      },
      {
        "name": "number_of_offices_national",
        "mapping": "offices",
        "row": "nat"
      },
      {
        "name": "total_number_of_locations_national",
        "mapping": "total",
        "row": "nat"
      },
      {
        "name": "number_of_plants_international",
        "mapping": "plants",
        "row": "int"
      },
      {
        "name": "number_of_offices_international",
        "mapping": "offices",
        "row": "int"
      },
      {
        "name": "total_number_of_locations_international",
        "mapping": "total",
        "row": "int"
      }
    ]
  },
  {
    "id": "subsection_operations_markets_a",
    "title": "III. Operations (Contd.)",
    "type": "table",
    "label": "20. Markets served by the entity: A. Number of locations",
    "columns": [
      {
        "id": "particulars",
        "label": "Locations"
      },
      {
        "id": "number",
        "label": "Number",
        "uiType": "number"
      }
    ],
    "rows": [
      {
        "id": "states",
        "label": "National (No. of States)"
      },
      {
        "id": "countries",
        "label": "International (No. of Countries)"
      }
    ],
    "fields": [
      {
        "name": "number_of_national_locations",
        "mapping": "number",
        "row": "states"
      },
      {
        "name": "number_of_international_locations",
        "mapping": "number",
        "row": "countries"
      }
    ]
  },
  {
    "id": "subsection_operations_markets_bc",
    "title": "III. Operations (Contd.)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "name": "contribution_of_export",
        "label": "20. B. What is the contribution of exports as a percentage of the total turnover of the entity?",
        "uiType": "number"
      },
      {
        "name": "brief_on_types_of_customer",
        "label": "20. C. A brief on types of customers",
        "uiType": "textarea"
      }
    ]
  },
  {
    "id": "subsection_employees_matrix_a",
    "title": "IV. Employees",
    "type": "table",
    "label": "21. Details as at the end of Financial Year: A. Employees and workers (including differently abled)",
    "headerRows": [
      [
        {
          "label": "Sr. No.",
          "rowSpan": 2
        },
        {
          "label": "Particulars",
          "rowSpan": 2
        },
        {
          "label": "Total (A)",
          "rowSpan": 2
        },
        {
          "label": "Male",
          "colSpan": 2
        },
        {
          "label": "Female",
          "colSpan": 2
        },
        {
          "label": "Other",
          "colSpan": 2
        }
      ],
      [
        {
          "label": "No. (B)"
        },
        {
          "label": "% (B/A)"
        },
        {
          "label": "No. (C)"
        },
        {
          "label": "% (C/A)"
        },
        {
          "label": "No. (H)"
        },
        {
          "label": "% (H/A)"
        }
      ]
    ],
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "particulars",
        "label": "Particulars"
      },
      {
        "id": "total",
        "label": "Total (A)",
        "uiType": "number"
      },
      {
        "id": "male_no",
        "label": "No. (B)",
        "uiType": "number"
      },
      {
        "id": "male_pct",
        "label": "% (B/A)",
        "uiType": "number"
      },
      {
        "id": "female_no",
        "label": "No. (C)",
        "uiType": "number"
      },
      {
        "id": "female_pct",
        "label": "% (C/A)",
        "uiType": "number"
      },
      {
        "id": "other_no",
        "label": "No. (H)",
        "uiType": "number"
      },
      {
        "id": "other_pct",
        "label": "% (H/A)",
        "uiType": "number"
      }
    ],
    "rows": [
      {
        "id": "h1",
        "label": "EMPLOYEES",
        "isHeader": true
      },
      {
        "id": "1",
        "label": "Permanent (D)"
      },
      {
        "id": "2",
        "label": "Other than permanent (E)"
      },
      {
        "id": "3",
        "label": "Total employees (D + E)"
      },
      {
        "id": "h2",
        "label": "WORKERS",
        "isHeader": true
      },
      {
        "id": "4",
        "label": "Permanent (F)"
      },
      {
        "id": "5",
        "label": "Other than permanent (G)"
      },
      {
        "id": "6",
        "label": "Total workers (F + G)"
      }
    ],
    "disabledCells": [
      {
        "rowId": "1",
        "colId": "total"
      },
      {
        "rowId": "1",
        "colId": "male_pct"
      },
      {
        "rowId": "1",
        "colId": "female_pct"
      },
      {
        "rowId": "1",
        "colId": "other_pct"
      },
      {
        "rowId": "2",
        "colId": "total"
      },
      {
        "rowId": "2",
        "colId": "male_pct"
      },
      {
        "rowId": "2",
        "colId": "female_pct"
      },
      {
        "rowId": "2",
        "colId": "other_pct"
      },
      {
        "rowId": "3",
        "colId": "total"
      },
      {
        "rowId": "3",
        "colId": "male_no"
      },
      {
        "rowId": "3",
        "colId": "male_pct"
      },
      {
        "rowId": "3",
        "colId": "female_no"
      },
      {
        "rowId": "3",
        "colId": "female_pct"
      },
      {
        "rowId": "3",
        "colId": "other_no"
      },
      {
        "rowId": "3",
        "colId": "other_pct"
      },
      {
        "rowId": "4",
        "colId": "total"
      },
      {
        "rowId": "4",
        "colId": "male_pct"
      },
      {
        "rowId": "4",
        "colId": "female_pct"
      },
      {
        "rowId": "4",
        "colId": "other_pct"
      },
      {
        "rowId": "5",
        "colId": "total"
      },
      {
        "rowId": "5",
        "colId": "male_pct"
      },
      {
        "rowId": "5",
        "colId": "female_pct"
      },
      {
        "rowId": "5",
        "colId": "other_pct"
      },
      {
        "rowId": "6",
        "colId": "total"
      },
      {
        "rowId": "6",
        "colId": "male_no"
      },
      {
        "rowId": "6",
        "colId": "male_pct"
      },
      {
        "rowId": "6",
        "colId": "female_no"
      },
      {
        "rowId": "6",
        "colId": "female_pct"
      },
      {
        "rowId": "6",
        "colId": "other_no"
      },
      {
        "rowId": "6",
        "colId": "other_pct"
      }
    ],
    "fields": [
      {
        "name": "total_number_of_permanent_employees",
        "mapping": "total",
        "row": "1"
      },
      {
        "name": "number_of_male_permanent_employees",
        "mapping": "male_no",
        "row": "1"
      },
      {
        "name": "percentage_of_male_permanent_employees",
        "mapping": "male_pct",
        "row": "1"
      },
      {
        "name": "number_of_female_permanent_employees",
        "mapping": "female_no",
        "row": "1"
      },
      {
        "name": "percentage_of_female_permanent_employees",
        "mapping": "female_pct",
        "row": "1"
      },
      {
        "name": "number_of_other_permanent_employees",
        "mapping": "other_no",
        "row": "1"
      },
      {
        "name": "percentage_of_other_permanent_employees",
        "mapping": "other_pct",
        "row": "1"
      },
      {
        "name": "total_number_of_other_than_permanent_employees",
        "mapping": "total",
        "row": "2"
      },
      {
        "name": "number_of_male_other_than_permanent_employees",
        "mapping": "male_no",
        "row": "2"
      },
      {
        "name": "percentage_of_male_other_than_permanent_employees",
        "mapping": "male_pct",
        "row": "2"
      },
      {
        "name": "number_of_female_other_than_permanent_employees",
        "mapping": "female_no",
        "row": "2"
      },
      {
        "name": "percentage_of_female_other_than_permanent_employees",
        "mapping": "female_pct",
        "row": "2"
      },
      {
        "name": "number_of_other_other_than_permanent_employees",
        "mapping": "other_no",
        "row": "2"
      },
      {
        "name": "percentage_of_other_other_than_permanent_employees",
        "mapping": "other_pct",
        "row": "2"
      },
      {
        "name": "total_number_of_employees",
        "mapping": "total",
        "row": "3"
      },
      {
        "name": "number_of_male_employees",
        "mapping": "male_no",
        "row": "3"
      },
      {
        "name": "percentage_of_male_employees",
        "mapping": "male_pct",
        "row": "3"
      },
      {
        "name": "number_of_female_employees",
        "mapping": "female_no",
        "row": "3"
      },
      {
        "name": "percentage_of_female_employees",
        "mapping": "female_pct",
        "row": "3"
      },
      {
        "name": "number_of_other_employees",
        "mapping": "other_no",
        "row": "3"
      },
      {
        "name": "percentage_of_other_employees",
        "mapping": "other_pct",
        "row": "3"
      },
      {
        "name": "total_number_of_permanent_workers",
        "mapping": "total",
        "row": "4"
      },
      {
        "name": "number_of_male_permanent_workers",
        "mapping": "male_no",
        "row": "4"
      },
      {
        "name": "percentage_of_male_permanent_workers",
        "mapping": "male_pct",
        "row": "4"
      },
      {
        "name": "number_of_female_permanent_workers",
        "mapping": "female_no",
        "row": "4"
      },
      {
        "name": "percentage_of_female_permanent_workers",
        "mapping": "female_pct",
        "row": "4"
      },
      {
        "name": "number_of_other_permanent_workers",
        "mapping": "other_no",
        "row": "4"
      },
      {
        "name": "percentage_of_other_permanent_workers",
        "mapping": "other_pct",
        "row": "4"
      },
      {
        "name": "total_number_of_other_than_permanent_worker",
        "mapping": "total",
        "row": "5"
      },
      {
        "name": "number_of_male_other_than_permanent_worker",
        "mapping": "male_no",
        "row": "5"
      },
      {
        "name": "percentage_of_male_other_than_permanent_worker",
        "mapping": "male_pct",
        "row": "5"
      },
      {
        "name": "number_of_female_other_than_permanent_worker",
        "mapping": "female_no",
        "row": "5"
      },
      {
        "name": "percentage_of_female_other_than_permanent_worker",
        "mapping": "female_pct",
        "row": "5"
      },
      {
        "name": "number_of_other_other_than_permanent_worker",
        "mapping": "other_no",
        "row": "5"
      },
      {
        "name": "percentage_of_other_other_than_permanent_worker",
        "mapping": "other_pct",
        "row": "5"
      },
      {
        "name": "total_number_of_workers",
        "mapping": "total",
        "row": "6"
      },
      {
        "name": "number_of_male_workers",
        "mapping": "male_no",
        "row": "6"
      },
      {
        "name": "percentage_of_male_workers",
        "mapping": "male_pct",
        "row": "6"
      },
      {
        "name": "number_of_female_workers",
        "mapping": "female_no",
        "row": "6"
      },
      {
        "name": "percentage_of_female_workers",
        "mapping": "female_pct",
        "row": "6"
      },
      {
        "name": "number_of_other_workers",
        "mapping": "other_no",
        "row": "6"
      },
      {
        "name": "percentage_of_other_workers",
        "mapping": "other_pct",
        "row": "6"
      }
    ]
  },
  {
    "id": "subsection_employees_matrix_b",
    "title": "IV. Employees (Contd.)",
    "type": "table",
    "label": "21. B. Differently abled Employees and workers:",
    "headerRows": [
      [
        {
          "label": "Sr. No.",
          "rowSpan": 2
        },
        {
          "label": "Particulars",
          "rowSpan": 2
        },
        {
          "label": "Total (A)",
          "rowSpan": 2
        },
        {
          "label": "Male",
          "colSpan": 2
        },
        {
          "label": "Female",
          "colSpan": 2
        },
        {
          "label": "Other",
          "colSpan": 2
        }
      ],
      [
        {
          "label": "No. (B)"
        },
        {
          "label": "% (B/A)"
        },
        {
          "label": "No. (C)"
        },
        {
          "label": "% (C/A)"
        },
        {
          "label": "No. (H)"
        },
        {
          "label": "% (H/A)"
        }
      ]
    ],
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "particulars",
        "label": "Particulars"
      },
      {
        "id": "total",
        "label": "Total (A)"
      },
      {
        "id": "male_no",
        "label": "No. (B)"
      },
      {
        "id": "male_pct",
        "label": "% (B/A)"
      },
      {
        "id": "female_no",
        "label": "No. (C)"
      },
      {
        "id": "female_pct",
        "label": "% (C/A)"
      },
      {
        "id": "other_no",
        "label": "No. (H)"
      },
      {
        "id": "other_pct",
        "label": "% (H/A)"
      }
    ],
    "rows": [
      {
        "id": "h3",
        "label": "DIFFERENTLY ABLED EMPLOYEES",
        "isHeader": true
      },
      {
        "id": "1b",
        "label": "Permanent (D)"
      },
      {
        "id": "2b",
        "label": "Other than permanent (E)"
      },
      {
        "id": "3b",
        "label": "Total differently abled employees (D + E)"
      },
      {
        "id": "h4",
        "label": "DIFFERENTLY ABLED WORKERS",
        "isHeader": true
      },
      {
        "id": "4b",
        "label": "Permanent (F)"
      },
      {
        "id": "5b",
        "label": "Other than permanent (G)"
      },
      {
        "id": "6b",
        "label": "Total differently abled workers (F + G)"
      }
    ],
    "disabledCells": [
      {
        "rowId": "1b",
        "colId": "total"
      },
      {
        "rowId": "1b",
        "colId": "male_pct"
      },
      {
        "rowId": "1b",
        "colId": "female_pct"
      },
      {
        "rowId": "1b",
        "colId": "other_pct"
      },
      {
        "rowId": "2b",
        "colId": "total"
      },
      {
        "rowId": "2b",
        "colId": "male_pct"
      },
      {
        "rowId": "2b",
        "colId": "female_pct"
      },
      {
        "rowId": "2b",
        "colId": "other_pct"
      },
      {
        "rowId": "3b",
        "colId": "total"
      },
      {
        "rowId": "3b",
        "colId": "male_no"
      },
      {
        "rowId": "3b",
        "colId": "male_pct"
      },
      {
        "rowId": "3b",
        "colId": "female_no"
      },
      {
        "rowId": "3b",
        "colId": "female_pct"
      },
      {
        "rowId": "3b",
        "colId": "other_no"
      },
      {
        "rowId": "3b",
        "colId": "other_pct"
      },
      {
        "rowId": "4b",
        "colId": "total"
      },
      {
        "rowId": "4b",
        "colId": "male_pct"
      },
      {
        "rowId": "4b",
        "colId": "female_pct"
      },
      {
        "rowId": "4b",
        "colId": "other_pct"
      },
      {
        "rowId": "5b",
        "colId": "total"
      },
      {
        "rowId": "5b",
        "colId": "male_pct"
      },
      {
        "rowId": "5b",
        "colId": "female_pct"
      },
      {
        "rowId": "5b",
        "colId": "other_pct"
      },
      {
        "rowId": "6b",
        "colId": "total"
      },
      {
        "rowId": "6b",
        "colId": "male_no"
      },
      {
        "rowId": "6b",
        "colId": "male_pct"
      },
      {
        "rowId": "6b",
        "colId": "female_no"
      },
      {
        "rowId": "6b",
        "colId": "female_pct"
      },
      {
        "rowId": "6b",
        "colId": "other_no"
      },
      {
        "rowId": "6b",
        "colId": "other_pct"
      }
    ],
    "fields": [
      {
        "name": "total_number_of_differently_abled_permanent_employees",
        "mapping": "total",
        "row": "1b"
      },
      {
        "name": "number_of_male_differently_abled_permanent_employees",
        "mapping": "male_no",
        "row": "1b"
      },
      {
        "name": "percentage_of_male_differently_abled_permanent_employees",
        "mapping": "male_pct",
        "row": "1b"
      },
      {
        "name": "number_of_female_differently_abled_permanent_employees",
        "mapping": "female_no",
        "row": "1b"
      },
      {
        "name": "percentage_of_female_differently_abled_permanent_employees",
        "mapping": "female_pct",
        "row": "1b"
      },
      {
        "name": "number_of_other_differently_abled_permanent_employees",
        "mapping": "other_no",
        "row": "1b"
      },
      {
        "name": "percentage_of_other_differently_abled_permanent_employees",
        "mapping": "other_pct",
        "row": "1b"
      },
      {
        "name": "total_number_of_differently_abled_other_than_permanent_employees",
        "mapping": "total",
        "row": "2b"
      },
      {
        "name": "number_of_male_differently_abled_other_than_permanent_employees",
        "mapping": "male_no",
        "row": "2b"
      },
      {
        "name": "percentage_of_male_differently_abled_other_than_permanent_employees",
        "mapping": "male_pct",
        "row": "2b"
      },
      {
        "name": "number_of_female_differently_abled_other_than_permanent_employees",
        "mapping": "female_no",
        "row": "2b"
      },
      {
        "name": "percentage_of_female_differently_abled_other_than_permanent_employees",
        "mapping": "female_pct",
        "row": "2b"
      },
      {
        "name": "number_of_other_differently_abled_other_than_permanent_employees",
        "mapping": "other_no",
        "row": "2b"
      },
      {
        "name": "percentage_of_other_differently_abled_other_than_permanent_employees",
        "mapping": "other_pct",
        "row": "2b"
      },
      {
        "name": "total_number_of_differently_abled_employees",
        "mapping": "total",
        "row": "3b"
      },
      {
        "name": "number_of_male_differently_abled_employees",
        "mapping": "male_no",
        "row": "3b"
      },
      {
        "name": "percentage_of_male_differently_abled_employees",
        "mapping": "male_pct",
        "row": "3b"
      },
      {
        "name": "number_of_female_differently_abled_employees",
        "mapping": "female_no",
        "row": "3b"
      },
      {
        "name": "percentage_of_female_differently_abled_employees",
        "mapping": "female_pct",
        "row": "3b"
      },
      {
        "name": "number_of_other_differently_abled_employees",
        "mapping": "other_no",
        "row": "3b"
      },
      {
        "name": "percentage_of_other_differently_abled_employees",
        "mapping": "other_pct",
        "row": "3b"
      },
      {
        "name": "total_number_of_differently_abled_permanent_workers",
        "mapping": "total",
        "row": "4b"
      },
      {
        "name": "number_of_male_differently_abled_permanent_workers",
        "mapping": "male_no",
        "row": "4b"
      },
      {
        "name": "percentage_of_male_differently_abled_permanent_workers",
        "mapping": "male_pct",
        "row": "4b"
      },
      {
        "name": "number_of_female_differently_abled_permanent_workers",
        "mapping": "female_no",
        "row": "4b"
      },
      {
        "name": "percentage_of_female_differently_abled_permanent_workers",
        "mapping": "female_pct",
        "row": "4b"
      },
      {
        "name": "number_of_other_differently_abled_permanent_workers",
        "mapping": "other_no",
        "row": "4b"
      },
      {
        "name": "percentage_of_other_differently_abled_permanent_workers",
        "mapping": "other_pct",
        "row": "4b"
      },
      {
        "name": "total_number_of_differently_abled_other_than_permanent_workers",
        "mapping": "total",
        "row": "5b"
      },
      {
        "name": "number_of_male_differently_abled_other_than_permanent_workers",
        "mapping": "male_no",
        "row": "5b"
      },
      {
        "name": "percentage_of_male_differently_abled_other_than_permanent_workers",
        "mapping": "male_pct",
        "row": "5b"
      },
      {
        "name": "number_of_female_differently_abled_other_than_permanent_workers",
        "mapping": "female_no",
        "row": "5b"
      },
      {
        "name": "percentage_of_female_differently_abled_other_than_permanent_workers",
        "mapping": "female_pct",
        "row": "5b"
      },
      {
        "name": "number_of_other_differently_abled_other_than_permanent_workers",
        "mapping": "other_no",
        "row": "5b"
      },
      {
        "name": "percentage_of_other_differently_abled_other_than_permanent_workers",
        "mapping": "other_pct",
        "row": "5b"
      },
      {
        "name": "total_number_of_differently_abled_workers",
        "mapping": "total",
        "row": "6b"
      },
      {
        "name": "number_of_male_differently_abled_workers",
        "mapping": "male_no",
        "row": "6b"
      },
      {
        "name": "percentage_of_male_differently_abled_workers",
        "mapping": "male_pct",
        "row": "6b"
      },
      {
        "name": "number_of_female_differently_abled_workers",
        "mapping": "female_no",
        "row": "6b"
      },
      {
        "name": "percentage_of_female_differently_abled_workers",
        "mapping": "female_pct",
        "row": "6b"
      },
      {
        "name": "number_of_other_differently_abled_workers",
        "mapping": "other_no",
        "row": "6b"
      },
      {
        "name": "percentage_of_other_differently_abled_workers",
        "mapping": "other_pct",
        "row": "6b"
      }
    ]
  },
  {
    "id": "subsection_women_participation",
    "title": "IV. Employees (Contd.)",
    "type": "table",
    "label": "22. Participation/Inclusion/Representation of women",
    "headerRows": [
      [
        {
          "label": "Particulars",
          "rowSpan": 2
        },
        {
          "label": "Total (A)",
          "rowSpan": 2
        },
        {
          "label": "No. and percentage of females",
          "colSpan": 2
        }
      ],
      [
        {
          "label": "No. (B)"
        },
        {
          "label": "% (B/A)"
        }
      ]
    ],
    "columns": [
      {
        "id": "particulars",
        "label": "Particulars"
      },
      {
        "id": "total",
        "label": "Total (A)",
        "uiType": "number"
      },
      {
        "id": "female_no",
        "label": "No. (B)",
        "uiType": "number"
      },
      {
        "id": "female_pct",
        "label": "% (B/A)",
        "uiType": "number"
      }
    ],
    "rows": [
      {
        "id": "bod",
        "label": "Board of Directors"
      },
      {
        "id": "kmp",
        "label": "Key Management Personnel (other than Executive Director)"
      }
    ],
    "disabledCells": [
      {
        "rowId": "bod",
        "colId": "female_pct"
      },
      {
        "rowId": "kmp",
        "colId": "female_pct"
      }
    ],
    "fields": [
      {
        "name": "total_number_of_women_board_of_directors",
        "mapping": "total",
        "row": "bod"
      },
      {
        "name": "number_of_female_board_of_directors",
        "mapping": "female_no",
        "row": "bod"
      },
      {
        "name": "percentage_of_female_board_of_directors",
        "mapping": "female_pct",
        "row": "bod"
      },
      {
        "name": "total_number_of_women_key_management_personnel",
        "mapping": "total",
        "row": "kmp"
      },
      {
        "name": "number_of_female_key_management_personnel",
        "mapping": "female_no",
        "row": "kmp"
      },
      {
        "name": "percentage_of_female_key_management_personnel",
        "mapping": "female_pct",
        "row": "kmp"
      }
    ]
  },
  {
    "id": "q23_final",
    "title": "IV. Employees (Contd.)",
    "type": "table",
    "popup": true,
    "label": "23. Turnover rate for permanent employees and workers",
    "headerRows": [
      [
        {
          "label": "Particulars",
          "rowSpan": 2
        },
        {
          "label": "Turnover rate in current FY",
          "colSpan": 4
        },
        {
          "label": "Turnover rate in previous FY",
          "colSpan": 4
        },
        {
          "label": "Turnover rate in the year prior to the previous FY",
          "colSpan": 4
        }
      ],
      [
        {
          "label": "Male"
        },
        {
          "label": "Female"
        },
        {
          "label": "Other"
        },
        {
          "label": "Total"
        },
        {
          "label": "Male"
        },
        {
          "label": "Female"
        },
        {
          "label": "Other"
        },
        {
          "label": "Total"
        },
        {
          "label": "Male"
        },
        {
          "label": "Female"
        },
        {
          "label": "Other"
        },
        {
          "label": "Total"
        }
      ]
    ],
    "columns": [
      {
        "id": "particulars",
        "label": "Particulars"
      },
      {
        "id": "male_fy1",
        "label": "Male"
      },
      {
        "id": "female_fy1",
        "label": "Female"
      },
      {
        "id": "other_fy1",
        "label": "Other"
      },
      {
        "id": "total_fy1",
        "label": "Total"
      },
      {
        "id": "male_fy2",
        "label": "Male"
      },
      {
        "id": "female_fy2",
        "label": "Female"
      },
      {
        "id": "other_fy2",
        "label": "Other"
      },
      {
        "id": "total_fy2",
        "label": "Total"
      },
      {
        "id": "male_fy3",
        "label": "Male"
      },
      {
        "id": "female_fy3",
        "label": "Female"
      },
      {
        "id": "other_fy3",
        "label": "Other"
      },
      {
        "id": "total_fy3",
        "label": "Total"
      }
    ],
    "rows": [
      {
        "id": "emp",
        "label": "Permanent Employees"
      },
      {
        "id": "wrk",
        "label": "Permanent Workers"
      }
    ],
    "disabledCells": [
      {
        "rowId": "emp",
        "colId": "total_fy1"
      },
      {
        "rowId": "emp",
        "colId": "total_fy2"
      },
      {
        "rowId": "emp",
        "colId": "total_fy3"
      },
      {
        "rowId": "wrk",
        "colId": "total_fy1"
      },
      {
        "rowId": "wrk",
        "colId": "total_fy2"
      },
      {
        "rowId": "wrk",
        "colId": "total_fy3"
      }
    ],
    "fields": [
      {
        "name": "q23_emp_male_fy1",
        "mapping": "male_fy1",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_female_fy1",
        "mapping": "female_fy1",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_other_fy1",
        "mapping": "other_fy1",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_total_fy1",
        "mapping": "total_fy1",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_male_fy2",
        "mapping": "male_fy2",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_female_fy2",
        "mapping": "female_fy2",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_other_fy2",
        "mapping": "other_fy2",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_total_fy2",
        "mapping": "total_fy2",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_male_fy3",
        "mapping": "male_fy3",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_female_fy3",
        "mapping": "female_fy3",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_other_fy3",
        "mapping": "other_fy3",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_emp_total_fy3",
        "mapping": "total_fy3",
        "row": "emp",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_male_fy1",
        "mapping": "male_fy1",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_female_fy1",
        "mapping": "female_fy1",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_other_fy1",
        "mapping": "other_fy1",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_total_fy1",
        "mapping": "total_fy1",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_male_fy2",
        "mapping": "male_fy2",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_female_fy2",
        "mapping": "female_fy2",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_other_fy2",
        "mapping": "other_fy2",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_total_fy2",
        "mapping": "total_fy2",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_male_fy3",
        "mapping": "male_fy3",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_female_fy3",
        "mapping": "female_fy3",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_other_fy3",
        "mapping": "other_fy3",
        "row": "wrk",
        "uiType": "number"
      },
      {
        "name": "q23_wrk_total_fy3",
        "mapping": "total_fy3",
        "row": "wrk",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "subsection_holding_companies",
    "title": "V. Holding, Subsidiary and Associate Companies",
    "type": "table",
    "dynamic": true,
    "storageField": "names_of_holding_subsidiary_associate_companies_joint_ventures",
    "label": "24. (a) Names of holding / subsidiary / associate companies / joint ventures",
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "name",
        "label": "Name of the company (A)"
      },
      {
        "id": "type",
        "label": "Type (Holding/Subsidiary/Associate/JV)"
      },
      {
        "id": "shares",
        "label": "% of shares held",
        "uiType": "number"
      },
      {
        "id": "participation",
        "label": "Participates in BR initiatives? (Yes/No)"
      }
    ],
    "defaultRow": {
      "name": "",
      "type": "",
      "shares": "",
      "participation": "No"
    },
    "columnOptions": {
      "type": [
        "Holding",
        "Subsidiary",
        "Associate",
        "Joint Venture"
      ],
      "participation": [
        "Yes",
        "No"
      ]
    },
    "note": {
      "name": "note_names_of_holding_subsidiary_associate_companies",
      "label": "Note",
      "uiType": "textarea"
    }
  },
  {
    "id": "subsection_csr",
    "title": "VI. CSR Details",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "whether_csr_is_applicable_as_per_section_135",
        "label": "25. (i) Whether CSR is applicable as per section 135 (Yes/No)",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "name": "turnover_for_csr",
        "label": "(ii) Turnover (in Rs.)",
        "uiType": "number"
      },
      {
        "name": "net_worth_for_csr",
        "label": "(iii) Net worth (in Rs.)",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "q26_transparency",
    "title": "VII. Transparency and Disclosures Compliances",
    "type": "table",
    "label": "26. (b) Complaints/Grievances on any of the principles (Principles 1 to 9)",
    "dynamic": true,
    "disableAddDelete": false,
    "storageField": "complaints_grievances_details_json",
    "headerRows": [
      [
        {
          "label": "Stakeholder group from whom complaint is received",
          "rowSpan": 2
        },
        {
          "label": "Grievance Redressal Mechanism in Place (Yes/No/NA)",
          "rowSpan": 2
        },
        {
          "label": "Web-link for grievance redress policy (If Yes)",
          "rowSpan": 2
        },
        {
          "label": "Current FY",
          "colSpan": 3
        },
        {
          "label": "Previous FY",
          "colSpan": 3
        },
        {
          "label": "Reason (If NA)",
          "rowSpan": 2
        }
      ],
      [
        {
          "label": "Number of complaints filed during the year"
        },
        {
          "label": "Number of complaints pending at close of year"
        },
        {
          "label": "Remarks"
        },
        {
          "label": "Number of complaints filed during the year"
        },
        {
          "label": "Number of complaints pending at close of year"
        },
        {
          "label": "Remarks"
        }
      ]
    ],
    "columns": [
      {
        "id": "particulars",
        "label": "Stakeholder group",
        "uiType": "text"
      },
      {
        "id": "mechanism",
        "label": "Mechanism (Yes/No/NA)",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "id": "web_link",
        "label": "Web-link",
        "uiType": "text",
        "dependsOn": {
          "id": "mechanism",
          "value": "Yes"
        }
      },
      {
        "id": "fy_filed",
        "label": "FY Filed",
        "uiType": "number",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "fy_pending",
        "label": "FY Pending",
        "uiType": "number",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "fy_remarks",
        "label": "FY Remarks",
        "uiType": "text",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "py_filed",
        "label": "PY Filed",
        "uiType": "number",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "py_pending",
        "label": "PY Pending",
        "uiType": "number",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "py_remarks",
        "label": "PY Remarks",
        "uiType": "text",
        "dependsOn": {
          "id": "mechanism",
          "value": [
            "Yes",
            "No"
          ]
        }
      },
      {
        "id": "na_reason",
        "label": "Reason if NA",
        "uiType": "text",
        "dependsOn": {
          "id": "mechanism",
          "value": "NA"
        }
      }
    ],
    "defaultRow": {
      "particulars": "",
      "mechanism": "None",
      "web_link": "",
      "fy_filed": "",
      "fy_pending": "",
      "fy_remarks": "",
      "py_filed": "",
      "py_pending": "",
      "py_remarks": "",
      "na_reason": ""
    },
    "defaultRows": [
      {
        "particulars": "Communities",
        "mechanism": "None",
        "readOnlyParticulars": true
      },
      {
        "particulars": "Investors (other than shareholders)",
        "mechanism": "None",
        "readOnlyParticulars": true
      },
      {
        "particulars": "Shareholders",
        "mechanism": "None",
        "readOnlyParticulars": true
      },
      {
        "particulars": "Employees and workers",
        "mechanism": "None",
        "readOnlyParticulars": true
      },
      {
        "particulars": "Customers",
        "mechanism": "None",
        "readOnlyParticulars": true
      },
      {
        "particulars": "Value Chain Partners",
        "mechanism": "None",
        "readOnlyParticulars": true
      }
    ]
  },
  {
    "id": "subsection_material_issues_v2",
    "title": "Transparency (Contd.)",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "name": "q27_material_issues_json",
        "label": "27. Overview of the entity's material responsible business conduct issues",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add details",
        "buttonColor": "text-blue-400",
        "instructions": "Please indicate material responsible business conduct and sustainability issues pertaining to environmental and social matters that present a risk or an opportunity to your business, rationale for identifying the same, approach to adapt or mitigate the risk along-with its financial implications, as per the following format",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "issue",
            "label": "Material issue identified"
          },
          {
            "id": "type",
            "label": "Indicate whether risk or opportunity (R/O)",
            "uiType": "select",
            "options": [
              "R",
              "O",
              "R&O"
            ]
          },
          {
            "id": "rationale",
            "label": "Rationale for identifying the risk / opportunity"
          },
          {
            "id": "approach",
            "label": "In case of risk, approach to adapt or mitigate"
          },
          {
            "id": "financial",
            "label": "Financial implications of the risk or opportunity (Indicate positive or negative implications)",
            "uiType": "select",
            "options": [
              "Positive Implications",
              "Negative Implications"
            ]
          }
        ],
        "defaultRow": {
          "issue": "",
          "type": "",
          "rationale": "",
          "approach": "",
          "financial": ""
        }
      },
      {
        "name": "q28_notes",
        "label": "28. Notes",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes",
        "buttonColor": "bg-white/10"
      }
    ]
  }
];
