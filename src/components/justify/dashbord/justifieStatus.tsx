import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { IAttendanceStatus, useGetAllAttendancesQuery } from '../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';

export default function JustifyStatus(id: string, onVisibilityChange: (visible: boolean) => void) {
  const [visible, setVisible] = useState(false);
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

  const handleClick = () => {
    setVisible(true);
    onVisibilityChange(true);
  };

  return (
    <div>
      {status?.getAllAttendances.docs.length > 0 ? (
        <Button
          icon="pi pi-exclamation-circle"
          className="p-button-rounded p-button-raised p-button-warning"
          onClick={handleClick}
        >
          <Badge value={status?.getAllAttendances.docs.length} severity="danger" />
        </Button>
      ) : (
        <div className="flex justify-content-between align-items-center">
          <Button
            icon="pi pi-check"
            className="p-button-rounded p-button-raised p-button-success"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}
