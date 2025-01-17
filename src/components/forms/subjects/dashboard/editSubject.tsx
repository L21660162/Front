import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  ISubject,
  useUpdateSubjectMutation,
  IUpdateSubjectInput,
  IDepartment,
  useGetAllDepartmentsQuery,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type SubjectFormProps = {
  headerTitle: string;
  subject: ISubject;
};

type SubjectFormPropsAndDialogStore = SubjectFormProps & DialogStore;

export default function EditSubjectDialogForm({
  headerTitle,
  visible,
  setVisible,
  subject,
}: PropsWithChildren<SubjectFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const toast = useRef<Toast>(null);
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);

  const { data: allDepartmentData } = useGetAllDepartmentsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      keyword: null,
    },
  });

  const schoolarLevel = [
    { label: 'Bachillerato', value: 'B' },
    { label: 'Licenciatura', value: 'L' },
    { label: 'Postgrado', value: 'P' },
  ];

  const Subjectype = [
    { label: 'De base', value: '1' },
    { label: 'Optativa', value: '2' },
    { label: 'Especialidad', value: '3' },
    { label: 'Extracurricular', value: '4' },
  ];

  let departmentData: Array<IDepartment> = [];
  if (allDepartmentData && Array.isArray(allDepartmentData?.getAllDepartments.docs)) {
    departmentData = allDepartmentData?.getAllDepartments.docs;
  }

  const { mutate } = useUpdateSubjectMutation<IApiError>(GRAPHQL_CLIENT, {
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

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IUpdateSubjectInput>({
    defaultValues: {
      _id: subject._id || '',
      areaKey: subject.areaKey,
      largeName: subject.largeName,
      schoolarLevel: subject.schoolarLevel,
      shortName: subject.shortName,
      subjectType: subject.subjectType.toString(),
    },
  });

  const onSubmit: SubmitHandler<IUpdateSubjectInput> = (data: IUpdateSubjectInput) => {
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
            <b>{t('global.dictionary.subject')}</b> <br />
          </label>
        </div>
        <hr />
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="largeName"
              control={control}
              rules={{
                required: t('global.forms.validation.largeName') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.largeName })}>
              {t('global.dictionary.largeName')}*
            </label>
          </span>
          {errors.largeName && <small className="p-error">{errors.largeName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="shortName"
              control={control}
              rules={{
                required: t('global.forms.validation.shortName') as string,
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
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.shortName })}>
              {t('global.dictionary.shortName')}*
            </label>
          </span>
          {errors.shortName && <small className="p-error">{errors.shortName?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="areaKey"
              control={control}
              rules={{
                required: t('global.forms.validation.careerDescription') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={departmentData}
                  optionLabel="name"
                  optionValue="_id"
                />
              )}
            />
            <label htmlFor="areaKey" className={classNames({ 'p-error': !!errors.areaKey })}>
              {t('global.dictionary.careerDescription')}*
            </label>
          </span>
          {errors.areaKey && <small className="p-error">{errors.areaKey?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-hashtag" />
            <Controller
              name="schoolarLevel"
              control={control}
              rules={{
                required: t('global.forms.validation.schoolarLevel') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={schoolarLevel}
                  optionLabel="label"
                  optionValue="value"
                />
              )}
            />
            <label
              htmlFor="schoolarLevel"
              className={classNames({ 'p-error': !!errors.schoolarLevel })}
            >
              {t('global.dictionary.schoolarLevel')}*
            </label>
          </span>
          {errors.schoolarLevel && (
            <small className="p-error">{errors.schoolarLevel?.message}</small>
          )}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-calendar" />
            <Controller
              name="subjectType"
              control={control}
              rules={{ required: t('global.forms.validation.subjectType') as string }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={Subjectype}
                  optionLabel="label"
                  optionValue="value"
                />
              )}
            />
            <label htmlFor="subjectType" className={classNames({ 'p-error': errors.subjectType })}>
              {t('global.dictionary.subjectType')}*
            </label>
          </span>
          {errors.subjectType && <small className="p-error">{errors.subjectType?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
