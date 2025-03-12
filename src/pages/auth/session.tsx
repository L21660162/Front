import React from 'react';
import { Navigate } from '@tanstack/react-router';
import { PropsWithOptionalChildren } from '../../../types/types';
import { getAccessTokenData, useAccessTokenData } from '../../store/auth/store';
import { TokenData } from '../../store/auth/type';

function Session({ children }: PropsWithOptionalChildren) {
  const accessTokenData = useAccessTokenData();

  if (accessTokenData) {
    const { roles, path } = getAccessTokenData() as TokenData;
    if(path == "/asis/") {
      if (roles.includes('RECURSOS_HUMANOS')) {
        return <Navigate to="justify/dashboard" />;
      }
      if (roles.includes('PREFECTO')) {
        return <Navigate to="*" />;
      }
      return <Navigate to="/home/dashboard" />;
    }
  }
  return children;
}

export default Session;
