// src/ui/theme.js

// Simple theme manager for light/dark mode
// Stores preference in localStorage under 'vidasim_theme'
// Applies theme by setting data-theme attribute on <html> element

export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
};

export function getStoredTheme() {
  const stored = localStorage.getItem('vidasim_theme');
  return stored === Theme.DARK ? Theme.DARK : Theme.LIGHT;
}

export function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
}

export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
}

export function toggleTheme() {
  const current = getStoredTheme();
  const next = current === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  localStorage.setItem('vidasim_theme', next);
  applyTheme(next);
}
