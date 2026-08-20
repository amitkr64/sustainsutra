/**
 * Single source of truth for the Sustainability Glossary. The
 * SustainabilityGlossaryPage imports from here.
 *
 * Term set is organized around the practice areas of SustainSutra GreenTech
 * LLP: ESG & disclosure, GHG accounting, carbon markets & climate finance,
 * water/waste/environmental law (with India-specific regulations), standards,
 * and climate science.
 */
export const GLOSSARY_TERMS = [
    // ------------------------------------------------------------------
    // A
    // ------------------------------------------------------------------
    { term: "Acid Rain", definition: "Precipitation containing elevated levels of sulfuric and nitric acids, formed when sulfur dioxide and nitrogen oxides react with atmospheric moisture; a classic transboundary air-pollution problem regulated through fuel quality and emission norms." },
    { term: "Adaptation", definition: "Adjustments in ecological, social, or economic systems in response to actual or expected climatic stimuli and their effects or impacts." },
    { term: "Additionality", definition: "The requirement that a carbon project's greenhouse gas reductions or removals would not have occurred anyway in a 'business as usual' scenario." },
    { term: "Afforestation", definition: "Establishing a forest on land that was not previously forested, in contrast to reforestation on recently cleared forest land. A key nature-based carbon removal pathway." },
    { term: "Anthropogenic", definition: "Resulting from or produced by human activities, as in 'anthropogenic emissions' — greenhouse gas emissions attributable to human actions rather than natural processes." },
    { term: "Annexure IV", definition: "The technical guidelines under the Carbon Credit Trading Scheme (CCTS) specifying mandatory monitoring and reporting requirements for obligated entities in India." },
    { term: "AQI (Air Quality Index)", definition: "A daily index that reports ambient air quality and associated health risk, computed from concentrations of pollutants such as PM2.5, PM10, NO2, SO2, CO, O3, and ammonia." },
    { term: "Article 6 (Paris Agreement)", definition: "The Paris Agreement provisions enabling voluntary cooperation in achieving NDCs through market (Art. 6.2 ITMOs, Art. 6.4 mechanism) and non-market approaches, with corresponding adjustments to avoid double counting." },
    { term: "AWS (Alliance for Water Stewardship)", definition: "A global membership collaboration that runs the International Water Stewardship Standard (AWS Standard) for site- and catchment-level responsible water use." },

    // ------------------------------------------------------------------
    // B
    // ------------------------------------------------------------------
    { term: "Baseline (Emissions)", definition: "The reference scenario against which emission reductions are measured — either a historical base year for corporate targets or a counterfactual 'without-project' scenario for carbon credit projects." },
    { term: "Battery Waste Management Rules, 2022", definition: "Indian rules imposing Extended Producer Responsibility on battery producers, including mandatory recovery targets and the use of recycled material in new batteries." },
    { term: "BECCS (Bioenergy with Carbon Capture and Storage)", definition: "A negative-emissions technology combining biomass energy generation with carbon capture, removing CO2 from the atmosphere while producing power or fuels." },
    { term: "Biodiversity", definition: "The variety of plant and animal life in the world or in a particular habitat, a high level of which is usually considered to be important and desirable for ecological balance." },
    { term: "Biodiversity Net Gain", definition: "A development approach that leaves biodiversity in a measurably better state than before, typically demonstrated through habitat-based metrics and offsetting as a last resort." },
    { term: "Bio-Medical Waste Management Rules, 2016", definition: "Indian rules governing the segregation, treatment, and disposal of waste generated during diagnosis, treatment, or immunization of humans and animals." },
    { term: "Blue Carbon", definition: "The carbon captured and stored by the world's ocean and coastal ecosystems, particularly mangroves, seagrasses, and salt marshes." },
    { term: "Blended Finance", definition: "The strategic use of development capital (grants, concessional loans, guarantees) to mobilize private investment into climate and development projects that would not attract commercial finance on their own." },
    { term: "BOD (Biochemical Oxygen Demand)", definition: "The amount of dissolved oxygen consumed by microorganisms decomposing organic matter in water over a standard period (usually 5 days); a core indicator of effluent strength and treatment plant performance." },
    { term: "BRSR (Business Responsibility and Sustainability Reporting)", definition: "SEBI's mandatory reporting framework for the top 1000 listed entities in India, focusing on ESG performance across nine principles." },
    { term: "Buffer Pool", definition: "A reserve of carbon credits withheld from a project's issuance and used to compensate for reversals (e.g., fire, disease) in carbon stored by land-based projects." },

    // ------------------------------------------------------------------
    // C
    // ------------------------------------------------------------------
    { term: "Cap and Trade", definition: "An emissions trading system where a regulator sets an absolute emissions cap, issues allowances up to that cap, and allows entities to buy and sell them — the design underlying the EU ETS and India's CCTS." },
    { term: "Carbon Credit", definition: "A tradable instrument representing one tonne of CO2 equivalent that has been reduced, avoided, or removed from the atmosphere relative to a baseline." },
    { term: "Carbon Footprint", definition: "The total amount of greenhouse gases (including carbon dioxide and methane) that are generated by our actions, measured in units of carbon dioxide equivalent." },
    { term: "Carbon Insetting", definition: "Financing emission reductions or removals inside a company's own value chain (e.g., regenerative agriculture in its supply shed) rather than buying external offsets." },
    { term: "Carbon Leakage", definition: "When companies move production to countries with less stringent climate policies, potentially leading to an increase in total global emissions." },
    { term: "Carbon Neutrality", definition: "A state where remaining CO2 emissions from an activity are balanced by an equivalent amount of offsets. Weaker than 'net zero', which requires deep abatement first and typically covers all GHGs." },
    { term: "Carbon Pricing", definition: "Putting an explicit cost on greenhouse gas emissions via a tax, an emissions trading system, or offset mechanisms, so that climate damage is reflected in economic decisions." },
    { term: "Carbon Sequestration", definition: "The process of capturing and storing atmospheric carbon dioxide, either through biological means (like forests and soil) or technological means (like Carbon Capture and Storage)." },
    { term: "Carbon Sink", definition: "Any reservoir — forest, ocean, soil — that absorbs more carbon from the atmosphere than it releases." },
    { term: "Carbon Tax", definition: "A direct levy on the carbon content of fuels or emitted CO2, providing a certain price signal in contrast to the quantity-driven cap-and-trade approach." },
    { term: "CBAM (Carbon Border Adjustment Mechanism)", definition: "The EU's landmark tool to put a fair price on the carbon emitted during the production of carbon-intensive goods entering the EU." },
    { term: "CCC (Carbon Credit Certificate)", definition: "A certificate issued to an obligated entity that achieves emission reductions beyond its assigned target under the CCTS, representing one tonne of CO2 equivalent (tCO2e) reduced." },
    { term: "CCTS (Carbon Credit Trading Scheme)", definition: "India's institutional framework for establishing a domestic carbon market to incentivize greenhouse gas emission reductions through the trading of Carbon Credit Certificates." },
    { term: "CCS / CCUS (Carbon Capture and Storage/Utilization)", definition: "Technologies that capture CO2 from point sources or the air and store it permanently underground or convert it into products; 'utilization' refers to the latter." },
    { term: "CDM (Clean Development Mechanism)", definition: "The Kyoto Protocol mechanism allowing emission-reduction projects in developing countries to earn Certified Emission Reductions (CERs) saleable to industrialized countries; the template for modern carbon markets." },
    { term: "CDP (Carbon Disclosure Project)", definition: "A global non-profit that runs the world's leading environmental disclosure system for companies, cities, states, and regions." },
    { term: "CETP (Common Effluent Treatment Plant)", definition: "A shared wastewater treatment facility serving multiple industrial units, common in Indian industrial estates where individual ETPs are not viable." },
    { term: "Circular Economy", definition: "A model of production and consumption which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials and products as long as possible." },
    { term: "Climate Finance", definition: "Local, national, or transnational financing — drawn from public and private sources — that seeks to support mitigation and adaptation actions addressing climate change." },
    { term: "Climate Resilience", definition: "The capacity of a system, community, or business to anticipate climate hazards, absorb shocks, and reorganize while maintaining function and identity." },
    { term: "CO2e (Carbon Dioxide Equivalent)", definition: "A universal unit of measurement to indicate the global warming potential of each greenhouse gas, expressed in terms of the GWP of one unit of carbon dioxide." },
    { term: "COD (Chemical Oxygen Demand)", definition: "The total oxygen required to chemically oxidize organic and inorganic matter in water; typically higher than BOD and used to characterize industrial effluent strength." },
    { term: "Consent to Establish / Consent to Operate", definition: "Mandatory permits under India's Water Act 1974 and Air Act 1981, issued by State Pollution Control Boards before constructing and operating an industrial unit." },
    { term: "Construction & Demolition Waste Management Rules, 2016", definition: "Indian rules requiring segregated collection and reuse of construction and demolition debris, and mandating waste management plans for large projects." },
    { term: "CORSIA", definition: "The UN aviation sector's Carbon Offsetting and Reduction Scheme requiring airlines to offset growth in international flight emissions using eligible credits." },
    { term: "CPCB (Central Pollution Control Board)", definition: "India's apex statutory body under the Water Act, advising the government and coordinating State Pollution Control Boards on pollution control and standards." },
    { term: "CREP (Corporate Responsibility for Environmental Protection)", definition: "India's charter of industry-specific environmental commitments — going beyond compliance norms — developed by CPCB with major industrial sectors." },
    { term: "CSRD (Corporate Sustainability Reporting Directive)", definition: "The EU directive greatly expanding mandatory sustainability reporting, using European Sustainability Reporting Standards (ESRS) and double materiality, with limited assurance." },
    { term: "CSDDD (Corporate Sustainability Due Diligence Directive)", definition: "The EU directive requiring large companies to identify, prevent, mitigate, and remediate adverse human-rights and environmental impacts across their value chains." },

    // ------------------------------------------------------------------
    // D
    // ------------------------------------------------------------------
    { term: "DAC (Direct Air Capture)", definition: "Technology that extracts CO2 directly from ambient air using chemical sorbents, enabling removal independent of emission sources; energy-intensive and currently high-cost." },
    { term: "Decarbonization", definition: "The process of reducing carbon intensity by lowering the amount of greenhouse gas emissions produced by the combustion of fossil fuels." },
    { term: "Decoupling", definition: "Breaking the link between economic growth and environmental degradation — 'absolute decoupling' means GDP rises while emissions or resource use fall." },
    { term: "Deforestation", definition: "The permanent clearance of forest for non-forest uses; a major emission source that also destroys biodiversity and watershed services." },
    { term: "Double Materiality", definition: "The requirement for companies to report on both how sustainability issues affect their business and how their business impacts people and the environment." },

    // ------------------------------------------------------------------
    // E
    // ------------------------------------------------------------------
    { term: "Ecolabel", definition: "A voluntary label certifying that a product meets defined environmental criteria across its life cycle, e.g., India's Ecomark or the EU Ecolabel." },
    { term: "Effluent Standards", definition: "Legally binding limits on pollutants in discharged wastewater — set under India's Environment (Protection) Rules by industry sector — monitored at the outlet of ETPs/CETPs." },
    { term: "EIA (Environmental Impact Assessment)", definition: "The systematic process of evaluating a proposed project's likely environmental consequences, required in India under the EIA Notification 2006 before Environmental Clearance is granted." },
    { term: "Emission Intensity", definition: "Emissions per unit of output — tCO2e per tonne of product, per rupee of revenue, or per MWh. The basis of GHG intensity targets and CCTS benchmarking." },
    { term: "EPD (Environmental Product Declaration)", definition: "A verified (ISO 14025) report quantifying a product's environmental impacts across its life cycle, enabling like-for-like comparison in green procurement." },
    { term: "EPR (Extended Producer Responsibility)", definition: "The policy principle making producers responsible for the end-of-life environmental impact of their products and packaging — through collection, recycling, and recovery obligations." },
    { term: "ESG (Environmental, Social, and Governance)", definition: "A set of standards for a company's operations that socially conscious investors use to screen potential investments and evaluate corporate behavior." },
    { term: "ESG Ratings", definition: "Third-party scores assessing a company's ESG performance or risk exposure; methodologies differ materially between providers and rarely agree." },
    { term: "EUA (Emission Unit Allowance)", definition: "The standard unit of allowance in emission trading systems, typically representing the right to emit one tonne of carbon dioxide — the tradable commodity of the EU ETS." },
    { term: "ETP (Effluent Treatment Plant)", definition: "An on-site facility treating industrial wastewater to meet discharge or reuse standards, typically through physical, chemical, and biological stages." },
    { term: "EU Taxonomy", definition: "The EU's classification system defining which economic activities count as environmentally sustainable, used to direct investment and prevent greenwashing in financial products." },
    { term: "E-Waste (Management) Rules, 2022", definition: "Indian rules governing electronic waste, with EPR obligations on producers and targets for collection and recycling managed through the CPCB EPR portal." },
    { term: "Environmental Clearance", definition: "The regulatory approval required in India for specified large projects (mining, infrastructure, industry) following EIA and public consultation, granted by MoEFCC or SEIAA." },

    // ------------------------------------------------------------------
    // F
    // ------------------------------------------------------------------
    { term: "Feed-in Tariff", definition: "A policy paying renewable electricity generators a guaranteed above-market price per kWh fed into the grid, widely used to bootstrap solar and wind deployment." },
    { term: "Fluorinated Gases (F-gases)", definition: "Synthetic greenhouse gases — HFCs, PFCs, SF6, and NF3 — with global warming potentials up to many thousands of times CO2; emitted from refrigeration, electronics, and electrical equipment." },
    { term: "Fugitive Emissions", definition: "Intentional or unintentional release of greenhouse gases from anthropogenic activities such as processing, transmission, and storage of fossil fuels." },

    // ------------------------------------------------------------------
    // G
    // ------------------------------------------------------------------
    { term: "GHG (Greenhouse Gas)", definition: "Gases that trap heat in the atmosphere, including Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O), and Fluorinated gases." },
    { term: "GHG Inventory", definition: "A comprehensive, standardized quantification of all greenhouse gas emissions and removals attributable to an organization for a reporting year, per ISO 14064-1 or the GHG Protocol." },
    { term: "GHG Protocol", definition: "The most widely used international accounting tool for government and business leaders to understand, quantify, and manage greenhouse gas emissions." },
    { term: "Global Stocktake", definition: "The Paris Agreement's five-yearly assessment of collective progress toward its goals, informing the next round of stronger NDCs. The first concluded at COP28 in 2023." },
    { term: "Gold Standard", definition: "A voluntary carbon market standard (founded by WWF and partners) certifying projects with sustainable-development co-benefits and rigorous safeguarding." },
    { term: "Green Bonds", definition: "Fixed-income instruments specifically earmarked to raise money for climate and environmental projects." },
    { term: "Green Hydrogen", definition: "Hydrogen produced by electrolysis of water using renewable electricity, yielding no direct emissions; central to India's National Green Hydrogen Mission and hard-to-abate sector decarbonization." },
    { term: "Greenium", definition: "The pricing advantage — lower yield — that green bonds can command over comparable conventional bonds, reflecting investor demand for labeled instruments." },
    { term: "Greenwashing", definition: "The practice of making misleading or unsubstantiated claims about the environmental benefits of a product, service, or company practice to appear more sustainable than it is." },
    { term: "GRI (Global Reporting Initiative)", definition: "An international standards organization that helps businesses and governments understand and communicate their impact on critical sustainability issues." },
    { term: "GWP (Global Warming Potential)", definition: "A measure of how much heat a greenhouse gas traps in the atmosphere up to a specific time horizon, relative to carbon dioxide." },

    // ------------------------------------------------------------------
    // H
    // ------------------------------------------------------------------
    { term: "Hazardous and Other Wastes Rules, 2016", definition: "Indian rules governing the identification, storage, transport, treatment, and disposal of hazardous waste, including transboundary movement controls." },
    { term: "HRDD (Human Rights Due Diligence)", definition: "The ongoing process by which companies identify, prevent, mitigate, and account for adverse human-rights impacts connected with their operations and value chains." },

    // ------------------------------------------------------------------
    // I
    // ------------------------------------------------------------------
    { term: "Industrial Symbiosis", definition: "A circular-economy approach where one facility's waste or by-product becomes another's feedstock — shared utilities, steam, and material exchanges across co-located industries." },
    { term: "ISSB (International Sustainability Standards Board)", definition: "A body created to develop a comprehensive global baseline of high-quality sustainability disclosure standards for financial markets." },
    { term: "ISO 14001", definition: "The international standard for Environmental Management Systems, requiring policy, planning, implementation, checking, and management review with continual improvement." },
    { term: "ISO 14064", definition: "The international standard family for quantifying and reporting GHG inventories (Part 1), quantifying project-level reductions (Part 2), and validating/verifying them (Part 3)." },
    { term: "ISO 14046", definition: "The international standard specifying principles and requirements for water footprint assessment, including scarcity-weighted indicators." },
    { term: "ISO 46001", definition: "The international standard for Water Efficiency Management Systems, helping organizations systematically measure, manage, and reduce water use." },
    { term: "ISO 50001", definition: "The international standard for Energy Management Systems, driving continual improvement in energy performance — the EnMS basis for India's PAT scheme compliance." },
    { term: "ITMO (Internationally Transferred Mitigation Outcome)", definition: "The Article 6.2 unit through which countries cooperatively transfer mitigation outcomes toward their NDCs, with corresponding adjustments to prevent double counting." },

    // ------------------------------------------------------------------
    // J
    // ------------------------------------------------------------------
    { term: "Just Transition", definition: "A framework developed by the trade union movement to encompass a range of social interventions needed to secure workers' rights and livelihoods when economies are shifting to sustainable production." },

    // ------------------------------------------------------------------
    // K
    // ------------------------------------------------------------------
    { term: "Kyoto Protocol", definition: "The 1997 treaty that bound developed countries to emission-reduction targets and created the CDM, Joint Implementation, and international emissions trading — the first-generation carbon market architecture." },

    // ------------------------------------------------------------------
    // L
    // ------------------------------------------------------------------
    { term: "Landfill", definition: "A controlled site for solid-waste disposal; in India, sites must comply with Solid Waste Management Rules 2016, and legacy dump remediation is a national priority." },
    { term: "LCA (Life Cycle Assessment)", definition: "A methodology for assessing environmental impacts associated with all the stages of a product's life, from raw material extraction to disposal or recycling." },
    { term: "LEAP Approach", definition: "TNFD's four-step process for nature-related assessment: Locate interface with nature, Evaluate dependencies and impacts, Assess materiality, and Prepare to report and respond." },
    { term: "Limited Assurance", definition: "A lighter verification level where the assurance provider reviews evidence for anything materially misstated — less rigorous than 'reasonable assurance' and the default under CSRD's early years." },
    { term: "Linear Economy", definition: "The traditional take-make-dispose model of production, in which materials flow one way from extraction to landfill — the antithesis of circularity." },
    { term: "LULUCF (Land Use, Land-Use Change and Forestry)", definition: "A defined sector under the UNFCCC that covers emissions and removals of greenhouse gases resulting from direct human-induced land use." },

    // ------------------------------------------------------------------
    // M
    // ------------------------------------------------------------------
    { term: "Material Flow Analysis (MFA)", definition: "A systematic accounting of the flows and stocks of materials within a defined system (plant, city, economy), foundational for circularity and resource-efficiency planning." },
    { term: "Materiality Assessment", definition: "The structured process of identifying and prioritizing the sustainability topics most relevant to a company and its stakeholders — the backbone of ESG strategy and reporting." },
    { term: "Methane (CH4)", definition: "A potent greenhouse gas with ~28x the 100-year warming potential of CO2, emitted from livestock, rice, landfills, and fossil-fuel operations; targeted by the Global Methane Pledge." },
    { term: "Mitigation", definition: "Efforts to reduce or prevent emission of greenhouse gases; can include using new technologies and renewable energies, or changing management practices or consumer behavior." },
    { term: "MRV (Monitoring, Reporting, Verification)", definition: "The institutional backbone of carbon markets and compliance schemes: continuous emissions monitoring, standardized reporting, and independent third-party verification." },

    // ------------------------------------------------------------------
    // N
    // ------------------------------------------------------------------
    { term: "NAPCC (National Action Plan on Climate Change)", definition: "India's 2008 framework establishing eight national missions spanning solar, energy efficiency, water, sustainable habitat, agriculture, Himalayan ecosystem, forestry, and strategic knowledge." },
    { term: "Natural Capital", definition: "The world's stocks of natural assets which include geology, soil, air, water and all living things." },
    { term: "Net Zero", definition: "A state in which the greenhouse gases going into the atmosphere are balanced by removal out of the atmosphere, resulting in zero net increase in emissions." },
    { term: "NDC (Nationally Determined Contribution)", definition: "Each country's self-defined climate pledges under the Paris Agreement; India's updated 2022 NDC targets about 50% of cumulative electric-power installed capacity from non-fossil sources by 2030." },
    { term: "Net Metering", definition: "A billing arrangement crediting rooftop-solar owners for excess electricity exported to the grid, effectively running the meter backward." },
    { term: "NGT (National Green Tribunal)", definition: "India's dedicated environmental court (established 2010) with powers to enforce environmental law, award compensation, and provide fast-track remedy for environmental disputes." },
    { term: "Nitrous Oxide (N2O)", definition: "A greenhouse gas ~265x more potent than CO2 over 100 years, emitted mainly from agricultural soils (fertilizer) and industrial processes." },

    // ------------------------------------------------------------------
    // O
    // ------------------------------------------------------------------
    { term: "Ozone-Depleting Substances (ODS)", definition: "Chemicals such as CFCs and HCFCs that thin the stratospheric ozone layer, phased out under the Montreal Protocol — distinct from climate change but often co-regulated (refrigerants)." },

    // ------------------------------------------------------------------
    // P
    // ------------------------------------------------------------------
    { term: "Paris Agreement", definition: "A legally binding international treaty on climate change adopted in 2015, aiming to limit global warming to well below 2, preferably to 1.5 degrees Celsius." },
    { term: "PAT Scheme (Perform, Achieve, Trade)", definition: "India's market-based energy-efficiency program under the Energy Conservation Act, assigning energy-intensity reduction targets to Designated Consumers and issuing tradable Energy Savings Certificates (ESCerts)." },
    { term: "Permanence", definition: "The requirement that carbon removals persist long-term; a key risk in forestry and soil projects where fire or land-use change can re-release stored carbon." },
    { term: "Physical Risk", definition: "Risks resulting from climate change that can be event-driven (acute) or longer-term shifts (chronic) in climate patterns." },
    { term: "Plastic Waste Management (Amendment) Rules, 2022", definition: "Indian rules introducing EPR for plastic packaging with mandatory recycled-content, collection, and end-of-life disposal targets registered on the CPCB portal." },
    { term: "PPA (Power Purchase Agreement)", definition: "A long-term contract for the sale of electricity between a generator and buyer, the standard financing vehicle for corporate renewable procurement." },
    { term: "PRO (Producer Responsibility Organization)", definition: "A professional agency that aggregates EPR obligations on behalf of multiple producers, organizing collection and recycling infrastructure and providing compliance evidence." },
    { term: "Product Carbon Footprint (PCF)", definition: "The life-cycle GHG emissions attributable to a single product unit, quantified per ISO 14067 or the GHG Protocol Product Standard — increasingly demanded by buyers (e.g., automakers of suppliers)." },

    // ------------------------------------------------------------------
    // R
    // ------------------------------------------------------------------
    { term: "Reasonable Assurance", definition: "The higher verification level where the assurance provider obtains sufficient evidence to conclude the information is free of material misstatement — analogous to a financial audit." },
    { term: "RECs (Renewable Energy Certificates)", definition: "Market-based instruments that represent the property rights to the environmental and social attributes of renewable electricity generation." },
    { term: "Reforestation", definition: "Re-establishing forest on land that was recently forested, restoring carbon stocks, habitat, and watershed function." },
    { term: "Registry (Carbon Registry)", definition: "The official ledger (e.g., Verra Registry, ICR, GCC, Indian carbon market registry) that issues, tracks, transfers, and retires carbon credits, preventing double counting." },
    { term: "Retirement (of Credits)", definition: " The permanent cancellation of a carbon credit in its registry after use, so it can never be sold or claimed again — the moment a claim becomes exclusive." },
    { term: "RPO (Renewable Purchase Obligation)", definition: "The Indian regulatory mandate requiring distribution companies and large consumers to source a specified fraction of electricity from renewable sources, tradable via RECs." },

    // ------------------------------------------------------------------
    // S
    // ------------------------------------------------------------------
    { term: "SBTi (Science Based Targets initiative)", definition: "A partnership that provides companies with a clearly defined path to reduce emissions in line with the Paris Agreement goals." },
    { term: "Scope 1 Emissions", definition: "Direct greenhouse gas emissions that occur from sources that are owned or controlled by the company (e.g., emissions from combustion in owned boilers, vehicles)." },
    { term: "Scope 2 Emissions", definition: "Indirect greenhouse gas emissions from the generation of purchased electricity, steam, heating, or cooling consumed by the company." },
    { term: "Scope 3 Emissions", definition: "All other indirect emissions that occur in a company’s value chain, including both upstream and downstream activities (e.g., supply chain, product use)." },
    { term: "Scope 4 Emissions (Avoided Emissions)", definition: "An emerging term for emissions avoided outside a product's life cycle because of its use (e.g., insulation avoiding heating fuel); not yet standardized and not reportable under the GHG Protocol scopes." },
    { term: "SDGs (Sustainable Development Goals)", definition: "A collection of 17 interlinked global goals designed to be a 'blueprint to achieve a better and more sustainable future for all' by 2030." },
    { term: "SFDR (Sustainable Finance Disclosure Regulation)", definition: "An EU regulation introduced to improve transparency in the market for sustainable investment products and to prevent greenwashing." },
    { term: "Sludge", definition: "The semi-solid residual from wastewater treatment; handling follows the Solid Waste / Hazardous Waste Rules depending on toxicity, with options including dewatering, co-processing, and composting." },
    { term: "Solid Waste Management Rules, 2016", definition: "India's principal rules for municipal solid waste — source segregation, collection, processing, and disposal duties of urban local bodies and waste generators." },
    { term: "STP (Sewage Treatment Plant)", definition: "A facility treating domestic/municipal sewage through preliminary, primary, biological, and tertiary stages before discharge or reuse." },
    { term: "Sustainability", definition: "The ability to exist constantly; in business, it refers to meeting present needs without compromising the ability of future generations to meet theirs." },
    { term: "Sustainability-Linked Loan / Bond", definition: "Debt instruments whose interest rate steps up or down depending on the borrower's achievement of pre-agreed sustainability performance targets (SPTs), unlike use-of-proceeds green bonds." },

    // ------------------------------------------------------------------
    // T
    // ------------------------------------------------------------------
    { term: "TCFD (Task Force on Climate-related Financial Disclosures)", definition: "A framework for more effective climate-related disclosures that promote more informed investment, credit, and insurance underwriting decisions." },
    { term: "Tipping Point", definition: "A threshold in the climate system beyond which change becomes self-perpetuating and potentially irreversible — e.g., ice-sheet collapse or permafrost thaw." },
    { term: "TNFD (Taskforce on Nature-related Financial Disclosures)", definition: "A risk management and disclosure framework for organizations to report and act on evolving nature-related risks." },
    { term: "Transition Plan", definition: "A time-bound, financed plan describing how a company will decarbonize — interim targets, capital allocation, and governance — increasingly required alongside net-zero pledges (e.g., ISSB S2, UK SDR)." },
    { term: "Transition Risk", definition: "The risk inherent in the shift toward a lower-carbon economy, including policy and legal risks, technology risks, market risks, and reputation risks." },
    { term: "Triple Bottom Line", definition: "An accounting framework that incorporates three dimensions of performance: social (people), environmental (planet), and financial (profit)." },

    // ------------------------------------------------------------------
    // U
    // ------------------------------------------------------------------
    { term: "UNFCCC (UN Framework Convention on Climate Change)", definition: "The 1992 treaty establishing the global climate regime and its Conference of the Parties (COP); parent to the Kyoto Protocol and Paris Agreement." },
    { term: "Upcycling", definition: "Reusing waste materials to create products of higher value or quality than the original, distinct from downcycling into lower-grade applications." },

    // ------------------------------------------------------------------
    // V
    // ------------------------------------------------------------------
    { term: "VCM (Voluntary Carbon Market)", definition: "A decentralized market where private actors voluntarily buy and sell carbon credits that represent certified removals or reductions of GHGs." },
    { term: "Verra / VCS (Verified Carbon Standard)", definition: "The world's largest voluntary carbon standard, certifying projects and issuing VCUs across energy, forestry, waste, and chemical-elimination categories." },
    { term: "Vintage (Carbon Credit)", definition: "The year in which the emission reduction or removal underlying a credit actually occurred — distinct from the year of issuance or retirement." },

    // ------------------------------------------------------------------
    // W
    // ------------------------------------------------------------------
    { term: "Waste Hierarchy", definition: "The prioritization principle for waste management: prevention first, then reuse, recycling, recovery, and disposal last — embedded in Indian and EU waste law." },
    { term: "Waste-to-Energy (WtE)", definition: "Recovering energy from waste through incineration, anaerobic digestion, or refuse-derived fuel; controversial for feedstock competition with recycling and air-quality concerns." },
    { term: "Water Footprint", definition: "The total volume of fresh water used to produce the goods and services consumed by an individual, community, or business." },
    { term: "Water Stewardship", definition: "The responsible use of water that is socially equitable, environmentally sustainable, and economically beneficial, achieved through catchment-level stakeholder engagement (AWS Standard)." },
    { term: "Water Stress", definition: "The ratio of total water withdrawal to available renewable supply; areas above 40% are classified as high-stress by WRI's Aqueduct tool — a key physical-risk screen." },
    { term: "Watershed / Catchment", definition: "The land area that drains to a common water body; the spatial unit for water stewardship planning, allocation, and quality management." },

    // ------------------------------------------------------------------
    // Z
    // ------------------------------------------------------------------
    { term: "ZLD (Zero Liquid Discharge)", definition: "A wastewater strategy eliminating any liquid discharge to the environment through recovery and recycling — effluent is concentrated and solids managed, mandated for certain Indian sectors (dyeing, distilleries)." },
];
