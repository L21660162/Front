import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';
import {
  IGetUserByIdQuery,
  IUpdateUserInput,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpsertUserMutation,
} from '../../../../graphql/graphql';
import { IApiError } from '../../../../../types/apierror';
import UserCrud from '../userCrud';

function BodyProfile() {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);
  const navigate = useNavigate({ from: '/me/profile' });
  const { _id: actuallyUser } = useAccessTokenData() as TokenData;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const convertUrlToImageFile = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al obtener la imagen');
      }

      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      console.log('Imagen convertida:', file);

      return file;
    } catch (error) {
      console.error('Error al convertir la URL en archivo:', error);
      return null;
    }
  };

  const { mutate } = useUpdateUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.profileEditSuccess'),
      });
      setTimeout(() => {
        navigate({ to: '/home/dashboard' });
        window.location.reload();
      }, 200);
      setButtonDisabled(false);
    },
    onError: (errorResponse: IApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: t('global.toast.error.detail.profileEditError'),
        life: 5000,
      });
      setButtonDisabled(false);
    },
  });

  const { data: userData } = useGetUserByIdQuery<IGetUserByIdQuery>(GRAPHQL_CLIENT, {
    id: actuallyUser,
  });

  useEffect(() => {
    if (userData && userData.getUserById && userData.getUserById.photo) {
      const fileName = userData.getUserById.photo;
      const newLogoUrl = `http://localhost:4000${fileName}`;

      setLogo(newLogoUrl);
      setInitialImageUrl(newLogoUrl); // Establecer la URL inicial aquí

      convertUrlToImageFile(newLogoUrl).then((imageFile) => {
        if (imageFile) {
          setImage(imageFile); // Asignar el archivo de imagen a la variable image

          // Seleccionar el archivo obtenido para cargarlo en el FileUpload
          setSelectedFile(imageFile);
        }
      });
    }
    if (userData && userData.getUserById && !userData.getUserById.photo ) {
      setLogo(`http://localhost:4000/uploads/users/default_profile.jpg`);
    }
  }, [userData]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IUpdateUserInput>({
    defaultValues: {
      _id: userData?.getUserById?._id,
      firstName: userData?.getUserById?.firstName,
      lastName: userData?.getUserById?.lastName,
      middleName: userData?.getUserById?.middleName,
      rfc: userData?.getUserById?.rfc,
      email: userData?.getUserById?.email,
      gender: userData?.getUserById?.gender,
      photo: logo,
    },
  });

  useEffect(() => {
    if (userData?.getUserById) {
      setValue('_id', userData.getUserById._id);
      setValue('firstName', userData.getUserById.firstName);
      setValue('lastName', userData.getUserById.lastName);
      setValue('middleName', userData.getUserById.middleName);
      setValue('rfc', userData.getUserById.rfc);
      setValue('email', userData.getUserById.email);
      setValue('gender', userData.getUserById.gender);
      setValue('photo', logo);
    }
  }, [userData, setValue]);

  const onSubmit: SubmitHandler<IUpdateUserInput> = (data: IUpdateUserInput) => {
    setButtonDisabled(true);
    data.photo = image;
    mutate({ data });
    reset();
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="card" style={{ height: '100%' }}>
          <div className="element">
            <div className="field flex justify-content-center flex-wrap">
              <span className="p-float-label p-input-icon-right">
                {logo && (
                  <div className="element">
                    <div className="field">
                      <div className="flex align-items-center justify-content-center">
                        <img
                          src={logo}
                          alt="Foto de Perfil"
                          className="border-circle w-20rem h-20rem bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <FileUpload
                  name="image"
                  url="http://localhost:4000/graphql"
                  mode="basic"
                  accept="image/*"
                  className="flex align-items-center justify-content-center"
                  chooseLabel={t('global.dictionary.profilePicture') as string}
                  onSelect={(e) => {
                    const selected = e.files[0];
                    setSelectedFile(selected);

                    if (selected) {
                      setImage(selected);
                      setLogo(URL.createObjectURL(selected));
                    } else {
                      setImage(null);
                      setLogo(initialImageUrl);
                    }
                  }}
                  key={selectedFile ? selectedFile.name : 'default-key'}
                  customUpload // Habilitar carga personalizada
                  uploadHandler={(e) => {
                    console.log('Custom upload logic here:', e.files[0]);
                    setSelectedFile(e.files[0]);
                  }}
                />
              </span>
              {errors.photo && <small className="p-error">{errors.photo?.message}</small>}
            </div>
          </div>
          <div className="elements">
            <div className="field trielements">
              <span className="p-float-label">
                <i className="pi pi-book icone" />
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    // required: t('global.forms.validation.userName') as string,
                    validate: (value) =>
                      value !== '' || (t('global.forms.validation.firstName') as string),
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      disabled
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                        'p-content': true,
                      })}

                      // defaultValue={userData?.getById.name}
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
            <div className="field trielements">
              <span className="p-float-label">
                <i className="pi pi-book icone" />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value !== '' || (t('global.forms.validation.lastName') as string),
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      disabled
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                        'p-content': true,
                      })}
                    />
                  )}
                />
                <label htmlFor="lastName" className={classNames({ 'p-error': !!errors.lastName })}>
                  {t('global.dictionary.lastName')}*
                </label>
              </span>
              {errors.lastName && <small className="p-error">{errors.lastName?.message}</small>}
            </div>
            <div className="field trielements">
              <span className="p-float-label">
                <i className="pi pi-book icone" />
                <Controller
                  name="middleName"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value !== '' || (t('global.forms.validation.middleName') as string),
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      disabled
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                        'p-content': true,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="middleName"
                  className={classNames({ 'p-error': errors.middleName })}
                >
                  {t('global.dictionary.middleName')}*
                </label>
              </span>
              {errors.middleName && <small className="p-error">{errors.middleName?.message}</small>}
            </div>
          </div>
          <div className="element">
            <div className="field">
              <span className="p-float-label ">
                <i className="pi pi-id-card icone" />
                <Controller
                  name="rfc"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value !== '' || (t('global.forms.validation.rfc') as string),
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      disabled
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                        'p-content': true,
                      })}
                    />
                  )}
                />
                <label htmlFor="rfc" className={classNames({ 'p-error': errors.rfc })}>
                  {t('global.dictionary.rfc')}*
                </label>
              </span>
              {errors.rfc && <small className="p-error">{errors.rfc?.message}</small>}
            </div>
          </div>
          <div className="element">
            <div className="field">
              <span className="p-float-label ">
                <i className="pi pi-envelope icone" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value !== '' || (t('global.forms.validation.email') as string),
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      disabled
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                        'p-content': true,
                      })}
                    />
                  )}
                />
                <label htmlFor="email" className={classNames({ 'p-error': errors.email })}>
                  {t('global.dictionary.email')}*
                </label>
              </span>
              {errors.email && <small className="p-error">{errors.email?.message}</small>}
            </div>
          </div>
          <div className="element">
            <div className="field flex justify-content-center flex-wrap">
              <span className="field-radiobutton">
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: t('global.forms.validation.gender') as string,
                  }}
                  render={({ field, fieldState }) => (
                    <div>
                      <label htmlFor={field.name}>{t('global.dictionary.gender')}</label>
                      <br />
                      <div className="flex gap-3">
                        <div className="flex align-items-center gap-2">
                          <RadioButton
                            id={`${field.name}-M`}
                            type="checkbox"
                            value="M"
                            checked={field.value === 'M'}
                            disabled
                            onChange={() => field.onChange('M')}
                          />
                          <label htmlFor={`${field.name}-true`} className="ml-2">
                            {' '}
                            Hombre
                          </label>
                        </div>
                        <div className="flex align-items-center gap-2">
                          <RadioButton
                            id={`${field.name}-F`}
                            type="checkbox"
                            value="F"
                            checked={field.value === 'F'}
                            disabled
                            onChange={() => field.onChange('F')}
                          />
                          <label htmlFor={`${field.name}-false`} className="ml-2">
                            {' '}
                            Mujer
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </span>
              {errors.gender && <small className="p-error">{errors.gender?.message}</small>}
            </div>
          </div>
          <div className="mt-6 flex justify-content-between">
            <Button
              className="p-button-text p-button-danger p-button-outlined p-button-rounded"
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => {
                navigate({ to: '/home/dashboard', replace: true });
              }}
              disabled={buttonDisabled}
            />
            <Button
              type="submit"
              label={t('global.forms.submit') as string}
              className="p-button-rounded p-button-raised mt-2"
              onClick={handleSubmit(onSubmit)}
              disabled={buttonDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyProfile;
