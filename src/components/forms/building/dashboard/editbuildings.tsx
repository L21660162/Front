import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IBuilding,
  IUpdateBuildingInput,
  useUpdateBuildingMutation,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type BuildingFormProps = {
  headerTitle: string;
  building: IBuilding;
};

type BuildingFormPropsAndDialogStore = BuildingFormProps & DialogStore;

export default function EditbuildingDialogForm({
  headerTitle,
  visible,
  setVisible,
  building,
}: PropsWithChildren<BuildingFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/building' });
  const toast = useRef<Toast>(null);

  const { mutate } = useUpdateBuildingMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.buildingEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/building' });
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
    watch,
    setValue,
  } = useForm<IUpdateBuildingInput>({
    defaultValues: {
      _id: building._id || '',
      name: building.name || '', // Usa un valor predeterminado si es null
      letter: building.letter || '', // Similar aquí
    },
  });

  const onSubmit = (data: IUpdateBuildingInput) => {
    setIsButtonDisabld(true);

    if (!data._id) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar, falta el ID.',
        life: 5000,
      });
      setIsButtonDisabld(false);
      return;
    }

    mutate({
      data: {
        _id: data._id, // ✅ Se agrega el ID
        letter: data.letter,
        name: data.name,
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
      header={t('module.building.dashboard.dialog.edit.header')}
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
            <b>Información del Edificio</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="name"
              control={control}
              rules={{
                // required: t('global.forms.validation.buildingName') as string,
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.buildingName') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  // defaultValue={buildingData?.getbuildingById.name}
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
              {t('global.dictionary.buildingName')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="letter"
              control={control}
              rules={{
                required: t('global.forms.validation.buildingAbbreviation') as string,
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
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
              {t('global.dictionary.buildingAbbreviation')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
