import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { PropsWithChildren, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import { IImportSubjectsMutation, useImportSubjectsMutation } from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type ImportSubjectsConfirmProps = {
  headerTitle: string;
};
type ImportSubjectsConfirmPropsAndDialogStore = ImportSubjectsConfirmProps & DialogStore;

export default function importSubjectsConfirm({
  headerTitle,
  visible,
  setVisible,
}: PropsWithChildren<ImportSubjectsConfirmPropsAndDialogStore>) {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);
  const navigate = useNavigate({ from: '/maintenance/dashboard' });

  const { mutate, isSuccess } = useImportSubjectsMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.vacancyDeleteSucess'),
      });

      setTimeout(() => {
        navigate({ to: '/maintenance/dashboard' });
        window.location.reload();
      }, 200);
    },
    onError: (errorResponse: IApiError) => {
      // TODO manage server error response for translation or something
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
  } = useForm<IImportSubjectsMutation>({});

  const onSubmit: SubmitHandler<IImportSubjectsMutation> = (data: IImportSubjectsMutation) => {
    mutate({ data });
  };

  const footerContent = (
    <div className="flex align-items-center justify-content-between">
      <Button
        className="p-button-text"
        label="Aceptar"
        icon="pi pi-check"
        severity="success"
        rounded
        outlined
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        className="p-button-text"
        label="Cancelar"
        icon="pi pi-times"
        severity="danger"
        rounded
        outlined
        onClick={() => {
          setVisible(false);
          vacancy = [''];
        }}
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
        <div className="p-fluid">
          <div className="flex flex-column align-items-center text-center mb-3">
            <p className="font-bold ">
              ¿Estás seguro de que deseas importar las asignaturas del SII?
            </p>
            <p className="font-bold ">
              Esta acción no se puede deshacer y por la cantidad de información, puede tardar unos
              minutos. Se recomienda haber hecho un respaldo de la base de datos anteriormente, y no
              cerrar esta ventana durante el proceso de importación.
            </p>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
