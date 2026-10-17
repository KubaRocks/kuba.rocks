import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type ThemeChoice } from "./theme";

const CHANGE_EVENT = "themechange";
const PREFERS_LIGHT = "(prefers-color-scheme: light)";

// Holds the choice when localStorage can't save it, so the toggle keeps cycling
let unsavedChoice: ThemeChoice | null = null;

function readChoice(): ThemeChoice {
  if (unsavedChoice) return unsavedChoice;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function applyToRoot(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
}

/**
 * Re-applies the saved choice to <html>. The head script already did this;
 * call it on mount because React's dev Strict Mode remount clears the attribute.
 */
export function syncThemeToRoot() {
  applyToRoot(readChoice());
}

export function setThemeChoice(choice: ThemeChoice) {
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
    unsavedChoice = null;
  } catch {
    // Storage blocked: the choice still applies until the next page load
    unsavedChoice = choice;
  }
  applyToRoot(choice);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  // Keep other open tabs in sync with a choice made here
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== THEME_STORAGE_KEY) return;
    applyToRoot(readChoice());
    onChange();
  };
  const system = window.matchMedia(PREFERS_LIGHT);
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  system.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    system.removeEventListener("change", onChange);
  };
}

function readResolved(): "light" | "dark" {
  const choice = readChoice();
  if (choice !== "system") return choice;
  return window.matchMedia(PREFERS_LIGHT).matches ? "light" : "dark";
}

/** The visitor's pick: "system", "light" or "dark". "system" on the server. */
export function useThemeChoice(): ThemeChoice {
  return useSyncExternalStore(subscribe, readChoice, () => "system" as const);
}

/** The scheme actually on screen, with "system" resolved. "dark" on the server. */
export function useResolvedTheme(): "light" | "dark" {
  return useSyncExternalStore(subscribe, readResolved, () => "dark" as const);
}
