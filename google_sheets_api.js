```javascript
const {google} = require('googleapis');
const sheets = google.sheets('v4');

let googleSheetData = [];

// Authenticate with Google Sheets API
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: '/path/to/keyfile.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  google.options({auth: authClient});
}

// Save data to Google Sheets
async function saveToGoogleSheets() {
  const request = {
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    range: 'Sheet1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: googleSheetData,
    },
  };

  const response = await sheets.spreadsheets.values.append(request);
  return response.data;
}

// Listen for saveData message from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'saveData') {
    googleSheetData = request.data;
    authenticate().then(() => {
      saveToGoogleSheets().then((data) => {
        sendResponse({data: data, success: true});
      }).catch((error) => {
        sendResponse({data: error, success: false});
      });
    });
  }
  return true;
});
```