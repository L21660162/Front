'use client';

import { useNavigate } from '@tanstack/react-router';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../types/apierror';
import {
  IAttendance,
  IAttendanceStatus,
  IFile,
  IFileType,
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
  const [selectedView, setSelectedView] = useState<'pending' | 'approved'>('pending');
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

  const { data: filesData } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 50,
    offset: 0,
    filter: {
      fileType: [IFileType.Justificante],
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

    const hasRejection = fileData?.getAllFiles.docs?.[0]?.comments?.some((comment) => comment?._id) ?? false;
    const isApproved = fileData?.getAllFiles.docs?.[0]?.approvedBy !== null;

    return (
      <div>
        {fileData?.getAllFiles.docs?.length > 0 ? (
          isApproved ? (
            <Tag value="Justificado" severity="success" className="p-tag-rounded mx-1" />
          ) : hasRejection ? (
            <Tag value="No aceptado" severity="danger" className="p-tag-rounded mx-1" />
          ) : (
            <Tag value="Pendiente de revisión" severity="warning" className="p-tag-rounded mx-1" />
          )
        ) : (
          <Tag value="Pendiente de justificar" severity="warning" className="p-tag-rounded mx-1" />
        )}
      </div>
    );
  };

  const approvedStatusTemplate = (fileItem: IFile) => {
    const isApproved = fileItem.approvedBy !== null && fileItem.approvedBy !== undefined;
    const hasRejection = fileItem.comments?.some((comment) => comment?._id) ?? false;

    if (isApproved) {
      return <Tag value="Aprobado" severity="success" className="p-tag-rounded mx-1" />;
    }

    if (hasRejection) {
      return <Tag value="No aceptado" severity="danger" className="p-tag-rounded mx-1" />;
    }

    return <Tag value="En revisión" severity="warning" className="p-tag-rounded mx-1" />;
  };

  const approvedUploaderTemplate = (fileItem: IFile) => {
    const { firstName, lastName, middleName, email } = fileItem.uploadedBy;
    const fullName = `${firstName} ${lastName} ${middleName}`.trim();

    return (
      <div className="flex flex-column">
        <span className="font-semibold text-900">{fullName || email}</span>
        <small className="text-500">{email}</small>
      </div>
    );
  };

  const approvedFileNameTemplate = (fileItem: IFile) => {
    const createdAt = new Date(fileItem.createdAt).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return (
      <div className="flex flex-column">
        <span className="font-semibold">{fileItem.nameFile}</span>
        <small className="text-500">Subido el {createdAt}</small>
      </div>
    );
  };

  const approvedActionTemplate = (fileItem: IFile) => {
    const basePath = 'https://ssb.matehuala.tecnm.mx/asis_be';
    const fileUrl = `${basePath}${fileItem.path}`;

    return (
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-external-link"
          rounded
          outlined
          severity="info"
          onClick={() => window.open(fileUrl, '_blank')}
          tooltip="Abrir justificante"
        />
      </div>
    );
  };

  const approvedRecords = filesData?.getAllFiles.docs?.filter((fileItem) => fileItem.approvedBy) ?? [];

  const { data: selectedScheduleData } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
    schedule: selectedAttendance?.schedule ?? '',
  });

  const selectedSched = selectedScheduleData?.getSchedulesFormatted?.[0];

  const { data: selectedTeacher } = useGetUserByIdQuery(GRAPHQL_CLIENT, {
    id: selectedSched?.teacherId ?? '',
  });

  const { data: selectedFiles } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 1,
    offset: 0,
    filter: {
      attendanceJustified: selectedAttendance?._id,
    },
  });

  const selectedFile = selectedFiles?.getAllFiles.docs?.[0];

  const actionBodyTemplate = (attendance: IAttendance) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => {
            setSelectedAttendance(attendance);
            setAprovateDialog(true);
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
      <div className="flex align-items-center gap-3">
        <h5 className="m-0">{t('global.dictionary.justifilist')}</h5>
        <div className="flex align-items-center gap-3">
          <div className="flex align-items-center gap-2">
            <RadioButton
              inputId="pending"
              name="justify-view"
              value="pending"
              onChange={(e) => setSelectedView(e.value)}
              checked={selectedView === 'pending'}
            />
            <label htmlFor="pending" className="cursor-pointer">
              Pendientes
            </label>
          </div>
          <div className="flex align-items-center gap-2">
            <RadioButton
              inputId="approved"
              name="justify-view"
              value="approved"
              onChange={(e) => setSelectedView(e.value)}
              checked={selectedView === 'approved'}
            />
            <label htmlFor="approved" className="cursor-pointer">
              Aprobados
            </label>
          </div>
        </div>
      </div>
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

  const handleApprove = () => {
    if (!selectedFile?._id) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Acción no disponible',
        detail: 'No se encontró un justificante para aprobar.',
        life: 4000,
      });
      return;
    }

    mutate({
      data: {
        _id: selectedFile._id,
        approvedBy: _id,
      },
    });
    setAprovateDialog(false);
  };

  const aprovateDialogFooter = () => (
    <>
      <Button
        label="Rechazar"
        icon="pi pi-times"
        outlined
        severity="danger"
        onClick={() => setAddCommentDialog(true)}
      />
      <Button label="Aprobar" icon="pi pi-check" text severity="success" onClick={handleApprove} />
    </>
  );

  const closeAprovateDialog = () => setAprovateDialog(false);

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedFile && addCommentDialog && (
            <AddCommentDialogForm
              visible={addCommentDialog}
              setVisible={setAddCommentDialog}
              file={selectedFile._id}
              headerTitle="Agregar comentario"
            />
          )}

          {selectedView === 'pending' ? (
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
                header="Estado"
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
          ) : (
            <DataTable
              value={approvedRecords}
              dataKey="_id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              className="datatable-responsive"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} justificantes aprobados"
              globalFilter={globalFilter}
              emptyMessage="No hay justificantes aprobados"
              header={header}
              responsiveLayout="scroll"
            >
              <Column
                field="nameFile"
                header="Justificante"
                sortable
                body={approvedFileNameTemplate}
                headerStyle={{
                  minWidth: '15rem',
                  border: '1px solid #2a497b',
                  backgroundColor: '#2a497b',
                  color: 'white',
                }}
                style={{ textAlign: 'left' }}
              />
              <Column
                field="uploadedBy.firstName"
                header="Subido por"
                sortable
                body={approvedUploaderTemplate}
                headerStyle={{
                  minWidth: '15rem',
                  border: '1px solid #2a497b',
                  backgroundColor: '#2a497b',
                  color: 'white',
                }}
                style={{ textAlign: 'left' }}
              />
              <Column
                field="approvedBy"
                header="Estado"
                sortable
                body={approvedStatusTemplate}
                headerStyle={{
                  minWidth: '10rem',
                  border: '1px solid #2a497b',
                  backgroundColor: '#2a497b',
                  color: 'white',
                }}
                style={{ textAlign: 'left', minWidth: '8rem' }}
              />
              <Column
                body={approvedActionTemplate}
                header="Acciones"
                headerStyle={{
                  minWidth: '10rem',
                  border: '1px solid #2a497b',
                  backgroundColor: '#2a497b',
                  color: 'white',
                }}
              />
            </DataTable>
          )}

          <Dialog
            visible={aprovateDialog}
            style={{ width: '450px' }}
            header="Revisión de justificante"
            modal
            footer={aprovateDialogFooter}
            onHide={closeAprovateDialog}
          >
            <div className="flex flex-column gap-3 w-full">
              <div className="flex flex-column gap-1">
                <span className="font-semibold text-900">Acción a realizar</span>
                <p className="m-0 text-700">
                  Estás a punto de {selectedFile?._id ? 'aprobar o rechazar' : 'gestionar'} el justificante
                  registrado para esta ausencia. Aprobar lo marcará como justificado; rechazar solicitará un
                  comentario.
                </p>
              </div>

              <div className="flex flex-column gap-2 p-3 border-1 surface-border border-round">
                <div className="flex justify-content-between">
                  <span className="text-700">Profesor</span>
                  <span className="font-semibold text-900">
                    {selectedTeacher
                      ? `${selectedTeacher.getUserById.firstName} ${selectedTeacher.getUserById.lastName} ${selectedTeacher.getUserById.middleName}`
                      : 'Sin datos'}
                  </span>
                </div>
                <div className="flex justify-content-between">
                  <span className="text-700">Materia</span>
                  <span className="font-semibold text-900">{selectedSched?.subjectLargeName ?? 'Sin datos'}</span>
                </div>
                <div className="flex justify-content-between">
                  <span className="text-700">Fecha de registro</span>
                  <span className="font-semibold text-900">
                    {selectedAttendance
                      ? new Date(selectedAttendance.createdAt).toLocaleDateString('es-MX', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                      : 'Sin datos'}
                  </span>
                </div>
                <div className="flex justify-content-between">
                  <span className="text-700">Archivo</span>
                  <span className="font-semibold text-900">{selectedFile?.nameFile ?? 'No adjunto'}</span>
                </div>
              </div>

              <p className="m-0 text-600">
                Confirma la acción para este justificante. Se notificará al profesor correspondiente.
              </p>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CareerCrud;
