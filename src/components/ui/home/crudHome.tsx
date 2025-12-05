import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Userdata | null>(null);
  const [filteredTeacher, setFilteredTeacher] = useState<Userdata[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);
  const [filteredDepartment, setFilteredDepartment] = useState<IDepartment[]>([]);
  const [careerTabIndex, setCareerTabIndex] = useState(0);
  const [groupTabIndex, setGroupTabIndex] = useState(0);
  const tiempo: FilterTime[] = [
    { label: 'Día', value: '1' },
    { label: 'Mes', value: '2' },
    { label: 'periodo', value: '3' },
    { label: 'Año', value: '4' },
  ];
  const [value, setValue] = useState<FilterTime>(tiempo[3]);
  const { _id: teacherId, roles } = useAccessTokenData() as TokenData;
  const isHr = roles.includes('RECURSOS_HUMANOS');
  const {
    careerOptionsData,
    attendanceStatistics,
    reportStatistics,
    datosDocente,
    eventsData,
    groupsData,
  } = StadisticServices(
    selectedCareer,
    selectedDepartment?._id,
    selectedSemester,
    selectedPeriod,
    roles.includes('DOCENTE') ? teacherId : selectedTeacher?.id
  );
  const selectedCareerLabel = useMemo(
    () =>
      careerOptionsData?.getUniqueOptionsCareer.careers.find((career) => career.value === selectedCareer)
        ?.label ?? null,
    [careerOptionsData, selectedCareer]
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

  const groupLookup = useMemo(() => {
    const map: Record<string, { identifier: string; career: string; semester: string; period: string }> = {};
    groupsData?.getAllGroups.docs.forEach((group) => {
      map[group._id] = {
        identifier: group.identifier,
        career: group.career,
        semester: group.semester,
        period: group.period,
      };
    });
    return map;
  }, [groupsData]);

  type ReportStat = NonNullable<typeof reportStatistics>['getReportStatistics'][number];

  const normalize = (value?: string | null) => value?.toString().trim().toLowerCase() ?? '';

  const careerTabs = useMemo(() => {
    const base = [{ label: 'Todas', value: null }];
    const careers = careerOptionsData?.getUniqueOptionsCareer.careers ?? [];
    return base.concat(careers);
  }, [careerOptionsData]);

  const groupTabs = useMemo(() => {
    const allGroups = groupsData?.getAllGroups.docs ?? [];
    const filtered = selectedCareer
      ? allGroups.filter((group) => normalize(group.career) === normalize(selectedCareer))
      : allGroups;

    const mapped = filtered
      .map((group) => ({
        label: group.identifier,
        value: group.identifier,
        career: group.career,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'es'));

    return [{ label: 'Todos', value: null }, ...mapped];
  }, [groupsData, selectedCareer]);

  const syncCareerTabIndex = (careerValue: string | null) => {
    const index = careerTabs.findIndex((tab) => normalize(tab.value) === normalize(careerValue));
    setCareerTabIndex(index >= 0 ? index : 0);
  };

  const syncGroupTabIndex = (groupValue: string | null) => {
    const index = groupTabs.findIndex((tab) => normalize(tab.value) === normalize(groupValue));
    setGroupTabIndex(index >= 0 ? index : 0);
  };

  const handleCareerTabChange = (careerValue: string | null) => {
    setSelectedCareer(careerValue);
    setSelectedGroup((currentGroup) => {
      if (!careerValue || !currentGroup) return currentGroup;
      const matchingGroup = groupTabs.find((group) => normalize(group.value) === normalize(currentGroup));
      if (matchingGroup && normalize(matchingGroup.career) === normalize(careerValue)) return currentGroup;
      return null;
    });
    syncCareerTabIndex(careerValue);
  };

  const handleGroupTabChange = (groupValue: string | null) => {
    setSelectedGroup(groupValue);
    syncGroupTabIndex(groupValue);
  };

  useEffect(() => {
    syncCareerTabIndex(selectedCareer);
  }, [careerTabs, selectedCareer]);

  useEffect(() => {
    syncGroupTabIndex(selectedGroup);
  }, [groupTabs, selectedGroup]);

  const matchesFilters = (stat: ReportStat) => {
    if (selectedCareer) {
      const careerValue = normalize(selectedCareer);
      const careerLabel = normalize(selectedCareerLabel);
      const statCareer = normalize(stat.careerName);
      if (statCareer !== careerValue && statCareer !== careerLabel) return false;
    }
    if (selectedGroup && normalize(stat.groupIdentifier) !== normalize(selectedGroup)) return false;
    if (selectedSemester && stat.semester !== selectedSemester) return false;
    if (selectedPeriod && stat.periodName !== selectedPeriod) return false;
    if (selectedTeacher && stat.teacherLargeName !== selectedTeacher.fullname) return false;
    return true;
  };

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
      if (!matchesFilters(stat)) return;

      const statDate = extractDate(stat.weekday);
      if (statDate && (statDate < startOfWeek || statDate > endOfWeek)) return;

      const day = normalizeWeekday(stat.weekday);
      if (day === 'domingo' || !base[day]) return;
      base[day].present += stat.presentAmount;
      base[day].absent += stat.absentAmount;
      base[day].justified += stat.justifiedAmount;
    });

    return base;
  }, [
    endOfWeek,
    reportStatistics,
    selectedCareer,
    selectedCareerLabel,
    selectedGroup,
    selectedPeriod,
    selectedSemester,
    selectedTeacher,
    startOfWeek,
  ]);

  const weeklyCareerTotals = useMemo(() => {
    const base: Record<string, { present: number; absent: number; justified: number }> = {};

    reportStatistics?.getReportStatistics.forEach((stat) => {
      if (!matchesFilters(stat)) return;

      const statDate = extractDate(stat.weekday);
      if (statDate && (statDate < startOfWeek || statDate > endOfWeek)) return;

      const day = normalizeWeekday(stat.weekday);
      if (day === 'domingo') return;

      const label = stat.careerName || 'Sin carrera';
      if (!base[label]) {
        base[label] = { present: 0, absent: 0, justified: 0 };
      }

      base[label].present += stat.presentAmount;
      base[label].absent += stat.absentAmount;
      base[label].justified += stat.justifiedAmount;
    });

    return base;
  }, [
    endOfWeek,
    reportStatistics,
    selectedCareer,
    selectedCareerLabel,
    selectedGroup,
    selectedPeriod,
    selectedSemester,
    selectedTeacher,
    startOfWeek,
  ]);

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

  const pickStatisticValue = (
    field:
      | 'classAbsentDay'
      | 'classAbsentMonth'
      | 'classAbsentSemester'
      | 'classAbsentYear'
      | 'classJustifyDay'
      | 'classJustifyMonth'
      | 'classJustifySemester'
      | 'classJustifyYear'
      | 'classPresentDay'
      | 'classPresentMonth'
      | 'classPresentSemester'
      | 'classPresentYear'
  ) => attendanceStatistics?.getAttendanceStatistics?.[field] ?? 0;

  const absentsValue = pickStatisticValue('classAbsentDay');

  const justifiedValue = pickStatisticValue('classJustifyDay');

  const presentValue = pickStatisticValue('classPresentDay');

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

  const careerLabels = Object.keys(weeklyCareerTotals);

  const careerChartData: ChartData = {
    labels: careerLabels,
    datasets: [
      {
        label: 'Presentes',
        backgroundColor: documentStyle.getPropertyValue('--green-500'),
        data: careerLabels.map((career) => weeklyCareerTotals[career]?.present ?? 0),
      },
      {
        label: 'Ausentes',
        backgroundColor: documentStyle.getPropertyValue('--red-500'),
        data: careerLabels.map((career) => weeklyCareerTotals[career]?.absent ?? 0),
      },
      {
        label: 'Justificados',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        data: careerLabels.map((career) => weeklyCareerTotals[career]?.justified ?? 0),
      },
    ],
  };

  const careerChartOptions: ChartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
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
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
          font: { weight: 600 },
        },
        grid: {
          display: false,
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
      if (!matchesFilters(stat)) return;

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
  }, [
    reportStatistics,
    selectedCareer,
    selectedCareerLabel,
    selectedGroup,
    selectedPeriod,
    selectedSemester,
    selectedTeacher,
    todayNormalized,
    todayStart,
  ]);

  const parsePeriodStartMinutes = (period?: string | null) => {
    if (!period) return Number.MAX_SAFE_INTEGER;

    const match = period
      .toLowerCase()
      .replace('a.m.', 'am')
      .replace('p.m.', 'pm')
      .match(/(\d{1,2})(?::(\d{2}))?\s*(a|p)?m?/i);

    if (!match) return Number.MAX_SAFE_INTEGER;

    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const meridiem = match[3]?.toLowerCase();

    if (!meridiem) return hours * 60 + minutes;
    if (meridiem === 'p' && hours < 12) return hours * 60 + minutes + 12 * 60;
    if (meridiem === 'a' && hours === 12) return minutes; // 12am
    return hours * 60 + minutes;
  };

  const parseTimeRange = (period?: string | null) => {
    if (!period) return { start: null, end: null };

    const rangeMatch = period
      .toLowerCase()
      .replace('a.m.', 'am')
      .replace('p.m.', 'pm')
      .match(
        /(\d{1,2}(?::\d{2})?\s*(?:a|p)?m?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:a|p)?m?)/i
      );

    if (!rangeMatch) return { start: null, end: null };

    const normalizeLabel = (label: string) => {
      const cleaned = label.replace(/\s+/g, '');
      const match = cleaned.match(/(\d{1,2})(?::(\d{2}))?(a|p)?m?/i);
      if (!match) return label;

      const hours = parseInt(match[1], 10);
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      const meridiem = match[3]?.toLowerCase();

      const displayHours = ((meridiem === 'p' && hours < 12 ? hours + 12 : hours) + 24) % 24;
      const formattedHours = String(displayHours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
    };

    return { start: normalizeLabel(rangeMatch[1]), end: normalizeLabel(rangeMatch[2]) };
  };

  const teacherDailySchedule = useMemo(() => {
    const entries: Array<{
      teacher: string;
      subject: string;
      period: string;
      startTime: string | null;
      endTime: string | null;
      status: 'present' | 'absent' | 'justified' | 'unknown';
    }> = [];

    reportStatistics?.getReportStatistics.forEach((stat) => {
      if (!matchesFilters(stat)) return;

      const statDate = extractDate(stat.weekday);
      const matchesToday = statDate
        ? statDate.getTime() === todayStart.getTime()
        : normalizeWeekday(stat.weekday) === todayNormalized;

      if (!matchesToday) return;

      const status: 'present' | 'absent' | 'justified' | 'unknown' = stat.presentAmount
        ? 'present'
        : stat.absentAmount
          ? 'absent'
          : stat.justifiedAmount
            ? 'justified'
            : 'unknown';

      const { start, end } = parseTimeRange(stat.periodName);

      entries.push({
        teacher: stat.teacherLargeName,
        subject: stat.subjectLargeName,
        period: stat.periodName,
        startTime: start,
        endTime: end,
        status,
      });
    });

    return entries.sort((a, b) => parsePeriodStartMinutes(a.period) - parsePeriodStartMinutes(b.period));
  }, [
    reportStatistics,
    selectedCareer,
    selectedCareerLabel,
    selectedGroup,
    selectedPeriod,
    selectedSemester,
    selectedTeacher,
    todayNormalized,
    todayStart,
  ]);

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
  const topJustifiedTeachers = topTeachersByStatus.justified;

  const scheduleByStatus = useMemo(
    () =>
      teacherDailySchedule.reduce<
        Record<'present' | 'absent' | 'justified' | 'unknown', typeof teacherDailySchedule>
      >(
        (acc, entry) => {
          acc[entry.status] = acc[entry.status] ? [...acc[entry.status], entry] : [entry];
          return acc;
        },
        {
          absent: [],
          justified: [],
          present: [],
          unknown: [],
        }
      ),
    [teacherDailySchedule]
  );

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
          ctx.font = '700 18px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const label = `${percentage}%`;
          const padding = 6;
          const textWidth = ctx.measureText(label).width;
          const boxWidth = textWidth + padding * 2;
          const boxHeight = 24;

          const radius = 8;
          const left = x - boxWidth / 2;
          const top = y - boxHeight / 2;
          const right = x + boxWidth / 2;
          const bottom = y + boxHeight / 2;

          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.strokeStyle = 'rgba(0,0,0,0.08)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(left + radius, top);
          ctx.lineTo(right - radius, top);
          ctx.quadraticCurveTo(right, top, right, top + radius);
          ctx.lineTo(right, bottom - radius);
          ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
          ctx.lineTo(left + radius, bottom);
          ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
          ctx.lineTo(left, top + radius);
          ctx.quadraticCurveTo(left, top, left + radius, top);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = textColor || '#495057';
          ctx.fillText(label, x, y);
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

  const weeklyEventSchedule = useMemo(() => {
    if (!eventsData?.getAllEvents.docs) return [];

    return eventsData.getAllEvents.docs
      .filter((event) => {
        const startDate = new Date(event.startDate);
        const finishDate = new Date(event.finishDate);
        const overlapsWeek = finishDate >= startOfWeek && startDate <= endOfWeek;
        if (!overlapsWeek) return false;

        const groups = event.groupsIncluded
          .map((groupId) => groupLookup[groupId])
          .filter(Boolean) as Array<{ identifier: string; career: string; semester: string; period: string }>;

        if (selectedCareer && !groups.some((group) => normalize(group.career) === normalize(selectedCareer))) {
          return false;
        }

        if (selectedGroup && !groups.some((group) => normalize(group.identifier) === normalize(selectedGroup))) {
          return false;
        }

        if (selectedSemester && !groups.some((group) => group.semester === selectedSemester)) {
          return false;
        }

        if (selectedPeriod && event.period !== selectedPeriod && !groups.some((group) => group.period === selectedPeriod)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .map((event) => {
        const groups = event.groupsIncluded
          .map((groupId) => groupLookup[groupId])
          .filter(Boolean) as Array<{ identifier: string }>;

        return {
          id: event._id,
          activity: event.activity,
          startDate: new Date(event.startDate),
          finishDate: new Date(event.finishDate),
          groups: groups.map((group) => group.identifier),
        };
      });
  }, [
    endOfWeek,
    eventsData,
    groupLookup,
    selectedCareer,
    selectedGroup,
    selectedPeriod,
    selectedSemester,
    startOfWeek,
  ]);

  const formatDateRange = (date: Date) =>
    new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);

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
          <div className="flex flex-column md:flex-row justify-content-between mt-3 gap-3">
            <div className="flex-1 surface-50 border-round p-3">
              <div className="mb-4">
                <span className="block font-semibold text-600 mb-2">Filtrar por carrera</span>
                <TabMenu
                  model={careerTabs.map((career) => ({ label: career.label }))}
                  activeIndex={careerTabIndex}
                  onTabChange={(e: TabMenuTabChangeEvent) =>
                    handleCareerTabChange(careerTabs[e.index]?.value ?? null)
                  }
                  className="surface-0 border-round-lg shadow-1 tabmenu-multiline"
                />
              </div>
              <div>
                <span className="block font-semibold text-600 mb-2">Filtrar por grupo</span>
                <TabMenu
                  model={groupTabs.map((group) => ({ label: group.label }))}
                  activeIndex={groupTabIndex}
                  onTabChange={(e: TabMenuTabChangeEvent) =>
                    handleGroupTabChange(groupTabs[e.index]?.value ?? null)
                  }
                  className="surface-0 border-round-lg shadow-1 tabmenu-multiline tabmenu-groups"
                />
              </div>
            </div>

            <div className="flex flex-column gap-3 justify-content-start md:justify-content-center">
              <div className="flex align-items-center gap-2">
                <span className="block font-semibold">Semestre: </span>
                <Dropdown
                  value={selectedSemester}
                  onChange={(e: DropdownChangeEvent) => setSelectedSemester(e.value)}
                  options={careerOptionsData?.getUniqueOptionsCareer.semesters}
                  placeholder={t('global.dictionary.filterSemester')}
                  className="w-14rem"
                />
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
                  <div className="flex align-items-center gap-2">
                    <span className="block font-semibold">Departamento: </span>
                    <AutoComplete
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.value)}
                      suggestions={filteredDepartment}
                      completeMethod={searchDepartments}
                      field="name"
                      placeholder={t('global.dictionary.filterDeparment')}
                    />
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
                  <div className="flex align-items-center gap-2">
                    <span className="block font-semibold">Docente: </span>
                    <AutoComplete
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.value)}
                      suggestions={filteredTeacher}
                      completeMethod={searchTeachers}
                      field="fullname"
                      placeholder={t('global.dictionary.filterTeacher')}
                    />
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
      </div>

      {selectedGroup && (
        <div className="col-12">
          <div className="card">
            <div className="flex align-items-center justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium">Docentes del grupo seleccionado</span>
                <p className="m-0 text-600 text-sm">
                  Horarios de hoy para el grupo {selectedGroup} con su estado de asistencia.
                </p>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-bluegray-50 text-bluegray-500 text-xl border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-users" />
              </div>
            </div>

            {teacherDailySchedule.length ? (
              <div className="border-1 surface-border border-round overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-600 text-sm">
                      <th className="text-left py-3 px-3 font-semibold">Horario</th>
                      <th className="text-left py-3 px-3 font-semibold">Docente</th>
                      <th className="text-left py-3 px-3 font-semibold">Materia</th>
                      <th className="text-left py-3 px-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherDailySchedule.map((stat, index) => {
                      const statusStyles: Record<
                        typeof stat.status,
                        { icon: string; className: string; label: string }
                      > = {
                        present: {
                          icon: 'pi pi-check-circle',
                          className: 'bg-green-50 text-green-700 border-round-xl px-3 py-2 inline-flex align-items-center gap-2',
                          label: 'Asistencia',
                        },
                        absent: {
                          icon: 'pi pi-times-circle',
                          className: 'bg-red-50 text-red-700 border-round-xl px-3 py-2 inline-flex align-items-center gap-2',
                          label: 'Ausencia',
                        },
                        justified: {
                          icon: 'pi pi-file',
                          className: 'bg-blue-50 text-blue-700 border-round-xl px-3 py-2 inline-flex align-items-center gap-2',
                          label: 'Justificado',
                        },
                        unknown: {
                          icon: 'pi pi-question-circle',
                          className:
                            'bg-gray-50 text-gray-700 border-round-xl px-3 py-2 inline-flex align-items-center gap-2',
                          label: 'Sin estado',
                        },
                      };

                      const statusStyle = statusStyles[stat.status];

                      return (
                        <tr key={`${stat.teacher}-${index}`} className="border-top-1 surface-border">
                          <td className="py-3 px-3 text-900 font-semibold">
                            <div className="flex flex-column">
                              <span>{stat.period || 'Horario no especificado'}</span>
                              {(stat.startTime || stat.endTime) && (
                                <span className="text-600 text-sm">
                                  {stat.startTime ? stat.startTime : '¿?'}
                                  {stat.endTime ? ` - ${stat.endTime}` : ''}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-900 font-semibold">{stat.teacher}</td>
                          <td className="py-3 px-3 text-700">{stat.subject}</td>
                          <td className="py-3 px-3">
                            <span className={statusStyle.className}>
                              <i className={statusStyle.icon} />
                              <span className="font-semibold text-sm">{statusStyle.label}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-500 text-center m-0">No hay registros de asistencia para este grupo hoy.</p>
            )}

            {!!teacherDailySchedule.length && (
              <div className="grid mt-4">
                {([
                  {
                    key: 'present' as const,
                    title: 'Con asistencia',
                    color: 'bg-green-50 text-green-700',
                    icon: 'pi pi-check-circle',
                  },
                  {
                    key: 'absent' as const,
                    title: 'Ausentes',
                    color: 'bg-red-50 text-red-700',
                    icon: 'pi pi-times-circle',
                  },
                  {
                    key: 'justified' as const,
                    title: 'Justificados',
                    color: 'bg-blue-50 text-blue-700',
                    icon: 'pi pi-file',
                  },
                ] as const).map((section) => (
                  <div key={section.key} className="col-12 md:col-4">
                    <div className="border-1 surface-border border-round p-3 h-full">
                      <div className={`inline-flex align-items-center gap-2 px-3 py-2 border-round ${section.color}`}>
                        <i className={section.icon} />
                        <span className="font-semibold">{section.title}</span>
                        <span className="font-semibold">({scheduleByStatus[section.key].length})</span>
                      </div>
                      {scheduleByStatus[section.key].length ? (
                        <ul className="list-none p-0 m-0 mt-3">
                          {scheduleByStatus[section.key].map((entry, idx) => (
                            <li
                              key={`${section.key}-${entry.teacher}-${idx}`}
                              className="py-2 px-2 border-bottom-1 surface-border"
                            >
                              <div className="font-semibold text-900">{entry.teacher}</div>
                              <div className="text-700 text-sm">{entry.subject}</div>
                              <div className="text-600 text-sm">
                                {entry.startTime || entry.endTime
                                  ? `${entry.startTime ?? '?'}${entry.endTime ? ` - ${entry.endTime}` : ''}`
                                  : entry.period}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-500 text-sm mt-2 mb-0">Sin registros para hoy.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isHr && (
        <div className="col-12">
          <div className="card surface-50">
            <div className="flex align-items-center justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium">Resumen para Recursos Humanos</span>
                <p className="m-0 text-600 text-sm">
                  Visualiza ausencias, asistencias y el avance de justificantes según el periodo seleccionado.
                </p>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-primary-50 text-primary-500 text-2xl border-round"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="pi pi-briefcase" aria-hidden />
              </div>
            </div>

            <div className="grid text-sm">
              <div className="col-12 md:col-6">
                <div className="flex justify-content-between align-items-center border-round surface-100 p-3">
                  <span className="text-600">Ausencias registradas</span>
                  <span className="text-900 font-semibold text-xl">{absentsValue}</span>
                </div>
              </div>
              <div className="col-12 md:col-6">
                <div className="flex justify-content-between align-items-center border-round surface-100 p-3">
                  <span className="text-600">Justificantes aprobados</span>
                  <span className="text-900 font-semibold text-xl">{justifiedValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col-12 md:col-4 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Absents')}
              </span>
              <div className="text-900 font-semibold text-4xl">{absentsValue}</div>
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
      <div className="col-12 md:col-4 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Justified')}
              </span>
              <div className="text-900 font-semibold text-4xl">{justifiedValue}</div>
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
      <div className="col-12 md:col-4 xl:col-4">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {t('global.dictionary.Presented')}
              </span>
              <div className="text-900 font-semibold text-4xl">{presentValue}</div>
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
      <div className="col-12">
        <div className="card">
          <div className="flex flex-column align-items-center">
            <h5 className="text-left w-full">Asistencia semanal por carrera</h5>
            <Chart
              type="bar"
              data={careerChartData}
              options={careerChartOptions}
              pt={{ root: { className: 'w-full' } }}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {renderTeacherListCard('Más faltas del día', 'bg-red-50 text-red-500', 'pi-exclamation-circle', topAbsentTeachers, 'absent')}
      {renderTeacherListCard('Justificantes recibidos', 'bg-blue-50 text-blue-500', 'pi-file', topJustifiedTeachers, 'justified')}
      <div className="col-12 md:col-6 xl:col-4">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-2">Eventos previstos</span>
              <span className="text-sm text-600">Semana actual</span>
            </div>
            <div
              className="flex align-items-center justify-content-center text-xl border-round bg-purple-50 text-purple-500"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-calendar" />
            </div>
          </div>
          {weeklyEventSchedule.length ? (
            <div className="border-1 surface-border border-round w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-600">
                    <th className="text-left py-2 px-3 font-semibold">Actividad</th>
                    <th className="text-left py-2 px-3 font-semibold">Inicio</th>
                    <th className="text-left py-2 px-3 font-semibold">Finalización</th>
                    <th className="text-left py-2 px-3 font-semibold">Grupos incluidos</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyEventSchedule.map((event) => (
                    <tr key={event.id} className="border-top-1 surface-border">
                      <td className="py-2 px-3 text-900 font-semibold">{event.activity}</td>
                      <td className="py-2 px-3 text-700">{formatDateRange(event.startDate)}</td>
                      <td className="py-2 px-3 text-700">{formatDateRange(event.finishDate)}</td>
                      <td className="py-2 px-3 text-700">
                        {event.groups.length ? event.groups.join(', ') : 'Sin grupos asignados'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-500 text-center mt-2 mb-0">{t('global.dictionary.noData') ?? 'Sin datos'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAttendancePanel;