import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { IAttendanceStatus, useGetAllAttendancesQuery } from '../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';

export default function JustifyStatus(id: string) {
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

  return (
    <div>
      {status?.getAllAttendances.docs.length > 0 ? (
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-raised p-button-success"
          onClick={() => setVisible(true)}
        />
      ) : (
        <div className="flex justify-content-between align-items-center">
          <div className="text-500 text-2xl">Listo</div>
        </div>
      )}
    </div>
  );
}
