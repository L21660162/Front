import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IApiError } from '../../../../types/apierror';
import Img from '../../../../layout/images/5624013.png';
import logo from '../../../../layout/images/logo-sepret.png';
import { TokenData } from '../../../store/auth/type';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IUploadPictureBuildingInput,
  useUploadBuildingPictureMutation,
} from '../../../graphql/graphql';
import { getActions, useAccessTokenData } from '../../../store/auth/store';
import { FileUpload } from 'primereact/fileupload';

const { setAccessToken, setRefreshToken } = getActions();


export default function CourseForm() {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, isSuccess } = useUploadBuildingPictureMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.alumnUpdateSuccess'),
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
    watch,
    setValue,
    reset,
  } = useForm<IUploadPictureBuildingInput>({
    defaultValues: {
      _id: '678ebd65cc6e237eb70484a4',
    },
  });


  const onSubmit: SubmitHandler<IUploadPictureBuildingInput> = (data: IUploadPictureBuildingInput) => {
    console.log(data);
    
    try {
      if (!data.picture) {
        throw new Error('Debes seleccionar un archivo');
      }

      mutate({ data });
      reset();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: error.message || t('global.toast.error.detail.genericError'),
        life: 5000,
      });
    }
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="card" style={{ height: '100%' }}>
              <br />
              <div className="label">
                <label htmlFor="aditional">
                  <b>{t('global.dictionary.personalInfo')}</b>
                </label>
              </div>
              <hr />
              {
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-upload" />
              <FileUpload
                name="picture"
                mode="basic"
                accept="image/*"
                chooseLabel={t('global.dictionary.image') as string}
                onSelect={(e) => {
                  setValue('picture', e.files[0]);
                  // Actualizar el estado del archivo seleccionado
                  setSelectedFile(e.files[0]);
                }}
                // Limpiar el archivo seleccionado al cambiar la propiedad key
                key={selectedFile ? selectedFile.name : 'default-key'}
              />
              <label className="p-error">{t('global.dictionary.logo')}*</label>
            </span>
            {!selectedFile && <small className="p-error">Campo obligatorio</small>}
          </div>
        }


         {selectedFile && (
          <div className="field">
            <img
              src={URL.createObjectURL(selectedFile)} // Crea una URL local para la imagen seleccionada
              alt="Imagen seleccionada"
              style={{ width: '100px', height: '100px' }} // Estilo para la imagen
            />
          </div>
        ) }
              <div className="mt-6 flex justify-content-between">
                <Button
                  className="p-button-text p-button-danger p-button-outlined p-button-rounded"
                  label="Cancelar"
                  icon="pi pi-times"
                  onClick={() => {
                  }}
                />
                <Button
                  type="submit"
                  label={t('global.forms.submit') as string}
                  className="p-button-rounded p-button-raised mt-2"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
        </div>
      </div>
    </div>
  );
}
