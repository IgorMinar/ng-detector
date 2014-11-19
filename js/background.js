console.log('ng-detector background script started!');

var versions = [], //stores all versions indexed by tab.id, data will be replaced if we go to another angular app with the same tab
    allVersions = []; //simply stores all versions by increasing index

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

      var newURL = true;
      if(versions[sender.tab.id] !== undefined){
        newURL = versions[sender.tab.id].url !== url;
      }

      if(newURL){
        versions[sender.tab.id] = {};

        versions[sender.tab.id].url = url;
        versions[sender.tab.id].tabId = tabId;
        versions[sender.tab.id].txt = txt;

        var unique = allVersions.filter(function(v) {
            return v.url === url;
        });
        versions[sender.tab.id].duplicate = unique.length > 0;

        // duplicate case, if the user open the same angular app in a different tab we do not store the data again
        if(!versions[sender.tab.id].duplicate){
          //store new data
          allVersions.unshift(versions[sender.tab.id]);
        }
      }

      chrome.pageAction.setTitle({
        tabId: tabId,
        title: 'Super-powered by \n' + txt
      });
      chrome.pageAction.show(tabId);
    }
  });

/**
 * @description
 * get all version indexed from the first met to the last met
 * used in popup.js to display version in popup.html
 * @returns {array}
 */
function getAllVersions(){
  return allVersions;
}

/**
 * @description
 * get versions index by tab.id of angular
 * used in popup.js to display version in popup.html
 * @returns {array}
 */
function getCurrentTabVersion(){
  return versions;
}
