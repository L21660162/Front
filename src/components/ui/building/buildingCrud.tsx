/* eslint-disable @next/next/no-img-element */

'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Demo } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IBuilding,
  IGetAllBuildingsQuery,
  useDeletedCareerMutation,
  useGetAllBuildingsQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditBuildingDialogForm from '../../forms/buildings/dashboard/editbuildings';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function BuildingCrud() {
  const emptyBuilding: IBuilding = {
    name: '',
    letter: '',
    _id: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    deletedAt: undefined
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' }); //aun no se

  const [buildings, setBuildings] = useState(null);
  const [deleteBuildsDialog, setDeleteBuildsDialog] = useState(false);
  const [building, setBuilding] = useState<Demo.GetAllBuildsQuery.docs>(emptyBuilding);
  const [selectedBuildings, setSelectedBuildings] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedBuilds, setSelectedBuilds] = useState<IBuilding | null>(null);
  const [visibleEditBuilding, setVisibleEditBuilding] = useState(false);

  const { data } = useGetAllBuildingsQuery<IGetAllBuildingsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeletedCareerMutation<IApiError>(GRAPHQL_CLIENT, { //Pendiente
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.signUpSuccess'),
      });

      setTimeout(() => {
        window.location.reload();
      }, 50);
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

  const hideDeleteBuildingsDialog = () => {
    setDeleteBuildsDialog(false);
  };

  const editBuilding = (building: IBuilding) => {
    setSelectedBuilds(building);
    setVisibleEditBuilding(true);
  };

  const confirmDeleteBuilding = (building: IBuilding) => {
    setBuilding(building);
    setDeleteBuildsDialog(true);
  };

  const deleteBuilding = () => {
    const _buildings = building._id;
    setBuildings(_buildings);
    mutate({ data: { _id: _buildings } });
    setDeleteBuildsDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (building: IBuilding) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {building.name}
      </>
    );
  };

  const descriptionBodyTemplate = (building: IBuilding) => {
    return (
      <>
        <span className="p-column-title">Letter</span>
        {building.letter}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.Building) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editBuilding(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="warning"
          onClick={() => confirmDeleteBuilding(rowData)}
        />
      </>
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
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteBuildingDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteBuildingsDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteBuilding} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedBuilds && visibleEditBuilding && (
            <EditBuildingDialogForm
              headerTitle={t('module.buildings.dashboard.dialog.edit.header')}
              visible={visibleEditBuilding}
              setVisible={setVisibleEditBuilding}
              building={selectedBuilds}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllBuildings.docs}
            selection={selectedBuildings}
            onSelectionChange={(e) => setSelectedBuildings(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} carreras"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.NoBuilding')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tBuildingName')}
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.tBuildingDescription')}
              sortable
              body={descriptionBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
          </DataTable>

          <Dialog
            visible={deleteBuildsDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteBuildingDialogFooter}
            onHide={hideDeleteBuildingsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {building && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{building.name}</b>?
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
