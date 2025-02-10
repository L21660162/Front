import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Query } from '@tanstack/react-query';
import { IApiError } from '../../../../../types/apierror';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import {
    IClassroom,
    IUpsertClassroomInput,
    IGetAllClassroomsQuery,
    useCreateClassroomMutation,
    useGetAllBuildingsQuery,
    IBuilding,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';

type ClassroomFormProps = {
    headerTitle: string;
};
type ClassroomFormPropsAndDialogStore = ClassroomFormProps & DialogStore;

export default function ClassroomDialogForm({
    headerTitle,
    visible,
    setVisible,
}: PropsWithChildren<ClassroomFormPropsAndDialogStore>) {
    const { t } = useTranslation('common');
    const navigate = useNavigate({ from: '/settings/career' });
    const toast = useRef<Toast>(null);

    const { data, isLoading, error } = useGetAllBuildingsQuery(GRAPHQL_CLIENT);

    const { mutate } = useCreateClassroomMutation<IApiError>(GRAPHQL_CLIENT, {
        onSuccess: () => {
            toast.current?.show({
                severity: 'success',
                summary: t('global.toast.success.summary'),
                detail: t('global.toast.success.detail.ClassroomCreateSuccess'),
            });
            setTimeout(() => {
                window.location.reload();
            }, 50);
            setIsButtonDisabled(false);
        },
        onError: (errorResponse: IApiError) => {
            // TODO manage server error response for translation or something
            toast.current?.show({
                severity: 'error',
                summary: t('global.toast.error.summary'),
                detail: errorResponse.response.errors[0].message,
                life: 5000,
            });

            setIsButtonDisabled(false);
        },
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUpsertClassroomInput>({
        defaultValues: {
            building: '',
            identifier: '',
        },
    });

    const onSubmit: SubmitHandler<IUpsertClassroomInput> = (data) => {
        setIsButtonDisabled(true);
        mutate({
            data: {
                building: data.building,
                identifier: data.identifier,
            },
        });
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
                disabled={isButtonDisabled}
                onClick={handleSubmit(onSubmit)}
            />
        </div>
    );

    if (isLoading) {
        return <p>{t('global.forms.loadingBuildings')}</p>;
    }

    if (error) {
        return <p>{t('global.forms.errorLoadingBuildings')}</p>;
    }

    return (
        <Dialog
            header={headerTitle}
            visible={visible}
            style={{ width: '35rem' }}
            onHide={() => setVisible(false)}
            footer={footerContent}
        >
            <Toast ref={toast} />
            <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                {/* Selector de edificios */}
                <div className="field">
                    <label htmlFor="building">{t('global.dictionary.building')}*</label>
                    <Controller
                        name="building"
                        control={control}
                        rules={{ required: t('global.forms.validation.requiredField') as string }}
                        render={({ field, fieldState }) => (
                            <span className="p-float-label">
                                <select
                                    id="building"
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                >
                                    <option value="">{t('global.forms.selectPlaceholder')}</option>
                                    {data?.getAllBuildings.docs.map((building: IBuilding) => (
                                        <option key={building._id} value={building._id}>
                                            {building.name}
                                        </option>
                                    ))}
                                </select>
                                {fieldState.invalid && (
                                    <small className="p-error">{fieldState.error?.message}</small>
                                )}
                            </span>
                        )}
                    />
                </div>

                {/* Campo de identificador */}
                <div className="field">
                    <label htmlFor="identifier">{t('global.dictionary.identifier')}*</label>
                    <Controller
                        name="identifier"
                        control={control}
                        rules={{ required: t('global.forms.validation.requiredField') as string }}
                        render={({ field, fieldState }) => (
                            <span className="p-float-label">
                                <input
                                    id="identifier"
                                    {...field}
                                    maxLength={5}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                />
                                {fieldState.invalid && (
                                    <small className="p-error">{fieldState.error?.message}</small>
                                )}
                            </span>
                        )}
                    />
                </div>
            </form>
        </Dialog>
    );
}