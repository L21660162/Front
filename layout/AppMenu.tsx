import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';
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
              label: t('sidebar.settings.schedule'), //Horario
              icon: 'pi pi-fw pi-calendar',
              to: '/settings/schedule',
            },
            {
              label: t('sidebar.settings.users'), // Usuario
              icon: 'pi pi-fw pi-users',
              to: '/settings/users',
            },
            {
              label: t('sidebar.settings.subject'), // Materia
              icon: 'pi pi-fw pi-briefcase',
              to: '/settings/subject',
            },
            {
              label: t('sidebar.settings.buildings'), // edifgici{o}
              icon: 'pi pi-fw pi-building',
              to: '/settings/building',
            },
            {
              label: t('sidebar.settings.departments'), // departamento
              icon: 'pi pi-fw pi-briefcase',
              to: '/settings/departamnt',
            },
            {
              label: t('sidebar.settings.periods'), // periodo
              icon: 'pi pi-fw pi-calendar-plus',
              to: '/settings/period',
            },
            {
              label: t('sidebar.settings.careers'), // carrera
              icon: 'pi pi-fw pi-book',
              to: '/settings/career',
            },
          ],
        },
      ],
    },
  ];

  const [date, setDate] = useState<string | Date | Date[] | null>(null);

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root index={i} key={item.label} />
          ) : (
            <li className="menu-separator" />
          );
        })}
      </ul>
            {/* <Calendar 
              value={date} 
              onChange={(e: CalendarChangeEvent) => setDate(e.value ?? null)} 
              inline 
            /> */}
    </MenuProvider>
  );
}

export default AppMenu;
