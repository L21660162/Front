'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Demo } from '../../../../types/types';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import {
  ICareer,
  IGetAllCareersQuery,
  useDeletedCareerMutation,
  useGetAllCareersQuery,
} from '../../../graphql/graphql';
import { IApiError } from '../../../../types/apierror';
import EditCareerDialogForm from '../../forms/career/dashboard/editcareer';
import { useAccessTokenData } from '../../../store/auth/store';
import { TokenData } from '../../../store/auth/type';

function CareerCrud() {
  const emptyCareer: ICareer = {
    credits: 0,
    description: '',
    duration: '',
    isCertified: false,
    name: '',
    _id: '',
    createdAt: undefined,
    isDeleted: false,
    updatedAt: undefined,
    abbreviationCareer: '',
  };
  const { t } = useTranslation('common');
  const navigate = useNavigate({ from: '/settings/career' });
  const { roles } = useAccessTokenData() as TokenData;

  const [careers, setCareers] = useState(null);
  const [deleteCareerDialog, setDeleteCareerDialog] = useState(false);
  const [career, setCareer] = useState<Demo.IGetAllCareersQuery.docs>(emptyCareer);
  const [selectedCareers, setSelectedCareers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
  const [selectedCareer, setSelectedCareer] = useState<ICareer | null>(null);
  const [visibleEditCareer, setVisibleEditCareer] = useState(false);

  const { data } = useGetAllCareersQuery<IGetAllCareersQuery>(GRAPHQL_CLIENT, {
    limit: 500,
    page: 1,
    offset: 0,
    filter: {
      isDeleted: false,
    },
  });

  const { mutate } = useDeletedCareerMutation<IApiError>(GRAPHQL_CLIENT, {
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
    setDeleteCareerDialog(false);
  };

  const editCareer = (career: ICareer) => {
    setSelectedCareer(career);
    setVisibleEditCareer(true);
  };

  const confirmDeleteCareer = (career: ICareer) => {
    setCareer(career);
    setDeleteCareerDialog(true);
  };

  const deleteCareer = () => {
    const _careers = career._id;
    setCareers(_careers);
    mutate({ data: { _id: _careers } });
    setDeleteCareerDialog(false);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const nameBodyTemplate = (career: ICareer) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {career.name}
      </>
    );
  };

  const descriptionBodyTemplate = (career: ICareer) => {
    return (
      <>
        <span className="p-column-title">Description</span>
        {career.description}
      </>
    );
  };

  const durationBodyTemplate = (career: ICareer) => {
    return (
      <>
        <span className="p-column-title">Duration</span>
        {career.duration}
      </>
    );
  };

  const creditsBodyTemplate = (career: ICareer) => {
    return (
      <>
        <span className="p-column-title">Credits</span>
        {career.credits}
      </>
    );
  };

  const certificateBodyTemplate = (career: ICareer) => {
    return (
      <i
        className={classNames('pi', {
          'text-green-500 pi-check-circle': career.isCertified,
          'text-pink-500 pi-times-circle': !career.isCertified,
        })}
      />
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
      <h5 className="m-0">{t('global.dictionary.careerdirectory')}</h5>
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

          {selectedCareer && visibleEditCareer && (
            <EditCareerDialogForm
              headerTitle={t('module.career.dashboard.dialog.edit.header')}
              visible={visibleEditCareer}
              setVisible={setVisibleEditCareer}
              career={selectedCareer}
            />
          )}

          <DataTable
            ref={dt}
            value={data?.getAllCareers.docs}
            selection={selectedCareers}
            onSelectionChange={(e) => setSelectedCareers(e.value as any)}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar del {first} al {last} de {totalRecords} carreras"
            globalFilter={globalFilter}
            emptyMessage={t('global.dictionary.Nocareer')}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header={t('global.dictionary.tcareerName')}
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
              header={t('global.dictionary.tcareerDescription')}
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
              header={t('global.dictionary.tduration')}
              sortable
              body={durationBodyTemplate}
              headerStyle={{
                minWidth: '15rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
              style={{ textAlign: 'center' }}
            />
            <Column
              field="institute"
              header={t('global.dictionary.tcredits')}
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
              field="certificate"
              header={t('global.dictionary.tisCertified')}
              dataType="boolean"
              style={{ minWidth: '8rem', textAlign: 'center' }}
              body={certificateBodyTemplate}
              headerStyle={{
                minWidth: '5rem',
                border: '1px solid #2a497b',
                backgroundColor: '#2a497b',
                color: 'white',
              }}
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
            visible={deleteCareerDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deletecareerDialogFooter}
            onHide={hideDeleteCareerDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {career && (
                <span>
                  ¿Estás seguro de que quieres eliminar <b>{career.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CareerCrud;
