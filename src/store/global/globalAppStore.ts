import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GlobalAppStore } from './types';

const changeTheme = (darkMode: boolean, layoutConfig: any) => {
  const currentTheme: string = darkMode ? 'mdc-light-indigo' : 'mdc-dark-indigo';
  const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
  const themeHref = themeLink ? themeLink.getAttribute('href') : null;
  const newHref = themeHref ? themeHref.replace(currentTheme, layoutConfig.theme) : null;

  replaceLink(themeLink, newHref);
};

const replaceLink = (linkElement: HTMLLinkElement, href: string | null) => {
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

    const element = document.getElementById(id);
    element && element.remove();

    cloneLinkElement.setAttribute('id', id);
  });
};

export const useGlobalAppStore = create<GlobalAppStore>()(
  persist<GlobalAppStore>(
    (set, get) => ({
      layoutConfig: {
        ripple: true,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'mdc-light-indigo',
        scale: 12,
      },
      darkMode: false,
      setLayoutConfig: (newConfig) => set(() => ({ layoutConfig: newConfig })),
      setDarkMode: (darkMode: boolean) => set(() => ({ darkMode })),
      setTheme: () => {
        const { layoutConfig, darkMode } = get();
        changeTheme(darkMode, layoutConfig);
      },
    }),
    {
      name: 'globalAppStore',
    }
  )
);
