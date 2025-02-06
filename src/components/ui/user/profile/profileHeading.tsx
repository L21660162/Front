import { useTranslation } from 'react-i18next';

export default function PageHeadingProfile() {
  const { t } = useTranslation('common');

  return (
    <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
      <div>
        <div className="font-medium text-3xl text-900">{t('sidebar.user.profile')}</div>
      </div>
    </div>
  );
}
