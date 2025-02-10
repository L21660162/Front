import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IPeriod,
  IGetAllPeriodsQuery,
  useDeletePeriodMutation,
  useGetAllPeriodsQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditperiodDialogForm from '../../forms/period/dashboard/editPeriod';

function PeriodCrud() {
  const emptyperiod: IPeriod = {
    _id: '',
    name: '',
    largeIdentifier: '',
    shortIdentifier: '',
    startDate: new Date().toISOString(),
    finalDate: new Date().toISOString(),
    isDeleted: false,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
  };

  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' });
  const toast = useRef<Toast>(null);

  const [periods, setperiods] = useState(null);
  const [deleteBuildsDialog, setDeleteBuildsDialog] = useState(false);
  const [period, setperiod] = useState<IPeriod>(emptyperiod);
  const [selectedperiods, setSelectedperiods] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<any>>(null);
  const [selectedBuilds, setSelectedBuilds] = useState<IPeriod | null>(null);
  const [visibleEditperiod, setVisibleEditperiod] = useState(false);

  const { data } = useGetAllPeriodsQuery<IGetAllPeriodsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeletePeriodMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.periodDeleteSuccess'),
      });

      setTimeout(() => {
        window.location.reload();
      }, 50);
    },
    onError: (errorResponse: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
        life: 5000,
      });
    },
  });

  const hideDeleteperiodsDialog = () => {
    setDeleteBuildsDialog(false);
  };

  const editperiod = (period: IPeriod) => {
    setSelectedBuilds(period);
    setVisibleEditperiod(true);
  };

  const confirmDeleteperiod = (period: IPeriod) => {
    setperiod(period);
    setDeleteBuildsDialog(true);
  };

  const deleteperiod = () => {
    const _periods = period._id;
    mutate({ data: { _id: _periods } });
    setDeleteBuildsDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (period: IPeriod) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {period.name}
      </>
    );
  };

  const descriptionBodyTemplate = (period: IPeriod) => {
    return (
      <>
        <span className="p-column-title">Large Identifier</span>
        {period.largeIdentifier}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IPeriod) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editperiod(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="warning"
          onClick={() => confirmDeleteperiod(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.perioddirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteperiodDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteperiodsDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteperiod} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedBuilds && visibleEditperiod && (
            <EditperiodDialogForm
              headerTitle={t('module.periods.dashboard.dialog.edit.header')}
              visible={visibleEditperiod}
              setVisible={setVisibleEditperiod}
              period={selectedBuilds}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllPeriods.docs}
            selection={selectedperiods}
            onSelectionChange={(e) => setSelectedperiods(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} períodos"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Noperiod')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tperiodName')}
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="largeIdentifier"
              header={t('global.dictionary.tlargeIdentifier')}
              sortable
              body={(rowData: IPeriod) => rowData.largeIdentifier}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="shortIdentifier"
              header={t('global.dictionary.tshortIdentifier')}
              sortable
              body={(rowData: IPeriod) => rowData.shortIdentifier}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
          </DataTable>

          <Dialog
            visible={deleteBuildsDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteperiodDialogFooter}
            onHide={hideDeleteperiodsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {period && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{period.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default PeriodCrud;