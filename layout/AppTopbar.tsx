import { classNames } from 'primereact/utils';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';
import { useGetUserByIdQuery, useSignOutMutation } from '../src/graphql/graphql';
import { GRAPHQL_CLIENT } from '../src/utils/graphqlClient';
import { IApiError } from '../types/apierror';
import { getActions, useAccessTokenData, useRefreshToken } from '../src/store/auth/store';
import logo from './images/logo-sepret.png';
import { TokenData } from '../src/store/auth/type';

const { setAccessToken, setRefreshToken } = getActions();

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const { layoutConfig, setLayoutConfig, darkMode, setDarkMode } = useGlobalAppStore();
  const contextPath = '';
  const { t } = useTranslation('common');
  const refreshToken = useRefreshToken() as string;
  const { _id: userId, roles } = useAccessTokenData() as TokenData;

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

  const toast = useRef<Toast>(null);
  const menuRight = useRef<Menu>(null);
  const navigate = useNavigate();

  const { mutate } = useSignOutMutation<IApiError>(GRAPHQL_CLIENT, {
    mutationKey: ['signOut'],
    onSuccess: () => {
      setAccessToken(undefined);
      setRefreshToken(undefined);
      navigate({ to: '/auth/signin', replace: true });
    },
    onError: (errorResponse: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
      });
    },
  });

  const { data: StudentServiceStatusData, refetch: requestUserById } = useGetUserByIdQuery(
    GRAPHQL_CLIENT,
    {
      id: userId,
    }
  );

  const primeraletra = (str: string) => {
    //Para obtener la primera letra de el nombre de usuario y dejarla mayuscula y las demas minusculas
    if (!str) return ''; //Por si la cadena esta vacia para evitar errores
    return str
      .split(' ') // Divide la cadena en los espacios
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // toma la primera letra y la Convierte mayuscula y las demas miniusculas
      .join(' '); // junta de nuevo las cadenas
  };

  const items: MenuItem[] = [
    {
      label: t('topbar.accountOptions.labelProfile') as string,
      items: [
        {
          label: t('topbar.accountOptions.account') as string,
          icon: 'pi pi-user',
          command: () => {
            navigate({ to: '/me/profile', replace: true });
          },
        },
      ],
    },
    {
      label: t('topbar.accountOptions.label') as string,
      items: [
        {
          label: t('topbar.accountOptions.signOut') as string,
          icon: 'pi pi-sign-out',
          command: () => {
            mutate({ data: { refreshToken } });
          },
        },
      ],
    },
  ];

  const roleTranslations = {
    SUPER_ADMINISTRATOR: 'Super Administrador',
    JEFE_ACADEMICO: 'Jefe Académico',
    RECURSOS_HUMANOS: 'Recursos Humanos',
    DIRECTOR_ACADEMICO: 'Director Académico',
    SUBDIRECTOR_ACADEMICO: 'Subdirector Académico',
    DOCENTE: 'Docente',
    PREFECTO: 'Prefecto',
  };

  const rol = roles[0];

  useEffect(() => {
    if (
      StudentServiceStatusData &&
      StudentServiceStatusData.getUserById &&
      StudentServiceStatusData.getUserById.photo
    ) {
      setProfileImage(`http://localhost:4000${StudentServiceStatusData.getUserById.photo}`);
    }
    if (
      StudentServiceStatusData &&
      StudentServiceStatusData.getUserById &&
      !StudentServiceStatusData.getUserById.photo
    ){
      setProfileImage(`http://localhost:4000/uploads/users/default_profile.jpg`)
    }
  }, [StudentServiceStatusData]);

  return (
    <div className="layout-topbar">
      <Toast ref={toast}></Toast>

      <button
        ref={menubuttonRef}
        style={{ marginRight: 27.5 }}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={() => {
          setMenuToggle(!menuToggle);
          onMenuToggle();
        }}
      >
        <i className={menuToggle ? 'pi pi-list' : 'pi pi-bars'} />
      </button>

      <a href="" className="layout-topbar-logo">
        <img src={logo} width="auto" height={'35px'} alt="logo" />
        <span className="fount-conalep-large" style={{ fontSize: '15px' }}>
          Tecnológico Nacional de México, Sede Matehuala
        </span>
      </a>

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
        <div className="flex flex-wrap align-items-center justify-content-center">
          <span className="vertical-align-middle vacancy-status-badge tecnm mr-2">
            {primeraletra(StudentServiceStatusData?.getUserById.firstName || '')}
            {StudentServiceStatusData?.getUserById.lastName
              ? ` ${primeraletra(StudentServiceStatusData?.getUserById.lastName || '')}`
              : ''}
            {StudentServiceStatusData?.getUserById.middleName
              ? ` ${primeraletra(StudentServiceStatusData?.getUserById.middleName || '')}`
              : ''}
          </span>
          <span className="vertical-align-middle vacancy-status-badge success">
            {roleTranslations[rol]}
          </span>
        </div>

        {
          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => changeTheme(!darkMode)}
          >
            <i className={darkMode ? 'pi pi-sun' : 'pi pi-moon'}></i>
            <span>{t('topbar.darkMode')}</span>
          </button>
        }

        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={(event) => menuRight.current!.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        >
          <Avatar image={profileImage} shape="circle" size="large" />
        </button>
        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
