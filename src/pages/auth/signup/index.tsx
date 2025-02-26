import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { ReactNode, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppConfig from '../../../../layout/AppConfig';
import { IApiError } from '../../../../types/apierror';
import type { Page } from '../../../../types/types';
import { ISignUpInput, useSignUpMutation } from '../../../graphql/graphql';
import { useGlobalAppStore } from '../../../store/global/globalAppStore';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';

function SignUpPage(): Page {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/auth/signup' });
  const contextPath = '';
  const { layoutConfig } = useGlobalAppStore();

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
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
                  <label
                    htmlFor="firstName"
                    className={classNames({ 'p-error': !!errors.firstName })}
                  >
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
                  <label
                    htmlFor="lastName"
                    className={classNames({ 'p-error': !!errors.lastName })}
                  >
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

              <Button
                type="submit"
                label={t('global.forms.submit') as string}
                className="mt-2"
                disabled={isSuccess}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      {page}
      <AppConfig />
    </>
  );
};

export default SignUpPage;
