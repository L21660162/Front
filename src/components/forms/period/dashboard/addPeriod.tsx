import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Query } from '@tanstack/react-query';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
IPeriod,
IUpsertPeriodInput,
IGetAllPeriodsQuery,
useCreatePeriodMutation,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { Calendar } from 'primereact/calendar';

type periodFormProps = {
headerTitle: string;
};
type periodFormPropsAndDialogStore = periodFormProps & DialogStore;

export default function periodDialogForm({
headerTitle,
visible,
setVisible,
}: PropsWithChildren<periodFormPropsAndDialogStore>) {
const { t } = useTranslation('common');
const navigate = useNavigate({ from: '/settings/period' });
const toast = useRef<Toast>(null);

const { mutate } = useCreatePeriodMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
    toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.periodCreateSuccess'),
    });

    setTimeout(() => {
        navigate({ to: '/settings/period' });
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

const [isButtonDisablesed, setIsButtonDisabld] = useState(false);



const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
} = useForm<IUpsertPeriodInput>({
    defaultValues: {
    finalDate: '',
    name: '',
    largeIdentifier: '',
    shortIdentifier: '',
    startDate: '',
    },
});

  const onSubmit = (data: IUpsertPeriodInput) => {
    setIsButtonDisabld(true);
    mutate({
      data: {
        finalDate: data.finalDate, // Asegúrate de que sea un ID válido
        name: data.name,
        largeIdentifier: data.largeIdentifier,
        shortIdentifier: data.shortIdentifier,
        startDate: data.startDate,
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
        disabled={isButtonDisablesed}
        onClick={handleSubmit(onSubmit)}
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
            <b>{t('global.dictionary.period')}</b> <br />
        </label>
        </div>
        <hr />
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
{/* Campo para Fecha de Inicio (startDate) */}
<div className="field">
  <span className="p-float-label">
    <Controller
      name="startDate"
      control={control}
      rules={{
        required: t('global.forms.validation.requiredField') as string, // Clave de traducción correcta
      }}
      render={({ field, fieldState }) => (
        <Calendar
          id="startDate"
          {...field}
          dateFormat="dd/mm/yy"
          showIcon
          className={classNames('w-full', { 'p-invalid': fieldState.invalid })}
          placeholder="Seleccione la fecha inicial"
          value={field.value ? new Date(field.value) : null}
        />
      )}
    />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
            {t('global.dictionary.startDate')}*
            </label>
        </span>
        {errors.name && <small className="p-error">{errors.name?.message}</small>}
</div>

{/* Campo para Fecha Final (finalDate) */}
<div className="field">
  <span className="p-float-label">
    <Controller
      name="finalDate"
      control={control}
      rules={{
        required: t('global.forms.validation.requiredField') as string,
      }}
      render={({ field, fieldState }) => (
        <Calendar
          id="finalDate"
          {...field}
          dateFormat="dd/mm/yy"
          showIcon
          className={classNames('w-full', { 'p-error': fieldState.invalid })}
          placeholder="Seleccione la fecha final"
          value={field.value ? new Date(field.value) : null}
        />
      )}
    />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
            {t('global.dictionary.endDate')}*
            </label>
        </span>
        {errors.name && <small className="p-error">{errors.name?.message}</small>}
</div>
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
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
            {t('global.dictionary.largeIdentifier')}*
            </label>
        </span>
        {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

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
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
            {t('global.dictionary.shortIdentifier')}*
            </label>
        </span>
        {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

    </form>
    </Dialog>
);
}