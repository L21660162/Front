import React, { ReactNode, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import type { Page } from '../../../../types/types';
import AppConfig from '../../../../layout/AppConfig';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { IPasswordRecoveryInput, usePasswordRecoveryMutation } from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { useGlobalAppStore } from '../../../store/global/globalAppStore';

function PasswordRecoveryPage(): Page {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation('common');
  const contextPath = '';
  const { layoutConfig } = useGlobalAppStore();

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  const { mutate } = usePasswordRecoveryMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.signUpSuccess'),
      });
    },
    onError: (errorResponse: IApiError) => {
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
  } = useForm<IPasswordRecoveryInput>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<IPasswordRecoveryInput> = (data: IPasswordRecoveryInput) =>
    mutate({ data });

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />

      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={`${contextPath}/layout/images/logo-${
            layoutConfig.colorScheme === 'light' ? 'dark' : 'white'
          }.svg`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
          }}
        >
          <div className="w-full surface-card py-5 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                {t('global.dictionary.welcome')}
              </div>
              <span className="text-600 font-medium">{t('signUp.message')}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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

              <Button type="submit" label={t('global.forms.submit') as string} className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

PasswordRecoveryPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      {page}
      <AppConfig />
    </>
  );
};

export default PasswordRecoveryPage;
