/**
 * Background image handling utility for responsive wallpapers
 */

import { getBackgroundImageForDevice, type WallpaperConfig, addOrientationChangeListener as responsiveAddOrientationChangeListener, addResizeListener as responsiveAddResizeListener } from '@/utils/responsiveHelper';

/**
 * Sets the background image based on device type and orientation
 * @param config Wallpaper configuration object
 */
export const setBackgroundForDevice = (config: WallpaperConfig): void => {
  const backgroundImage = getBackgroundImageForDevice(config);
  
  // Update the CSS variable for background image
  document.documentElement.style.setProperty('--body-background-url', `url("${backgroundImage}")`);
};

/**
 * Initializes background image handling with responsive behavior
 * @param config Wallpaper configuration object
 */
export const initBackgroundHandling = (config: WallpaperConfig): (() => void) => {
  // Set initial background
  setBackgroundForDevice(config);
  
  // Create a callback function that updates the background when needed
  const updateBackground = () => {
    setBackgroundForDevice(config);
  };
  
  // Add event listeners to detect changes in orientation and window size
  const removeOrientationListener = responsiveAddOrientationChangeListener(updateBackground);
  const removeResizeListener = responsiveAddResizeListener(updateBackground);
  
  // Return cleanup function
  return () => {
    removeOrientationListener();
    removeResizeListener();
  };
};