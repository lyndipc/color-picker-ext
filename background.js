chrome.contextMenus.create({
    id: "captureColor",
    title: "Capture Color",
    contexts: ["all"],
});

// TODO: add mouse listener 

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "captureColor") {

        // Get color under cursor
        var mouseX = info.clientX;
        var mouseY = info.clientY;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
                var color = getColorAtCoordinates(mouseX, mouseY);
                chrome.runtime.sendMessage({ action: "updateColor", color: color });
            },
            args: [mouseX, mouseY]
        });
    }
});