var angularFound = !!(document.querySelector('.ng-scope, ' +
                                             '[ng-app], [data-ng-app], ' +
                                             '[ng-controller], [data-ng-controller], ' +
                                             '[ng-repeat], [data-ng-repeat]') ||
                      document.querySelector('script[src*="angular.js"], ' +
                                             'script[src*="angular.min.js"]'));

if (angularFound) {
  chrome.runtime.sendMessage({angular: true});
}
