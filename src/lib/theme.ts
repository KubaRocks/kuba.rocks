/**
 * Color theme preference. "system" follows prefers-color-scheme; "light" and
 * "dark" pin the scheme via html[data-theme] (see globals.css).
 */
export type ThemeChoice = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Browser UI color per scheme: the header/footer surface ("deep"). */
export const THEME_COLORS = { light: "#E8E2D6", dark: "#08111D" } as const;

/**
 * Runs in <head> before first paint so a saved choice never flashes the other
 * scheme. With no saved choice the attribute stays off and CSS follows the OS.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
