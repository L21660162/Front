import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { dialogStore } from '../../../store/global/dialogStore';
import AddperiodDialogForm from '../../forms/period/dashboard/addPeriod';

export default function PageHeading() {
  const { t } = useTranslation('common');
  const { visible, setVisible } = dialogStore();

  return (
    <>
      <AddperiodDialogForm
        headerTitle={t('module.period.dashboard.dialog.add.header')}
        visible={visible}
        setVisible={setVisible}
      />
      <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
        <li>
          <span className="text-500 no-underline line-height-3">{t('sidebar.period.label')}</span>
        </li>
        <li className="px-2">
          <i className="pi pi-angle-right text-500 line-height-3" />
        </li>
        <li>
          <span className="text-900 line-height-3">{t('sidebar.period.dashboard')}</span>
        </li>
      </ul>
      <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
        <div>
          <div className="font-medium text-3xl text-900">{t('sidebar.period.dashboard')}</div>
        </div>
        <div className="mt-3 lg:mt-0">
          <Button
            label={t('module.period.dashboard.addPeriod') as string}
            className="p-button-rounded p-button-raised mr-2"
            icon="pi pi-calendar-plus"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      {/* CONTENT HERE */}
    </>
  );
}
