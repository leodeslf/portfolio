export const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
export const savedColorScheme = () => localStorage.getItem('saved-color-scheme');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

// Listen for manual preference changes.
export function updatDocument(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    metaThemeColor.setAttribute('content', '#063727');
  } else {
    document.documentElement.classList.remove('dark');
    metaThemeColor.setAttribute('content', '#fff');
  }
}

export function updateLocalStorage(isDark) {
  if (isDark) {
    localStorage.setItem('saved-color-scheme', 'dark');
  } else {
    localStorage.setItem('saved-color-scheme', 'light');
  }
}
