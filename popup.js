document.addEventListener("DOMContentLoaded", function () {

  // TODO: Keep the last selected color in color picker even after close and reopen the popup.
  // TODO: Allow copy and paste of hex color codes in input element.
  // TODO: Get the five most frequently used colors on the webpage.
  // TODO: Create button that allows adding the selected color to the color palette.
  // TODO: Create button that allows adding another color picker to the popup.
  /**
   * Retrieves the five most frequently used colors on a webpage
   * @param {DOM object} webpage 
   * @returns array of five colors
   */
  // function getFiveMostUsedColors(webpage) {
  //   // Get all the colors on the webpage.
  //   const colors = [];
  //   for (const element of webpage.querySelectorAll('*')) {
  //     colors.push(window.getComputedStyle(element).color);
  //   }
  
  //   // Count the frequency of each color.
  //   const colorCounts = {};
  //   for (const color of colors) {
  //     if (!colorCounts[color]) {
  //       colorCounts[color] = 0;
  //     }
  
  //     colorCounts[color]++;
  //   }
  
  //   // Sort the object by the frequency of each color, in descending order.
  //   const sortedColorCounts = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
  
  //   // Get the top five colors from the sorted object.
  //   const fiveMostUsedColors = [];
  //   for (const [i, colorCount] of sortedColorCounts.entries()) {
  //     fiveMostUsedColors.push(colorCount[0]);

  //     if (i === 6) {
  //       break;
  //     }
  //   }

  //   // Inject color boxes on the popup
  //   for (const color of fiveMostUsedColors) {
  //     const colorBox = document.createElement('div');
  //     colorBox.classList.add('colorBox');
  //     colorBox.style.backgroundColor = color;
  //     colorPalette.appendChild(colorBox);
  //   }
  //   return fiveMostUsedColors;
  // }

  // const colors = getFiveMostUsedColors(document);
  // console.log('colors: ', colors);

  // Populate the color palette with the five most frequently used colors.

  /**
   * Convert hex color to RGB
   * @param {hexColor} hexColor 
   * @returns RGB value of the hex color
   */
  function hexToRgb(hexColor) {
    const r = Number.parseInt(hexColor.substring(1, 3), 16);
    const g = Number.parseInt(hexColor.substring(3, 5), 16);
    const b = Number.parseInt(hexColor.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Convert RGB color to hex
   * @param {rgbColor} rgbColor
   * @returns hex value of the RGB color
   **/
  function rgbToHex(rgbColor) {
    // Split the RGB color into its components.
    const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
  
    // Convert the RGB components to hex values.
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');
  
    // Return the hex color as a string.
    return `#${hexR}${hexG}${hexB}`;
  }

  // Get the color palette and color picker elements
  const colorPalette = document.getElementById('colorPalette');
  const colorPicker = document.getElementById('colorPicker');

  /**
   * Add an event listener to the color palette
   * When a color box is clicked, set the color of the input element to the color of the clicked square box
   * @param {colorBox} colorBox
   * @returns color of the clicked square box
   */
  colorPalette.querySelectorAll('.colorBox').forEach(colorBox => {
    colorBox.addEventListener('click', function() {
      console.log('color: ', this.style.backgroundColor);

      // Convert background color to rgb
      const hexColor = rgbToHex(this.style.backgroundColor);
      console.log('hexColor: ', hexColor);

      // Set the color of the input element to the color of the clicked square box
      colorPicker.value = hexColor;
    });
  });

});
