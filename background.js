console.log('ng-detector background script started!');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (typeof request === 'string') {
      try {
        request = JSON.parse(request);
      } catch (e) {}
    }

    var versionObject = request.angularVersion;

    if (versionObject) {
      var version = versionObject.codeName
                    ? 'AngularJS ' + versionObject.full + '\n' + versionObject.codeName
                    : 'Angular'; // maybe AngularDart or lazy-loaded AngularJS?

      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setTitle({
        tabId: sender.tab.id,
        title: 'Super-powered by \n' + version
      });

      console.log(version + 'found at:', sender.tab.url);
    }
  });
