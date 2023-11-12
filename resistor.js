/* resistor.js */

/*
  electronic resistors have colored bands where each color represents a numerical number
  Electrical engineers can read the colors and
  determine the resistance value in Ohms

  see this resistor calculator for help
   http://bit.ly/2NjS274
*/

/*
const getResistorOhms = (bands) => {};

export { getResistorOhms };
*/


/*
Here's a Lookup Table for the Multipliers. Each color represents a the multiplication factor
that is used with the value from the first 2 bands.
const multiplierCodes = {
 black:          1,
 brown:         10,
 red:          100,
 orange:      1000,
 yellow:     10000,
 green:     100000,
 blue:     1000000,
 violet:  10000000,
 grey:   100000000,
 white: 1000000000,
 gold: 0.1,
 silver: 0.01
};
*/

/**
* Returns the digit as a number from the resistor color code
* @param {string} color - the
* @returns {number} - the digit corresponding to the color
* example: 'black' => 0
* example: 'red' => 2
* example: 'violet' => 7
*
* must copy the colorCodes object from above
* and put it inside this function so it is private
* then use the copied object like a lookup table
*/
function getColorValue(color) {
  const colorCodes = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
  };
  return colorCodes[color];
}

function getMultiplierValue(color) {
  const multiplierCodes = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    grey: 100000000,
    white: 1000000000,
    gold: 0.1,
    silver: 0.01,
  };
  return multiplierCodes[color];
}

function getThreeBandValue(bands) {
  const tens = getColorValue(bands.color1);
  const ones = getColorValue(bands.color2);
  const multiplier = getMultiplierValue(bands.multiplier);
  let value = (tens * 10 + ones) * multiplier;
  if (value < 1) {
    value = +value.toFixed(2);
  } else if (value < 10) {
    value = +value.toFixed(1);
  }
  return value;
}


function formatNumber(val) {
  // https://bit.ly/3mrgPV0
  const re = new RegExp('.0$');
  if (val >= 1000000000) {
    return `${(val / 1000000000).toFixed(1).replace(re, '')}G`;
  }
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1).replace(re, '')}M`;
  }
  if (val >= 1000) {
    return `${(val / 1000).toFixed(1).replace(re, '')}k`;
  }
  if (val < 1) {
    return `${val.toFixed(2).replace(re, '')}`;
  }
  return val.toString();
}

function getTolerance(color) {
  const toleranceCodes = {
    brown: '±1%',
    red: '±2%',
    green: '±0.5%',
    blue: '±0.25%',
    violet: '±0.1%',
    grey: '±0.05%',
    gold: '±5%',
    silver: '±10%',
  };
  return toleranceCodes[color];
}

function getResistorOhms(bands) {
  const val = getThreeBandValue(bands);
  const format = formatNumber(val);
  const tolerance = getTolerance(bands.tolerance);
  return `Resistor value: ${format} Ohms ${tolerance}`;
}

export { getResistorOhms };