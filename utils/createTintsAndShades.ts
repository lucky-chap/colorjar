/* eslint-disable security/detect-object-injection */
// parse an input string, looking for any number of hexadecimal color
// values, possibly with whitespace or garbage in between.  Return an array of
// color values. Supports hex shorthand.
function parseColorValues(colorValues: any) {
  let colorValuesArray = colorValues.match(
    /\b[0-9A-Fa-f]{3}\b|[0-9A-Fa-f]{6}\b/g
  );
  if (colorValuesArray) {
    colorValuesArray = colorValuesArray.map((item: any) => {
      if (item.length === 3) {
        let newItem = item.toString().split("");
        newItem = newItem.reduce((acc: number, it: any) => {
          return acc + it + it;
        }, "");
        return newItem;
      }

      return item;
    });
  }

  return colorValuesArray; // this could be null if there are no matches
}

// pad a hexadecimal string with zeros if it needs it
function pad(number: any, length: any) {
  let str = `${number}`;
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
}

// convert a hex string into an object with red, green, blue numeric properties
// '501214' => { red: 80, green: 18, blue: 20 }
function hexToRGB(colorValue: any) {
  return {
    red: parseInt(colorValue.substr(0, 2), 16),
    green: parseInt(colorValue.substr(2, 2), 16),
    blue: parseInt(colorValue.substr(4, 2), 16)
  };
}

// convert an integer to a 2-char hex string
// for sanity, round it and ensure it is between 0 and 255
// 43 => '2b'
function intToHex(rgbint: any) {
  return pad(Math.min(Math.max(Math.round(rgbint), 0), 255).toString(16), 2);
}

// convert one of our rgb color objects to a full hex color string
// { red: 80, green: 18, blue: 20 } => '501214'
function rgbToHex(rgb: any) {
  return intToHex(rgb.red) + intToHex(rgb.green) + intToHex(rgb.blue);
}

// shade one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 72, green: 16, blue: 18 }
function rgbShade(rgb: any, i: any) {
  return {
    red: rgb.red * (1 - 0.1 * i),
    green: rgb.green * (1 - 0.1 * i),
    blue: rgb.blue * (1 - 0.1 * i)
  };
}

// tint one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 98, green: 42, blue: 44 }
function rgbTint(rgb: any, i: any) {
  return {
    red: rgb.red + (255 - rgb.red) * i * 0.1,
    green: rgb.green + (255 - rgb.green) * i * 0.1,
    blue: rgb.blue + (255 - rgb.blue) * i * 0.1
  };
}

// take a hex color string and produce a list of 10 tints or shades of that color
// shadeOrTint should be either `rgbShade` or `rgbTint`, as defined above
// this allows us to use `calculate` for both shade and tint
function calculate(colorValue: any, shadeOrTint: any) {
  const color = hexToRGB(colorValue);
  const shadeValues = [];

  for (let i = 0; i < 10; i++) {
    shadeValues[i] = rgbToHex(shadeOrTint(color, i));
  }
  return shadeValues;
}

// given a color value, return an array of ten shades in 10% increments
function calculateShades(colorValue: any) {
  return calculate(colorValue, rgbShade).concat("000000");
}

// given a color value, return an array of ten tints in 10% increments
function calculateTints(colorValue: any) {
  return calculate(colorValue, rgbTint).concat("ffffff");
}

export function createTintsAndShades(values: any) {
  // colorValues are gotten from the color-picker
  const parsedColorsArray = parseColorValues(values);
  if (parsedColorsArray !== null) {
    let calculatedShades;
    let calculatedTints;

    for (let i = 0; i < parsedColorsArray.length; i++) {
      // iterate through each input color value

      // calculate an array of shades from the inputted color, then make a table row
      // from the shades, and a second table row for the hex values of the shades
      calculatedShades = calculateShades(parsedColorsArray[i]);
      // calculate an array of tints from the inputted color, then make a table row
      // from the tints, and a second table row for the hex values of the tints
      calculatedTints = calculateTints(parsedColorsArray[i]);
    }
    return {
      calculatedShades,
      calculatedTints
    };
  }
  return null;
}
