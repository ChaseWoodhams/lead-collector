document.addEventListener('DOMContentLoaded', function() {
    let groupSelect = document.getElementById('groupSelect');
    let dataDisplay = document.getElementById('dataDisplay');

    groupSelect.addEventListener('change', function() {
        chrome.runtime.sendMessage({message: 'extractData', group: groupSelect.value}, function(response) {
            if (response.success) {
                fbGroupData = response.data;
                dataDisplay.textContent = JSON.stringify(fbGroupData, null, 2);
            } else {
                dataDisplay.textContent = 'Error: ' + response.error;
            }
        });
    });

    document.getElementById('saveDataButton').addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'saveData', data: fbGroupData}, function(response) {
            if (response.success) {
                dataDisplay.textContent = 'Data saved successfully!';
            } else {
                dataDisplay.textContent = 'Error: ' + response.error;
            }
        });
    });
});