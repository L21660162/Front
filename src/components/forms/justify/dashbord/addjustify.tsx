import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../../types/apierror';
import {
  IAttendance,
  IAttendanceStatus,
  IFileType,
  useGetAllAttendancesQuery,
  useGetAllFilesQuery,
  useGetSchedulesFormattedQuery,
  useUploadFileMutation,
} from '../../../../graphql/graphql';
import { DialogStore } from '../../../../store/global/types';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

type JustifyFormProps = {
  headerTitle: string;
  id: string;
};
type JustifyFormPropsAndDialogStore = JustifyFormProps & DialogStore;

export default function AddJustify({
  headerTitle,
  visible,
  setVisible,
  id,
}: PropsWithChildren<JustifyFormPropsAndDialogStore>) {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/justify/dashboard' });
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewFile, setViewFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate } = useUploadFileMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: (data) => {
      // Verificar si la mutación fue exitosa a pesar del error de email
      if (data.uploadFile) {
        toast.current?.show({
          severity: 'success',
          summary: '¡Éxito!',
          detail: 'Justificante subido correctamente. El archivo se guardó pero hubo un problema al enviar la notificación por correo.',
          life: 5000,
        });
        
        setTimeout(() => {
          setVisible(false);
          navigate({ to: '/justify/dashboard' });
          window.location.reload();
        }, 2000);
      }
      setButtonDisabled(false);
      setUploadProgress(0);
    },
    onError: (errorResponse: IApiError) => {
      console.error('Error completo:', errorResponse);
      
      // Manejar diferentes tipos de errores
      let errorMessage = 'Error al subir el justificante';
      
      if (errorResponse.response?.errors?.[0]?.message) {
        const graphqlError = errorResponse.response.errors[0].message;
        
        if (graphqlError.includes('535') || graphqlError.includes('Authentication unsuccessful')) {
          errorMessage = 'El justificante se subió correctamente, pero hubo un problema con el servicio de notificaciones. Contacte al administrador.';
        } else if (graphqlError.includes('Invalid login')) {
          errorMessage = 'Justificante subido, pero error en el servicio de correo. El administrador ha sido notificado.';
        } else {
          errorMessage = graphqlError;
        }
      }

      toast.current?.show({
        severity: 'warn', // Usar 'warn' en lugar de 'error' para indicar que fue parcialmente exitoso
        summary: 'Aviso importante',
        detail: errorMessage,
        life: 7000,
      });

      // Recargar la página incluso si hay error de email, ya que el archivo pudo haberse subido
      setTimeout(() => {
        setVisible(false);
        navigate({ to: '/justify/dashboard' });
        window.location.reload();
      }, 3000);

      setButtonDisabled(false);
      setUploadProgress(0);
    },
  });

  const { data: status, isLoading: isLoadingAttendances, refetch: refetchAttendances } = useGetAllAttendancesQuery(
    GRAPHQL_CLIENT,
    {
      page: 1,
      limit: 10,
      offset: 0,
      filter: {
        schedule: id,
        firstPass: IAttendanceStatus.Absent,
        secondPass: IAttendanceStatus.Absent,
      },
    }
  );

  const { data: file, isSuccess, refetch: refetchFiles } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      attendanceJustified: status?.getAllAttendances.docs[0]?._id,
    },
  });

  const { data: scheduledata } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
    schedule: status?.getAllAttendances.docs[0]?.schedule,
  });

  // Función para manejar la selección de archivos
  const onTemplateSelect = (e: { files: File[] }) => {
    const selected = e.files[0];
    setSelectedFile(selected);

    if (selected) {
      toast.current?.show({
        severity: 'info',
        summary: 'Archivo seleccionado',
        detail: `Archivo: ${selected.name} (${(selected.size / 1024 / 1024).toFixed(2)} MB)`,
        life: 3000,
      });
    }
  };

  // Función principal para subir archivos manualmente
  const onTemplateUpload = async (event: any) => {
    let files: File[] = [];
    
    if (event.files) {
      files = event.files;
    } else if (Array.isArray(event)) {
      files = event;
    } else if (event instanceof File) {
      files = [event];
    }

    const fileToUpload = files[0] || selectedFile;

    if (!fileToUpload) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor selecciona un archivo primero',
        life: 3000,
      });
      return;
    }

    if (!selectedSchedule) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor selecciona una asistencia para justificar',
        life: 3000,
      });
      return;
    }

    if (!scheduledata?.getSchedulesFormatted[0]?.teacherId) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo obtener la información del docente',
        life: 5000,
      });
      return;
    }

    setButtonDisabled(true);
    setUploadProgress(10);

    try {
      // Validar tipo de archivo
      if (!fileToUpload.type.includes('pdf')) {
        throw new Error('Solo se permiten archivos PDF');
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (fileToUpload.size > maxSize) {
        throw new Error('El archivo es demasiado grande. Máximo 10MB permitidos.');
      }

      setUploadProgress(30);

      // Mostrar mensaje de que puede haber problemas de correo
      toast.current?.show({
        severity: 'info',
        summary: 'Subiendo archivo...',
        detail: 'El justificante se está subiendo. Puede haber advertencias del servicio de correo.',
        life: 4000,
      });

      // Llamar a la mutación GraphQL
      mutate({
        data: {
          file: fileToUpload,
          userId: scheduledata.getSchedulesFormatted[0].teacherId,
          fileType: IFileType.Justificante,
          attendanceJustified: selectedSchedule,
        },
      });

      setUploadProgress(70);

    } catch (error) {
      console.error('Error al subir archivo:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error en la subida',
        detail: error instanceof Error ? error.message : 'Error desconocido al subir el archivo',
        life: 5000,
      });
      setButtonDisabled(false);
      setUploadProgress(0);
    }
  };

  const handleManualUpload = () => {
    if (!selectedFile) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor selecciona un archivo primero',
        life: 3000,
      });
      return;
    }
    onTemplateUpload({ files: [selectedFile] });
  };

  const onTemplateClear = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    
    toast.current?.show({
      severity: 'info',
      summary: 'Archivo removido',
      detail: 'El archivo seleccionado ha sido removido',
      life: 3000,
    });
  };

  const onUploadError = (error: any) => {
    console.error('Error en FileUpload:', error);
    toast.current?.show({
      severity: 'error',
      summary: 'Error del sistema',
      detail: 'Ocurrió un error inesperado en la subida de archivos',
      life: 5000,
    });
    setButtonDisabled(false);
    setUploadProgress(0);
  };

  // Función para forzar recarga de datos
  const forceReloadData = () => {
    refetchAttendances();
    refetchFiles();
  };

  const itemTemplate2 = (data: IAttendance) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2 font-bold text-900">
                  {scheduledata?.getSchedulesFormatted[0]?.subjectShortName}
                  {isSuccess && file?.getAllFiles.docs.length > 0 ? (
                    file.getAllFiles.docs[0].approvedBy !== null ? (
                      <Tag value="Justificado" severity="success" className="p-tag-rounded mx-1" />
                    ) : file.getAllFiles.docs[0].comments[0]?._id !== null ? (
                      <Tag value="No Aceptado" severity="danger" className="p-tag-rounded mx-1" />
                    ) : (
                      <Tag value="En revisión" severity="warning" className="p-tag-rounded mx-1" />
                    )
                  ) : (
                    <Tag value="Sin Justificar" severity="info" className="p-tag-rounded mx-1" />
                  )}
                </div>
                <div className="text-1 text-700">
                  {new Date(data.createdAt).toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
            <div className="sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 ">
              <Button
                icon="pi pi-file-export"
                className="p-button-rounded mx-1"
                severity="info"
                onClick={() => {
                  setSelectedSchedule(data._id);
                  setViewFile(null);
                  
                  toast.current?.show({
                    severity: 'info',
                    summary: 'Asistencia seleccionada',
                    detail: 'Ahora puedes subir un justificante para esta falta',
                    life: 3000,
                  });
                }}
                disabled={isSuccess && file?.getAllFiles.docs.length > 0 && file.getAllFiles.docs[0].approvedBy !== null}
              />
              <Button
                icon="pi pi-eye"
                className="p-button-rounded mx-1"
                outlined
                onClick={() => {
                  setViewFile(file?.getAllFiles.docs[0]?.path || null);
                  setSelectedSchedule(null);
                }}
                disabled={!isSuccess || file?.getAllFiles.docs.length === 0}
              />
              <Button
                icon="pi pi-refresh"
                className="p-button-rounded mx-1"
                severity="secondary"
                onClick={forceReloadData}
                tooltip="Actualizar datos"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const headerTemplate = (options: any) => {
    const { className, chooseButton, cancelButton } = options;
    
    if (selectedSchedule !== null || viewFile !== null) {
      return (
        <div
          className={className}
          style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}
        >
          {chooseButton}
          <Button
            icon="pi pi-cloud-upload"
            className={`custom-upload-btn p-button-success p-button-rounded p-button-outlined ${buttonDisabled ? 'p-disabled' : ''}`}
            onClick={handleManualUpload}
            disabled={buttonDisabled || !selectedFile || !selectedSchedule}
            tooltip="Subir justificante"
            tooltipOptions={{ position: 'bottom' }}
          />
          {cancelButton}

          {uploadProgress > 0 && (
            <div className="flex align-items-center gap-2 ml-3">
              <span>Subiendo: {uploadProgress}%</span>
              <div 
                className="bg-primary" 
                style={{ 
                  height: '4px', 
                  width: '100px', 
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, var(--primary-color) ${uploadProgress}%, var(--surface-300) ${uploadProgress}%)`
                }} 
              />
            </div>
          )}

          {selectedFile && (
            <div className="flex align-items-center gap-2 ml-3">
              <i className="pi pi-file-pdf text-red-500"></i>
              <span className="text-sm">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}

          {file?.getAllFiles.docs[0]?.comments[0]?._id !== null ? (
            <div className="flex flex-column gap-2 ml-3">
              <div className="flex flex-column gap-1">
                <div className="text-2 font-bold text-900">Comentarios</div>
                <div className="text-1 text-700">
                  {file?.getAllFiles.docs[0]?.comments[0]?.comment}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div
        className={className}
        style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}
      />
    );
  };

  const itemTemplate = (doc: File, props: any) => {
    const object = URL.createObjectURL(doc);
    return (
      <div className="flex w-full h-full flex-grow-1">
        <iframe
          src={`${object}#toolbar=0&navpanes=0&scrollbar=0`}
          title="PDFDoc"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    if (file?.getAllFiles.docs.length > 0 && viewFile !== null) {
      return (
        <div className="flex w-full h-full flex-grow-1">
          <iframe
            src={`https://ssb.matehuala.tecnm.mx/asis_be${viewFile}#toolbar=0&navpanes=0&scrollbar=0`}
            title="PDFDoc"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      );
    }
    
    if (selectedSchedule === null) {
      return (
        <div className="flex align-items-center justify-content-center flex-column h-full">
          <i className="pi pi-exclamation-circle p-3" style={{ fontSize: '2em', color: 'var(--text-color-secondary)' }} />
          <span className="text-lg">No has seleccionado una asistencia que justificar</span>
          <span className="text-sm text-gray-500 mt-2">
            Selecciona una falta del historial para poder subir un justificante
          </span>
        </div>
      );
    }
    
    return (
      <div className="flex align-items-center justify-content-center flex-column h-full">
        <i
          className="pi pi-cloud-upload mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        />
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-3">
          Arrastra y suelta tu justificante aquí
        </span>
        <span className="text-sm text-gray-500">
          Formatos aceptados: PDF (Máximo 10MB)
        </span>
        {selectedSchedule && (
          <div className="mt-3 p-3 border-round bg-green-50 border-1 border-green-200">
            <i className="pi pi-info-circle text-green-600 mr-2"></i>
            <span className="text-green-700">Listo para subir justificante para la falta seleccionada</span>
          </div>
        )}
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: `custom-choose-btn p-button-rounded p-button-outlined ${buttonDisabled ? 'p-disabled' : ''}`,
    disabled: buttonDisabled,
  };
  
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: `custom-cancel-btn p-button-danger p-button-rounded p-button-outlined ${buttonDisabled ? 'p-disabled' : ''}`,
    disabled: buttonDisabled,
  };

  return (
    <div>
      <Dialog
        header={headerTitle}
        visible={visible}
        style={{ width: '85rem', height: '70rem' }}
        onHide={() => {
          setVisible(false);
          setSelectedSchedule(null);
          setSelectedFile(null);
          setUploadProgress(0);
        }}
      >
        <div className="grid h-full">
          <div className="col-4 flex flex-column h-full">
            <Card title="Historial" className="p-4 flex-grow-1">
              {isLoadingAttendances ? (
                <div className="flex align-items-center justify-content-center h-4rem">
                  <i className="pi pi-spin pi-spinner mr-2"></i>
                  Cargando asistencias...
                </div>
              ) : status?.getAllAttendances.docs.length === 0 ? (
                <div className="flex align-items-center justify-content-center h-4rem text-gray-500">
                  No hay faltas registradas para este docente.
                </div>
              ) : (
                <DataView value={status?.getAllAttendances.docs} itemTemplate={itemTemplate2} />
              )}
            </Card>
          </div>
          <div className="col-8 flex flex-column h-full">
            <Toast ref={toast} />

            <Tooltip target=".custom-choose-btn" content="Seleccionar archivo" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Subir justificante" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Limpiar selección" position="bottom" />

            <FileUpload
              name="Document"
              accept="application/pdf"
              maxFileSize={10000000}
              customUpload
              uploadHandler={onTemplateUpload}
              onSelect={onTemplateSelect}
              onError={onUploadError}
              onClear={onTemplateClear}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              cancelOptions={cancelOptions}
              className="flex-grow-1"
              disabled={buttonDisabled}
              auto
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}