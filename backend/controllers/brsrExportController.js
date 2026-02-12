const BRSRXBRLMapper = require('../utils/brsrXBRLMapper');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * BRSR Export Controller
 * Handles XML and PDF export functionality
 */
class BRSRExportController {
    /**
     * Export BRSR report as XML (XBRL format)
     */
    async exportXML(req, res) {
        try {
            const { reportId } = req.params;

            // Fetch report data from database
            const reportData = await this.getReportData(reportId);

            if (!reportData) {
                return res.status(404).json({ error: 'Report not found' });
            }

            // Map to XBRL format
            const mapper = new BRSRXBRLMapper();
            const xmlContent = mapper.mapToXBRL(reportData);

            // Generate filename
            const filename = this.generateFilename(reportData, 'xml');

            // Set headers for file download
            res.setHeader('Content-Type', 'application/xml');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

            // Update export timestamp
            await this.updateExportTimestamp(reportId);

            // Send XML content
            res.send(xmlContent);

        } catch (error) {
            console.error('XML Export Error:', error);
            res.status(500).json({
                error: 'Failed to generate XML export',
                message: error.message
            });
        }
    }

    /**
     * Export BRSR report as PDF
     */
    async exportPDF(req, res) {
        try {
            const { reportId } = req.params;
            const options = req.body || {};

            // Fetch report data from database
            const reportData = await this.getReportData(reportId);

            if (!reportData) {
                return res.status(404).json({ error: 'Report not found' });
            }

            // Generate PDF
            const pdfBuffer = await this.generatePDF(reportData, options);

            // Generate filename
            const filename = this.generateFilename(reportData, 'pdf');

            // Set headers for file download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

            // Update export timestamp
            await this.updateExportTimestamp(reportId);

            // Send PDF
            res.send(pdfBuffer);

        } catch (error) {
            console.error('PDF Export Error:', error);
            res.status(500).json({
                error: 'Failed to generate PDF export',
                message: error.message
            });
        }
    }

    /**
     * Get export status for a report
     */
    async getExportStatus(req, res) {
        try {
            const { reportId } = req.params;

            const reportData = await this.getReportData(reportId);

            if (!reportData) {
                return res.status(404).json({ error: 'Report not found' });
            }

            res.json({
                reportId,
                submissionStatus: reportData.submission_status,
                submittedAt: reportData.submitted_at,
                lastExportedAt: reportData.last_exported_at,
                canExport: reportData.submission_status === 'submitted'
            });

        } catch (error) {
            console.error('Export Status Error:', error);
            res.status(500).json({ error: 'Failed to get export status' });
        }
    }

