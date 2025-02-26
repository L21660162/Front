import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IEvent,
  IGroup,
  IPeriod,
  IUpdateEventInput,
  useGetAllGroupsQuery,
  useGetAllPeriodsQuery,
  useUpdateEventMutation,
} from '../../../../graphql/graphql';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type EventsFormProps = {
  headerTitle: string;
  event: IEvent;
};

type EventFormPropsAndDialogStore = EventsFormProps & DialogStore;

export default function EditEventDialogForm({
  headerTitle,
  visible,
  setVisible,
  event,
}: PropsWithChildren<EventFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/event' });
  const toast = useRef<Toast>(null);
  const { _id } = useAccessTokenData() as TokenData;
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);
  const [periodData, setPeriodData] = useState<IPeriod[]>([]);
  const [groupsLabels, setGroupsLabels] = useState<{ label: string; value: string }[]>([]);
  const [selecGroups, setSelecGroups] = useState<IGroup[]>([]);

  const settime = (data) => {
    return new Date(data);
  };

  const { data: period } = useGetAllPeriodsQuery(GRAPHQL_CLIENT, {
    limit: 100,
    offset: 0,
    page: 1,
    filter: {
      keyword: null,
    },
  });

  const { data: groups } = useGetAllGroupsQuery(GRAPHQL_CLIENT, {
    limit: 100,
    offset: 0,
    page: 1,
    filter: {
      keyword: null,
    },
  });

  useEffect(() => {
    if (period && Array.isArray(period?.getAllPeriods.docs)) {
      setPeriodData(period?.getAllPeriods.docs);
    }
  }, [period]);

  useEffect(() => {
    if (groups && Array.isArray(groups?.getAllGroups.docs)) {
      setGroupsLabels(
        groups?.getAllGroups.docs.map((group: IGroup) => ({
          label: group.identifier,
          value: group._id,
        }))
      );
    }
  }, [groups]);

  const { mutate } = useUpdateEventMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.careerEditSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/event' });
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
  } = useForm<IUpdateEventInput>({
    defaultValues: {
      _id: event._id,
      activity: event.activity,
      startDate: settime(event.startDate),
      finishDate: settime(event.finishDate),
      period: event.period,
      groupsIncluded: event.groupsIncluded,
      uploadedBy: _id,
    },
  });

  const onSubmit: SubmitHandler<IUpdateEventInput> = (data: IUpdateEventInput) => {
    const { _id, activity, startDate, finishDate, groupsIncluded, uploadedBy } = data;

    const payload: IUpdateEventInput = {
      _id,
      activity,
      startDate,
      finishDate,
      groupsIncluded,
      uploadedBy,
    };

    setIsButtonDisabld(true);
    mutate({ data: payload });
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
            <b>Información del Evento</b>
            <br />
          </label>
          <hr />
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="activity"
              control={control}
              rules={{
                required: t('global.forms.validation.activity') as string,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label htmlFor="activity" className={classNames({ 'p-error': !!errors.activity })}>
              {t('global.dictionary.activity')}*
            </label>
          </span>
          {errors.activity && <small className="p-error">{errors.activity?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: t('global.forms.validation.startDate') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  value={field.value}
                  onChange={(e: CalendarChangeEvent) => field.onChange(e.value)}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  locale="es"
                  showTime
                  hourFormat="12"
                />
              )}
            />
            <label htmlFor="startDate" className={classNames({ 'p-error': !!errors.startDate })}>
              {t('global.dictionary.startDate')}*
            </label>
          </span>
          {errors.startDate && <small className="p-error">{errors.startDate?.message}</small>}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-book" />
            <Controller
              name="finishDate"
              control={control}
              rules={{
                required: t('global.forms.validation.finishDate') as string,
              }}
              render={({ field, fieldState }) => (
                <Calendar
                  value={field.value}
                  onChange={(e: CalendarChangeEvent) => field.onChange(e.value)}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  locale="es"
                  showTime
                  hourFormat="12"
                />
              )}
            />
            <label htmlFor="finishDate" className={classNames({ 'p-error': !!errors.finishDate })}>
              {t('global.dictionary.finalDate')}*
            </label>
          </span>
          {errors.finishDate && <small className="p-error">{errors.finishDate?.message}</small>}
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
              name="groupsIncluded"
              control={control}
              rules={{ required: t('global.forms.validation.groupsIncluded') as string }}
              render={({ field, fieldState }) => (
                <MultiSelect
                  id={field.name}
                  {...field}
                  options={groupsLabels}
                  optionLabel="label"
                  optionValue="value"
                  display="chip"
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  onChange={(e) => {
                    setSelecGroups(e.value);
                    setValue('groupsIncluded', e.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              )}
            />
            <label
              htmlFor="groupsIncluded"
              className={classNames({ 'p-error': errors.groupsIncluded })}
            >
              {t('global.dictionary.groupsIncluded')}*
            </label>
          </span>
          {errors.groupsIncluded && (
            <small className="p-error">{errors.groupsIncluded?.message}</small>
          )}
        </div>
      </form>
    </Dialog>
  );
}
