import { IGetUniqueOptionsCareerQuery, IQueryGetAttendanceStatisticsArgs, useGetUniqueOptionsCareerQuery } from "../../../../graphql/graphql";
import { GRAPHQL_CLIENT } from "../../../../utils/graphqlClient";


export const StadisticService = {
     getToFilterCarrer(): IGetUniqueOptionsCareerQuery {
        const { data } = useGetUniqueOptionsCareerQuery(GRAPHQL_CLIENT);
        return data as IGetUniqueOptionsCareerQuery;
    },

    getAttendancesStadistic(): IQueryGetAttendanceStatisticsArgs {
        const { data } = useGet