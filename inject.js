(function () {
  'use strict';

  var eventProxyElement = document.getElementById('__ngDetectorElement');

  var customEvent = document.createEvent('Event');
  customEvent.initEvent('angularVersionEvent', true, true);

  function sendMessage(content) {
    eventProxyElement.innerText = JSON.stringify(content);
    eventProxyElement.dispatchEvent(customEvent);
  }

  sendMessage({
    angular: window.angular ? window.angular.version : { full: 'Powered by Angular' }
  });

  // remove elements from page
  var scriptElement = document.getElementById('__ngDetectorScript');
  eventProxyElement.remove();
  scriptElement.remove();

}());
