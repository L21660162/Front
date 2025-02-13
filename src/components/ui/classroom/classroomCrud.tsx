/* eslint-disable @next/next/no-img-element */

'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Demo } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  IClassroom,
  IGetAllClassroomsQuery,
  useDeleteClassroomMutation,
  useGetAllClassroomsQuery,
  useGetAllBuildingsQuery, 
  IGetAllBuildingsQuery
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import { dialogStore } from '../../../store/global/dialogStore';
import EditClassroomDialogForm from '../../forms/classroom/dashboard/editClassroom';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function ClassroomCrud() {
  const emptyClassroom: IClassroom = {
    building: '',
    identifier: '',
    _id: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    deletedAt: undefined,
  };

  const [buildings, setBuildings] = useState<Array<{ _id: string; name: string }>>([]);
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/career/dashboard' });

  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [deleteClassroomDialog, setDeleteClassroomDialog] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<IClassroom | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<IClassroom[]>>(null);
  const [visibleEditClassroom, setVisibleEditClassroom] = useState(false);

  const { data, refetch } = useGetAllClassroomsQuery<IGetAllClassroomsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { data: buildingsData } = useGetAllBuildingsQuery<IGetAllBuildingsQuery>(
    GRAPHQL_CLIENT,
    { 
      limit: 500,
      page: 1,
      offset: 0 
    }
  );

  const { mutate } = useDeleteClassroomMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.deleteSuccess'),
      });

      refetch(); // Recargar datos después de eliminar
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
    if (data?.getAllClassrooms.docs) {
      setClassrooms(data.getAllClassrooms.docs);
    }
  }, [data]);

  useEffect(() => {
    if (buildingsData?.getAllBuildings.docs) {
      setBuildings(buildingsData.getAllBuildings.docs);
    }
  }, [buildingsData]);

  useEffect(() => {
    if (data?.getAllClassrooms.docs && buildings.length > 0) {
      const classroomsWithBuildingNames = data.getAllClassrooms.docs.map(classroom => ({
        ...classroom,
        building: buildings.find(b => b._id === classroom.building)?.name || 'Unknown'
      }));
      
      setClassrooms(classroomsWithBuildingNames);
    }
  }, [data, buildings]); // Añadimos buildings como dependencia

  const hideDeleteClassroomDialog = () => {
    setDeleteClassroomDialog(false);
  };

  const editClassroom = (classroom: IClassroom) => {
    setSelectedClassroom(classroom);
    setVisibleEditClassroom(true);
  };

  const confirmDeleteClassroom = (classroom: IClassroom) => {
    setSelectedClassroom(classroom);
    setDeleteClassroomDialog(true);
  };

  const deleteClassroom = () => {
    if (selectedClassroom?._id) {
      mutate({ data: { _id: selectedClassroom._id } });
    }
    setDeleteClassroomDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (classroom: IClassroom) => {
    return (
      <>
        <span className="p-column-title">Building</span>
        {classroom.building} {/* Ahora mostrará el nombre */}
      </>
    );
  };

  const descriptionBodyTemplate = (classroom: IClassroom) => {
    return (
      <>
        <span className="p-column-title">Identifier</span>
        {classroom.identifier}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IClassroom) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editClassroom(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => confirmDeleteClassroom(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.classroomDirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteClassroomDialogFooter = (
    <>
      <Button 
        label={t('global.confirmation.no')} 
        icon="pi pi-times" 
        text 
        onClick={hideDeleteClassroomDialog} 
      />
      <Button 
        label={t('global.confirmation.yes')} 
        icon="pi pi-check" 
        text 
        onClick={deleteClassroom} 
      />
    </>
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
            selection={selectedClassroom}
            onSelectionChange={(e) => setSelectedClassroom(e.value as IClassroom | null)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={t('global.paginator.classroomReport')}
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.noClassroomsFound')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="building"
              header={t('global.dictionary.tClassroomBuilding')}
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column
              field="identifier"
              header={t('global.dictionary.tClassroomIdentifier')}
              sortable
              body={descriptionBodyTemplate}
              headerStyle={{ minWidth: '15rem' }}
            />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
          </DataTable>

          <Dialog
            visible={deleteClassroomDialog}
            style={{ width: '450px' }}
            header={t('global.confirmation.deleteTitle')}
            modal
            footer={deleteClassroomDialogFooter}
            onHide={hideDeleteClassroomDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {selectedClassroom && (
                      <span>
                      {t('global.confirmation.deleteMessage', {
                        building: selectedClassroom.building,
                        identifier: selectedClassroom.identifier
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