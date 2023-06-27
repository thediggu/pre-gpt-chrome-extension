chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "insertText") {
    const inputField = document.querySelector('[data-slate-editor="true"]');
    const textToInsert = request.text;

    if (inputField && textToInsert) {
      const textEvent = new InputEvent("textInput", {
        inputType: "insertText",
        data: textToInsert,
        bubbles: true,
        cancelable: true,
        composed: true,
        view: window,
      });

      inputField.dispatchEvent(textEvent);
    }
  }
});

// Listen for dropdown item selection
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("dropdown-item")) {
    const selectedText = target.textContent.trim();
    chrome.runtime.sendMessage({
      action: "insertText",
      text: getTemplate(selectedText),
    });
  }
});

// Generate the appropriate template based on the selected item
function getTemplate(selectedText) {
  switch (selectedText) {
    case "React":
      return "Act as an experienced React developer with years of expertise.";
    case "Ruby on Rails":
      return "Act as an experienced Ruby on Rails developer with years of expertise.";
    case "Cook":
      return "Act as an experienced Cook with years of expertise.";
    default:
      return "";
  }
}
