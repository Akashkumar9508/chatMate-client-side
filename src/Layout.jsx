import React from 'react';
import { Nav, Footer } from "./components/allComponents";
import { Outlet } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';

function Layout() {
  const {theme} = useThemeStore();
  return (
    <div data-theme={theme}>
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
