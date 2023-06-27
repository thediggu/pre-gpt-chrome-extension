// chrome.runtime.onInstalled.addListener(function () {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: "chat.openai.com" },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
