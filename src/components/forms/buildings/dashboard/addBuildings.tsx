import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import { IUpsertBuildingInput, useCreateBuildingMutation } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type BuildingFormProps = {
  headerTitle: string;
};
type BuildingFormPropsAndDialogStore = BuildingFormProps & DialogStore;

export default function buildingDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<BuildingFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/building' });
  const toast = useRef<Toast>(null);

  const { mutate } = useCreateBuildingMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.buildingCreateSuccess'),
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
  } = useForm<IUpsertBuildingInput>({
    defaultValues: {
      letter: '',
      name: '',
    },
  });

  const onSubmit = (data: IUpsertBuildingInput) => {
    setIsButtonDisabld(true);
    mutate({
      data: {
        letter: data.letter, // Asegúrate de que sea un ID válido
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
        label={t('global.forms.submit') as string}
        className="p-button-rounded p-button-success p-button-raised mt-2"
        icon="pi pi-check"
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
      onHide={() => setVisible(false)}
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
                required: t('global.forms.validation.buildingName') as string,
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
                  maxLength={1}
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
