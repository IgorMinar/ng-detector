//This JS file will load from background.js the angular version of the current tab and others angular versions met while browsing.

//get current tab.id
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
    var bkg = chrome.extension.getBackgroundPage(); //get to versions array from background page
    var versions = bkg.getCurrentTabVersion(); // our custom method in background.js, tab.id indexed
    var allVersions = bkg.getAllVersions(); // our custom method in background.js, normally indexed

    //build table data for all versions met
    var table = "" +
    "<table class='table-bordered'>"+
    "  <caption>Browsing history<caption>" +
    "  <th>"+
    "    URL"+
    "  </th>"+
    "  <th>"+
    "    Version"+
    "  </th>";

    allVersions.forEach(function(v){
      if(v.url === versions[tabs[0].id].url){ //add active class for the current tab version
        table += "  <tr class='active'>";
      }
      else {
        table += "  <tr>";
      }

      table += "" +
      "    <td>"+
      "      <a target='_blank' href=" + v.url + ">" + v.url +"</a>" +
      "    </td>"+
      "    <td>"+
            v.txt +
      "    </td>"+
      "  </tr>";
    });

    table += "</table>";

    //display in popup.html
    document.getElementById("version").innerHTML = versions[tabs[0].id].txt; //current angular app
    document.getElementById("data").innerHTML = table; //others angular app met while browsing
});
