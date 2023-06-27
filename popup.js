document.getElementById("addButton").addEventListener("click", function () {
  document.getElementById("addItemForm").style.display = "block";
});

document.getElementById("addItemButton").addEventListener("click", function () {
  const itemName = document.getElementById("newItemName").value;
  const itemDescription = document.getElementById("newItemDescription").value;

  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.setAttribute("data-description", itemDescription);
  listItem.setAttribute("data-value", itemName);
  listItem.textContent = itemName;

  document.getElementById("expertiseList").appendChild(listItem);

  document.getElementById("addItemForm").style.display = "none";
  document.getElementById("newItemName").value = "";
  document.getElementById("newItemDescription").value = "";
  attachClickListener(listItem);
});

const listItems = document.querySelectorAll(".list-item");
listItems.forEach(attachClickListener);

function attachClickListener(listItem) {
  listItem.addEventListener("click", function () {
    const description =
      this.getAttribute("data-description") ||
      "Act as an experienced " +
        this.getAttribute("data-value") +
        " developer with years of expertise. Ask me questions to clear any confusion, if necessary. Help me with the following - ";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: insertText,
          args: [description],
        },
        function () {
          window.close(); // Close the popup after executing the script
        }
      );
    });
  });
}

function insertText(description) {
  const textarea = document.getElementById("prompt-textarea");
  if (textarea) {
    textarea.value = description;
  }
}
