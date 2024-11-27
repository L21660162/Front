import React from 'react';
import { Navigate } from '@tanstack/react-router';
import { useAccessTokenData, useRememberMe } from '../../store/auth/store';
import { PropsWithOptionalChildren } from '../../../types/types';

function Auth({ children }: PropsWithOptionalChildren) {
  const accessTokenData = useAccessTokenData();
  const rememberMe = useRememberMe();

  if (!accessTokenData) return <Navigate to="/auth/signin" />;

  const { exp } = accessTokenData;
  const now = new Date().getTime() / 1000;

  if (now > exp && !rememberMe) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
}

export default Auth;
