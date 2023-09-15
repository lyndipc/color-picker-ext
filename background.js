chrome.contextMenus.create({
    id: "captureColor",
    title: "Capture Color",
    contexts: ["all"],
});

// TODO: add mouse listener 

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "captureColor") {
        var mouseX = info.clientX;
        var mouseY = info.clientY;

        chrome.runtime.sendMessage({ action: "updateColor", mouseX: mouseX, mouseY: mouseY });
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "colorCapturePort") {
        chrome.runtime.sendMessage.addListener((message) => {
            if (message.action === "updateColor") {
                chrome.storage.local.set({ color: message.color });
            }
        });
    }
});

// TODO: get color from content script
// It's currently returning undefined because we are not actually passing it in