import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import {
  IRoles,
  ISchedule,
  useGetAllSchedulesQuery,
  useGetAllUsersQuery,
  useGetClassroomByIdQuery,
  useGetScheduleByIdQuery,
  useGetSchedulesFormattedQuery,
  useGetSubjectByIdQuery,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { TokenData } from '../../../store/auth/type';
import { dialogStore } from '../../../store/global/dialogStore';
import EditScheduleViewDialogForm from '../../forms/Schedule/dashboard/editScheduleView';

interface ITeacherSearchResult {
  _id?: string | null | undefined;
  fullName?: string;
}

interface ITeacherSearchResult {
  teacher?: string | null;
  schedule?: [ISchedule] | null;
}

function ScheduleView() {
  const { _id: userId } = useAccessTokenData() as TokenData;
  const { t } = useTranslation('common');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filteredValue, setFilteredValue] = useState<ISchedule[] | null>(null);
  const [layout, setLayout] = useState('grid');
  // const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
  // const [sortField, setSortField] = useState('createdAt');
  // const [visibleDetails, setVisibleDetails] = useState(false);
  // const [visibleEditForm, setVisibleEditForm] = useState(false);
  // const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);

  // const [selectedSchedule, setSelectedSchedule] = useState<ISchedule | null>(null);
  // const [schedules, setSchedules] = useState<{ [key: string]: string }>({});
  const [teacherSelectId, setTeacherSelectedId] = useState<any>(undefined);
  const [teacherSearchResult, setTeacherSearchResult] = useState<
    ITeacherSearchResult[] | undefined
  >([]);
  // const [selectedTeacherInfo, setSelectedTeacherInfo] = useState<ITeacherSearchResult | undefined>(
  //   undefined
  // );
  // const [filterTeacher, setFilterTeacher] = useState<string[] | undefined>([]);
  const [filterstudents, setFilterStudents] = useState<string[] | undefined>([]);
  const [dataTeacherSerch, setDatsTeacherSerch] = useState<ITeacherSearchResult[] | undefined>();
  const [schedule, setSchedules] = useState<ISchedule>();
  const [selectSchedule, setSelectSchedule] = useState<ISchedule>();
  const [code, setCode] = useState<string>('');
  const { visible, setVisible } = dialogStore();
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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
      id: teacherSelectId,
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

  const search = (event) => {
    setTimeout(() => {
      let query;
      if (!event.query.trim().length) {
        query = [...teacherSearchResult];
      } else {
        query = teacherSearchResult.filter((teacher) => {
          return (
            teacher.fullName.toLowerCase().includes(event.query.toLowerCase()) ||
            teacher.code.toLowerCase().includes(event.query.toLowerCase())
          );
        });
      }
      setFilterStudents(query);
    }, 250);
    setCode(event.query);
    refetch();
  };

  const defaultValues = {
    teacherName: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    const selectedStudent = data.teacherName;
    if (selectedStudent) {
      setTeacherSelectedId(selectedStudent._id);
    }
    requestUserById();
  };

  const dataTemplate = (item: any) => {
    return (
      <div className="p-d-flex p-ai-center p-jc-space-between">
        <div>
          <span className="p-text-bold">{item.fullName}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!teacherSelectId) {
      setTeacherSelectedId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (allScheduleData) {
      const docs = allScheduleData.getSchedulesFormatted;
      setDatsTeacherSerch({
        teacher: teacherSelectId,
        schedule: docs,
      });
    }
  }, [allScheduleData]);

  useEffect(() => {
    if (dataTeacherSerch) {
      const Alldata = dataTeacherSerch;
      const allSchedules = Alldata.schedule;
      const grouped = daysOfWeek.reduce((acc, day, index) => {
        acc[index + 1] = []; // Inicializa cada día de la semana con un array vacío
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

  const handleEdit = (data: ISchedule) => {
    console.log('data', data);
  };
  // useEffect(() => {
  //   if (StudentServiceStatusData) {
  //     const { firstName, lastName, middleName, processStep } = StudentServiceStatusData.getUserById;
  //     const selectedStudent: IStudentSearchResult = {
  //       fullName: `${firstName} ${lastName} ${middleName}`,
  //     };

  //     setSelectedStudentInfo(selectedStudent);
  //     setActiveIndex(processStep as number);
  //   }
  // }, [StudentServiceStatusData]);

  // useEffect(() => {
  //   if (allScheduleData && allScheduleData.getAllCareers) {
  //     if (Array.isArray(allScheduleData.getAllCareers.docs)) {
  //       const careerMap: { [key: string]: string } = {};
  //       allScheduleData.getAllCareers.docs.forEach((career) => {
  //         careerMap[career._id] = career.name.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
  //           return a.toUpperCase();
  //         });
  //       });
  //       setSchedules(careerMap);
  //     }
  //   }
  // }, [allScheduleData]);

  // const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setGlobalFilterValue(value);

  //   if (value.length === 0) {
  //     setFilteredValue(null);
  //   } else {
  //     const filtered = listValue?.filter((IVacancy) => {
  //       const positionNameLowercase = IVacancy.position.toLowerCase();
  //       const searchValueLowercase = value.toLowerCase();
  //       return (
  //         positionNameLowercase.includes(searchValueLowercase) &&
  //         (!selectedStatus || IVacancy.actuallyStatus === selectedStatus)
  //       );
  //     });

  //     setFilteredValue(filtered);
  //   }
  // };

  // // LOGICA PARA ABRIR LOS MODALES 1 SOLA VEZ
  // const showDetails = (vacancy: IVacancy) => {
  //   setSelectedSchedule(vacancy);
  //   setVisibleDetails(true);
  // };
  // const editVacancy = (vacancy: IVacancy) => {
  //   setSelectedSchedule(vacancy);
  //   setVisibleEditForm(true);
  // };
  // const changeStatusVacancy = (vacancy: IVacancy) => {
  //   setSelectedSchedule(vacancy);
  //   setVisibleChangeStatusConfirm(true);
  // };
  // const deleteVacancy = (vacancy: IVacancy) => {
  //   setSelectedSchedule(vacancy);
  //   setVisibleDeleteConfirm(true);
  // };

  const dataviewGridItem = () => {
    const time = (data) => {
      return new Date(data).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    };

    return (
      <div className="flex gap-4">
        {schedule && Object.keys(schedule).length > 0 ? (
          Object.entries(schedule).map(([day, schedules]) => (
            <div key={day} className="flex flex-column gap-3 flex-1">
              <h3 className="text-center">{daysOfWeek[day - 1]}</h3>
              {schedules.map((product) => (
                <Button
                  key={`${product._id}`}
                  className="p-2 surface-border border-round text-left p-button-text"
                  onClick={() => handleEdit(product._id)}
                >
                  <div key={`${product._id}`} className="p-2 border-1 surface-border border-round">
                    <div className="gap-2">
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-clock" />
                        <span className="font-semibold text-center text-sm">
                          {time(product.startTime)} - {time(product.finalTime)}
                        </span>
                      </div>
                    </div>
                    <div className=" gap-3 py-5">
                      <div className="font-bold text-center">{product.subjectLargeName}</div>
                    </div>
                    <div className="grid ">
                      <div className="col-6">
                        <span className="font-semibold text-center text-sm">
                          {product.classroomIdentifier}
                        </span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="font-semibold text-right text-sm">
                          {product.groupIdentifier}
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center">
            <h3>No hay registros disponibles</h3>
          </div>
        )}
      </div>
    );
  };

  const handleEdit = (id) => {
    // Lógica para manejar la edición del producto usando el ID
    console.log('Editar producto con ID:', id);
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
    // <div className="grid p-fluid">
    //     <div className="col-12 md:col-12">
    //       <div className="card">
    //         <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
    //           <li>
    //             <span className="text-500 no-underline line-height-3">
    //               {t('sidebar.home.label')}
    //             </span>
    //           </li>
    //           <li className="px-2">
    //             <i className="pi pi-angle-right text-500 line-height-3" />
    //           </li>
    //           <li>
    //             <span className="text-900 line-height-3">{t('sidebar.home.service')}</span>
    //           </li>
    //         </ul>
    //         <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
    //           <div>
    //             <div>
    //               <h5 className="font-medium text-3xl text-900">
    //                 Estatus del Servicio Social{' '}
    //                 <b className="text-primary">
    //                   {StudentServiceStatusData && `- ${selectedStudentInfo?.fullName}`}
    //                 </b>
    //               </h5>
    //             </div>
    //           </div>
    //         </div>

    <div className="grid">
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-column">
            <Controller
              name="teacherName"
              control={control}
              rules={{ required: 'Campo Requerido' }}
              render={({ field, fieldState }) => (
                <>
                  <label htmlFor={field.name}>
                    Escribe el nombre completo o el número de control del alumno que deseas
                    administrar
                  </label>
                  <AutoComplete
                    field="fullName"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    inputRef={field.ref}
                    suggestions={filterstudents}
                    completeMethod={search}
                    itemTemplate={dataTemplate}
                    className={classNames({ 'p-invalid': fieldState.error })}
                    autoFocus
                  />
                  {errors.teacherName && (
                    <small className="p-error">{errors.teacherName.message}</small>
                  )}
                </>
              )}
            />
            <Button
              type="submit"
              label="Buscar"
              severity="primary"
              size="small"
              className="p-button-sm p-2 p-1"
            />
          </form>
        </div>
        <div className="card">
          <h5>{t('global.dictionary.vacancyList')}</h5>
          <DataView
            value={[dataTeacherSerch]} //  || listValue
            layout={layout}
            //sortField={sortField}
            itemTemplate={(data) => itemTemplate(data, layout, null)}
            emptyMessage={String(t('global.dictionary.Novacancy'))}
          />
        </div>
      </div>
      {/* {selectedSchedule && visibleDetails && (
        <VacancyDetails
          headerTitle={t('module.vacancy.dashboard.dialog.show.header')}
          visible={visibleDetails}
          setVisible={setVisibleDetails}
          vacancy={selectedSchedule}
        />
      )}
      {selectedSchedule && visibleEditForm && (
        <EditVacancy
          headerTitle={t('module.vacancy.dashboard.dialog.editVacancy.header')}
          visible={visibleEditForm}
          setVisible={setVisibleEditForm}
          vacancy={selectedSchedule}
        />
      )} */}
    </div>
  );
}

export default ScheduleView;
