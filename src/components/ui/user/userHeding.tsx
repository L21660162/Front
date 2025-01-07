import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { SelectButton } from 'primereact/selectbutton';
import AddUserDialogForm from '../../forms/user/dashboard/addUser';
import { dialogStore } from '../../../store/global/dialogStore';
import { useAccessTokenData } from '../../../store/auth/store';


export default function PageHeadingUser() {
  const { t } = useTranslation('common');
  const { visible, setVisible } = dialogStore();
  const toast = useRef<Toast>(null);

  const accesTokenData = useAccessTokenData();

  const addUser = () => {
    setVisible(true);
  };

  async function downloadFile() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/uploads/plantilla_importar_usuarios.csv`
      );
      const blob = await response.blob();
      const href = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = 'plantilla_importar_usuarios.csv' as string;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      toast?.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: error,
      });
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <AddUserDialogForm
        headerTitle={t('module.user.dashboard.dialog.add.header')}
        visible={visible}
        setVisible={setVisible}
      />

      <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
        <li>
          <span className="text-500 no-underline line-height-3">{t('sidebar.user.label')}</span>
        </li>
        <li className="px-2">
          <i className="pi pi-angle-right text-500 line-height-3" />
        </li>
        <li>
          <span className="text-900 line-height-3">{t('sidebar.user.dashboard')}</span>
        </li>
      </ul>
      <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
        <div>
          <div className="font-medium text-3xl text-900">{t('sidebar.user.dashboard')}</div>
        </div>
        <div className="mt-3 lg:mt-0">
          <Button
            label={t('module.user.dashboard.addUser') as string}
            className="p-button-rounded p-button-raised mr-2"
            icon="pi pi-user-plus"
            onClick={() => addUser()}
          />
        </div>
      </div>
    </>
  );
}
