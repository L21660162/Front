import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
  ISubject,
  useUpdateSubjectMutation,
  IUpdateSubjectInput,
  ISchedule,
  IClassroom,
  IGroup,
  IPeriod,
  IRoles,
  IUser,
  useGetAllClassroomsQuery,
  useGetAllGroupsQuery,
  useGetAllPeriodsQuery,
  useGetAllSubjectsQuery,
  useGetAllUsersQuery,
  IUpdateScheduleInput,
  useGetScheduleByIdQuery,
  useUpdateScheduleMutation,
  IUpsertScheduleInput,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type ScheduleFormProps = {
  headerTitle: string;
  schedule: string;
};

type ScheduleFormPropsAndDialogStore = ScheduleFormProps & DialogStore;

export default function EditScheduleViewDialogForm({
  headerTitle,
  visible,
  setVisible,
  schedule,
}: PropsWithChildren<ScheduleFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const toast = useRef<Toast>(null);
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);
  let classroomData: Array<IClassroom> = [];
  let subjectData: Array<ISubject> = [];
  let groupData: Array<IGroup> = [];
  let periodData: Array<IPeriod> = [];
  let teacherData: Array<IUser> = [];
  const [time, setTime] = useState<string | Date | Date[] | null>(null);

  const { data: classroom } = useGetAllClassroomsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      keyword: null,
    },
  });

  const { data: groups } = useGetAllGroupsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      keyword: null,
    },
  });

  const { data: periods } = useGetAllPeriodsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      keyword: null,
    },
  });

  const { data: subjects } = useGetAllSubjectsQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { data: teachers } = useGetAllUsersQuery(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      roles: [IRoles.Docente],
    },
  });

  if (classroom && Array.isArray(classroom?.getAllClassrooms.docs)) {
    classroomData = classroom?.getAllClassrooms.docs;
  }

  if (subjects && Array.isArray(subjects?.getAllSubjects.docs)) {
    subjectData = subjects?.getAllSubjects.docs;
  }

  if (groups && Array.isArray(groups?.getAllGroups.docs)) {
    groupData = groups?.getAllGroups.docs;
  }

  if (periods && Array.isArray(periods?.getAllPeriods.docs)) {
    periodData = periods?.getAllPeriods.docs;
  }

  if (teachers && Array.isArray(teachers?.getAllUsers.docs)) {
    teacherData = teachers?.getAllUsers.docs;
  }

  const { data: dataSchedule } = useGetScheduleByIdQuery(GRAPHQL_CLIENT, {
    id: schedule,
  });

  const settime = (data) => {
    return new Date(data);
  };

  const { mutate } = useUpdateScheduleMutation<IApiError>(GRAPHQL_CLIENT, {
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
  } = useForm<IUpsertScheduleInput>({
    defaultValues: {
      _id: dataSchedule?.getScheduleById._id || '',
      classroom: dataSchedule?.getScheduleById.classroom || '',
      finalTime: dataSchedule?.getScheduleById.finalTime || '',
      period: dataSchedule?.getScheduleById.period || '',
      startTime: dataSchedule?.getScheduleById.startTime || '',
      subject: dataSchedule?.getScheduleById.subject || '',
      teacher: dataSchedule?.getScheduleById.teacher || '',
      weekday: dataSchedule?.getScheduleById.weekday || 0,
      classGroup: dataSchedule?.getScheduleById.classGroup || '',
    },
  });

  useEffect(() => {
    if (dataSchedule) {
      setValue('_id', dataSchedule?.getScheduleById._id);
      setValue('classroom', dataSchedule?.getScheduleById.classroom);
      setValue('finalTime', settime(dataSchedule?.getScheduleById.finalTime));
      setValue('period', dataSchedule?.getScheduleById.period);
      setValue('startTime', settime(dataSchedule?.getScheduleById.startTime));
      setValue('subject', dataSchedule?.getScheduleById.subject);
      setValue('teacher', dataSchedule?.getScheduleById.teacher);
      setValue('weekday', dataSchedule?.getScheduleById.weekday);
      setValue('classGroup', dataSchedule?.getScheduleById.classGroup);
    }
  }, [dataSchedule, setValue]);

  const onSubmit: SubmitHandler<IUpdateScheduleInput> = (data: IUpdateScheduleInput) => {
    const { _id, classroom, finalTime, startTime } = data;
    const start = new Date(finalTime).toISOString();
    const final = new Date(startTime).toISOString();
    const docs = {
      _id,
      classroom,
      finalTime: start,
      startTime: final,
    };
    setIsButtonDisabld(true);
    mutate({ data: docs });
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
              name="subject"
              control={control}
              rules={{
                required: t('global.forms.validation.subject') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={subjectData}
                  optionLabel="largeName"
                  optionValue="_id"
                  readOnly
                  disabled
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.subject })}>
              {t('global.dictionary.subjectname')}*
            </label>
          </span>
          {errors.subject && <small className="p-error">{errors.subject?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="classroom"
              control={control}
              rules={{
                required: t('global.forms.validation.classroom') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={classroomData}
                  optionLabel="identifier"
                  optionValue="_id"
                />
              )}
            />
            <label htmlFor="name" className={classNames({ 'p-error': !!errors.classroom })}>
              {t('global.dictionary.classroom')}*
            </label>
          </span>
          {errors.classroom && <small className="p-error">{errors.classroom?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="classGroup"
              control={control}
              rules={{
                required: t('global.forms.validation.classGroup') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={groupData}
                  optionLabel="identifier"
                  optionValue="_id"
                  disabled
                />
              )}
            />
            <label htmlFor="classGroup" className={classNames({ 'p-error': !!errors.classGroup })}>
              {t('global.dictionary.group')}*
            </label>
          </span>
          {errors.classGroup && <small className="p-error">{errors.classGroup?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-hashtag" />
            <Controller
              name="period"
              control={control}
              rules={{
                required: t('global.forms.validation.period') as string,
              }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={periodData}
                  optionLabel="name"
                  optionValue="_id"
                  disabled
                />
              )}
            />
            <label htmlFor="period" className={classNames({ 'p-error': !!errors.period })}>
              {t('global.dictionary.period')}*
            </label>
          </span>
          {errors.period && <small className="p-error">{errors.period?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-calendar" />
            <Controller
              name="teacher"
              control={control}
              rules={{ required: t('global.forms.validation.teacher') as string }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={teacherData}
                  optionLabel={(option: IUser) =>
                    `${option.firstName} ${option.lastName} ${option.middleName}`
                  }
                  optionValue="_id"
                  disabled
                />
              )}
            />
            <label htmlFor="teacher" className={classNames({ 'p-error': errors.teacher })}>
              {t('global.dictionary.teacher')}*
            </label>
          </span>
          {errors.teacher && <small className="p-error">{errors.teacher?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="startTime"
              control={control}
              rules={{
                required: t('global.forms.validation.startTime') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: CalendarChangeEvent) => field.onChange(e.value)}
                  timeOnly
                  hourFormat="12"
                />
              )}
            />
            <label htmlFor="startTime" className={classNames({ 'p-error': !!errors.startTime })}>
              {t('global.dictionary.startTime')}*
            </label>
          </span>
          {errors.startTime && <small className="p-error">{errors.startTime?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="finalTime"
              control={control}
              rules={{
                required: t('global.forms.validation.finalTime') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  value={field.value}
                  onChange={(e: CalendarChangeEvent) => field.onChange(e.value)}
                  timeOnly
                  hourFormat="12"
                />
              )}
            />
            <label htmlFor="finalTime" className={classNames({ 'p-error': !!errors.finalTime })}>
              {t('global.dictionary.finalTime')}*
            </label>
          </span>
          {errors.finalTime && <small className="p-error">{errors.finalTime?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="weekday"
              control={control}
              rules={{
                required: t('global.forms.validation.weekday') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  disabled
                />
              )}
            />
            <label htmlFor="weekday" className={classNames({ 'p-error': !!errors.weekday })}>
              {t('global.dictionary.weekday')}*
            </label>
          </span>
          {errors.weekday && <small className="p-error">{errors.weekday?.message}</small>}
        </div>
      </form>
    </Dialog>
  );
}
