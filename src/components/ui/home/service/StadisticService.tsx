import {
  IRoles,
  IUser,
  useGetAllUsersQuery,
  useGetAttendanceStatisticsQuery,
  useGetUniqueOptionsCareerQuery,
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

  const { data: users } = useGetAllUsersQuery(GRAPHQL_CLIENT, {
    page: 1,
    limit: 500,
    offset: 0,
    filter: {
      roles: [IRoles.Docente],
    },
  });

  const datosDocente = users?.getAllUsers.docs.map((user: IUser) => ({
    id: user._id,
    fullname: `${user.firstName} ${user.lastName} ${user.middleName}`,
  }));

  // const DatosCareera = careerOptionsData?.getUniqueOptionsCareer.careers.map((career) => {
  //   const datacareer = useGetAttendanceStatisticsQuery(GRAPHQL_CLIENT, {
  //     career: career.value,
  //   });
  //   return {
  //     name: career.label,
  //     absent: datacareer.data?.getAttendanceStatistics.classAbsentPeriod,
  //     present: datacareer.data?.getAttendanceStatistics.classPresentPeriod,
  //     justify: datacareer.data?.getAttendanceStatistics.classJustifyPeriod,
  //   };
  // });

  return { careerOptionsData, attendanceStatistics, datosDocente };
};
