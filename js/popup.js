//This JS file will load from background.js the angular version of the current tab and others angular versions met while browsing.

//get current tab.id
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
    var bkg = chrome.extension.getBackgroundPage(); //get to versions array from background page
    var versions = bkg.getVersions(); // our custom method in background.js

    //build table data for all versions met
    var table = "" +
    "<table class='table-bordered'>"+
    "  <caption>Browsing history<caption>" +
    "  <th>"+
    "    Version"+
    "  </th>"+
    "  <th>"+
    "    URL"+
    "  </th>";

    versions.forEach(function(v){
      if(!v.duplicate){ //avoid duplicate table entry
        table += ""+
        "  <tr>" +
          "    <td>"+
                v.txt +
          "    </td>"+
          "    <td>"+
          "      <a target='_blank' href=" + v.url + ">" + v.url +"</a>" +
          "    </td>"+
        "  </tr>";
      }
    });

    table += "</table>";

    //display in popup.html
    document.getElementById("version").innerHTML = versions[tabs[0].id].txt; //current angular app
    document.getElementById("data").innerHTML = table; //others angular app met while browsing
});
