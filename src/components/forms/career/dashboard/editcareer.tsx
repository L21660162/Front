import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import { IUpdateCareerInput, useUpdateCareerMutation, ICareer } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type CareerFormProps = {
  headerTitle: string;
  career: ICareer;
};

type CareerFormPropsAndDialogStore = CareerFormProps & DialogStore;

export default function EditCareerDialogForm({
  headerTitle,
  visible,
  setVisible,
  career,
}: PropsWithChildren<CareerFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const toast = useRef<Toast>(null);

  const { mutate } = useUpdateCareerMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.careerEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/career' });
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
  } = useForm<IUpdateCareerInput>({
    defaultValues: {
      _id: career._id,
      credits: career.credits,
      description: career.description,
      duration: career.duration,
      isCertified: career.isCertified,
      name: career.name,
      abbreviationCareer: career.abbreviationCareer,
    },
  });

  const onSubmit: SubmitHandler<IUpdateCareerInput> = (data: IUpdateCareerInput) => {
    setIsButtonDisabld(true);
    if (data.credits !== null) {
      data.credits = parseFloat(data.credits);
    }

    data.credits = parseFloat(data.credits);
    reset();
    mutate({ data });
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
            <b>Información de la Carrera</b>
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
                // required: t('global.forms.validation.careerName') as string,
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.careerName') as string),
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  // defaultValue={careerData?.getCareerById.name}
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>
              {t('global.dictionary.careerName')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="abbreviationCareer"
              control={control}
              rules={{
                required: t('global.forms.validation.abbreviationCareer') as string,
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
              {t('global.dictionary.abbreviationCareer')}*
            </label>
          </span>
          {errors.name && <small className="p-error">{errors.name?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="description"
              control={control}
              rules={{
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.careerDescription') as string),
              }}
              render={({ field, fieldState }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  rows={3}
                  cols={20}
                  autoResize
                />
              )}
            />
            <label
              htmlFor="description"
              className={classNames({ 'p-error': !!errors.description })}
            >
              {t('global.dictionary.careerDescription')}*
            </label>
          </span>
          {errors.description && <small className="p-error">{errors.description?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-hashtag" />
            <Controller
              name="credits"
              control={control}
              rules={{
                validate: (value) =>
                  value !== null || (t('global.forms.validation.credits') as string),
                // required: t('global.forms.validation.credits') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  type="number"
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  // defaultValue={careerData?.getCareerById.credits}
                />
              )}
            />
            <label htmlFor="credits" className={classNames({ 'p-error': !!errors.credits })}>
              {t('global.dictionary.credits')}*
            </label>
          </span>
          {errors.credits && <small className="p-error">{errors.credits?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-calendar" />
            <Controller
              name="duration"
              control={control}
              rules={{
                validate: (value) =>
                  value !== '' || (t('global.forms.validation.duration') as string),
                // required: t('global.forms.validation.duration') as string
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  // defaultValue={careerData?.getCareerById.duration}
                />
              )}
            />
            <label htmlFor="duration" className={classNames({ 'p-error': errors.duration })}>
              {t('global.dictionary.duration')}*
            </label>
          </span>
          {errors.duration && <small className="p-error">{errors.duration?.message}</small>}
        </div>

        <div className="field">
          <span className="field-radiobutton">
            <Controller
              name="isCertified"
              control={control}
              rules={{
                validate: (value) =>
                  value !== null || (t('global.forms.validation.careerDescription') as string),
                // required: t('global.forms.validation.isCertified') as string
              }}
              // defaultValue={careerData?.getCareerById.isCertified}
              render={({ field }) => (
                <div>
                  <label htmlFor={field.name}>{t('global.dictionary.isCertified')}</label>
                  <br />
                  <div className="field-radiobutton">
                    <RadioButton
                      id={`${field.name}-true`}
                      type="checkbox"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    <label htmlFor={`${field.name}-true`}>Sí</label>
                  </div>
                  <div className="field-radiobutton">
                    <RadioButton
                      id={`${field.name}-false`}
                      type="checkbox"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                    />
                    <label htmlFor={`${field.name}-false`}>No</label>
                  </div>
                </div>
              )}
            />
          </span>
          {errors.isCertified && <small className="p-error">{errors.isCertified?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
