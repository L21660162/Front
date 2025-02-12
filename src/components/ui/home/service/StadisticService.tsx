import {
  useGetUniqueOptionsCareerQuery,
  useGetAttendanceStatisticsQuery,
  IGetAttendanceStatisticsQuery,
  IGetUniqueOptionsCareerQuery,
} from '../../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

// eslint-disable-next-line import/prefer-default-export
export const StadisticServices = (
  career: string | null,
  department: string | null,
  semester: string | null,
  period: string | null,
  teacher: string | null
) => {
  const { data: careerOptionsData } = useGetUniqueOptionsCareerQuery(GRAPHQL_CLIENT);

  const { data: attendanceStatistics } = useGetAttendanceStatisticsQuery(GRAPHQL_CLIENT, {
    career,
    department,
    semester,
    period,
    teacher,
  });

  return { careerOptionsData, attendanceStatistics };
};
