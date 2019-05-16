var objApp;
var objWindow;
var pluginPath;
var pluginData;
var browserObject;
var zoom = 100;
//
async function initForWebEngine() {
    if (!window.WizExplorerApp) return;
    objApp = window.WizExplorerApp;
    objWindow = objApp.Window;
    pluginData = window.WizPluginData;
    pluginPath = pluginData.path;
    browserObject = objWindow.CurrentDocumentBrowserObject;
    await initZoom();
}
console.log("Note.Zoom inited");
initForWebEngine();
//
async function initZoom() {
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