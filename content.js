// content.js

let fbGroupData = [];

const memberDataSchema = {
  name: '',
  joinedDate: '',
  answers: []
};

function extractMemberData() {
  let members = document.querySelectorAll('.memberBox');
  members.forEach(member => {
    let memberData = {...memberDataSchema};
    memberData.name = member.querySelector('.memberName').innerText;
    memberData.joinedDate = member.querySelector('.joinedDate').innerText;
    let answers = member.querySelectorAll('.answer');
    answers.forEach(answer => {
      memberData.answers.push(answer.innerText);
    });
    fbGroupData.push(memberData);
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "extractData") {
      extractMemberData();
      sendResponse({data: fbGroupData});
    }
  }
);