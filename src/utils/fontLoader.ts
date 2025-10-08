/**
 * Font loading utility for dynamic font loading
 */

// Define preset fonts
export const PRESET_FONTS = {
  LXGW_WENKAI_SC: {
    name: "LXGW Wenkai SC",
    fontFamily: "'LXGW WenKai', 'LXGW WenKai SC', sans-serif",
    fontUrl: "https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkai/dist/LXGWWenKai-Bold/result.css"
  },
  MAPLE_MONO_SC: {
    name: "MapleMonoSC",
    fontFamily: "'Maple Mono SC', 'MapleMonoSC', monospace",
    fontUrl: "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css"
  },
  CHILL_ROUND_FBOLD: {
    name: "全圆体",
    fontFamily: "'ChillRoundF Bold', '全圆体', 'ChillRoundFBold', sans-serif",
    fontUrl: "https://chinese-fonts-cdn.deno.dev/packages/hcqyt/dist/ChillRoundFBold/result.css"
  }
};

interface FontConfig {
  fontFamily: string;
  fontUrl: string;
}

/**
 * Load a font dynamically from a URL (either CDN CSS or local font file)
 * @param fontConfig Font configuration containing fontFamily and fontUrl
 */
export const loadFont = async (fontConfig: FontConfig): Promise<void> => {
  // Check if the font configuration matches a preset font
  let resolvedFontUrl = fontConfig.fontUrl;
  let resolvedFontFamily = fontConfig.fontFamily;
  
  // Handle preset font options by substituting the values
  if (fontConfig.fontFamily === PRESET_FONTS.LXGW_WENKAI_SC.name) {
    resolvedFontUrl = PRESET_FONTS.LXGW_WENKAI_SC.fontUrl;
    resolvedFontFamily = PRESET_FONTS.LXGW_WENKAI_SC.fontFamily;
  } else if (fontConfig.fontFamily === PRESET_FONTS.MAPLE_MONO_SC.name) {
    resolvedFontUrl = PRESET_FONTS.MAPLE_MONO_SC.fontUrl;
    resolvedFontFamily = PRESET_FONTS.MAPLE_MONO_SC.fontFamily;
  } else if (fontConfig.fontFamily === PRESET_FONTS.CHILL_ROUND_FBOLD.name) {
    resolvedFontUrl = PRESET_FONTS.CHILL_ROUND_FBOLD.fontUrl;
    resolvedFontFamily = PRESET_FONTS.CHILL_ROUND_FBOLD.fontFamily;
  }

  if (!resolvedFontUrl) {
    // If no font URL is provided, just set the font family
    document.documentElement.style.setProperty('--font-family', resolvedFontFamily);
    return;
  }

  // Check if the font is already loaded
  const existingLink = document.head.querySelector(`link[data-font-url="${resolvedFontUrl}"]`) as HTMLLinkElement;
  if (existingLink) {
    // Font is already loaded, just apply the font family
    document.documentElement.style.setProperty('--font-family', resolvedFontFamily);
    return;
  }

  // Determine if the URL is a CSS import (like Google Fonts) or a direct font file
  if (resolvedFontUrl.toLowerCase().endsWith('.css')) {
    // It's a CSS file (like Google Fonts)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = resolvedFontUrl;
    link.setAttribute('data-font-url', resolvedFontUrl);
    document.head.appendChild(link);
    
    // Set the font family immediately but wait for the font to load before confirming
    document.documentElement.style.setProperty('--font-family', resolvedFontFamily);
    
    // Wait for the font to load before resolving the promise
    return new Promise((resolve) => {
      link.onload = () => {
        resolve();
      };
      link.onerror = () => {
        // If there's an error, still resolve but log it
        console.warn(`Failed to load font from ${resolvedFontUrl}`);
        resolve();
      };
    });
  } else if (/\.(ttf|woff|woff2|otf)$/i.test(resolvedFontUrl)) {
    // It's a direct font file
    const fontFace = new FontFace(
      resolvedFontFamily.split(',')[0].trim(), // Use the first font name from the family
      `url(${resolvedFontUrl})`
    );

    try {
      await fontFace.load();
      (document as any).fonts.add(fontFace);
      document.documentElement.style.setProperty('--font-family', resolvedFontFamily);
    } catch (error) {
      console.warn(`Failed to load font from ${resolvedFontUrl}:`, error);
    }
  } else {
    // Unknown format, just set the font family without loading
    document.documentElement.style.setProperty('--font-family', resolvedFontFamily);
  }
};

/**
 * Apply font settings to the document
 * @param fontConfig Font configuration
 */
export const applyFontSettings = (fontConfig: FontConfig): void => {
  // Set the font family CSS variable
  document.documentElement.style.setProperty('--font-family', fontConfig.fontFamily);
  
  // Apply the font to the body element
  document.body.style.fontFamily = `var(--font-family, ${fontConfig.fontFamily})`;
};