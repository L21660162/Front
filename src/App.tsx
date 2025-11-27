import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import { Page } from '../types/types';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { useGlobalAppStore } from './store/global/globalAppStore';
import Auth from './pages/auth/auth';
import Session from './pages/auth/session';

type Props = {
  Component: Page;
  pageProps?: object;
};

// Asignamos valor por defecto directamente en los parámetros
function App({ Component, pageProps = {} }: Props) {
  const { setTheme } = useGlobalAppStore();
  setTheme();

  if (Component.getLayout) {
    return (
      <LayoutProvider>
        <Session>{Component.getLayout(<Component {...pageProps} />)}</Session>
      </LayoutProvider>
    );
  }
  return (
    <LayoutProvider>
      <Layout>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Layout>
    </LayoutProvider>
  );
}

// Eliminamos defaultProps
// App.defaultProps = {
//   pageProps: {},
// };

export default App;
