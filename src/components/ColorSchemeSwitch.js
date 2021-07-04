import { useState } from 'react';
import {
  prefersDark, savedColorScheme, updatDocument, updateLocalStorage
} from '../js/colorSchemeUtil';

export default function ColorSchemeSwitch() {
  const [checked, setChecked] = useState(
    document.documentElement.classList.value === 'dark'
  );

  // Listen for user changes. They always override the current state.
  function manual(e) {
    const isDark = e.target.checked;
    setChecked(isDark);
    updatDocument(isDark);
    updateLocalStorage(isDark);
  }

  /**
   * Listen for system changes. Apply only if the user has never made changes
   * manually (they should be saved).
   */
  prefersDark.addEventListener('change', e => {
    if (savedColorScheme() !== null) return;
    const isDark = e.matches;
    setChecked(isDark);
    updatDocument(isDark);
  });

  return (
    <span className="color-scheme-switch">
      <input
        id="color-scheme-switch__input"
        className="color-scheme-switch__input"
        type="checkbox"
        checked={checked}
        onChange={manual}
      />
      <label
        className="color-scheme-switch__label"
        htmlFor="color-scheme-switch__input"
        title="Cambiar esquema de colores."
      >
        <span className="color-scheme-switch__moon-sun" />
      </label>
    </span>
  );
}
