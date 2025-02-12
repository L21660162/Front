import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar'; // Importar Calendar para manejar fechas
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  IUpdatePeriodInput,
  useUpdatePeriodMutation,
  IPeriod,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type PeriodFormProps = {
  headerTitle: string;
  period: IPeriod;
};

type PeriodFormPropsAndDialogStore = PeriodFormProps & DialogStore;

export default function EditPeriodDialogForm({
  headerTitle,
  visible,
  setVisible,
  period,
}: PropsWithChildren<PeriodFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/period' });
  const toast = useRef<Toast>(null);

  const { mutate } = useUpdatePeriodMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.periodEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/period' });
        window.location.reload();
      }, 200);
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
  } = useForm<IUpdatePeriodInput>({
    defaultValues: {
      _id: period._id,
      name: period.name || '', // Usa un valor predeterminado si es null
      largeIdentifier: period.largeIdentifier || '',
      shortIdentifier: period.shortIdentifier || '',
      startDate: period.startDate ? new Date(period.startDate) : null, // Convertir a Date si es necesario
      finalDate: period.finalDate ? new Date(period.finalDate) : null, // Convertir a Date si es necesario
    },
  });

  const onSubmit = (data: IUpdatePeriodInput) => {
    setIsButtonDisabled(true);
    mutate({
      data: {
        _id: period._id,
        name: data.name,
        largeIdentifier: data.largeIdentifier,
        shortIdentifier: data.shortIdentifier,
        startDate: data.startDate, // Asegúrate de que sea un string o Date válido
        finalDate: data.finalDate, // Asegúrate de que sea un string o Date válido
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
        className="p-button-rounded p-button-raised mt-2"
        disabled={isButtonDisabled}
        onClick={handleSubmit(onSubmit)}
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
      <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="label">
          <label htmlFor="contact">
            <b>{t('global.dictionary.period')}</b> <br />
          </label>
        </div>
        <hr />

        {/* Campo para el nombre del período */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="name"
              control={control}
              rules={{
                required: t('global.forms.validation.periodName') as string,
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
              {t('global.dictionary.periodName')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

        {/* Campo para el identificador largo */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="largeIdentifier"
              control={control}
              rules={{
                required: t('global.forms.validation.largeIdentifier') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="largeIdentifier" className={classNames({ 'p-error': !!errors.largeIdentifier })}>
              {t('global.dictionary.largeIdentifier')}*
            </label>
          </span>
          {errors.largeIdentifier && <small className="p-error">{errors.largeIdentifier?.message}</small>}
        </div>

        {/* Campo para el identificador corto */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="shortIdentifier"
              control={control}
              rules={{
                required: t('global.forms.validation.shortIdentifier') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="shortIdentifier" className={classNames({ 'p-error': !!errors.shortIdentifier })}>
              {t('global.dictionary.shortIdentifier')}*
            </label>
          </span>
          {errors.shortIdentifier && <small className="p-error">{errors.shortIdentifier?.message}</small>}
        </div>

        {/* Campo para la fecha de inicio */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-calendar" />
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: t('global.forms.validation.startDate') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="startDate" className={classNames({ 'p-error': !!errors.startDate })}>
              {t('global.dictionary.startDate')}*
            </label>
          </span>
          {errors.startDate && (
  <small className="p-error">
    {errors.startDate.message?.toString()} {/* Convertir a string */}
  </small>
      )}
        </div>

        {/* Campo para la fecha final */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-calendar" />
            <Controller
              name="finalDate"
              control={control}
              rules={{
                required: t('global.forms.validation.endDate') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="finalDate" className={classNames({ 'p-error': !!errors.finalDate })}>
              {t('global.dictionary.endDate')}*
            </label>
          </span>
          {errors.startDate && (
  <small className="p-error">
    {errors.startDate.message?.toString()} {/* Convertir a string */}
  </small>
)}
        </div>
      </form>
    </Dialog>
  );
}