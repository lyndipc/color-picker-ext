document.addEventListener("DOMContentLoaded", () => {
    var mouseX = 0;
    var mouseY = 0;
    var isClick = false;

    // Add color dropper to cursor
    var colorDropper = document.createElement("div");
    colorDropper.id = "colorDropper";
    colorDropper.style.position = "fixed";
    colorDropper.style.width = "10px";
    colorDropper.style.height = "10px";
    colorDropper.style.border = "1px solid black";
    colorDropper.style.borderRadius = "50%";

    if (document.body) {
        document.body.appendChild(colorDropper);
    } else {
        console.error("Body not found");
    }

    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;

        // Get color under cursor
        var color = getColorAtCoordinates(mouseX, mouseY);

        // Set background color of color dropper
        colorDropper.style.backgroundColor = color;
        // chrome.runtime.sendMessage({ action: "updateColor", color: color });
    });

    document.addEventListener("mousedown", (e) => {
        isClick = true;
        var color = getColorAtCoordinates(mouseX, mouseY);

        // Send color to background script
        chrome.action.onClicked.sendMessage({ action: "updateColor", color: color });
    });

    // Get color from mouse position
    getColorAtCoordinates = (x, y) => {
        // ...
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
});