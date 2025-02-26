import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from '@tanstack/react-router';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  ICreateDepartmentInput,
  useCreateDepartmentMutation,
  useGetAllUsersQuery, // Nueva consulta para obtener usuarios
} from '../../../../graphql/graphql';
import { IApiError } from '../../../../../types/apierror';
import { DialogStore } from '../../../../store/global/types';

type DepartmentFormProps = {
  headerTitle: string;
};
type DepartmentFormPropsAndDialogStore = DepartmentFormProps & DialogStore;

export default function DepartmentDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<DepartmentFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/department' });
  const toast = useRef<Toast>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Consulta para obtener todos los usuarios
  const { data: usersData } = useGetAllUsersQuery(GRAPHQL_CLIENT);

  const { mutate } = useCreateDepartmentMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.departmentCreateSuccess'),
      });
      setTimeout(() => {
        navigate({ to: '/settings/department' });
        window.location.reload();
      }, 50);
      setIsButtonDisabled(false);
    },
    onError: (errorResponse: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
        life: 5000,
      });
      setIsButtonDisabled(false);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateDepartmentInput>({
    defaultValues: {
      areaKey: '',
      name: '',
      departmentBoss: '',
    },
  });

  const onSubmit = (data: ICreateDepartmentInput) => {
    setIsButtonDisabled(true);
    mutate({
      data: {
        // Usa 'data' en lugar de 'input'
        name: data.name,
        areaKey: data.areaKey,
        departmentBoss: data.departmentBoss, // Enviamos el ID del jefe de departamento
      },
    });
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
        className="p-button-rounded p-button-success p-button-raised mt-2"
        icon="pi pi-check"
        onClick={handleSubmit(onSubmit)}
        outlined
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
            <b>Información del Departamento</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <label htmlFor="name">{t('global.dictionary.departmentName')}*</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: t('global.forms.validation.departmentName') as string }}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <InputText
                  id="name"
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
                {fieldState.invalid && (
                  <small className="p-error">{fieldState.error?.message}</small>
                )}
              </span>
            )}
          />
        </div>

        {/* Campo para la clave del área */}
        <div className="field">
          <label htmlFor="areaKey">{t('global.dictionary.areaKey')}*</label>
          <Controller
            name="areaKey"
            control={control}
            rules={{ required: t('global.forms.validation.areaKeyField') as string }}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <InputText
                  id="areaKey"
                  maxLength={6}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
                {fieldState.invalid && (
                  <small className="p-error">{fieldState.error?.message}</small>
                )}
              </span>
            )}
          />
        </div>

        {/* Selector de jefe de departamento */}
        <div className="field">
          <label htmlFor="departmentBoss">{t('global.dictionary.departmentBoss')}*</label>
          <Controller
            name="departmentBoss"
            control={control}
            rules={{ required: t('global.forms.validation.requiredField') as string }}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <select
                  id="departmentBoss"
                  {...field}
                  value={field.value || ''} // Convierte `null` o `undefined` a `""`
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                >
                  <option value="">{t('global.forms.placeholders.selectDepartmentBoss')}</option>
                  {usersData?.getAllUsers.docs.map((user) => (
                    <option key={user._id} value={user._id}>
                      {`${user.firstName} ${user.lastName}`}
                    </option>
                  ))}
                </select>
                {fieldState.invalid && (
                  <small className="p-error">{fieldState.error?.message}</small>
                )}
              </span>
            )}
          />
        </div>
      </form>
    </Dialog>
  );
}
