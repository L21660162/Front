export type GlobalAppStore = {
  layoutConfig: any;
  darkMode: boolean;

  setLayoutConfig: (config: any) => void;
  setDarkMode: (darkMode: boolean) => void;
  setTheme: () => void;
};

export type DialogStore = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
