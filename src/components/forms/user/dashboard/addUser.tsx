import React, { PropsWithChildren, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  IUser,
  useUpsertUserMutation,
  IRoles,
  useGetAllDepartmentsQuery,
  IDepartment,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';

type AddUserDialogFormProps = {
  headerTitle: string;
};
type AddUserDialogFormPropsAndDialogStore = AddUserDialogFormProps & DialogStore;

export default function AddUserDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<AddUserDialogFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/user/dashboard' });
  const toast = useRef<Toast>(null);
  const { _id: actuallyUser, roles } = useAccessTokenData() as TokenData;

  const { mutate, isSuccess } = useUpsertUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.userCreateSuccess'),
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

  let rolesLabels = [
    { value: IRoles.Director, label: t('global.dictionary.roles.DIRECTOR') },
    { value: IRoles.Docente, label: t('global.dictionary.roles.DOCENTE') },
    { value: IRoles.JefeAcademico, label: t('global.dictionary.roles.JEFE_ACADEMICO') },
    { value: IRoles.Prefecto, label: t('global.dictionary.roles.PREFECTO') },
    { value: IRoles.Rrhh, label: t('global.dictionary.roles.RRHH') },
    { value: IRoles.Sa, label: t('global.dictionary.roles.SA') },
    { value: IRoles.Subdirector, label: t('global.dictionary.roles.SUBDIRECTOR') },
  ];

  const [selecroles, setSelecroles] = React.useState<IRoles[]>([]);

  const { data: allDepartmentData } = useGetAllDepartmentsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      keyword: null,
    },
  });

  let departmentData: Array<IDepartment> = [];
  if (allDepartmentData && Array.isArray(allDepartmentData?.getAllDepartments.docs)) {
    departmentData = allDepartmentData?.getAllDepartments.docs;
  }

  const handleCheckboxChange = (e: { checked: any }, value: IRoles) => {
    const selectedRoles = watch('roles');
    if (e.checked) {
      selectedRoles.push(value);
    } else {
      const index = selectedRoles.indexOf(value);
      if (index !== -1) {
        selectedRoles.splice(index, 1);
      }
    }

    // FORMULARIO DESDE AQUI
    setValue('roles', selectedRoles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IUser>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      department: '',
      roles: [],
      gender: '',
      rfc: '',
    },
  });

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    mutate({ data });
    reset();
  };

  const footerContent = (
    <div>
      <Button
        className="p-button-text p-button-danger p-button-outlined p-button-rounded"
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => {
          setVisible(false);
          reset();
        }}
      />
      <Button
        type="submit"
        label={t('global.forms.submit') as string}
        className="p-button-rounded p-button-raised mt-2"
        onClick={handleSubmit(onSubmit)}
        // disabled={isSuccess}
      />
    </div>
  );

  return (
    <Dialog
      header={headerTitle}
      visible={visible}
      style={{ width: '35rem' }}
      onHide={() => setVisible(false)}
      footer={footerContent}
    >
      <Toast ref={toast} />
      <form className="p-fluid">
        <div className="label">
          <label htmlFor="contact">
            <b>{t('')}</b>
          </label>
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-briefcase" />
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: t('global.forms.validation.firstName') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="firstName" className={classNames({ 'p-error': !!errors.firstName })}>
              {t('global.dictionary.firstName')}*
            </label>
          </span>
          {errors.firstName && <small className="p-error">{errors.firstName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-briefcase" />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: t('global.forms.validation.lastName') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="lastName" className={classNames({ 'p-error': !!errors.lastName })}>
              {t('global.dictionary.lastName')}*
            </label>
          </span>
          {errors.lastName && <small className="p-error">{errors.lastName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-briefcase" />
            <Controller
              name="middleName"
              control={control}
              rules={{
                required: t('global.forms.validation.middleName') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="middleName" className={classNames({ 'p-error': !!errors.middleName })}>
              {t('global.dictionary.middleName')}*
            </label>
          </span>
          {errors.middleName && <small className="p-error">{errors.middleName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                required: t('global.forms.validation.email') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>
              {t('global.dictionary.email')}*
            </label>
          </span>
          {errors.email && <small className="p-error">{errors.email?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-id-card" />
            <Controller
              name="password"
              control={control}
              rules={{
                required: t('global.forms.validation.password') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="password" className={classNames({ 'p-error': !!errors.password })}>
              {t('global.dictionary.password')}*
            </label>
          </span>
          {errors.password && <small className="p-error">{errors.password?.message}</small>}
        </div>

        <div className="field">
          <span className="field-radiobutton">
            <Controller
              name="gender"
              control={control}
              rules={{
                required: t('global.forms.validation.password') as string,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name}>{t('global.dictionary.gener')}</label>
                  <br />
                  <div className="flex gap-3">
                    <div className="flex align-items-center gap-2">
                      <RadioButton
                        id={`${field.name}-M`}
                        type="checkbox"
                        value="M"
                        checked={field.value === 'M'}
                        onChange={() => field.onChange('M')}
                      />
                      <label htmlFor={`${field.name}-true`} className="ml-2">
                        {' '}
                        Hombre
                      </label>
                    </div>
                    <div className="flex align-items-center gap-2">
                      <RadioButton
                        id={`${field.name}-F`}
                        type="checkbox"
                        value="F"
                        checked={field.value === 'F'}
                        onChange={() => field.onChange('F')}
                      />
                      <label htmlFor={`${field.name}-false`} className="ml-2">
                        {' '}
                        Mujer
                      </label>
                    </div>
                  </div>
                </div>
              )}
            />
          </span>
          {errors.password && <small className="p-error">{errors.password?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-lock" />

            <Controller
              name="roles"
              control={control}
              rules={{
                required: 'Asigna un rol para el usuario',
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': fieldState.invalid })}
                  >
                    {t('global.dictionary.roles.rules')}*
                  </label>
                  <MultiSelect
                    id={field.name}
                    {...field}
                    options={rolesLabels}
                    optionLabel="label"
                    optionValue="value"
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                    onChange={(e) => {
                      setSelecroles(e.value);
                      setValue('roles', e.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    showSelectAll={false}
                  />
                  {fieldState.invalid && (
                    <small className="p-error">
                      {t('global.dictionary.roles.rules')} Obligatorio
                    </small>
                  )}
                </>
              )}
            />
            <label htmlFor="roles" className={classNames({ 'p-error': !!errors.roles })}>
              {t('global.dictionary.roles.rules')}*
            </label>
          </span>
          {errors.roles && <small className="p-error">{errors.roles.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-lock" />
            <Controller
              name="rfc"
              control={control}
              rules={{
                required: t('global.forms.validation.rfc') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="rfc" className={classNames({ 'p-error': !!errors.rfc })}>
              {t('global.dictionary.rfc')}*
            </label>
          </span>
          {errors.rfc && <small className="p-error">{errors.rfc?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-hashtag" />
            <Controller
              name="department"
              control={control}
              rules={{
                required: t('global.forms.validation.department') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={departmentData}
                  optionLabel="name"
                  optionValue="_id"
                />
              )}
            />
            <label htmlFor="department" className={classNames({ 'p-error': !!errors.department })}>
              {t('global.dictionary.department')}*
            </label>
          </span>
          {errors.department && <small className="p-error">{errors.department?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
