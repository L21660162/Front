import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Groups from './modals/importGroups';
import Periods from './modals/importPeriods';
import Schedules from './modals/importSchedules';
import Subjects from './modals/importSubjects';
import Teachers from './modals/importTeachers';

function BodyProfile() {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);
  const navigate = useNavigate({ from: '/maintenance/dashboard' });
  const [visibleImportPeriods, setVisibleImportPeriods] = useState(false);
  const [visibleImportGroups, setVisibleImportGroups] = useState(false);
  const [visibleImportSchedules, setVisibleImportSchedules] = useState(false);
  const [visibleImportTeachers, setVisibleImportTeachers] = useState(false);
  const [visibleImportSubjects, setVisibleImportSubjects] = useState(false);

  const showImportPeriods = () => {
    setVisibleImportPeriods(true);
  };
  const showImportGroups = () => {
    setVisibleImportGroups(true);
  };
  const showImportSchedules = () => {
    setVisibleImportSchedules(true);
  };
  const showImportTeachers = () => {
    setVisibleImportTeachers(true);
  };
  const showImportSubjects = () => {
    setVisibleImportSubjects(true);
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-6">
          <div className="card mb-0 h-full" style={{ position: 'relative' }}>
            <i
              className="pi pi-cog"
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}
            />
            <div className="flex flex-column align-items-center mb-3 h-full">
              <span className="block text-900 font-medium text-2xl text-center">
                Importar Periodos
              </span>
              <Button
                onClick={() => showImportPeriods()}
                icon="pi pi-download"
                className="text-green-500 text-xl mt-3 w-full"
                severity="success"
                outlined
                text
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-6">
          <div className="card mb-0 h-full" style={{ position: 'relative' }}>
            <i
              className="pi pi-users"
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}
            />
            <div className="flex flex-column align-items-center mb-3 h-full">
              <span className="block text-900 font-medium text-2xl text-center">
                Importar Grupos
              </span>
              <Button
                onClick={() => showImportGroups()}
                icon="pi pi-download"
                className="text-green-500 text-xl mt-3 w-full"
                severity="success"
                outlined
                text
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-12">
          <div className="card mb-0 h-full" style={{ position: 'relative' }}>
            <i
              className="pi pi-calendar"
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}
            />
            <div className="flex flex-column align-items-center mb-3 h-full">
              <span className="block text-900 font-medium text-2xl text-center">
                Importar Horarios
              </span>
              <Button
                onClick={() => showImportSchedules()}
                icon="pi pi-download"
                className="text-green-500 text-xl mt-3 w-full"
                severity="success"
                outlined
                text
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-6">
          <div className="card mb-0 h-full" style={{ position: 'relative' }}>
            <i
              className="pi pi-briefcase"
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}
            />
            <div className="flex flex-column align-items-center mb-3 h-full">
              <span className="block text-900 font-medium text-2xl text-center">
                Importar Docentes
              </span>
              <Button
                onClick={() => showImportTeachers()}
                icon="pi pi-download"
                className="text-green-500 text-xl mt-3 w-full"
                severity="success"
                outlined
                text
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-6">
          <div className="card mb-0 h-full" style={{ position: 'relative' }}>
            <i
              className="pi pi-book"
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}
            />
            <div className="flex flex-column align-items-center mb-3 h-full">
              <span className="block text-900 font-medium text-2xl text-center">
                Importar Materias
              </span>
              <Button
                onClick={() => showImportSubjects()}
                icon="pi pi-download"
                className="text-green-500 text-xl mt-3 w-full"
                severity="success"
                outlined
                text
              />
            </div>
          </div>
        </div>
        {visibleImportPeriods && (
          <Periods
            headerTitle={t('module.maintenance.dashboard.dialog.periods')}
            visible={visibleImportPeriods}
            setVisible={setVisibleImportPeriods}
          />
        )}
        {visibleImportGroups && (
          <Groups
            headerTitle={t('module.maintenance.dashboard.dialog.groups')}
            visible={visibleImportGroups}
            setVisible={setVisibleImportGroups}
          />
        )}
        {visibleImportSchedules && (
          <Schedules
            headerTitle={t('module.maintenance.dashboard.dialog.schedules')}
            visible={visibleImportSchedules}
            setVisible={setVisibleImportSchedules}
          />
        )}
        {visibleImportTeachers && (
          <Teachers
            headerTitle={t('module.maintenance.dashboard.dialog.teachers')}
            visible={visibleImportTeachers}
            setVisible={setVisibleImportTeachers}
          />
        )}
        {visibleImportSubjects && (
          <Subjects
            headerTitle={t('module.maintenance.dashboard.dialog.subjects')}
            visible={visibleImportSubjects}
            setVisible={setVisibleImportSubjects}
          />
        )}
      </div>
    </>
  );
}

export default BodyProfile;
