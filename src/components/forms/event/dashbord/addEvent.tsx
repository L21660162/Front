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
import { ICreateCareerInput, useCreateCareerMutation } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type EventFormProps = {
  headerTitle: string;
};
type EventFormPropsAndDialogStore = EventFormProps & DialogStore;

export default function EventDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<EventFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const toast = useRef<Toast>(null);
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);

  const { mutate } = useCreateCareerMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.careerCreateSuccess'),
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

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateCareerInput>({
    defaultValues: {
      credits: 0,
      description: '',
      duration: '',
      isCertified: false,
      name: '',
      abbreviationCareer: '',
    },
  });

  const onSubmit: SubmitHandler<ICreateCareerInput> = (data: ICreateCareerInput) => {
    setIsButtonDisabld(true);
    data.credits = parseFloat(data.credits);
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
            <b>{t('global.dictionary.career')}</b> <br />
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
                required: t('global.forms.validation.careerName') as string,
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
                required: t('global.forms.validation.careerDescription') as string,
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
                required: t('global.forms.validation.credits') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  type="number"
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
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
              rules={{ required: t('global.forms.validation.duration') as string }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
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
              rules={{ required: t('global.forms.validation.isCertified') as string }}
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
