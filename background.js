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
      var version = '';
      
      // Angular 1
      if(versionObject.codename) {
        version = 'AngularJS ' + versionObject.full + '\n' + versionObject.codeName;
      }
      // Angular 2
      else if(!versionObject.codename && versionObject.major) {
        version = 'Angular ' + versionObject.major;
      }
      else {
        version = 'Angular'; // maybe AngularDart or lazy-loaded AngularJS?
      }

      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setTitle({
        tabId: sender.tab.id,
        title: 'Super-powered by \n' + version
      });

      // Angular 2
      if(versionObject.major == 2) {
        chrome.pageAction.setIcon({path: "images/angular2_38.png", tabId: sender.tab.id});
      }

      console.log(version + 'found at:', sender.tab.url);
    }
  });
