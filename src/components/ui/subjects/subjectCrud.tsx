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
  IGetAllSubjectsQuery,
  ISubject,
  useDeleteSubjectMutation,
  useGetAllSubjectsQuery,
  useGetDepartmentByIdQuery,
  useGetSubjectByIdQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditSubjectDialogForm from '../../forms/subjects/dashboard/editSubject';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function SubjectCrud() {
  const emptySubject: ISubject = {
    areaKey: '',
    largeName: '',
    schoolarLevel: '',
    shortName: '',
    subjectType: 0,
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const { roles } = useAccessTokenData() as TokenData;

  const [subjects, setSubjects] = useState(null);
  const [deleteSubjectDialog, setDeleteSubjectDialog] = useState(false);
  const [subject, setSubject] = useState<Demo.IGetAllSubjectsQuery.docs>(emptySubject);
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
  const [visibleEditSubject, setVisibleEditSubject] = useState(false);
  

  const { data } = useGetAllSubjectsQuery<IGetAllSubjectsQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
  });

  const { mutate } = useDeleteSubjectMutation<IApiError>(GRAPHQL_CLIENT, {
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        summary: t('global.toast.success.summary'),
        detail: t('global.toast.success.detail.careerDeleteSuccess'),
      });

      setTimeout(() => {
        navigate({ to: '/settings/career' });
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

  const hideDeleteCareerDialog = () => {
    setDeleteSubjectDialog(false);
  };

  const editCareer = (subject_camp: ISubject) => {
    setSelectedSubject(subject_camp);
    setVisibleEditSubject(true);
  };

  const confirmDeleteCareer = (subject_camp: ISubject) => {
    setSubject(subject_camp);
    setDeleteSubjectDialog(true);
  };

  const deleteCareer = () => {
    const _subjectId = subject._id;
    setSubjects(_subjectId);
    mutate({ data: { _id: _subjectId } });
    setDeleteSubjectDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (subject_camp: ISubject) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {subject_camp.largeName}
      </>
    );
  };

  const descriptionBodyTemplate = (subject_camp: ISubject) => {
    return (
      <>
        <span className="p-column-title">Abrebiatura</span>
        {subject_camp.shortName}
      </>
    );
  };

  const durationBodyTemplate = (subject_camp: ISubject) => {
    const schoolarLevel = [
      { label: 'Bachillerato', value: 'B' },
      { label: 'Licenciatura', value: 'L' },
      { label: 'Postgrado', value: 'P' },
    ];

    const schoolarLevelFilter = schoolarLevel.filter(
      (item) => item.value === subject_camp.schoolarLevel
    );
    return (
      <>
        <span className="p-column-title">Nivel</span>
        {schoolarLevelFilter[0].label}
      </>
    );
  };

  const creditsBodyTemplate = (subject_camp: ISubject) => {
    const { data } = useGetDepartmentByIdQuery(GRAPHQL_CLIENT, {
      id: subject_camp.areaKey,
    });

    return (
      <>
        <span className="p-column-title">Departamento</span>
        {data?.getDepartmentById.name}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.career) => {
    return (
      <div className="flex align-items-center">
        <Button
          icon="pi pi-pencil"
          className="mb-2"
          rounded
          outlined
          severity="warning"
          onClick={() => editCareer(rowData)}
          style={{ marginRight: '10px' }}
        />
        {roles.includes('SUPER_ADMINISTRATOR') && (
          <Button
            icon="pi pi-trash"
            className="mb-2"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteCareer(rowData)}
          />
        )}
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{t('global.dictionary.subjectdirectory')}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Búsqueda"
        />
      </span>
    </div>
  );

  const deletecareerDialogFooter = () => (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteCareerDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteCareer} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />

          {selectedSubject && visibleEditSubject && (
            <EditSubjectDialogForm
              headerTitle={t('module.subject.dashboard.dialog.edit.header')}
              visible={visibleEditSubject}
              setVisible={setVisibleEditSubject}
              subject={selectedSubject}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllSubjects.docs}
            selection={selectedSubjects}
            onSelectionChange={(e) => setSelectedSubjects(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} Materias"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nocareer')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.largeName')}
              sortable
              body={nameBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="description"
              header={t('global.dictionary.shortName')}
              sortable
              body={descriptionBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="duration"
              header={t('global.dictionary.schoolarLevel')}
              sortable
              body={durationBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              field="institute"
              header={t('global.dictionary.areaKey')}
              sortable
              body={creditsBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'left' }}
            />
            <Column
              body={actionBodyTemplate}
              header="Editar / Borrar"
              headerStyle={{
                minWidth: '10rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
            />
          </DataTable>

          <Dialog
            visible={deleteSubjectDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deletecareerDialogFooter}
            onHide={hideDeleteCareerDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {subject && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{subject.largeName}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default SubjectCrud;
