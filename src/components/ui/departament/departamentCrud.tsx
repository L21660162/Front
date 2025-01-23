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
  IDepartment,
  IGetAllDepartmentsQuery,
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditdepartmentDialogForm from '../../forms/department/dashboard/editDepartment';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function departmentCrud() {
  const emptydepartment: IDepartment = {
    areaKey: '',
    name: '',
    _id: '',
    createdAt: undefined,
    departmentBoss: '',
    isDeleted: false,
    updatedAt: undefined,
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const { roles } = useAccessTokenData() as TokenData;

  const [departments, setdepartments] = useState(null);
  const [deletedepartmentDialog, setDeletedepartmentDialog] = useState(false);
  const [department, setdepartment] = useState<Demo.IGetAlldepartmentsQuery.docs>(emptydepartment);
  const [selecteddepartments, setSelecteddepartments] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selecteddepartment, setSelecteddepartment] = useState<IDepartment | null>(null);
  const [visibleEditdepartment, setVisibleEditdepartment] = useState(false);

  const { data } = useGetAllDepartmentsQuery<IGetAllDepartmentsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteDepartmentMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.departmentDeleteSuccess'),
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

  const hideDeletedepartmentDialog = () => {
    setDeletedepartmentDialog(false);
  };

  const editdepartment = (department: IDepartment) => {
    setSelecteddepartment(department);
    setVisibleEditdepartment(true);
  };

  const confirmDeletedepartment = (department: IDepartment) => {
    setdepartment(department);
    setDeletedepartmentDialog(true);
  };

  const deletedepartment = () => {
    const _departments = department._id;
    setdepartments(_departments);
    mutate({ data: { _id: _departments } });
    setDeletedepartmentDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (department: IDepartment) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {department.name}
      </>
    );
  };

  const descriptionBodyTemplate = (department: IDepartment) => {
    return (
      <>
        <span className="p-column-title">Description</span>
        {department.areaKey}
      </>
    );
  };

  const bossBodyTemplate = (department: IDepartment) => {
    return (
      <>
        <span className="p-column-title">Boss</span>
        {department.departmentBoss}
      </>
    );
  };

  
  const actionBodyTemplate = (rowData: Demo.department) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editdepartment(rowData)}
          style={{ marginRight: '10px' }}
        />
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-trash"
            className="mb-2"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeletedepartment(rowData)}
          />
        )}
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.departmentdirectory')}</h5>
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

  const deletedepartmentDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeletedepartmentDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deletedepartment} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selecteddepartment && visibleEditdepartment && (
            <EditdepartmentDialogForm
              headerTitle={t('module.department.dashboard.dialog.edit.header')}
              visible={visibleEditdepartment}
              setVisible={setVisibleEditdepartment}
              department={selecteddepartment}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllDepartments.docs}
            selection={selecteddepartments}
            onSelectionChange={(e) => setSelecteddepartments(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} carreras"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nodepartment')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tdepartmentName')}
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
              header={t('global.dictionary.tdepartmentDescription')}
              sortable
              body={descriptionBodyTemplate}
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
              body={bossBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'center' }}
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
            visible={deletedepartmentDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deletedepartmentDialogFooter}
            onHide={hideDeletedepartmentDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {department && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{department.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default departmentCrud;
