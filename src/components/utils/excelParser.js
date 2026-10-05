import * as XLSX from 'xlsx';

export const parseErpExcel = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Koi file select nahi hui.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          reject('Excel workbook mein koi sheet nahi mili.');
          return;
        }

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        if (!rawData || rawData.length === 0) {
          reject('Excel file khali hai. Sahi data waali file upload karein.');
          return;
        }

        resolve(rawData);
      } catch (err) {
        console.error('Parsing Error:', err);
        reject('Excel file read karne mein masla hua. Standard .xlsx / .xls file upload karein.');
      }
    };

    reader.onerror = () => reject('File read karne mein error aya.');
    reader.readAsBinaryString(file);
  });
};