import { Handler } from '@netlify/functions';
import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { courierName, dateTime, flexCount, gestionPostCount, total, signature } = JSON.parse(event.body || '');

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          courierName,
          dateTime,
          flexCount,
          gestionPostCount,
          total,
          signature
        ]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Datos guardados correctamente' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al guardar los datos' }),
    };
  }
};

export { handler };
