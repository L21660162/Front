import { useNavigate } from '@tanstack/react-router';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../types/apierror';
import { Demo } from '../../../../types/types';
import {
  IGetAllUsersQuery,
  IRoles,
  IUser,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpsertUserMutation,
} from '../../../graphql/graphql';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import UserDialogFormEdit from '../../forms/user/dashboard/editUser';
import UserDialogFormPicture from '../../forms/user/dashboard/pictureUser';

function UserCrud() {
  const emptyUser: IUser = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    _id: '',
    gender: '',
    roles: [
      IRoles.Sa,
      IRoles.Subdirector,
      IRoles.Rrhh,
      IRoles.Prefecto,
      IRoles.Director,
      IRoles.Docente,
      IRoles.JefeAcademico,
    ],
    password: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    department: '',
    rfc: '',
  };

  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/user/dashboard' });
  const { _id: actuallyUser, roles } = useAccessTokenData() as TokenData;

  const [users, setUsers] = useState(null);
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    firstName: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    lastName: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    middleName: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    email: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [user, setUser] = useState<Demo.IGetAllUsersQuery.docs>(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedUserPassword, setSelectedUserPassword] = useState<IUser | null>(null);
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [visiblePictureUser, setVisiblePictureUser] = useState(false);
  const [visiblePasswordUser, setVisiblePasswordUser] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const { data } = useGetAllUsersQuery<IGetAllUsersQuery>(GRAPHQL_CLIENT, {
    limit: 99999,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.userDeleteSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/user/dashboard' });
        window.location.reload();
      }, 200);
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

  const { mutate: upsertUserMutation, isLoading: isUpdatingPassword } =
    useUpsertUserMutation<IApiError>(GRAPHQL_CLIENT, {
      onSuccess: () => {
        toast.current?.show({
          severity: 'success',
          summary: t('global.toast.success.summary'),
          detail: 'Contraseña actualizada correctamente',
        });

        setVisiblePasswordUser(false);
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

  const roleTranslations = {
    DIRECTOR: 'Director Academico',
    DOCENTE: 'Docente',
    JEFE_ACADEMICO: 'Jefe Académico',
    PREFECTO: 'Prefecto',
    RRHH: 'Recursos Humanos',
    SA: 'Super Administrador',
    SUBDIRECTOR: 'Subdirector Académico',
  };

  let options;

  if (roles.includes('SUPER_ADMINISTRATOR')) {
    options = [
      { label: roleTranslations.SA, value: 'Sa' },
      { label: roleTranslations.ADMIN, value: 'Admin' },
      { label: roleTranslations.ORGANIZATION, value: 'Organization' },
      { label: roleTranslations.CORD, value: 'Cord' },
      { label: roleTranslations.STUDENT, value: 'Student' },
    ];
  } else {
    options = [
      { label: roleTranslations.ORGANIZATION, value: 'Organization' },
      { label: roleTranslations.CORD, value: 'Cord' },
      { label: roleTranslations.STUDENT, value: 'Student' },
    ];
  }

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const editUser = (user: IUser) => {
    setVisibleEditUser(true);
    setSelectedUser(user);
  };

  const changePasswordUser = (user: IUser) => {
    setSelectedUserPassword(user);
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setVisiblePasswordUser(true);
  };

  const confirmDeleteUser = (user: IUser) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = () => {
    const _users = user._id;
    setUsers(_users);
    mutate({
      data: { _id: _users, updatedBy: actuallyUser },
    });
    setDeleteUserDialog(false);
  };

  const submitPasswordChange = () => {
    if (!selectedUserPassword) return;

    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Ingresa y confirma la nueva contraseña.',
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Las contraseñas no coinciden.',
      });
      return;
    }

    upsertUserMutation({
      data: {
        _id: selectedUserPassword._id,
        email: selectedUserPassword.email,
        firstName: selectedUserPassword.firstName,
        lastName: selectedUserPassword.lastName,
        middleName: selectedUserPassword.middleName,
        password: passwordForm.newPassword,
        department: selectedUserPassword.department,
        roles: selectedUserPassword.roles as IRoles[],
        gender: selectedUserPassword.gender,
        rfc: selectedUserPassword.rfc,
        updatedBy: actuallyUser,
      },
    });
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (user: IUser) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {user.firstName}
      </>
    );
  };

  const middleBodyTemplate = (user: IUser) => {
    return (
      <>
        <span className="p-column-title">middleName</span>
        {user.middleName}
      </>
    );
  };

  const lastnameBodyTemplate = (user: IUser) => {
    return (
      <>
        <span className="p-column-title">Apellido</span>
        {user.lastName}
      </>
    );
  };

  const emailBodyTemplate = (user: IUser) => {
    return (
      <>
        <span className="p-column-title">email</span>
        {user.email}
      </>
    );
  };

  const rfcBodyTemplate = (user: IUser) => {
    return (
      <>
        <span className="p-column-title">rfc</span>
        {user.rfc}
      </>
    );
  };

  const roleBodyTemplate = (user: IUser) => {
    const roles = user.roles || [];
    const translatedRoles = roles.map((role) => roleTranslations[role]);
    const rolesString = translatedRoles.join(', ');

    return (
      <>
        <span className="p-column-title">Roles</span>
        {rolesString}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.user) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-camera"
          className="mb-2"
          rounded
          outlined
          severity="success"
          onClick={() => {
            setSelectedUser(rowData);
            setVisiblePictureUser(true);
          }}
          style={{ marginRight: '10px' }}
        />
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editUser(rowData)}
          style={{ marginRight: '2px' }}
        />
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-key"
            className="mb-2"
            rounded
            outlined
            severity="info"
            onClick={() => changePasswordUser(rowData)}
            style={{ marginRight: '2px' }}
          />
        )}
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-trash"
            className="mb-2"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteUser(rowData)}
          />
        )}
      </div>
    );
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const _filters = { ...filters };

    // @ts-ignore
    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div
      className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
      style={{ padding: '11px', borderRadius: '0px' }}
    >
      <h5 className="m-0">{t('global.dictionary.userdirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Búsqueda"
        />
      </span>
    </div>
  );

  const deleteuserDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
      <Button label="Si" icon="pi pi-check" text onClick={deleteUser} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedUser && visibleEditUser && (
            <UserDialogFormEdit
              headerTitle={t('module.user.dashboard.dialog.edit.header')}
              visible={visibleEditUser}
              setVisible={setVisibleEditUser}
              id={selectedUser._id}
            />
          )}

          {selectedUserPassword && visiblePasswordUser && (
            <Dialog
              visible={visiblePasswordUser}
              style={{ width: '25rem' }}
              header="Cambiar contraseña"
              onHide={() => setVisiblePasswordUser(false)}
              footer={
                <div className="flex gap-2 justify-content-end">
                  <Button
                    label="Cancelar"
                    className="p-button-text"
                    onClick={() => setVisiblePasswordUser(false)}
                  />
                  <Button
                    label="Guardar"
                    icon="pi pi-save"
                    loading={isUpdatingPassword}
                    onClick={submitPasswordChange}
                  />
                </div>
              }
            >
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-key" />
                  <InputText
                    id="new-password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                  />
                  <label htmlFor="new-password">Nueva contraseña</label>
                </span>
              </div>
              <div className="field mt-3">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-lock" />
                  <InputText
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                  />
                  <label htmlFor="confirm-password">Confirmar contraseña</label>
                </span>
              </div>
            </Dialog>
          )}

          {selectedUser && visiblePictureUser && (
            <UserDialogFormPicture
              headerTitle={t('module.user.dashboard.dialog.picture.header')}
              visible={visiblePictureUser}
              setVisible={setVisiblePictureUser}
              user={selectedUser}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllUsers.docs}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} de {last} a {totalRecords} Usuarios"
            filters={filters}
            filterDisplay="row"
            globalFilterFields={['firstName', 'lastName', 'middleName', 'email']}
            emptyMessage={t('global.dictionary.Nouser')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="firstname"
              header={t('global.dictionary.firstName')}
              sortable
              filterField="firstName"
              body={nameBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="lastname"
              header={t('global.dictionary.lastName')}
              sortable
              filterField="lastName"
              body={lastnameBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="middlename"
              header={t('global.dictionary.middleName')}
              sortable
              filterField="middleName"
              body={middleBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="email"
              header={t('global.dictionary.email')}
              sortable
              filterField="email"
              body={emailBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="rfc"
              header={t('global.dictionary.rfc')}
              sortable
              body={rfcBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="roles"
              header={t('global.dictionary.roles.rules')}
              sortable
              body={roleBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              field="edita"
              header="Subir Foto / Editar / Borrar"
              body={actionBodyTemplate}
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>
          <Dialog
            visible={deleteUserDialog}
            style={{ width: '450px' }}
            header=""
            modal
            footer={deleteuserDialogFooter}
            onHide={hideDeleteUserDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {user && (
                <span>
                  Seguro que quieres eliminar el Usuario <b>{user.firstName}</b> con correo{' '}
                  <b>{user.email}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default UserCrud;
