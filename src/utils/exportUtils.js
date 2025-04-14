import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Helper function to convert data to CSV format
const convertToCSV = (data, fields) => {
  const headers = fields.map(field => field.label);
  const rows = data.map(item =>
    fields.map(field => item[field.id] || '')
  );
  return [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
};

// Helper function to encrypt data if password provided
const encryptData = async (data, password) => {
  if (!password) return data;
  
  const zip = new JSZip();
  zip.file('data', data);
  const encrypted = await zip.generateAsync({
    type: 'blob',
    password,
    encryption: 'AES-256'
  });
  return encrypted;
};

// Helper function to format filename
const getFileName = (type, format, dateRange) => {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
  const dateStr = dateRange ? 
    `_${format(dateRange.start, 'yyyy-MM-dd')}_to_${format(dateRange.end, 'yyyy-MM-dd')}` : 
    '';
  return `${type}_export${dateStr}_${timestamp}.${format}`;
};

// Export to CSV
export const exportToCSV = async (data, fields, config) => {
  const csv = convertToCSV(data, fields);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const encrypted = await encryptData(blob, config.password);
  const fileName = getFileName(config.type, 'csv', config.dateRange);
  saveAs(encrypted, fileName);
};

// Export to Excel
export const exportToExcel = async (data, fields, config) => {
  const ws = XLSX.utils.json_to_sheet(
    data.map(item => 
      fields.reduce((obj, field) => ({
        ...obj,
        [field.label]: item[field.id]
      }), {})
    )
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Export');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const encrypted = await encryptData(blob, config.password);
  const fileName = getFileName(config.type, 'xlsx', config.dateRange);
  saveAs(encrypted, fileName);
};

// Export to PDF
export const exportToPDF = async (data, fields, config) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(`${config.type.toUpperCase()} EXPORT`, 14, 15);
  
  // Add date range
  if (config.dateRange.start && config.dateRange.end) {
    doc.setFontSize(12);
    doc.text(
      `Period: ${format(config.dateRange.start, 'PP')} to ${format(config.dateRange.end, 'PP')}`,
      14, 25
    );
  }
  
  // Add table
  doc.autoTable({
    head: [fields.map(field => field.label)],
    body: data.map(item => fields.map(field => item[field.id] || '')),
    startY: 35,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [33, 150, 243] }
  });
  
  // Add metadata if requested
  if (config.includeMetadata) {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, pageHeight - 10);
  }
  
  const pdfBlob = doc.output('blob');
  const encrypted = await encryptData(pdfBlob, config.password);
  const fileName = getFileName(config.type, 'pdf', config.dateRange);
  saveAs(encrypted, fileName);
};

// Export to JSON
export const exportToJSON = async (data, fields, config) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const encrypted = await encryptData(blob, config.password);
  const fileName = getFileName(config.type, 'json', config.dateRange);
  saveAs(encrypted, fileName);
};

// Main export function
export const exportData = async (data, fields, config) => {
  try {
    switch (config.format.toLowerCase()) {
      case 'csv':
        await exportToCSV(data, fields, config);
        break;
      case 'excel':
        await exportToExcel(data, fields, config);
        break;
      case 'pdf':
        await exportToPDF(data, fields, config);
        break;
      case 'json':
        await exportToJSON(data, fields, config);
        break;
      default:
        throw new Error(`Unsupported format: ${config.format}`);
    }
    
    // Send email if recipients specified
    if (config.recipients) {
      // Will implement email sending functionality
      console.log('Sending export to:', config.recipients);
    }
    
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};
