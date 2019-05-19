var objApp;
var objWindow;
var pluginPath;
var pluginData;
var browserObject;
var zoom = 100;
let inited = false;

// Initialize WizNote APIs
new QWebChannel(qt.webChannelTransport, function (channel) {
    var objectNames = ["WizExplorerApp", "JSPluginSpec", "JSPluginModuleSpec"];
    for (var i = 0; i < objectNames.length; i++) {
        var key = objectNames[i];
        window[key] = channel.objects[key];
    }
    console.log("web channel opened");
    //
    if (typeof initForWebEngine !== 'undefined') {
        try {
            initForWebEngine();
        } catch (err) {
            console.error(err);
        }
    }
});
//
async function initForWebEngine() {
    if (!window.WizExplorerApp) return;
    if (inited) return;
    objApp = window.WizExplorerApp;
    objWindow = objApp.Window;
    pluginData = window.JSPluginSpec;
    moduleData = window.JSPluginModuleSpec;
    pluginPath = pluginData.path;
    browserObject = await objWindow.CurrentDocumentBrowserObject();
    await initZoom();
    //
    moduleData.willShow.connect(() => {
        initZoom();
    });
}

initForWebEngine();
//
async function initZoom() {
    browserObject = await objWindow.CurrentDocumentBrowserObject();
    zoom = await browserObject.GetZoom();
    zoomValue.innerHTML = zoom + "%";
    //objApp.Window.UpdateToolButton("document", "ZoomButton", "/ButtonText=" + zoom + "%", "");
}
async function buttonZoomIn_onclick() {
    zoom += 5;
    if (zoom > 300)
        zoom = 300;
    await browserObject.SetZoom(zoom);
    initZoom();
}

async function buttonZoomOut_onclick() {
    zoom -= 5;
    if (zoom < 50)
        zoom = 50;
    await browserObject.SetZoom(zoom);
    initZoom();
}

async function resetBrowserObject() {
    browserObject = objWindow.CurrentDocumentBrowserObject;
}