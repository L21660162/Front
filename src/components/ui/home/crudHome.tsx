import { Chart } from 'primereact/chart';
import React, { useEffect, useRef, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import {
  IDepartment,
  IFile,
  IGetAttendanceStatisticsQuery,
  IGetUniqueOptionsCareerQuery,
  useGetAllDepartmentsQuery,
  useGetAllPeriodsQuery,
  useGetAllUsersQuery,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { StadisticServices } from './service/StadisticService'; // Importa el hook personalizado
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Knob } from 'primereact/knob';

interface Userdata {
  id: string;
  fullname: string;
}

interface FilterTime {
  label: string;
  value: string;
}

function DashboardAttendancePanel() {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [filteredPeriod, setFilteredPeriod] = useState<string[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [filteredSemester, setFilteredSemester] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Userdata | null>(null);
  const [filteredTeacher, setFilteredTeacher] = useState<Userdata[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);
  const [filteredDepartment, setFilteredDepartment] = useState<IDepartment[]>([]);
  const tiempo: FilterTime[] = [
    { label: 'Día', value: '1' },
    { label: 'Mes', value: '2' },
    { label: 'periodo', value: '3' },
    { label: 'Año', value: '4' },
  ];
  const [value, setValue] = useState<FilterTime>(tiempo[3]);
  const { careerOptionsData, attendanceStatistics, datosDocente } = StadisticServices(
    selectedCareer,
    selectedDepartment?._id,
    selectedSemester,
    selectedPeriod,
    selectedTeacher?.id
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

  const { data: department } = useGetAllDepartmentsQuery(GRAPHQL_CLIENT, {
    page: 1,
    offset: 0,
    limit: 100,
  });

  const searchDepartments = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let query;
      if (!event.query.trim().length) {
        query = [...department?.getAllDepartments.docs];
      } else {
        query = department?.getAllDepartments.docs.filter((option) => {
          return option.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }
      setFilteredDepartment(query);
    }, 250);
  };

  const searchTeachers = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let query: Userdata[];
      if (!event.query.trim().length) {
        query = [...datosDocente];
      } else {
        query = datosDocente?.filter((option) => {
          return option.fullname.toLowerCase().includes(event.query.toLowerCase());
        });
      }
      setFilteredTeacher(query);
    }, 250);
  };

  const showDISPO = () => {
    setVisibleDISPO(true);
  };
  const showINPGR = () => {
    setVisibleINPGR(true);
  };
  const showFINSH = () => {
    setVisibleFINSH(true);
  };

  const pieDataOrg: ChartData = {
    labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
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
                {t('sidebar.home.dashboard')}
              </span>
            </li>
          </ul>
          <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
            <div>
              <div className="font-medium text-3xl text-900">{t('sidebar.home.dashboard')}</div>
            </div>
          </div>
          <div className="flex align-items-center justify-content-between mt-3">
            <div className="flex">
              <div className="mr-3 align-content-center">
                <span className="block font-semibold ">Filtr de Carera: </span>
              </div>
              <div className="flex justify-content-center">
                <Dropdown
                  value={selectedCareer}
                  onChange={(e: DropdownChangeEvent) => setSelectedCareer(e.value)}
                  options={careerOptionsData?.getUniqueOptionsCareer.careers}
                  placeholder={t('global.dictionary.Career')}
                  optionLabel="label"
                  optionValue="value"
                  className="w-14rem"
                />
              </div>
              <div className="align-content-center pl-1">
                <Button
                  icon="pi pi-replay"
                  rounded
                  outlined
                  severity="warning"
                  aria-label="Notification"
                  disabled={!selectedCareer}
                  onClick={() => {
                    setSelectedCareer(null);
                  }}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mr-3 align-content-center">
                <span className="block font-semibold ">Filtr de semestre: </span>
              </div>
              <Dropdown
                value={selectedSemester}
                onChange={(e: DropdownChangeEvent) => setSelectedSemester(e.value)}
                options={careerOptionsData?.getUniqueOptionsCareer.semesters}
                placeholder={t('global.dictionary.Career')}
                className="w-14rem"
              />
              <div className="align-content-center pl-1">
                <Button
                  icon="pi pi-replay"
                  rounded
                  outlined
                  severity="warning"
                  aria-label="Notification"
                  disabled={!selectedSemester}
                  onClick={() => {
                    setSelectedSemester(null);
                  }}
                />
              </div>
            </div>
              {/* <Dropdown
                value={selectedPeriod}
                onChange={(e: DropdownChangeEvent) => setSelectedPeriod(e.value)}
                options={period?.getAllPeriods.docs}
                placeholder={t('global.dictionary.Career')}
                optionLabel="name"
                optionValue="_id"
              /> */}
              <div className="flex">
              <div className="mr-3 align-content-center">
                <span className="block font-semibold ">Filtr de Departamento: </span>
              </div>
              <AutoComplete
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.value)}
                suggestions={filteredDepartment}
                completeMethod={searchDepartments}
                field="name"
                placeholder={t('global.dictionary.Department')}
              />
              <div className="align-content-center pl-1">
                <Button
                  icon="pi pi-replay"
                  rounded
                  outlined
                  severity="warning"
                  aria-label="Notification"
                  disabled={!selectedDepartment}
                  onClick={() => {
                    setSelectedDepartment(null);
                  }}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mr-3 align-content-center">
                <span className="block font-semibold ">Filtr de Docente: </span>
              </div>
              <AutoComplete
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.value)}
                suggestions={filteredTeacher}
                completeMethod={searchTeachers}
                field="fullname"
                placeholder={t('global.dictionary.Teacher')}
              />
              <div className="align-content-center pl-1">
                <Button
                  icon="pi pi-replay"
                  rounded
                  outlined
                  severity="warning"
                  aria-label="Notification"
                  disabled={!selectedTeacher}
                  onClick={() => {
                    setSelectedTeacher(null);
                  }}
                />
              </div>
            </div>
            {/* <div className="flex">
              <div className="mr-3 align-content-center">
                <span className="block font-semibold ">Filtr de Tiempo: </span>
              </div>
              <Dropdown
                value={value}
                onChange={(e: DropdownChangeEvent) => setValue(e.value)}
                options={tiempo}
                placeholder={t('global.dictionary.Career')}
              />
            </div> */}
            </div>
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Absents')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {value === tiempo[0]
                  ? attendanceStatistics?.getAttendanceStatistics.classAbsentDay
                  : value === tiempo[1]
                  ? attendanceStatistics?.getAttendanceStatistics.classAbsentMonth
                  : value === tiempo[2]
                  ? attendanceStatistics?.getAttendanceStatistics.classAbsentSemester
                  : attendanceStatistics?.getAttendanceStatistics.classAbsentYear}
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
      <div className="col-12 lg:col-6 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Justified')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {value === tiempo[0]
                  ? attendanceStatistics?.getAttendanceStatistics.classJustifyDay
                  : value === tiempo[1]
                  ? attendanceStatistics?.getAttendanceStatistics.classJustifyMonth
                  : value === tiempo[2]
                  ? attendanceStatistics?.getAttendanceStatistics.classJustifySemester
                  : attendanceStatistics?.getAttendanceStatistics.classJustifyYear}
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
      <div className="col-12 lg:col-6 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Presented')}
              </span>
              <div className="text-900 font-medium text-3xl">
                {value === tiempo[0]
                  ? attendanceStatistics?.getAttendanceStatistics.classPresentDay
                  : value === tiempo[1]
                  ? attendanceStatistics?.getAttendanceStatistics.classPresentMonth
                  : value === tiempo[2]
                  ? attendanceStatistics?.getAttendanceStatistics.classPresentSemester
                  : attendanceStatistics?.getAttendanceStatistics.classPresentYear}
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
    </div>
  );
}

export default DashboardAttendancePanel;
