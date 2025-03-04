import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IBuilding,
  IGetUserByIdQuery,
  IUpdateUserInput,
  IUploadPictureBuildingInput,
  IUser,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadBuildingPictureMutation,
} from '../../../../graphql/graphql';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type UserFormProps = {
  headerTitle: string;
  user: IUser;
};

type UserFormPropsAndDialogStore = UserFormProps & DialogStore;

export default function PicturebuildingDialogForm({
  headerTitle,
  visible,
  setVisible,
  user,
}: PropsWithChildren<UserFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/user/dashboard' });
  const toast = useRef<Toast>(null);
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

      return file;
    } catch (error) {
      return null;
    }
  };

  const { mutate } = useUpdateUserMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.userPictureSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/user/dashboard' });
        window.location.reload();
      }, 200);
      setButtonDisabled(false);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
      toast.current?.show({
        severity: 'error',
        summary: t('global.toast.error.summary'),
        detail: t('global.toast.success.detail.profilePictureError'),
        life: 5000,
      });
      setButtonDisabled(false);
    },
  });

  const { data: userData } = useGetUserByIdQuery<IGetUserByIdQuery>(GRAPHQL_CLIENT, {
    id: user._id,
  });

  useEffect(() => {
    if (userData && userData.getUserById && userData.getUserById.photo) {
      const fileName = userData.getUserById.photo;
      const newLogoUrl = `http://ssb.matehuala.tecnm.mx/asis_be${fileName}`;

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
    if (userData && userData.getUserById && !userData.getUserById.photo) {
      setLogo(`http://ssb.matehuala.tecnm.mx/asis_be/uploads/users/default_profile.jpg`);
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
        label={t('global.forms.upload') as string}
        className="p-button-rounded p-button-success p-button-raised mt-2"
        icon="pi pi-camera"
        onClick={handleSubmit(onSubmit)}
        outlined
        disabled={buttonDisabled}
      />
    </div>
  );

  return (
    <Dialog
      header={t('module.user.dashboard.dialog.edit.header')}
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
            <b>Información del Usuario</b>
            <br />
          </label>
          <hr />
        </div>
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
                url="http://ssb.matehuala.tecnm.mx/asis_be/graphql"
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
                  setSelectedFile(e.files[0]);
                }}
              />
            </span>
            {errors.photo && <small className="p-error">{errors.photo?.message}</small>}
          </div>
        </div>
      </form>
    </Dialog>
  );
}
