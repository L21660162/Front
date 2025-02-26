import React, { ReactNode, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Password } from 'primereact/password';
import type { Page } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { IPasswordResetInput, usePasswordResetMutation } from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { useGlobalAppStore } from '../../../store/global/globalAppStore';
import logo from '../../../../layout/images/logo-sepret.png';

function PasswordConfirmPage(): Page {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation('common');
  const contextPath = '';
  const { layoutConfig } = useGlobalAppStore();
  const navigate = useNavigate({ from: '/auth/signin' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  const { mutate } = usePasswordResetMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.passwordConfirmSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/auth/signin' });
        window.location.reload();
      }, 200);
      setIsButtonDisabled(false);
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

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPasswordResetInput>({
    defaultValues: {
      passwordRecoveryId: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IPasswordResetInput> = (data: IPasswordResetInput) => {
    setIsButtonDisabled(true);
    data.passwordRecoveryId = token;
    mutate({ data });
  };

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />

      <div className="flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
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
                {t('global.dictionary.passwordRecovery')}
              </div>
              <span className="text-600 font-medium">{t('passwordConfirm.message')}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                        promptLabel="Contraseña"
                        weakLabel="Débil"
                        mediumLabel="Medio"
                        strongLabel="Fuerte"
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
              <Button
                type="submit"
                label={t('global.forms.submit') as string}
                className="mt-2"
                disabled={isButtonDisabled}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

PasswordConfirmPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      {page}
      {/* <AppConfig /> */}
    </>
  );
};

export default PasswordConfirmPage;
