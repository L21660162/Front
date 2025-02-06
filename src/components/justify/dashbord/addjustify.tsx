import React, { PropsWithChildren, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { DataView } from 'primereact/dataview';
import { IAttendanceStatus, ISchedulesFormatted, useGetAllAttendancesQuery, useGetSchedulesFormattedQuery } from '../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { DialogStore } from '../../../store/global/types';
import { Card } from 'primereact/card';

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
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  let scheduleData: Array<ISchedulesFormatted> = [];

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

  const { data: scheduledata } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
    schedule: status?.getAllAttendances.docs[0].schedule,
  });

  console.log('scheduleData', scheduledata?.getSchedulesFormatted[0].startTime);

  const itemTemplate2 = (data: IAttendance) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2 font-bold text-900">{scheduledata?.getSchedulesFormatted[0].subjectShortName}</div>
                <div className="text-1 text-700">
                  {scheduledata?.getSchedulesFormatted[0].startTime} - {scheduledata?.getSchedulesFormatted[0].finalTime}
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2" />
          </div>
        </div>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div
        className={className}
        style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }} />
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    const object = URL.createObjectURL(file);
    return (
      <div className="flex w-full h-full flex-grow-1">
        <iframe
          src={object}
          title="PDFDoc"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
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
        style={{ width: '85rem', height: '50rem' }}
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
              ref={fileUploadRef}
              name="demo[]"
              url="/api/upload"
              multiple
              accept="pdf/*"
              onUpload={onTemplateUpload}
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