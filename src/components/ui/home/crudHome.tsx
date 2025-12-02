import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDepartment, IFile, useGetAllDepartmentsQuery } from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { StadisticServices } from './service/StadisticService'; // Importa el hook personalizado

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
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
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
  const { _id: teacherId, roles } = useAccessTokenData() as TokenData;
  const { careerOptionsData, attendanceStatistics, reportStatistics, datosDocente } = StadisticServices(
    selectedCareer,
    selectedDepartment?._id,
    selectedSemester,
    selectedPeriod,
    roles.includes('DOCENTE') ? teacherId : selectedTeacher?.id
  );
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';
  const toast = useRef<Toast>(null);
  const [file, setFile] = useState<IFile>();

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

  const weekdayOrder = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  const normalizeWeekday = (weekday: string) => {
    const lowered = weekday.toLowerCase().trim();
    if (lowered.startsWith('mon')) return 'lunes';
    if (lowered.startsWith('tue')) return 'martes';
    if (lowered.startsWith('wed')) return 'miercoles';
    if (lowered.startsWith('thu')) return 'jueves';
    if (lowered.startsWith('fri')) return 'viernes';
    if (lowered.startsWith('sat')) return 'sabado';
    if (lowered.startsWith('sun')) return 'domingo';
    if (lowered.startsWith('1')) return 'lunes';
    if (lowered.startsWith('2')) return 'martes';
    if (lowered.startsWith('3')) return 'miercoles';
    if (lowered.startsWith('4')) return 'jueves';
    if (lowered.startsWith('5')) return 'viernes';
    if (lowered.startsWith('6')) return 'sabado';
    if (lowered.startsWith('7')) return 'domingo';
    if (lowered.includes('martes')) return 'martes';
    if (lowered.includes('mier')) return 'miercoles';
    if (lowered.includes('jue')) return 'jueves';
    if (lowered.includes('vie')) return 'viernes';
    if (lowered.includes('sab')) return 'sabado';
    if (lowered.includes('lun')) return 'lunes';
    return lowered.split(' ')[0];
  };

  const extractDate = (weekday: string) => {
    const match = weekday.match(/(\d{4}[\/-]\d{1,2}[\/-]\d{1,2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
    if (!match) return null;
    const parts = match[0].split(/[\/-]/).map(Number);
    let year = parts[0];
    let month = parts[1];
    let day = parts[2];

    if (year <= 31 && day > 31) {
      year = day;
      day = parts[0];
    }

    if (year < 100) return null;
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - ((todayStart.getDay() + 6) % 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weeklyStatusTotals = useMemo(() => {
    const base = {
      lunes: { present: 0, absent: 0, justified: 0 },
      martes: { present: 0, absent: 0, justified: 0 },
      miercoles: { present: 0, absent: 0, justified: 0 },
      jueves: { present: 0, absent: 0, justified: 0 },
      viernes: { present: 0, absent: 0, justified: 0 },
      sabado: { present: 0, absent: 0, justified: 0 },
    } as Record<string, { present: number; absent: number; justified: number }>;

    reportStatistics?.getReportStatistics.forEach((stat) => {
      const statDate = extractDate(stat.weekday);
      if (!statDate) return;
      if (statDate < startOfWeek || statDate > endOfWeek) return;
      const day = normalizeWeekday(stat.weekday);
      if (day === 'domingo' || !base[day]) return;
      base[day].present += stat.presentAmount;
      base[day].absent += stat.absentAmount;
      base[day].justified += stat.justifiedAmount;
    });

    return base;
  }, [endOfWeek, reportStatistics, startOfWeek]);

  const chartData: ChartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    datasets: [
      {
        label: 'Presentes',
        backgroundColor: documentStyle.getPropertyValue('--green-500'),
        data: weekdayOrder.map((day) => weeklyStatusTotals[day]?.present ?? 0),
      },
      {
        label: 'Ausentes',
        backgroundColor: documentStyle.getPropertyValue('--red-500'),
        data: weekdayOrder.map((day) => weeklyStatusTotals[day]?.absent ?? 0),
      },
      {
        label: 'Justificados',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        data: weekdayOrder.map((day) => weeklyStatusTotals[day]?.justified ?? 0),
      },
    ],
  };

  const pieDataDay: ChartData = {
    labels: ['Ausentes', 'Justificados', 'Presentes'],
    datasets: [
      {
        data: [
          attendanceStatistics?.getAttendanceStatistics.classAbsentDay,
          attendanceStatistics?.getAttendanceStatistics.classJustifyDay,
          attendanceStatistics?.getAttendanceStatistics.classPresentDay,
        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--red-500'),
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--green-500'),
        ],
      },
    ],
  };

  const chartOptions: ChartOptions = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 300,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };

  const todayNormalized = normalizeWeekday(
    ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][today.getDay()]
  );

  const teacherDailyStats = useMemo(() => {
    const results: Record<string, { present: number; absent: number; justified: number }> = {};

    reportStatistics?.getReportStatistics.forEach((stat) => {
      const statDate = extractDate(stat.weekday);
      const matchesToday = statDate
        ? statDate.getTime() === todayStart.getTime()
        : normalizeWeekday(stat.weekday) === todayNormalized;

      if (!matchesToday) return;
      if (!results[stat.teacherLargeName]) {
        results[stat.teacherLargeName] = { present: 0, absent: 0, justified: 0 };
      }
      results[stat.teacherLargeName].present += stat.presentAmount;
      results[stat.teacherLargeName].absent += stat.absentAmount;
      results[stat.teacherLargeName].justified += stat.justifiedAmount;
    });

    return Object.entries(results).map(([teacher, values]) => ({
      teacher,
      ...values,
    }));
  }, [reportStatistics, todayNormalized, todayStart]);

  const buildTeacherList = (field: 'present' | 'absent' | 'justified') =>
    [...teacherDailyStats]
      .filter((item) => item[field] > 0)
      .sort((a, b) => b[field] - a[field])
      .slice(0, 5);

  const topTeachersByStatus = useMemo(
    () => ({
      absent: buildTeacherList('absent'),
      justified: buildTeacherList('justified'),
      present: buildTeacherList('present'),
    }),
    [teacherDailyStats]
  );

  const topAbsentTeachers = topTeachersByStatus.absent;
  const topPresentTeachers = topTeachersByStatus.present;
  const topJustifiedTeachers = topTeachersByStatus.justified;

  const totalDayAttendance = useMemo(() => {
    const stats = attendanceStatistics?.getAttendanceStatistics;
    if (!stats) return 0;

    return (
      (stats.classAbsentDay ?? 0) +
      (stats.classJustifyDay ?? 0) +
      (stats.classPresentDay ?? 0)
    );
  }, [attendanceStatistics]);

  const piePercentagePlugin = useMemo(
    () => ({
      id: 'piePercentageLabels',
      afterDatasetsDraw: (chartInstance: ChartJS) => {
        const { ctx } = chartInstance;
        const dataset = chartInstance.getDatasetMeta(0);

        dataset.data.forEach((dataPoint, index) => {
          const rawValue = Number(chartInstance.data.datasets?.[0]?.data?.[index] ?? 0);
          const percentage = totalDayAttendance
            ? ((rawValue / totalDayAttendance) * 100).toFixed(1)
            : '0.0';
          const { x, y } = dataPoint.tooltipPosition();
          ctx.save();
          ctx.fillStyle = textColor || '#495057';
          ctx.font = '600 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${percentage}%`, x, y);
          ctx.restore();
        });
      },
    }),
    [textColor, totalDayAttendance]
  );

  const pieOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const statusMap: Array<'absent' | 'justified' | 'present'> = [
              'absent',
              'justified',
              'present',
            ];
            const statusKey = statusMap[context.dataIndex];
            const topTeachers = topTeachersByStatus[statusKey];
            const rawValue = Number(context.raw) || 0;
            const percentage = totalDayAttendance
              ? ((rawValue / totalDayAttendance) * 100).toFixed(1)
              : '0.0';
            const baseLabel = `${context.label}: ${context.formattedValue} (${percentage}%)`;

            if (!topTeachers?.length) return baseLabel;
            const teacherLines = topTeachers.map(
              (teacher, index) => `${index + 1}. ${teacher.teacher} (${teacher[statusKey]})`
            );

            return [baseLabel, ...teacherLines];
          },
        },
      },
    },
  };

  const renderTeacherListCard = (
    title: string,
    color: string,
    icon: string,
    items: { teacher: string; present: number; absent: number; justified: number }[],
    valueKey: 'present' | 'absent' | 'justified'
  ) => (
    <div className="col-12 md:col-6 xl:col-4">
      <div className="card h-full">
        <div className="flex align-items-center justify-content-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-2">{title}</span>
            <span className="text-sm text-600">{t('module.home.dashboard.dashboardPanel.graph.day')}</span>
          </div>
          <div
            className={`flex align-items-center justify-content-center text-xl border-round ${color}`}
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <i className={`pi ${icon}`} />
          </div>
        </div>
        {items.length ? (
          <ul className="list-none p-0 m-0">
            {items.map((item) => (
              <li
                key={`${title}-${item.teacher}`}
                className="flex align-items-center justify-content-between py-2 border-bottom-1 surface-border"
              >
                <div className="flex align-items-center">
                  <span className="font-semibold mr-2">{item.teacher}</span>
                </div>
                <div className="flex align-items-center">
                  <i className="pi pi-chart-bar text-500 mr-2" />
                  <span className="text-900 font-bold">{item[valueKey]}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-500 text-center mt-2 mb-0">{t('global.dictionary.noData') ?? 'Sin datos'}</p>
        )}
      </div>
    </div>
  );

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
                <span className="block font-semibold ">Carera: </span>
              </div>
              <div className="flex justify-content-center">
                <Dropdown
                  value={selectedCareer}
                  onChange={(e: DropdownChangeEvent) => setSelectedCareer(e.value)}
                  options={careerOptionsData?.getUniqueOptionsCareer.careers}
                  placeholder={t('global.dictionary.filterCareer')}
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
                <span className="block font-semibold ">Semestre: </span>
              </div>
              <Dropdown
                value={selectedSemester}
                onChange={(e: DropdownChangeEvent) => setSelectedSemester(e.value)}
                options={careerOptionsData?.getUniqueOptionsCareer.semesters}
                placeholder={t('global.dictionary.filterSemester')}
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
            {(roles.includes('SUPER_ADMINISTRATOR') ||
              roles.includes('DIRECTOR_ACADEMICO') ||
              roles.includes('SUBDIRECTOR_ACADEMICO')) && (
              <>
                <div className="flex">
                  <div className="mr-3 align-content-center">
                    <span className="block font-semibold ">Departamento: </span>
                  </div>
                  <AutoComplete
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.value)}
                    suggestions={filteredDepartment}
                    completeMethod={searchDepartments}
                    field="name"
                    placeholder={t('global.dictionary.filterDeparment')}
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
                    <span className="block font-semibold ">Docente: </span>
                  </div>
                  <AutoComplete
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.value)}
                    suggestions={filteredTeacher}
                    completeMethod={searchTeachers}
                    field="fullname"
                    placeholder={t('global.dictionary.filterTeacher')}
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
              </>
            )}
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
              className="flex align-items-center justify-content-center bg-red-100 text-red-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-map text-red-500 text-xl" />
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
              className="flex align-items-center justify-content-center bg-blue-100 text-blue-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-id-card text-blue-500 text-xl" />
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
              className="flex align-items-center justify-content-center bg-green-100 text-green-500 text-xl border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-stopwatch text-green-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 xl:col-5">
        <div className="card">
          <div className="flex flex-column align-items-center">
            <h5 className="text-left w-full">
              {t('module.home.dashboard.dashboardPanel.graph.day')}
            </h5>
            <Chart type="pie" data={pieDataDay} options={pieOptions} plugins={[piePercentagePlugin]} />
          </div>
        </div>
      </div>
      <div className="col-12 xl:col-7">
        <div className="card">
          <div className="flex flex-column align-items-center">
            <h5 className="text-left w-full">
              {t('module.home.dashboard.dashboardPanel.graph.general')}
            </h5>
            <Chart
              type="bar"
              data={chartData}
              options={chartOptions}
              pt={{ root: { className: 'w-full' } }}
            />
          </div>
        </div>
      </div>
      {renderTeacherListCard('Más faltas del día', 'bg-red-50 text-red-500', 'pi-exclamation-circle', topAbsentTeachers, 'absent')}
      {renderTeacherListCard('Asistencias destacadas', 'bg-green-50 text-green-500', 'pi-check-circle', topPresentTeachers, 'present')}
      {renderTeacherListCard('Justificantes recibidos', 'bg-blue-50 text-blue-500', 'pi-file', topJustifiedTeachers, 'justified')}
    </div>
  );
}

export default DashboardAttendancePanel;
