/* eslint-disable no-else-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAccessTokenData } from '../src/store/auth/store';
import { TokenData } from '../src/store/auth/type';
import { AppMenuItem } from '../types/types';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

function AppMenu() {
  const { t } = useTranslation('common');
  const { roles } = useAccessTokenData() as TokenData;

  const model: AppMenuItem[] = [
    {
      label: t('sidebar.home.label'),
      items: [
        {
          label: t('sidebar.home.dashboard'),
          icon: 'pi pi-fw pi-chart-bar',
          to: '/home/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.app.label'),
      items: [
        {
          label: t('sidebar.app.users'),
          icon: 'pi pi-fw pi-user',
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
      label: t('sidebar.maintenance.label'),
      items: [
        {
          label: t('sidebar.maintenance.dashboard'),
          icon: 'pi pi-fw pi-wrench',
          to: '/maintenance/dashboard',
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
              to: '/settings/department',
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

  const routeRoles: Record<string, string[]> = {
    '/home/dashboard': [
      'DIRECTOR_ACADEMICO',
      'SUBDIRECTOR_ACADEMICO',
      'JEFE_ACADEMICO',
      'SUPER_ADMINISTRATOR',
      'DOCENTE',
    ],
    '/user/dashboard': ['SUPER_ADMINISTRATOR'],
    '/schedule/dashboard': ['SUPER_ADMINISTRATOR', 'SUBDIRECTOR_ACADEMICO', 'JEFE_ACADEMICO'],
    '/justify/dashboard': ['SUPER_ADMINISTRATOR', 'DOCENTE', 'RECURSOS_HUMANOS', 'JEFE_ACADEMICO'],
    '/event/dashboard': ['DIRECTOR_ACADEMICO', 'SUBDIRECTOR_ACADEMICO', 'JEFE_ACADEMICO', 'SUPER_ADMINISTRATOR'],
    '/maintenance/dashboard': ['SUPER_ADMINISTRATOR'],
    '/settings/schedule': ['SUPER_ADMINISTRATOR'],
    '/settings/subject': ['SUPER_ADMINISTRATOR'],
    '/settings/building': ['SUPER_ADMINISTRATOR'],
    '/settings/department': ['SUPER_ADMINISTRATOR'],
    '/settings/period': ['SUPER_ADMINISTRATOR'],
    '/settings/career': ['SUPER_ADMINISTRATOR'],
    '/settings/classroom': ['SUPER_ADMINISTRATOR'],
    '/settings/group': ['SUPER_ADMINISTRATOR'],
  };

  const isAllowedPath = (path?: string | null) => {
    if (!path) return false;
    if (roles.includes('SUPER_ADMINISTRATOR')) return true;
    const allowed = routeRoles[path];
    return allowed ? allowed.some((role) => roles.includes(role)) : false;
  };

  const filterMenu = model
    .map((item) => {
      const filteredItems = item.items
        ?.map((child) => {
          if (child.items && child.items.length > 0) {
            const nestedItems = child.items.filter((grandChild) =>
              isAllowedPath(typeof grandChild.to === 'string' ? grandChild.to : null)
            );
            return nestedItems.length > 0 ? { ...child, items: nestedItems } : null;
          }

          return isAllowedPath(typeof child.to === 'string' ? child.to : null) ? child : null;
        })
        .filter((child): child is AppMenuItem => Boolean(child));

      if (filteredItems && filteredItems.length > 0) {
        return { ...item, items: filteredItems };
      }
      return null;
    })
    .filter((item): item is AppMenuItem => Boolean(item));

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
