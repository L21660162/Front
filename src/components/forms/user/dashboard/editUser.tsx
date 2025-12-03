import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  ICareer,
  IGetAllUsersQuery,
  IGetUserByIdQuery,
  IUpdateUserInput,
  IUser,
  useGetAllCareersQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../../../graphql/graphql';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type UserFormProps = {
  headerTitle: string;
};

type Prop = {
  id: string;
};
type UserFormPropsAndDialogStore = UserFormProps & DialogStore & Prop;

export default function UserDialogForm({
  headerTitle,
  visible,
  setVisible,
  id,
}: PropsWithChildren<UserFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/user/dashboard' });
  const toast = useRef<Toast>(null);
  const { _id: actuallyUser, roles: currentUserRoles } = useAccessTokenData() as TokenData;
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);

  const { mutate } = useUpdateUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.userEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/user/dashboard' });
        window.location.reload();
      }, 200);
      setIsButtonDisabld(false);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
        life: 5000,
      });

      setIsButtonDisabld(false);
    },
  });

  const { data: UserData } = useGetUserByIdQuery<IGetUserByIdQuery>(GRAPHQL_CLIENT, {
    id,
  });

  const { data } = useGetAllUsersQuery<IGetAllUsersQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      career: 'ALL',
    },
  });

  const { data: allCareersData } = useGetAllCareersQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const roleOptions = useMemo(
    () => [
      { value: IRoles.Director, label: t('global.dictionary.roles.DIRECTOR') },
      { value: IRoles.Docente, label: t('global.dictionary.roles.DOCENTE') },
      { value: IRoles.JefeAcademico, label: t('global.dictionary.roles.JEFE_ACADEMICO') },
      { value: IRoles.Prefecto, label: t('global.dictionary.roles.PREFECTO') },
      { value: IRoles.Rrhh, label: t('global.dictionary.roles.RRHH') },
      { value: IRoles.Sa, label: t('global.dictionary.roles.SA') },
      { value: IRoles.Subdirector, label: t('global.dictionary.roles.SUBDIRECTOR') },
    ],
    [t],
  );

  let careerData: Array<ICareer> = [];
  if (allCareersData && Array.isArray(allCareersData?.getAllCareers.docs)) {
    careerData = allCareersData?.getAllCareers.docs;
  }

  let Userdata: Array<IUser> = [];
  if (data && Array.isArray(data.getAllUsers.docs)) {
    Userdata = data.getAllUsers.docs;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUpdateUserInput>({
    defaultValues: {
      _id: UserData?.getUserById._id || '',
      firstName: UserData?.getUserById.firstName,
      lastName: UserData?.getUserById.lastName,
      middleName: UserData?.getUserById.middleName,
      email: UserData?.getUserById.email,
      roles: (UserData?.getUserById.roles as IRoles[]) || [],
      rfc: UserData?.getUserById.rfc,
      updatedBy: actuallyUser,
    },
  });

  useEffect(() => {
    if (UserData?.getUserById) {
      setValue('_id', UserData.getUserById._id || '');
      setValue('firstName', UserData.getUserById.firstName);
      setValue('lastName', UserData.getUserById.lastName);
      setValue('middleName', UserData.getUserById.middleName);
      setValue('email', UserData.getUserById.email);
      setValue('roles', UserData.getUserById.roles as IRoles[]);
      setValue('gender', UserData.getUserById.gender);
    }
  }, [UserData, setValue]);

  const onSubmit: SubmitHandler<IUpdateUserInput> = (data: IUpdateUserInput) => {
    setIsButtonDisabld(true);
    reset();
    mutate({ data });
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
        label={t('global.forms.edit') as string}
        className="p-button-rounded p-button-warning p-button-raised mt-2"
        icon="pi pi-pencil"
        onClick={handleSubmit(onSubmit)}
        outlined
        disabled={isButtonDisablesed}
      />
    </div>
  );

  return (
    <Dialog
      header={headerTitle}
      visible={visible}
      style={{ width: '35rem' }}
      onHide={() => {
        setVisible(false);
        reset();
      }}
      footer={footerContent}
    >
      <Toast ref={toast} />
      <form className="p-fluid">
        <div className="label">
          <label htmlFor="contact">
            <b>Información del Usuario</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="firstName"
              control={control}
              rules={{
                // required: t('global.forms.validation.userName') as string,
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.firstName') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  // defaultValue={userData?.getUserById.name}
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
            <i className="pi pi-book" />
            <Controller
              name="lastName"
              control={control}
              rules={{
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.lastName') as string),
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
            <i className="pi pi-book" />
            <Controller
              name="middleName"
              control={control}
              rules={{
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.middleName') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="middleName" className={classNames({ 'p-error': errors.middleName })}>
              {t('global.dictionary.middleName')}*
            </label>
          </span>
          {errors.middleName && <small className="p-error">{errors.middleName?.message}</small>}
        </div>

        {currentUserRoles.includes('SUPER_ADMINISTRATOR') && (
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-shield" />
              <Controller
                name="roles"
                control={control}
                rules={{
                  validate: (value) =>
                    (value && value.length > 0) || 'Selecciona al menos un rol',
                }}
                render={({ field, fieldState }) => (
                  <MultiSelect
                    id={field.name}
                    value={field.value}
                    options={roleOptions}
                    optionLabel="label"
                    optionValue="value"
                    display="chip"
                    placeholder={t('global.dictionary.roles.rules')}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                    onChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
              <label htmlFor="roles" className={classNames({ 'p-error': errors.roles })}>
                {t('global.dictionary.roles.rules')}*
              </label>
            </span>
            {errors.roles && <small className="p-error">{errors.roles?.message}</small>}
          </div>
        )}

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                validate: (value) => value !== '' || (t('global.forms.validation.email') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="email" className={classNames({ 'p-error': errors.email })}>
              {t('global.dictionary.email')}*
            </label>
          </span>
          {errors.email && <small className="p-error">{errors.email?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="rfc"
              control={control}
              rules={{
                validate: (value) => value !== '' || (t('global.forms.validation.rfc') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="rfc" className={classNames({ 'p-error': errors.rfc })}>
              {t('global.dictionary.rfc')}*
            </label>
          </span>
          {errors.rfc && <small className="p-error">{errors.rfc?.message}</small>}
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
                  <label htmlFor={field.name}>{t('global.dictionary.gender')}</label>
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
          {errors.gender && <small className="p-error">{errors.gender?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
