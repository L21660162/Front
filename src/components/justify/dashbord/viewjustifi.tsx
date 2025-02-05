import React, { PropsWithChildren, useEffect, useState } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import {
  IAttendance,
  IGetSchedulesFormattedQuery,
  ISchedule,
  ISchedulesFormatted,
  useGetAllAttendancesQuery,
  useGetAllFilesQuery,
  useGetScheduleByIdQuery,
  useGetSchedulesFormattedQuery,
} from '../../../graphql/graphql';

import { GRAPHQL_CLIENT } from '../../../utils/graphqlClient';
import { DialogStore } from '../../../store/global/types';
import { Tag } from 'primereact/tag';
import { dialogStore } from '../../../store/global/dialogStore';
import Addjustify from './addjustify';

type JustifyFormProps = {
  headerTitle: string;
  id: string;
  schedule: string;
};
type JustifyFormPropsAndDialogStore = JustifyFormProps & DialogStore;

export default function ViewJustify({
  headerTitle,
  visible,
  setVisible,
  id,
}: PropsWithChildren<JustifyFormPropsAndDialogStore>) {
  const [attendance, setAttendance] = useState<any[]>([]);
  let scheduleData: Array<ISchedulesFormatted> = [];

  const { data: status, isSuccess } = useGetAllAttendancesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 500,
    offset: 0,
    filter: {
      schedule: id,
    },
  });

  const { data: scheduledata } = useGetSchedulesFormattedQuery(GRAPHQL_CLIENT, {
    schedule: id,
  });

  if (scheduledata) {
    scheduleData = scheduledata.getSchedulesFormatted;
  }

  console.log('scheduleData', scheduleData[0].startTime);

  const { data: file } = useGetAllFilesQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 10,
    offset: 0,
    filter: {
      attendanceJustified: status?.getAllAttendances.docs[0]._id,
    },
  });

  const itemTemplate = (data: IAttendance) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2 font-bold text-900">{scheduleData[0].subjectShortName}</div>
                <div className="text-1 text-700">
                  {scheduleData[0].startTime} - {scheduleData[0].finalTime}
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Dialog
        header={headerTitle}
        visible={visible}
        style={{ width: '35rem' }}
        onHide={() => setVisible(false)}
      >
        <DataView value={status?.getAllAttendances.docs} itemTemplate={itemTemplate} />
      </Dialog>
    </div>
  );
}
