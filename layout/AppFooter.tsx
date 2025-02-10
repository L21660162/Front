/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';
import logo from '../layout/images/logo-sepret.png';

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <a></a>
      <img src={logo} alt="Logo" height="45" className="mr-2" />
      <span className="font-medium fount-conalep-small" style={{ fontSize: '15px' }}>
        Tecnológico Nacional de México, Sede Matehuala
      </span>
      <a></a>
    </div>
  );
};

export default AppFooter;
