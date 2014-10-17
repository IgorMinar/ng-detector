var angularFound = !!(document.querySelector('.ng-binding, ' +
                                             '[ng-app], [data-ng-app], ' +
                                             '[ng-controller], [data-ng-controller], ' +
                                             '[ng-repeat], [data-ng-repeat]') ||
                      document.querySelector('script[src*="angular.js"], ' +
                                             'script[src*="angular.min.js"]'));

if (angularFound) {

  var html = document.getElementsByTagName('html')[0];

  var eventProxyElement = document.createElement('div');
  eventProxyElement.id = '__ngDetectorElement';
  eventProxyElement.style.display = 'none';
  html.appendChild(eventProxyElement);

  // inject into the application context from the content script context

  var script = window.document.createElement('script');
  script.src = chrome.extension.getURL('inject.js');
  script.id = '__ngDetectorScript';

  eventProxyElement.addEventListener('angularVersionEvent', function () {
    var eventData = eventProxyElement.innerText;
    chrome.runtime.sendMessage(eventData);
  });

  html.appendChild(script);
}
