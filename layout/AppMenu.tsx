import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';
import { useGlobalAppStore } from '../src/store/global/globalAppStore';
import { TokenData } from '../src/store/auth/type';
import { useAccessTokenData } from '../src/store/auth/store';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';

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
          to: '/home/dashboard' 
        },
      ],
    },
    {
      label: t('sidebar.app.label'),
      items: [ 
        { label: t('sidebar.app.users'),
          icon: 'pi pi-fw pi-list',
          to: '/user/dashboard' 
        }
      ],
    },
    {
      label: t('sidebar.schedules.label'),
      items: [
        {
          label: t('sidebar.schedules.dashboard'),
          icon: 'pi pi-fw pi-calendar',
          to: '/organization/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.justifications.label'),
      items: [
        {
          label: t('sidebar.justifications.dashboard'),
          icon: 'pi pi-fw pi-file-pdf',
          to: '/vacancy/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.events.label'),
      items: [
        {
          label: t('sidebar.events.dashboard'),
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/institute/dashboard',
        },
      ],
    },
    {
      label: t('sidebar.maintenance.label'),
      items: [
        {
          label: t('sidebar.maintenance.dashboard'),
          icon: 'pi pi-fw pi-wrench',
          to: '/career/dashboard',
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
