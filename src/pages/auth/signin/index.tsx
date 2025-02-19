import React, { ReactNode, useRef } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Page } from '../../../../types/types';
import AppConfig from '../../../../layout/AppConfig';
import { ISignInInput, ISignInMutation, useSignInMutation } from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { getActions, useRememberMe } from '../../../store/auth/store';
import { useGlobalAppStore } from '../../../store/global/globalAppStore';
import logo from '../../../../layout/images/logo-sepret.png';

const { setAccessToken, setRefreshToken, setRememberMe } = getActions();

function SignInPage(): Page {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation('common');
  const contextPath = '';
  const { layoutConfig } = useGlobalAppStore();
  const navigate = useNavigate({ from: '/auth/signin' });
  const rememberMe = useRememberMe();
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  const { mutate } = useSignInMutation<IApiError>(GRAPHQL_CLIENT, {
    mutationKey: ['signIn'],
    onSuccess: ({ signIn }: ISignInMutation) => {
      const { accessToken, refreshToken } = signIn;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    onError: (errorResponse: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: errorResponse.response.errors[0].message,
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignInInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ISignInInput> = (data: ISignInInput) => mutate({ data });

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />

      <div className="flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="ITMH" className="mb-4 w-9rem flex-shrink-0" />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                {t('global.dictionary.welcome')}
              </div>
              <span className="text-600 font-medium">{t('signIn.message')}</span>
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
                        feedback={false}
                        className={classNames({ 'p-invalid': fieldState.invalid })}
                      />
                    )}
                  />
                  <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>
                    {t('global.dictionary.password')}*
                  </label>
                </span>
                {errors.password && <small className="p-error">{errors.password?.message}</small>}
              </div>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.checked ?? false)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberme1">{t('signIn.rememberMe')}</label>
                </div>
                <Link
                  to="/auth/passwordrecovery"
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: 'var(--primary-color)' }}
                >
                  {t('signIn.forgotPassword')}
                </Link>
              </div>

              <Button
                label={t('signIn.signIn') as string}
                className="w-full p-3 text-xl"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      {page}
      <AppConfig simple />
    </>
  );
};

export default SignInPage;
