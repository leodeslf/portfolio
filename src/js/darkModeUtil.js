const META_THEME_COLOR = document.querySelector('meta[name="theme-color"]');

export default function resetColorScheme(darkModeOn, save) {
  // Automatic theme will apply always without saving,
  // `save` is true only if it's an input by the user.
  if (darkModeOn) {
    document.body.classList.add('dark');
    // #1c1c22 ascent color for dark backrgoud
    META_THEME_COLOR.setAttribute('content', '#1c1c22');
    if (save) {
      //this.hasManualConfig = true;
      localStorage.setItem('color-scheme', 'true');
    }
  }
  else {
    document.body.classList.remove('dark');
    META_THEME_COLOR.setAttribute('content', '#fff');
    if (save) {
      //this.hasManualConfig = true;
      localStorage.setItem('color-scheme', 'false');
    }
  }
  // Finally update state
  //this.setState({ isDarkMode: darkModeOn });
}