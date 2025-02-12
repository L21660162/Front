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
  IGroup,
  IGetAllGroupsQuery,
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
  useGetAllCareersQuery,  // Nueva importación
  IGetAllCareersQuery,  // Nueva importación
  useGetAllPeriodsQuery,
  IGetAllPeriodsQuery
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditGroupDialogForm from '../../forms/group/dashboard/editGroup';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function GroupCrud() {
  const emptyGroup: IGroup = {
    career: '',
    period: '',
    _id: '',
    semester: '',
    identifier: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    deletedAt: undefined
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' }); //aun no se

  const [Groups, setGroups] = useState(null);
  const [deleteBuildsDialog, setDeleteBuildsDialog] = useState(false);
  const [Group, setGroup] = useState<Demo.GetAllBuildsQuery.docs>(emptyGroup);
  const [selectedGroups, setSelectedGroups] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedBuilds, setSelectedBuilds] = useState<IGroup | null>(null);
  const [visibleEditGroup, setVisibleEditGroup] = useState(false);

  const { data } = useGetAllGroupsQuery<IGetAllGroupsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  // Nueva consulta para obtener carreras
  const { data: careersData } = useGetAllCareersQuery<IGetAllCareersQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { data: periodsData } = useGetAllPeriodsQuery<IGetAllPeriodsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  // Función para obtener el nombre de la carrera por ID
  const getCareerNameById = (careerId: string): string => {
    if (!careersData) return 'Cargando...';
    const career = careersData.getAllCareers.docs.find(c => c._id === careerId);
    return career ? career.name : 'Carrera no encontrada';
  };

  const getPeriodNameById = (periodId: string): string => {
    if (!periodsData) return t('global.loading'); // Usa la traducción para "Cargando..."
    const period = periodsData.getAllPeriods.docs.find(p => p._id === periodId);
    return period ? period.name : t('global.dictionary.periodNotFound');
  };


  const { mutate } = useDeleteGroupMutation<IApiError>(GRAPHQL_CLIENT, { //Pendiente
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

  const hideDeleteGroupsDialog = () => {
    setDeleteBuildsDialog(false);
  };

  const editGroup = (Group: IGroup) => {
    setSelectedBuilds(Group);
    setVisibleEditGroup(true);
  };

  const confirmDeleteGroup = (Group: IGroup) => {
    setGroup(Group);
    setDeleteBuildsDialog(true);
  };

  const deleteGroup = () => {
    const _Groups = Group._id;
    setGroups(_Groups);
    mutate({ data: { _id: _Groups } });
    setDeleteBuildsDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (group: IGroup) => {
    return (
      <>
        <span className="p-column-title">Carrera</span>
        {getCareerNameById(group.career)}
      </>
    );
  };

  const descriptionBodyTemplate = (group: IGroup) => {
    return (
      <>
        <span className="p-column-title">{t('global.dictionary.tPeriodName')}</span>
        {getPeriodNameById(group.period)}
      </>
    );
  };

  const semesterBodyTemplate = (Group: IGroup) => {
    return (
      <>
        <span className="p-column-title">Letter</span>
        {Group.semester}
      </>
    );
  };

  const periodBodyTemplate = (Group: IGroup) => {
    return (
      <>
        <span className="p-column-title">Letter</span>
        {Group.identifier}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.Group) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editGroup(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="warning"
          onClick={() => confirmDeleteGroup(rowData)}
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

  const deleteGroupDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteGroupsDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteGroup} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedBuilds && visibleEditGroup && (
            <EditGroupDialogForm
              headerTitle={t('module.Group.dashboard.dialog.edit.header')}
              visible={visibleEditGroup}
              setVisible={setVisibleEditGroup}
              Group={selectedBuilds}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllGroups.docs}
            selection={selectedGroups}
            onSelectionChange={(e) => setSelectedGroups(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.dictionary.currentPageReportTemplate', {
              first: '{first}',
              last: '{last}',
              totalRecords: '{totalRecords}'
            })}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.NoGroup')}
            header={header}
            responsiveLayout="scroll"
          >
            {/* Columnas manteniendo tus traducciones */}
            <Column
              field="name"
              header={t('global.dictionary.tCareerName')}
              sortable
              body={nameBodyTemplate}  // Usa la plantilla modificada
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.tPeriodName')}
              sortable
              body={descriptionBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.tSemesterName')}
              sortable
              body={semesterBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.tIndentifier')}
              sortable
              body={periodBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
          </DataTable>

          <Dialog
            visible={deleteBuildsDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteGroupDialogFooter}
            onHide={hideDeleteGroupsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {Group && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{Group.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default GroupCrud;
