// Importing dependencies
import { extractMemberData } from './content.js';
import { saveToGoogleSheets } from './google_sheets_api.js';

let fbGroupData = [];
let googleSheetData = [];

// Listening for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'extractData') {
    extractData(request.groupId);
  } else if (request.message === 'saveData') {
    saveData();
  }
});

// Function to extract data from Facebook group
function extractData(groupId) {
  extractMemberData(groupId)
    .then(data => {
      fbGroupData = data;
      sendResponse({message: 'Data extraction successful'});
    })
    .catch(error => {
      console.error('Error in data extraction: ', error);
      sendResponse({message: 'Data extraction failed'});
    });
}

// Function to save data to Google Sheets
function saveData() {
  saveToGoogleSheets(googleSheetData)
    .then(() => {
      sendResponse({message: 'Data saved successfully'});
    })
    .catch(error => {
      console.error('Error in saving data: ', error);
      sendResponse({message: 'Data saving failed'});
    });
}