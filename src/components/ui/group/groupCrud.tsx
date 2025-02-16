/* eslint-disable @next/next/no-img-element */

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
  IGroup,
  IGetAllGroupsQuery,
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
  useGetAllCareersQuery,
  IGetAllCareersQuery,
  useGetAllPeriodsQuery,
  IGetAllPeriodsQuery
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditGroupDialogForm from '../../forms/group/dashboard/editGroup';

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
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  
  const [deleteGroupDialog, setDeleteGroupDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>(emptyGroup);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visibleEditGroup, setVisibleEditGroup] = useState(false);

  const { data, refetch } = useGetAllGroupsQuery<IGetAllGroupsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

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

  const getCareerNameById = (careerId: string): string => {
    if (!careersData) return t('global.loading');
    const career = careersData.getAllCareers.docs.find(c => c._id === careerId);
    return career ? career.name : t('global.dictionary.careerNotFound');
  };

  const getPeriodNameById = (periodId: string): string => {
    if (!periodsData) return t('global.loading');
    const period = periodsData.getAllPeriods.docs.find(p => p._id === periodId);
    return period ? period.name : t('global.dictionary.periodNotFound');
  };

  const { mutate } = useDeleteGroupMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.groupDeleteSuccess'),
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

  const hideDeleteGroupDialog = () => setDeleteGroupDialog(false);

  const editGroup = (group: IGroup) => {
    setSelectedGroup(group);
    setVisibleEditGroup(true);
  };

  const confirmDeleteGroup = (group: IGroup) => {
    setSelectedGroup(group);
    setDeleteGroupDialog(true);
  };

  const deleteGroup = () => {
    mutate({ data: { _id: selectedGroup._id } });
    setDeleteGroupDialog(false);
  };

  const careerBodyTemplate = (group: IGroup) => (
    <>
      <span className="p-column-title">{t('global.dictionary.career')}</span>
      {getCareerNameById(group.career)}
    </>
  );

  const periodBodyTemplate = (group: IGroup) => (
    <>
      <span className="p-column-title">{t('global.dictionary.period')}</span>
      {getPeriodNameById(group.period)}
    </>
  );

  const semesterBodyTemplate = (group: IGroup) => (
    <>
      <span className="p-column-title">{t('global.dictionary.semester')}</span>
      {group.semester}
    </>
  );

  const identifierBodyTemplate = (group: IGroup) => (
    <>
      <span className="p-column-title">{t('global.dictionary.identifier')}</span>
      {group.identifier}
    </>
  );

  const actionBodyTemplate = (rowData: IGroup) => (
    <div className="flex align-items-center">
      <Button
        icon="pi pi-pencil"
        className="mb-2"
        rounded
        outlined
        severity="warning"
        onClick={() => editGroup(rowData)}
        style={{ marginRight: '10px' }}
      />
      <Button
        icon="pi pi-trash"
        className="mb-2"
        rounded
        outlined
        severity="danger"
        onClick={() => confirmDeleteGroup(rowData)}
      />
    </div>
  );

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.GroupDirectory')}</h5>
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

  const deleteGroupDialogFooter = (
    <>
      <Button
        label={t('global.buttons.no')}
        icon="pi pi-times"
        text
        onClick={hideDeleteGroupDialog}
      />
      <Button
        label={t('global.buttons.yes')}
        icon="pi pi-check"
        text
        onClick={deleteGroup}
      />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedGroup && visibleEditGroup && (
            <EditGroupDialogForm
              headerTitle={t('module.Group.dashboard.dialog.edit.header')}
              visible={visibleEditGroup}
              setVisible={setVisibleEditGroup}
              Group={selectedGroup}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllGroups.docs}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.groupReport') as string}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noGroups')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="career"
              header={t('global.dictionary.tCareerName')}
              sortable
              body={careerBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="period"
              header={t('global.dictionary.period')}
              sortable
              body={periodBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="semester"
              header={t('global.dictionary.semester')}
              sortable
              body={semesterBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              //style={{ textAlign: 'center' }}
            />
            <Column
              field="identifier"
              header={t('global.dictionary.tIndentifier')}
              sortable
              body={identifierBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              //style={{ textAlign: 'center' }}
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
            visible={deleteGroupDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={deleteGroupDialogFooter}
            onHide={hideDeleteGroupDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i 
                className="pi pi-exclamation-triangle mr-3" 
                style={{ fontSize: '2rem', color: '#e57373' }}
              />
              {selectedGroup && (
                <span>
                  {t('global.confirmation.deleteTitle', {
                    name: <b>{selectedGroup.identifier}</b>,
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

export default GroupCrud;