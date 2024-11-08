// background.js

// Create the context menu item
chrome.contextMenus.create({
  id: "convert2Lowercase",
  title: "Convert to Lowercase",
  contexts: ["selection"]
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convert2Lowercase" && info.selectionText) {
      // Send a message to content script to convert text to lowercase
      const  lowerText = info.selectionText.toLowerCase();

      chrome.tabs.sendMessage(tab.id, {action: "injectText", text: lowerText, position: info});
  }
});
