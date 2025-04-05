function isValidHex(value) {
    return /^[0-9A-F]{1,2}$/i.test(value)
}

function hexToDecimal(hex) {
    return parseInt(hex, 16);
}
  
function decimalToHex(decimal) {
    return decimal.toString(16).toUpperCase();
}

function validateOutput(value) {
    const hex = decimalToHex(value);
    if (hex.length > 4) throw new Error('Result exceeds 4 hex digits.');
    return hex;
}

function addHex(a, b) {
    if (!isValidHex(a) || !isValidHex(b)) throw new Error('Invalid hex input.');
    const sum = hexToDecimal(a) + hexToDecimal(b);
    return validateOutput(sum);
  }
  
  function subtractHex(a, b) {
    if (!isValidHex(a) || !isValidHex(b)) throw new Error('Invalid hex input.');
    const result = hexToDecimal(a) - hexToDecimal(b);
    if (result < 0) throw new Error('Result would be negative.');
    return validateOutput(result);
  }
  
  function multiplyHex(a, b) {
    if (!isValidHex(a) || !isValidHex(b)) throw new Error('Invalid hex input.');
    const product = hexToDecimal(a) * hexToDecimal(b);
    return validateOutput(product);
  }
  
  function divideHex(a, b) {
    if (!isValidHex(a) || !isValidHex(b)) throw new Error('Invalid hex input.');
    const divisor = hexToDecimal(b);
    // if (divisor === 0) throw new Error('Cannot divide by zero.');
    const quotient = Math.floor(hexToDecimal(a) / divisor);
    return validateOutput(quotient);
  }

export {
    isValidHex,
    addHex,
    subtractHex,
    multiplyHex,
    divideHex
}