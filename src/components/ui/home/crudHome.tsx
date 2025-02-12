import { Chart } from 'primereact/chart';
import React, { useEffect, useRef, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {
  IFile,
  IGetAttendanceStatisticsQuery,
  IGetUniqueOptionsCareerQuery,
  useGetAllDepartmentsQuery,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { StadisticServices } from './service/StadisticService'; // Importa el hook personalizado
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';

function DashboardAttendancePanel() {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Usa el hook personalizado
  const { careerOptionsData, attendanceStatistics } = StadisticServices(
    selectedCareer,
    selectedDepartment,
    selectedSemester,
    selectedPeriod,
    selectedTeacher
  );

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';
  const toast = useRef<Toast>(null);
  const { _id: studentSelectedId } = useAccessTokenData() as TokenData;
  const [file, setFile] = useState<IFile>();

  const [visibleDISPO, setVisibleDISPO] = useState(false);
  const [visibleINPGR, setVisibleINPGR] = useState(false);
  const [visibleFINSH, setVisibleFINSH] = useState(false);

  const showDISPO = () => {
    setVisibleDISPO(true);
  };
  const showINPGR = () => {
    setVisibleINPGR(true);
  };
  const showFINSH = () => {
    setVisibleFINSH(true);
  };

  // Actualiza las opciones de carrera cuando los datos estén disponibles
  useEffect(() => {
    if (careerOptionsData) {
      console.log('Career Options:', careerOptionsData);
    }
    if (attendanceStatistics) {
      console.log('Attendance Statistics:', attendanceStatistics);
    }
  }, [careerOptionsData, attendanceStatistics]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  

  const pieDataOrg: ChartData = {
    labels: [
      attendanceStatistics?.getAttendanceStatistics.weekday1,
      attendanceStatistics?.getAttendanceStatistics.weekday2,
      attendanceStatistics?.getAttendanceStatistics.weekday3,
      attendanceStatistics?.getAttendanceStatistics.weekday4,
      attendanceStatistics?.getAttendanceStatistics.weekday5,
      attendanceStatistics?.getAttendanceStatistics.weekday6,
      attendanceStatistics?.getAttendanceStatistics.weekday7,
    ],
    datasets: [
      {
        label: t('module.home.dashboard.dashboardPanel.graph.headers.vacancies') as string,
        data: [
          attendanceStatistics?.getAttendanceStatistics.weekday1,
          attendanceStatistics?.getAttendanceStatistics.weekday2,
          attendanceStatistics?.getAttendanceStatistics.weekday3,
          attendanceStatistics?.getAttendanceStatistics.weekday4,
          attendanceStatistics?.getAttendanceStatistics.weekday5,
          attendanceStatistics?.getAttendanceStatistics.weekday6,
          attendanceStatistics?.getAttendanceStatistics.weekday7,
        ],
      },
    ],
  };

  const pieOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };


  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
            <li>
              <span className="text-500 no-underline line-height-3">{t('sidebar.home.label')}</span>
            </li>
            <li className="px-2">
              <i className="pi pi-angle-right text-500 line-height-3" />
            </li>
            <li>
              <span className="text-500 no-underline line-height-3">
                {t('sidebar.home.dashboard.label')}
              </span>
            </li>
            <li className="px-2">
              <i className="pi pi-angle-right text-500 line-height-3" />
            </li>
            <li>
              <span className="text-900 line-height-3">{t('sidebar.home.dashboard.vacancy')}</span>
            </li>
          </ul>
          <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
            <div>
              <div className="font-medium text-3xl text-900">
                {t('sidebar.home.dashboard.vacancy')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Absents')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {attendanceStatistics?.getAttendanceStatistics.classAbsentDay}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-yellow-100 text-yellow-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-map text-yellow-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Justified')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {attendanceStatistics?.getAttendanceStatistics.classJustifyDay}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-red-100 text-red-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-id-card text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Presented')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {attendanceStatistics?.getAttendanceStatistics.classPresentDay}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-indigo-100 text-indigo-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-stopwatch text-indigo-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.SALUD')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesSALUD}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 text-purple-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-heart text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.COMUN')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesCOMUN}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 text-purple-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-inbox text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.SUST')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesSUST}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 text-cyan-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-sun text-cyan-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.ADULT')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesADULT}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-pink-100 text-pink-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-users text-pink-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.AMB')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesAMB}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-teal-100 text-teal-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-cloud text-teal-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.activityTypes.OTROS')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {programType?.programTypeStatistics[0].vacanciesOTROS}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 text-orange-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-send text-orange-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('module.home.dashboard.dashboardPanel.vacanciesAvaliable')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {vacancyStatistics?.vacancyStatistics[0].vacanciesAvailable}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <Button
                onClick={() => showDISPO()}
                icon="pi pi-lock-open"
                className="text-blue-500 text-xl"
                severity="info"
                text
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('module.home.dashboard.dashboardPanel.vacanciesInProgress')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {vacancyStatistics?.vacancyStatistics[0].vacanciesInProgress}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-yellow-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <Button
                onClick={() => showINPGR()}
                icon="pi pi-chart-line"
                className="text-yellow-500 text-xl"
                severity="warning"
                text
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('module.home.dashboard.dashboardPanel.vacanciesFinished')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {vacancyStatistics?.vacancyStatistics[0].vacanciesFinished}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-green-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <Button
                onClick={() => showFINSH()}
                icon="pi pi-check"
                className="text-green-500 text-xl"
                severity="success"
                text
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="col-12 xl:col-6">
        <div className="card">
          <div className="flex flex-column align-items-center">
            <h5 className="text-left w-full">
              {t('module.home.dashboard.dashboardPanel.graph.topOrganizationProjects.title')}
            </h5>
            <Chart type="pie" data={pieDataOrg} options={pieOptions} />
          </div>
        </div>
      </div>
      {/* <div className="col-12 xl:col-6">
        <div className="card">
          <div className="flex flex-column align-items-center">
            <h5 className="text-left w-full">
              {t('module.home.dashboard.dashboardPanel.graph.topOrganizationStudents.title')}
            </h5>
            <Chart type="pie" data={pieDataAlumns} options={pieOptions} />
          </div>
        </div>
      </div> */}
      {/* {visibleDISPO && (
        <DISPO
          headerTitle={t('module.home.dashboard.dashboardPanel.vacanciesAvaliable')}
          visible={visibleDISPO}
          setVisible={setVisibleDISPO}
        />
      )}
      {visibleINPGR && (
        <INPGR
          headerTitle={t('module.home.dashboard.dashboardPanel.vacanciesInProgress')}
          visible={visibleINPGR}
          setVisible={setVisibleINPGR}
        />
      )}
      {visibleFINSH && (
        <FINSH
          headerTitle={t('module.home.dashboard.dashboardPanel.vacanciesFinished')}
          visible={visibleFINSH}
          setVisible={setVisibleFINSH}
        />
      )} */}
    </div>
  );
}

export default DashboardAttendancePanel;