'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Demo } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  ISchedule,
  ISubject,
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
  useGetClassroomByIdQuery,
  useGetSubjectByIdQuery,
  useGetUserByIdQuery,
  IGetAllSchedulesQuery,
  useGetGroupByIdQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditSubjectDialogForm from '../../forms/subjects/dashboard/editSubject';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function ScheduleCrud() {
  const emptySchedule: ISchedule = {
    _id: '',
    classroom: '',
    finalTime: '',
    group: '',
    period: '',
    startTime: '',
    subject: '',
    teacher: '',
    weekday: 0,
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const { roles } = useAccessTokenData() as TokenData;

  const [schedules, setSchedules] = useState(null);
  const [deleteScheduleDialog, setDeleteScheduleDialog] = useState(false);
  const [schedule, setSchedule] = useState<Demo.IGetAllScheduleQuery.docs>(emptySchedule);
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ISubject | null>(null);
  const [visibleEditSchedule, setVisibleEditSchedule] = useState(false);

  const { data } = useGetAllSchedulesQuery<IGetAllSchedulesQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteScheduleMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.careerDeleteSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/career' });
        window.location.reload();
      }, 200);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
        life: 9999,
      });
    },
  });

  const hideDeleteScheduleDialog = () => {
    setDeleteScheduleDialog(false);
  };

  const editSchedule = (schedule__camp: ISchedule) => {
    setSelectedSchedule(schedule__camp);
    setVisibleEditSchedule(true);
  };

  const confirmDeleteSchedule = (schedule__camp: ISchedule) => {
    setSchedule(schedule__camp);
    setDeleteScheduleDialog(true);
  };

  const deleteCareer = () => {
    const _subjectId = schedule._id;
    setSchedules(_subjectId);
    mutate({ data: { _id: _subjectId } });
    setDeleteScheduleDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const classroomTemlate = (schedule__camp: ISchedule) => {
    const { data: dataClassroom } = useGetClassroomByIdQuery(GRAPHQL_CLIENT, {
      id: schedule__camp.classroom,
    });
    return (
      <>
        <span className="p-column-title">Classroom</span>
        {dataClassroom?.getClassroomById.identifier}
      </>
    );
  };

  const teacherBodyTemplate = (schedule__camp: ISchedule) => {
    const { data: dataTeacher } = useGetUserByIdQuery(GRAPHQL_CLIENT, {
      id: schedule__camp.teacher,
    });
    return (
      <>
        <span className="p-column-title">Teacher</span>
        {`${dataTeacher?.getUserById.firstName} ${dataTeacher?.getUserById.lastName} ${dataTeacher?.getUserById.middleName}`}
      </>
    );
  };

  const subjectBodyTemplate = (schedule__camp: ISchedule) => {
    const { data: dataSubject } = useGetSubjectByIdQuery(GRAPHQL_CLIENT, {
      id: schedule__camp.subject,
    });
    return (
      <>
        <span className="p-column-title">Subject</span>
        {dataSubject?.getSubjectById.largeName}
      </>
    );
  };

  const groupBodyTemplate = (schedule__camp: ISchedule) => {
    const { data: groupData } = useGetGroupByIdQuery(GRAPHQL_CLIENT, {
      id: schedule__camp.classGroup,
    });

    return (
      <>
        <span className="p-column-title">Group</span>
        {groupData?.getGroupById.identifier}
      </>
    );
  };

  const timeStartBodyTemplate = (schedule__camp: ISchedule) => {
    const startTime = new Date(schedule__camp.startTime).toLocaleTimeString();

    return (
      <>
        <span className="p-column-title">Start Time</span>
        {startTime}
      </>
    );
  };

  const timeEndBodyTemplate = (schedule__camp: ISchedule) => {
    const endTime = new Date(schedule__camp.finalTime).toLocaleTimeString();

    return (
      <>
        <span className="p-column-title">End Time</span>
        {endTime}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.career) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editSchedule(rowData)}
          style={{ marginRight: '10px' }}
        />
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-trash"
            className="mb-2"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteSchedule(rowData)}
          />
        )}
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.subjectdirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Búsqueda"
        />
      </span>
    </div>
  );

  const deletecareerDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteScheduleDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteCareer} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedSchedule && visibleEditSchedule && (
            <EditSubjectDialogForm
              headerTitle={t('module.subject.dashboard.dialog.edit.header')}
              visible={visibleEditSchedule}
              setVisible={setVisibleEditSchedule}
              subject={selectedSchedule}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllSchedules.docs}
            selection={selectedSchedules}
            onSelectionChange={(e) => setSelectedSchedules(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} Materias"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nocareer')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.classroomdirectory')}
              sortable
              body={classroomTemlate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.teacher')}
              sortable
              body={teacherBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="duration"
              header={t('global.dictionary.subjectdirector')}
              sortable
              body={subjectBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="institute"
              header={t('global.dictionary.group')}
              sortable
              body={groupBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="institute"
              header={t('global.dictionary.TimeStart')}
              sortable
              body={timeStartBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="institute"
              header={t('global.dictionary.TimeEnd')}
              sortable
              body={timeEndBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              body={actionBodyTemplate}
              header="Editar / Borrar"
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>

          <Dialog
            visible={deleteScheduleDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deletecareerDialogFooter}
            onHide={hideDeleteScheduleDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {schedule && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{schedule.largeName}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCrud;
