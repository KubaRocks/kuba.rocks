"use client";

import { THEME_COLORS } from "@/lib/theme";
import { useThemeChoice } from "@/lib/use-theme";

/**
 * Browser UI color (theme-color). Follows the OS until the visitor pins a
 * theme. Rendered by React so it survives client-side navigations.
 */
export function ThemeColor() {
  const choice = useThemeChoice();

  if (choice !== "system") {
    return <meta name="theme-color" content={THEME_COLORS[choice]} />;
  }
  return (
    <>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content={THEME_COLORS.light}
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={THEME_COLORS.dark}
      />
    </>
  );
}
