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
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IBuilding,
  IGetAllBuildingsQuery,
  useDeleteBuildingMutation,
  useGetAllBuildingsQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditBuildingDialogForm from '../../forms/buildings/dashboard/editbuildings';

function BuildingCrud() {
  const emptyBuilding: IBuilding = {
    name: '',
    letter: '',
    _id: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    deletedAt: undefined,
  };

  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' });
  const toast = useRef<Toast>(null);
  const [deleteBuildingDialog, setDeleteBuildingDialog] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IBuilding>(emptyBuilding);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<any>>(null);
  const [visibleEditBuilding, setVisibleEditBuilding] = useState(false);

  const { data, refetch } = useGetAllBuildingsQuery<IGetAllBuildingsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteBuildingMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.buildingDeleteSuccess'),
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

  const hideDeleteBuildingDialog = () => {
    setDeleteBuildingDialog(false);
  };

  const editBuilding = (building: IBuilding) => {
    setSelectedBuilding(building);
    setVisibleEditBuilding(true);
  };

  const confirmDeleteBuilding = (building: IBuilding) => {
    setSelectedBuilding(building);
    setDeleteBuildingDialog(true);
  };

  const deleteBuilding = () => {
    mutate({ data: { _id: selectedBuilding._id } });
    setDeleteBuildingDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (building: IBuilding) => {
    return (
      <>
        <span className="p-column-title">{t('global.dictionary.name')}</span>
        {building.name}
      </>
    );
  };

  const letterBodyTemplate = (building: IBuilding) => {
    return (
      <>
        <span className="p-column-title">{t('global.dictionary.letter')}</span>
        {building.letter}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IBuilding) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editBuilding(rowData)}
          style={{ marginRight: '10px' }}
        />
        <Button
          icon="pi pi-trash"
          className="mb-2"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteBuilding(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.buildingDirectory')}</h5>
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

  const deleteBuildingDialogFooter = (
    <>
      <Button
        label={t('global.buttons.no')}
        icon="pi pi-times"
        text
        onClick={hideDeleteBuildingDialog}
      />
      <Button label={t('global.buttons.yes')} icon="pi pi-check" text onClick={deleteBuilding} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedBuilding && visibleEditBuilding && (
            <EditBuildingDialogForm
              headerTitle={t('module.buildings.dashboard.dialog.edit.header')}
              visible={visibleEditBuilding}
              setVisible={setVisibleEditBuilding}
              building={selectedBuilding}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllBuildings.docs}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.BuildingReport') as string}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noBuildings')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tBuildingName')}
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
              field="letter"
              header={t('global.dictionary.letter')}
              sortable
              body={letterBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
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
            visible={deleteBuildingDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={deleteBuildingDialogFooter}
            onHide={hideDeleteBuildingDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem', color: '#e57373' }}
              />
              {selectedBuilding && (
                <span>
                  {t('global.confirmation.deleteTitle', {
                    name: <b>{selectedBuilding.name}</b>,
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

export default BuildingCrud;
