import React, { useState } from 'react';
import axios from 'axios';
import { userService } from '@/services/userService';
import { ExportService } from '@/services/exportService';

/**
 * BRSR Export Buttons Component
 * Provides XML, PDF, Excel, and CSV download functionality
 */
const BRSRExportButtons = ({ reportData, onExportComplete }) => {
    const [loading, setLoading] = useState({ xml: false, pdf: false, excel: false, csv: false });
    const [error, setError] = useState(null);

    /**
     * Handle CSV export
     */
    const handleCSVExport = async () => {
        try {
            setLoading({ ...loading, csv: true });
            setError(null);

            await ExportService.exportReport(reportData, 'csv');

            if (onExportComplete) {
                onExportComplete('csv');
            }

        } catch (err) {
            console.error('CSV Export Error:', err);
            setError('Failed to export CSV. Please try again.');
        } finally {
            setLoading({ ...loading, csv: false });
        }
    };

    /**
     * Handle Excel export
     */
    const handleExcelExport = async () => {
        try {
            setLoading({ ...loading, excel: true });
            setError(null);

            await ExportService.exportReport(reportData, 'excel');

            if (onExportComplete) {
                onExportComplete('excel');
            }

        } catch (err) {
            console.error('Excel Export Error:', err);
            setError('Failed to export Excel. Please try again.');
        } finally {
            setLoading({ ...loading, excel: false });
        }
    };

    /**
     * Handle XML export
     */
    const handleXMLExport = async () => {
        try {
            setLoading({ ...loading, xml: true });
            setError(null);

            const response = await axios.post(
                `/api/brsr/export/xml/${reportData._id}`,
                {},
                {
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${userService.getToken()}`
                    }
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : `BRSR_Report_${reportData._id}.xml`;

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            if (onExportComplete) {
                onExportComplete('xml');
            }

        } catch (err) {
            console.error('XML Export Error:', err);
            setError('Failed to export XML. Please try again.');
        } finally {
            setLoading({ ...loading, xml: false });
        }
    };

    /**
     * Handle PDF export
     */
    const handlePDFExport = async () => {
        try {
            setLoading({ ...loading, pdf: true });
            setError(null);

            await ExportService.exportReport(reportData, 'pdf');

            if (onExportComplete) {
                onExportComplete('pdf');
            }

        } catch (err) {
            console.error('PDF Export Error:', err);
            setError('Failed to export PDF. Please try again.');
        } finally {
            setLoading({ ...loading, pdf: false });
        }
    };

    const isAnyLoading = Object.values(loading).some(l => l);

    return (
        <div className="brsr-export-buttons">
            <div className="export-container p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Export Your BRSR Report
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Download your completed BRSR report in XML, PDF, Excel, or CSV format
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* XML Export Button */}
                    <button
                        onClick={handleXMLExport}
                        disabled={isAnyLoading}
                        className={`
                            flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium
                            transition-all duration-200 shadow-md
                            ${isAnyLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95'
                            }
                        `}
                    >
                        {loading.xml ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        )}
                        <span className="text-sm">{loading.xml ? 'Generating...' : 'XML'}</span>
                    </button>

                    {/* PDF Export Button */}
                    <button
                        onClick={handlePDFExport}
                        disabled={isAnyLoading}
                        className={`
                            flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium
                            transition-all duration-200 shadow-md
                            ${isAnyLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95'
                            }
                        `}
                    >
                        {loading.pdf ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        <span className="text-sm">{loading.pdf ? 'Generating...' : 'PDF'}</span>
                    </button>

                    {/* Excel Export Button */}
                    <button
                        onClick={handleExcelExport}
                        disabled={isAnyLoading}
                        className={`
                            flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium
                            transition-all duration-200 shadow-md
                            ${isAnyLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95'
                            }
                        `}
                    >
                        {loading.excel ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        <span className="text-sm">{loading.excel ? 'Generating...' : 'Excel'}</span>
                    </button>

                    {/* CSV Export Button */}
                    <button
                        onClick={handleCSVExport}
                        disabled={isAnyLoading}
                        className={`
                            flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium
                            transition-all duration-200 shadow-md
                            ${isAnyLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg active:scale-95'
                            }
                        `}
                    >
                        {loading.csv ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        )}
                        <span className="text-sm">{loading.csv ? 'Generating...' : 'CSV'}</span>
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {/* Info Message */}
                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-700 text-sm">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium">Export Information:</p>
                            <ul className="mt-1 ml-4 list-disc">
                                <li>XML format follows XBRL taxonomy standards</li>
                                <li>PDF includes formatted report with all sections</li>
                                <li>Excel provides multi-sheet export for detailed analysis</li>
                                <li>CSV offers raw data for custom processing</li>
                                <li>All files are generated on-demand and not stored</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BRSRExportButtons;