    /**
     * Fetch report data from database
     */
    async getReportData(reportId) {
        // This should be replaced with actual database query
        // For now, using placeholder
        const db = require('../config/database');

        try {
            const query = 'SELECT * FROM brsr_reports WHERE id = ?';
            const [rows] = await db.execute(query, [reportId]);
            return rows[0] || null;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    /**
     * Update last exported timestamp
     */
    async updateExportTimestamp(reportId) {
        const db = require('../config/database');

        try {
            const query = 'UPDATE brsr_reports SET last_exported_at = NOW(), submission_status = ? WHERE id = ?';
            await db.execute(query, ['exported', reportId]);
        } catch (error) {
            console.error('Failed to update export timestamp:', error);
        }
    }

    /**
     * Generate PDF from report data
     */
    async generatePDF(reportData, options) {
        return new Promise((resolve, reject) => {
            try {
                const BRSRPDFTemplate = require('../templates/brsrPDFTemplate');
                const template = new BRSRPDFTemplate();

                // Create document with enhanced template
                const doc = template.createDocument();

                const chunks = [];
                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));
                doc.on('error', reject);

                // Add cover page
                template.addCoverPage(doc, reportData);

                // Add table of contents
                template.addTableOfContents(doc);

                // Add Section A: General Disclosures
                template.addSectionHeader(doc, 'General Disclosures', 'A');
                this.addSectionA_Enhanced(doc, template, reportData);

                // Add Section B: Management and Process Disclosures
                template.addSectionHeader(doc, 'Management and Process Disclosures', 'B');
                this.addSectionB_Enhanced(doc, template, reportData);

                // Add Section C: Principle-wise Performance
                template.addSectionHeader(doc, 'Principle-wise Performance Disclosure', 'C');
                this.addSectionC_Enhanced(doc, template, reportData);

                // Add page numbers
                template.addPageNumbers(doc);

                // Finalize PDF
                doc.end();

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Add Section A with enhanced formatting
     */
    addSectionA_Enhanced(doc, template, reportData) {
        // Company Details Table
        template.addTable(
            'Company Details',
            ['Field', 'Value'],
            [
                ['Corporate Identity Number (CIN)', reportData.cin || '-'],
                ['Name of Listed Entity', reportData.company_name || '-'],
                ['Financial Year', reportData.financial_year || '-'],
                ['Stock Exchange', reportData.stock_exchange || '-'],
                ['Paid-up Capital (INR)', reportData.paid_up_capital || '-'],
                ['Reporting Boundary', reportData.reporting_boundary || '-']
            ]
        );

        // Contact Information Table
        template.addTable(
            'Contact Information',
            ['Field', 'Value'],
            [
                ['Contact Person', reportData.contact_person_name || '-'],
                ['Email', reportData.email_id || '-'],
                ['Phone', reportData.contact_number || '-']
            ]
        );

        // Business Activities
        if (reportData.business_activities_explanatory_text_block) {
            template.addQuestion(
                doc,
                '1',
                'Details of Business Activities',
                reportData.business_activities_explanatory_text_block,
                { height: 80 }
            );
        }
    }

    /**
     * Add Section B with enhanced formatting
     */
    addSectionB_Enhanced(doc, template, reportData) {
        // Policy and Management Processes
        if (reportData.policy_management_processes_explanatory_text_block) {
            template.addQuestion(
                doc,
                '1',
                'Policy and Management Processes',
                reportData.policy_management_processes_explanatory_text_block,
                { height: 100 }
            );
        }
    }

    /**
     * Add Section C with enhanced formatting
     */
    addSectionC_Enhanced(doc, template, reportData) {
        // Principle 6: Environment
        doc.addPage();
        doc.fontSize(16)
            .fillColor(template.colors.primary)
            .font(template.fonts.bold)
            .text('Principle 6: Environment')
            .moveDown(1);

        if (reportData.p6_l2_scope3_applicable === 'Yes') {
            template.addTable(
                'Scope 3 Greenhouse Gas Emissions',
                ['Metric', 'FY', 'PY'],
                [
                    ['Scope 3 Emissions', reportData.p6_l2_scope3_emissions_fy || '-', reportData.p6_l2_scope3_emissions_py || '-'],
                    ['Unit', reportData.p6_l2_scope3_unit || '-', reportData.p6_l2_scope3_unit || '-'],
                    ['Intensity', reportData.p6_l2_scope3_intensity || '-', '-']
                ]
            );
        }

        // Principle 7: Public Policy
        doc.addPage();
        doc.fontSize(16)
            .fillColor(template.colors.primary)
            .font(template.fonts.bold)
            .text('Principle 7: Public Policy')
            .moveDown(1);

        template.addQuestion(
            doc,
            '1',
            'Number of affiliations with trade and industry chambers/associations',
            reportData.number_of_affiliations_with_trade_and_industry_chambers_or_associations || '0'
        );

        // Trade associations table
        if (reportData.p7_e1_affiliations_list_data) {
            try {
                const affiliations = JSON.parse(reportData.p7_e1_affiliations_list_data);
                if (affiliations.length > 0) {
                    const rows = affiliations.map((aff, idx) => [
                        (idx + 1).toString(),
                        aff.name || '-',
                        aff.reach || '-'
                    ]);

                    template.addTable(
                        'List of Trade Associations',
                        ['S.No.', 'Name of Association', 'Reach'],
                        rows
                    );
                }
            } catch (e) {
                console.error('Error parsing affiliations:', e);
            }
        }

        // Principle 8: Inclusive Growth
        doc.addPage();
        doc.fontSize(16)
            .fillColor(template.colors.primary)
            .font(template.fonts.bold)
            .text('Principle 8: Inclusive Growth')
            .moveDown(1);

        template.addTable(
            'Job Creation Details',
            ['Category', 'FY (INR)', 'PY (INR)', 'FY (%)', 'PY (%)'],
            [
                [
                    'Rural',
                    reportData.p8_e5_rural_wages_fy || '-',
                    reportData.p8_e5_rural_wages_py || '-',
                    reportData.p8_e5_rural_percentage_fy || '-',
                    reportData.p8_e5_rural_percentage_py || '-'
                ],
                [
                    'Semi-urban',
                    reportData.p8_e5_semiurban_wages_fy || '-',
                    reportData.p8_e5_semiurban_wages_py || '-',
                    reportData.p8_e5_semiurban_percentage_fy || '-',
                    reportData.p8_e5_semiurban_percentage_py || '-'
                ],
                [
                    'Urban',
                    reportData.p8_e5_urban_wages_fy || '-',
                    reportData.p8_e5_urban_wages_py || '-',
                    reportData.p8_e5_urban_percentage_fy || '-',
                    reportData.p8_e5_urban_percentage_py || '-'
                ],
                [
                    'Metropolitan',
                    reportData.p8_e5_metropolitan_wages_fy || '-',
                    reportData.p8_e5_metropolitan_wages_py || '-',
                    reportData.p8_e5_metropolitan_percentage_fy || '-',
                    reportData.p8_e5_metropolitan_percentage_py || '-'
                ]
            ]
        );

        // Principle 9: Consumer Value
        doc.addPage();
        doc.fontSize(16)
            .fillColor(template.colors.primary)
            .font(template.fonts.bold)
            .text('Principle 9: Consumer Value')
            .moveDown(1);

        template.addTable(
            'Data Breaches Information',
            ['Metric', 'Value'],
            [
                ['Number of Data Breaches', reportData.p9_e7_data_breaches_number || '0'],
                ['Percentage with PII', reportData.p9_e7_data_breaches_percentage || '0']
            ]
        );

        if (reportData.p9_e7_data_breaches_impact) {
            template.addQuestion(
                doc,
                '7c',
                'Impact of Data Breaches',
                reportData.p9_e7_data_breaches_impact
            );
        }
    }

    /**
     * Add PDF cover page
     */
    addCoverPage(doc, reportData) {
        doc.fontSize(28).font('Helvetica-Bold')
            .text('Business Responsibility and', { align: 'center' })
            .text('Sustainability Report', { align: 'center' })
            .moveDown(2);

        doc.fontSize(20).font('Helvetica')
            .text(reportData.company_name || 'Company Name', { align: 'center' })
            .moveDown(1);

        doc.fontSize(14)
            .text(`Financial Year: ${reportData.financial_year || 'N/A'}`, { align: 'center' })
            .moveDown(0.5)
            .text(`CIN: ${reportData.cin || 'N/A'}`, { align: 'center' })
            .moveDown(3);

        doc.fontSize(12)
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    }

    /**
     * Add table of contents
     */
    addTableOfContents(doc) {
        doc.fontSize(20).font('Helvetica-Bold')
            .text('Table of Contents', { underline: true })
            .moveDown(1);

        doc.fontSize(12).font('Helvetica');

        const sections = [
            'Section A: General Disclosures',
            'Section B: Management and Process Disclosures',
            'Section C: Principle-wise Performance Disclosure',
            '  Principle 1: Businesses should conduct and govern themselves with integrity',
            '  Principle 2: Businesses should provide goods and services in a sustainable manner',
            '  Principle 3: Businesses should respect and promote the well-being of all employees',
            '  Principle 4: Businesses should respect the interests of and be responsive to all stakeholders',
            '  Principle 5: Businesses should respect and promote human rights',
            '  Principle 6: Businesses should respect and make efforts to protect and restore the environment',
            '  Principle 7: Businesses should engage in influencing public and regulatory policy responsibly',
            '  Principle 8: Businesses should promote inclusive growth and equitable development',
            '  Principle 9: Businesses should engage with and provide value to consumers responsibly'
        ];

        sections.forEach(section => {
            doc.text(section).moveDown(0.3);
        });
    }

    /**
     * Add Section A to PDF
     */
    addSectionA_PDF(doc, reportData) {
        doc.fontSize(18).font('Helvetica-Bold')
            .text('Section A: General Disclosures', { underline: true })
            .moveDown(1);

        doc.fontSize(12).font('Helvetica');

        // Company details
        this.addPDFSection(doc, 'Corporate Identity Number (CIN)', reportData.cin);
        this.addPDFSection(doc, 'Name of the Listed Entity', reportData.company_name);
        this.addPDFSection(doc, 'Financial Year', reportData.financial_year);
        this.addPDFSection(doc, 'Stock Exchange', reportData.stock_exchange);
        this.addPDFSection(doc, 'Paid-up Capital', reportData.paid_up_capital);

        // Add more Section A fields as needed
    }

    /**
     * Add Section B to PDF
     */
    addSectionB_PDF(doc, reportData) {
        doc.fontSize(18).font('Helvetica-Bold')
            .text('Section B: Management and Process Disclosures', { underline: true })
            .moveDown(1);

        doc.fontSize(12).font('Helvetica');

        // Add Section B content
        this.addPDFSection(doc, 'Policy and Management Processes',
            reportData.policy_management_processes_explanatory_text_block);
    }

    /**
     * Add Section C to PDF
     */
    addSectionC_PDF(doc, reportData) {
        doc.fontSize(18).font('Helvetica-Bold')
            .text('Section C: Principle-wise Performance Disclosure', { underline: true })
            .moveDown(1);

        // Add each principle
        for (let i = 1; i <= 9; i++) {
            doc.addPage();
            this.addPrincipleToPDF(doc, i, reportData);
        }
    }

    /**
     * Add individual principle to PDF
     */
    addPrincipleToPDF(doc, principleNumber, reportData) {
        doc.fontSize(16).font('Helvetica-Bold')
            .text(`Principle ${principleNumber}`, { underline: true })
            .moveDown(1);

        doc.fontSize(12).font('Helvetica');

        // Add principle-specific data based on principle number
        // This is a simplified version - expand based on actual data structure

        if (principleNumber === 6) {
            this.addPDFSection(doc, 'Scope 3 Emissions (FY)', reportData.p6_l2_scope3_emissions_fy);
            this.addPDFSection(doc, 'Scope 3 Emissions (PY)', reportData.p6_l2_scope3_emissions_py);
        }

        if (principleNumber === 7) {
            this.addPDFSection(doc, 'Number of Affiliations',
                reportData.number_of_affiliations_with_trade_and_industry_chambers_or_associations);
        }

        if (principleNumber === 9) {
            this.addPDFSection(doc, 'Number of Data Breaches', reportData.p9_e7_data_breaches_number);
        }
    }

    /**
     * Helper to add a section to PDF
     */
    addPDFSection(doc, label, value) {
        if (value === null || value === undefined || value === '') {
            return;
        }

        doc.font('Helvetica-Bold').text(`${label}: `, { continued: true })
            .font('Helvetica').text(String(value))
            .moveDown(0.5);
    }

    /**
     * Generate filename for export
     */
    generateFilename(reportData, extension) {
        const companyName = (reportData.company_name || 'Company')
            .replace(/[^a-z0-9]/gi, '_')
            .substring(0, 30);
        const fy = (reportData.financial_year || 'FY').replace(/[^a-z0-9]/gi, '');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '').substring(0, 15);

        return `BRSR_Report_${companyName}_${fy}_${timestamp}.${extension}`;
    }
}

module.exports = new BRSRExportController();
