
function OnZoomButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("Zoom.js");
    var bookmarksListHtmlFileName = pluginPath + "Zoom.htm";
    //
    var rect = objWindow.GetToolButtonRect("document", "ZoomButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(bookmarksListHtmlFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 150, 80, "");
}

function WizZoomOnContainerActivated() {
    setTimeout(function () {
        zoom = objApp.ExecuteCommand("GetZoom", null, null);
        objApp.Window.UpdateToolButton("document", "ZoomButton", "/ButtonText=" + zoom + "%", "");
    }, 300);
}

function WizZoomOnContainerZoomChanged(zoom) {
    if (!zoom) {
        zoom = objApp.ExecuteCommand("GetZoom", null, null);
    }
    //
    objApp.Window.UpdateToolButton("document", "ZoomButton", "/ButtonText=" + zoom + "%", "");
    //
}

function WizZoomOnContainerUpdate(flags) {
    flags = flags.toLowerCase();
    var arrayFlags = flags.split("/");
    var flag = arrayFlags[0];
    flag = flag.trim();
    //
    if (flag == "activated") {
        WizZoomOnContainerActivated();
    }
    else if (flag == "zoomchanged") {
        var zoom;
        for (var i = 0; i < arrayFlags.length; i ++) {
            var flag = arrayFlags[i].trim();
            //
            if (-1 != flag.indexOf("zoompercent")) {
                zoom = flag.substr(flag.indexOf("=") + 1);
                break;
            }
        }
        //
        WizZoomOnContainerZoomChanged(zoom);
    }
}

function InitZoomButton() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("Zoom.js");
    zoom = objApp.ExecuteCommand("GetZoom", null, null);
    var buttonText = zoom + "%";
    //
    var options = "/ShowText=1 " + 
                "/OnContainerUpdateFunc=WizZoomOnContainerUpdate";
    //
	var iconFileName = pluginPath + "zoom.ico";
	if(objApp.ExecuteCommand("IsNightModeOn", null, null)){
		iconFileName = pluginPath + "zoom-night.ico";
	}
    //
    objWindow.AddToolButtonEx("document", "ZoomButton", buttonText, iconFileName
        , "OnZoomButtonClicked", options);
}

InitZoomButton();
