import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IGroup,
  IUpdateGroupInput,
  useGetAllCareersQuery,
  useGetAllPeriodsQuery,
  useUpdateGroupMutation,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type GroupFormProps = {
  headerTitle: string;
  Group: IGroup;
};

type GroupFormPropsAndDialogStore = GroupFormProps & DialogStore;

export default function EditGroupDialogForm({
  headerTitle,
  visible,
  setVisible,
  Group,
}: PropsWithChildren<GroupFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/group' });
  const toast = useRef<Toast>(null);

  // Query para obtener todas las carreras
  const { data: careersData, isLoading: careersLoading } = useGetAllCareersQuery(GRAPHQL_CLIENT);

  // Query para obtener todos los períodos
  const { data: periodsData } = useGetAllPeriodsQuery(GRAPHQL_CLIENT);

  const { mutate } = useUpdateGroupMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.GroupEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/group' });
        window.location.reload();
      }, 200);
      setIsButtonDisabld(false);
    },
    onError: (errorResponse: IApiError) => {
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
    setValue,
  } = useForm<IUpdateGroupInput>({
    defaultValues: {
      career: '',
      identifier: '',
      semester: '',
    },
  });

  // Inicializar el formulario con los datos del grupo
  useEffect(() => {
    if (Group) {
      setValue('career', Group.career || '');
      setValue('identifier', Group.identifier || '');
      setValue('semester', Group.semester || '');
    }
  }, [Group, setValue]);

  const onSubmit = (data: IUpdateGroupInput) => {
    setIsButtonDisabld(true);

    // Convertir semester a número
    const semesterAsNumber = Number(data.semester);

    mutate({
      data: {
        _id: Group._id,
        career: data.career,
        identifier: data.identifier,
        semester: String(data.semester), // Convertir a string
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

  // Mapear las carreras para el Dropdown
  const careerOptions =
    careersData?.getAllCareers?.docs?.map((career) => ({
      label: career.name,
      value: career._id,
    })) || [];

  // Mapear los períodos para el Dropdown
  const periodOptions =
    periodsData?.getAllPeriods?.docs?.map((period) => ({
      label: period.name,
      value: period._id,
    })) || [];

  return (
    <Dialog
      header={headerTitle}
      visible={visible}
      style={{ width: '35rem' }}
      onHide={() => {
        setVisible(false);
      }}
      footer={footerContent}
    >
      <Toast ref={toast} />
      <form className="p-fluid">
        <div className="label">
          <label htmlFor="contact">
            <b>Información del Grupo</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="career"
              control={control}
              rules={{
                required: t('global.forms.validation.groupName') as string,
              }}
              render={({ field, fieldState }) =>
                careersLoading ? (
                  <div className="flex align-items-center">
                    <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    <span className="ml-2">Cargando carreras...</span>
                  </div>
                ) : (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    onBlur={field.onBlur}
                    options={careerOptions}
                    optionLabel="label"
                    optionValue="value"
                    placeholder={t('global.dictionary.selectCareer') as string}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )
              }
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
                required: t('global.dictionary.tIndentifier') as string,
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
              {t('global.dictionary.tIndentifier')}*
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
                required: t('global.dictionary.semester') as string,
                validate: (value) => !isNaN(Number(value)) || 'El semestre debe ser un número',
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
              {t('global.dictionary.semester')}*
            </label>
          </span>
          {errors.semester && <small className="p-error">{errors.semester?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
