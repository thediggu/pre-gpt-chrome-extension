document.addEventListener("DOMContentLoaded", function () {
  // Load items from storage and add to the list
  chrome.storage.local.get("customItems", function (data) {
    if (data.customItems) {
      data.customItems.forEach((item) => {
        addItemToList(item.name, item.description);
      });
    }
  });
});

document.getElementById("addButton").addEventListener("click", function () {
  document.getElementById("addItemForm").style.display = "block";
});

document.getElementById("addItemButton").addEventListener("click", function () {
  const itemName = document.getElementById("newItemName").value;
  const itemDescription = document.getElementById("newItemDescription").value;

  // Add the item to the list
  addItemToList(itemName, itemDescription);

  // Store the new item in the local storage
  chrome.storage.local.get("customItems", function (data) {
    let customItems = data.customItems || [];
    customItems.push({ name: itemName, description: itemDescription });
    chrome.storage.local.set({ customItems: customItems });
  });

  document.getElementById("addItemForm").style.display = "none";
  document.getElementById("newItemName").value = "";
  document.getElementById("newItemDescription").value = "";
});

const listItems = document.querySelectorAll(".list-item");
listItems.forEach(attachClickListener);

function addItemToList(itemName, itemDescription) {
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.setAttribute("data-description", itemDescription);
  listItem.setAttribute("data-value", itemName);
  listItem.textContent = itemName;

  document.getElementById("expertiseList").appendChild(listItem);

  attachClickListener(listItem);
}

function attachClickListener(listItem) {
  listItem.addEventListener("click", function () {
    const description =
      this.getAttribute("data-description") ||
      "Act as an experienced " +
        this.getAttribute("data-value") +
        " developer with years of expertise.";

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
