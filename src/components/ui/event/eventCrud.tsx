import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Demo } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  ICareer,
  IEvent,
  IGetAllEventsQuery,
  IGetGroupByIdQuery,
  useDeletedCareerMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,
  useGetGroupByIdQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditCareerDialogForm from '../../forms/career/dashboard/editcareer';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import EditEventDialogForm from '../../forms/event/dashbord/editEvent';

function EventCrud() {
  const emptyEvent: IEvent = {
    _id: '',
    activity: '',
    startDate: '',
    finishDate: '',
    groupsIncluded: [],
    period: '',
    isDeleted: false,
    uploadedBy: '',
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const { roles } = useAccessTokenData() as TokenData;

  const [events, setEvents] = useState(null);
  const [deleteEventDialog, setDeleteEventDialog] = useState(false);
  const [event, setEvent] = useState<Demo.IGetAllEventsQuery.docs>(emptyEvent);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [visibleEditEvent, setVisibleEditEvent] = useState(false);

  const { data: Eventdata } = useGetAllEventsQuery<IGetAllEventsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteEventMutation<IApiError>(GRAPHQL_CLIENT, {
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
        life: 5000,
      });
    },
  });

  const hideDeleteEventDialog = () => {
    setDeleteEventDialog(false);
  };

  const editEvent = (event: IEvent) => {
    setSelectedEvent(event);
    setVisibleEditEvent(true);
  };

  const confirmDeleteEvent = (event: IEvent) => {
    setEvent(event);
    setDeleteEventDialog(true);
  };

  const deleteEvent = () => {
    const _events = event._id;
    setEvents(_events);
    mutate({ data: { _id: _events } });
    setDeleteEventDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const activityBodyTemplate = (event: IEvent) => {
    return (
      <>
        <span className="p-column-title">Activity</span>
        {event.activity}
      </>
    );
  };

  const startDateBodyTemplate = (event: IEvent) => {
    const startDate = new Date(event.startDate).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
    return (
      <>
        <span className="p-column-title">StartDate</span>
        {startDate}
      </>
    );
  };

  const finishDataBodyTemplate = (event: IEvent) => {
    const finishDate = new Date(event.finishDate).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
    return (
      <>
        <span className="p-column-title">finishData</span>
        {finishDate}
      </>
    );
  };

  const groupsBodyTemplate = (event: IEvent) => {
    if (!event.groupsIncluded || !Array.isArray(event.groupsIncluded)) {
      return <span className="p-column-title">groupsIncluded</span>;
    }
  
    const groupQueries = event.groupsIncluded.map((group) =>
      useGetGroupByIdQuery<IGetGroupByIdQuery>(GRAPHQL_CLIENT, { id: group })
    );
  
    const groups = groupQueries.map(({ data }) => data?.getGroupById?.identifier || "").join(", ");
  
    return (
      <>
        <span className="p-column-title">groupsIncluded</span>
        {groups}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.event) => {

    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editEvent(rowData)}
          style={{ marginRight: '10px' }}
        />
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-trash"
            className="mb-2"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteEvent(rowData)}
          />
        )}
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

  console.log('Eventdata', selectedEvent);

  const deletecareerDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteEventDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteEvent} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedEvent && visibleEditEvent && (
            <EditEventDialogForm
              headerTitle={t('module.career.dashboard.dialog.edit.header')}
              visible={visibleEditEvent}
              setVisible={setVisibleEditEvent}
              event={selectedEvent}
            />
          )}

          <DataTable
            ref={dt}
            value={Eventdata?.getAllEvents.docs}
            selection={selectedEvents}
            onSelectionChange={(e) => setSelectedEvents(e.value as any)}
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
              body={activityBodyTemplate}
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
              body={startDateBodyTemplate}
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
              body={finishDataBodyTemplate}
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
              body={groupsBodyTemplate}
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
            visible={deleteEventDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deletecareerDialogFooter}
            onHide={hideDeleteEventDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {event && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{event.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default EventCrud;
