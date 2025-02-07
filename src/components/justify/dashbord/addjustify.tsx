import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { DataView } from 'primereact/dataview';
import {
  IAttendance,
  IAttendanceStatus,
  IFileType,
  ISchedulesFormatted,
  IUploadFileInput,
  useGetAllAttendancesQuery,
  useGetAllFilesQuery,
  useGetSchedulesFormattedQuery,
  useUploadFileMutation,
} from '../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { DialogStore } from '../../../store/global/types';
import { Card } from 'primereact/card';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { IApiError } from '../../../../types/apierror';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const navigate = useNavigate({ from: '/justify/dashboard' });
  const [selectedSchedule, setSelectedSchedule] = useState<null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate } = useUploadFileMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.profileEditSuccess'),
      });
      setTimeout(() => {
        navigate({ to: '/justify/dashboard' });
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

  const { data: status } = useGetAllAttendancesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      schedule: id,
      firstPass: IAttendanceStatus.Absent,
      secondPass: IAttendanceStatus.Absent,
    },
  });

  const { data: file } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      attendanceJustified: status?.getAllAttendances.docs[0].userId,
    },
  });

  

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<IUploadFileInput>({
    defaultValues: {
      file: null,
      fileType: null,
      userId: null,
    },
  });

  useEffect(() => {
    if (selectedFile) {
      setValue('file', selectedFile);
      setValue('fileType', selectedFile.type);
      setValue('userId', status?.getAllAttendances.docs[0].userId);
    }
  }, [selectedFile, setValue]);

  const onSubmit: SubmitHandler<IUploadFileInput> = (data: IUploadFileInput) => {
    setButtonDisabled(true);
    data.file = selectedFile;
    mutate({ data });
    reset();
  };

  const { data: scheduledata } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
    schedule: status?.getAllAttendances.docs[0].schedule,
  });

  const itemTemplate2 = (data: IAttendance) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2 font-bold text-900">
                  {scheduledata?.getSchedulesFormatted[0].subjectShortName}
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
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                onClick={() => setSelectedSchedule(data._id)}
              ></Button>
              <span className="text-2xl font-semibold">Hola</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    const selected = e.files[0];
    setSelectedFile(selected);

    if (selected) {
      setImage(selected);
      setLogo(URL.createObjectURL(selected));
    } else {
      setImage(null);
      setLogo(initialImageUrl);
    }
    console.log('Hola, desde el select');
  };

  const onTemplateUpload = (e) => {
    console.log('Hola, antes ', selectedFile);
    mutate({ data: { 
      file: selectedFile,
      userId: scheduledata?.getSchedulesFormatted[0].teacherId,
      fileType: IFileType.Justificante } });
    
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    if (selectedSchedule === null) {
      return (
        <div
          className={className}
          style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}
        ></div>
      );
    }
    return (
      <div
        className={className}
        style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    const object = URL.createObjectURL(file);
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
    if (selectedSchedule === null) {
      return (
        <div className="flex align-items-center flex-column">
          <i className="pi pi-exclamation-circle p-3" style={{ fontSize: '2em' }}></i>
          <span>No has seleccionado una asistencia que justificar</span>
        </div>
      );
    }
    return (
      <div className="flex align-items-center h-full">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        />
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div>
      <Dialog
        header={headerTitle}
        visible={visible}
        style={{ width: '85rem', height: '70rem' }}
        onHide={() => setVisible(false)}
      >
        <div className="grid h-full">
          <div className="col-4 flex flex-column h-full">
            <Card title="Historial" className="p-4 flex-grow-1">
              <DataView value={status?.getAllAttendances.docs} itemTemplate={itemTemplate2} />
            </Card>
          </div>
          <div className="col-8 flex flex-column h-full">
            <Toast ref={toast} />

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload
              name="Document"
              url="http://localhost:4000/graphql"
              accept="application/pdf"
              customUpload
              uploadHandler={async ({ files }) => {
                onTemplateUpload(files);
              } }
              onSelect={onTemplateSelect}
              onError={onTemplateClear}
              onClear={onTemplateClear}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
              className="flex-grow-1"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
