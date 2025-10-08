/**
 * Theme color utility for applying global theme color across UI elements
 */

/**
 * Applies the global theme color to CSS variables
 * @param themeColor The selected theme color
 */
export const applyGlobalThemeColor = (themeColor: string): void => {
  // Set the global theme color CSS variable
  document.documentElement.style.setProperty('--global-theme-color', themeColor);
  
  // Calculate variations of the theme color for different contexts
  const themeColorRGB = hexToRgb(themeColor);
  if (themeColorRGB) {
    // Calculate light and dark variations for different UI elements
    document.documentElement.style.setProperty('--global-theme-color-rgb', themeColorRGB);
    
    // Calculate a lighter version for backgrounds
    const lightVariant = calculateColorVariant(themeColor, 0.2);
    document.documentElement.style.setProperty('--global-theme-color-light', lightVariant);
    
    // Calculate a darker version for text/borders when needed
    const darkVariant = calculateColorVariant(themeColor, -0.2);
    document.documentElement.style.setProperty('--global-theme-color-dark', darkVariant);
  }
};

/**
 * Converts hex color to RGB
 * @param hex The hex color string
 * @returns RGB string or null if invalid
 */
function hexToRgb(hex: string): string | null {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

/**
 * Calculates a variant of the given color by adjusting its brightness
 * @param hex The hex color to modify
 * @param factor Factor to adjust brightness (-1 to 1, where 0 is no change)
 * @returns The modified hex color
 */
function calculateColorVariant(hex: string, factor: number): string {
  // Remove the '#' if present
  let color = hex.replace('#', '');
  
  // Parse the r, g, b values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Adjust each component
  const adjust = (value: number) => {
    const adjusted = Math.round(value * (1 + factor));
    return Math.min(255, Math.max(0, adjusted));
  };
  
  // Convert back to hex
  const newR = adjust(r).toString(16).padStart(2, '0');
  const newG = adjust(g).toString(16).padStart(2, '0');
  const newB = adjust(b).toString(16).padStart(2, '0');
  
  return `#${newR}${newG}${newB}`;
}

/**
 * Initializes theme color handling
 * @param themeColor The selected theme color
 */
export const initThemeColorHandling = (themeColor: string): void => {
  applyGlobalThemeColor(themeColor);
};