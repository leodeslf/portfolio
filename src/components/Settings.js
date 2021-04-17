import React, { lazy } from 'react';

const DarkModeSwitch = lazy(() =>
  import( /* webpackChunkName: "darkmodeswitch" */ './DarkModeSwitch.js'));

export default function Settings() {
  return (
    <div className="settings">
      <DarkModeSwitch />
    </div>
  );
}
