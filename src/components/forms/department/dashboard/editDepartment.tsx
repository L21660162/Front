import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  IUpdateDepartmentInput,
  useUpdateDepartmentMutation,
  IDepartment,
  useGetAllUsersQuery,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type DepartmentFormProps = {
  headerTitle: string;
  department: IDepartment;
};

type DepartmentFormPropsAndDialogStore = DepartmentFormProps & DialogStore;

export default function EditDepartmentDialogForm({
  headerTitle,
  visible,
  setVisible,
  department,
}: PropsWithChildren<DepartmentFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);
  const formRef = useRef<HTMLFormElement>(null); // Referencia al formulario

  // Obtener la lista de usuarios
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery(GRAPHQL_CLIENT);

  // Formatear los usuarios para el Dropdown
  const usersOptions = usersData?.getAllUsers.docs.map((user) => ({
    label: `${user.firstName} ${user.lastName}`, // Nombre completo como label
    value: user._id, // ID del usuario como value
  })) || [];

  // Mutación para actualizar el departamento
  const { mutate } = useUpdateDepartmentMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.departmentEditSuccess'),
      });

      setTimeout(() => {
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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUpdateDepartmentInput>({
    defaultValues: {
      _id: department._id,
      departmentBoss: department.departmentBoss || null,
      name: department.name,
      areaKey: department.areaKey,
    },
  });

  const onSubmit: SubmitHandler<IUpdateDepartmentInput> = (data) => {
    console.log('Datos enviados:', data); // Depuración
    setIsButtonDisabled(true);
    mutate({ data }); // Envuelve los datos en un objeto con propiedad 'data'
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
        type="button" // Cambiado a type="button"
        label={t('global.forms.submit') as string}
        className="p-button-rounded p-button-raised mt-2"
        disabled={isButtonDisabled}
        onClick={() => formRef.current?.requestSubmit()} // Enviar el formulario manualmente
      />
    </div>
  );

  return (
    <Dialog
    header={t('module.department.dashboard.dialog.edit.header')}
      visible={visible}
      style={{ width: '35rem' }}
      onHide={() => {
        setVisible(false);
        reset();
      }}
      footer={footerContent}
    >
      <Toast ref={toast} />
      <form
        ref={formRef} // Asignar la referencia al formulario
        className="p-fluid"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Campo Name */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="name"
              control={control}
              rules={{
                required: t('global.forms.validation.required') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
              {t('global.dictionary.departmentName')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name.message}</small>}
        </div>

        {/* Campo AreaKey */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="areaKey"
              control={control}
              rules={{
                required: t('global.forms.validation.required') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="areaKey" className={classNames({ 'p-error': !!errors.areaKey })}>
              {t('global.dictionary.areaKey')}*
            </label>
          </span>
          {errors.areaKey && <small className="p-error">{errors.areaKey.message}</small>}
        </div>

        {/* Campo DepartmentBoss (Dropdown) */}
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="departmentBoss"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  value={field.value || null}
                  options={usersOptions}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={t('form.placeholders.selectBoss') as string}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  disabled={usersLoading}
                />
              )}
            />
            <label htmlFor="departmentBoss" className={classNames({ 'p-error': !!errors.departmentBoss })}>
              {t('global.dictionary.departmentBoss')}
            </label>
          </span>
          {errors.departmentBoss && <small className="p-error">{errors.departmentBoss.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}