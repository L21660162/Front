import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ISchedule, useGetAllSchedulesQuery } from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';

function ScheduleView() {
  const { t } = useTranslation('common');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filteredValue, setFilteredValue] = useState<ISchedule[] | null>(null);
  const [layout, setLayout] = useState('grid');
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
  const [sortField, setSortField] = useState('createdAt');
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule | null>(null);
  const [schedules, setSchedules] = useState<{ [key: string]: string }>({});

  const { data: allScheduleData } = useGetAllSchedulesQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    // filter: {
    //   teacher: '678fdf61e5dab4d5b006401d',
    // },
  });

  
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

  console.log('Hola', allScheduleData);

  const dataViewHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onFilter}
          placeholder={t('global.dictionary.searchPosition') as string}
        />
      </span>
      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    </div>
  );

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

  const dataviewGridItem = (data: IVacancy) => {
    return (
      <div className="flex gap-4">
        {Object.entries(groupedProducts).map(([day, schedules]) => (
          <div key={day} className="flex flex-column gap-3">
            <h3 className="text-center">Día {day}</h3>
            {schedules.map((product) => (
              <div
                key={`${product.dia}-${product.hora_inicio}-${product.grupo}`}
                className="p-2 border-1 surface-border border-round"
              >
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                  <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag"></i>
                    <span className="font-semibold">{product.hora_inicio}</span>
                  </div>
                  <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag"></i>
                    <span className="font-semibold">{product.hora_fin}</span>
                  </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                  <div className="font-bold">{product.materia}</div>
                </div>
                <div className="">
                  <span className="font-semibold text-center">{product.aula}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
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
          <h5>{t('global.dictionary.vacancyList')}</h5>
          <DataView
            value={filteredValue || listValue}
            layout={layout}
            paginator
            sortOrder={sortOrder}
            sortField={sortField}
            itemTemplate={(data) => itemTemplate(data, layout, selectedStatus)}
            emptyMessage={String(t('global.dictionary.Novacancy'))}
            header={dataViewHeader}
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
