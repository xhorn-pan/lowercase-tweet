function getParentOfSelectedText() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let parentElement = range.startContainer.parentElement;

    // Optionally, walk up the DOM tree to find a specific parent (e.g., a <div> or a <span>)
    while (parentElement && parentElement.nodeName !== "DIV") {
      parentElement = parentElement.parentElement;
    }
    return parentElement;
  }
  return null;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectText") {
        const lowerText = message.text;
        const parentElement = getParentOfSelectedText();

        if(parentElement) {
            const popupElement = document.createElement('div');
             // Add a <br> before the text
            const lineBreak = document.createElement('br');
            popupElement.appendChild(lineBreak);
            // Add the transformed text as a text node
            const textNode = document.createTextNode(lowerText);
            popupElement.appendChild(textNode);

            parentElement.appendChild(popupElement);
        }
    }
});
