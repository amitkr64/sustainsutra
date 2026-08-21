import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const ExportService = {
  exportToCSV: (data, filename = 'export.csv') => {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (typeof value === 'string') {
            return `"${value.replace(/"/g, '""')}"`;
          }
          if (value === null || value === undefined) {
            return '';
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
  },

  exportToJSON: (data, filename = 'export.json') => {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, filename);
  },

  exportToExcel: (data, filename = 'export.xlsx') => {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const worksheet = data.length > 0 
      ? XLSX.utils.json_to_sheet(data)
      : XLSX.utils.aoa_to_sheet([['No data available']]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    XLSX.writeFile(workbook, filename);
  },

  exportToPDF: async (data, filename = 'export.pdf', options = {}) => {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const {
      title = 'Report',
      subtitle = '',
      orientation = 'portrait',
      pageSize = 'a4',
      columns = Object.keys(data[0])
    } = options;

    const doc = new jsPDF({
      orientation,
      unit: 'pt',
      format: pageSize
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 60;
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;

    let yPos = margin;

    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#0B0F0B');
    doc.text(title, margin, yPos);
    yPos += 40;

    if (subtitle) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#A0AAB5');
      doc.text(subtitle, margin, yPos);
      yPos += 30;
    }

    yPos += 20;

    doc.setDrawColor('#1B4332');
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 30;

    doc.setFontSize(11);
    doc.setTextColor('#F8FAFC');

    const columnWidths = columns.map(() => usableWidth / columns.length);

    data.forEach((row, index) => {
      if (yPos > usableHeight) {
        doc.addPage();
        yPos = margin;
      }

      Object.entries(row).forEach(([key, value], colIndex) => {
        const xPos = margin + colIndex * (usableWidth / columns.length);
        const cellWidth = usableWidth / columns.length - 10;

        let displayValue = value;
        if (typeof value === 'number') {
          displayValue = value.toLocaleString('en-IN');
        } else if (value === null || value === undefined) {
          displayValue = '—';
        }

        const headerKey = columns[colIndex];

        if (index === 0) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor('#D4AF37');
          doc.text(headerKey, xPos, yPos);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor('#A0AAB5');
          doc.text(displayValue?.toString() || '', xPos, yPos);
        }
      });

      yPos += 25;

      if (index === 0) {
        yPos += 10;
      }
    });

    doc.save(filename);
  },

  flattenBRSRData: (reportData) => {
    const flattened = [];
    
    if (!reportData) return flattened;

    if (reportData.indicators) {
      Object.entries(reportData.indicators).forEach(([section, indicators]) => {
        if (Array.isArray(indicators)) {
          indicators.forEach(indicator => {
            flattened.push({
              ...indicator,
              section,
              companyName: reportData.companyName,
              financialYear: reportData.financialYear,
              esgScore: reportData.esgScore
            });
          });
        }
      });
    }

    if (reportData.metrics) {
      Object.entries(reportData.metrics).forEach(([category, metrics]) => {
        if (typeof metrics === 'object') {
          Object.entries(metrics).forEach(([key, value]) => {
            flattened.push({
              companyName: reportData.companyName,
              financialYear: reportData.financialYear,
              category,
              metric: key,
              value
            });
          });
        }
      });
    }

    if (flattened.length === 0) {
      flattened.push({
        companyName: reportData.companyName,
        financialYear: reportData.financialYear,
        esgScore: reportData.esgScore,
        environmentalScore: reportData.environmentalScore,
        socialScore: reportData.socialScore,
        governanceScore: reportData.governanceScore,
        ...reportData
      });
    }

    return flattened;
  },

  exportBRSRToPDF: async (reportData, filename) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = `BRSR_Report_${reportData.companyName || 'report'}_${timestamp}.pdf`;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;

    let yPos = margin;

    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(11, 15, 11);
    doc.text('BRSR Analysis Report', margin, yPos);
    yPos += 35;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(reportData.companyName || 'Company Name', margin, yPos);
    yPos += 20;

    doc.setFontSize(12);
    doc.text(`Financial Year: ${reportData.financialYear || 'N/A'}`, margin, yPos);
    yPos += 20;

    if (reportData.esgScore !== undefined) {
      doc.text(`ESG Score: ${reportData.esgScore}`, margin, yPos);
    }
    yPos += 30;

    doc.setDrawColor(27, 67, 50);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 30;

    const flattenedData = ExportService.flattenBRSRData(reportData);

    if (flattenedData.length > 0) {
      const headers = Object.keys(flattenedData[0]);
      const colWidth = usableWidth / headers.length;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);

      headers.forEach((header, index) => {
        const xPos = margin + index * colWidth;
        doc.text(header.toUpperCase(), xPos, yPos);
      });

      yPos += 20;
      doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);

      flattenedData.forEach((row, rowIndex) => {
        if (yPos > usableHeight - 30) {
          doc.addPage();
          yPos = margin;
        }

        headers.forEach((header, colIndex) => {
          const xPos = margin + colIndex * colWidth;
          let value = row[header];

          if (value === null || value === undefined) {
            value = '—';
          } else if (typeof value === 'number') {
            value = value.toLocaleString('en-IN');
          } else if (typeof value === 'object') {
            value = JSON.stringify(value);
          }

          doc.text(String(value).substring(0, 15), xPos, yPos);
        });

        yPos += 18;
      });
    }

    yPos += 20;

    if (yPos > usableHeight - 60) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, pageHeight - margin);

    doc.save(filename || defaultFilename);
  },

  exportBRSRToExcel: (reportData, filename) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = `BRSR_Report_${reportData.companyName || 'report'}_${timestamp}.xlsx`;

    const workbook = XLSX.utils.book_new();
    const flattenedData = ExportService.flattenBRSRData(reportData);

    if (flattenedData.length > 0) {
      const mainWorksheet = XLSX.utils.json_to_sheet(flattenedData);
      XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'Data');
    }

    if (reportData.companyName || reportData.financialYear) {
      const summaryData = [{
        'Company Name': reportData.companyName || 'N/A',
        'Financial Year': reportData.financialYear || 'N/A',
        'ESG Score': reportData.esgScore || 'N/A',
        'Environmental Score': reportData.environmentalScore || 'N/A',
        'Social Score': reportData.socialScore || 'N/A',
        'Governance Score': reportData.governanceScore || 'N/A'
      }];
      const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');
    }

    XLSX.writeFile(workbook, filename || defaultFilename);
  },

  exportBRSRToCSV: (reportData, filename) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = `BRSR_Report_${reportData.companyName || 'report'}_${timestamp}.csv`;

    const flattenedData = ExportService.flattenBRSRData(reportData);
    ExportService.exportToCSV(flattenedData, filename || defaultFilename);
  },

  exportReport: async (reportData, format = 'pdf', filename) => {
    if (!reportData) {
      console.warn('No report data to export');
      return;
    }

    switch (format.toLowerCase()) {
      case 'pdf':
        await ExportService.exportBRSRToPDF(reportData, filename);
        break;
      case 'excel':
      case 'xlsx':
        ExportService.exportBRSRToExcel(reportData, filename);
        break;
      case 'csv':
        ExportService.exportBRSRToCSV(reportData, filename);
        break;
      case 'json':
        ExportService.exportToJSON(reportData, filename);
        break;
      default:
        console.warn(`Unsupported export format: ${format}`);
    }
  }
};

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export { ExportService };
