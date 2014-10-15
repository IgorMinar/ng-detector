console.log('ng-detector background script started!');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (typeof request === 'string') {
      try {
        request = JSON.parse(request);
      } catch (e) {}
    }
    if (request.angular) {
      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setTitle({
        tabId: sender.tab.id,
        title: request.angular.full
      });
      console.log('Angular found at:', sender.tab.url);
    }
  });
