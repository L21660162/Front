import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import {
  IRoles,
  ISchedule,
  useGetAllUsersQuery,
  useGetSchedulesFormattedQuery,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { TokenData } from '../../../store/auth/type';
import { dialogStore } from '../../../store/global/dialogStore';
import EditScheduleViewDialogForm from '../../forms/Schedule/dashboard/editScheduleView';
import JustifyStatus from '../../justify/dashbord/justifieStatus';
import Addjustify from '../../justify/dashbord/addjustify';
import ViewJustify from '../../justify/dashbord/viewjustifi';

interface ITeacherSearchResult {
  _id?: string | null | undefined;
  fullName?: string;
}

interface ITeacherSearchResult {
  teacher?: string | null;
  schedule?: [ISchedule] | null;
}

export default function JustifyCrud() {
  const { _id: userId } = useAccessTokenData() as TokenData;
  const { t } = useTranslation('common');
  const [layout] = useState('grid');
  const [teacherSelectId, setTeacherSelectedId] = useState<any>(undefined);
  const [teacherSearchResult, setTeacherSearchResult] = useState<
    ITeacherSearchResult[] | undefined
  >([]);
  const [dataTeacherSerch, setDatsTeacherSerch] = useState<ITeacherSearchResult[] | undefined>();
  const [schedule, setSchedules] = useState<ISchedule>();
  const [selectSchedule, setSelectSchedule] = useState<string>();
  const { visible, setVisible } = dialogStore();
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDay = new Date().getDay();

  const handleVisibilityChange = (newVisible) => {
    setVisible(newVisible);
  };

  const {
    data: allTeacherData,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      roles: [IRoles.Docente],
    },
  });

  const { data: allScheduleData, refetch: requestUserById } = useGetSchedulesFormattedQuery(
    GRAPHQL_CLIENT,
    {
      teacher: '678fdf64e5dab4d5b0064084',
    }
  );

  useEffect(() => {
    if (!isFetching) {
      setTeacherSearchResult(
        allTeacherData?.getAllUsers.docs.map(({ _id, firstName, lastName, middleName, rfc }) => ({
          _id,
          code: rfc,
          fullName: `${firstName} ${lastName} ${middleName}`,
        }))
      );
    }
  }, [allTeacherData?.getAllUsers.docs, isFetching]);

  const defaultValues = {
    teacherName: '',
  };

  const {
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (!teacherSelectId) {
      setTeacherSelectedId(userId);
    }
  }, [userId, teacherSelectId]);

  useEffect(() => {
    if (allScheduleData) {
      const docs = allScheduleData.getSchedulesFormatted;
      setDatsTeacherSerch({
        teacher: teacherSelectId,
        schedule: docs,
      });
    }
  }, [allScheduleData, teacherSelectId]);

  useEffect(() => {
    if (dataTeacherSerch) {
      const Alldata = dataTeacherSerch;
      const allSchedules = Alldata.schedule;
      const grouped = daysOfWeek.reduce((acc, day, index) => {
        acc[index + 1] = [];
        return acc;
      }, {});

      allSchedules.forEach((schedule) => {
        if (schedule && schedule.weekday) {
          grouped[schedule.weekday].push(schedule);
        }
      });
      setSchedules(grouped);
    }
  }, [dataTeacherSerch]);

  const dataviewGridItem = () => {
    const time = (data) => {
      return new Date(data).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    };

    return (
      <div className="flex gap-4">
        {schedule && Object.keys(schedule).length > 0 ? (
          Object.entries(schedule).map(([day, schedules]) => (
            <div
              key={day}
              className={`flex flex-column gap-3 flex-1 ${
                parseInt(day, 10) === currentDay + 1 ? 'bg-blue-100' : ''
              }`}
            >
              <h3 className="text-center">{daysOfWeek[day - 1]}</h3>
              {schedules.map((product) => (
                <div key={`${product._id}`} className="p-2 border-1 surface-border border-round">
                  <div className="gap-2">
                    <div className="flex align-items-center gap-2">
                      <i className="pi pi-clock" />
                      <span className="font-semibold text-center text-xs">
                        {time(product.startTime)} - {time(product.finalTime)}
                      </span>
                    </div>
                  </div>
                  <div className=" gap-3 py-5">
                    <div className="font-bold text-center">{product.subjectLargeName}</div>
                  </div>
                  <div className="grid ">
                    <div className="col-4">
                      <span className="font-semibold text-center text-sm">
                        {product.classroomIdentifier}
                      </span>
                    </div>
                    <div className="col-4">
                      <span className="font-semibold text-center text-sm">
                        {JustifyStatus(product._id, handleVisibilityChange)}
                      </span>
                    </div>
                    <div className="col-4 text-right">
                      <span className="font-semibold text-right text-sm">
                        {product.groupIdentifier}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center">
            <h3>No hay registros disponibles</h3>
          </div>
        )}

        {visible && (
          <Addjustify
            visible={visible}
            setVisible={setVisible}
            headerTitle={t('module.subject.dashboard.dialog.edit.header')}
            id="678fe4cce5dab4d5b0064588"
          />
        )}
      </div>
    );
  };

  const handleEdit = (id) => {
    setVisible(true);
    setSelectSchedule(id);
  };

  const itemTemplate = (data: IVacancy, layout: 'grid', selectedStatus: IVacancyStatus | null) => {
    if (!data) {
      return;
    }
    if ((selectedStatus === null || data.actuallyStatus === selectedStatus) && layout === 'grid') {
      return dataviewGridItem(data);
    }
    return null;
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h2>{t('global.dictionary.schedule')}</h2>
          <DataView
            value={[dataTeacherSerch]}
            layout={layout}
            itemTemplate={(data: unknown) => itemTemplate(data, layout, null)}
            emptyMessage={String(t('global.dictionary.Novacancy'))}
          />
        </div>
      </div>
    </div>
  );
}
