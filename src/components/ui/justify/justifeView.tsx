'use client';

import { useNavigate } from '@tanstack/react-router';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../types/apierror';
import {
  IAttendance,
  IAttendanceStatus,
  useApproveFileMutation,
  useGetAllAttendancesQuery,
  useGetAllFilesQuery,
  useGetSchedulesFormattedQuery,
  useGetUserByIdQuery,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import AddCommentDialogForm from '../../forms/justify/dashbord/addcomment';

function CareerCrud() {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/justify/dashboard' });
  const { roles, _id } = useAccessTokenData() as TokenData;
  const [aprovateDialog, setAprovateDialog] = useState(false);
  const [addCommentDialog, setAddCommentDialog] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<IAttendance | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);

  const { mutate } = useApproveFileMutation(GRAPHQL_CLIENT, {
    onSettled: (data) => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.messages.success'),
        detail: t('global.messages.successMessage'),
      });
      setTimeout(() => {
        navigate({ to: '/justify/dashboard' });
        window.location.reload();
      }, 200);
    },
    onError: (error: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.messages.error'),
        detail: error.message,
        life: 5000,
      });
    },
  });

  const { data: status } = useGetAllAttendancesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      firstPass: IAttendanceStatus.Absent,
      secondPass: IAttendanceStatus.Absent,
    },
  });

  const { data: file } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      attendanceJustified: status?.getAllAttendances.docs[0]?._id,
    },
  });

  const dataBodyTemplate = (attendance: IAttendance) => {
    return (
      <>
        <span className="p-column-title">Fecha</span>
        {new Date(attendance.createdAt).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </>
    );
  };

  const nameBodyTemplate = (attendance: IAttendance) => {
    const { data: scheduleData } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
      schedule: attendance.schedule,
    });

    // ✅ validación previa
    const sched = scheduleData?.getSchedulesFormatted?.[0];
    const { data: user } = useGetUserByIdQuery(GRAPHQL_CLIENT, {
      id: sched?.teacherId ?? '',
    });

    let img = 'https://ssb.matehuala.tecnm.mx/asis_be/uploads/users/default_profile.jpg';
    if (user?.getUserById?.photo) {
      img = `https://ssb.matehuala.tecnm.mx/asis_be${user.getUserById.photo}`;
    }

    return (
      <div className="flex align-items-center gap-2">
        <Avatar image={img} shape="circle" size="large" />
        <span className="p-column-title">
          {user
            ? `${user.getUserById.firstName} ${user.getUserById.lastName} ${user.getUserById.middleName}`
            : 'Profesor no disponible'}
        </span>
      </div>
    );
  };

  const durationBodyTemplate = (attendance: IAttendance) => {
    const { data: scheduleData } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
      schedule: attendance.schedule,
    });

    // ✅ validación previa
    const sched = scheduleData?.getSchedulesFormatted?.[0];
    if (!sched || !sched.startTime || !sched.finalTime) {
      return (
        <>
          <span className="p-column-title">Duración</span>
          Horario no disponible
        </>
      );
    }

    const start = new Date(sched.startTime).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const end = new Date(sched.finalTime).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return (
      <>
        <span className="p-column-title">Duración</span>
        {start} - {end}
      </>
    );
  };

  const subjectBodyTemplate = (attendance: IAttendance) => {
    const { data: scheduleData } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
      schedule: attendance.schedule,
    });

    const sched = scheduleData?.getSchedulesFormatted?.[0];
    return (
      <>
        <span className="p-column-title">Materia</span>
        {sched?.subjectLargeName ?? 'Materia no disponible'}
      </>
    );
  };

  const certificateBodyTemplate = (attendance: IAttendance) => {
    const { data: fileData } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
      page: 1,
      limit: 10,
      offset: 0,
      filter: {
        attendanceJustified: attendance._id,
      },
    });

    return (
      <div>
        {fileData?.getAllFiles.docs?.length > 0 ? (
          fileData.getAllFiles.docs[0].approvedBy !== null ? (
            <Tag value="Justificado" severity="success" className="p-tag-rounded mx-1" />
          ) : fileData.getAllFiles.docs[0].comments?.length > 0 &&
            fileData.getAllFiles.docs[0].comments[0]._id !== null ? (
            <Tag value="No Aceptado" severity="danger" className="p-tag-rounded mx-1" />
          ) : (
            <Tag value="En revisión" severity="warning" className="p-tag-rounded mx-1" />
          )
        ) : (
          <Tag value="Sin Justificar" severity="info" className="p-tag-rounded mx-1" />
        )}
      </div>
    );
  };

  const actionBodyTemplate = (attendance: IAttendance) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => setAprovateDialog(true)}
          disabled={file?.getAllFiles.docs.length === 0}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.justifilist')}</h5>
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

  const hideAprovateDialog = () => {
    mutate({
      data: {
        _id: file?.getAllFiles.docs[0]._id,
        approvedBy: _id,
      },
    });
    setAprovateDialog(false);
  };

  const aprovateDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={() => setAddCommentDialog(true)} />
      <Button label="Yes" icon="pi pi-check" text onClick={hideAprovateDialog} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {file?.getAllFiles.docs.length > 0 && addCommentDialog && (
            <AddCommentDialogForm
              visible={addCommentDialog}
              setVisible={setAddCommentDialog}
              file={file?.getAllFiles.docs[0]._id}
              headerTitle="Agregar comentario"
            />
          )}

          <DataTable
            ref={dt}
            value={status?.getAllAttendances.docs}
            selection={selectedAttendance}
            onSelectionChange={(e) => setSelectedAttendance(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nojustifieds')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tcareerName')}
              sortable
              body={nameBodyTemplate}
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
              header={t('global.dictionary.tcareerDescription')}
              sortable
              body={dataBodyTemplate}
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
              header={t('global.dictionary.tduration')}
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
              header={t('global.dictionary.tcredits')}
              sortable
              body={durationBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="certificate"
              header={t('global.dictionary.tisCertified')}
              dataType="boolean"
              body={certificateBodyTemplate}
              headerStyle={{
                minWidth: '5rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left', minWidth: '8rem' }}
            />
            <Column
              body={actionBodyTemplate}
              header="View"
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>

          <Dialog
            visible={aprovateDialog}
            style={{ width: '450px' }}
            header="Documento"
            modal
            footer={aprovateDialogFooter}
            onHide={hideAprovateDialog}
          >
            <div className="flex w-full h-full flex-grow-1">{/* contenido del iframe, etc. */}</div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CareerCrud;
