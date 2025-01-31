import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import AddEventDialogFrom from '../../forms/event/dashbord/addEvent';
import { dialogStore } from '../../../store/global/dialogStore';

export default function PageHeading() {
  const { t } = useTranslation('common');
  const { visible, setVisible } = dialogStore();

  return (
    <>
      <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
        <li>
          <span className="text-500 no-underline line-height-3">{t('sidebar.event.label')}</span>
        </li>
        <li className="px-2">
          <i className="pi pi-angle-right text-500 line-height-3" />
        </li>
        <li>
          <span className="text-900 line-height-3">{t('sidebar.event.dashboard')}</span>
        </li>
      </ul>
      <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
        <div>
          <div className="font-medium text-3xl text-900">{t('sidebar.event.dashboard')}</div>
        </div>
      </div>

      {/* CONTENT HERE */}
    </>
  );
}
