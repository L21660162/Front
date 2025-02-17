'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IClassroom,
  IGetAllClassroomsQuery,
  useDeleteClassroomMutation,
  useGetAllClassroomsQuery,
  useGetAllBuildingsQuery,
  IGetAllBuildingsQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditClassroomDialogForm from '../../forms/classroom/dashboard/editClassroom';

function ClassroomCrud() {
  const { t } = useTranslation('common');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<IClassroom[]>>(null);
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [deleteClassroomDialog, setDeleteClassroomDialog] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<IClassroom | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visibleEditClassroom, setVisibleEditClassroom] = useState(false);

  const { data, refetch } = useGetAllClassroomsQuery<IGetAllClassroomsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { data: buildingsData } = useGetAllBuildingsQuery<IGetAllBuildingsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteClassroomMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.ClassroomDeleteSuccess'),
      });
      refetch();
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

  useEffect(() => {
    if (data?.getAllClassrooms.docs && buildingsData?.getAllBuildings.docs) {
      const classroomsWithBuildingNames = data.getAllClassrooms.docs.map((classroom) => ({
        ...classroom,
        building:
          buildingsData.getAllBuildings.docs.find((b) => b._id === classroom.building)?.name ||
          t('global.dictionary.unknownBuilding'),
      }));
      setClassrooms(classroomsWithBuildingNames);
    }
  }, [data, buildingsData, t]);

  const buildingBodyTemplate = (classroom: IClassroom) => (
    <>
      <span className="p-column-title">{t('global.dictionary.building')}</span>
      {classroom.building}
    </>
  );

  const identifierBodyTemplate = (classroom: IClassroom) => (
    <>
      <span className="p-column-title">{t('global.dictionary.identifier')}</span>
      {classroom.identifier}
    </>
  );

  const actionBodyTemplate = (rowData: IClassroom) => (
    <div className="flex align-items-center">
      <Button
        icon="pi pi-pencil"
        className="mb-2"
        rounded
        outlined
        severity="warning"
        onClick={() => {
          setSelectedClassroom(rowData);
          setVisibleEditClassroom(true);
        }}
        style={{ marginRight: '10px' }}
      />
      <Button
        icon="pi pi-trash"
        className="mb-2"
        rounded
        outlined
        severity="danger"
        onClick={() => {
          setSelectedClassroom(rowData);
          setDeleteClassroomDialog(true);
        }}
      />
    </div>
  );

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.classroomDirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder={t('global.search.placeholder') || ''}
        />
      </span>
    </div>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedClassroom && visibleEditClassroom && (
            <EditClassroomDialogForm
              headerTitle={t('module.Classroom.dashboard.dialog.edit.header')}
              visible={visibleEditClassroom}
              setVisible={setVisibleEditClassroom}
              Classroom={selectedClassroom}
            />
          )}

          <DataTable
            ref={dt}
            value={classrooms}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.classroomReport') as string}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noClassroomsFound')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="building"
              header={t('global.dictionary.tClassroomBuilding')}
              sortable
              body={buildingBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="identifier"
              header={t('global.dictionary.tClassroomIdentifier')}
              sortable
              body={identifierBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
            <Column
              body={actionBodyTemplate}
              header={t('global.dictionary.actions')}
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>

          <Dialog
            visible={deleteClassroomDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={
              <>
                <Button
                  label={t('global.buttons.no')}
                  icon="pi pi-times"
                  text
                  onClick={() => setDeleteClassroomDialog(false)}
                />
                <Button
                  label={t('global.buttons.yes')}
                  icon="pi pi-check"
                  text
                  onClick={() => {
                    if (selectedClassroom?._id) {
                      mutate({ data: { _id: selectedClassroom._id } });
                    }
                    setDeleteClassroomDialog(false);
                  }}
                />
              </>
            }
            onHide={() => setDeleteClassroomDialog(false)}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem', color: '#e57373' }}
              />
              {selectedClassroom && (
                <span>
                  {t('global.confirmation.deleteTitle', {
                    identifier: <b>{selectedClassroom.identifier}</b>,
                    building: <b>{selectedClassroom.building}</b>,
                  })}
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ClassroomCrud;
