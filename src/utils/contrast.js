import colors from '../theme/colors';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

const getBrightness = (rgb) => {
  const sum =
    parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114;

  return Math.round(sum / 1000);
};

const colorDifference = (a, b) => {
  const max = Math.max;
  const min = Math.min;
  const d0 = max(a[0], b[0]) - min(a[0], b[0]);
  const d1 = max(a[1], b[1]) - min(a[1], b[1]);
  const d2 = max(a[2], b[2]) - min(a[2], b[2]);
  return d0 + d1 + d2;
};

const colorContrast = (a, b) => {
  const b0 = getBrightness(a);
  const b1 = getBrightness(b);
  return {
    brightness: Math.abs(b0 - b1),
    difference: colorDifference(a, b),
  };
};

const hasEnoughContrast = (a, b) => {
  const contrast = colorContrast(a, b);
  return contrast.brightness > 100 && contrast.difference > 250;
};

export const getTextColor = (backgroundColor) => {
  const lightTextRgb = hexToRgb(colors.light)
  const backgroundColorRgb = hexToRgb(backgroundColor)

  if (hasEnoughContrast(lightTextRgb, backgroundColorRgb)) {
    return colors.light;
  }

  return colors.dark;
};
