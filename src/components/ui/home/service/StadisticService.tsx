import {
  IGetUniqueOptionsCareerQuery,
  IQueryGetAttendanceStatisticsArgs,
  useGetAttendanceStatisticsQuery,
  useGetUniqueOptionsCareerQuery,
} from '../../../../graphql/graphql';
import { GRAPHQL_CLIENT } from '../../../../utils/graphqlClient';

const useStadisticService = () => {
  const useToFilterCarrer = (): IGetUniqueOptionsCareerQuery => {
    const { data } = useGetUniqueOptionsCareerQuery(GRAPHQL_CLIENT);
    return data as IGetUniqueOptionsCareerQuery;
  };

  const useAttendancesStadistic = (
    career: string,
    period: string,
    semester: string,
    teacher: string
  ): IQueryGetAttendanceStatisticsArgs => {
    const { data } = useGetAttendanceStatisticsQuery(GRAPHQL_CLIENT, {
      career: career || null,
      period: period || null,
      semester: semester || null,
      teacher: teacher || null,
    });
    return data as IQueryGetAttendanceStatisticsArgs;
  };

  return { useToFilterCarrer, useAttendancesStadistic };
};

export default useStadisticService;
