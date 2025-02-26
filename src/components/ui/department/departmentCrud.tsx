/* eslint-disable @next/next/no-img-element */

'use client';

import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../types/apierror';
import {
  IDepartment,
  IGetAllDepartmentsQuery,
  IGetAllUsersQuery,
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
  useGetAllUsersQuery,
} from '../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import EditDepartmentDialogForm from '../../forms/department/dashboard/editDepartment';

function DepartmentCrud() {
  const emptyDepartment: IDepartment = {
    areaKey: '',
    departmentBoss: '',
    _id: '',
    name: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    deletedAt: undefined,
  };

  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' });

  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [users, setUsers] = useState<IGetAllUsersQuery['getAllUsers']['docs']>([]);
  const [deleteDepartmentDialog, setDeleteDepartmentDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment>(emptyDepartment);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [visibleEditDepartment, setVisibleEditDepartment] = useState(false);

  const { data, refetch } = useGetAllDepartmentsQuery<IGetAllDepartmentsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { data: usersData } = useGetAllUsersQuery<IGetAllUsersQuery>(GRAPHQL_CLIENT, {
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

  useEffect(() => {
    if (data?.getAllDepartments.docs) {
      setDepartments(data.getAllDepartments.docs);
    }
    if (usersData?.getAllUsers.docs) {
      setUsers(usersData.getAllUsers.docs);
    }
  }, [data, usersData]);

  const hideDeleteDepartmentDialog = () => {
    setDeleteDepartmentDialog(false);
  };

  const editDepartment = (department: IDepartment) => {
    setSelectedDepartment(department);
    setVisibleEditDepartment(true);
  };

  const confirmDeleteDepartment = (department: IDepartment) => {
    setSelectedDepartment(department);
    setDeleteDepartmentDialog(true);
  };

  const deleteDepartment = () => {
    mutate({ data: { _id: selectedDepartment._id } });
    setDeleteDepartmentDialog(false);
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

  const bossBodyTemplate = (department: IDepartment) => {
    const bossUser = users.find((user) => user._id === department.departmentBoss);
    return (
      <>
        <span className="p-column-title">Boss</span>
        {bossUser ? `${bossUser.firstName} ${bossUser.lastName}` : department.departmentBoss}
      </>
    );
  };

  const areaKeyBodyTemplate = (department: IDepartment) => {
    return (
      <>
        <span className="p-column-title">Area Key</span>
        {department.areaKey}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IDepartment) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editDepartment(rowData)}
          style={{ marginRight: '10px' }}
        />
        <Button
          icon="pi pi-trash"
          className="mb-2"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteDepartment(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.departmentDirectory')}</h5>
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

  const deleteDepartmentDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteDepartmentDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteDepartment} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedDepartment && visibleEditDepartment && (
            <EditDepartmentDialogForm
              headerTitle={t('module.departments.dashboard.dialog.edit.header')}
              visible={visibleEditDepartment}
              setVisible={setVisibleEditDepartment}
              department={selectedDepartment}
            />
          )}

          <DataTable
            ref={dt}
            value={departments}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.departmentReport') as string}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noDepartments')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.departmentName')}
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
              field="departmentBoss"
              header={t('global.dictionary.departmentBoss')}
              sortable
              body={bossBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="areaKey"
              header={t('global.dictionary.areaKey')}
              sortable
              body={areaKeyBodyTemplate}
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
            visible={deleteDepartmentDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={deleteDepartmentDialogFooter}
            onHide={hideDeleteDepartmentDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem', color: '#e57373' }}
              />
              {selectedDepartment && (
                <span>
                  {t('module.department.deleteConfirmation', {
                    name: <b>{selectedDepartment.name}</b>,
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

export default DepartmentCrud;
