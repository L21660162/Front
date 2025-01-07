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
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import { IBuilding, useUpsertUserMutation } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type AddBuildingDialogFormProps = {
  headerTitle: string;
};
type AddBuildingDialogFormPropsAndDialogStore = AddBuildingDialogFormProps & DialogStore;

export default function AddBuildingDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<AddBuildingDialogFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/user/dashboard' });
  const toast = useRef<Toast>(null);

  const { mutate, isSuccess } = useUpsertUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.BuildingCreateSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/user/dashboard' });
        setVisible(false);
      }, 5000);
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

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IBuilding>({
    defaultValues: {
      name: '',
      letter: '',
    },
  });

  const onSubmit: SubmitHandler<IBuilding> = (data: IBuilding) => {
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
              name="name"
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
            <label htmlFor="firstName" className={classNames({ 'p-error': !!errors.name })}>
              {t('global.dictionary.firstName')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-bars" />
            <Controller
              letter="letter"
              control={control}
              rules={{
                required: t('global.forms.validation.letter') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="letter" className={classNames({ 'p-error': !!errors.letter })}>
              {t('global.dictionary.lastName')}*
            </label>
          </span>
          {errors.letter && <small className="p-error">{errors.letter?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
