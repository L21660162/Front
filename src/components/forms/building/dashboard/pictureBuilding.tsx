import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IBuilding,
  IUploadPictureBuildingInput,
  useUploadBuildingPictureMutation,
} from '../../../../graphql/graphql';
import { useAccessTokenData } from '../../../../store/auth/store';
import { TokenData } from '../../../../store/auth/type';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type BuildingFormProps = {
  headerTitle: string;
  building: IBuilding;
};

type BuildingFormPropsAndDialogStore = BuildingFormProps & DialogStore;

export default function PicturebuildingDialogForm({
  headerTitle,
  visible,
  setVisible,
  building,
}: PropsWithChildren<BuildingFormPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/building' });
  const toast = useRef<Toast>(null);
  const [isButtonDisablesed, setIsButtonDisabld] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { _id: userId, roles } = useAccessTokenData() as TokenData;

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

  const { mutate } = useUploadBuildingPictureMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.buildingPictureSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/building' });
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

  useEffect(() => {
    if (building.picturePath) {
      const fileName = building.picturePath;
      const newLogoUrl = `http://ssb.matehuala.tecnm.mx/asis_be${fileName}`;

      setLogo(newLogoUrl);
      setInitialImageUrl(newLogoUrl);

      convertUrlToImageFile(newLogoUrl).then((imageFile) => {
        if (imageFile) {
          setImage(imageFile);
          setSelectedFile(imageFile);
        }
      });
    }
  }, [building.picturePath]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IUploadPictureBuildingInput>({
    defaultValues: {
      _id: building._id || '',
      picture: logo,
      updatedBy: userId,
    },
  });

  useEffect(() => {
    if (building) {
      setValue('_id', building._id);
      setValue('picture', logo);
      setValue('updatedBy', userId);
    }
  }, [building, setValue]);

  const onSubmit = (data: IUploadPictureBuildingInput) => {
    setIsButtonDisabld(true);
    data.picture = image;
    mutate({ data });
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
        disabled={isButtonDisablesed}
      />
    </div>
  );

  return (
    <Dialog
      header={t('module.building.dashboard.dialog.edit.header')}
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
            <b>Información del Edificio</b>
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
            {errors.picture && <small className="p-error">{errors.picture?.message}</small>}
          </div>
        </div>
      </form>
    </Dialog>
  );
}
