import { google } from 'googleapis';
import { DeliveryFormData } from '../types';

const auth = new google.auth.JWT({
  email: process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export const appendToSheet = async (data: DeliveryFormData) => {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID,
      range: `${process.env.REACT_APP_SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.courierName,
          data.dateTime,
          data.flexCount,
          data.gestionPostCount,
          data.total,
          data.signature
        ]],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    throw error;
  }
};
