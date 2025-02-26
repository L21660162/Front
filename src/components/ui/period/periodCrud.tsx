import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
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
import EditperiodDialogForm from '../../forms/period/dashboard/editPeriod';

function PeriodCrud() {
  const emptyPeriod: IPeriod = {
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

  const [deletePeriodDialog, setDeletePeriodDialog] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<IPeriod>(emptyPeriod);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<any>>(null);
  const [visibleEditPeriod, setVisibleEditPeriod] = useState(false);

  const { data, refetch } = useGetAllPeriodsQuery<IGetAllPeriodsQuery>(GRAPHQL_CLIENT, {
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
      refetch();
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

  const hideDeletePeriodDialog = () => {
    setDeletePeriodDialog(false);
  };

  const editPeriod = (period: IPeriod) => {
    setSelectedPeriod(period);
    setVisibleEditPeriod(true);
  };

  const confirmDeletePeriod = (period: IPeriod) => {
    setSelectedPeriod(period);
    setDeletePeriodDialog(true);
  };

  const deletePeriod = () => {
    mutate({ data: { _id: selectedPeriod._id } });
    setDeletePeriodDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (period: IPeriod) => {
    return (
      <>
        <span className="p-column-title">{t('global.dictionary.name')}</span>
        {period.name}
      </>
    );
  };

  const identifierBodyTemplate = (field: 'largeIdentifier' | 'shortIdentifier') =>
    function (period: IPeriod) {
      return (
        <>
          <span className="p-column-title">{t(`global.dictionary.t${field}`)}</span>
          {period[field]}
        </>
      );
    };

  const dateBodyTemplate = (field: 'startDate' | 'finalDate') =>
    function (period: IPeriod) {
      return (
        <>
          <span className="p-column-title">{t(`global.dictionary.t${field}`)}</span>
          {new Date(period[field]).toLocaleDateString()}
        </>
      );
    };

  const actionBodyTemplate = (rowData: IPeriod) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editPeriod(rowData)}
          style={{ marginRight: '10px' }}
        />
        <Button
          icon="pi pi-trash"
          className="mb-2"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeletePeriod(rowData)}
        />
      </div>
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
          placeholder={t('global.search.placeholder') || ''}
        />
      </span>
    </div>
  );

  const deletePeriodDialogFooter = (
    <>
      <Button
        label={t('global.buttons.no')}
        icon="pi pi-times"
        text
        onClick={hideDeletePeriodDialog}
      />
      <Button label={t('global.buttons.yes')} icon="pi pi-check" text onClick={deletePeriod} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedPeriod && visibleEditPeriod && (
            <EditperiodDialogForm
              headerTitle={t('module.periods.dashboard.dialog.edit.header')}
              visible={visibleEditPeriod}
              setVisible={setVisibleEditPeriod}
              period={selectedPeriod}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllPeriods.docs}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.periodReport') as string}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noPeriods')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tperiodName')}
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
              field="largeIdentifier"
              header={t('global.dictionary.tlargeIdentifier')}
              sortable
              body={identifierBodyTemplate('largeIdentifier')}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="shortIdentifier"
              header={t('global.dictionary.tshortIdentifier')}
              sortable
              body={identifierBodyTemplate('shortIdentifier')}
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
              header={t('global.dictionary.actions')}
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>

          <Dialog
            visible={deletePeriodDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={deletePeriodDialogFooter}
            onHide={hideDeletePeriodDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem', color: '#e57373' }}
              />
              {selectedPeriod && (
                <span>
                  {t('global.confirmation.deleteTitle', {
                    name: <b>{selectedPeriod.name}</b>,
                  })}
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
