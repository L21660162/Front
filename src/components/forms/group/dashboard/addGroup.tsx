import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'; // Importa Dropdown
import { ProgressSpinner } from 'primereact/progressspinner'; // Importa ProgressSpinner
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  useCreateGroupMutation,
  IUpsertGroupInput,
  useGetAllPeriodsQuery, // Importa el query para obtener los períodos
  useGetAllCareersQuery, // Importa el query para obtener las carreras
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type groupFormProps = {
  headerTitle: string;
};

type groupFormPropsAndDialogStore = groupFormProps & DialogStore;

export default function groupDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<groupFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/group' });
  const toast = useRef<Toast>(null);

  // Query para obtener todos los períodos
  const { data: periodsData, isLoading: periodsLoading, error: periodsError } = useGetAllPeriodsQuery(GRAPHQL_CLIENT);

  // Query para obtener todas las carreras
  const { data: careersData, isLoading: careersLoading, error: careersError } = useGetAllCareersQuery(GRAPHQL_CLIENT);

  const { mutate } = useCreateGroupMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.groupCreateSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/group' });
        window.location.reload();
      }, 200);
      setIsButtonDisabld(false);
    },
    onError: (errorResponse: IApiError) => {
      console.error('Error creating group:', errorResponse);
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
  } = useForm<IUpsertGroupInput>({
    defaultValues: {
      career: '', // Asegúrate de que este campo esté incluido si es requerido
      identifier: '',
      semester: '',
      period: '', // Asegúrate de que este campo esté incluido si es requerido
      updatedBy: undefined, // Este campo es opcional
    },
  });

  const onSubmit = (data: IUpsertGroupInput) => {
    setIsButtonDisabld(true);
    mutate({
      data: {
        career: data.career, // Asegúrate de que sea un ID válido
        identifier: data.identifier,
        semester: data.semester,
        period: data.period,
        updatedBy: data.updatedBy, // Este campo es opcional
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

  // Mapear los períodos para el Dropdown
  const periodOptions = periodsData?.getAllPeriods?.docs?.map((period) => ({
    label: period.name, // Nombre del período
    value: period._id,  // Usa _id en lugar de id
  })) || [];

  // Mapear las carreras para el Dropdown
  const careerOptions = careersData?.getAllCareers?.docs?.map((career) => ({
    label: career.name, // Nombre de la carrera
    value: career._id,  // ID de la carrera
  })) || [];

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
            <b>{t('global.dictionary.group')}</b> <br />
          </label>
        </div>
        <hr />
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="career"
              control={control}
              rules={{
                required: t('global.forms.validation.groupName') as string,
              }}
              render={({ field, fieldState }) => (
                careersLoading ? (
                  <div className="flex align-items-center">
                    <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    <span className="ml-2">Cargando carreras...</span>
                  </div>
                ) : (
                  <Dropdown
                    id={field.name}
                    value={field.value} // Valor manejado por el Controller
                    onChange={(e) => field.onChange(e.value)} // Actualiza el valor seleccionado
                    onBlur={field.onBlur} // Maneja el evento onBlur
                    options={careerOptions} // Opciones de carreras
                    optionLabel="label" // Propiedad que se muestra en la lista
                    optionValue="value" // Propiedad que se usa como valor
                    placeholder={t('global.dictionary.selectCareer') as string}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )
              )}
            />
            <label htmlFor="career" className={classNames({ 'p-error': !!errors.career })}>
              {t('global.dictionary.career')}*
            </label>
          </span>
          {errors.career && <small className="p-error">{errors.career?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="identifier"
              control={control}
              rules={{
                required: t('global.forms.validation.abbreviationgroup') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  maxLength={5}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="identifier" className={classNames({ 'p-error': !!errors.identifier })}>
              {t('global.dictionary.abbreviationgroup')}*
            </label>
          </span>
          {errors.identifier && <small className="p-error">{errors.identifier?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="semester"
              control={control}
              rules={{
                required: t('global.forms.validation.semestergroup') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  maxLength={5}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="semester" className={classNames({ 'p-error': !!errors.semester })}>
              {t('global.dictionary.semestergroup')}*
            </label>
          </span>
          {errors.semester && <small className="p-error">{errors.semester?.message}</small>}
        </div>

        {/* Campo de selección de período */}
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="period"
              control={control}
              rules={{
                required: t('global.forms.validation.periodgroup') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  value={field.value} // Valor manejado por el Controller
                  onChange={(e) => field.onChange(e.value)} // Actualiza el valor seleccionado
                  onBlur={field.onBlur} // Maneja el evento onBlur
                  options={periodOptions}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={t('global.dictionary.selectPeriod') as string}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="period" className={classNames({ 'p-error': !!errors.period })}>
              {t('global.dictionary.periodgroup')}*
            </label>
          </span>
          {errors.period && <small className="p-error">{errors.period?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}