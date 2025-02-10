import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IAttendance,
  IAttendanceStatus,
  IGetAllAttendancesQuery,
  useApproveFileMutation,
  useGetAllAttendancesQuery,
  useGetAllFilesQuery,
  useGetSchedulesFormattedQuery,
  useGetUserByIdQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { Tag } from 'primereact/tag';
import AddCommentDialogForm from '../../justify/dashbord/addcomment';

function ReviewJustify() {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/justify/dashboard' });
  const { roles, _id } = useAccessTokenData() as TokenData;
  const [aprovateDialog, setAprovateDialog] = useState(false);
  const [addCommentDialog, setAddCommentDialog] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
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

  const { data: DataAbsent, error: absentError, isLoading: absentLoading } = useGetAllAttendancesQuery<IGetAllAttendancesQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      firstPass: IAttendanceStatus.Absent,
      secondPass: IAttendanceStatus.Absent,
    },
  });
  
  if (absentLoading) {
    console.log('Loading attendances...');
  }
  
  if (absentError) {
    console.error('Error fetching attendances:', absentError);
  }
  
  console.log(DataAbsent);

  const {data: file } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      attendanceJustified: DataAbsent.getAllAttendances.docs[0]._id,
    },
  });

  const dataBodyTemplate = (atendans: IAttendance) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {new Date(atendans.createdAt).toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
      </>
    );
  };

  const nameBodyTemplate = (atendans: IAttendance) => {
    let img = 'http://localhost:4000/uploads/users/default_profile.jpg';
    const { data: user } = useGetUserByIdQuery(GRAPHQL_CLIENT, {
        id: atendans.uploadedBy,
    });

    if (user?.getUserById?.photo) {
      img = `http://localhost:4000${user?.getUserById?.photo}`;
    }
    return (
      <div className="flex align-items-center gap-2">
        <img src={img} alt={user?.getUserById?.rfc} className="image" />
        <span className="p-column-title">{`${user?.getUserById.firstName} ${user?.getUserById.lastName} ${user?.getUserById.middleName}`}</span>
      </div>
    );
  };

  const durationBodyTemplate = (atendans: IAttendance) => {
    const { data: schedule } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
      schedule: atendans.schedule,
    });

    const start = new Date(schedule?.getSchedulesFormatted[0].startTime).toLocaleDateString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const end = new Date(schedule?.getSchedulesFormatted[0].finalTime).toLocaleDateString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return (
      <>
        <span className="p-column-title">Duration</span>
        {start} - {end}
      </>
    );
  };

  const subjectBodyTemplate = (atendans: IAttendance) => {
    const { data: schedule } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
      schedule: atendans.schedule,
    });

    return (
      <>
        <span className="p-column-title">Credits</span>
        {schedule?.getSchedulesFormatted[0].subjectLargeName}
      </>
    );
  };

  const certificateBodyTemplate = (atendans: IAttendance) => {
    const { data: file } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
      page: 1,
      limit: 10,
      offset: 0,
      filter: {
        attendanceJustified: atendans._id,
      },
    });
    return (
      <>
        { file.getAllFiles.docs.length > 0 ? (
                file.getAllFiles.docs[0].approvedBy !== null ? (
                  <Tag
                    value="Justificado"
                    severity="success"
                    className="p-tag-rounded mx-1"
                  />
                ) : file.getAllFiles.docs[0].comments[0]._id !== null ? (
                  <Tag value="No Aceptado" severity="danger" className="p-tag-rounded mx-1" />
                ) : (
                  <Tag value="En revición" severity="warning" className="p-tag-rounded mx-1" />
                )
              ) : (
                <Tag value="Sin Justificar" severity="info" className="p-tag-rounded mx-1" />
              )}
      </>
    );
  };
  const actionBodyTemplate = (atendans: IAttendance) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => setAprovateDialog(true)}
          style={{ marginRight: '10px' }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.careerdirectory')}</h5>
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

  const aprovateDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideAprovateDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={() => setAddCommentDialog(true)} />
    </>
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
              headerTitle='Agregar comentario'
            />
          )}

          <DataTable
            ref={dt}
            value={DataAbsent?.getAllAttendances.docs}
            selection={selectedAttendance}
            onSelectionChange={(e) => setSelectedAttendance(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} carreras"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nocareer')}
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
              style={{ textAlign: 'center' }}
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
              style={{ minWidth: '8rem' }}
              body={certificateBodyTemplate}
              headerStyle={{
                minWidth: '5rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'center' }}
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
            <div className="flex w-full h-full flex-grow-1">
        <iframe
          src={`http://localhost:4000${file?.getAllFiles.docs[0].path}#toolbar=0&navpanes=0&scrollbar=0`}
          title="PDFDoc"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
          </Dialog>

          <Dialog
            visible={addCommentDialog}
            style={{ width: '450px' }}
            header="Agregar comentario"
            modal
            footer={commentDialogFooter}
            onHide={hideCommentDialog}
          >
            <div className="flex w-full h-full flex-grow-1">
        <iframe
          src={`http://localhost:4000${file?.getAllFiles.docs[0].path}#toolbar=0&navpanes=0&scrollbar=0`}
          title="PDFDoc"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ReviewJustify;
