import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  IUpsertClassroomInput,
  useCreateClassroomMutation,
  useGetAllBuildingsQuery,
  IBuilding,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type ClassroomFormProps = {
  headerTitle: string;
};
type ClassroomFormPropsAndDialogStore = ClassroomFormProps & DialogStore;

export default function ClassroomDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<ClassroomFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/classroom' });
  const toast = useRef<Toast>(null);

  const { data: buildingData, isLoading, error } = useGetAllBuildingsQuery(GRAPHQL_CLIENT);

  const buildingOptions =
    buildingData?.getAllBuildings.docs.map((building) => ({
      label: building.name, // Nombre completo como label
      value: building._id, // ID del usuario como value
    })) || [];

  const { mutate } = useCreateClassroomMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.ClassroomCreateSuccess'),
      });
      setTimeout(() => {
        navigate({ to: '/settings/classroom' });
        window.location.reload();
      }, 50);
      setIsButtonDisabled(false);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
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
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpsertClassroomInput>({
    defaultValues: {
      building: '',
      identifier: '',
    },
  });

  const onSubmit: SubmitHandler<IUpsertClassroomInput> = (data) => {
    setIsButtonDisabled(true);
    mutate({
      data: {
        building: data.building,
        identifier: data.identifier,
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

  if (isLoading) {
    return <p>{t('global.forms.loadingBuildings')}</p>;
  }

  if (error) {
    return <p>{t('global.forms.errorLoadingBuildings')}</p>;
  }

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
            <b>Información del Aula</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="identifier"
              control={control}
              rules={{
                required: t('global.forms.validation.ClassroomIdentifier') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="identifier" className={classNames({ 'p-error': !!errors.identifier })}>
              {t('global.dictionary.ClassroomIdentifier')}*
            </label>
          </span>
          {errors.identifier && <small className="p-error">{errors.identifier?.message}</small>}
        </div>

        {/* Dropdown para seleccionar un edificio */}
        <div className="field">
          <label htmlFor="building">{t('global.dictionary.Building')}</label>
          <Controller
            name="building"
            control={control}
            rules={{
              required: t('global.forms.validation.Building') as string,
            }}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                {...field}
                value={field.value || null}
                options={buildingOptions}
                optionLabel="label"
                optionValue="value"
                onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                placeholder={t('global.forms.placeholders.selectPlaceholder') ?? ''} // Coalescencia nula para garantizar que sea una cadena
                className={classNames({ 'p-invalid': fieldState.invalid })}
              />
            )}
          />
          {errors.building && <small className="p-error">{errors.building.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
