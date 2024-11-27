import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { Link } from '@tanstack/react-router';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const { layoutConfig, setLayoutConfig, darkMode, setDarkMode } = useGlobalAppStore();
  const contextPath = '';

  const changeTheme = (switchValue: boolean) => {
    const theme: string = switchValue ? 'mdc-dark-indigo' : 'mdc-light-indigo';
    const colorScheme: string = switchValue ? 'dark' : 'light';
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    const themeHref = themeLink ? themeLink.getAttribute('href') : null;
    const newHref = themeHref ? themeHref.replace(layoutConfig.theme, theme) : null;
    const x = { ...layoutConfig, theme, colorScheme };
    replaceLink(themeLink, newHref, () => {
      setLayoutConfig(x);
    });
    setDarkMode(switchValue);
  };

  const replaceLink = (linkElement: HTMLLinkElement, href: string | null, onComplete: Function) => {
    if (!linkElement || !href) {
      return;
    }

    const id = linkElement.getAttribute('id') as string;
    const cloneLinkElement = linkElement.cloneNode(true) as HTMLLinkElement;

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();

      const element = document.getElementById(id); // re-check
      element && element.remove();

      cloneLinkElement.setAttribute('id', id);
      onComplete && onComplete();
    });
  };

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link to={'/'} className="layout-topbar-logo">
        <img
          src={`${contextPath}/layout/images/logo-${
            layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'
          }.svg`}
          width="47.22px"
          height={'35px'}
          alt="logo"
        />
        <span>NAVI</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames('layout-topbar-menu', {
          'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
        })}
      >
        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={() => changeTheme(!darkMode)}
        >
          <i className={darkMode ? 'pi pi-sun' : 'pi pi-moon'}></i>
        </button>

        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        <a href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </a>
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
