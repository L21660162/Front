import React, { PropsWithChildren, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import { ISignUpInput, useSignUpMutation } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type TestFormProps = {
  headerTitle: string;
};
type TestFormPropsAndDialogStore = TestFormProps & DialogStore;

export default function ExampleDialogForm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<TestFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/auth/signup' });
  const toast = useRef<Toast>(null);

  const passwordHeader = <h6>{t('global.forms.validation.pickPassword')}</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">{t('global.forms.validation.suggestion')}</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>{t('global.forms.validation.lowercase')}</li>
        <li>{t('global.forms.validation.uppercase')}</li>
        <li>{t('global.forms.validation.numeric')}</li>
        <li>{t('global.forms.validation.length')}</li>
      </ul>
    </>
  );

  const { mutate, isSuccess } = useSignUpMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.signUpSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/auth/signin' });
      }, 5000);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
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
  } = useForm<ISignUpInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ISignUpInput> = (data: ISignUpInput) => mutate({ data });

  const footerContent = (
    <div>
      <Button
        className="p-button-text p-button-danger p-button-outlined p-button-rounded"
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
      />
      <Button
        type="submit"
        label={t('global.forms.submit') as string}
        className="p-button-rounded p-button-raised mt-2"
        onClick={handleSubmit(onSubmit)}
        disabled={isSuccess}
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
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-user" />
            <Controller
              name="firstName"
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
            <label htmlFor="firstName" className={classNames({ 'p-error': !!errors.firstName })}>
              {t('global.dictionary.firstName')}*
            </label>
          </span>
          {errors.firstName && <small className="p-error">{errors.firstName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-user" />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: t('global.forms.validation.lastName') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="lastName" className={classNames({ 'p-error': !!errors.lastName })}>
              {t('global.dictionary.lastName')}*
            </label>
          </span>
          {errors.lastName && <small className="p-error">{errors.lastName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                required: t('global.forms.validation.email') as string,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t('global.forms.validation.emailRegex'),
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>
              {t('global.dictionary.email')}*
            </label>
          </span>
          {errors.email && <small className="p-error">{errors.email?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="password"
              control={control}
              rules={{ required: t('global.forms.validation.password') as string }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  header={passwordHeader}
                  footer={passwordFooter}
                />
              )}
            />
            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>
              {t('global.dictionary.password')}*
            </label>
          </span>
          {errors.password && <small className="p-error">{errors.password?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
