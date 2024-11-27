import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';
import { useTranslation } from 'react-i18next';

const AppMenu = () => {
  const { layoutConfig } = useGlobalAppStore();

  const contextPath = '';
  const { t } = useTranslation('common');

  const model: AppMenuItem[] = [
    {
      label: t('sidebar.home.label'),
      items: [
        { label: t('sidebar.home.dashboard'), icon: 'pi pi-fw pi-home', to: '/home/dashboard' },
      ],
    },
    {
      label: t('sidebar.app.label'),
      items: [{ label: t('sidebar.app.users'), icon: 'pi pi-fw pi-list', to: '/user/dashboard' }],
    },
    {
      label: t('sidebar.organization.label'),
      items: [
        {
          label: t('sidebar.organization.dashboard'),
          icon: 'pi pi-fw pi-bars',
          to: '/organization/dashboard',
        },
        {
          label: t('sidebar.organization.mgmt'),
          icon: 'pi pi-fw pi-pencil',
          to: '/organization/management',
        },
      ],
    },
    {
      label: t('sidebar.vacancy.label'),
      items: [
        {
          label: t('sidebar.vacancy.dashboard'),
          icon: 'pi pi-fw pi-list',
          to: '/vacancy/dashboard',
        },
        { label: t('sidebar.vacancy.mgmt'), icon: 'pi pi-fw pi-pencil', to: '/vacancy/management' },
      ],
    },
    {
      label: t('sidebar.institute.label'),
      items: [
        {
          label: t('sidebar.institute.dashboard'),
          icon: 'pi pi-fw pi-flag',
          to: '/institute/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.career.label'),
      items: [
        {
          label: t('sidebar.career.dashboard'),
          icon: 'pi pi-fw pi-briefcase',
          to: '/career/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.covenant.label'),
      items: [
        {
          label: t('sidebar.covenant.dashboard'),
          icon: 'pi pi-fw pi-file',
          to: '/covenant/dashboard',
        },
      ],
    },

    {
      label: t('sidebar.file.label'),
      items: [
        {
          label: t('sidebar.file.dashboard'),
          icon: 'pi pi-fw pi-file',
          to: '/file/dashboard',
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
