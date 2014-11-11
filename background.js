console.log('ng-detector background script started!');

var versions = []; //will contains all version of angular apps met, array index is tab.id

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (typeof request === 'string') {
      try {
        request = JSON.parse(request);
      } catch (e) {}
    }

    var versionObject = request.angularVersion;

    if (versionObject) {
      var url = sender.tab.url,
          tabId = sender.tab.id,
          txt = versionObject.codeName
                        ? 'AngularJS ' + versionObject.full + '\n' + versionObject.codeName
                        : 'Angular'; // maybe AngularDart or lazy-loaded AngularJS?

      versions[sender.tab.id] = {};

      versions[sender.tab.id].url = url;
      versions[sender.tab.id].tabId = tabId;
      versions[sender.tab.id].txt = txt;

      // duplicate case, if the user open the same angular app in a different tab we do not store the data again
      var unique = versions.filter(function(v) {
          return v.url === url;
      });
      versions[sender.tab.id].duplicate = unique.length > 1;

      chrome.pageAction.setTitle({
        tabId: tabId,
        title: 'Super-powered by \n' + txt
      });
      chrome.pageAction.show(tabId);
    }
  });

/**
 * @description
 * get all versions of angular met while browsing indexed by tab.id
 * used in popup.js to display version in popup.html
 * @returns {array}
 */
function getVersions(){
  return versions;
}
