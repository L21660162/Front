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
import { IApiError } from '../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { ICreateCareerInput, ICreateFileCommentInput, useCreateCareerMutation, useCreateFileCommentMutation } from '../../../graphql/graphql';
import { DialogStore } from '../../../store/global/types';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

type CommentFormProps = {
  headerTitle: string;
  file: string | undefined;
};
type CommentFormPropsAndDialogStore = CommentFormProps & DialogStore;

export default function AddCommentDialogForm({
  headerTitle,
  visible,
  setVisible,
  file,
}: PropsWithChildren<CommentFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const toast = useRef<Toast>(null);
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);
  const { _id } = useAccessTokenData() as TokenData;

  const { mutate } = useCreateFileCommentMutation(GRAPHQL_CLIENT, {
    onSettled: (data) => {
        toast.current?.show({
          severity: 'success',
          summary: t('global.messages.success'),
          detail: t('global.messages.successMessage'),
        });
        setTimeout(() => {
            navigate({ to: '/settings/career' });
            window.location.reload();
        }, 200);
        setIsButtonDisabld(false);
    },
    onError: (error: IApiError) => {
      setIsButtonDisabld(false);
      toast.current?.show({
        severity: 'error',
        summary: t('global.messages.error'),
        detail: error.message,
        life: 5000,
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateFileCommentInput>({
    defaultValues: {
      comment: '',
      createdBy: _id,
      fileId: file,
    },
  });

  const onSubmit: SubmitHandler<ICreateFileCommentInput> = (data: ICreateFileCommentInput) => {
    setIsButtonDisabld(true);
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
              name="comment"
              control={control}
              rules={{
                required: t('global.forms.validation.careerDescription') as string,
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
              htmlFor="comment"
              className={classNames({ 'p-error': !!errors.comment })}
            >
              {t('global.dictionary.comment')}*
            </label>
          </span>
          {errors.comment && <small className="p-error">{errors.comment?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
