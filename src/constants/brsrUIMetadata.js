export const BRSR_UI_METADATA = {
    "Section A: General Disclosures": [
        {
            "id": "subsection_1_part1",
            "title": "I. Details of the listed entity",
            "type": "grid",
            "columns": 2,
            "fields": [
                { "name": "corporate_identity_number", "label": "1. Corporate Identity Number (CIN)", "uiType": "text" },
                { "name": "name_of_the_company", "label": "2. Name of the Listed Entity", "uiType": "text" },
                { "name": "date_of_incorporation", "label": "3. Date of incorporation", "uiType": "date" },
                { "name": "address_of_registered_office_of_company", "label": "4. Registered office address", "uiType": "textarea" },
                { "name": "address_of_corporate_office_of_company", "label": "5. Corporate office address", "uiType": "textarea" },
                { "name": "e_mail_of_the_company", "label": "6. E-mail", "uiType": "text" },
                { "name": "telephone_of_company", "label": "7. Telephone", "uiType": "text" },
                { "name": "website_of_company", "label": "8. Website", "uiType": "text" },
                { "name": "date_of_start_of_financial_year", "label": "9. (a) Current Financial Year - Start Date", "uiType": "date" },
                { "name": "date_of_end_of_financial_year", "label": "9. (a) Current Financial Year - End Date", "uiType": "date" },
                { "name": "date_of_start_of_previous_year", "label": "9. (b) Previous Financial Year - Start Date", "uiType": "date" },
                { "name": "date_of_end_of_previous_year", "label": "9. (b) Previous Financial Year - End Date", "uiType": "date" },
                { "name": "date_of_start_of_prior_to_previous_year", "label": "9. (c) Year Prior to Previous FY - Start Date", "uiType": "date" },
                { "name": "date_of_end_of_prior_to_previous_year", "label": "9. (c) Year Prior to Previous FY - End Date", "uiType": "date" }
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
                { "id": "sno", "label": "Sr. No." },
                {
                    "id": "name",
                    "label": "Name of the Stock exchange",
                    "uiType": "select",
                    "options": ["BSE", "NSE", "MSEI", "Others"]
                },
                {
                    "id": "code",
                    "label": "Description of other stock exchange",
                    "dependsOn": { "id": "name", "value": "Others" }
                },
                {
                    "id": "country",
                    "label": "Name of the Country",
                    "dependsOn": { "id": "name", "value": "Others" }
                }
            ],
            "defaultRow": { "name": "", "code": "", "country": "" }
        },
        {
            "id": "subsection_1_part2",
            "title": "I. Details of the listed entity (Contd.)",
            "type": "grid",
            "columns": 2,
            "fields": [
                { "name": "paid_up_capital", "label": "11. Paid-up Capital (In Rs.)", "uiType": "number" },
                {
                    "id": "contact_details",
                    "label": "12. Name and contact details of the person who may be contacted in case of any queries on the BRSR report",
                    "type": "group",
                    "fields": [
                        { "name": "name_of_contact_person", "label": "Name", "uiType": "text" },
                        { "name": "contact_number_of_contact_person", "label": "Telephone", "uiType": "text" },
                        { "name": "e_mail_of_contact_person", "label": "Email", "uiType": "text" }
                    ]
                },
                { "name": "reporting_boundary", "label": "13. Reporting boundary", "uiType": "select", "options": ["Standalone", "Consolidated"] },
                {
                    "label": "14. Whether the company has undertaken assessment or assurance of the BRSR Core? (Yes/No)",
                    "name": "whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core",
                    "uiType": "select",
                    "options": ["Yes", "No"]
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
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "company_name", "label": "Company / LLP / Firm Name" },
                        { "id": "registration_no", "label": "Company ID / LLP ID / Firm Registration No." },
                        { "id": "provider_name", "label": "Name of assessment or assurance provider" },
                        { "id": "designation", "label": "Designation of assessor or assurer" },
                        { "id": "signing_date", "label": "Date of signing" }
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
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "particulars", "label": "Particulars" },
                        { "id": "status", "label": "Assessment / Assurance" },
                        { "id": "details", "label": "Assessment / Assurance details", "uiType": "textarea" },
                        { "id": "remarks", "label": "Remarks", "uiType": "textarea" }
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
                        "status": ["Full", "Partial", "None", "Not Applicable"]
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
                { "id": "sno", "label": "Sr. No." },
                { "id": "activity", "label": "Description of Main Activity", "uiType": "textarea" },
                { "id": "description", "label": "Description of Business Activity", "uiType": "textarea" },
                { "id": "turnover", "label": "% of Turnover of the entity", "uiType": "number" }
            ],
            "defaultRow": { "activity": "", "description": "", "turnover": "" },
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
                { "id": "sno", "label": "Sr. No." },
                { "id": "product", "label": "Product/Service" },
                { "id": "nic_code", "label": "NIC Code", "uiType": "nic_search" },

                { "id": "turnover", "label": "% of total Turnover contributed", "uiType": "number" }
            ],
            "defaultRow": { "product": "", "nic_code": "", "turnover": "" },
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
                { "id": "particulars", "label": "Location" },
                { "id": "plants", "label": "Number of plants", "uiType": "number" },
                { "id": "offices", "label": "Number of offices", "uiType": "number" },
                { "id": "total", "label": "Total", "uiType": "number" }
            ],
            "rows": [
                { "id": "nat", "label": "National" },
                { "id": "int", "label": "International" }
            ],
            "disabledCells": [
                { "rowId": "nat", "colId": "total" },
                { "rowId": "int", "colId": "total" }
            ],
            "fields": [
                { "name": "number_of_plants_national", "mapping": "plants", "row": "nat" },
                { "name": "number_of_offices_national", "mapping": "offices", "row": "nat" },
                { "name": "total_number_of_locations_national", "mapping": "total", "row": "nat" },
                { "name": "number_of_plants_international", "mapping": "plants", "row": "int" },
                { "name": "number_of_offices_international", "mapping": "offices", "row": "int" },
                { "name": "total_number_of_locations_international", "mapping": "total", "row": "int" }
            ]
        },
        {
            "id": "subsection_operations_markets_a",
            "title": "III. Operations (Contd.)",
            "type": "table",
            "label": "20. Markets served by the entity: A. Number of locations",
            "columns": [
                { "id": "particulars", "label": "Locations" },
                { "id": "number", "label": "Number", "uiType": "number" }
            ],
            "rows": [
                { "id": "states", "label": "National (No. of States)" },
                { "id": "countries", "label": "International (No. of Countries)" }
            ],
            "fields": [
                { "name": "number_of_national_locations", "mapping": "number", "row": "states" },
                { "name": "number_of_international_locations", "mapping": "number", "row": "countries" }
            ]
        },
        {
            "id": "subsection_operations_markets_bc",
            "title": "III. Operations (Contd.)",
            "type": "grid",
            "columns": 1,
            "fields": [
                { "name": "contribution_of_export", "label": "20. B. What is the contribution of exports as a percentage of the total turnover of the entity?", "uiType": "number" },
                { "name": "brief_on_types_of_customer", "label": "20. C. A brief on types of customers", "uiType": "textarea" }
            ]
        },
        {
            "id": "subsection_employees_matrix_a",
            "title": "IV. Employees",
            "type": "table",
            "label": "21. Details as at the end of Financial Year: A. Employees and workers (including differently abled)",
            "headerRows": [
                [
                    { "label": "Sr. No.", "rowSpan": 2 },
                    { "label": "Particulars", "rowSpan": 2 },
                    { "label": "Total (A)", "rowSpan": 2 },
                    { "label": "Male", "colSpan": 2 },
                    { "label": "Female", "colSpan": 2 },
                    { "label": "Other", "colSpan": 2 }
                ],
                [
                    { "label": "No. (B)" }, { "label": "% (B/A)" },
                    { "label": "No. (C)" }, { "label": "% (C/A)" },
                    { "label": "No. (H)" }, { "label": "% (H/A)" }
                ]
            ],
            "columns": [
                { "id": "sno", "label": "Sr. No." },
                { "id": "particulars", "label": "Particulars" },
                { "id": "total", "label": "Total (A)", "uiType": "number" },
                { "id": "male_no", "label": "No. (B)", "uiType": "number" },
                { "id": "male_pct", "label": "% (B/A)", "uiType": "number" },
                { "id": "female_no", "label": "No. (C)", "uiType": "number" },
                { "id": "female_pct", "label": "% (C/A)", "uiType": "number" },
                { "id": "other_no", "label": "No. (H)", "uiType": "number" },
                { "id": "other_pct", "label": "% (H/A)", "uiType": "number" }
            ],
            "rows": [
                { "id": "h1", "label": "EMPLOYEES", "isHeader": true },
                { "id": "1", "label": "Permanent (D)" },
                { "id": "2", "label": "Other than permanent (E)" },
                { "id": "3", "label": "Total employees (D + E)" },
                { "id": "h2", "label": "WORKERS", "isHeader": true },
                { "id": "4", "label": "Permanent (F)" },
                { "id": "5", "label": "Other than permanent (G)" },
                { "id": "6", "label": "Total workers (F + G)" }
            ],
            "disabledCells": [
                { "rowId": "1", "colId": "total" }, { "rowId": "1", "colId": "male_pct" }, { "rowId": "1", "colId": "female_pct" }, { "rowId": "1", "colId": "other_pct" },
                { "rowId": "2", "colId": "total" }, { "rowId": "2", "colId": "male_pct" }, { "rowId": "2", "colId": "female_pct" }, { "rowId": "2", "colId": "other_pct" },
                { "rowId": "3", "colId": "total" }, { "rowId": "3", "colId": "male_no" }, { "rowId": "3", "colId": "male_pct" }, { "rowId": "3", "colId": "female_no" }, { "rowId": "3", "colId": "female_pct" }, { "rowId": "3", "colId": "other_no" }, { "rowId": "3", "colId": "other_pct" },
                { "rowId": "4", "colId": "total" }, { "rowId": "4", "colId": "male_pct" }, { "rowId": "4", "colId": "female_pct" }, { "rowId": "4", "colId": "other_pct" },
                { "rowId": "5", "colId": "total" }, { "rowId": "5", "colId": "male_pct" }, { "rowId": "5", "colId": "female_pct" }, { "rowId": "5", "colId": "other_pct" },
                { "rowId": "6", "colId": "total" }, { "rowId": "6", "colId": "male_no" }, { "rowId": "6", "colId": "male_pct" }, { "rowId": "6", "colId": "female_no" }, { "rowId": "6", "colId": "female_pct" }, { "rowId": "6", "colId": "other_no" }, { "rowId": "6", "colId": "other_pct" }
            ],
            "fields": [
                /* Permanent Employees */
                { "name": "total_number_of_permanent_employees", "mapping": "total", "row": "1" },
                { "name": "number_of_male_permanent_employees", "mapping": "male_no", "row": "1" },
                { "name": "percentage_of_male_permanent_employees", "mapping": "male_pct", "row": "1" },
                { "name": "number_of_female_permanent_employees", "mapping": "female_no", "row": "1" },
                { "name": "percentage_of_female_permanent_employees", "mapping": "female_pct", "row": "1" },
                { "name": "number_of_other_permanent_employees", "mapping": "other_no", "row": "1" },
                { "name": "percentage_of_other_permanent_employees", "mapping": "other_pct", "row": "1" },

                /* Other than Permanent Employees */
                { "name": "total_number_of_other_than_permanent_employees", "mapping": "total", "row": "2" },
                { "name": "number_of_male_other_than_permanent_employees", "mapping": "male_no", "row": "2" },
                { "name": "percentage_of_male_other_than_permanent_employees", "mapping": "male_pct", "row": "2" },
                { "name": "number_of_female_other_than_permanent_employees", "mapping": "female_no", "row": "2" },
                { "name": "percentage_of_female_other_than_permanent_employees", "mapping": "female_pct", "row": "2" },
                { "name": "number_of_other_other_than_permanent_employees", "mapping": "other_no", "row": "2" },
                { "name": "percentage_of_other_other_than_permanent_employees", "mapping": "other_pct", "row": "2" },

                /* Total Employees */
                { "name": "total_number_of_employees", "mapping": "total", "row": "3" },
                { "name": "number_of_male_employees", "mapping": "male_no", "row": "3" },
                { "name": "percentage_of_male_employees", "mapping": "male_pct", "row": "3" },
                { "name": "number_of_female_employees", "mapping": "female_no", "row": "3" },
                { "name": "percentage_of_female_employees", "mapping": "female_pct", "row": "3" },
                { "name": "number_of_other_employees", "mapping": "other_no", "row": "3" },
                { "name": "percentage_of_other_employees", "mapping": "other_pct", "row": "3" },

                /* Permanent Workers */
                { "name": "total_number_of_permanent_workers", "mapping": "total", "row": "4" },
                { "name": "number_of_male_permanent_workers", "mapping": "male_no", "row": "4" },
                { "name": "percentage_of_male_permanent_workers", "mapping": "male_pct", "row": "4" },
                { "name": "number_of_female_permanent_workers", "mapping": "female_no", "row": "4" },
                { "name": "percentage_of_female_permanent_workers", "mapping": "female_pct", "row": "4" },
                { "name": "number_of_other_permanent_workers", "mapping": "other_no", "row": "4" },
                { "name": "percentage_of_other_permanent_workers", "mapping": "other_pct", "row": "4" },

                /* Other than Permanent Workers */
                { "name": "total_number_of_other_than_permanent_worker", "mapping": "total", "row": "5" },
                { "name": "number_of_male_other_than_permanent_worker", "mapping": "male_no", "row": "5" },
                { "name": "percentage_of_male_other_than_permanent_worker", "mapping": "male_pct", "row": "5" },
                { "name": "number_of_female_other_than_permanent_worker", "mapping": "female_no", "row": "5" },
                { "name": "percentage_of_female_other_than_permanent_worker", "mapping": "female_pct", "row": "5" },
                { "name": "number_of_other_other_than_permanent_worker", "mapping": "other_no", "row": "5" },
                { "name": "percentage_of_other_other_than_permanent_worker", "mapping": "other_pct", "row": "5" },

                /* Total Workers */
                { "name": "total_number_of_workers", "mapping": "total", "row": "6" },
                { "name": "number_of_male_workers", "mapping": "male_no", "row": "6" },
                { "name": "percentage_of_male_workers", "mapping": "male_pct", "row": "6" },
                { "name": "number_of_female_workers", "mapping": "female_no", "row": "6" },
                { "name": "percentage_of_female_workers", "mapping": "female_pct", "row": "6" },
                { "name": "number_of_other_workers", "mapping": "other_no", "row": "6" },
                { "name": "percentage_of_other_workers", "mapping": "other_pct", "row": "6" }
            ]
        },
        {
            "id": "subsection_employees_matrix_b",
            "title": "IV. Employees (Contd.)",
            "type": "table",
            "label": "21. B. Differently abled Employees and workers:",
            "headerRows": [
                [
                    { "label": "Sr. No.", "rowSpan": 2 },
                    { "label": "Particulars", "rowSpan": 2 },
                    { "label": "Total (A)", "rowSpan": 2 },
                    { "label": "Male", "colSpan": 2 },
                    { "label": "Female", "colSpan": 2 },
                    { "label": "Other", "colSpan": 2 }
                ],
                [
                    { "label": "No. (B)" }, { "label": "% (B/A)" },
                    { "label": "No. (C)" }, { "label": "% (C/A)" },
                    { "label": "No. (H)" }, { "label": "% (H/A)" }
                ]
            ],
            "columns": [
                { "id": "sno", "label": "Sr. No." },
                { "id": "particulars", "label": "Particulars" },
                { "id": "total", "label": "Total (A)" },
                { "id": "male_no", "label": "No. (B)" },
                { "id": "male_pct", "label": "% (B/A)" },
                { "id": "female_no", "label": "No. (C)" },
                { "id": "female_pct", "label": "% (C/A)" },
                { "id": "other_no", "label": "No. (H)" },
                { "id": "other_pct", "label": "% (H/A)" }
            ],
            "rows": [
                { "id": "h3", "label": "DIFFERENTLY ABLED EMPLOYEES", "isHeader": true },
                { "id": "1b", "label": "Permanent (D)" },
                { "id": "2b", "label": "Other than permanent (E)" },
                { "id": "3b", "label": "Total differently abled employees (D + E)" },
                { "id": "h4", "label": "DIFFERENTLY ABLED WORKERS", "isHeader": true },
                { "id": "4b", "label": "Permanent (F)" },
                { "id": "5b", "label": "Other than permanent (G)" },
                { "id": "6b", "label": "Total differently abled workers (F + G)" }
            ],
            "disabledCells": [
                { "rowId": "1b", "colId": "total" }, { "rowId": "1b", "colId": "male_pct" }, { "rowId": "1b", "colId": "female_pct" }, { "rowId": "1b", "colId": "other_pct" },
                { "rowId": "2b", "colId": "total" }, { "rowId": "2b", "colId": "male_pct" }, { "rowId": "2b", "colId": "female_pct" }, { "rowId": "2b", "colId": "other_pct" },
                { "rowId": "3b", "colId": "total" }, { "rowId": "3b", "colId": "male_no" }, { "rowId": "3b", "colId": "male_pct" }, { "rowId": "3b", "colId": "female_no" }, { "rowId": "3b", "colId": "female_pct" }, { "rowId": "3b", "colId": "other_no" }, { "rowId": "3b", "colId": "other_pct" },
                { "rowId": "4b", "colId": "total" }, { "rowId": "4b", "colId": "male_pct" }, { "rowId": "4b", "colId": "female_pct" }, { "rowId": "4b", "colId": "other_pct" },
                { "rowId": "5b", "colId": "total" }, { "rowId": "5b", "colId": "male_pct" }, { "rowId": "5b", "colId": "female_pct" }, { "rowId": "5b", "colId": "other_pct" },
                { "rowId": "6b", "colId": "total" }, { "rowId": "6b", "colId": "male_no" }, { "rowId": "6b", "colId": "male_pct" }, { "rowId": "6b", "colId": "female_no" }, { "rowId": "6b", "colId": "female_pct" }, { "rowId": "6b", "colId": "other_no" }, { "rowId": "6b", "colId": "other_pct" }
            ],
            "fields": [
                /* Permanent Differently Abled Employees */
                { "name": "total_number_of_differently_abled_permanent_employees", "mapping": "total", "row": "1b" },
                { "name": "number_of_male_differently_abled_permanent_employees", "mapping": "male_no", "row": "1b" },
                { "name": "percentage_of_male_differently_abled_permanent_employees", "mapping": "male_pct", "row": "1b" },
                { "name": "number_of_female_differently_abled_permanent_employees", "mapping": "female_no", "row": "1b" },
                { "name": "percentage_of_female_differently_abled_permanent_employees", "mapping": "female_pct", "row": "1b" },
                { "name": "number_of_other_differently_abled_permanent_employees", "mapping": "other_no", "row": "1b" },
                { "name": "percentage_of_other_differently_abled_permanent_employees", "mapping": "other_pct", "row": "1b" },

                /* Other than Permanent Differently Abled Employees */
                { "name": "total_number_of_differently_abled_other_than_permanent_employees", "mapping": "total", "row": "2b" },
                { "name": "number_of_male_differently_abled_other_than_permanent_employees", "mapping": "male_no", "row": "2b" },
                { "name": "percentage_of_male_differently_abled_other_than_permanent_employees", "mapping": "male_pct", "row": "2b" },
                { "name": "number_of_female_differently_abled_other_than_permanent_employees", "mapping": "female_no", "row": "2b" },
                { "name": "percentage_of_female_differently_abled_other_than_permanent_employees", "mapping": "female_pct", "row": "2b" },
                { "name": "number_of_other_differently_abled_other_than_permanent_employees", "mapping": "other_no", "row": "2b" },
                { "name": "percentage_of_other_differently_abled_other_than_permanent_employees", "mapping": "other_pct", "row": "2b" },

                /* Total Differently Abled Employees */
                { "name": "total_number_of_differently_abled_employees", "mapping": "total", "row": "3b" },
                { "name": "number_of_male_differently_abled_employees", "mapping": "male_no", "row": "3b" },
                { "name": "percentage_of_male_differently_abled_employees", "mapping": "male_pct", "row": "3b" },
                { "name": "number_of_female_differently_abled_employees", "mapping": "female_no", "row": "3b" },
                { "name": "percentage_of_female_differently_abled_employees", "mapping": "female_pct", "row": "3b" },
                { "name": "number_of_other_differently_abled_employees", "mapping": "other_no", "row": "3b" },
                { "name": "percentage_of_other_differently_abled_employees", "mapping": "other_pct", "row": "3b" },

                /* Permanent Differently Abled Workers */
                { "name": "total_number_of_differently_abled_permanent_workers", "mapping": "total", "row": "4b" },
                { "name": "number_of_male_differently_abled_permanent_workers", "mapping": "male_no", "row": "4b" },
                { "name": "percentage_of_male_differently_abled_permanent_workers", "mapping": "male_pct", "row": "4b" },
                { "name": "number_of_female_differently_abled_permanent_workers", "mapping": "female_no", "row": "4b" },
                { "name": "percentage_of_female_differently_abled_permanent_workers", "mapping": "female_pct", "row": "4b" },
                { "name": "number_of_other_differently_abled_permanent_workers", "mapping": "other_no", "row": "4b" },
                { "name": "percentage_of_other_differently_abled_permanent_workers", "mapping": "other_pct", "row": "4b" },

                /* Other than Permanent Differently Abled Workers */
                { "name": "total_number_of_differently_abled_other_than_permanent_workers", "mapping": "total", "row": "5b" },
                { "name": "number_of_male_differently_abled_other_than_permanent_workers", "mapping": "male_no", "row": "5b" },
                { "name": "percentage_of_male_differently_abled_other_than_permanent_workers", "mapping": "male_pct", "row": "5b" },
                { "name": "number_of_female_differently_abled_other_than_permanent_workers", "mapping": "female_no", "row": "5b" },
                { "name": "percentage_of_female_differently_abled_other_than_permanent_workers", "mapping": "female_pct", "row": "5b" },
                { "name": "number_of_other_differently_abled_other_than_permanent_workers", "mapping": "other_no", "row": "5b" },
                { "name": "percentage_of_other_differently_abled_other_than_permanent_workers", "mapping": "other_pct", "row": "5b" },

                /* Total Differently Abled Workers */
                { "name": "total_number_of_differently_abled_workers", "mapping": "total", "row": "6b" },
                { "name": "number_of_male_differently_abled_workers", "mapping": "male_no", "row": "6b" },
                { "name": "percentage_of_male_differently_abled_workers", "mapping": "male_pct", "row": "6b" },
                { "name": "number_of_female_differently_abled_workers", "mapping": "female_no", "row": "6b" },
                { "name": "percentage_of_female_differently_abled_workers", "mapping": "female_pct", "row": "6b" },
                { "name": "number_of_other_differently_abled_workers", "mapping": "other_no", "row": "6b" },
                { "name": "percentage_of_other_differently_abled_workers", "mapping": "other_pct", "row": "6b" }
            ]
        },
        {
            "id": "subsection_women_participation",
            "title": "IV. Employees (Contd.)",
            "type": "table",
            "label": "22. Participation/Inclusion/Representation of women",
            "headerRows": [
                [
                    { "label": "Particulars", "rowSpan": 2 },
                    { "label": "Total (A)", "rowSpan": 2 },
                    { "label": "No. and percentage of females", "colSpan": 2 }
                ],
                [
                    { "label": "No. (B)" },
                    { "label": "% (B/A)" }
                ]
            ],
            "columns": [
                { "id": "particulars", "label": "Particulars" },
                { "id": "total", "label": "Total (A)", "uiType": "number" },
                { "id": "female_no", "label": "No. (B)", "uiType": "number" },
                { "id": "female_pct", "label": "% (B/A)", "uiType": "number" }
            ],
            "rows": [
                { "id": "bod", "label": "Board of Directors" },
                { "id": "kmp", "label": "Key Management Personnel (other than Executive Director)" }
            ],
            "disabledCells": [
                { "rowId": "bod", "colId": "female_pct" },
                { "rowId": "kmp", "colId": "female_pct" }
            ],
            "fields": [
                { "name": "total_number_of_women_board_of_directors", "mapping": "total", "row": "bod" },
                { "name": "number_of_female_board_of_directors", "mapping": "female_no", "row": "bod" },
                { "name": "percentage_of_female_board_of_directors", "mapping": "female_pct", "row": "bod" },
                { "name": "total_number_of_women_key_management_personnel", "mapping": "total", "row": "kmp" },
                { "name": "number_of_female_key_management_personnel", "mapping": "female_no", "row": "kmp" },
                { "name": "percentage_of_female_key_management_personnel", "mapping": "female_pct", "row": "kmp" }
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
                    { "label": "Particulars", "rowSpan": 2 },
                    { "label": "Turnover rate in current FY", "colSpan": 4 },
                    { "label": "Turnover rate in previous FY", "colSpan": 4 },
                    { "label": "Turnover rate in the year prior to the previous FY", "colSpan": 4 }
                ],
                [
                    { "label": "Male" }, { "label": "Female" }, { "label": "Other" }, { "label": "Total" },
                    { "label": "Male" }, { "label": "Female" }, { "label": "Other" }, { "label": "Total" },
                    { "label": "Male" }, { "label": "Female" }, { "label": "Other" }, { "label": "Total" }
                ]
            ],
            "columns": [
                { "id": "particulars", "label": "Particulars" },
                { "id": "male_fy1", "label": "Male" }, { "id": "female_fy1", "label": "Female" }, { "id": "other_fy1", "label": "Other" }, { "id": "total_fy1", "label": "Total" },
                { "id": "male_fy2", "label": "Male" }, { "id": "female_fy2", "label": "Female" }, { "id": "other_fy2", "label": "Other" }, { "id": "total_fy2", "label": "Total" },
                { "id": "male_fy3", "label": "Male" }, { "id": "female_fy3", "label": "Female" }, { "id": "other_fy3", "label": "Other" }, { "id": "total_fy3", "label": "Total" }
            ],
            "rows": [
                { "id": "emp", "label": "Permanent Employees" },
                { "id": "wrk", "label": "Permanent Workers" }
            ],
            "disabledCells": [
                { "rowId": "emp", "colId": "total_fy1" }, { "rowId": "emp", "colId": "total_fy2" }, { "rowId": "emp", "colId": "total_fy3" },
                { "rowId": "wrk", "colId": "total_fy1" }, { "rowId": "wrk", "colId": "total_fy2" }, { "rowId": "wrk", "colId": "total_fy3" }
            ],
            "fields": [
                { "name": "q23_emp_male_fy1", "mapping": "male_fy1", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_female_fy1", "mapping": "female_fy1", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_other_fy1", "mapping": "other_fy1", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_total_fy1", "mapping": "total_fy1", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_male_fy2", "mapping": "male_fy2", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_female_fy2", "mapping": "female_fy2", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_other_fy2", "mapping": "other_fy2", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_total_fy2", "mapping": "total_fy2", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_male_fy3", "mapping": "male_fy3", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_female_fy3", "mapping": "female_fy3", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_other_fy3", "mapping": "other_fy3", "row": "emp", "uiType": "number" },
                { "name": "q23_emp_total_fy3", "mapping": "total_fy3", "row": "emp", "uiType": "number" },
                { "name": "q23_wrk_male_fy1", "mapping": "male_fy1", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_female_fy1", "mapping": "female_fy1", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_other_fy1", "mapping": "other_fy1", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_total_fy1", "mapping": "total_fy1", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_male_fy2", "mapping": "male_fy2", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_female_fy2", "mapping": "female_fy2", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_other_fy2", "mapping": "other_fy2", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_total_fy2", "mapping": "total_fy2", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_male_fy3", "mapping": "male_fy3", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_female_fy3", "mapping": "female_fy3", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_other_fy3", "mapping": "other_fy3", "row": "wrk", "uiType": "number" },
                { "name": "q23_wrk_total_fy3", "mapping": "total_fy3", "row": "wrk", "uiType": "number" }
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
                { "id": "sno", "label": "Sr. No." },
                { "id": "name", "label": "Name of the company (A)" },
                { "id": "type", "label": "Type (Holding/Subsidiary/Associate/JV)" },
                { "id": "shares", "label": "% of shares held", "uiType": "number" },
                { "id": "participation", "label": "Participates in BR initiatives? (Yes/No)" }
            ],
            "defaultRow": { "name": "", "type": "", "shares": "", "participation": "No" },
            "columnOptions": {
                "type": ["Holding", "Subsidiary", "Associate", "Joint Venture"],
                "participation": ["Yes", "No"]
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
                { "name": "whether_csr_is_applicable_as_per_section_135", "label": "25. (i) Whether CSR is applicable as per section 135 (Yes/No)", "uiType": "select", "options": ["Yes", "No"] },
                { "name": "turnover_for_csr", "label": "(ii) Turnover (in Rs.)", "uiType": "number" },
                { "name": "net_worth_for_csr", "label": "(iii) Net worth (in Rs.)", "uiType": "number" }
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
                    { "label": "Stakeholder group from whom complaint is received", "rowSpan": 2 },
                    { "label": "Grievance Redressal Mechanism in Place (Yes/No/NA)", "rowSpan": 2 },
                    { "label": "Web-link for grievance redress policy (If Yes)", "rowSpan": 2 },
                    { "label": "Current FY", "colSpan": 3 },
                    { "label": "Previous FY", "colSpan": 3 },
                    { "label": "Reason (If NA)", "rowSpan": 2 }
                ],
                [
                    { "label": "Number of complaints filed during the year" },
                    { "label": "Number of complaints pending at close of year" },
                    { "label": "Remarks" },
                    { "label": "Number of complaints filed during the year" },
                    { "label": "Number of complaints pending at close of year" },
                    { "label": "Remarks" }
                ]
            ],
            "columns": [
                { "id": "particulars", "label": "Stakeholder group", "uiType": "text" },
                { "id": "mechanism", "label": "Mechanism (Yes/No/NA)", "uiType": "select", "options": ["Yes", "No", "NA"] },
                { "id": "web_link", "label": "Web-link", "uiType": "text", "dependsOn": { "id": "mechanism", "value": "Yes" } },
                { "id": "fy_filed", "label": "FY Filed", "uiType": "number", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "fy_pending", "label": "FY Pending", "uiType": "number", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "fy_remarks", "label": "FY Remarks", "uiType": "text", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "py_filed", "label": "PY Filed", "uiType": "number", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "py_pending", "label": "PY Pending", "uiType": "number", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "py_remarks", "label": "PY Remarks", "uiType": "text", "dependsOn": { "id": "mechanism", "value": ["Yes", "No"] } },
                { "id": "na_reason", "label": "Reason if NA", "uiType": "text", "dependsOn": { "id": "mechanism", "value": "NA" } }
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
                { "particulars": "Communities", "mechanism": "None", "readOnlyParticulars": true },
                { "particulars": "Investors (other than shareholders)", "mechanism": "None", "readOnlyParticulars": true },
                { "particulars": "Shareholders", "mechanism": "None", "readOnlyParticulars": true },
                { "particulars": "Employees and workers", "mechanism": "None", "readOnlyParticulars": true },
                { "particulars": "Customers", "mechanism": "None", "readOnlyParticulars": true },
                { "particulars": "Value Chain Partners", "mechanism": "None", "readOnlyParticulars": true }
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
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "issue", "label": "Material issue identified" },
                        { "id": "type", "label": "Indicate whether risk or opportunity (R/O)", "uiType": "select", "options": ["R", "O", "R&O"] },
                        { "id": "rationale", "label": "Rationale for identifying the risk / opportunity" },
                        { "id": "approach", "label": "In case of risk, approach to adapt or mitigate" },
                        { "id": "financial", "label": "Financial implications of the risk or opportunity (Indicate positive or negative implications)", "uiType": "select", "options": ["Positive Implications", "Negative Implications"] }
                    ],
                    "defaultRow": { "issue": "", "type": "", "rationale": "", "approach": "", "financial": "" }
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
    ],
    "Section B: Management and Process Disclosures": [
        {
            "id": "b1_policy_matrix",
            "title": "Policy and management processes",
            "type": "matrix",
            "columns": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
            "rows": [
                { "name": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "label": "1. a. Whether your entity's policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No/NA)", "inputType": "select", "options": ["Yes", "No", "NA"] },
                { "name": "q1a_na_details", "label": "If NA, provide details", "inputType": "textarea", "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "NA" } },
                { "name": "has_the_policy_been_approved_by_the_board", "label": "b. Has the policy been approved by the Board? (Yes/No/NA)", "inputType": "select", "options": ["Yes", "No", "NA"] },
                { "name": "q1b_na_details", "label": "If b is NA, provide details", "inputType": "textarea", "matrixDependsOn": { "row": "has_the_policy_been_approved_by_the_board", "value": "NA" } },
                { "name": "web_link_of_the_policies_explanatory_text_block", "label": "c. Web Link of the Policies, if available", "inputType": "textarea", "matrixDependsOn": { "row": "has_the_policy_been_approved_by_the_board", "value": "Yes" } },
                { "name": "whether_the_entity_has_translated_the_policy_into_procedures", "label": "2. Whether the entity has translated the policy into procedures. (Yes / No/ NA)", "inputType": "select", "options": ["Yes", "No", "NA"] },
                { "name": "q2_na_details", "label": "If 2 is NA, provide details", "inputType": "textarea", "matrixDependsOn": { "row": "whether_the_entity_has_translated_the_policy_into_procedures", "value": "NA" } },
                { "name": "do_the_enlisted_policies_extend_to_your_value_chain_partners", "label": "3. Do the enlisted policies extend to your value chain partners? (Yes/No/NA)", "inputType": "select", "options": ["Yes", "No", "NA"] },
                { "name": "q3_na_details", "label": "If 3 is NA, provide details", "inputType": "textarea", "matrixDependsOn": { "row": "do_the_enlisted_policies_extend_to_your_value_chain_partners", "value": "NA" } },
                { "name": "name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle_explanatory_text_block", "label": "4. Name of the national and international codes/certifications/labels/ standards adopted by your entity and mapped to each principle.", "inputType": "textarea" },
                { "name": "specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines_explanatory_text_block", "label": "5. Specific commitments, goals and targets set by the entity with defined timelines, if any.", "inputType": "textarea" },
                { "name": "performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met_explanatory_text_block", "label": "6. Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.", "inputType": "textarea" }
            ]
        },
        {
            "id": "b2_governance_oversight",
            "title": "Governance, leadership and oversight",
            "type": "grid",
            "columns": 1,
            "fields": [
                { "name": "statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements_explanatory_text_block", "label": "7. Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements", "uiType": "textarea" },
                { "name": "details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy_explanatory_text_block", "label": "8. Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).", "uiType": "textarea" },
                { "name": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues", "label": "9. Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No/ NA)", "uiType": "select", "options": ["Yes", "No", "NA"] },
                { "name": "if_yes_provide_details_explanatory_text_block", "label": "If yes, provide details.", "uiType": "textarea", "dependsOn": { "field": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues", "value": "Yes" } },
                { "name": "the_entity_has_not_applicable_a_specified_committee_for_decision_making_on_sustainability_related_issues_explanatory_text_block", "label": "If No/NA, provide reasons.", "uiType": "textarea", "dependsOn": { "field": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues", "value": ["No", "NA"] } }
            ]
        },
        {
            "id": "b3_review_matrix",
            "title": "10. Details of Review of NGRBCs by the Company",
            "type": "matrix",
            "columns": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
            "rows": [
                { "id": "h_reviewer", "label": "Indicate whether review was undertaken by Director/Committee of the Board/Any other Committee", "isHeader": true },
                { "name": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by", "label": "Performance against above policies and follow up action", "inputType": "select", "options": ["Director", "Committee of the Board", "Any other Committee"] },
                { "name": "description_of_other_committee_for_performance_against_above_policies_and_follow_up_action", "label": "Description of other committee for performance against above policies and follow up action", "inputType": "textarea", "matrixDependsOn": { "row": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by", "value": "Any other Committee" } },
                { "name": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by", "label": "Compliance with statutory requirements of relevance to the principles and rectification of any non-compliances", "inputType": "select", "options": ["Director", "Committee of the Board", "Any other Committee"] },
                { "name": "description_of_other_committee_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification", "label": "Description of other committee for compliance with statutory requirements", "inputType": "textarea", "matrixDependsOn": { "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by", "value": "Any other Committee" } },

                { "id": "h_freq", "label": "Frequency (Annually / Half yearly/ Quarterly/ Any other- please specify)", "isHeader": true },
                { "name": "performance_against_above_policies_and_follow_up_action_frequency", "label": "Frequency of performance review", "inputType": "select", "options": ["Annually", "Half yearly", "Quarterly", "Any other"], "matrixDependsOn": { "row": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by", "operator": "not", "value": "" } },
                { "name": "description_of_other_frequency_for_performance_against_above_policies_and_follow_up_action_frequency", "label": "Specify other frequency (Performance)", "inputType": "textarea", "matrixDependsOn": { "row": "performance_against_above_policies_and_follow_up_action_frequency", "value": "Any other" } },
                { "name": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency", "label": "Frequency of statutory compliance review", "inputType": "select", "options": ["Annually", "Half yearly", "Quarterly", "Any other"], "matrixDependsOn": { "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by", "operator": "not", "value": "" } },
                { "name": "description_of_other_frequency_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances", "label": "Specify other frequency (Statutory)", "inputType": "textarea", "matrixDependsOn": { "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency", "value": "Any other" } }
            ]
        },
        {
            "id": "b4_assessment_matrix",
            "title": "11. Independent Assessment/Evaluation",
            "type": "matrix",
            "columns": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
            "rows": [
                { "name": "has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency", "label": "Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No)", "inputType": "select", "options": ["Yes", "No"] },
                { "name": "provide_name_of_the_agency_explanatory_text_block", "label": "If Yes, Provide name of the agency", "inputType": "textarea", "matrixDependsOn": { "row": "has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency", "value": "Yes" } }
            ]
        },
        {
            "id": "b5_reasons_matrix",
            "title": "12. If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated:",
            "type": "matrix",
            "columns": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
            "dynamic": true,
            "storageField": "q12_dynamic_reasons_json",
            "defaultDynamicRow": {
                "label": "Any other reason (.......specifying here)",
                "inputType": "select",
                "options": ["Yes", "No", "NA", "-"],
                "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "No" }
            },
            "rows": [
                { "name": "the_entity_does_not_consider_the_principles_material_to_its_business", "label": "The entity does not consider the Principles material to its business (Yes/No)", "inputType": "select", "options": ["Yes", "No"], "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "No" } },
                { "name": "the_entity_is_not_at_a_stage_where_it_is_in_a_position_to_formulate_and_implement_the_policies_on_specified_principles", "label": "The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles (Yes/No)", "inputType": "select", "options": ["Yes", "No"], "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "No" } },
                { "name": "the_entity_does_not_have_the_financial_or_human_and_technical_resources_available_for_the_task", "label": "The entity does not have the financial or human and technical resources available for the task (Yes/No)", "inputType": "select", "options": ["Yes", "No"], "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "No" } },
                { "name": "it_is_planned_to_be_done_in_the_next_financial_year", "label": "It is planned to be done in the next financial year (Yes/No)", "inputType": "select", "options": ["Yes", "No"], "matrixDependsOn": { "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs", "value": "No" } }
            ]
        },
        {
            "id": "b6_notes",
            "title": "Notes on Management and Process Disclosures",
            "type": "grid",
            "columns": 1,
            "fields": [
                { "name": "notes_management_and_process_disclosures_explanatory_text_block", "label": "Notes / Further Information regarding Management and Process Disclosures", "uiType": "textarea" }
            ]
        }
    ],
    "Section C: Principle 1 Essential Indicators": [
        {
            "id": "p1_e1_training_awareness",
            "title": "1. Percentage coverage by training and awareness programmes on any of the Principles during the financial year:",
            "type": "table",
            "storageField": "assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker",
            "dynamic": true,
            "disableAddDelete": true,
            "columns": [
                { "id": "segment", "label": "Segment" },
                { "id": "total_number", "label": "Total number of training and awareness programmes held", "uiType": "number" },
                { "id": "topics_covered", "label": "Topics/principles covered under the training and its impact" },
                { "id": "percentage_covered", "label": "%age of persons in respective category covered by the awareness programmes", "uiType": "number" }
            ],
            "defaultRows": [
                { "segment": "Board of Directors", "total_number": "", "topics_covered": "", "percentage_covered": "" },
                { "segment": "Key Managerial Personnel", "total_number": "", "topics_covered": "", "percentage_covered": "" },
                { "segment": "Employees other than BoD and KMPs", "total_number": "", "topics_covered": "", "percentage_covered": "" },
                { "segment": "Workers", "total_number": "", "topics_covered": "", "percentage_covered": "" }
            ]
        },
        {
            "id": "p1_e2_fines_penalties",
            "title": "2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):",
            "type": "table",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "case_details", "label": "" }
            ],
            "rows": [
                { "id": "monetary_header", "label": "Monetary", "isHeader": true },
                { "id": "penalty", "label": "Penalty/ Fine" },
                { "id": "settlement", "label": "Settlement" },
                { "id": "compounding", "label": "Compounding fee" },
                { "id": "non_monetary_header", "label": "Non- Monetary", "isHeader": true },
                { "id": "imprisonment", "label": "Imprisonment" },
                { "id": "punishment", "label": "Punishment" }
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
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "ngrbc_principle", "label": "NGRBC Principle" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" },
                        { "id": "amount_in_inr", "label": "Amount (In INR)", "uiType": "number" },
                        { "id": "brief_of_case", "label": "Brief of the Case" },
                        { "id": "has_appeal_been_preferred", "label": "Has an appeal been preferred? (Yes/No)", "uiType": "select", "options": ["Yes", "No"] }
                    ],
                    "defaultRow": { "ngrbc_principle": "", "regulatory_agency_name": "", "amount_in_inr": "", "brief_of_case": "", "has_appeal_been_preferred": "No" }
                },
                {
                    "name": "brief_of_the_monetary_case_for_settlement_explanatory_text_block",
                    "mapping": "case_details",
                    "row": "settlement",
                    "uiType": "popup",
                    "label": "Add Details",
                    "subType": "table",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "ngrbc_principle", "label": "NGRBC Principle" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" },
                        { "id": "amount_in_inr", "label": "Amount (In INR)", "uiType": "number" },
                        { "id": "brief_of_case", "label": "Brief of the Case" },
                        { "id": "has_appeal_been_preferred", "label": "Has an appeal been preferred? (Yes/No)", "uiType": "select", "options": ["Yes", "No"] }
                    ],
                    "defaultRow": { "ngrbc_principle": "", "regulatory_agency_name": "", "amount_in_inr": "", "brief_of_case": "", "has_appeal_been_preferred": "No" }
                },
                {
                    "name": "brief_of_the_monetary_case_for_compounding_fee_explanatory_text_block",
                    "mapping": "case_details",
                    "row": "compounding",
                    "uiType": "popup",
                    "label": "Add Details",
                    "subType": "table",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "ngrbc_principle", "label": "NGRBC Principle" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" },
                        { "id": "amount_in_inr", "label": "Amount (In INR)", "uiType": "number" },
                        { "id": "brief_of_case", "label": "Brief of the Case" },
                        { "id": "has_appeal_been_preferred", "label": "Has an appeal been preferred?", "uiType": "select", "options": ["Yes", "No"] }
                    ],
                    "defaultRow": { "ngrbc_principle": "", "regulatory_agency_name": "", "amount_in_inr": "", "brief_of_case": "", "has_appeal_been_preferred": "No" }
                },
                {
                    "name": "brief_of_the_monetary_case_for_imprisonment_explanatory_text_block",
                    "mapping": "case_details",
                    "row": "imprisonment",
                    "uiType": "popup",
                    "label": "Add Details",
                    "subType": "table",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "ngrbc_principle", "label": "NGRBC Principle" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" },
                        { "id": "brief_of_case", "label": "Brief of the Case" },
                        { "id": "has_appeal_been_preferred", "label": "Has an appeal been preferred? (Yes/No)", "uiType": "select", "options": ["Yes", "No"] }
                    ],
                    "defaultRow": { "ngrbc_principle": "", "regulatory_agency_name": "", "brief_of_case": "", "has_appeal_been_preferred": "No" }
                },
                {
                    "name": "brief_of_the_monetary_case_for_punishment_explanatory_text_block",
                    "mapping": "case_details",
                    "row": "punishment",
                    "uiType": "popup",
                    "label": "Add Details",
                    "subType": "table",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "ngrbc_principle", "label": "NGRBC Principle" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" },
                        { "id": "brief_of_case", "label": "Brief of the Case" },
                        { "id": "has_appeal_been_preferred", "label": "Has an appeal been preferred? (Yes/No)", "uiType": "select", "options": ["Yes", "No"] }
                    ],
                    "defaultRow": { "ngrbc_principle": "", "regulatory_agency_name": "", "brief_of_case": "", "has_appeal_been_preferred": "No" }
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
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "case_details", "label": "Case Details" },
                        { "id": "regulatory_agency_name", "label": "Name of the regulatory/ enforcement agencies/ judicial institutions" }
                    ],
                    "defaultRow": { "case_details": "", "regulatory_agency_name": "" }
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
                    "options": ["Yes", "No", "NA"]
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
                        "value": ["No", "NA"]
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
                { "name": "number_of_directors_against_whom_disciplinary_action_was_taken", "label": "Directors (FY)", "uiType": "number" },
                { "name": "number_of_km_ps_against_whom_disciplinary_action_was_taken", "label": "KMPs (FY)", "uiType": "number" },
                { "name": "number_of_employees_against_whom_disciplinary_action_was_taken", "label": "Employees (FY)", "uiType": "number" },
                { "name": "number_of_workers_against_whom_disciplinary_action_was_taken", "label": "Workers (FY)", "uiType": "number" }
            ]
        },
        {
            "id": "p1_e6_conflict_interest",
            "title": "6. Details of complaints with regard to conflict of interest:",
            "type": "grid",
            "columns": 2,
            "fields": [
                { "name": "number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors", "label": "Directors - Number (FY)", "uiType": "number" },
                { "name": "remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors", "label": "Directors - Remarks (FY)", "uiType": "text" },
                { "name": "number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_km_ps", "label": "KMPs - Number (FY)", "uiType": "number" },
                { "name": "remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_kmps", "label": "KMPs - Remarks (FY)", "uiType": "text" }
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
                { "name": "amount_of_accounts_payable_during_the_year", "label": "(i) Accounts Payable during the year (INR)", "uiType": "number" },
                { "name": "cost_of_goods_or_services_procured_during_the_year", "label": "(ii) Cost of goods/services procured during the year (INR)", "uiType": "number" },
                { "name": "number_of_days_of_accounts_payable", "label": "(iii) Number of days of accounts payable", "uiType": "number" }
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
                { "id": "category", "label": "Parameter" },
                { "id": "metric", "label": "Metrics" },
                { "id": "fy", "label": "FY (Current Financial Year)", "uiType": "number" },
                { "id": "py", "label": "PY (Previous Financial Year)", "uiType": "number" }
            ],
            "defaultRows": [
                // Concentration of Purchases
                { "id": "cp_a_i", "category": "Concentration of Purchases", "metric": "a. i) Purchases from trading houses", "fy": "", "py": "" },
                { "id": "cp_a_ii", "category": "Concentration of Purchases", "metric": "ii) Total purchases", "fy": "", "py": "" },
                { "id": "cp_a_iii", "category": "Concentration of Purchases", "metric": "iii) % of total purchases", "fy": "", "py": "", "readOnly": true },
                { "id": "cp_b", "category": "Concentration of Purchases", "metric": "b. Number of trading houses where purchases are made", "fy": "", "py": "" },
                { "id": "cp_c_i", "category": "Concentration of Purchases", "metric": "c. i) Purchases from top 10 trading houses", "fy": "", "py": "" },
                { "id": "cp_c_ii", "category": "Concentration of Purchases", "metric": "ii) Total purchases from trading houses", "fy": "", "py": "" },
                { "id": "cp_c_iii", "category": "Concentration of Purchases", "metric": "iii) % of total purchases from trading houses", "fy": "", "py": "", "readOnly": true },

                // Concentration of Sales
                { "id": "cs_a_i", "category": "Concentration of Sales", "metric": "a. i) Sales to dealer / distributors", "fy": "", "py": "" },
                { "id": "cs_a_ii", "category": "Concentration of Sales", "metric": "ii) Total Sales", "fy": "", "py": "" },
                { "id": "cs_a_iii", "category": "Concentration of Sales", "metric": "iii) % of total sales", "fy": "", "py": "", "readOnly": true },
                { "id": "cs_b", "category": "Concentration of Sales", "metric": "b. Number of dealers / distributors to whom sales are made", "fy": "", "py": "" },
                { "id": "cs_c_i", "category": "Concentration of Sales", "metric": "c. i) Sales to top 10 dealers", "fy": "", "py": "" },
                { "id": "cs_c_ii", "category": "Concentration of Sales", "metric": "ii) Total Sales to dealer / distributors", "fy": "", "py": "" },
                { "id": "cs_c_iii", "category": "Concentration of Sales", "metric": "iii) % of total sales to dealer / distributors", "fy": "", "py": "", "readOnly": true },

                // Share of RPTs
                // Purchases
                { "id": "rpt_a_i", "category": "Share of RPTs in", "metric": "a. i) Purchases (with related parties)", "fy": "", "py": "" },
                { "id": "rpt_a_ii", "category": "Share of RPTs in", "metric": "ii) Total Purchases", "fy": "", "py": "" },
                { "id": "rpt_a_iii", "category": "Share of RPTs in", "metric": "iii) % of Total Purchases", "fy": "", "py": "", "readOnly": true },
                // Sales
                { "id": "rpt_b_i", "category": "Share of RPTs in", "metric": "b. i) Sales (to related parties)", "fy": "", "py": "" },
                { "id": "rpt_b_ii", "category": "Share of RPTs in", "metric": "ii) Total Sales", "fy": "", "py": "" },
                { "id": "rpt_b_iii", "category": "Share of RPTs in", "metric": "iii) % of Total Sales", "fy": "", "py": "", "readOnly": true },
                // Loans
                { "id": "rpt_c_i", "category": "Share of RPTs in", "metric": "c. i) Loans & advances given to related parties", "fy": "", "py": "" },
                { "id": "rpt_c_ii", "category": "Share of RPTs in", "metric": "ii) Total loans & advances", "fy": "", "py": "" },
                { "id": "rpt_c_iii", "category": "Share of RPTs in", "metric": "iii) % of Total loans & advances", "fy": "", "py": "", "readOnly": true },
                // Investments
                { "id": "rpt_d_i", "category": "Share of RPTs in", "metric": "d. i) Investments in related parties", "fy": "", "py": "" },
                { "id": "rpt_d_ii", "category": "Share of RPTs in", "metric": "ii) Total Investments made", "fy": "", "py": "" },
                { "id": "rpt_d_iii", "category": "Share of RPTs in", "metric": "iii) % of Total Investments made", "fy": "", "py": "", "readOnly": true }
            ]
        }
    ],
    "Section C: Principle 1 Leadership Indicators": [
        {
            "id": "awareness_value_chain_section",
            "title": "1. Awareness programmes conducted for value chain partners on any of the Principles during the financial year:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Awareness Details",
                    "name": "assurance_sub_type_for_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year",
                    "uiType": "popup",
                    "subType": "table",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "total_held", "label": "Total Number of Awareness Programmes Held", "uiType": "number" },
                        { "id": "topics", "label": "Topics / principles covered under the training" },
                        { "id": "percentage", "label": "Percentage of value chain partners covered", "uiType": "number" }
                    ],
                    "defaultRow": { "total_held": "", "topics": "", "percentage": "" }
                }
            ]
        },
        {
            "id": "board_conflict_interest_grid",
            "title": "2. Conflict of Interests involving members of the Board:",
            "type": "grid",
            "columns": 2,
            "fields": [
                {
                    "label": "Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board?",
                    "name": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If NA, provide details",
                    "name": "details_of_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board_na",
                    "uiType": "popup",
                    "dependsOn": {
                        "field": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
                        "value": "NA"
                    }
                },
                {
                    "label": "If Yes, provide details of the same.",
                    "name": "details_of_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
                    "uiType": "textarea",
                    "dependsOn": {
                        "field": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
                        "value": "Yes"
                    }
                }
            ]
        },
        {
            "id": "p1_leadership_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_principle1_explanatory_text_block",
                    "uiType": "popup"
                }
            ]
        }
    ],
    "Section C: Principle 2 Essential Indicators": [
        {
            "id": "p2_e1_rnd_capex",
            "title": "1. Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex respectively:",
            "type": "table",
            "dynamic": true,
            "disableAddDelete": true,
            "storageField": "percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies",
            "columns": [
                { "id": "segment", "label": "Segment" },
                { "id": "cy_pct", "label": "Current Financial Year (%)", "uiType": "number" },
                { "id": "py_pct", "label": "Previous Financial Year (%)", "uiType": "number" },
                { "id": "details", "label": "Details of improvements" }
            ],
            "defaultRows": [
                { "segment": "R&D", "cy_pct": "", "py_pct": "", "details": "" },
                { "segment": "Capex", "cy_pct": "", "py_pct": "", "details": "" }
            ]
        },
        {
            "id": "p2_e2_sustainable_sourcing",
            "title": "2. Sustainable Sourcing",
            "type": "grid",
            "columns": 2,
            "fields": [
                {
                    "label": "a. Does the entity have procedures in place for sustainable sourcing? (Yes/No)",
                    "name": "does_the_entity_have_procedures_in_place_for_sustainable_sourcing",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "b. If yes, what percentage of inputs were sourced sustainably?",
                    "name": "percentage_of_inputs_were_sourced_sustainably",
                    "uiType": "number",
                    "dependsOn": {
                        "field": "does_the_entity_have_procedures_in_place_for_sustainable_sourcing",
                        "value": "Yes"
                    }
                }
            ]
        },
        {
            "id": "p2_e3_reclaim_processes",
            "title": "3. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "(a) Plastics (including packaging)",
                    "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "process", "label": "Details of the Process" }
                    ],
                    "defaultRow": { "process": "" }
                },
                {
                    "label": "(b) E-waste",
                    "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_e_waste_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "process", "label": "Details of the Process" }
                    ],
                    "defaultRow": { "process": "" }
                },
                {
                    "label": "(c) Hazardous waste",
                    "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_hazardous_waste_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "process", "label": "Details of the Process" }
                    ],
                    "defaultRow": { "process": "" }
                },
                {
                    "label": "(d) Other waste",
                    "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "process", "label": "Details of the Process" }
                    ],
                    "defaultRow": { "process": "" }
                }
            ]
        },
        {
            "id": "p2_e4_epr",
            "title": "4. Extended Producer Responsibility (EPR)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether Extended Producer Responsibility (EPR) is applicable to the entity's activities (Yes/No).",
                    "name": "whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards?",
                    "name": "whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards",
                    "uiType": "select",
                    "options": ["Yes", "No"],
                    "dependsOn": {
                        "field": "whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities",
                        "value": "Yes"
                    }
                },
                {
                    "label": "If not, provide steps taken to address the same.",
                    "name": "steps_taken_to_address_the_waste_collection_plan_explanatory_text_block",
                    "uiType": "textarea",
                    "dependsOn": {
                        "field": "whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards",
                        "value": "No"
                    }
                }
            ]
        }
    ],
    "Section C: Principle 2 Leadership Indicators": [
        {
            "id": "p2_l1_lca",
            "title": "1. Life Cycle Assessment (LCA)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)?",
                    "name": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If NA, provide details",
                    "name": "the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block",
                    "uiType": "popup",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
                        "value": "NA"
                    }
                },
                {
                    "label": "If yes, provide details",
                    "name": "details_of_products_or_services_for_which_life_cycle_perspective_or_assessments_was_conducted_by_the_entity",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add LCA Details",
                    "dependsOn": {
                        "field": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
                        "value": "Yes"
                    },
                    "columns": [
                        { "id": "nic_code", "label": "NIC Code", "uiType": "nic_search" },

                        { "id": "product_service", "label": "Name of Product / Service" },
                        { "id": "turnover_pct", "label": "% of total Turnover contributing to partial or complete LCA", "uiType": "number" },
                        { "id": "boundary", "label": "Boundary for which the Life Cycle Perspective / Assessment was conducted" },
                        { "id": "independent_agency", "label": "Whether conducted by independent external agency (Yes/No)", "uiType": "select", "options": ["Yes", "No"] },
                        { "id": "public_domain", "label": "Results communicated in public domain (Yes/No)", "uiType": "select", "options": ["Yes", "No"] },
                        { "id": "weblink", "label": "If yes, provide the web-link." }
                    ],
                    "defaultRow": { "nic_code": "", "product_service": "", "turnover_pct": "", "boundary": "", "independent_agency": "No", "public_domain": "No", "weblink": "" }
                }
            ]
        },
        {
            "id": "p2_l2_concerns",
            "title": "2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Significant Social/Environmental Concerns",
                    "name": "action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "product_service", "label": "Name of Product / Service" },
                        { "id": "description", "label": "Description of the risk / concern" },
                        { "id": "action_taken", "label": "Action Taken" }
                    ],
                    "defaultRow": { "product_service": "", "description": "", "action_taken": "" }
                }
            ]
        },
        {
            "id": "p2_l3_recycled_percentage",
            "title": "3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Recycled or Reused Input Material Details",
                    "name": "details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "material", "label": "Indicate input material" },
                        { "id": "fy_pct", "label": "Recycled or re-used input material to total material (%) (Current Financial Year)", "uiType": "number" },
                        { "id": "py_pct", "label": "Recycled or re-used input material to total material (%) (Previous Financial Year)", "uiType": "number" }
                    ],
                    "defaultRow": { "material": "", "fy_pct": "", "py_pct": "" }
                }
            ]
        },
        {
            "id": "p2_l4_reclaimed_products",
            "title": "4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed.",
            "type": "table",
            "dynamic": true,
            "disableAddDelete": true,
            "storageField": "assurance_sub_type_for_reclaimed_products_and_packaging",
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "reuse_fy", "label": "Re-Used (FY)", "uiType": "number" },
                { "id": "reuse_py", "label": "Re-Used (PY)", "uiType": "number" },
                { "id": "recycle_fy", "label": "Recycled (FY)", "uiType": "number" },
                { "id": "recycle_py", "label": "Recycled (PY)", "uiType": "number" },
                { "id": "disposed_fy", "label": "Safely Disposed (FY)", "uiType": "number" },
                { "id": "disposed_py", "label": "Safely Disposed (PY)", "uiType": "number" }
            ],
            "defaultRows": [
                { "category": "Plastics (including packaging)", "reuse_fy": "", "reuse_py": "", "recycle_fy": "", "recycle_py": "", "disposed_fy": "", "disposed_py": "" },
                { "category": "E waste", "reuse_fy": "", "reuse_py": "", "recycle_fy": "", "recycle_py": "", "disposed_fy": "", "disposed_py": "" },
                { "category": "Hazardous waste", "reuse_fy": "", "reuse_py": "", "recycle_fy": "", "recycle_py": "", "disposed_fy": "", "disposed_py": "" },
                { "category": "Other waste", "reuse_fy": "", "reuse_py": "", "recycle_fy": "", "recycle_py": "", "disposed_fy": "", "disposed_py": "" }
            ]
        },
        {
            "id": "p2_l4_other_details",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of Other waste",
                    "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details (Other Waste)"
                }
            ]
        },
        {
            "id": "p2_l5_reclaimed_percentage",
            "title": "5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Reclaimed Products Details",
                    "name": "details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "product_category", "label": "Indicate product category" },
                        { "id": "reclaimed_pct", "label": "Reclaimed products and their packaging materials as Percentage of total products sold in respective category", "uiType": "number" }
                    ],
                    "defaultRow": { "product_category": "", "reclaimed_pct": "" }
                }
            ]
        },
        {
            "id": "p2_leadership_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_principle2_explanatory_text_block",
                    "uiType": "popup",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 3 Essential Indicators": [
        {
            "id": "p3_e1a_employees_wellbeing",
            "title": "1. a. Details of measures for the well-being of employees:",
            "type": "table",
            "dynamic": true,
            "disableAddDelete": true,
            "storageField": "details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it",
            "popup": true,
            "label": "Details of measures for the well-being of employees",
            "rowFilter": ["h1", "perm_emp_male", "perm_emp_female", "perm_emp_other", "perm_emp_total", "h2", "other_emp_male", "other_emp_female", "other_emp_other", "other_emp_total"],
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_a", "label": "Total (A)" },
                { "id": "health_no_b", "label": "Health Insurance - Number (B)" },
                { "id": "health_pct_b", "label": "Health Insurance - % (B/A)" },
                { "id": "accident_no_c", "label": "Accident Insurance - Number (C)" },
                { "id": "accident_pct_c", "label": "Accident Insurance - % (C/A)" },
                { "id": "maternity_no_d", "label": "Maternity Benefits - Number (D)" },
                { "id": "maternity_pct_d", "label": "Maternity Benefits - % (D/A)" },
                { "id": "paternity_no_e", "label": "Paternity Benefits - Number (E)" },
                { "id": "paternity_pct_e", "label": "Paternity Benefits - % (E/A)" },
                { "id": "daycare_no_f", "label": "Day Care - Number (F)" },
                { "id": "daycare_pct_f", "label": "Day Care - % (F/A)" }
            ],
            "defaultRows": [
                { "id": "h1", "category": "Permanent Employees", "isHeader": true },
                { "id": "perm_emp_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h2", "category": "Other than Permanent Employees", "isHeader": true },
                { "id": "other_emp_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h3", "category": "Permanent Workers", "isHeader": true },
                { "id": "perm_worker_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h4", "category": "Other than Permanent Workers", "isHeader": true },
                { "id": "other_worker_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" }
            ]
        },
        {
            "id": "p3_e1b_workers_wellbeing",
            "title": "1. b. Details of measures for the well-being of workers:",
            "type": "table",
            "dynamic": true,
            "disableAddDelete": true,
            "storageField": "details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it",
            "popup": true,
            "label": "Details of measures for the well-being of workers",
            "rowFilter": ["h3", "perm_worker_male", "perm_worker_female", "perm_worker_other", "perm_worker_total", "h4", "other_worker_male", "other_worker_female", "other_worker_other", "other_worker_total"],
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_a", "label": "Total (A)" },
                { "id": "health_no_b", "label": "Health Insurance - Number (B)" },
                { "id": "health_pct_b", "label": "Health Insurance - % (B/A)" },
                { "id": "accident_no_c", "label": "Accident Insurance - Number (C)" },
                { "id": "accident_pct_c", "label": "Accident Insurance - % (C/A)" },
                { "id": "maternity_no_d", "label": "Maternity Benefits - Number (D)" },
                { "id": "maternity_pct_d", "label": "Maternity Benefits - % (D/A)" },
                { "id": "paternity_no_e", "label": "Paternity Benefits - Number (E)" },
                { "id": "paternity_pct_e", "label": "Paternity Benefits - % (E/A)" },
                { "id": "daycare_no_f", "label": "Day Care - Number (F)" },
                { "id": "daycare_pct_f", "label": "Day Care - % (F/A)" }
            ],
            "defaultRows": [
                { "id": "h1", "category": "Permanent Employees", "isHeader": true },
                { "id": "perm_emp_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_emp_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h2", "category": "Other than Permanent Employees", "isHeader": true },
                { "id": "other_emp_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_emp_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h3", "category": "Permanent Workers", "isHeader": true },
                { "id": "perm_worker_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "perm_worker_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "h4", "category": "Other than Permanent Workers", "isHeader": true },
                { "id": "other_worker_male", "category": "Male", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_female", "category": "Female", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_other", "category": "Other", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" },
                { "id": "other_worker_total", "category": "Total", "total_a": "", "health_no_b": "", "health_pct_b": "", "accident_no_c": "", "accident_pct_c": "", "maternity_no_d": "", "maternity_pct_d": "", "paternity_no_e": "", "paternity_pct_e": "", "daycare_no_f": "", "daycare_pct_f": "" }
            ]
        },
        {
            "id": "p3_e1c_spending",
            "title": "1. c. Spending on measures towards well-being of employees and workers (including permanent and other than permanent employees and workers):",
            "type": "table",
            "popup": true,
            "label": "Spending on measures towards well-being",
            "columns": [
                { "id": "measure", "label": "Measure" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "cost_incurred", "label": "i) Cost incurred on wellbeing measures (well-being measures means well-being of employees and workers including male, female, permanent and other than permanent employees and workers)" },
                { "id": "total_revenue", "label": "ii) Total revenue of the company" },
                { "id": "cost_as_pct", "label": "iii) Cost incurred on wellbeing measures as a % of total revenue of the company" }
            ],
            "fields": [
                { "name": "p3_e1c_cost_incurred_fy", "mapping": "fy", "row": "cost_incurred", "uiType": "number" },
                { "name": "p3_e1c_cost_incurred_py", "mapping": "py", "row": "cost_incurred", "uiType": "number" },
                { "name": "p3_e1c_total_revenue_fy", "mapping": "fy", "row": "total_revenue", "uiType": "number" },
                { "name": "p3_e1c_total_revenue_py", "mapping": "py", "row": "total_revenue", "uiType": "number" },
                { "name": "p3_e1c_cost_as_pct_fy", "mapping": "fy", "row": "cost_as_pct", "uiType": "number" },
                { "name": "p3_e1c_cost_as_pct_py", "mapping": "py", "row": "cost_as_pct", "uiType": "number" }
            ]
        },
        {
            "id": "p3_e2_retirement_benefits",
            "title": "2. Details of retirement benefits:",
            "type": "table",
            "popup": true,
            "label": "Details of retirement benefits",
            "fixedRows": true,
            "columns": [
                { "id": "benefit", "label": "Benefits" },
                { "id": "fy_emp_covered_pct", "label": "FY - Employees covered as % of total" },
                { "id": "fy_worker_covered_pct", "label": "FY - Workers covered as % of total" },
                { "id": "fy_deposited", "label": "FY - Deducted & Deposited (Y/N/N.A.)", "options": ["Y", "N", "N.A."] },
                { "id": "py_emp_covered_pct", "label": "PY - Employees covered as % of total" },
                { "id": "py_worker_covered_pct", "label": "PY - Workers covered as % of total" },
                { "id": "py_deposited", "label": "PY - Deducted & Deposited (Y/N/N.A.)", "options": ["Y", "N", "N.A."] }
            ],
            "rows": [
                { "id": "pf", "label": "PF" },
                { "id": "gratuity", "label": "Gratuity" },
                { "id": "esi", "label": "ESI" }
            ],
            "fields": [
                // PF row
                { "name": "p3_e2_pf_fy_emp_pct", "row": "pf", "mapping": "fy_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_pf_fy_worker_pct", "row": "pf", "mapping": "fy_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_pf_fy_deposited", "row": "pf", "mapping": "fy_deposited", "uiType": "select" },
                { "name": "p3_e2_pf_py_emp_pct", "row": "pf", "mapping": "py_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_pf_py_worker_pct", "row": "pf", "mapping": "py_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_pf_py_deposited", "row": "pf", "mapping": "py_deposited", "uiType": "select" },

                // Gratuity row
                { "name": "p3_e2_gratuity_fy_emp_pct", "row": "gratuity", "mapping": "fy_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_gratuity_fy_worker_pct", "row": "gratuity", "mapping": "fy_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_gratuity_fy_deposited", "row": "gratuity", "mapping": "fy_deposited", "uiType": "select" },
                { "name": "p3_e2_gratuity_py_emp_pct", "row": "gratuity", "mapping": "py_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_gratuity_py_worker_pct", "row": "gratuity", "mapping": "py_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_gratuity_py_deposited", "row": "gratuity", "mapping": "py_deposited", "uiType": "select" },

                // ESI row
                { "name": "p3_e2_esi_fy_emp_pct", "row": "esi", "mapping": "fy_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_esi_fy_worker_pct", "row": "esi", "mapping": "fy_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_esi_fy_deposited", "row": "esi", "mapping": "fy_deposited", "uiType": "select" },
                { "name": "p3_e2_esi_py_emp_pct", "row": "esi", "mapping": "py_emp_covered_pct", "uiType": "number" },
                { "name": "p3_e2_esi_py_worker_pct", "row": "esi", "mapping": "py_worker_covered_pct", "uiType": "number" },
                { "name": "p3_e2_esi_py_deposited", "row": "esi", "mapping": "py_deposited", "uiType": "select" }



            ]
        },
        {
            "id": "p3_e2_other_details",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of Other Retirement benefits",
                    "name": "details_of_other_retirement_benefits_popup",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details (Other Retirement Benefits)",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "benefit_name", "label": "Name of Benefits" },
                        { "id": "fy_emp_pct", "label": "No. of employees covered as a % of total employees (FY)" },
                        { "id": "fy_worker_pct", "label": "No. of workers covered as a % of total workers (FY)" },
                        { "id": "fy_deposited", "label": "Deducted and deposited with the authority (Y/N/N.A.) (FY)" },
                        { "id": "py_emp_pct", "label": "No. of employees covered as a % of total employees (PY)" },
                        { "id": "py_worker_pct", "label": "No. of workers covered as a % of total workers (PY)" },
                        { "id": "py_deposited", "label": "Deducted and deposited with the authority (Y/N/N.A.) (PY)" }
                    ],
                    "defaultRow": { "benefit_name": "", "fy_emp_pct": "", "fy_worker_pct": "", "fy_deposited": "", "py_emp_pct": "", "py_worker_pct": "", "py_deposited": "" }
                }
            ]
        },
        {
            "id": "p3_e3_accessibility",
            "title": "3. Accessibility of workplaces",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Are the premises / offices of the entity accessible to differently abled employees and workers, as per the requirements of the Rights of Persons with Disabilities Act, 2016?",
                    "name": "are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If not, whether any steps are being taken by the entity in this regard",
                    "name": "steps_taken_if_premises_not_accessible",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers",
                        "value": "No"
                    }
                },
                {
                    "label": "If NA, provide additional information",
                    "name": "p3_e3_accessibility_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers",
                        "value": "NA"
                    }
                }
            ]
        },
        {
            "id": "p3_e4_equal_opportunity",
            "title": "4. Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016?",
                    "name": "does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If so, provide a web-link to the policy",
                    "name": "weblink_of_equal_opportunity_policy",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016",
                        "value": "Yes"
                    }
                },
                {
                    "label": "If NA, provide additional information",
                    "name": "p3_e4_equal_opportunity_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016",
                        "value": "NA"
                    }
                }
            ]
        },
        {
            "id": "p3_e5_return_to_work",
            "title": "5. Return to work and Retention rates of permanent employees and workers that took parental leave.",
            "type": "table",
            "popup": true,
            "label": "Return to work and Retention rates",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Gender" },
                { "id": "return_rate_fy", "label": "Return to Work Rate (FY)" },
                { "id": "retention_rate_fy", "label": "Retention Rate (FY)" },
                { "id": "return_rate_py", "label": "Return to Work Rate (PY)" },
                { "id": "retention_rate_py", "label": "Retention Rate (PY)" }
            ],
            "rows": [
                { "id": "male", "label": "Male" },
                { "id": "female", "label": "Female" },
                { "id": "others", "label": "Others" },
                { "id": "total", "label": "Total" }
            ],
            "fields": [
                { "name": "p3_e5_male_return_fy", "row": "male", "mapping": "return_rate_fy", "uiType": "number" },
                { "name": "p3_e5_male_retention_fy", "row": "male", "mapping": "retention_rate_fy", "uiType": "number" },
                { "name": "p3_e5_male_return_py", "row": "male", "mapping": "return_rate_py", "uiType": "number" },
                { "name": "p3_e5_male_retention_py", "row": "male", "mapping": "retention_rate_py", "uiType": "number" },

                { "name": "p3_e5_female_return_fy", "row": "female", "mapping": "return_rate_fy", "uiType": "number" },
                { "name": "p3_e5_female_retention_fy", "row": "female", "mapping": "retention_rate_fy", "uiType": "number" },
                { "name": "p3_e5_female_return_py", "row": "female", "mapping": "return_rate_py", "uiType": "number" },
                { "name": "p3_e5_female_retention_py", "row": "female", "mapping": "retention_rate_py", "uiType": "number" },

                { "name": "p3_e5_others_return_fy", "row": "others", "mapping": "return_rate_fy", "uiType": "number" },
                { "name": "p3_e5_others_retention_fy", "row": "others", "mapping": "retention_rate_fy", "uiType": "number" },
                { "name": "p3_e5_others_return_py", "row": "others", "mapping": "return_rate_py", "uiType": "number" },
                { "name": "p3_e5_others_retention_py", "row": "others", "mapping": "retention_rate_py", "uiType": "number" },

                { "name": "p3_e5_total_return_fy", "row": "total", "mapping": "return_rate_fy", "uiType": "number" },
                { "name": "p3_e5_total_retention_fy", "row": "total", "mapping": "retention_rate_fy", "uiType": "number" },
                { "name": "p3_e5_total_return_py", "row": "total", "mapping": "return_rate_py", "uiType": "number" },
                { "name": "p3_e5_total_retention_py", "row": "total", "mapping": "retention_rate_py", "uiType": "number" }
            ]
        },
        {
            "id": "p3_e6_grievance_mechanism",
            "title": "6. Is there a mechanism available to receive and redress grievances for the following categories of employees and workers? If yes, give details of the mechanism in brief.",
            "type": "table",
            "popup": true,
            "label": "Grievance redressal mechanism",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "mechanism_yn", "label": "Yes/No (If Yes, then give details of the mechanism in brief)", "options": ["Yes", "No"] },
                { "id": "details", "label": "Details of the mechanism" }
            ],
            "rows": [
                { "id": "perm_workers", "label": "Permanent Workers" },
                { "id": "other_workers", "label": "Other than Permanent Workers" },
                { "id": "perm_employees", "label": "Permanent Employees" },
                { "id": "other_employees", "label": "Other than Permanent Employees" }
            ],
            "fields": [
                { "name": "p3_e6_perm_workers_yn", "row": "perm_workers", "mapping": "mechanism_yn", "uiType": "select", "options": ["Yes", "No"] },
                {
                    "name": "p3_e6_perm_workers_details",
                    "row": "perm_workers",
                    "mapping": "details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e6_perm_workers_yn", "value": "Yes" }
                },

                { "name": "p3_e6_other_workers_yn", "row": "other_workers", "mapping": "mechanism_yn", "uiType": "select", "options": ["Yes", "No"] },
                {
                    "name": "p3_e6_other_workers_details",
                    "row": "other_workers",
                    "mapping": "details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e6_other_workers_yn", "value": "Yes" }
                },

                { "name": "p3_e6_perm_employees_yn", "row": "perm_employees", "mapping": "mechanism_yn", "uiType": "select", "options": ["Yes", "No"] },
                {
                    "name": "p3_e6_perm_employees_details",
                    "row": "perm_employees",
                    "mapping": "details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e6_perm_employees_yn", "value": "Yes" }
                },

                { "name": "p3_e6_other_employees_yn", "row": "other_employees", "mapping": "mechanism_yn", "uiType": "select", "options": ["Yes", "No"] },
                {
                    "name": "p3_e6_other_employees_details",
                    "row": "other_employees",
                    "mapping": "details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e6_other_employees_yn", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p3_e7_unions",
            "title": "7. Membership of employees and worker in association(s) or Unions recognised by the listed entity:",
            "type": "table",
            "popup": true,
            "label": "Add Union Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_fy", "label": "Total employees/workers in respective category (A) FY", "uiType": "number" },
                { "id": "union_fy", "label": "No. of employees/workers who are part of association(s) or Union (B) FY", "uiType": "number" },
                { "id": "pct_fy", "label": "% (B / A) FY", "uiType": "number" },
                { "id": "total_py", "label": "Total employees/workers in respective category (C) PY", "uiType": "number" },
                { "id": "union_py", "label": "No. of employees/workers who are part of association(s) or Union (D) PY", "uiType": "number" },
                { "id": "pct_py", "label": "% (D / C) PY", "uiType": "number" }
            ],
            "rows": [
                { "id": "perm_emp_total", "label": "Total Permanent Employees", "isBold": true },
                { "id": "perm_emp_male", "label": "Male" },
                { "id": "perm_emp_female", "label": "Female" },
                { "id": "perm_emp_others", "label": "Other" },
                { "id": "perm_worker_total", "label": "Total Permanent Workers", "isBold": true },
                { "id": "perm_worker_male", "label": "Male" },
                { "id": "perm_worker_female", "label": "Female" },
                { "id": "perm_worker_others", "label": "Other" }
            ],
            "fields": [
                // Total Permanent Employees
                { "name": "p3_e7_perm_emp_total_total_fy", "row": "perm_emp_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_total_union_fy", "row": "perm_emp_total", "mapping": "union_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_total_pct_fy", "row": "perm_emp_total", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_total_total_py", "row": "perm_emp_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_total_union_py", "row": "perm_emp_total", "mapping": "union_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_total_pct_py", "row": "perm_emp_total", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Male Employees
                { "name": "p3_e7_perm_emp_male_total_fy", "row": "perm_emp_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_male_union_fy", "row": "perm_emp_male", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_emp_male_pct_fy", "row": "perm_emp_male", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_male_total_py", "row": "perm_emp_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_male_union_py", "row": "perm_emp_male", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_male_pct_py", "row": "perm_emp_male", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Female Employees
                { "name": "p3_e7_perm_emp_female_total_fy", "row": "perm_emp_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_female_union_fy", "row": "perm_emp_female", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_emp_female_pct_fy", "row": "perm_emp_female", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_female_total_py", "row": "perm_emp_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_female_union_py", "row": "perm_emp_female", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_female_pct_py", "row": "perm_emp_female", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Other Employees
                { "name": "p3_e7_perm_emp_others_total_fy", "row": "perm_emp_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_others_union_fy", "row": "perm_emp_others", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_emp_others_pct_fy", "row": "perm_emp_others", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_emp_others_total_py", "row": "perm_emp_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_others_union_py", "row": "perm_emp_others", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_emp_others_pct_py", "row": "perm_emp_others", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Total Permanent Workers
                { "name": "p3_e7_perm_worker_total_total_fy", "row": "perm_worker_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_total_union_fy", "row": "perm_worker_total", "mapping": "union_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_total_pct_fy", "row": "perm_worker_total", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_total_total_py", "row": "perm_worker_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_total_union_py", "row": "perm_worker_total", "mapping": "union_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_total_pct_py", "row": "perm_worker_total", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Male Workers
                { "name": "p3_e7_perm_worker_male_total_fy", "row": "perm_worker_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_male_union_fy", "row": "perm_worker_male", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_worker_male_pct_fy", "row": "perm_worker_male", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_male_total_py", "row": "perm_worker_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_male_union_py", "row": "perm_worker_male", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_male_pct_py", "row": "perm_worker_male", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Female Workers
                { "name": "p3_e7_perm_worker_female_total_fy", "row": "perm_worker_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_female_union_fy", "row": "perm_worker_female", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_worker_female_pct_fy", "row": "perm_worker_female", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_female_total_py", "row": "perm_worker_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_female_union_py", "row": "perm_worker_female", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_female_pct_py", "row": "perm_worker_female", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Other Workers
                { "name": "p3_e7_perm_worker_others_total_fy", "row": "perm_worker_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_others_union_fy", "row": "perm_worker_others", "mapping": "union_fy", "uiType": "number" },
                { "name": "p3_e7_perm_worker_others_pct_fy", "row": "perm_worker_others", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e7_perm_worker_others_total_py", "row": "perm_worker_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_others_union_py", "row": "perm_worker_others", "mapping": "union_py", "uiType": "number" },
                { "name": "p3_e7_perm_worker_others_pct_py", "row": "perm_worker_others", "mapping": "pct_py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p3_e8_training",
            "title": "8. Details of training given to employees and workers:",
            "type": "table",
            "popup": true,
            "label": "Add Training Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_fy", "label": "Total (A) FY", "uiType": "number" },
                { "id": "hs_no_fy", "label": "On Health and safety measures - No. (B) FY", "uiType": "number" },
                { "id": "hs_pct_fy", "label": "% (B / A) FY", "uiType": "number" },
                { "id": "skill_no_fy", "label": "On Skill upgradation - No. (C) FY", "uiType": "number" },
                { "id": "skill_pct_fy", "label": "% (C / A) FY", "uiType": "number" },
                { "id": "total_py", "label": "Total (D) PY", "uiType": "number" },
                { "id": "hs_no_py", "label": "On Health and safety measures - No. (E) PY", "uiType": "number" },
                { "id": "hs_pct_py", "label": "% (E / D) PY", "uiType": "number" },
                { "id": "skill_no_py", "label": "On Skill upgradation - No. (F) PY", "uiType": "number" },
                { "id": "skill_pct_py", "label": "% (F / D) PY", "uiType": "number" }
            ],
            "rows": [
                { "id": "employees_header", "label": "Employees", "isHeader": true },
                { "id": "emp_male", "label": "Male" },
                { "id": "emp_female", "label": "Female" },
                { "id": "emp_others", "label": "Other" },
                { "id": "emp_total", "label": "Total", "isBold": true },
                { "id": "workers_header", "label": "Workers", "isHeader": true },
                { "id": "worker_male", "label": "Male" },
                { "id": "worker_female", "label": "Female" },
                { "id": "worker_others", "label": "Other" },
                { "id": "worker_total", "label": "Total", "isBold": true }
            ],
            "fields": [
                // Employees - Male
                { "name": "p3_e8_emp_male_total_fy", "row": "emp_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_male_hs_no_fy", "row": "emp_male", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_male_hs_pct_fy", "row": "emp_male", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_male_skill_no_fy", "row": "emp_male", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_male_skill_pct_fy", "row": "emp_male", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_male_total_py", "row": "emp_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_emp_male_hs_no_py", "row": "emp_male", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_male_hs_pct_py", "row": "emp_male", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_male_skill_no_py", "row": "emp_male", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_male_skill_pct_py", "row": "emp_male", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Employees - Female
                { "name": "p3_e8_emp_female_total_fy", "row": "emp_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_female_hs_no_fy", "row": "emp_female", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_female_hs_pct_fy", "row": "emp_female", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_female_skill_no_fy", "row": "emp_female", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_female_skill_pct_fy", "row": "emp_female", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_female_total_py", "row": "emp_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_emp_female_hs_no_py", "row": "emp_female", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_female_hs_pct_py", "row": "emp_female", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_female_skill_no_py", "row": "emp_female", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_female_skill_pct_py", "row": "emp_female", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Employees - Other
                { "name": "p3_e8_emp_others_total_fy", "row": "emp_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_others_hs_no_fy", "row": "emp_others", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_others_hs_pct_fy", "row": "emp_others", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_others_skill_no_fy", "row": "emp_others", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_emp_others_skill_pct_fy", "row": "emp_others", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_others_total_py", "row": "emp_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_emp_others_hs_no_py", "row": "emp_others", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_others_hs_pct_py", "row": "emp_others", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_others_skill_no_py", "row": "emp_others", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_emp_others_skill_pct_py", "row": "emp_others", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Employees - Total
                { "name": "p3_e8_emp_total_total_fy", "row": "emp_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_hs_no_fy", "row": "emp_total", "mapping": "hs_no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_hs_pct_fy", "row": "emp_total", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_skill_no_fy", "row": "emp_total", "mapping": "skill_no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_skill_pct_fy", "row": "emp_total", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_total_py", "row": "emp_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_hs_no_py", "row": "emp_total", "mapping": "hs_no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_hs_pct_py", "row": "emp_total", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_skill_no_py", "row": "emp_total", "mapping": "skill_no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_emp_total_skill_pct_py", "row": "emp_total", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Workers - Male
                { "name": "p3_e8_worker_male_total_fy", "row": "worker_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_male_hs_no_fy", "row": "worker_male", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_male_hs_pct_fy", "row": "worker_male", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_male_skill_no_fy", "row": "worker_male", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_male_skill_pct_fy", "row": "worker_male", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_male_total_py", "row": "worker_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_worker_male_hs_no_py", "row": "worker_male", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_male_hs_pct_py", "row": "worker_male", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_male_skill_no_py", "row": "worker_male", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_male_skill_pct_py", "row": "worker_male", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Workers - Female
                { "name": "p3_e8_worker_female_total_fy", "row": "worker_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_female_hs_no_fy", "row": "worker_female", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_female_hs_pct_fy", "row": "worker_female", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_female_skill_no_fy", "row": "worker_female", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_female_skill_pct_fy", "row": "worker_female", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_female_total_py", "row": "worker_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_worker_female_hs_no_py", "row": "worker_female", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_female_hs_pct_py", "row": "worker_female", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_female_skill_no_py", "row": "worker_female", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_female_skill_pct_py", "row": "worker_female", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Workers - Other
                { "name": "p3_e8_worker_others_total_fy", "row": "worker_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_others_hs_no_fy", "row": "worker_others", "mapping": "hs_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_others_hs_pct_fy", "row": "worker_others", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_others_skill_no_fy", "row": "worker_others", "mapping": "skill_no_fy", "uiType": "number" },
                { "name": "p3_e8_worker_others_skill_pct_fy", "row": "worker_others", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_others_total_py", "row": "worker_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e8_worker_others_hs_no_py", "row": "worker_others", "mapping": "hs_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_others_hs_pct_py", "row": "worker_others", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_others_skill_no_py", "row": "worker_others", "mapping": "skill_no_py", "uiType": "number" },
                { "name": "p3_e8_worker_others_skill_pct_py", "row": "worker_others", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true },

                // Workers - Total
                { "name": "p3_e8_worker_total_total_fy", "row": "worker_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_hs_no_fy", "row": "worker_total", "mapping": "hs_no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_hs_pct_fy", "row": "worker_total", "mapping": "hs_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_skill_no_fy", "row": "worker_total", "mapping": "skill_no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_skill_pct_fy", "row": "worker_total", "mapping": "skill_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_total_py", "row": "worker_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_hs_no_py", "row": "worker_total", "mapping": "hs_no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_hs_pct_py", "row": "worker_total", "mapping": "hs_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_skill_no_py", "row": "worker_total", "mapping": "skill_no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e8_worker_total_skill_pct_py", "row": "worker_total", "mapping": "skill_pct_py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p3_e9_performance_review",
            "title": "9. Details of performance and career development reviews of employees and worker:",
            "type": "table",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_fy", "label": "Total (A) (FY)", "uiType": "number" },
                { "id": "no_fy", "label": "No. (B) (FY)", "uiType": "number" },
                { "id": "pct_fy", "label": "% (B/A) (FY)", "uiType": "number" },
                { "id": "total_py", "label": "Total (C) (PY)", "uiType": "number" },
                { "id": "no_py", "label": "No. (D) (PY)", "uiType": "number" },
                { "id": "pct_py", "label": "% (D/C) (PY)", "uiType": "number" }
            ],
            "rows": [
                { "id": "emp_header", "label": "Employees", "isHeader": true },
                { "id": "emp_male", "label": "Male" },
                { "id": "emp_female", "label": "Female" },
                { "id": "emp_others", "label": "Other" },
                { "id": "emp_total", "label": "Total", "isBold": true },
                { "id": "worker_header", "label": "Workers", "isHeader": true },
                { "id": "worker_male", "label": "Male" },
                { "id": "worker_female", "label": "Female" },
                { "id": "worker_others", "label": "Other" },
                { "id": "worker_total", "label": "Total", "isBold": true }
            ],
            "fields": [
                // Employees - Male
                { "name": "p3_e9_emp_male_total_fy", "row": "emp_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_male_no_fy", "row": "emp_male", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_emp_male_pct_fy", "row": "emp_male", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_male_total_py", "row": "emp_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_emp_male_no_py", "row": "emp_male", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_emp_male_pct_py", "row": "emp_male", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Employees - Female
                { "name": "p3_e9_emp_female_total_fy", "row": "emp_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_female_no_fy", "row": "emp_female", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_emp_female_pct_fy", "row": "emp_female", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_female_total_py", "row": "emp_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_emp_female_no_py", "row": "emp_female", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_emp_female_pct_py", "row": "emp_female", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Employees - Others
                { "name": "p3_e9_emp_others_total_fy", "row": "emp_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_others_no_fy", "row": "emp_others", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_emp_others_pct_fy", "row": "emp_others", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_others_total_py", "row": "emp_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_emp_others_no_py", "row": "emp_others", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_emp_others_pct_py", "row": "emp_others", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Employees - Total
                { "name": "p3_e9_emp_total_total_fy", "row": "emp_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_total_no_fy", "row": "emp_total", "mapping": "no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_total_pct_fy", "row": "emp_total", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_total_total_py", "row": "emp_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_total_no_py", "row": "emp_total", "mapping": "no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_emp_total_pct_py", "row": "emp_total", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Workers - Male
                { "name": "p3_e9_worker_male_total_fy", "row": "worker_male", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_male_no_fy", "row": "worker_male", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_worker_male_pct_fy", "row": "worker_male", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_male_total_py", "row": "worker_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_worker_male_no_py", "row": "worker_male", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_worker_male_pct_py", "row": "worker_male", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Workers - Female
                { "name": "p3_e9_worker_female_total_fy", "row": "worker_female", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_female_no_fy", "row": "worker_female", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_worker_female_pct_fy", "row": "worker_female", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_female_total_py", "row": "worker_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_worker_female_no_py", "row": "worker_female", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_worker_female_pct_py", "row": "worker_female", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Workers - Others
                { "name": "p3_e9_worker_others_total_fy", "row": "worker_others", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_others_no_fy", "row": "worker_others", "mapping": "no_fy", "uiType": "number" },
                { "name": "p3_e9_worker_others_pct_fy", "row": "worker_others", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_others_total_py", "row": "worker_others", "mapping": "total_py", "uiType": "number" },
                { "name": "p3_e9_worker_others_no_py", "row": "worker_others", "mapping": "no_py", "uiType": "number" },
                { "name": "p3_e9_worker_others_pct_py", "row": "worker_others", "mapping": "pct_py", "uiType": "number", "readOnly": true },

                // Workers - Total
                { "name": "p3_e9_worker_total_total_fy", "row": "worker_total", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_total_no_fy", "row": "worker_total", "mapping": "no_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_total_pct_fy", "row": "worker_total", "mapping": "pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_total_total_py", "row": "worker_total", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_total_no_py", "row": "worker_total", "mapping": "no_py", "uiType": "number", "readOnly": true },
                { "name": "p3_e9_worker_total_pct_py", "row": "worker_total", "mapping": "pct_py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p3_e10_safety",
            "title": "10. Health and safety management system:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "a. Whether an occupational health and safety management system has been implemented by the entity? (Yes/ No/ NA)",
                    "name": "p3_e10_a_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, the coverage such system?",
                    "name": "p3_e10_a_details_yes",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e10_a_status", "value": "Yes" }
                },
                {
                    "label": "Provide details for NA",
                    "name": "p3_e10_a_details_na",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e10_a_status", "value": "NA" }
                },
                {
                    "label": "b. What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity?",
                    "name": "p3_e10_b_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                },
                {
                    "label": "c. Whether you have processes for workers to report the work related hazards and to remove themselves from such risks?",
                    "name": "p3_e10_c_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "Process Details (NA)",
                    "name": "p3_e10_c_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e10_c_status", "value": "NA" }
                },
                {
                    "label": "d. Do the employees/ worker of the entity have access to non-occupational medical and healthcare services?",
                    "name": "p3_e10_d_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "Medical Access Details (NA)",
                    "name": "p3_e10_d_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_e10_d_status", "value": "NA" }
                }
            ]
        },
        {
            "id": "p3_e11_safety_incidents",
            "title": "11. Details of safety related incidents:",
            "label": "Details of safety related incidents",
            "type": "table",
            "dynamic": false,
            "fixedRows": true,
            "columns": [
                { "id": "incident_type", "label": "Safety Incident/Number" },
                { "id": "category", "label": "Category*" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "ltifr_emp", "incident_type": "Lost Time Injury Frequency Rate (LTIFR) (per one million-person hours worked)", "category": "Employees" },
                { "id": "ltifr_worker", "incident_type": "", "category": "Workers" },
                { "id": "injuries_emp", "incident_type": "Total recordable work-related injuries", "category": "Employees" },
                { "id": "injuries_worker", "incident_type": "", "category": "Workers" },
                { "id": "fatalities_emp", "incident_type": "No. of fatalities", "category": "Employees" },
                { "id": "fatalities_worker", "incident_type": "", "category": "Workers" },
                { "id": "high_consequence_emp", "incident_type": "High consequence work related injury or ill-health (excluding fatalities)", "category": "Employees" },
                { "id": "high_consequence_worker", "incident_type": "", "category": "Workers" }
            ],
            "fields": [
                { "name": "p3_e11_ltifr_emp_fy", "row": "ltifr_emp", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_ltifr_emp_py", "row": "ltifr_emp", "mapping": "py", "uiType": "number" },
                { "name": "p3_e11_ltifr_worker_fy", "row": "ltifr_worker", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_ltifr_worker_py", "row": "ltifr_worker", "mapping": "py", "uiType": "number" },

                { "name": "p3_e11_injuries_emp_fy", "row": "injuries_emp", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_injuries_emp_py", "row": "injuries_emp", "mapping": "py", "uiType": "number" },
                { "name": "p3_e11_injuries_worker_fy", "row": "injuries_worker", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_injuries_worker_py", "row": "injuries_worker", "mapping": "py", "uiType": "number" },

                { "name": "p3_e11_fatalities_emp_fy", "row": "fatalities_emp", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_fatalities_emp_py", "row": "fatalities_emp", "mapping": "py", "uiType": "number" },
                { "name": "p3_e11_fatalities_worker_fy", "row": "fatalities_worker", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_fatalities_worker_py", "row": "fatalities_worker", "mapping": "py", "uiType": "number" },

                { "name": "p3_e11_high_consequence_emp_fy", "row": "high_consequence_emp", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_high_consequence_emp_py", "row": "high_consequence_emp", "mapping": "py", "uiType": "number" },
                { "name": "p3_e11_high_consequence_worker_fy", "row": "high_consequence_worker", "mapping": "fy", "uiType": "number" },
                { "name": "p3_e11_high_consequence_worker_py", "row": "high_consequence_worker", "mapping": "py", "uiType": "number" }
            ],
            "footer": "*Including in the contract workforce"
        },
        {
            "id": "p3_e12_complaints_work_conditions",
            "title": "12. Describe the measures taken by the entity to ensure a safe and healthy work place.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Click to Add Measures",
                    "name": "p3_e12_measures_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p3_e13_complaints",
            "title": "13. Number of Complaints on the following made by employees and workers:",
            "label": "Number of Complaints",
            "type": "table",
            "dynamic": false,
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "filed_fy", "label": "Filed during the year (FY)" },
                { "id": "pending_fy", "label": "Pending resolution at end of year (FY)" },
                { "id": "remarks_fy", "label": "Remarks (FY)" },
                { "id": "filed_py", "label": "Filed during the year (PY)" },
                { "id": "pending_py", "label": "Pending resolution at end of year (PY)" },
                { "id": "remarks_py", "label": "Remarks (PY)" }
            ],
            "rows": [
                { "id": "working_conditions", "label": "Working Conditions" },
                { "id": "health_safety", "label": "Health & Safety" }
            ],
            "fields": [
                { "name": "p3_e13_working_conditions_filed_fy", "row": "working_conditions", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p3_e13_working_conditions_pending_fy", "row": "working_conditions", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p3_e13_working_conditions_remarks_fy", "row": "working_conditions", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p3_e13_working_conditions_filed_py", "row": "working_conditions", "mapping": "filed_py", "uiType": "number" },
                { "name": "p3_e13_working_conditions_pending_py", "row": "working_conditions", "mapping": "pending_py", "uiType": "number" },
                { "name": "p3_e13_working_conditions_remarks_py", "row": "working_conditions", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p3_e13_health_safety_filed_fy", "row": "health_safety", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p3_e13_health_safety_pending_fy", "row": "health_safety", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p3_e13_health_safety_remarks_fy", "row": "health_safety", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p3_e13_health_safety_filed_py", "row": "health_safety", "mapping": "filed_py", "uiType": "number" },
                { "name": "p3_e13_health_safety_pending_py", "row": "health_safety", "mapping": "pending_py", "uiType": "number" },
                { "name": "p3_e13_health_safety_remarks_py", "row": "health_safety", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" }
            ]
        },
        {
            "id": "p3_e14_assessments",
            "title": "14. Assessments for the year:",
            "label": "Assessments for the year",
            "type": "table",
            "dynamic": false,
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "pct_assessed", "label": "% of your plants and offices that were assessed (by entity or statutory authorities or third parties)" }
            ],
            "rows": [
                { "id": "health_safety", "label": "Health and safety practices" },
                { "id": "working_conditions", "label": "Working conditions" }
            ],
            "fields": [
                { "name": "p3_e14_health_safety_pct", "row": "health_safety", "mapping": "pct_assessed", "uiType": "number" },
                { "name": "p3_e14_working_conditions_pct", "row": "working_conditions", "mapping": "pct_assessed", "uiType": "number" }
            ]
        },
        {
            "id": "p3_e15_corrective_actions",
            "title": "15. Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Click to Add Details",
                    "name": "p3_e15_corrective_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        }],
    "Section C: Principle 3 Leadership Indicators": [
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
                    "options": ["Yes", "No"]
                },
                {
                    "label": "(B) Workers (Y/N)",
                    "name": "p3_l1_workers_insurance",
                    "uiType": "select",
                    "options": ["Yes", "No"]
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
                { "id": "category", "label": "" },
                { "id": "total_affected_fy", "label": "Total no. of affected employees/ workers - FY (-)" },
                { "id": "total_affected_py", "label": "Total no. of affected employees/ workers - PY (-)" },
                { "id": "rehab_fy", "label": "No. of employees/workers that are rehabilitated... - FY (-)" },
                { "id": "rehab_py", "label": "No. of employees/workers that are rehabilitated... - PY (-)" }
            ],
            "rows": [
                { "id": "employees", "label": "Employees" },
                { "id": "workers", "label": "Workers" }
            ],
            "fields": [
                { "name": "p3_l3_emp_total_affected_fy", "row": "employees", "mapping": "total_affected_fy", "uiType": "number" },
                { "name": "p3_l3_emp_total_affected_py", "row": "employees", "mapping": "total_affected_py", "uiType": "number" },
                { "name": "p3_l3_emp_rehab_fy", "row": "employees", "mapping": "rehab_fy", "uiType": "number" },
                { "name": "p3_l3_emp_rehab_py", "row": "employees", "mapping": "rehab_py", "uiType": "number" },

                { "name": "p3_l3_worker_total_affected_fy", "row": "workers", "mapping": "total_affected_fy", "uiType": "number" },
                { "name": "p3_l3_worker_total_affected_py", "row": "workers", "mapping": "total_affected_py", "uiType": "number" },
                { "name": "p3_l3_worker_rehab_fy", "row": "workers", "mapping": "rehab_fy", "uiType": "number" },
                { "name": "p3_l3_worker_rehab_py", "row": "workers", "mapping": "rehab_py", "uiType": "number" }
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
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "Transition Assistance Details",
                    "name": "p3_l4_transition_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p3_l4_transition_status", "value": "NA" }
                }
            ]
        },
        {
            "id": "p3_l5_value_chain_assessment",
            "title": "5. Details on assessment of value chain partners:",
            "type": "table",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "pct_assessed", "label": "% of value chain partners (by value of business done with such partners) that were assessed" }
            ],
            "rows": [
                { "id": "health_safety", "label": "Health and safety practices" },
                { "id": "working_conditions", "label": "Working Conditions" }
            ],
            "fields": [
                { "name": "p3_l5_health_safety_pct", "row": "health_safety", "mapping": "pct_assessed", "uiType": "number" },
                { "name": "p3_l5_working_conditions_pct", "row": "working_conditions", "mapping": "pct_assessed", "uiType": "number" }
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
    ],
    "Section C: Principle 4 Essential Indicators": [
        {
            "id": "p4_e1_stakeholder_processes",
            "title": "1. Describe the processes for identifying key stakeholder groups of the entity.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Describe the processes for identifying key stakeholder groups of the entity",
                    "name": "describe_the_processes_for_identifying_key_stakeholder_groups_of_the_entity_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Stakeholder Identification Process"
                }
            ]
        },
        {
            "id": "p4_e2_stakeholder_engagement",
            "title": "2. List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group",
                    "name": "list_stakeholder_groups_identified_as_key_for_your_entity_and_the_frequency_of_engagement_with_each_stakeholder_group_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Stakeholder Groups",
                    "columns": [
                        { "id": "sno", "label": "Sr. No" },
                        { "id": "stakeholder_group", "label": "Stakeholder Group" },
                        { "id": "identified_as_vulnerable", "label": "Whether identified as Vulnerable & Marginalized Group (Yes/No)" },
                        { "id": "channels", "label": "Channels of communication (Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website, Other)" },
                        { "id": "other_channels", "label": "Details of Other Channels" },
                        { "id": "frequency", "label": "Frequency of engagement (Annually/Half yearly/Quarterly/Others - please specify)" },
                        { "id": "other_frequency", "label": "Details of Other Frequency of engagement" },
                        { "id": "purpose", "label": "Purpose and scope of engagement including key topics and concerns raised during such engagement" }
                    ],
                    "defaultRow": {
                        "stakeholder_group": "",
                        "identified_as_vulnerable": "",
                        "channels": "",
                        "other_channels": "",
                        "frequency": "",
                        "other_frequency": "",
                        "purpose": ""
                    }
                }
            ]
        }
    ],
    "Section C: Principle 4 Leadership Indicators": [
        {
            "id": "p4_l1_consultation_processes",
            "title": "1. Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Click to Add Details",
                    "name": "p4_l1_consultation_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p4_l2_stakeholder_consultation",
            "title": "2. Whether stakeholder consultation is used to support the identification and management of environmental, and social topics.",
            "type": "grid",
            "columns": 2,
            "fields": [
                {
                    "label": "Select Status",
                    "name": "p4_l2_status",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity.",
                    "name": "p4_l3_incorporation_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p4_l2_status", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p4_l4_vulnerable_stakeholder_engagement",
            "title": "3. Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Click to Add Details",
                    "name": "p4_l4_engagement_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p4_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "General Notes",
                    "name": "p4_general_notes",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 5 Essential Indicators": [
        {
            "id": "p5_e1_training_coverage",
            "title": "1. Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format:",
            "type": "table",
            "popup": true,
            "label": "Add Training Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_fy", "label": "Total (A) FY (-)" },
                { "id": "on_hr_fy", "label": "No. of employees/workers covered (B) FY (-)" },
                { "id": "percent_fy", "label": "% (B / A) FY (-)" },
                { "id": "total_py", "label": "Total (C) PY (-)" },
                { "id": "on_hr_py", "label": "No. of employees/workers covered (D) PY (-)" },
                { "id": "percent_py", "label": "% (D / C) PY (-)" }
            ],
            "rows": [
                { "id": "h_emp", "label": "Employees", "isHeader": true },
                { "id": "perm_emp", "label": "Permanent" },
                { "id": "other_emp", "label": "Other than permanent" },
                { "id": "total_emp", "label": "Total Employees", "isBold": true },
                { "id": "h_worker", "label": "Workers", "isHeader": true },
                { "id": "perm_worker", "label": "Permanent" },
                { "id": "other_worker", "label": "Other than permanent" },
                { "id": "total_worker", "label": "Total Workers", "isBold": true }
            ],
            "fields": [
                { "name": "p5_e1_perm_emp_total_fy", "row": "perm_emp", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_perm_emp_on_hr_fy", "row": "perm_emp", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_perm_emp_percent_fy", "row": "perm_emp", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_perm_emp_total_py", "row": "perm_emp", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_perm_emp_on_hr_py", "row": "perm_emp", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_perm_emp_percent_py", "row": "perm_emp", "mapping": "percent_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e1_other_emp_total_fy", "row": "other_emp", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_other_emp_on_hr_fy", "row": "other_emp", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_other_emp_percent_fy", "row": "other_emp", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_other_emp_total_py", "row": "other_emp", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_other_emp_on_hr_py", "row": "other_emp", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_other_emp_percent_py", "row": "other_emp", "mapping": "percent_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e1_total_emp_total_fy", "row": "total_emp", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_total_emp_on_hr_fy", "row": "total_emp", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_total_emp_percent_fy", "row": "total_emp", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_total_emp_total_py", "row": "total_emp", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_total_emp_on_hr_py", "row": "total_emp", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_total_emp_percent_py", "row": "total_emp", "mapping": "percent_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e1_perm_worker_total_fy", "row": "perm_worker", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_perm_worker_on_hr_fy", "row": "perm_worker", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_perm_worker_percent_fy", "row": "perm_worker", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_perm_worker_total_py", "row": "perm_worker", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_perm_worker_on_hr_py", "row": "perm_worker", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_perm_worker_percent_py", "row": "perm_worker", "mapping": "percent_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e1_other_worker_total_fy", "row": "other_worker", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_other_worker_on_hr_fy", "row": "other_worker", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_other_worker_percent_fy", "row": "other_worker", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_other_worker_total_py", "row": "other_worker", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_other_worker_on_hr_py", "row": "other_worker", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_other_worker_percent_py", "row": "other_worker", "mapping": "percent_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e1_total_worker_total_fy", "row": "total_worker", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e1_total_worker_on_hr_fy", "row": "total_worker", "mapping": "on_hr_fy", "uiType": "number" },
                { "name": "p5_e1_total_worker_percent_fy", "row": "total_worker", "mapping": "percent_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e1_total_worker_total_py", "row": "total_worker", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e1_total_worker_on_hr_py", "row": "total_worker", "mapping": "on_hr_py", "uiType": "number" },
                { "name": "p5_e1_total_worker_percent_py", "row": "total_worker", "mapping": "percent_py", "uiType": "number", "readOnly": true }
            ]
        },

        {
            "id": "p5_e2_minimum_wages",
            "title": "2. Details of minimum wages paid to employees and workers, in the following format:",
            "type": "table",
            "popup": true,
            "label": "Add Minimum Wages Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "total_fy", "label": "Total (A) FY (-)" },
                { "id": "equal_fy", "label": "Equal to Minimum Wage No.(B) FY (-)" },
                { "id": "equal_pct_fy", "label": "% (B / A) FY (-)" },
                { "id": "more_fy", "label": "More than Minimum Wage No.(C) FY (-)" },
                { "id": "more_pct_fy", "label": "% (C / A) FY (-)" },
                { "id": "total_py", "label": "Total (D) PY (-)" },
                { "id": "equal_py", "label": "Equal to Minimum Wage No.(E) PY (-)" },
                { "id": "equal_pct_py", "label": "% (E / D) PY (-)" },
                { "id": "more_py", "label": "More than Minimum Wage No.(F) PY (-)" },
                { "id": "more_pct_py", "label": "% (F / D) PY (-)" }
            ],
            "rows": [
                { "id": "h_emp", "label": "Employees", "isHeader": true },
                { "id": "perm_emp", "label": "Permanent", "isBold": true },
                { "id": "perm_emp_male", "label": "Male" },
                { "id": "perm_emp_female", "label": "Female" },
                { "id": "perm_emp_other", "label": "Other" },
                { "id": "other_emp", "label": "Other than Permanent", "isBold": true },
                { "id": "other_emp_male", "label": "Male" },
                { "id": "other_emp_female", "label": "Female" },
                { "id": "other_emp_other", "label": "Other" },
                { "id": "h_worker", "label": "Workers", "isHeader": true },
                { "id": "perm_worker", "label": "Permanent", "isBold": true },
                { "id": "perm_worker_male", "label": "Male" },
                { "id": "perm_worker_female", "label": "Female" },
                { "id": "perm_worker_other", "label": "Other" },
                { "id": "other_worker", "label": "Other than Permanent", "isBold": true },
                { "id": "other_worker_male", "label": "Male" },
                { "id": "other_worker_female", "label": "Female" },
                { "id": "other_worker_other", "label": "Other" }
            ],
            "fields": [
                // Permanent Employees
                { "name": "p5_e2_perm_emp_total_fy", "row": "perm_emp", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_equal_fy", "row": "perm_emp", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_equal_pct_fy", "row": "perm_emp", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_more_fy", "row": "perm_emp", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_more_pct_fy", "row": "perm_emp", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_total_py", "row": "perm_emp", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_equal_py", "row": "perm_emp", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_equal_pct_py", "row": "perm_emp", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_more_py", "row": "perm_emp", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_more_pct_py", "row": "perm_emp", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_perm_emp_male_total_fy", "row": "perm_emp_male", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_equal_fy", "row": "perm_emp_male", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_equal_pct_fy", "row": "perm_emp_male", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_male_more_fy", "row": "perm_emp_male", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_more_pct_fy", "row": "perm_emp_male", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_male_total_py", "row": "perm_emp_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_equal_py", "row": "perm_emp_male", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_equal_pct_py", "row": "perm_emp_male", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_male_more_py", "row": "perm_emp_male", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_male_more_pct_py", "row": "perm_emp_male", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_perm_emp_female_total_fy", "row": "perm_emp_female", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_equal_fy", "row": "perm_emp_female", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_equal_pct_fy", "row": "perm_emp_female", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_female_more_fy", "row": "perm_emp_female", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_more_pct_fy", "row": "perm_emp_female", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_female_total_py", "row": "perm_emp_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_equal_py", "row": "perm_emp_female", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_equal_pct_py", "row": "perm_emp_female", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_female_more_py", "row": "perm_emp_female", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_female_more_pct_py", "row": "perm_emp_female", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_perm_emp_other_total_fy", "row": "perm_emp_other", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_equal_fy", "row": "perm_emp_other", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_equal_pct_fy", "row": "perm_emp_other", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_other_more_fy", "row": "perm_emp_other", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_more_pct_fy", "row": "perm_emp_other", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_other_total_py", "row": "perm_emp_other", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_equal_py", "row": "perm_emp_other", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_equal_pct_py", "row": "perm_emp_other", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_emp_other_more_py", "row": "perm_emp_other", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_emp_other_more_pct_py", "row": "perm_emp_other", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },


                // Other than Permanent Employees
                { "name": "p5_e2_other_emp_total_fy", "row": "other_emp", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_equal_fy", "row": "other_emp", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_equal_pct_fy", "row": "other_emp", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_more_fy", "row": "other_emp", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_more_pct_fy", "row": "other_emp", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_total_py", "row": "other_emp", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_equal_py", "row": "other_emp", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_equal_pct_py", "row": "other_emp", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_more_py", "row": "other_emp", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_more_pct_py", "row": "other_emp", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_emp_male_total_fy", "row": "other_emp_male", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_equal_fy", "row": "other_emp_male", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_equal_pct_fy", "row": "other_emp_male", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_male_more_fy", "row": "other_emp_male", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_more_pct_fy", "row": "other_emp_male", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_male_total_py", "row": "other_emp_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_equal_py", "row": "other_emp_male", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_equal_pct_py", "row": "other_emp_male", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_male_more_py", "row": "other_emp_male", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_male_more_pct_py", "row": "other_emp_male", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_emp_female_total_fy", "row": "other_emp_female", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_equal_fy", "row": "other_emp_female", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_equal_pct_fy", "row": "other_emp_female", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_female_more_fy", "row": "other_emp_female", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_more_pct_fy", "row": "other_emp_female", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_female_total_py", "row": "other_emp_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_equal_py", "row": "other_emp_female", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_equal_pct_py", "row": "other_emp_female", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_female_more_py", "row": "other_emp_female", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_female_more_pct_py", "row": "other_emp_female", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_emp_other_total_fy", "row": "other_emp_other", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_equal_fy", "row": "other_emp_other", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_equal_pct_fy", "row": "other_emp_other", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_other_more_fy", "row": "other_emp_other", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_more_pct_fy", "row": "other_emp_other", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_other_total_py", "row": "other_emp_other", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_equal_py", "row": "other_emp_other", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_equal_pct_py", "row": "other_emp_other", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_emp_other_more_py", "row": "other_emp_other", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_emp_other_more_pct_py", "row": "other_emp_other", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },


                // Permanent Workers
                { "name": "p5_e2_perm_worker_total_fy", "row": "perm_worker", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_equal_fy", "row": "perm_worker", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_equal_pct_fy", "row": "perm_worker", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_more_fy", "row": "perm_worker", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_more_pct_fy", "row": "perm_worker", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_total_py", "row": "perm_worker", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_equal_py", "row": "perm_worker", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_equal_pct_py", "row": "perm_worker", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_more_py", "row": "perm_worker", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_more_pct_py", "row": "perm_worker", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_perm_worker_male_total_fy", "row": "perm_worker_male", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_equal_fy", "row": "perm_worker_male", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_equal_pct_fy", "row": "perm_worker_male", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_male_more_fy", "row": "perm_worker_male", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_more_pct_fy", "row": "perm_worker_male", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_male_total_py", "row": "perm_worker_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_equal_py", "row": "perm_worker_male", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_equal_pct_py", "row": "perm_worker_male", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_male_more_py", "row": "perm_worker_male", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_male_more_pct_py", "row": "perm_worker_male", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_perm_worker_female_total_fy", "row": "perm_worker_female", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_equal_fy", "row": "perm_worker_female", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_equal_pct_fy", "row": "perm_worker_female", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_female_more_fy", "row": "perm_worker_female", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_more_pct_fy", "row": "perm_worker_female", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_female_total_py", "row": "perm_worker_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_equal_py", "row": "perm_worker_female", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_equal_pct_py", "row": "perm_worker_female", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_female_more_py", "row": "perm_worker_female", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_female_more_pct_py", "row": "perm_worker_female", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },


                { "name": "p5_e2_perm_worker_other_total_fy", "row": "perm_worker_other", "mapping": "total_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_other_equal_fy", "row": "perm_worker_other", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_other_equal_pct_fy", "row": "perm_worker_other", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_other_more_fy", "row": "perm_worker_other", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_perm_worker_other_more_pct_fy", "row": "perm_worker_other", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_other_total_py", "row": "perm_worker_other", "mapping": "total_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_other_equal_py", "row": "perm_worker_other", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_other_equal_pct_py", "row": "perm_worker_other", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_perm_worker_other_more_py", "row": "perm_worker_other", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_perm_worker_other_more_pct_py", "row": "perm_worker_other", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                // Other than Permanent Workers
                { "name": "p5_e2_other_worker_total_fy", "row": "other_worker", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_equal_fy", "row": "other_worker", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_equal_pct_fy", "row": "other_worker", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_more_fy", "row": "other_worker", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_more_pct_fy", "row": "other_worker", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_total_py", "row": "other_worker", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_equal_py", "row": "other_worker", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_equal_pct_py", "row": "other_worker", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_more_py", "row": "other_worker", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_more_pct_py", "row": "other_worker", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_worker_male_total_fy", "row": "other_worker_male", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_equal_fy", "row": "other_worker_male", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_equal_pct_fy", "row": "other_worker_male", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_male_more_fy", "row": "other_worker_male", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_more_pct_fy", "row": "other_worker_male", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_male_total_py", "row": "other_worker_male", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_equal_py", "row": "other_worker_male", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_equal_pct_py", "row": "other_worker_male", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_male_more_py", "row": "other_worker_male", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_male_more_pct_py", "row": "other_worker_male", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_worker_female_total_fy", "row": "other_worker_female", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_equal_fy", "row": "other_worker_female", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_equal_pct_fy", "row": "other_worker_female", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_female_more_fy", "row": "other_worker_female", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_more_pct_fy", "row": "other_worker_female", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_female_total_py", "row": "other_worker_female", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_equal_py", "row": "other_worker_female", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_equal_pct_py", "row": "other_worker_female", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_female_more_py", "row": "other_worker_female", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_female_more_pct_py", "row": "other_worker_female", "mapping": "more_pct_py", "uiType": "number", "readOnly": true },

                { "name": "p5_e2_other_worker_other_total_fy", "row": "other_worker_other", "mapping": "total_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_equal_fy", "row": "other_worker_other", "mapping": "equal_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_equal_pct_fy", "row": "other_worker_other", "mapping": "equal_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_other_more_fy", "row": "other_worker_other", "mapping": "more_fy", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_more_pct_fy", "row": "other_worker_other", "mapping": "more_pct_fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_other_total_py", "row": "other_worker_other", "mapping": "total_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_equal_py", "row": "other_worker_other", "mapping": "equal_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_equal_pct_py", "row": "other_worker_other", "mapping": "equal_pct_py", "uiType": "number", "readOnly": true },
                { "name": "p5_e2_other_worker_other_more_py", "row": "other_worker_other", "mapping": "more_py", "uiType": "number" },
                { "name": "p5_e2_other_worker_other_more_pct_py", "row": "other_worker_other", "mapping": "more_pct_py", "uiType": "number", "readOnly": true }

            ]
        },

        {
            "id": "p5_e3_remuneration_median",
            "title": "3. a. Median remuneration/salary/wages of respective category:",
            "type": "table",
            "popup": true,
            "label": "Add Remuneration Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "male_no", "label": "Male - Number" },
                { "id": "male_median", "label": "Male - Median" },
                { "id": "female_no", "label": "Female - Number" },
                { "id": "female_median", "label": "Female - Median" },
                { "id": "other_no", "label": "Other - Number" },
                { "id": "other_median", "label": "Other - Median" }
            ],
            "rows": [
                { "id": "bod", "label": "Board of Directors (BoD)" },
                { "id": "kmp", "label": "Key Managerial Personnel (KMP)" },
                { "id": "emp_others", "label": "Employees other than BoD and KMP" },
                { "id": "workers", "label": "Workers" }
            ],
            "fields": [
                { "name": "p5_e3a_bod_male_no", "row": "bod", "mapping": "male_no", "uiType": "number" },
                { "name": "p5_e3a_bod_male_median", "row": "bod", "mapping": "male_median", "uiType": "number" },
                { "name": "p5_e3a_bod_female_no", "row": "bod", "mapping": "female_no", "uiType": "number" },
                { "name": "p5_e3a_bod_female_median", "row": "bod", "mapping": "female_median", "uiType": "number" },
                { "name": "p5_e3a_bod_other_no", "row": "bod", "mapping": "other_no", "uiType": "number" },
                { "name": "p5_e3a_bod_other_median", "row": "bod", "mapping": "other_median", "uiType": "number" },

                { "name": "p5_e3a_kmp_male_no", "row": "kmp", "mapping": "male_no", "uiType": "number" },
                { "name": "p5_e3a_kmp_male_median", "row": "kmp", "mapping": "male_median", "uiType": "number" },
                { "name": "p5_e3a_kmp_female_no", "row": "kmp", "mapping": "female_no", "uiType": "number" },
                { "name": "p5_e3a_kmp_female_median", "row": "kmp", "mapping": "female_median", "uiType": "number" },
                { "name": "p5_e3a_kmp_other_no", "row": "kmp", "mapping": "other_no", "uiType": "number" },
                { "name": "p5_e3a_kmp_other_median", "row": "kmp", "mapping": "other_median", "uiType": "number" },

                { "name": "p5_e3a_emp_others_male_no", "row": "emp_others", "mapping": "male_no", "uiType": "number" },
                { "name": "p5_e3a_emp_others_male_median", "row": "emp_others", "mapping": "male_median", "uiType": "number" },
                { "name": "p5_e3a_emp_others_female_no", "row": "emp_others", "mapping": "female_no", "uiType": "number" },
                { "name": "p5_e3a_emp_others_female_median", "row": "emp_others", "mapping": "female_median", "uiType": "number" },
                { "name": "p5_e3a_emp_others_other_no", "row": "emp_others", "mapping": "other_no", "uiType": "number" },
                { "name": "p5_e3a_emp_others_other_median", "row": "emp_others", "mapping": "other_median", "uiType": "number" },

                { "name": "p5_e3a_workers_male_no", "row": "workers", "mapping": "male_no", "uiType": "number" },
                { "name": "p5_e3a_workers_male_median", "row": "workers", "mapping": "male_median", "uiType": "number" },
                { "name": "p5_e3a_workers_female_no", "row": "workers", "mapping": "female_no", "uiType": "number" },
                { "name": "p5_e3a_workers_female_median", "row": "workers", "mapping": "female_median", "uiType": "number" },
                { "name": "p5_e3a_workers_other_no", "row": "workers", "mapping": "other_no", "uiType": "number" },
                { "name": "p5_e3a_workers_other_median", "row": "workers", "mapping": "other_median", "uiType": "number" }

            ]
        },
        {
            "id": "p5_e3_gross_wages_female",
            "title": "3. b. Gross wages paid to females:",
            "type": "table",
            "popup": true,
            "label": "Add Gross Wages Details",
            "fixedRows": true,
            "columns": [
                { "id": "metric", "label": "" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "gross_female", "label": "Gross wages paid to females" },
                { "id": "total_wages", "label": "Total wages" },
                { "id": "percent", "label": "Gross wages paid to females (Gross wages paid to females as % of total wages)", "isBold": true }
            ],
            "fields": [
                { "name": "p5_e3b_gross_female_fy", "row": "gross_female", "mapping": "fy", "uiType": "number" },
                { "name": "p5_e3b_gross_female_py", "row": "gross_female", "mapping": "py", "uiType": "number" },
                { "name": "p5_e3b_total_wages_fy", "row": "total_wages", "mapping": "fy", "uiType": "number" },
                { "name": "p5_e3b_total_wages_py", "row": "total_wages", "mapping": "py", "uiType": "number" },
                { "name": "p5_e3b_percent_fy", "row": "percent", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e3b_percent_py", "row": "percent", "mapping": "py", "uiType": "number", "readOnly": true }
            ]
        },

        {
            "id": "p5_e4_focal_point",
            "title": "4. Do you have a focal point (Individual/Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Do you have a focal point (Individual/Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business? (Yes/No)",
                    "name": "whether_do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                }
            ]
        },
        {
            "id": "p5_e5_internal_mechanism",
            "title": "5. Describe the internal mechanisms in place to redress grievances related to human rights issues.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Describe the internal mechanisms in place to redress grievances related to human rights issues",
                    "name": "describe_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Grievance Mechanism Details"
                }
            ]
        },
        {
            "id": "p5_e6_complaints",
            "title": "6. Number of complaints on human rights matters filed, pending and resolved",
            "type": "table",
            "popup": true,
            "label": "Add Complaints Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "Category" },
                { "id": "filed_fy", "label": "Filed during the year (FY)" },
                { "id": "pending_fy", "label": "Pending resolution at end of year (FY)" },
                { "id": "remarks_fy", "label": "Remarks (FY)" },
                { "id": "filed_py", "label": "Filed during the year (PY)" },
                { "id": "pending_py", "label": "Pending resolution at end of year (PY)" },
                { "id": "remarks_py", "label": "Remarks (PY)" }
            ],
            "rows": [
                { "id": "sexual_harassment", "label": "Sexual Harassment" },
                { "id": "discrimination", "label": "Discrimination at workplace" },
                { "id": "child_labour", "label": "Child Labour" },
                { "id": "forced_labour", "label": "Forced Labour/Involuntary Labour" },
                { "id": "wages", "label": "Wages" },
                { "id": "others", "label": "Other human rights related issues" }
            ],
            "fields": [
                { "name": "p5_e6_sexual_harassment_filed_fy", "row": "sexual_harassment", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_sexual_harassment_pending_fy", "row": "sexual_harassment", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_sexual_harassment_remarks_fy", "row": "sexual_harassment", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_sexual_harassment_filed_py", "row": "sexual_harassment", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_sexual_harassment_pending_py", "row": "sexual_harassment", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_sexual_harassment_remarks_py", "row": "sexual_harassment", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p5_e6_discrimination_filed_fy", "row": "discrimination", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_discrimination_pending_fy", "row": "discrimination", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_discrimination_remarks_fy", "row": "discrimination", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_discrimination_filed_py", "row": "discrimination", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_discrimination_pending_py", "row": "discrimination", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_discrimination_remarks_py", "row": "discrimination", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p5_e6_child_labour_filed_fy", "row": "child_labour", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_child_labour_pending_fy", "row": "child_labour", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_child_labour_remarks_fy", "row": "child_labour", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_child_labour_filed_py", "row": "child_labour", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_child_labour_pending_py", "row": "child_labour", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_child_labour_remarks_py", "row": "child_labour", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p5_e6_forced_labour_filed_fy", "row": "forced_labour", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_forced_labour_pending_fy", "row": "forced_labour", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_forced_labour_remarks_fy", "row": "forced_labour", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_forced_labour_filed_py", "row": "forced_labour", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_forced_labour_pending_py", "row": "forced_labour", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_forced_labour_remarks_py", "row": "forced_labour", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p5_e6_wages_filed_fy", "row": "wages", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_wages_pending_fy", "row": "wages", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_wages_remarks_fy", "row": "wages", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_wages_filed_py", "row": "wages", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_wages_pending_py", "row": "wages", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_wages_remarks_py", "row": "wages", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },

                { "name": "p5_e6_others_filed_fy", "row": "others", "mapping": "filed_fy", "uiType": "number" },
                { "name": "p5_e6_others_pending_fy", "row": "others", "mapping": "pending_fy", "uiType": "number" },
                { "name": "p5_e6_others_remarks_fy", "row": "others", "mapping": "remarks_fy", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p5_e6_others_filed_py", "row": "others", "mapping": "filed_py", "uiType": "number" },
                { "name": "p5_e6_others_pending_py", "row": "others", "mapping": "pending_py", "uiType": "number" },
                { "name": "p5_e6_others_remarks_py", "row": "others", "mapping": "remarks_py", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" }
            ]
        },

        {
            "id": "p5_e7_posh_complaints",
            "title": "7. Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format:",
            "type": "table",
            "popup": true,
            "label": "Add POSH Details",
            "fixedRows": true,
            "columns": [
                { "id": "metric", "label": "" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "total_posh", "label": "i) Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH)" },
                { "id": "female_count", "label": "ii) Average number of female employees/workers at the beginning of the year and as at end of the year" },
                { "id": "percent", "label": "iii) Complaints on POSH as a % of female employees / workers", "isBold": true },
                { "id": "upheld", "label": "iv) Complaints on POSH upheld" }
            ],
            "fields": [
                { "name": "p5_e7_total_posh_fy", "row": "total_posh", "mapping": "fy", "uiType": "number" },
                { "name": "p5_e7_total_posh_py", "row": "total_posh", "mapping": "py", "uiType": "number" },
                { "name": "p5_e7_female_count_fy", "row": "female_count", "mapping": "fy", "uiType": "number" },
                { "name": "p5_e7_female_count_py", "row": "female_count", "mapping": "py", "uiType": "number" },
                { "name": "p5_e7_percent_fy", "row": "percent", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p5_e7_percent_py", "row": "percent", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p5_e7_upheld_fy", "row": "upheld", "mapping": "fy", "uiType": "number" },
                { "name": "p5_e7_upheld_py", "row": "upheld", "mapping": "py", "uiType": "number" }
            ]
        },

        {
            "id": "p5_e8_discrimination_mechanisms",
            "title": "8. Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases",
                    "name": "mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },

        {
            "id": "p5_e9_hr_agreements",
            "title": "9. Do human rights requirements form part of your business agreements and contracts? (Yes/No/NA)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Do human rights requirements form part of your business agreements and contracts? (Yes/No/NA)",
                    "name": "p5_e9_hr_requirements",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "Provide Details",
                    "name": "human_rights_agreements_contracts_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": {
                        "field": "p5_e9_hr_requirements",
                        "value": "NA"
                    }
                }
            ]
        },

        {
            "id": "p5_e10_assessments",
            "title": "10. Assessments for the year:",
            "type": "table",
            "popup": true,
            "label": "Add Assessment Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "pct", "label": "% of your plants and offices that were assessed (by entity or statutory authorities or third parties)" }
            ],
            "rows": [
                { "id": "child_labour", "label": "Child labour" },
                { "id": "forced_labour", "label": "Forced/involuntary labour" },
                { "id": "sexual_harassment", "label": "Sexual harassment" },
                { "id": "discrimination", "label": "Discrimination at workplace" },
                { "id": "wages", "label": "Wages" },
                { "id": "others", "label": "Others – please specify" }
            ],
            "fields": [
                { "name": "p5_e10_child_labour_pct", "row": "child_labour", "mapping": "pct", "uiType": "number" },
                { "name": "p5_e10_forced_labour_pct", "row": "forced_labour", "mapping": "pct", "uiType": "number" },
                { "name": "p5_e10_sexual_harassment_pct", "row": "sexual_harassment", "mapping": "pct", "uiType": "number" },
                { "name": "p5_e10_discrimination_pct", "row": "discrimination", "mapping": "pct", "uiType": "number" },
                { "name": "p5_e10_wages_pct", "row": "wages", "mapping": "pct", "uiType": "number" },
                { "name": "p5_e10_others_details", "row": "others", "mapping": "pct", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" }
            ]
        },

        {
            "id": "p5_e11_corrective_actions",
            "title": "11. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide details of any corrective actions taken or underway",
                    "name": "p5_e11_corrective_actions_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        }
    ],
    "Section C: Principle 5 Leadership Indicators": [
        {
            "id": "p5_l1_business_process_modified",
            "title": "1. Details of a business process being modified / Introduced as a result of addressing human rights grievances/complaints.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of a business process being modified / Introduced as a result of addressing human rights grievances/complaints",
                    "name": "details_of_a_business_process_being_modified_introduced_as_a_result_of_addressing_human_rights_grievances_complaints",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p5_l2_due_diligence",
            "title": "2. Details of the scope and coverage of any Human rights due-diligence conducted",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of the scope and coverage of any Human rights due-diligence conducted",
                    "name": "details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p5_l3_accessibility",
            "title": "3. Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Is the premise/office of the entity accessible to differently abled visitors? (Yes/No)",
                    "name": "whether_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                }
            ]
        },
        {
            "id": "p5_l4_value_chain_assessments",
            "title": "4. Details on assessment of value chain partners:",
            "type": "table",
            "popup": true,
            "label": "Add Assessment Details",
            "fixedRows": true,
            "columns": [
                { "id": "category", "label": "" },
                { "id": "pct", "label": "% of value chain partners (by value of business done with such partners) that were assessed" }
            ],
            "rows": [
                { "id": "sexual_harassment", "label": "Sexual harassment" },
                { "id": "discrimination", "label": "Discrimination at workplace" },
                { "id": "child_labour", "label": "Child Labour" },
                { "id": "forced_labour", "label": "Forced Labour/Involuntary Labour" },
                { "id": "wages", "label": "Wages" },
                { "id": "others", "label": "Others – please specify" }
            ],
            "fields": [
                { "name": "p5_l4_sexual_harassment_pct", "row": "sexual_harassment", "mapping": "pct", "uiType": "number" },
                { "name": "p5_l4_discrimination_pct", "row": "discrimination", "mapping": "pct", "uiType": "number" },
                { "name": "p5_l4_child_labour_pct", "row": "child_labour", "mapping": "pct", "uiType": "number" },
                { "name": "p5_l4_forced_labour_pct", "row": "forced_labour", "mapping": "pct", "uiType": "number" },
                { "name": "p5_l4_wages_pct", "row": "wages", "mapping": "pct", "uiType": "number" },
                { "name": "p5_l4_others_details", "row": "others", "mapping": "pct", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" }
            ]
        },
        {
            "id": "p5_l5_corrective_actions_vc",
            "title": "5. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide details of any corrective actions taken or underway",
                    "name": "details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p5_l_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_for_principle_5_leadership_indicators",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 6 Essential Indicators": [
        {
            "id": "p6_e1_energy_consumption_v2",
            "title": "1. Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether total energy consumption and energy intensity is applicable to the company?",
                    "name": "p6_e1_applicability",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "Revenue from operations (in Rs.)",
                    "type": "group",
                    "fields": [
                        { "name": "p6_e1_revenue_fy", "label": "FY (-)", "uiType": "number" },
                        { "name": "p6_e1_revenue_py", "label": "PY (-)", "uiType": "number" }
                    ]
                }
            ]
        },
        {
            "id": "p6_e1_energy_table",
            "type": "table",
            "popup": true,
            "label": "Add Energy Details",
            "fixedRows": true,
            "dependsOn": { "field": "p6_e1_applicability", "value": "Yes" },
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "units", "label": "Units" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" },
                { "id": "details", "label": "" }
            ],
            "rows": [
                { "id": "h_renewable", "label": "From renewable sources", "isHeader": true },
                { "id": "renew_elec", "label": "Total electricity consumption (A)" },
                { "id": "renew_fuel", "label": "Total fuel consumption (B)" },
                { "id": "renew_other", "label": "Energy consumption through other sources (C)" },
                { "id": "total_renew", "label": "Total energy consumed from renewable sources (A+B+C)", "isBold": true },

                { "id": "h_non_renewable", "label": "From non-renewable sources", "isHeader": true },
                { "id": "non_renew_elec", "label": "Total electricity consumption (D)" },
                { "id": "non_renew_fuel", "label": "Total fuel consumption (E)" },
                { "id": "non_renew_other", "label": "Energy consumption through other sources (F)" },
                { "id": "total_non_renew", "label": "Total energy consumed from non-renewable sources (D+E+F)", "isBold": true },

                { "id": "grand_total", "label": "Total energy consumed (A+B+C+D+E+F)", "isBold": true },

                { "id": "intensity_turnover", "label": "Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations)" },
                { "id": "intensity_ppp", "label": "Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)" },
                { "id": "intensity_physical", "label": "Energy intensity in terms of physical Output" },
                { "id": "intensity_optional", "label": "Energy intensity (optional) – the relevant metric may be selected by the entity" }
            ],
            "fields": [
                {
                    "name": "p6_e1_unit_master",
                    "row": "renew_elec",
                    "mapping": "units",
                    "uiType": "select",
                    "options": ["Joule (J)", "Kilojoule (KJ)", "Gigajoule (GJ)", "Megajoule (MJ)", "Terajoule (TJ)"]
                },
                { "name": "p6_e1_renew_fuel_units", "row": "renew_fuel", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_renew_other_units", "row": "renew_other", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_total_renew_units", "row": "total_renew", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_non_renew_elec_units", "row": "non_renew_elec", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_non_renew_fuel_units", "row": "non_renew_fuel", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_non_renew_other_units", "row": "non_renew_other", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_total_non_renew_units", "row": "total_non_renew", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_grand_total_units", "row": "grand_total", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_intensity_turnover_units", "row": "intensity_turnover", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_intensity_ppp_units", "row": "intensity_ppp", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_intensity_physical_units", "row": "intensity_physical", "mapping": "units", "readOnly": true },
                { "name": "p6_e1_intensity_optional_units", "row": "intensity_optional", "mapping": "units", "readOnly": true },

                { "name": "p6_e1_renew_elec_fy", "row": "renew_elec", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_renew_elec_py", "row": "renew_elec", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_renew_fuel_fy", "row": "renew_fuel", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_renew_fuel_py", "row": "renew_fuel", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_renew_other_fy", "row": "renew_other", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_renew_other_py", "row": "renew_other", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_renew_other_details", "row": "renew_other", "mapping": "details", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add details" },
                { "name": "p6_e1_total_renew_fy", "row": "total_renew", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e1_total_renew_py", "row": "total_renew", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e1_non_renew_elec_fy", "row": "non_renew_elec", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_non_renew_elec_py", "row": "non_renew_elec", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_non_renew_fuel_fy", "row": "non_renew_fuel", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_non_renew_fuel_py", "row": "non_renew_fuel", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_non_renew_other_fy", "row": "non_renew_other", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_non_renew_other_py", "row": "non_renew_other", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_non_renew_other_details", "row": "non_renew_other", "mapping": "details", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add details" },
                { "name": "p6_e1_total_non_renew_fy", "row": "total_non_renew", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e1_total_non_renew_py", "row": "total_non_renew", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e1_grand_total_fy", "row": "grand_total", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e1_grand_total_py", "row": "grand_total", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e1_intensity_turnover_fy", "row": "intensity_turnover", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e1_intensity_turnover_py", "row": "intensity_turnover", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p6_e1_intensity_ppp_fy", "row": "intensity_ppp", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_intensity_ppp_py", "row": "intensity_ppp", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_intensity_physical_fy", "row": "intensity_physical", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_intensity_physical_py", "row": "intensity_physical", "mapping": "py", "uiType": "number" },
                { "name": "p6_e1_intensity_optional_fy", "row": "intensity_optional", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e1_intensity_optional_py", "row": "intensity_optional", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p6_e1_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_e1_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e1_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e1_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e2_water_withdrawal",
            "title": "2. Does the entity have procedures in place for sustainable sourcing? (Yes/No)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Does the entity have procedures in place for sustainable sourcing (including transportation)? (Yes/No)",
                    "name": "whether_the_entity_has_procedures_in_place_for_sustainable_sourcing",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If yes, what percentage of inputs were sourced sustainably?",
                    "name": "if_yes_what_percentage_of_inputs_were_sourced_sustainably",
                    "uiType": "number",
                    "dependsOn": { "field": "whether_the_entity_has_procedures_in_place_for_sustainable_sourcing", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e3_water_withdrawal_v2",
            "title": "3. Provide details of the following disclosures related to water, in the following format:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether water withdrawal, consumption and intensity disclosures are applicable to the company?",
                    "name": "p6_e3_applicability",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "Revenue and Turnover details (in Rs.)",
                    "type": "group",
                    "fields": [
                        { "name": "p6_e3_revenue_fy", "label": "Revenue from operations (FY) (-)", "uiType": "number" },
                        { "name": "p6_e3_revenue_py", "label": "Revenue from operations (PY) (-)", "uiType": "number" },
                        { "name": "p6_e3_revenue_ppp_fy", "label": "Revenue adjusted for PPP (FY) (-)", "uiType": "number" },
                        { "name": "p6_e3_revenue_ppp_py", "label": "Revenue adjusted for PPP (PY) (-)", "uiType": "number" }
                    ],
                    "dependsOn": { "field": "p6_e3_applicability", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e3_water_withdrawal_consumption",
            "type": "table",
            "popup": true,
            "label": "Add Water Details",
            "fixedRows": true,
            "dependsOn": { "field": "p6_e3_applicability", "value": "Yes" },
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "h_withdrawal", "label": "Water withdrawal by source (in kilolitres)", "isHeader": true },
                { "id": "surface", "label": "(i) Surface water" },
                { "id": "ground", "label": "(ii) Groundwater" },
                { "id": "third_party", "label": "(iii) Third party water" },
                { "id": "seawater", "label": "(iv) Seawater / desalinated water" },
                { "id": "others", "label": "(v) Others" },
                { "id": "total_withdrawal", "label": "Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)", "isBold": true },
                { "id": "h_consumption", "label": "Water consumption", "isHeader": true },
                { "id": "total_consumption", "label": "Total volume of water consumption (in kilolitres)", "isBold": true },
                { "id": "intensity_turnover", "label": "Water intensity per rupee of turnover (Total water consumption / Revenue from operations)" },
                { "id": "intensity_ppp", "label": "Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)" },
                { "id": "intensity_physical", "label": "Water intensity in terms of physical output" },
                { "id": "intensity_optional", "label": "Water intensity (optional) – the relevant metric may be selected by the entity" }
            ],
            "fields": [
                { "name": "p6_e3_surface_fy", "row": "surface", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_surface_py", "row": "surface", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_ground_fy", "row": "ground", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_ground_py", "row": "ground", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_third_party_fy", "row": "third_party", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_third_party_py", "row": "third_party", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_seawater_fy", "row": "seawater", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_seawater_py", "row": "seawater", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_others_fy", "row": "others", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_others_py", "row": "others", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_total_withdrawal_fy", "row": "total_withdrawal", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e3_total_withdrawal_py", "row": "total_withdrawal", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e3_total_consumption_fy", "row": "total_consumption", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_total_consumption_py", "row": "total_consumption", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_intensity_turnover_fy", "row": "intensity_turnover", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e3_intensity_turnover_py", "row": "intensity_turnover", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p6_e3_intensity_ppp_fy", "row": "intensity_ppp", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e3_intensity_ppp_py", "row": "intensity_ppp", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p6_e3_intensity_physical_fy", "row": "intensity_physical", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_intensity_physical_py", "row": "intensity_physical", "mapping": "py", "uiType": "number" },
                { "name": "p6_e3_intensity_optional_fy", "row": "intensity_optional", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e3_intensity_optional_py", "row": "intensity_optional", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p6_e3_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Yes/No)",
                    "name": "p6_e3_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"],
                    "dependsOn": { "field": "p6_e3_applicability", "value": "Yes" }
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e3_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e3_independent_assessment", "value": "Yes" }
                }
            ]
        },

        {
            "id": "p6_e4_water_discharge",
            "title": "4. Provide the following details related to water discharged:",
            "type": "table",
            "popup": true,
            "label": "Add Water Discharge Details",
            "fixedRows": true,
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "h_destination", "label": "Water discharge by destination and level of treatment (in kilolitres)", "isHeader": true },
                { "id": "surface_header", "label": "(i) To Surface water", "isBold": true },
                { "id": "surface_none", "label": "No treatment" },
                { "id": "surface_treat", "label": "With treatment – please specify level of treatment" },

                { "id": "ground_header", "label": "(ii) To Groundwater", "isBold": true },
                { "id": "ground_none", "label": "No treatment" },
                { "id": "ground_treat", "label": "With treatment – please specify level of treatment" },

                { "id": "sea_header", "label": "(iii) To Seawater", "isBold": true },
                { "id": "sea_none", "label": "No treatment" },
                { "id": "sea_treat", "label": "With treatment – please specify level of treatment" },

                { "id": "third_header", "label": "(iv) Sent to third-parties", "isBold": true },
                { "id": "third_none", "label": "No treatment" },
                { "id": "third_treat", "label": "With treatment – please specify level of treatment" },

                { "id": "others_header", "label": "(v) Others", "isBold": true },
                { "id": "others_none", "label": "No treatment" },
                { "id": "others_treat", "label": "With treatment – please specify level of treatment" },

                { "id": "total_discharge", "label": "Total water discharged (in kilolitres)", "isBold": true }
            ],
            "fields": [
                { "name": "p6_e4_surface_none_fy", "row": "surface_none", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_surface_none_py", "row": "surface_none", "mapping": "py", "uiType": "number" },
                { "name": "p6_e4_surface_treat_fy", "row": "surface_treat", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_surface_treat_py", "row": "surface_treat", "mapping": "py", "uiType": "number" },

                { "name": "p6_e4_ground_none_fy", "row": "ground_none", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_ground_none_py", "row": "ground_none", "mapping": "py", "uiType": "number" },
                { "name": "p6_e4_ground_treat_fy", "row": "ground_treat", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_ground_treat_py", "row": "ground_treat", "mapping": "py", "uiType": "number" },

                { "name": "p6_e4_sea_none_fy", "row": "sea_none", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_sea_none_py", "row": "sea_none", "mapping": "py", "uiType": "number" },
                { "name": "p6_e4_sea_treat_fy", "row": "sea_treat", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_sea_treat_py", "row": "sea_treat", "mapping": "py", "uiType": "number" },

                { "name": "p6_e4_third_none_fy", "row": "third_none", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_third_none_py", "row": "third_none", "mapping": "py", "uiType": "number" },
                { "name": "p6_e4_third_treat_fy", "row": "third_treat", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_third_treat_py", "row": "third_treat", "mapping": "py", "uiType": "number" },

                { "name": "p6_e4_others_none_fy", "row": "others_none", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_others_none_py", "row": "others_none", "mapping": "py", "uiType": "number" },
                { "name": "p6_e4_others_treat_fy", "row": "others_treat", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e4_others_treat_py", "row": "others_treat", "mapping": "py", "uiType": "number" },

                { "name": "p6_e4_total_discharge_fy", "row": "total_discharge", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e4_total_discharge_py", "row": "total_discharge", "mapping": "py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p6_e4_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_e4_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e4_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e4_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e5_zld_details",
            "title": "5. Has the entity implemented a mechanism for Zero Liquid Discharge?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "5. Has the entity implemented a mechanism for Zero Liquid Discharge? (Yes/No/NA)",
                    "name": "p6_e5_zld_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, provide details of its coverage and implementation.",
                    "name": "p6_e5_zld_details_yes",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e5_zld_status", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p6_e5_zld_details_na",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e5_zld_status", "value": "NA" }
                }
            ]
        },

        {
            "id": "p6_e6_air_emissions_v2",
            "title": "6. Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether air emissions (other than GHG emissions) by the entity is applicable to the company?",
                    "name": "p6_e6_applicability",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                }
            ]
        },
        {
            "id": "p6_e6_air_emissions",
            "type": "table",
            "popup": true,
            "label": "Add Air Emissions Details",
            "fixedRows": true,
            "dependsOn": { "field": "p6_e6_applicability", "value": "Yes" },
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "unit", "label": "Please specify unit" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "nox", "label": "NOx" },
                { "id": "sox", "label": "SOx" },
                { "id": "pm", "label": "Particulate matter (PM)" },
                { "id": "pop", "label": "Persistent organic pollutants (POP)" },
                { "id": "voc", "label": "Volatile organic compounds (VOC)" },
                { "id": "hap", "label": "Hazardous air pollutants (HAP)" },
                { "id": "others", "label": "Others – please specify" }
            ],
            "fields": [
                { "name": "p6_e6_nox_unit", "row": "nox", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_nox_fy", "row": "nox", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_nox_py", "row": "nox", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_sox_unit", "row": "sox", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_sox_fy", "row": "sox", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_sox_py", "row": "sox", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_pm_unit", "row": "pm", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_pm_fy", "row": "pm", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_pm_py", "row": "pm", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_pop_unit", "row": "pop", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_pop_fy", "row": "pop", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_pop_py", "row": "pop", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_voc_unit", "row": "voc", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_voc_fy", "row": "voc", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_voc_py", "row": "voc", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_hap_unit", "row": "hap", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_hap_fy", "row": "hap", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_hap_py", "row": "hap", "mapping": "py", "uiType": "number" },

                { "name": "p6_e6_others_unit", "row": "others", "mapping": "unit", "uiType": "select", "options": ["Tonne", "Kilotonne", "mg/m3", "ug/m3", "Kg/Day", "Kg", "mg/Nm3", "kgSOxe", "Tonnes/Year", "Parts Per Million (PPM)", "tCO2e", "Kg/Year"] },
                { "name": "p6_e6_others_fy", "row": "others", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e6_others_py", "row": "others", "mapping": "py", "uiType": "number" },
                { "name": "p6_e6_others_details", "row": "others", "mapping": "parameter", "uiType": "text", "placeholder": "Specify other pollutant..." }
            ]
        },
        {
            "id": "p6_e6_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_e6_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"],
                    "dependsOn": { "field": "p6_e6_applicability", "value": "Yes" }
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e6_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e6_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e7_ghg_applicability",
            "title": "7. Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity is applicable to the company?",
                    "name": "p6_e7_applicability",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                }
            ]
        },
        {
            "id": "p6_e7_ghg_emissions",
            "type": "table",
            "popup": true,
            "label": "Add GHG Details",
            "fixedRows": true,
            "dependsOn": { "field": "p6_e7_applicability", "value": "Yes" },
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "unit", "label": "Unit" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "scope1", "label": "Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)" },
                { "id": "scope2", "label": "Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)" },
                { "id": "intensity_turnover", "label": "Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)" },
                { "id": "intensity_ppp", "label": "Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)" },
                { "id": "intensity_physical", "label": "Total Scope 1 and Scope 2 emission intensity in terms of physical output" },
                { "id": "intensity_optional", "label": "Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity" }
            ],
            "fields": [
                { "name": "p6_e7_scope1_unit", "row": "scope1", "mapping": "unit", "uiType": "select", "options": ["tCO2e", "ktCO2e", "MtCO2e", "GtCO2e"] },
                { "name": "p6_e7_scope1_fy", "row": "scope1", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e7_scope1_py", "row": "scope1", "mapping": "py", "uiType": "number" },

                { "name": "p6_e7_scope2_unit", "row": "scope2", "mapping": "unit", "uiType": "text", "readOnly": true },
                { "name": "p6_e7_scope2_fy", "row": "scope2", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e7_scope2_py", "row": "scope2", "mapping": "py", "uiType": "number" },

                { "name": "p6_e7_intensity_turnover_unit", "row": "intensity_turnover", "mapping": "unit", "uiType": "text", "readOnly": true },
                { "name": "p6_e7_intensity_turnover_fy", "row": "intensity_turnover", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e7_intensity_turnover_py", "row": "intensity_turnover", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e7_intensity_ppp_unit", "row": "intensity_ppp", "mapping": "unit", "uiType": "text", "readOnly": true },
                { "name": "p6_e7_intensity_ppp_fy", "row": "intensity_ppp", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e7_intensity_ppp_py", "row": "intensity_ppp", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e7_intensity_physical_unit", "row": "intensity_physical", "mapping": "unit", "uiType": "text", "readOnly": true },
                { "name": "p6_e7_intensity_physical_fy", "row": "intensity_physical", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e7_intensity_physical_py", "row": "intensity_physical", "mapping": "py", "uiType": "number" },

                { "name": "p6_e7_intensity_optional_unit", "row": "intensity_optional", "mapping": "unit", "uiType": "text", "readOnly": true },
                { "name": "p6_e7_intensity_optional_fy", "row": "intensity_optional", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e7_intensity_optional_py", "row": "intensity_optional", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p6_e7_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_e7_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"],
                    "dependsOn": { "field": "p6_e7_applicability", "value": "Yes" }
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e7_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e7_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e8_ghg_projects",
            "title": "8. Does the entity have any project related to reducing Green House Gas emission?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "8. Does the entity have any project related to reducing Green House Gas emission? (Yes/No/NA)",
                    "name": "p6_e8_project_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If Yes, then provide details.",
                    "name": "p6_e8_project_details_yes",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e8_project_status", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p6_e8_project_details_na",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e8_project_status", "value": "NA" }
                }
            ]
        },
        {
            "id": "p6_e9_waste_generation",
            "title": "9. Provide details related to waste management by the entity, in the following format:",
            "type": "table",
            "popup": true,
            "label": "Add Waste Generation Details",
            "fixedRows": true,
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "h_generation", "label": "Total Waste generated (in metric tonnes)", "isHeader": true },
                { "id": "plastic", "label": "Plastic waste (A)" },
                { "id": "e_waste", "label": "E-waste (B)" },
                { "id": "bio_medical", "label": "Bio-medical waste (C)" },
                { "id": "construction", "label": "Construction and demolition waste (D)" },
                { "id": "battery", "label": "Battery waste (E)" },
                { "id": "radioactive", "label": "Radioactive waste (F)" },
                { "id": "haz_other", "label": "Other Hazardous waste. (G)" },
                { "id": "non_haz_other", "label": "Other Non-hazardous waste generated (H). (Break-up by composition i.e. by materials relevant to the sector)" },
                { "id": "total_waste", "label": "Total (A+B + C + D + E + F + G + H)", "isBold": true },
                { "id": "intensity_turnover", "label": "Waste intensity per rupee of turnover (Total waste generated / Revenue from operations)" },
                { "id": "intensity_ppp", "label": "Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)" },
                { "id": "intensity_physical", "label": "Waste intensity in terms of physical output" },
                { "id": "intensity_optional", "label": "Waste intensity (optional) – the relevant metric may be selected by the entity" }
            ],
            "fields": [
                { "name": "p6_e9_plastic_fy", "row": "plastic", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_plastic_py", "row": "plastic", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_ewaste_fy", "row": "e_waste", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_ewaste_py", "row": "e_waste", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_biomed_fy", "row": "bio_medical", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_biomed_py", "row": "bio_medical", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_construction_fy", "row": "construction", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_construction_py", "row": "construction", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_battery_fy", "row": "battery", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_battery_py", "row": "battery", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_radioactive_fy", "row": "radioactive", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_radioactive_py", "row": "radioactive", "mapping": "py", "uiType": "number" },

                { "name": "p6_e9_haz_other_fy", "row": "haz_other", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_haz_other_py", "row": "haz_other", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_haz_other_details", "row": "haz_other", "mapping": "parameter", "uiType": "text", "placeholder": "Specify hazardous waste (G)..." },

                { "name": "p6_e9_nonhaz_other_fy", "row": "non_haz_other", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_nonhaz_other_py", "row": "non_haz_other", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_nonhaz_other_details", "row": "non_haz_other", "mapping": "parameter", "uiType": "text", "placeholder": "Specify non-hazardous waste (H)..." },

                { "name": "p6_e9_total_generation_fy", "row": "total_waste", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_total_generation_py", "row": "total_waste", "mapping": "py", "uiType": "number", "readOnly": true },

                { "name": "p6_e9_intensity_turnover_fy", "row": "intensity_turnover", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_intensity_turnover_py", "row": "intensity_turnover", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_intensity_ppp_fy", "row": "intensity_ppp", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_intensity_ppp_py", "row": "intensity_ppp", "mapping": "py", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_intensity_physical_fy", "row": "intensity_physical", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_intensity_physical_py", "row": "intensity_physical", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_intensity_optional_fy", "row": "intensity_optional", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_intensity_optional_py", "row": "intensity_optional", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p6_e9_waste_recovery",
            "title": "For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (In metric tonnes)",
            "type": "table",
            "popup": true,
            "label": "Add Recovery Details",
            "fixedRows": true,
            "columns": [
                { "id": "parameter", "label": "Category of waste" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "recycled", "label": "(i) Recycled" },
                { "id": "reused", "label": "(ii) Re-used" },
                { "id": "other_recovery", "label": "(iii) Other recovery operations" },
                { "id": "total_recovered", "label": "Total", "isBold": true }
            ],
            "fields": [
                { "name": "p6_e9_recycled_fy", "row": "recycled", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_recycled_py", "row": "recycled", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_reused_fy", "row": "reused", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_reused_py", "row": "reused", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_other_recovery_fy", "row": "other_recovery", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_other_recovery_py", "row": "other_recovery", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_total_recovered_fy", "row": "total_recovered", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_total_recovered_py", "row": "total_recovered", "mapping": "py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p6_e9_waste_disposal",
            "title": "For each category of waste generated, total waste disposed by nature of disposal method (In metric tonnes)",
            "type": "table",
            "popup": true,
            "label": "Add Disposal Details",
            "fixedRows": true,
            "columns": [
                { "id": "parameter", "label": "Category of waste" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "incineration", "label": "(i) Incineration" },
                { "id": "landfilling", "label": "(ii) Landfilling" },
                { "id": "other_disposal", "label": "(iii) Other disposal operations" },
                { "id": "total_disposed", "label": "Total", "isBold": true }
            ],
            "fields": [
                { "name": "p6_e9_incineration_fy", "row": "incineration", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_incineration_py", "row": "incineration", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_landfilling_fy", "row": "landfilling", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_landfilling_py", "row": "landfilling", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_other_disposal_fy", "row": "other_disposal", "mapping": "fy", "uiType": "number" },
                { "name": "p6_e9_other_disposal_py", "row": "other_disposal", "mapping": "py", "uiType": "number" },
                { "name": "p6_e9_total_disposed_fy", "row": "total_disposed", "mapping": "fy", "uiType": "number", "readOnly": true },
                { "name": "p6_e9_total_disposed_py", "row": "total_disposed", "mapping": "py", "uiType": "number", "readOnly": true }
            ]
        },
        {
            "id": "p6_e9_assessment",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_e9_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_e9_external_agency_name",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e9_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_e10_waste_practices",
            "title": "10. Briefly describe the waste management practices adopted in your establishments.",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "10. Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.",
                    "name": "p6_e10_waste_practices_text",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p6_e11_ecologically_sensitive",
            "title": "11. If the entity has operations/offices in/around ecologically sensitive areas",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "11. If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:",
                    "name": "p6_e11_sensitive_areas_details",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "location", "label": "Location of operations/offices" },
                        { "id": "type", "label": "Type of operations" },
                        { "id": "clearance_conditions", "label": "Whether the conditions of environmental approval / clearances are being complied with? (Yes/No)" },
                        { "id": "actions", "label": "If no, the reasons thereof and corrective action taken, if any" }
                    ],
                    "defaultRow": {
                        "location": "",
                        "type": "",
                        "clearance_conditions": "",
                        "actions": ""
                    }
                }
            ]
        },
        {
            "id": "p6_e12_environmental_impact",
            "title": "12. Details of environmental impact assessments of projects undertaken by the entity",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "12. Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:",
                    "name": "p6_e12_eia_details",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "project_name", "label": "Name and brief details of project" },
                        { "id": "eia_notification", "label": "EIA Notification No." },
                        { "id": "date", "label": "Date" },
                        { "id": "independent_assessment", "label": "Whether conducted by independent external agency (Yes/No)" },
                        { "id": "results_public", "label": "Results communicated in public domain (Yes/No)" },
                        { "id": "web_link", "label": "Relevant Web link" }
                    ],
                    "defaultRow": {
                        "project_name": "",
                        "eia_notification": "",
                        "date": "",
                        "independent_assessment": "",
                        "results_public": "",
                        "web_link": ""
                    }
                }
            ]
        },
        {
            "id": "p6_e13_compliance_status",
            "title": "13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N/NA).",
                    "name": "p6_e13_is_compliant",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If not, provide details of all such non-compliances, in the following format:",
                    "name": "p6_e13_non_compliance_details",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e13_is_compliant", "value": "No" },
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "law_name", "label": "Name of the law / regulation / guidelines which was not complied with" },
                        { "id": "non_compliance_brief", "label": "Any fines / penalties / action taken by regulatory agencies such as pollution control boards or courts" },
                        { "id": "corrective_action", "label": "Corrective action taken, if any" }
                    ],
                    "defaultRow": {
                        "law_name": "",
                        "non_compliance_brief": "",
                        "corrective_action": ""
                    }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p6_e13_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_e13_is_compliant", "value": "NA" }
                }
            ]
        }
    ],
    "Section C: Principle 6 Leadership Indicators": [
        {
            "id": "p6_l1_water_stress",
            "title": "1. Water withdrawal, consumption and discharge in areas of water stress (in kilolitres):",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "For each facility / plant located in areas of water stress, provide the following information:",
                    "name": "p6_l1_facility_details",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "facility_name", "label": "Name of area / facility" },
                        { "id": "nature_ops", "label": "Nature of operations" },
                        { "id": "withdrawal", "label": "Water withdrawal" },
                        { "id": "consumption", "label": "Water consumption" },
                        { "id": "discharge", "label": "Water discharge" }
                    ],
                    "defaultRow": { "facility_name": "", "nature_ops": "", "withdrawal": "", "consumption": "", "discharge": "" }
                },
                {
                    "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_l1_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_l1_external_agency_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_l1_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_l2_scope3_emissions_applicability",
            "title": "2. Please provide details of total Scope 3 emissions & its intensity, in the following format:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Whether total Scope 3 emissions & its intensity is applicable to the company?",
                    "name": "p6_l2_is_applicable",
                    "uiType": "select",
                    "options": ["Yes", "No"]
                }
            ]
        },
        {
            "id": "p6_l2_scope3_table",
            "title": "",
            "type": "table",
            "popup": false,
            "columns": [
                { "id": "parameter", "label": "Parameter" },
                { "id": "unit", "label": "Unit" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "total_scope3", "label": "Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)" },
                { "id": "intensity_turnover", "label": "Total Scope 3 emissions per rupee of turnover" },
                { "id": "intensity_optional", "label": "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity" }
            ],
            "fields": [
                { "name": "p6_l2_scope3_unit", "row": "total_scope3", "mapping": "unit", "uiType": "select", "options": ["tCO2e", "ktCO2e", "MtCO2e", "GtCO2e"], "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_scope3_fy", "row": "total_scope3", "mapping": "fy", "uiType": "number", "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_scope3_py", "row": "total_scope3", "mapping": "py", "uiType": "number", "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },

                { "name": "p6_l2_turnover_unit", "row": "intensity_turnover", "mapping": "unit", "uiType": "text", "readOnly": true, "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_turnover_fy", "row": "intensity_turnover", "mapping": "fy", "uiType": "number", "readOnly": true, "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_turnover_py", "row": "intensity_turnover", "mapping": "py", "uiType": "number", "readOnly": true, "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },

                { "name": "p6_l2_optional_unit", "row": "intensity_optional", "mapping": "unit", "uiType": "select", "options": ["tCO2e", "ktCO2e", "MtCO2e", "GtCO2e"], "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_optional_fy", "row": "intensity_optional", "mapping": "fy", "uiType": "number", "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true },
                { "name": "p6_l2_optional_py", "row": "intensity_optional", "mapping": "py", "uiType": "number", "dependsOn": { "field": "p6_l2_is_applicable", "value": "Yes" }, "showWhenDisabled": true }
            ]
        },
        {
            "id": "p6_l2_assessment",
            "title": "",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
                    "name": "p6_l2_independent_assessment",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, name of the external agency.",
                    "name": "p6_l2_external_agency_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_l2_independent_assessment", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p6_l3_biodiversity_impact",
            "title": "3. With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "3. With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities.",
                    "name": "p6_l3_biodiversity_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p6_l4_innovative_tech",
            "title": "4. Specifically initiatives or used innovative technology or solutions to improve resource efficiency",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "4. If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:",
                    "name": "p6_l4_tech_details",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sno", "label": "Sr. No." },
                        { "id": "initiative", "label": "Initiative undertaken" },
                        { "id": "details", "label": "Details of the initiative" },
                        { "id": "outcome", "label": "Outcome of the initiative" }
                    ],
                    "defaultRow": { "initiative": "", "details": "", "outcome": "" }
                }
            ]
        },
        {
            "id": "p6_l5_continuity_plan",
            "title": "5. Does the entity have a business continuity and disaster management plan?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "5. Does the entity have a business continuity and disaster management plan? (Yes/No/NA)",
                    "name": "p6_l5_continuity_status",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "Details of entity at which business continuity and disaster management plan is placed or weblink.",
                    "name": "p6_l5_plan_location",
                    "uiType": "text",
                    "placeholder": "Enter location or weblink...",
                    "dependsOn": { "field": "p6_l5_continuity_status", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p6_l5_continuity_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "p6_l5_continuity_status", "value": "NA" }
                }
            ]
        },
        {
            "id": "p6_l6_value_chain_impact",
            "title": "6. Significant adverse impact to the environment arising from value chain",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "6. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.",
                    "name": "p6_l6_impact_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p6_l7_partner_assessment",
            "title": "7. Percentage of value chain partners assessed for environmental impacts",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "7. Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.",
                    "name": "p6_l7_partner_assessment_pct",
                    "uiType": "number"
                }
            ]
        },
        {
            "id": "p6_l8_green_credits",
            "title": "8. How many Green Credits have been generated or procured:",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "a. By the listed entity",
                    "name": "p6_l8_credits_listed_entity",
                    "uiType": "number"
                },
                {
                    "label": "b. By the top ten (in terms of value of purchases and sales, respectively) value chain partners",
                    "name": "p6_l8_credits_partners",
                    "uiType": "number"
                }
            ]
        },
        {
            "id": "p6_l_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "p6_l_notes_text",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 7 Essential Indicators": [
        {
            "id": "p7_e1_affiliations_number",
            "title": "1. a. Number of affiliations with trade and industry chambers/ associations",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Number of affiliations with trade and industry chambers/ associations",
                    "name": "number_of_affiliations_with_trade_and_industry_chambers_or_associations",
                    "uiType": "number"
                }
            ]
        },
        {
            "id": "p7_e1_affiliations_list",
            "title": "b. List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to",
            "type": "table",
            "popup": false,
            "dynamic": true,
            "storageField": "p7_e1_affiliations_list_data",
            "dynamicRowCount": {
                "field": "number_of_affiliations_with_trade_and_industry_chambers_or_associations",
                "max": 10
            },
            "columns": [
                { "id": "sno", "label": "Sr. No." },
                { "id": "name", "label": "Name of the trade and industry chambers/ associations" },
                { "id": "reach", "label": "Reach of trade and industry chambers/ associations (State/National/International)" }
            ],
            "defaultRow": {
                "name": "",
                "reach": ""
            }
        },
        {
            "id": "p7_e2_anti_competitive_conduct",
            "title": "2. Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities",
                    "name": "provide_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. No." },
                        { "id": "name_of_authority", "label": "Name of authority" },
                        { "id": "brief_of_case", "label": "Brief of the case" },
                        { "id": "corrective_action_taken", "label": "Corrective action taken" }
                    ],
                    "defaultRow": {
                        "name_of_authority": "",
                        "brief_of_case": "",
                        "corrective_action_taken": ""
                    }
                }
            ]
        }
    ],
    "Section C: Principle 7 Leadership Indicators": [
        {
            "id": "p7_l1_public_policy_positions",
            "title": "1. Details of public policy positions advocated by the entity",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of public policy positions advocated by the entity",
                    "name": "details_of_public_policy_positions_advocated_by_the_entity_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. no." },
                        { "id": "public_policy_advocated", "label": "Public policy advocated" },
                        { "id": "method_resorted", "label": "Method resorted for such advocacy" },
                        { "id": "information_available_in_public_domain", "label": "Whether information available in public domain? (Yes/No)" },
                        { "id": "frequency_of_review_by_board", "label": "Frequency of Review by Board" },
                        { "id": "web_link", "label": "Web Link, if available" }
                    ],
                    "defaultRow": {
                        "public_policy_advocated": "",
                        "method_resorted": "",
                        "information_available_in_public_domain": "",
                        "frequency_of_review_by_board": "",
                        "web_link": ""
                    }
                }
            ]
        },
        {
            "id": "p7_l2_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_for_principle_7_leadership_indicators_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 8 Essential Indicators": [
        {
            "id": "p8_e1_sia_details",
            "title": "1. Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year",
                    "name": "details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_in_the_current_financial_year_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. No." },
                        { "id": "name_and_brief_details_of_project", "label": "Name and brief details of project" },
                        { "id": "sia_notification_no", "label": "SIA Notification No." },
                        { "id": "date_of_notification", "label": "Date of notification" },
                        { "id": "whether_conducted_by_independent_external_agency", "label": "Whether conducted by independent external agency" },
                        { "id": "results_communicated_in_public_domain", "label": "Results communicated in public domain" },
                        { "id": "relevant_web_link", "label": "Relevant Web link" }
                    ],
                    "defaultRow": {
                        "name_and_brief_details_of_project": "",
                        "sia_notification_no": "",
                        "date_of_notification": "",
                        "whether_conducted_by_independent_external_agency": "",
                        "results_communicated_in_public_domain": "",
                        "relevant_web_link": ""
                    }
                }
            ]
        },
        {
            "id": "p8_e2_rr_projects",
            "title": "2. Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity",
                    "name": "provide_information_on_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_your_entity_in_the_following_format_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. No." },
                        { "id": "name_of_project_for_which_rr_is_ongoing", "label": "Name of Project for which R&R is ongoing" },
                        { "id": "state", "label": "State" },
                        { "id": "district", "label": "District" },
                        { "id": "no_of_project_affected_families", "label": "No. of Project Affected Families (PAFs)", "uiType": "number" },
                        { "id": "percentage_of_pafs_covered_by_rr", "label": "% of PAFs covered by R&R", "uiType": "number" },
                        { "id": "amounts_paid_to_pafs_in_fy", "label": "Amounts paid to PAFs in the FY (In INR)", "uiType": "number" }
                    ],
                    "defaultRow": {
                        "name_of_project_for_which_rr_is_ongoing": "",
                        "state": "",
                        "district": "",
                        "no_of_project_affected_families": "",
                        "percentage_of_pafs_covered_by_rr": "",
                        "amounts_paid_to_pafs_in_fy": ""
                    }
                }
            ]
        },
        {
            "id": "p8_e3_redress_grievances",
            "title": "3. Describe the mechanisms to receive and redress grievances of the community",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Describe the mechanisms to receive and redress grievances of the community",
                    "name": "describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p8_e4_input_material_suppliers",
            "title": "4. Percentage of input material (inputs to total inputs by value) sourced from suppliers",
            "type": "table",
            "popup": false,
            "columns": [
                { "id": "parameter", "label": "" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "msme_producers", "label": "Directly sourced from MSMEs/ small producers" },
                { "id": "district_neighbouring", "label": "Sourced directly from within the district and neighbouring districts" }
            ],
            "fields": [
                { "name": "p8_e4_msme_fy", "row": "msme_producers", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e4_msme_py", "row": "msme_producers", "mapping": "py", "uiType": "number" },
                { "name": "p8_e4_district_fy", "row": "district_neighbouring", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e4_district_py", "row": "district_neighbouring", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p8_e5_job_creation",
            "title": "5. Job creation in smaller towns - Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost",
            "type": "table",
            "popup": false,
            "columns": [
                { "id": "location", "label": "Location" },
                { "id": "fy", "label": "FY (-)" },
                { "id": "py", "label": "PY (-)" }
            ],
            "rows": [
                { "id": "rural_header", "label": "1. Rural", "isHeader": true },
                { "id": "rural_wages", "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)" },
                { "id": "rural_total_wage", "label": "ii) Total Wage Cost" },
                { "id": "rural_percentage", "label": "iii) % of Job creation in Rural areas" },
                { "id": "semi_urban_header", "label": "2. Semi-urban", "isHeader": true },
                { "id": "semi_urban_wages", "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)" },
                { "id": "semi_urban_total_wage", "label": "ii) Total Wage Cost" },
                { "id": "semi_urban_percentage", "label": "iii) % of Job creation in Semi-Urban areas" },
                { "id": "urban_header", "label": "3. Urban", "isHeader": true },
                { "id": "urban_wages", "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)" },
                { "id": "urban_total_wage", "label": "ii) Total Wage Cost" },
                { "id": "urban_percentage", "label": "iii) % of Job creation in Urban areas" },
                { "id": "metro_header", "label": "4. Metropolitan", "isHeader": true },
                { "id": "metro_wages", "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)" },
                { "id": "metro_total_wage", "label": "ii) Total Wage Cost" },
                { "id": "metro_percentage", "label": "iii) % of of Job creation in Metropolitan area" }
            ],
            "fields": [
                { "name": "p8_e5_rural_wages_fy", "row": "rural_wages", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_rural_wages_py", "row": "rural_wages", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_rural_total_fy", "row": "rural_total_wage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_rural_total_py", "row": "rural_total_wage", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_rural_percentage_fy", "row": "rural_percentage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_rural_percentage_py", "row": "rural_percentage", "mapping": "py", "uiType": "number" },

                { "name": "p8_e5_semi_urban_wages_fy", "row": "semi_urban_wages", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_semi_urban_wages_py", "row": "semi_urban_wages", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_semi_urban_total_fy", "row": "semi_urban_total_wage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_semi_urban_total_py", "row": "semi_urban_total_wage", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_semi_urban_percentage_fy", "row": "semi_urban_percentage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_semi_urban_percentage_py", "row": "semi_urban_percentage", "mapping": "py", "uiType": "number" },

                { "name": "p8_e5_urban_wages_fy", "row": "urban_wages", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_urban_wages_py", "row": "urban_wages", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_urban_total_fy", "row": "urban_total_wage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_urban_total_py", "row": "urban_total_wage", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_urban_percentage_fy", "row": "urban_percentage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_urban_percentage_py", "row": "urban_percentage", "mapping": "py", "uiType": "number" },

                { "name": "p8_e5_metro_wages_fy", "row": "metro_wages", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_metro_wages_py", "row": "metro_wages", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_metro_total_fy", "row": "metro_total_wage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_metro_total_py", "row": "metro_total_wage", "mapping": "py", "uiType": "number" },
                { "name": "p8_e5_metro_percentage_fy", "row": "metro_percentage", "mapping": "fy", "uiType": "number" },
                { "name": "p8_e5_metro_percentage_py", "row": "metro_percentage", "mapping": "py", "uiType": "number" }
            ]
        }
    ],
    "Section C: Principle 8 Leadership Indicators": [
        {
            "id": "p8_l1_mitigation_actions",
            "title": "1. Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments",
                    "name": "provide_details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. No." },
                        { "id": "details_of_negative_social_impact_identified", "label": "Details of negative social impact identified" },
                        { "id": "corrective_action_taken", "label": "Corrective action taken" }
                    ],
                    "defaultRow": {
                        "details_of_negative_social_impact_identified": "",
                        "corrective_action_taken": ""
                    }
                }
            ]
        },
        {
            "id": "p8_l2_preferential_procurement",
            "title": "2. Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies",
                    "name": "provide_the_following_information_on_csr_projects_undertaken_by_your_entity_in_designated_aspirational_districts_as_identified_by_government_bodies_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr. No." },
                        { "id": "state", "label": "State" },
                        { "id": "aspirational_district", "label": "Aspirational District" },
                        { "id": "amount_spent", "label": "Amount spent (In INR)", "uiType": "number" }
                    ],
                    "defaultRow": {
                        "state": "",
                        "aspirational_district": "",
                        "amount_spent": ""
                    }
                }
            ]
        },
        {
            "id": "p8_l3_preferential_procurement_details",
            "title": "3. (a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No/NA)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No/NA)",
                    "name": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p8_l3_procurement_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups", "value": "NA" }
                },
                {
                    "label": "(b) From which marginalized /vulnerable groups do you procure?",
                    "name": "from_which_marginalized_or_vulnerable_groups_do_you_procure_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups", "value": "Yes" }
                },
                {
                    "label": "(c) What percentage of total procurement (by value) does it constitute?",
                    "name": "what_percentage_of_total_procurement_by_value_does_it_constitute",
                    "uiType": "number",
                    "dependsOn": { "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups", "value": "Yes" }
                }
            ]
        },
        {
            "id": "p8_l4_traditional_knowledge",
            "title": "4. Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge",
                    "name": "details_of_the_benefits_derived_and_shared_from_the_intellectual_properties_owned_or_acquired_by_your_entity_in_the_current_financial_year_based_on_traditional_knowledge_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr.No." },
                        { "id": "intellectual_property_based_on_traditional_knowledge", "label": "Intellectual Property based on traditional knowledge" },
                        { "id": "owned_acquired", "label": "Owned/ Acquired (Yes/No)" },
                        { "id": "benefit_shared", "label": "Benefit shared (Yes / No)" },
                        { "id": "basis_of_calculating_benefit_share", "label": "Basis of calculating benefit share" }
                    ],
                    "defaultRow": {
                        "intellectual_property_based_on_traditional_knowledge": "",
                        "owned_acquired": "",
                        "benefit_shared": "",
                        "basis_of_calculating_benefit_share": ""
                    }
                }
            ]
        },
        {
            "id": "p8_l5_corrective_actions",
            "title": "5. Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved",
                    "name": "details_of_corrective_actions_taken_or_underway_based_on_any_adverse_order_in_intellectual_property_related_disputes_wherein_usage_of_traditional_knowledge_is_involved_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr.No." },
                        { "id": "name_of_authority", "label": "Name of authority" },
                        { "id": "brief_of_the_case", "label": "Brief of the Case" },
                        { "id": "corrective_action_taken", "label": "Corrective action taken" }
                    ],
                    "defaultRow": {
                        "name_of_authority": "",
                        "brief_of_the_case": "",
                        "corrective_action_taken": ""
                    }
                }
            ]
        },
        {
            "id": "p8_l6_csr_projects",
            "title": "6. Details of beneficiaries of CSR Projects",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Details of beneficiaries of CSR Projects",
                    "name": "details_of_beneficiaries_of_csr_projects_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "table",
                    "buttonLabel": "Add Details",
                    "columns": [
                        { "id": "sr_no", "label": "Sr.No." },
                        { "id": "csr_project", "label": "CSR Project" },
                        { "id": "no_of_persons_benefitted", "label": "No. of persons benefitted from CSR Projects", "uiType": "number" },
                        { "id": "percentage_from_vulnerable_groups", "label": "% of beneficiaries from vulnerable and marginalized groups", "uiType": "number" }
                    ],
                    "defaultRow": {
                        "csr_project": "",
                        "no_of_persons_benefitted": "",
                        "percentage_from_vulnerable_groups": ""
                    }
                }
            ]
        },
        {
            "id": "p8_l7_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_for_principle_8_leadership_indicators_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ],
    "Section C: Principle 9 Essential Indicators": [
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
                { "id": "parameter", "label": "" },
                { "id": "fy", "label": "" },
                { "id": "py", "label": "" }
            ],
            "rows": [
                { "id": "env_soc", "label": "Environmental and social parameters relevant to the product" },
                { "id": "safe_usage", "label": "Safe and responsible usage" },
                { "id": "disposal", "label": "Recycling and/or safe disposal" }
            ],
            "fields": [
                { "name": "p9_e2_env_soc_fy", "row": "env_soc", "mapping": "fy", "uiType": "number" },
                { "name": "p9_e2_env_soc_py", "row": "env_soc", "mapping": "py", "uiType": "number" },
                { "name": "p9_e2_safe_usage_fy", "row": "safe_usage", "mapping": "fy", "uiType": "number" },
                { "name": "p9_e2_safe_usage_py", "row": "safe_usage", "mapping": "py", "uiType": "number" },
                { "name": "p9_e2_disposal_fy", "row": "disposal", "mapping": "fy", "uiType": "number" },
                { "name": "p9_e2_disposal_py", "row": "disposal", "mapping": "py", "uiType": "number" }
            ]
        },
        {
            "id": "p9_e3_consumer_complaints",
            "title": "3. Number of consumer complaints in respect of the following:",
            "type": "table",
            "popup": false,
            "headerRows": [
                [
                    { "label": "", "colSpan": 1 },
                    { "label": "FY (-)", "colSpan": 3 },
                    { "label": "PY (-)", "colSpan": 3 }
                ],
                [
                    { "label": "", "colSpan": 1 },
                    { "label": "Received during the year", "colSpan": 1 },
                    { "label": "Pending resolution at end of year", "colSpan": 1 },
                    { "label": "Remark", "colSpan": 1 },
                    { "label": "Received during the year", "colSpan": 1 },
                    { "label": "Pending resolution at end of year", "colSpan": 1 },
                    { "label": "Remark", "colSpan": 1 }
                ]
            ],
            "columns": [
                { "id": "category", "label": "" },
                { "id": "fy_received", "label": "" },
                { "id": "fy_pending", "label": "" },
                { "id": "fy_remarks", "label": "" },
                { "id": "py_received", "label": "" },
                { "id": "py_pending", "label": "" },
                { "id": "py_remarks", "label": "" }
            ],
            "rows": [
                { "id": "privacy", "label": "Data privacy" },
                { "id": "advertising", "label": "Advertising" },
                { "id": "cyber", "label": "Cyber-security" },
                { "id": "essential", "label": "Delivery of essential services" },
                { "id": "restrictive", "label": "Restrictive Trade Practices" },
                { "id": "unfair", "label": "Unfair Trade Practices" },
                { "id": "other", "label": "Other" }
            ],
            "fields": [
                { "name": "p9_e3_privacy_fy_received", "row": "privacy", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_privacy_fy_pending", "row": "privacy", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_privacy_fy_remarks", "row": "privacy", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_privacy_py_received", "row": "privacy", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_privacy_py_pending", "row": "privacy", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_privacy_py_remarks", "row": "privacy", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_advertising_fy_received", "row": "advertising", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_advertising_fy_pending", "row": "advertising", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_advertising_fy_remarks", "row": "advertising", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_advertising_py_received", "row": "advertising", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_advertising_py_pending", "row": "advertising", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_advertising_py_remarks", "row": "advertising", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_cyber_fy_received", "row": "cyber", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_cyber_fy_pending", "row": "cyber", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_cyber_fy_remarks", "row": "cyber", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_cyber_py_received", "row": "cyber", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_cyber_py_pending", "row": "cyber", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_cyber_py_remarks", "row": "cyber", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_essential_fy_received", "row": "essential", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_essential_fy_pending", "row": "essential", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_essential_fy_remarks", "row": "essential", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_essential_py_received", "row": "essential", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_essential_py_pending", "row": "essential", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_essential_py_remarks", "row": "essential", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_restrictive_fy_received", "row": "restrictive", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_restrictive_fy_pending", "row": "restrictive", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_restrictive_fy_remarks", "row": "restrictive", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_restrictive_py_received", "row": "restrictive", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_restrictive_py_pending", "row": "restrictive", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_restrictive_py_remarks", "row": "restrictive", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_unfair_fy_received", "row": "unfair", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_unfair_fy_pending", "row": "unfair", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_unfair_fy_remarks", "row": "unfair", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_unfair_py_received", "row": "unfair", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_unfair_py_pending", "row": "unfair", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_unfair_py_remarks", "row": "unfair", "mapping": "py_remarks", "uiType": "text" },

                { "name": "p9_e3_other_fy_received", "row": "other", "mapping": "fy_received", "uiType": "number" },
                { "name": "p9_e3_other_fy_pending", "row": "other", "mapping": "fy_pending", "uiType": "number" },
                { "name": "p9_e3_other_fy_remarks", "row": "other", "mapping": "fy_remarks", "uiType": "text" },
                { "name": "p9_e3_other_py_received", "row": "other", "mapping": "py_received", "uiType": "number" },
                { "name": "p9_e3_other_py_pending", "row": "other", "mapping": "py_pending", "uiType": "number" },
                { "name": "p9_e3_other_py_remarks", "row": "other", "mapping": "py_remarks", "uiType": "text" }
            ]
        },

        {
            "id": "p9_e4_product_recalls",
            "title": "4. Details of instances of product recalls on account of safety issues:",
            "type": "table",
            "popup": false,
            "columns": [
                { "id": "parameter", "label": "" },
                { "id": "number", "label": "Number" },
                { "id": "reasons", "label": "Reasons for recall" }
            ],
            "rows": [
                { "id": "voluntary", "label": "Voluntary recalls" },
                { "id": "forced", "label": "Forced recalls" }
            ],
            "fields": [
                { "name": "p9_e4_voluntary_number", "row": "voluntary", "mapping": "number", "uiType": "number" },
                { "name": "p9_e4_voluntary_reasons", "row": "voluntary", "mapping": "reasons", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" },
                { "name": "p9_e4_forced_number", "row": "forced", "mapping": "number", "uiType": "number" },
                { "name": "p9_e4_forced_reasons", "row": "forced", "mapping": "reasons", "uiType": "popup", "subType": "textarea", "buttonLabel": "Add Details" }
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
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If available, provide a web-link of the policy",
                    "name": "if_available_provide_a_web_link_of_cyber_security_and_data_privacy_policy",
                    "uiType": "text",
                    "dependsOn": { "field": "whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p9_e5_cyber_security_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy", "value": "NA" }
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
    ],
    "Section C: Principle 9 Leadership Indicators": [
        {
            "id": "p9_l1_consumer_engagement",
            "title": "1. Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available)",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available)",
                    "name": "channels_or_platforms_where_information_on_products_and_services_of_the_entity_can_be_accessed_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p9_l2_consumer_survey",
            "title": "2. Steps taken to inform and educate consumers about safe and responsible usage of products and/or services",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Steps taken to inform and educate consumers about safe and responsible usage of products and/or services",
                    "name": "steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p9_l3_consumer_privacy",
            "title": "3. Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services",
                    "name": "mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details"
                }
            ]
        },
        {
            "id": "p9_l4_display_information",
            "title": "4. Does the entity display product information on the product over and above what is mandated as per local laws?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/NA)",
                    "name": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, provide details in brief",
                    "name": "if_yes_provide_details_in_brief_for_product_information_display_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p9_l4_display_information_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws", "value": "NA" }
                }
            ]
        },
        {
            "id": "p9_l5_consumer_survey_satisfaction",
            "title": "5. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole?",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No/NA)",
                    "name": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity",
                    "uiType": "select",
                    "options": ["Yes", "No", "NA"]
                },
                {
                    "label": "If yes, provide details (e.g., % of customers surveyed, survey results summary)",
                    "name": "if_yes_provide_details_of_consumer_satisfaction_survey_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity", "value": "Yes" }
                },
                {
                    "label": "If NA, provide details.",
                    "name": "p9_l5_consumer_survey_na_details",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Details",
                    "dependsOn": { "field": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity", "value": "NA" }
                }
            ]
        },
        {
            "id": "p9_l6_notes",
            "title": "Notes",
            "type": "grid",
            "columns": 1,
            "fields": [
                {
                    "label": "Notes",
                    "name": "notes_for_principle_9_leadership_indicators_explanatory_text_block",
                    "uiType": "popup",
                    "subType": "textarea",
                    "buttonLabel": "Add Notes"
                }
            ]
        }
    ]
};
