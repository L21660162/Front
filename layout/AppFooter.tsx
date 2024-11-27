/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';

const AppFooter = () => {
  // const { layoutConfig } = useContext(LayoutContext);
  const { layoutConfig } = useGlobalAppStore();
  const contextPath = '';

  return (
    <div className="layout-footer">
      <img
        src={`${contextPath}/layout/images/logo-${
          layoutConfig.colorScheme === 'light' ? 'dark' : 'white'
        }.svg`}
        alt="Logo"
        height="20"
        className="mr-2"
      />
      <span className="font-medium ml-2">Navi</span>
    </div>
  );
};

export default AppFooter;
