/* eslint-disable no-else-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';
import { TokenData } from '../src/store/auth/type';
import { useAccessTokenData } from '../src/store/auth/store';

function AppMenu() {
  const { t } = useTranslation('common');
  const { roles } = useAccessTokenData() as TokenData;

  const model: AppMenuItem[] = [
    {
      label: t('sidebar.home.label'),
      items: [
        {
          label: t('sidebar.home.dashboard'),
          icon: 'pi pi-fw pi-home',
          to: '/home/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.app.label'),
      items: [
        {
          label: t('sidebar.app.users'),
          icon: 'pi pi-fw pi-list',
          to: '/user/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.schedules.label'),
      items: [
        {
          label: t('sidebar.schedules.dashboard'),
          icon: 'pi pi-fw pi-calendar',
          to: '/schedule/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.justifications.label'),
      items: [
        {
          label: t('sidebar.justifications.dashboard'),
          icon: 'pi pi-fw pi-file-pdf',
          to: '/justify/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.events.label'),
      items: [
        {
          label: t('sidebar.events.dashboard'),
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/event/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.settings.label'),
      items: [
        {
          label: t('sidebar.settings.dashboard'),
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: t('sidebar.settings.schedule'),
              icon: 'pi pi-fw pi-calendar',
              to: '/settings/schedule',
            },
            {
              label: t('sidebar.settings.subject'),
              icon: 'pi pi-fw pi-briefcase',
              to: '/settings/subject',
            },
            {
              label: t('sidebar.settings.buildings'),
              icon: 'pi pi-fw pi-building',
              to: '/settings/building',
            },
            {
              label: t('sidebar.settings.departments'),
              icon: 'pi pi-fw pi-briefcase',
              to: '/settings/departamnt',
            },
            {
              label: t('sidebar.settings.periods'),
              icon: 'pi pi-fw pi-calendar-plus',
              to: '/settings/period',
            },
            {
              label: t('sidebar.settings.careers'),
              icon: 'pi pi-fw pi-book',
              to: '/settings/career',
            },
            {
              label: t('sidebar.settings.classroom'),
              icon: 'pi pi-fw pi-building',
              to: '/settings/classroom',
            },
            {
              label: t('sidebar.settings.group'),
              icon: 'pi pi-fw pi-users',
              to: '/settings/group',
            },
          ],
        },
      ],
    },
  ];

  const filterMenu = model.filter((item) => {
    if (roles.includes('SUPER_ADMINISTRATOR')) {
      return true;
    } else if (roles.includes('DIRECTOR_ACADEMICO')) {
      return ['/home/dashboard', '/event/dashboard'].includes(item.items[0].to) && !item?.seperator;
    } else if (roles.includes('SUBDIRECTOR_ACADEMICO')) {
      return (
        ['/home/dashboard', '/event/dashboard', 'schedule/dashboard'].includes(item.items[0].to) &&
        !item?.seperator
      );
    } else if (roles.includes('JEFE_ACADEMICO')) {
      return (
        [
          '/home/dashboard',
          '/event/dashboard',
          '/schedule/dashboard',
          '/justify/dashboard',
        ].includes(item.items[0].to) && !item?.seperator
      );
    } else if (roles.includes('DOCENTE')) {
      return (
        ['/home/dashboard', '/justify/dashboard'].includes(item.items[0].to) && !item?.seperator
      );
    } else if (roles.includes('RECURSOS_HUMANOS')) {
      if (item.label === 'Panel de Control') {
        item.items = item.items?.slice(1);
      }

      return ['/justify/dashboard'].includes(item.items[0].to) && !item?.seperator;
    } else {
      return false;
    }
  });

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {filterMenu.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root index={i} key={item.label} />
          ) : (
            <li className="menu-separator" />
          );
        })}
      </ul>
    </MenuProvider>
  );
}

export default AppMenu;
