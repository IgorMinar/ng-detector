console.log('ng-detector background script started!');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.angular) {
      chrome.pageAction.show(sender.tab.id);
      console.log('Angular found at:', sender.tab.url);
    }
  });
