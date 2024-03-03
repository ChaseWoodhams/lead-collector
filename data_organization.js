```javascript
// data_organization.js

// Importing the shared dependencies
let googleSheetData = require('./google_sheets_api.js').googleSheetData;
let memberDataSchema = require('./content.js').memberDataSchema;

// Function to organize the data before saving
function organizeData() {
    // Create a new array to hold the organized data
    let organizedData = [];

    // Loop through the extracted data
    for (let i = 0; i < googleSheetData.length; i++) {
        // Create a new object to hold the organized member data
        let organizedMemberData = {};

        // Loop through the member data schema
        for (let key in memberDataSchema) {
            // If the extracted data has a property that matches the schema key
            if (googleSheetData[i].hasOwnProperty(key)) {
                // Add the property and its value to the organized member data
                organizedMemberData[key] = googleSheetData[i][key];
            } else {
                // If the extracted data does not have a property that matches the schema key, add the key with a value of null
                organizedMemberData[key] = null;
            }
        }

        // Add the organized member data to the organized data array
        organizedData.push(organizedMemberData);
    }

    // Return the organized data
    return organizedData;
}

// Export the organizeData function
module.exports = {
    organizeData: organizeData
};
```