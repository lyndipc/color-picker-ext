// Get color from mouse position
getColorAtCoordinates = (x, y) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // Set canvas size to 1x1 pixel
    canvas.width = 1;
    canvas.height = 1;

    // Draw a 1x1 pixel rectangle of the color at the mouse position
    context.drawImage(document.documentElement, x, y, 1, 1, 0, 0, 1, 1);

    // Get the color data of the pixel
    var pixelData = context.getImageData(0, 0, 1, 1).data;

    // Convert the color data to a hex string
    var color = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    return color;
}

rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

componentToHex = (c) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
}
    var mouseX = 0;
    var mouseY = 0;

    // // Add color dropper to cursor
    var colorDropper = document.createElement("div");
    colorDropper.id = "colorDropper";
    colorDropper.style.position = "fixed";
    colorDropper.style.width = "10px";
    colorDropper.style.height = "10px";
    colorDropper.style.border = "1px solid black";
    colorDropper.style.borderRadius = "50%";

    if (document.documentElement) {
        document.documentElement.appendChild(colorDropper);
    } else {
        console.error("Body not found");
    }

    var port = chrome.runtime.connect({ name: "colorCapturePort" });
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Get color under cursor
        var color = getColorAtCoordinates(mouseX, mouseY);

        // Set background color of color dropper
        colorDropper.style.backgroundColor = color;

        // Send color to background script
        port.postMessage({ action: "captureColor", mouseX: mouseX, mouseY: mouseY });
        // chrome.runtime.sendMessage({ action: "updateColor", color: color });
    });

    document.addEventListener("mousedown", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        var color = getColorAtCoordinates(mouseX, mouseY);

        // Send color to background script
        port.postMessage({ action: "captureColor", mouseX: mouseX, mouseY: mouseY });
        // chrome.action.onClicked.sendMessage({ action: "updateColor", color: color });
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "captureColor") {
            var color = getColorAtCoordinates(request.mouseX, request.mouseY);

            chrome.runtime.sendResponse({ action: "updateColor", color: color });
        }
    });