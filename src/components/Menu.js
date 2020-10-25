import React, { lazy } from 'react';

const DarkModeSwitch = lazy(() =>
  import( /* webpackChunkName: "darkmodeswitch" */ './DarkModeSwitch.js'));

export default function Menu() {
  return (
    <div className="menu">
      <DarkModeSwitch />
    </div>
  );
}
