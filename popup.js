// document.addEventListener("DOMContentLoaded", function () {
  const colorDisplay = document.getElementById("colorDisplay");

  // pickColorButton.addEventListener("click", () => {
  //   // Get the active tab
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     if (tabs[0]) {
  //       // Execute the content script in the active tab
  //       chrome.scripting.executeScript({
  //         target: { tabId: tabs[0].id },
  //         function: () => {
  //           const pageBackgroundColor = getComputedStyle(document.body).backgroundColor;
  //           chrome.runtime.sendMessage({ color: pageBackgroundColor });
  //         },
  //       });
  //     }
  //   });
  // });

  // Listen for messages from content script or background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateColor") {
      console.log("Received color: " + message.color);
      // Update the background of colorDisplay with the received color value
      colorDisplay.style.backgroundColor = message.color;
      colorDisplay.textContent = "Color: " + message.color;
    }
  });
// });
