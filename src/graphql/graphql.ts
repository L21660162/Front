import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/src/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  Upload: { input: any; output: any };
}

export interface IApproveFileInput {
  _id: Scalars['ID']['input'];
  approvedBy: Scalars['ID']['input'];
}

/** attendance */
export interface IAttendance {
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstPass: IAttendanceStatus;
  isDeleted: Scalars['Boolean']['output'];
  justificationId?: Maybe<Scalars['ID']['output']>;
  justifyBy?: Maybe<IJustifyBy>;
  period: Scalars['ID']['output'];
  schedule: Scalars['ID']['output'];
  secondPass: IAttendanceStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadedBy: Scalars['ID']['output'];
}

export interface IAttendanceArgs {
  firstPass?: InputMaybe<IAttendanceStatus>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  schedule?: InputMaybe<Scalars['ID']['input']>;
  secondPass?: InputMaybe<IAttendanceStatus>;
  uploadedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IAttendanceIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Define the attendance status */
export enum IAttendanceStatus {
  /** Ausente */
  Absent = 'ABSENT',
  /** Falta justificada */
  Justify = 'JUSTIFY',
  /** Asistencia Pendiente */
  Pending = 'PENDING',
  /** Presente */
  Present = 'PRESENT',
}

/** building */
export interface IBuilding {
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  letter?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  picturePath?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface IBuildingArgs {
  keyword?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
}

export interface IBuildingIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Career */
export interface ICareer {
  _id: Scalars['ID']['output'];
  abbreviationCareer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  credits: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  isCertified: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
}

export interface ICareerArgs {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface ICareerIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
}

/** Change password for user input */
export interface IChangePasswordInput {
  _id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}

/** classroom */
export interface IClassroom {
  _id: Scalars['ID']['output'];
  building: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  identifier: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  picturePath?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface IClassroomArgs {
  building?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}

export interface IClassroomIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create career */
export interface ICreateCareerInput {
  abbreviationCareer: Scalars['String']['input'];
  active?: Scalars['Boolean']['input'];
  credits: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  isCertified: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['ID']['input']>;
}

/** CreateFile */
export interface ICreateFile {
  attendanceJustified: Scalars['ID']['input'];
  extension: Scalars['String']['input'];
  nameFile: Scalars['String']['input'];
  path: Scalars['String']['input'];
  size: Scalars['Float']['input'];
  type: IFileType;
  uploadedBy: Scalars['ID']['input'];
}

/** Create file comment */
export interface ICreateFileCommentInput {
  comment: Scalars['String']['input'];
  createdBy: Scalars['String']['input'];
  fileId: Scalars['ID']['input'];
}

/** Organization */
export interface IDepartment {
  _id: Scalars['ID']['output'];
  /** CLAVE DE LA ORGANIZACION */
  areaKey: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** JEFE DE LA ORGANIZACION */
  departmentBoss: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  /** NOMBRE DE LA ORGANIZACION */
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
}

export interface IDepartmentArgs {
  areaKey?: InputMaybe<Scalars['String']['input']>;
  bossId?: InputMaybe<Scalars['ID']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface IDepartmentIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** event */
export interface IEvent {
  _id: Scalars['ID']['output'];
  activity: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  finishDate: Scalars['DateTime']['output'];
  groupsIncluded: Array<Scalars['ID']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  period: Scalars['ID']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadedBy: Scalars['ID']['output'];
}

export interface IEventArgs {
  finishDate?: InputMaybe<Scalars['DateTime']['input']>;
  groupsIncluded?: InputMaybe<Array<Scalars['ID']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  uploadedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IEventIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** File */
export interface IFile {
  _id: Scalars['ID']['output'];
  approvedBy?: Maybe<Scalars['JSON']['output']>;
  attendanceJustified?: Maybe<Scalars['ID']['output']>;
  comments?: Maybe<Array<IFileComment>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  extension: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  nameFile: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  type: IFileType;
  updatedAt: Scalars['DateTime']['output'];
  uploadedBy: IUser;
}

export interface IFileArgs {
  attendanceJustified?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileType?: InputMaybe<Array<IFileType>>;
  filename?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  uploadedBy?: InputMaybe<Scalars['String']['input']>;
}

/** Comments for file rejected */
export interface IFileComment {
  _id?: Maybe<Scalars['ID']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['JSON']['output']>;
}

export interface IFileIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Define the file type that was uploaded by the student */
export enum IFileType {
  /** Justificante */
  Justificante = 'JUSTIFICANTE',
  /** Reporte en Excel */
  ReporteExcel = 'REPORTE_EXCEL',
  /** Reporte en PDF */
  ReportePdf = 'REPORTE_PDF',
}

/** Object type for dashboard statistics */
export interface IGeneralStatistics {
  classAbsentDay: Scalars['Float']['output'];
  classAbsentMonth: Scalars['Float']['output'];
  classAbsentPeriod: Scalars['Float']['output'];
  classAbsentSemester: Scalars['Float']['output'];
  classAbsentYear: Scalars['Float']['output'];
  classJustifyDay: Scalars['Float']['output'];
  classJustifyMonth: Scalars['Float']['output'];
  classJustifyPeriod: Scalars['Float']['output'];
  classJustifySemester: Scalars['Float']['output'];
  classJustifyYear: Scalars['Float']['output'];
  classPresentDay: Scalars['Float']['output'];
  classPresentMonth: Scalars['Float']['output'];
  classPresentPeriod: Scalars['Float']['output'];
  classPresentSemester: Scalars['Float']['output'];
  classPresentYear: Scalars['Float']['output'];
  weekday1: Scalars['Float']['output'];
  weekday2: Scalars['Float']['output'];
  weekday3: Scalars['Float']['output'];
  weekday4: Scalars['Float']['output'];
  weekday5: Scalars['Float']['output'];
  weekday6: Scalars['Float']['output'];
  weekday7: Scalars['Float']['output'];
}

/** group */
export interface IGroup {
  _id: Scalars['ID']['output'];
  career: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  identifier: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  period: Scalars['ID']['output'];
  semester: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface IGroupArgs {
  career?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  semester?: InputMaybe<Scalars['String']['input']>;
}

export interface IGroupIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IGrupos {
  career: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  period: Scalars['String']['output'];
  semester: Scalars['String']['output'];
}

export interface IHorarios {
  classGroup: Scalars['String']['output'];
  classroom: Scalars['String']['output'];
  finalTime: Scalars['String']['output'];
  period: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  teacher: Scalars['String']['output'];
  weekday: Scalars['String']['output'];
}

/** Define the reason of justification */
export enum IJustifyBy {
  /** Justificado por evento */
  Event = 'EVENT',
  /** Justificado por archivo */
  File = 'FILE',
}

/** Model for access token after user refresh token */
export interface IJwtAccessToken {
  accessToken: Scalars['String']['output'];
  accessTokenExpiresIn: Scalars['String']['output'];
  type: Scalars['String']['output'];
}

/** Model for access and refresh token after user SignIn */
export interface IJwtUserTokens {
  accessToken: Scalars['String']['output'];
  accessTokenExpiresIn: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenExpiresIn: Scalars['String']['output'];
  type: Scalars['String']['output'];
}

export interface IMaterias {
  areaKey: Scalars['String']['output'];
  largeName: Scalars['String']['output'];
  schoolarLevel: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  subjectType: Scalars['Float']['output'];
}

export interface IMutation {
  approveFile: IFile;
  changePassword: IUser;
  createAttendance: IAttendance;
  createBuilding: IBuilding;
  createCareer: ICareer;
  createClassroom: IClassroom;
  createDepartment: IDepartment;
  createEvent: IEvent;
  createFile: IFile;
  createFileComment: IFile;
  createGroup: IGroup;
  createPeriod: IPeriod;
  createSchedule: ISchedule;
  createSubject: ISubject;
  deleteAttendance: ISoftDeleteResponse;
  deleteBuilding: ISoftDeleteResponse;
  deleteClassroom: ISoftDeleteResponse;
  deleteDepartment: ISoftDeleteResponse;
  deleteEvent: ISoftDeleteResponse;
  deleteGroup: ISoftDeleteResponse;
  deletePeriod: ISoftDeleteResponse;
  deleteSchedule: ISoftDeleteResponse;
  deleteSubject: ISoftDeleteResponse;
  deleteUser: ISoftDeleteResponse;
  deletedCareer: ISoftDeleteResponse;
  deletedFile: ISoftDeleteResponse;
  importGroups: Array<IGroup>;
  importPeriods: Array<IPeriod>;
  importSchedules: Array<ISchedule>;
  importSubjects: Array<ISubject>;
  importTeachers: Array<IUser>;
  passwordRecovery: Scalars['String']['output'];
  passwordReset: IUser;
  signIn: IJwtUserTokens;
  signOut: Scalars['Boolean']['output'];
  signUp: IUser;
  updateAttendance: IAttendance;
  updateBuilding: IBuilding;
  updateCareer: ICareer;
  updateClassroom: IClassroom;
  updateDepartment: IDepartment;
  updateEvent: IEvent;
  updateFile: IFile;
  updateGroup: IGroup;
  updatePeriod: IPeriod;
  updateSchedule: ISchedule;
  updateSubject: ISubject;
  updateUser: IUser;
  uploadBuildingPicture: IBuilding;
  uploadClassroomPicture: IClassroom;
  uploadFile: IFile;
  upsertUser: IUser;
}

export interface IMutationApproveFileArgs {
  data: IApproveFileInput;
}

export interface IMutationChangePasswordArgs {
  data: IChangePasswordInput;
}

export interface IMutationCreateAttendanceArgs {
  data: IUpsertAttendanceInput;
}

export interface IMutationCreateBuildingArgs {
  data: IUpsertBuildingInput;
}

export interface IMutationCreateCareerArgs {
  data: ICreateCareerInput;
}

export interface IMutationCreateClassroomArgs {
  data: IUpsertClassroomInput;
}

export interface IMutationCreateDepartmentArgs {
  data: ICreateDepartmentInput;
}

export interface IMutationCreateEventArgs {
  data: IUpsertEventInput;
}

export interface IMutationCreateFileArgs {
  data: ICreateFile;
}

export interface IMutationCreateFileCommentArgs {
  data: ICreateFileCommentInput;
}

export interface IMutationCreateGroupArgs {
  data: IUpsertGroupInput;
}

export interface IMutationCreatePeriodArgs {
  data: IUpsertPeriodInput;
}

export interface IMutationCreateScheduleArgs {
  data: IUpsertScheduleInput;
}

export interface IMutationCreateSubjectArgs {
  data: IUpsertSubjectInput;
}

export interface IMutationDeleteAttendanceArgs {
  data: IAttendanceIdArgs;
}

export interface IMutationDeleteBuildingArgs {
  data: IBuildingIdArgs;
}

export interface IMutationDeleteClassroomArgs {
  data: IClassroomIdArgs;
}

export interface IMutationDeleteDepartmentArgs {
  data: IDepartmentIdArgs;
}

export interface IMutationDeleteEventArgs {
  data: IEventIdArgs;
}

export interface IMutationDeleteGroupArgs {
  data: IGroupIdArgs;
}

export interface IMutationDeletePeriodArgs {
  data: IPeriodIdArgs;
}

export interface IMutationDeleteScheduleArgs {
  data: IScheduleIdArgs;
}

export interface IMutationDeleteSubjectArgs {
  data: ISubjectIdArgs;
}

export interface IMutationDeleteUserArgs {
  data: IUserIdArgs;
}

export interface IMutationDeletedCareerArgs {
  data: ICareerIdArgs;
}

export interface IMutationDeletedFileArgs {
  data: IFileIdArgs;
}

export interface IMutationPasswordRecoveryArgs {
  data: IPasswordRecoveryInput;
}

export interface IMutationPasswordResetArgs {
  data: IPasswordResetInput;
}

export interface IMutationSignInArgs {
  data: ISignInInput;
}

export interface IMutationSignOutArgs {
  data: IRefreshTokenInput;
}

export interface IMutationSignUpArgs {
  data: ISignUpInput;
}

export interface IMutationUpdateAttendanceArgs {
  data: IUpdateAttendanceInput;
}

export interface IMutationUpdateBuildingArgs {
  data: IUpdateBuildingInput;
}

export interface IMutationUpdateCareerArgs {
  data: IUpdateCareerInput;
}

export interface IMutationUpdateClassroomArgs {
  data: IUpdateClassroomInput;
}

export interface IMutationUpdateDepartmentArgs {
  data: IUpdateDepartmentInput;
}

export interface IMutationUpdateEventArgs {
  data: IUpdateEventInput;
}

export interface IMutationUpdateFileArgs {
  data: IUpdateFile;
}

export interface IMutationUpdateGroupArgs {
  data: IUpdateGroupInput;
}

export interface IMutationUpdatePeriodArgs {
  data: IUpdatePeriodInput;
}

export interface IMutationUpdateScheduleArgs {
  data: IUpdateScheduleInput;
}

export interface IMutationUpdateSubjectArgs {
  data: IUpdateSubjectInput;
}

export interface IMutationUpdateUserArgs {
  data: IUpdateUserInput;
}

export interface IMutationUploadBuildingPictureArgs {
  data: IUploadPictureBuildingInput;
}

export interface IMutationUploadClassroomPictureArgs {
  data: IUploadPictureClassroomInput;
}

export interface IMutationUploadFileArgs {
  data: IUploadFileInput;
}

export interface IMutationUpsertUserArgs {
  data: IUpsertUserInput;
}

/** Object type for paging results */
export interface IPaginateAttendance {
  docs: Array<IAttendance>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateBuilding {
  docs: Array<IBuilding>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateCareer {
  docs: Array<ICareer>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateClassroom {
  docs: Array<IClassroom>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateDepartment {
  docs: Array<IDepartment>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateEvent {
  docs: Array<IEvent>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Hydrated File document from MongoDB */
export interface IPaginateFile {
  docs: Array<IFile>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateGroup {
  docs: Array<IGroup>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginatePeriod {
  docs: Array<IPeriod>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateSchedule {
  docs: Array<ISchedule>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateSubject {
  docs: Array<ISubject>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Object type for paging results */
export interface IPaginateUser {
  docs: Array<IUser>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
}

/** Input for user password recovery */
export interface IPasswordRecoveryInput {
  email: Scalars['String']['input'];
}

/** Input for user password reset */
export interface IPasswordResetInput {
  password: Scalars['String']['input'];
  passwordRecoveryId: Scalars['String']['input'];
}

/** period */
export interface IPeriod {
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  finalDate: Scalars['DateTime']['output'];
  isDeleted: Scalars['Boolean']['output'];
  largeIdentifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shortIdentifier: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface IPeriodArgs {
  identifier?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}

export interface IPeriodIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IPeriodos {
  finalDate: Scalars['DateTime']['output'];
  largeIdentifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shortIdentifier: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
}

export interface IProfesores {
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  rfc: Scalars['String']['output'];
  roles: Array<IRoles>;
}

export interface IQuery {
  getAllAttendances: IPaginateAttendance;
  getAllBuildings: IPaginateBuilding;
  getAllCareers: IPaginateCareer;
  getAllClassrooms: IPaginateClassroom;
  getAllDepartments: IPaginateDepartment;
  getAllEvents: IPaginateEvent;
  getAllFiles: IPaginateFile;
  getAllGroups: IPaginateGroup;
  getAllPeriods: IPaginatePeriod;
  getAllSchedules: IPaginateSchedule;
  getAllSubjects: IPaginateSubject;
  getAllUsers: IPaginateUser;
  getAttendanceById: IAttendance;
  getAttendanceStatistics: IGeneralStatistics;
  getBuildingById: IBuilding;
  getById: IUser;
  getCareerById: ICareer;
  getClassroomById: IClassroom;
  getDepartmentById: IDepartment;
  getEventById: IEvent;
  getFileById: IFile;
  getGroupById: IGroup;
  getGrupos: Array<IGrupos>;
  getHorarios: Array<IHorarios>;
  getLastPeriod: IPeriod;
  getMaterias: Array<IMaterias>;
  getPeriodById: IPeriod;
  getPeriodos: Array<IPeriodos>;
  getProfesores: Array<IProfesores>;
  getScheduleById: ISchedule;
  getSchedulesByTimeRange: Array<ISchedule>;
  getSchedulesFormatted: Array<ISchedulesFormatted>;
  getSubjectById: ISubject;
  getUniqueOptionsCareer: IUniqueOptionsCareer;
  getUserById: IUser;
  me: IUser;
  refreshToken: IJwtAccessToken;
}

export interface IQueryGetAllAttendancesArgs {
  filter?: InputMaybe<IAttendanceArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllBuildingsArgs {
  filter?: InputMaybe<IBuildingArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllCareersArgs {
  filter?: InputMaybe<ICareerArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllClassroomsArgs {
  filter?: InputMaybe<IClassroomArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllDepartmentsArgs {
  filter?: InputMaybe<IDepartmentArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllEventsArgs {
  filter?: InputMaybe<IEventArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllFilesArgs {
  filter?: InputMaybe<IFileArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllGroupsArgs {
  filter?: InputMaybe<IGroupArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllPeriodsArgs {
  filter?: InputMaybe<IPeriodArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllSchedulesArgs {
  filter?: InputMaybe<IScheduleArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllSubjectsArgs {
  filter?: InputMaybe<ISubjectArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAllUsersArgs {
  filter?: InputMaybe<IUserArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}

export interface IQueryGetAttendanceByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetAttendanceStatisticsArgs {
  career?: InputMaybe<Scalars['ID']['input']>;
  department?: InputMaybe<Scalars['ID']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  semester?: InputMaybe<Scalars['String']['input']>;
  teacher?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetBuildingByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetCareerByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetClassroomByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetDepartmentByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetEventByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetFileByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetGroupByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetGruposArgs {
  actualPeriod: Scalars['String']['input'];
}

export interface IQueryGetHorariosArgs {
  actualPeriod: Scalars['String']['input'];
}

export interface IQueryGetPeriodByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetScheduleByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetSchedulesByTimeRangeArgs {
  classGroup: Array<Scalars['ID']['input']>;
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
  uploadedBy: Scalars['ID']['input'];
}

export interface IQueryGetSchedulesFormattedArgs {
  actualTime?: InputMaybe<Scalars['String']['input']>;
  classroom?: InputMaybe<Scalars['ID']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  schedule?: InputMaybe<Scalars['ID']['input']>;
  teacher?: InputMaybe<Scalars['ID']['input']>;
  uploadedBy?: InputMaybe<Scalars['ID']['input']>;
  weekday?: InputMaybe<Scalars['Float']['input']>;
}

export interface IQueryGetSubjectByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryGetUserByIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IQueryRefreshTokenArgs {
  data: IRefreshTokenInput;
}

/** Input for user refresh token or sign out */
export interface IRefreshTokenInput {
  refreshToken: Scalars['String']['input'];
}

/** Permisos disponibles para los usuarios */
export enum IRoles {
  /** Director académico */
  Director = 'DIRECTOR',
  /** Docente */
  Docente = 'DOCENTE',
  /** Jefe académico */
  JefeAcademico = 'JEFE_ACADEMICO',
  /** Prefecto */
  Prefecto = 'PREFECTO',
  /** Recursos humanos */
  Rrhh = 'RRHH',
  /** Super administrador */
  Sa = 'SA',
  /** Subdirector académico */
  Subdirector = 'SUBDIRECTOR',
}

/** schedule */
export interface ISchedule {
  _id: Scalars['ID']['output'];
  classGroup: Scalars['ID']['output'];
  classroom: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  finalTime: Scalars['DateTime']['output'];
  isDeleted: Scalars['Boolean']['output'];
  period: Scalars['ID']['output'];
  startTime: Scalars['DateTime']['output'];
  subject: Scalars['ID']['output'];
  teacher: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  weekday: Scalars['Float']['output'];
}

export interface IScheduleArgs {
  classGroup?: InputMaybe<Scalars['ID']['input']>;
  classroom?: InputMaybe<Scalars['ID']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  subject?: InputMaybe<Scalars['ID']['input']>;
  teacher?: InputMaybe<Scalars['ID']['input']>;
  weekday?: InputMaybe<Scalars['Float']['input']>;
}

export interface IScheduleIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Object type for dashboard statistics */
export interface ISchedulesFormatted {
  _id: Scalars['ID']['output'];
  buildingId: Scalars['String']['output'];
  buildingLetter: Scalars['String']['output'];
  buildingName: Scalars['String']['output'];
  classroomId: Scalars['String']['output'];
  classroomIdentifier: Scalars['String']['output'];
  finalTime: Scalars['DateTime']['output'];
  groupId: Scalars['String']['output'];
  groupIdentifier: Scalars['String']['output'];
  periodId: Scalars['String']['output'];
  periodName: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
  subjectId: Scalars['String']['output'];
  subjectLargeName: Scalars['String']['output'];
  subjectShortName: Scalars['String']['output'];
  teacherFirstName: Scalars['String']['output'];
  teacherId: Scalars['String']['output'];
  teacherLastName: Scalars['String']['output'];
  teacherMiddleName?: Maybe<Scalars['String']['output']>;
  teacherRfc: Scalars['String']['output'];
  weekday: Scalars['Float']['output'];
}

/** Input for user SignIn */
export interface ISignInInput {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

/** Input for user SignUp */
export interface ISignUpInput {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

/** Small data for careers */
export interface ISmallCareer {
  label: Scalars['String']['output'];
  value: Scalars['ID']['output'];
}

export interface ISoftDeleteResponse {
  deleted: Scalars['Float']['output'];
}

/** subject */
export interface ISubject {
  _id?: Maybe<Scalars['ID']['output']>;
  areaKey: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  largeName: Scalars['String']['output'];
  schoolarLevel: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  subjectType: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface ISubjectArgs {
  keyword?: InputMaybe<Scalars['String']['input']>;
  shortName: Scalars['String']['input'];
}

export interface ISubjectIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface ISubscription {
  importedUsers: Array<IUser>;
  userAdded: IUser;
}

/** Object type for options statistics */
export interface IUniqueOptionsCareer {
  careers: Array<ISmallCareer>;
  semesters: Array<Scalars['String']['output']>;
}

/** Update attendance info input */
export interface IUpdateAttendanceInput {
  _id: Scalars['ID']['input'];
  secondPass: IAttendanceStatus;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
  uploadedBy: Scalars['ID']['input'];
}

/** Update building info input */
export interface IUpdateBuildingInput {
  _id: Scalars['ID']['input'];
  letter: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update career */
export interface IUpdateCareerInput {
  _id?: InputMaybe<Scalars['ID']['input']>;
  abbreviationCareer?: InputMaybe<Scalars['String']['input']>;
  credits?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  isCertified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

/** Update classroom info input */
export interface IUpdateClassroomInput {
  _id: Scalars['ID']['input'];
  building: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update department */
export interface IUpdateDepartmentInput {
  _id: Scalars['ID']['input'];
  areaKey: Scalars['String']['input'];
  departmentBoss?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update event info input */
export interface IUpdateEventInput {
  _id: Scalars['ID']['input'];
  activity: Scalars['String']['input'];
  finishDate: Scalars['DateTime']['input'];
  groupsIncluded: Array<Scalars['ID']['input']>;
  startDate: Scalars['DateTime']['input'];
  uploadedBy: Scalars['ID']['input'];
}

/** UpdateFile */
export interface IUpdateFile {
  _id?: InputMaybe<Scalars['ID']['input']>;
  approvedBy: Scalars['String']['input'];
  attendanceJustified: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  namefile: Scalars['String']['input'];
  person: Scalars['String']['input'];
  ruserId?: InputMaybe<Scalars['ID']['input']>;
  size: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update group info input */
export interface IUpdateGroupInput {
  _id: Scalars['ID']['input'];
  career: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
  semester: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update period info input */
export interface IUpdatePeriodInput {
  _id: Scalars['ID']['input'];
  finalDate: Scalars['DateTime']['input'];
  largeIdentifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortIdentifier: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update schedule info input */
export interface IUpdateScheduleInput {
  _id: Scalars['ID']['input'];
  classroom: Scalars['ID']['input'];
  finalTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update subject info input */
export interface IUpdateSubjectInput {
  _id: Scalars['ID']['input'];
  areaKey: Scalars['ID']['input'];
  largeName: Scalars['String']['input'];
  schoolarLevel: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  subjectType: Scalars['Float']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Update user info input */
export interface IUpdateUserInput {
  _id: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['Upload']['input']>;
  rfc: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export interface IUploadFileInput {
  approvedBy?: InputMaybe<Scalars['ID']['input']>;
  attendanceJustified?: InputMaybe<Scalars['ID']['input']>;
  file: Scalars['Upload']['input'];
  fileType: IFileType;
  userId: Scalars['ID']['input'];
}

/** Upload picture of the building input */
export interface IUploadPictureBuildingInput {
  _id: Scalars['ID']['input'];
  picture: Scalars['Upload']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Upload picture of the classroom input */
export interface IUploadPictureClassroomInput {
  _id: Scalars['ID']['input'];
  picture: Scalars['Upload']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create attendance input */
export interface IUpsertAttendanceInput {
  firstPass: IAttendanceStatus;
  period: Scalars['ID']['input'];
  schedule: Scalars['ID']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
  uploadedBy: Scalars['ID']['input'];
}

/** Create building input */
export interface IUpsertBuildingInput {
  letter: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create classroom input */
export interface IUpsertClassroomInput {
  building: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create event input */
export interface IUpsertEventInput {
  activity: Scalars['String']['input'];
  finishDate: Scalars['DateTime']['input'];
  groupsIncluded: Array<Scalars['ID']['input']>;
  period: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
  uploadedBy: Scalars['ID']['input'];
}

/** Create group input */
export interface IUpsertGroupInput {
  career: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
  period: Scalars['ID']['input'];
  semester: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create period input */
export interface IUpsertPeriodInput {
  finalDate: Scalars['DateTime']['input'];
  largeIdentifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortIdentifier: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create schedule input */
export interface IUpsertScheduleInput {
  classGroup: Scalars['ID']['input'];
  classroom: Scalars['ID']['input'];
  finalTime: Scalars['DateTime']['input'];
  period: Scalars['ID']['input'];
  startTime: Scalars['DateTime']['input'];
  subject: Scalars['ID']['input'];
  teacher: Scalars['ID']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
  weekday: Scalars['Float']['input'];
}

/** Create subject input */
export interface IUpsertSubjectInput {
  areaKey: Scalars['ID']['input'];
  largeName: Scalars['String']['input'];
  schoolarLevel: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  subjectType: Scalars['Float']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create user with roles input */
export interface IUpsertUserInput {
  _id?: InputMaybe<Scalars['ID']['input']>;
  active?: Scalars['Boolean']['input'];
  department: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rfc: Scalars['String']['input'];
  roles?: InputMaybe<Array<IRoles>>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** user */
export interface IUser {
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  rfc: Scalars['String']['output'];
  roles: Array<IRoles>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
}

export interface IUserArgs {
  career?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['ID']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  rfc?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<IRoles>>;
}

export interface IUserIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

/** Create department */
export interface ICreateDepartmentInput {
  areaKey: Scalars['String']['input'];
  departmentBoss?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
}

export type IGetAllAttendancesQueryVariables = Exact<{
  filter?: InputMaybe<IAttendanceArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllAttendancesQuery = {
  getAllAttendances: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      firstPass: IAttendanceStatus;
      isDeleted: boolean;
      period: string;
      schedule: string;
      secondPass: IAttendanceStatus;
      updatedAt?: any | null;
      uploadedBy: string;
    }>;
  };
};

export type ISignUpMutationVariables = Exact<{
  data: ISignUpInput;
}>;

export type ISignUpMutation = {
  signUp: {
    _id?: string | null;
    createdAt?: any | null;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    roles: Array<IRoles>;
  };
};

export type ISignInMutationVariables = Exact<{
  data: ISignInInput;
}>;

export type ISignInMutation = {
  signIn: {
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
    type: string;
  };
};

export type ISignOutMutationVariables = Exact<{
  data: IRefreshTokenInput;
}>;

export type ISignOutMutation = { signOut: boolean };

export type IChangePasswordMutationVariables = Exact<{
  data: IChangePasswordInput;
}>;

export type IChangePasswordMutation = {
  changePassword: {
    _id?: string | null;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    updatedAt?: any | null;
  };
};

export type IPasswordRecoveryMutationVariables = Exact<{
  data: IPasswordRecoveryInput;
}>;

export type IPasswordRecoveryMutation = { passwordRecovery: string };

export type IPasswordResetMutationVariables = Exact<{
  data: IPasswordResetInput;
}>;

export type IPasswordResetMutation = {
  passwordReset: {
    _id?: string | null;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    updatedAt?: any | null;
  };
};

export type IRefreshTokenQueryVariables = Exact<{
  data: IRefreshTokenInput;
}>;

export type IRefreshTokenQuery = {
  refreshToken: { accessToken: string; accessTokenExpiresIn: string; type: string };
};

export type ICreateBuildingMutationVariables = Exact<{
  data: IUpsertBuildingInput;
}>;

export type ICreateBuildingMutation = {
  createBuilding: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    letter?: string | null;
    name: string;
    picturePath?: string | null;
    updatedAt?: any | null;
  };
};

export type IUpdateBuildingMutationVariables = Exact<{
  data: IUpdateBuildingInput;
}>;

export type IUpdateBuildingMutation = {
  updateBuilding: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    letter?: string | null;
    name: string;
    updatedAt?: any | null;
  };
};

export type IUploadBuildingPictureMutationVariables = Exact<{
  data: IUploadPictureBuildingInput;
}>;

export type IUploadBuildingPictureMutation = {
  uploadBuildingPicture: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    letter?: string | null;
    name: string;
    picturePath?: string | null;
    updatedAt?: any | null;
  };
};

export type IDeleteBuildingMutationVariables = Exact<{
  data: IBuildingIdArgs;
}>;

export type IDeleteBuildingMutation = { deleteBuilding: { deleted: number } };

export type IGetAllBuildingsQueryVariables = Exact<{
  filter?: InputMaybe<IBuildingArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllBuildingsQuery = {
  getAllBuildings: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      isDeleted: boolean;
      letter?: string | null;
      name: string;
      updatedAt?: any | null;
      picturePath?: string | null;
    }>;
  };
};

export type IGetBuildingByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetBuildingByIdQuery = {
  getBuildingById: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    letter?: string | null;
    name: string;
    updatedAt?: any | null;
    picturePath?: string | null;
  };
};

export type ICreateCareerMutationVariables = Exact<{
  data: ICreateCareerInput;
}>;

export type ICreateCareerMutation = {
  createCareer: {
    _id: string;
    abbreviationCareer: string;
    createdAt: any;
    credits: number;
    deletedAt?: any | null;
    description: string;
    duration: string;
    isCertified: boolean;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type IUpdateCareerMutationVariables = Exact<{
  data: IUpdateCareerInput;
}>;

export type IUpdateCareerMutation = {
  updateCareer: {
    _id: string;
    abbreviationCareer: string;
    createdAt: any;
    credits: number;
    deletedAt?: any | null;
    description: string;
    duration: string;
    isCertified: boolean;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type IDeletedCareerMutationVariables = Exact<{
  data: ICareerIdArgs;
}>;

export type IDeletedCareerMutation = { deletedCareer: { deleted: number } };

export type IGetAllCareersQueryVariables = Exact<{
  filter?: InputMaybe<ICareerArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllCareersQuery = {
  getAllCareers: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      abbreviationCareer: string;
      createdAt: any;
      credits: number;
      deletedAt?: any | null;
      description: string;
      duration: string;
      isCertified: boolean;
      isDeleted: boolean;
      name: string;
      updatedAt: any;
    }>;
  };
};

export type IGetCareerByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetCareerByIdQuery = {
  getCareerById: {
    _id: string;
    abbreviationCareer: string;
    createdAt: any;
    credits: number;
    deletedAt?: any | null;
    description: string;
    duration: string;
    isCertified: boolean;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type ICreateClassroomMutationVariables = Exact<{
  data: IUpsertClassroomInput;
}>;

export type ICreateClassroomMutation = {
  createClassroom: {
    _id: string;
    building: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    picturePath?: string | null;
    updatedAt?: any | null;
  };
};

export type IUpdateClassroomMutationVariables = Exact<{
  data: IUpdateClassroomInput;
}>;

export type IUpdateClassroomMutation = {
  updateClassroom: {
    _id: string;
    building: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    updatedAt?: any | null;
  };
};

export type IUploadClassroomPictureMutationVariables = Exact<{
  data: IUploadPictureClassroomInput;
}>;

export type IUploadClassroomPictureMutation = {
  uploadClassroomPicture: {
    _id: string;
    building: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    picturePath?: string | null;
    updatedAt?: any | null;
  };
};

export type IDeleteClassroomMutationVariables = Exact<{
  data: IClassroomIdArgs;
}>;

export type IDeleteClassroomMutation = { deleteClassroom: { deleted: number } };

export type IGetAllClassroomsQueryVariables = Exact<{
  filter?: InputMaybe<IClassroomArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllClassroomsQuery = {
  getAllClassrooms: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      building: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      identifier: string;
      isDeleted: boolean;
      updatedAt?: any | null;
      picturePath?: string | null;
    }>;
  };
};

export type IGetClassroomByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetClassroomByIdQuery = {
  getClassroomById: {
    _id: string;
    building: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    updatedAt?: any | null;
    picturePath?: string | null;
  };
};

export type ICreateDepartmentMutationVariables = Exact<{
  data: ICreateDepartmentInput;
}>;

export type ICreateDepartmentMutation = {
  createDepartment: {
    _id: string;
    areaKey: string;
    createdAt: any;
    deletedAt?: any | null;
    departmentBoss: string;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type IUpdateDepartmentMutationVariables = Exact<{
  data: IUpdateDepartmentInput;
}>;

export type IUpdateDepartmentMutation = {
  updateDepartment: {
    _id: string;
    areaKey: string;
    createdAt: any;
    deletedAt?: any | null;
    departmentBoss: string;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type IDeleteDepartmentMutationVariables = Exact<{
  data: IDepartmentIdArgs;
}>;

export type IDeleteDepartmentMutation = { deleteDepartment: { deleted: number } };

export type IGetAllDepartmentsQueryVariables = Exact<{
  filter?: InputMaybe<IDepartmentArgs>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllDepartmentsQuery = {
  getAllDepartments: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      areaKey: string;
      createdAt: any;
      deletedAt?: any | null;
      departmentBoss: string;
      isDeleted: boolean;
      name: string;
      updatedAt: any;
    }>;
  };
};

export type IGetDepartmentByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetDepartmentByIdQuery = {
  getDepartmentById: {
    _id: string;
    areaKey: string;
    createdAt: any;
    deletedAt?: any | null;
    departmentBoss: string;
    isDeleted: boolean;
    name: string;
    updatedAt: any;
  };
};

export type ICreateEventMutationVariables = Exact<{
  data: IUpsertEventInput;
}>;

export type ICreateEventMutation = {
  createEvent: {
    _id: string;
    activity: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finishDate: any;
    groupsIncluded: Array<string>;
    isDeleted: boolean;
    period: string;
    startDate: any;
    updatedAt?: any | null;
    uploadedBy: string;
  };
};

export type IUpdateEventMutationVariables = Exact<{
  data: IUpdateEventInput;
}>;

export type IUpdateEventMutation = {
  updateEvent: {
    _id: string;
    activity: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finishDate: any;
    groupsIncluded: Array<string>;
    isDeleted: boolean;
    period: string;
    startDate: any;
    updatedAt?: any | null;
    uploadedBy: string;
  };
};

export type IDeleteEventMutationVariables = Exact<{
  data: IEventIdArgs;
}>;

export type IDeleteEventMutation = { deleteEvent: { deleted: number } };

export type IGetAllEventsQueryVariables = Exact<{
  filter?: InputMaybe<IEventArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllEventsQuery = {
  getAllEvents: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      activity: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      finishDate: any;
      groupsIncluded: Array<string>;
      isDeleted: boolean;
      period: string;
      startDate: any;
      updatedAt?: any | null;
      uploadedBy: string;
    }>;
  };
};

export type IGetEventByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetEventByIdQuery = {
  getEventById: {
    _id: string;
    activity: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finishDate: any;
    groupsIncluded: Array<string>;
    isDeleted: boolean;
    period: string;
    startDate: any;
    updatedAt?: any | null;
    uploadedBy: string;
  };
};

export type IUpdateFileMutationVariables = Exact<{
  data: IUpdateFile;
}>;

export type IUpdateFileMutation = {
  updateFile: {
    _id: string;
    approvedBy?: any | null;
    createdAt: any;
    deletedAt?: any | null;
    extension: string;
    isDeleted: boolean;
    nameFile: string;
    path: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    comments?: Array<{
      _id?: string | null;
      comment?: string | null;
      createdAt?: any | null;
      createdBy?: any | null;
    }> | null;
    uploadedBy: {
      _id?: string | null;
      createdAt?: any | null;
      deletedAt?: any | null;
      department: string;
      email: string;
      firstName: string;
      gender: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      rfc: string;
      roles: Array<IRoles>;
      updatedAt?: any | null;
    };
  };
};

export type IUploadFileMutationVariables = Exact<{
  data: IUploadFileInput;
}>;

export type IUploadFileMutation = {
  uploadFile: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    extension: string;
    isDeleted: boolean;
    nameFile: string;
    path: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    uploadedBy: {
      _id?: string | null;
      email: string;
      firstName: string;
      lastName: string;
      middleName?: string | null;
    };
  };
};

export type ICreateFileCommentMutationVariables = Exact<{
  data: ICreateFileCommentInput;
}>;

export type ICreateFileCommentMutation = {
  createFileComment: {
    _id: string;
    approvedBy?: any | null;
    createdAt: any;
    deletedAt?: any | null;
    extension: string;
    attendanceJustified?: string | null;
    isDeleted: boolean;
    nameFile: string;
    path: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    comments?: Array<{
      _id?: string | null;
      comment?: string | null;
      createdAt?: any | null;
      createdBy?: any | null;
    }> | null;
    uploadedBy: {
      _id?: string | null;
      createdAt?: any | null;
      deletedAt?: any | null;
      department: string;
      email: string;
      firstName: string;
      gender: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      rfc: string;
      roles: Array<IRoles>;
      updatedAt?: any | null;
    };
  };
};

export type IApproveFileMutationVariables = Exact<{
  data: IApproveFileInput;
}>;

export type IApproveFileMutation = {
  approveFile: {
    _id: string;
    approvedBy?: any | null;
    createdAt: any;
    deletedAt?: any | null;
    extension: string;
    isDeleted: boolean;
    nameFile: string;
    path: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    comments?: Array<{
      _id?: string | null;
      comment?: string | null;
      createdAt?: any | null;
      createdBy?: any | null;
    }> | null;
    uploadedBy: {
      _id?: string | null;
      createdAt?: any | null;
      deletedAt?: any | null;
      department: string;
      email: string;
      firstName: string;
      gender: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      rfc: string;
      roles: Array<IRoles>;
      updatedAt?: any | null;
    };
  };
};

export type IGetAllFilesQueryVariables = Exact<{
  filter?: InputMaybe<IFileArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllFilesQuery = {
  getAllFiles: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      approvedBy?: any | null;
      createdAt: any;
      deletedAt?: any | null;
      extension: string;
      isDeleted: boolean;
      nameFile: string;
      attendanceJustified?: string | null;
      path: string;
      size: number;
      type: IFileType;
      updatedAt: any;
      comments?: Array<{
        _id?: string | null;
        comment?: string | null;
        createdAt?: any | null;
        createdBy?: any | null;
      }> | null;
      uploadedBy: {
        _id?: string | null;
        createdAt?: any | null;
        deletedAt?: any | null;
        department: string;
        email: string;
        firstName: string;
        gender: string;
        isDeleted: boolean;
        lastName: string;
        middleName?: string | null;
        password: string;
        rfc: string;
        roles: Array<IRoles>;
        updatedAt?: any | null;
      };
    }>;
  };
};

export type IGetFileByIdQueryVariables = Exact<{ [key: string]: never }>;

export type IGetFileByIdQuery = {
  getFileById: {
    _id: string;
    approvedBy?: any | null;
    createdAt: any;
    deletedAt?: any | null;
    extension: string;
    isDeleted: boolean;
    nameFile: string;
    path: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    comments?: Array<{
      _id?: string | null;
      comment?: string | null;
      createdAt?: any | null;
      createdBy?: any | null;
    }> | null;
    uploadedBy: {
      _id?: string | null;
      createdAt?: any | null;
      deletedAt?: any | null;
      department: string;
      email: string;
      firstName: string;
      gender: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      rfc: string;
      roles: Array<IRoles>;
      updatedAt?: any | null;
    };
  };
};

export type ICreateGroupMutationVariables = Exact<{
  data: IUpsertGroupInput;
}>;

export type ICreateGroupMutation = {
  createGroup: {
    _id: string;
    career: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    period: string;
    semester: string;
    updatedAt?: any | null;
  };
};

export type IUpdateGroupMutationVariables = Exact<{
  data: IUpdateGroupInput;
}>;

export type IUpdateGroupMutation = {
  updateGroup: {
    _id: string;
    career: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    period: string;
    semester: string;
    updatedAt?: any | null;
  };
};

export type IDeleteGroupMutationVariables = Exact<{
  data: IGroupIdArgs;
}>;

export type IDeleteGroupMutation = { deleteGroup: { deleted: number } };

export type IGetAllGroupsQueryVariables = Exact<{
  filter?: InputMaybe<IGroupArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllGroupsQuery = {
  getAllGroups: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      career: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      identifier: string;
      isDeleted: boolean;
      period: string;
      semester: string;
      updatedAt?: any | null;
    }>;
  };
};

export type IGetGroupByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetGroupByIdQuery = {
  getGroupById: {
    _id: string;
    career: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    period: string;
    semester: string;
    updatedAt?: any | null;
  };
};

export type IImportGroupsMutationVariables = Exact<{ [key: string]: never }>;

export type IImportGroupsMutation = {
  importGroups: Array<{
    _id: string;
    career: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    identifier: string;
    isDeleted: boolean;
    period: string;
    semester: string;
    updatedAt?: any | null;
  }>;
};

export type IImportPeriodsMutationVariables = Exact<{ [key: string]: never }>;

export type IImportPeriodsMutation = {
  importPeriods: Array<{
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalDate: any;
    isDeleted: boolean;
    largeIdentifier: string;
    name: string;
    shortIdentifier: string;
    startDate: any;
    updatedAt?: any | null;
  }>;
};

export type IImportSchedulesMutationVariables = Exact<{ [key: string]: never }>;

export type IImportSchedulesMutation = {
  importSchedules: Array<{
    _id: string;
    classGroup: string;
    classroom: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalTime: any;
    isDeleted: boolean;
    period: string;
    startTime: any;
    subject: string;
    teacher: string;
    updatedAt?: any | null;
    weekday: number;
  }>;
};

export type IImportSubjectsMutationVariables = Exact<{ [key: string]: never }>;

export type IImportSubjectsMutation = {
  importSubjects: Array<{
    _id?: string | null;
    areaKey: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    largeName: string;
    schoolarLevel: string;
    shortName: string;
    subjectType: number;
    updatedAt?: any | null;
  }>;
};

export type IImportTeachersMutationVariables = Exact<{ [key: string]: never }>;

export type IImportTeachersMutation = {
  importTeachers: Array<{
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    photo?: string | null;
    rfc: string;
    roles: Array<IRoles>;
    updatedAt?: any | null;
  }>;
};

export type ICreatePeriodMutationVariables = Exact<{
  data: IUpsertPeriodInput;
}>;

export type ICreatePeriodMutation = {
  createPeriod: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalDate: any;
    isDeleted: boolean;
    largeIdentifier: string;
    name: string;
    shortIdentifier: string;
    startDate: any;
    updatedAt?: any | null;
  };
};

export type IUpdatePeriodMutationVariables = Exact<{
  data: IUpdatePeriodInput;
}>;

export type IUpdatePeriodMutation = {
  updatePeriod: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalDate: any;
    isDeleted: boolean;
    largeIdentifier: string;
    name: string;
    shortIdentifier: string;
    startDate: any;
    updatedAt?: any | null;
  };
};

export type IDeletePeriodMutationVariables = Exact<{
  data: IPeriodIdArgs;
}>;

export type IDeletePeriodMutation = { deletePeriod: { deleted: number } };

export type IGetAllPeriodsQueryVariables = Exact<{
  filter?: InputMaybe<IPeriodArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllPeriodsQuery = {
  getAllPeriods: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      finalDate: any;
      isDeleted: boolean;
      largeIdentifier: string;
      name: string;
      shortIdentifier: string;
      startDate: any;
      updatedAt?: any | null;
    }>;
  };
};

export type IGetPeriodByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetPeriodByIdQuery = {
  getPeriodById: {
    _id: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalDate: any;
    isDeleted: boolean;
    largeIdentifier: string;
    name: string;
    shortIdentifier: string;
    startDate: any;
    updatedAt?: any | null;
  };
};

export type ICreateScheduleMutationVariables = Exact<{
  data: IUpsertScheduleInput;
}>;

export type ICreateScheduleMutation = {
  createSchedule: {
    _id: string;
    classGroup: string;
    classroom: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalTime: any;
    isDeleted: boolean;
    period: string;
    startTime: any;
    subject: string;
    teacher: string;
    updatedAt?: any | null;
    weekday: number;
  };
};

export type IUpdateScheduleMutationVariables = Exact<{
  data: IUpdateScheduleInput;
}>;

export type IUpdateScheduleMutation = {
  updateSchedule: {
    _id: string;
    classGroup: string;
    classroom: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalTime: any;
    isDeleted: boolean;
    period: string;
    startTime: any;
    subject: string;
    teacher: string;
    updatedAt?: any | null;
    weekday: number;
  };
};

export type IDeleteScheduleMutationVariables = Exact<{
  data: IScheduleIdArgs;
}>;

export type IDeleteScheduleMutation = { deleteSchedule: { deleted: number } };

export type IGetAllSchedulesQueryVariables = Exact<{
  filter?: InputMaybe<IScheduleArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IGetAllSchedulesQuery = {
  getAllSchedules: {
    docs: Array<{
      _id: string;
      classroom: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      finalTime: any;
      classGroup: string;
      isDeleted: boolean;
      period: string;
      teacher: string;
      startTime: any;
      subject: string;
      updatedAt?: any | null;
      weekday: number;
    }>;
  };
};

export type IGetScheduleByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetScheduleByIdQuery = {
  getScheduleById: {
    _id: string;
    classGroup: string;
    classroom: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    finalTime: any;
    isDeleted: boolean;
    period: string;
    teacher: string;
    weekday: number;
    startTime: any;
    subject: string;
    updatedAt?: any | null;
  };
};

export type IGetSchedulesFormattedQueryVariables = Exact<{
  teacher?: InputMaybe<Scalars['ID']['input']>;
  schedule?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetSchedulesFormattedQuery = {
  getSchedulesFormatted: Array<{
    _id: string;
    classroomIdentifier: string;
    finalTime: any;
    groupIdentifier: string;
    startTime: any;
    subjectLargeName: string;
    subjectShortName: string;
    teacherId: string;
    teacherFirstName: string;
    teacherLastName: string;
    teacherMiddleName?: string | null;
    teacherRfc: string;
    weekday: number;
  }>;
};

export type IGetUniqueOptionsCareerQueryVariables = Exact<{ [key: string]: never }>;

export type IGetUniqueOptionsCareerQuery = {
  getUniqueOptionsCareer: {
    semesters: Array<string>;
    careers: Array<{ label: string; value: string }>;
  };
};

export type IGetAttendanceStatisticsQueryVariables = Exact<{
  career?: InputMaybe<Scalars['ID']['input']>;
  department?: InputMaybe<Scalars['ID']['input']>;
  period?: InputMaybe<Scalars['ID']['input']>;
  semester?: InputMaybe<Scalars['String']['input']>;
  teacher?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetAttendanceStatisticsQuery = {
  getAttendanceStatistics: {
    classAbsentDay: number;
    classAbsentMonth: number;
    classAbsentPeriod: number;
    classAbsentSemester: number;
    classAbsentYear: number;
    classJustifyDay: number;
    classJustifyMonth: number;
    classJustifyPeriod: number;
    classJustifySemester: number;
    classJustifyYear: number;
    classPresentDay: number;
    classPresentMonth: number;
    classPresentPeriod: number;
    classPresentSemester: number;
    classPresentYear: number;
    weekday1: number;
    weekday2: number;
    weekday3: number;
    weekday4: number;
    weekday5: number;
    weekday6: number;
    weekday7: number;
  };
};

export type ICreateSubjectMutationVariables = Exact<{
  data: IUpsertSubjectInput;
}>;

export type ICreateSubjectMutation = {
  createSubject: {
    _id?: string | null;
    areaKey: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    largeName: string;
    schoolarLevel: string;
    shortName: string;
    subjectType: number;
    updatedAt?: any | null;
  };
};

export type IUpdateSubjectMutationVariables = Exact<{
  data: IUpdateSubjectInput;
}>;

export type IUpdateSubjectMutation = {
  updateSubject: {
    _id?: string | null;
    areaKey: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    largeName: string;
    schoolarLevel: string;
    shortName: string;
    subjectType: number;
    updatedAt?: any | null;
  };
};

export type IDeleteSubjectMutationVariables = Exact<{
  data: ISubjectIdArgs;
}>;

export type IDeleteSubjectMutation = { deleteSubject: { deleted: number } };

export type IGetAllSubjectsQueryVariables = Exact<{
  filter?: InputMaybe<ISubjectArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllSubjectsQuery = {
  getAllSubjects: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id?: string | null;
      areaKey: string;
      createdAt?: any | null;
      deletedAt?: any | null;
      isDeleted: boolean;
      largeName: string;
      schoolarLevel: string;
      shortName: string;
      subjectType: number;
      updatedAt?: any | null;
    }>;
  };
};

export type IGetSubjectByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetSubjectByIdQuery = {
  getSubjectById: {
    _id?: string | null;
    areaKey: string;
    createdAt?: any | null;
    deletedAt?: any | null;
    isDeleted: boolean;
    largeName: string;
    schoolarLevel: string;
    shortName: string;
    subjectType: number;
    updatedAt?: any | null;
  };
};

export type IDeleteUserMutationVariables = Exact<{
  data: IUserIdArgs;
}>;

export type IDeleteUserMutation = { deleteUser: { deleted: number } };

export type IUpdateUserMutationVariables = Exact<{
  data: IUpdateUserInput;
}>;

export type IUpdateUserMutation = {
  updateUser: {
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    rfc: string;
    roles: Array<IRoles>;
    photo?: string | null;
    updatedAt?: any | null;
  };
};

export type IUpsertUserMutationVariables = Exact<{
  data: IUpsertUserInput;
}>;

export type IUpsertUserMutation = {
  upsertUser: {
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    rfc: string;
    roles: Array<IRoles>;
    photo?: string | null;
    updatedAt?: any | null;
  };
};

export type IGetAllUsersQueryVariables = Exact<{
  filter?: InputMaybe<IUserArgs>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type IGetAllUsersQuery = {
  getAllUsers: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    offset?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs: Array<{
      _id?: string | null;
      createdAt?: any | null;
      deletedAt?: any | null;
      department: string;
      email: string;
      firstName: string;
      gender: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      rfc: string;
      roles: Array<IRoles>;
      photo?: string | null;
      updatedAt?: any | null;
    }>;
  };
};

export type IGetUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetUserByIdQuery = {
  getUserById: {
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    rfc: string;
    roles: Array<IRoles>;
    photo?: string | null;
    updatedAt?: any | null;
  };
};

export type IMeQueryVariables = Exact<{ [key: string]: never }>;

export type IMeQuery = {
  me: {
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    rfc: string;
    roles: Array<IRoles>;
    photo?: string | null;
    updatedAt?: any | null;
  };
};

export type IUserAddedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type IUserAddedSubscription = {
  userAdded: {
    _id?: string | null;
    createdAt?: any | null;
    deletedAt?: any | null;
    department: string;
    email: string;
    firstName: string;
    gender: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    rfc: string;
    roles: Array<IRoles>;
    updatedAt?: any | null;
  };
};

export const GetAllAttendancesDocument = /*#__PURE__*/ `
    query GetAllAttendances($filter: AttendanceArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllAttendances(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      createdAt
      deletedAt
      firstPass
      isDeleted
      period
      schedule
      secondPass
      updatedAt
      uploadedBy
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllAttendancesQuery = <TData = IGetAllAttendancesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllAttendancesQueryVariables,
  options?: UseQueryOptions<IGetAllAttendancesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllAttendancesQuery, TError, TData>(
    variables === undefined ? ['GetAllAttendances'] : ['GetAllAttendances', variables],
    fetcher<IGetAllAttendancesQuery, IGetAllAttendancesQueryVariables>(
      client,
      GetAllAttendancesDocument,
      variables,
      headers
    ),
    options
  );

useGetAllAttendancesQuery.getKey = (variables?: IGetAllAttendancesQueryVariables) =>
  variables === undefined ? ['GetAllAttendances'] : ['GetAllAttendances', variables];
useGetAllAttendancesQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllAttendancesQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllAttendancesQuery, IGetAllAttendancesQueryVariables>(
    client,
    GetAllAttendancesDocument,
    variables,
    headers
  );
export const SignUpDocument = /*#__PURE__*/ `
    mutation SignUp($data: SignUpInput!) {
  signUp(data: $data) {
    _id
    createdAt
    email
    firstName
    lastName
    middleName
    roles
  }
}
    `;
export const useSignUpMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<ISignUpMutation, TError, ISignUpMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<ISignUpMutation, TError, ISignUpMutationVariables, TContext>(
    ['SignUp'],
    (variables?: ISignUpMutationVariables) =>
      fetcher<ISignUpMutation, ISignUpMutationVariables>(
        client,
        SignUpDocument,
        variables,
        headers
      )(),
    options
  );
useSignUpMutation.fetcher = (
  client: GraphQLClient,
  variables: ISignUpMutationVariables,
  headers?: RequestInit['headers']
) => fetcher<ISignUpMutation, ISignUpMutationVariables>(client, SignUpDocument, variables, headers);
export const SignInDocument = /*#__PURE__*/ `
    mutation SignIn($data: SignInInput!) {
  signIn(data: $data) {
    accessToken
    accessTokenExpiresIn
    refreshToken
    refreshTokenExpiresIn
    type
  }
}
    `;
export const useSignInMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<ISignInMutation, TError, ISignInMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<ISignInMutation, TError, ISignInMutationVariables, TContext>(
    ['SignIn'],
    (variables?: ISignInMutationVariables) =>
      fetcher<ISignInMutation, ISignInMutationVariables>(
        client,
        SignInDocument,
        variables,
        headers
      )(),
    options
  );
useSignInMutation.fetcher = (
  client: GraphQLClient,
  variables: ISignInMutationVariables,
  headers?: RequestInit['headers']
) => fetcher<ISignInMutation, ISignInMutationVariables>(client, SignInDocument, variables, headers);
export const SignOutDocument = /*#__PURE__*/ `
    mutation SignOut($data: RefreshTokenInput!) {
  signOut(data: $data)
}
    `;
export const useSignOutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<ISignOutMutation, TError, ISignOutMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<ISignOutMutation, TError, ISignOutMutationVariables, TContext>(
    ['SignOut'],
    (variables?: ISignOutMutationVariables) =>
      fetcher<ISignOutMutation, ISignOutMutationVariables>(
        client,
        SignOutDocument,
        variables,
        headers
      )(),
    options
  );
useSignOutMutation.fetcher = (
  client: GraphQLClient,
  variables: ISignOutMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ISignOutMutation, ISignOutMutationVariables>(client, SignOutDocument, variables, headers);
export const ChangePasswordDocument = /*#__PURE__*/ `
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    _id
    email
    firstName
    lastName
    middleName
    updatedAt
  }
}
    `;
export const useChangePasswordMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IChangePasswordMutation,
    TError,
    IChangePasswordMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IChangePasswordMutation, TError, IChangePasswordMutationVariables, TContext>(
    ['ChangePassword'],
    (variables?: IChangePasswordMutationVariables) =>
      fetcher<IChangePasswordMutation, IChangePasswordMutationVariables>(
        client,
        ChangePasswordDocument,
        variables,
        headers
      )(),
    options
  );
useChangePasswordMutation.fetcher = (
  client: GraphQLClient,
  variables: IChangePasswordMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IChangePasswordMutation, IChangePasswordMutationVariables>(
    client,
    ChangePasswordDocument,
    variables,
    headers
  );
export const PasswordRecoveryDocument = /*#__PURE__*/ `
    mutation PasswordRecovery($data: PasswordRecoveryInput!) {
  passwordRecovery(data: $data)
}
    `;
export const usePasswordRecoveryMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IPasswordRecoveryMutation,
    TError,
    IPasswordRecoveryMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IPasswordRecoveryMutation, TError, IPasswordRecoveryMutationVariables, TContext>(
    ['PasswordRecovery'],
    (variables?: IPasswordRecoveryMutationVariables) =>
      fetcher<IPasswordRecoveryMutation, IPasswordRecoveryMutationVariables>(
        client,
        PasswordRecoveryDocument,
        variables,
        headers
      )(),
    options
  );
usePasswordRecoveryMutation.fetcher = (
  client: GraphQLClient,
  variables: IPasswordRecoveryMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IPasswordRecoveryMutation, IPasswordRecoveryMutationVariables>(
    client,
    PasswordRecoveryDocument,
    variables,
    headers
  );
export const PasswordResetDocument = /*#__PURE__*/ `
    mutation PasswordReset($data: PasswordResetInput!) {
  passwordReset(data: $data) {
    _id
    email
    firstName
    lastName
    middleName
    updatedAt
  }
}
    `;
export const usePasswordResetMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IPasswordResetMutation,
    TError,
    IPasswordResetMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IPasswordResetMutation, TError, IPasswordResetMutationVariables, TContext>(
    ['PasswordReset'],
    (variables?: IPasswordResetMutationVariables) =>
      fetcher<IPasswordResetMutation, IPasswordResetMutationVariables>(
        client,
        PasswordResetDocument,
        variables,
        headers
      )(),
    options
  );
usePasswordResetMutation.fetcher = (
  client: GraphQLClient,
  variables: IPasswordResetMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IPasswordResetMutation, IPasswordResetMutationVariables>(
    client,
    PasswordResetDocument,
    variables,
    headers
  );
export const RefreshTokenDocument = /*#__PURE__*/ `
    query RefreshToken($data: RefreshTokenInput!) {
  refreshToken(data: $data) {
    accessToken
    accessTokenExpiresIn
    type
  }
}
    `;
export const useRefreshTokenQuery = <TData = IRefreshTokenQuery, TError = unknown>(
  client: GraphQLClient,
  variables: IRefreshTokenQueryVariables,
  options?: UseQueryOptions<IRefreshTokenQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IRefreshTokenQuery, TError, TData>(
    ['RefreshToken', variables],
    fetcher<IRefreshTokenQuery, IRefreshTokenQueryVariables>(
      client,
      RefreshTokenDocument,
      variables,
      headers
    ),
    options
  );

useRefreshTokenQuery.getKey = (variables: IRefreshTokenQueryVariables) => [
  'RefreshToken',
  variables,
];
useRefreshTokenQuery.fetcher = (
  client: GraphQLClient,
  variables: IRefreshTokenQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IRefreshTokenQuery, IRefreshTokenQueryVariables>(
    client,
    RefreshTokenDocument,
    variables,
    headers
  );
export const CreateBuildingDocument = /*#__PURE__*/ `
    mutation CreateBuilding($data: UpsertBuildingInput!) {
  createBuilding(data: $data) {
    _id
    createdAt
    deletedAt
    isDeleted
    letter
    name
    picturePath
    updatedAt
  }
}
    `;
export const useCreateBuildingMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateBuildingMutation,
    TError,
    ICreateBuildingMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateBuildingMutation, TError, ICreateBuildingMutationVariables, TContext>(
    ['CreateBuilding'],
    (variables?: ICreateBuildingMutationVariables) =>
      fetcher<ICreateBuildingMutation, ICreateBuildingMutationVariables>(
        client,
        CreateBuildingDocument,
        variables,
        headers
      )(),
    options
  );
useCreateBuildingMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateBuildingMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateBuildingMutation, ICreateBuildingMutationVariables>(
    client,
    CreateBuildingDocument,
    variables,
    headers
  );
export const UpdateBuildingDocument = /*#__PURE__*/ `
    mutation UpdateBuilding($data: UpdateBuildingInput!) {
  updateBuilding(data: $data) {
    _id
    createdAt
    deletedAt
    isDeleted
    letter
    name
    updatedAt
  }
}
    `;
export const useUpdateBuildingMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateBuildingMutation,
    TError,
    IUpdateBuildingMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateBuildingMutation, TError, IUpdateBuildingMutationVariables, TContext>(
    ['UpdateBuilding'],
    (variables?: IUpdateBuildingMutationVariables) =>
      fetcher<IUpdateBuildingMutation, IUpdateBuildingMutationVariables>(
        client,
        UpdateBuildingDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateBuildingMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateBuildingMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateBuildingMutation, IUpdateBuildingMutationVariables>(
    client,
    UpdateBuildingDocument,
    variables,
    headers
  );
export const UploadBuildingPictureDocument = /*#__PURE__*/ `
    mutation UploadBuildingPicture($data: UploadPictureBuildingInput!) {
  uploadBuildingPicture(data: $data) {
    _id
    createdAt
    deletedAt
    isDeleted
    letter
    name
    picturePath
    updatedAt
  }
}
    `;
export const useUploadBuildingPictureMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUploadBuildingPictureMutation,
    TError,
    IUploadBuildingPictureMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    IUploadBuildingPictureMutation,
    TError,
    IUploadBuildingPictureMutationVariables,
    TContext
  >(
    ['UploadBuildingPicture'],
    (variables?: IUploadBuildingPictureMutationVariables) =>
      fetcher<IUploadBuildingPictureMutation, IUploadBuildingPictureMutationVariables>(
        client,
        UploadBuildingPictureDocument,
        variables,
        headers
      )(),
    options
  );
useUploadBuildingPictureMutation.fetcher = (
  client: GraphQLClient,
  variables: IUploadBuildingPictureMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUploadBuildingPictureMutation, IUploadBuildingPictureMutationVariables>(
    client,
    UploadBuildingPictureDocument,
    variables,
    headers
  );
export const DeleteBuildingDocument = /*#__PURE__*/ `
    mutation DeleteBuilding($data: BuildingIdArgs!) {
  deleteBuilding(data: $data) {
    deleted
  }
}
    `;
export const useDeleteBuildingMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteBuildingMutation,
    TError,
    IDeleteBuildingMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteBuildingMutation, TError, IDeleteBuildingMutationVariables, TContext>(
    ['DeleteBuilding'],
    (variables?: IDeleteBuildingMutationVariables) =>
      fetcher<IDeleteBuildingMutation, IDeleteBuildingMutationVariables>(
        client,
        DeleteBuildingDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteBuildingMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteBuildingMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteBuildingMutation, IDeleteBuildingMutationVariables>(
    client,
    DeleteBuildingDocument,
    variables,
    headers
  );
export const GetAllBuildingsDocument = /*#__PURE__*/ `
    query GetAllBuildings($filter: BuildingArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllBuildings(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      createdAt
      deletedAt
      isDeleted
      letter
      name
      updatedAt
      picturePath
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllBuildingsQuery = <TData = IGetAllBuildingsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllBuildingsQueryVariables,
  options?: UseQueryOptions<IGetAllBuildingsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllBuildingsQuery, TError, TData>(
    variables === undefined ? ['GetAllBuildings'] : ['GetAllBuildings', variables],
    fetcher<IGetAllBuildingsQuery, IGetAllBuildingsQueryVariables>(
      client,
      GetAllBuildingsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllBuildingsQuery.getKey = (variables?: IGetAllBuildingsQueryVariables) =>
  variables === undefined ? ['GetAllBuildings'] : ['GetAllBuildings', variables];
useGetAllBuildingsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllBuildingsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllBuildingsQuery, IGetAllBuildingsQueryVariables>(
    client,
    GetAllBuildingsDocument,
    variables,
    headers
  );
export const GetBuildingByIdDocument = /*#__PURE__*/ `
    query GetBuildingById($id: ID) {
  getBuildingById(_id: $id) {
    _id
    createdAt
    deletedAt
    isDeleted
    letter
    name
    updatedAt
    picturePath
  }
}
    `;
export const useGetBuildingByIdQuery = <TData = IGetBuildingByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetBuildingByIdQueryVariables,
  options?: UseQueryOptions<IGetBuildingByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetBuildingByIdQuery, TError, TData>(
    variables === undefined ? ['GetBuildingById'] : ['GetBuildingById', variables],
    fetcher<IGetBuildingByIdQuery, IGetBuildingByIdQueryVariables>(
      client,
      GetBuildingByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetBuildingByIdQuery.getKey = (variables?: IGetBuildingByIdQueryVariables) =>
  variables === undefined ? ['GetBuildingById'] : ['GetBuildingById', variables];
useGetBuildingByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetBuildingByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetBuildingByIdQuery, IGetBuildingByIdQueryVariables>(
    client,
    GetBuildingByIdDocument,
    variables,
    headers
  );
export const CreateCareerDocument = /*#__PURE__*/ `
    mutation CreateCareer($data: CreateCareerInput!) {
  createCareer(data: $data) {
    _id
    abbreviationCareer
    createdAt
    credits
    deletedAt
    description
    duration
    isCertified
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useCreateCareerMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateCareerMutation,
    TError,
    ICreateCareerMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateCareerMutation, TError, ICreateCareerMutationVariables, TContext>(
    ['CreateCareer'],
    (variables?: ICreateCareerMutationVariables) =>
      fetcher<ICreateCareerMutation, ICreateCareerMutationVariables>(
        client,
        CreateCareerDocument,
        variables,
        headers
      )(),
    options
  );
useCreateCareerMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateCareerMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateCareerMutation, ICreateCareerMutationVariables>(
    client,
    CreateCareerDocument,
    variables,
    headers
  );
export const UpdateCareerDocument = /*#__PURE__*/ `
    mutation UpdateCareer($data: UpdateCareerInput!) {
  updateCareer(data: $data) {
    _id
    abbreviationCareer
    createdAt
    credits
    deletedAt
    description
    duration
    isCertified
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useUpdateCareerMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateCareerMutation,
    TError,
    IUpdateCareerMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateCareerMutation, TError, IUpdateCareerMutationVariables, TContext>(
    ['UpdateCareer'],
    (variables?: IUpdateCareerMutationVariables) =>
      fetcher<IUpdateCareerMutation, IUpdateCareerMutationVariables>(
        client,
        UpdateCareerDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateCareerMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateCareerMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateCareerMutation, IUpdateCareerMutationVariables>(
    client,
    UpdateCareerDocument,
    variables,
    headers
  );
export const DeletedCareerDocument = /*#__PURE__*/ `
    mutation DeletedCareer($data: CareerIdArgs!) {
  deletedCareer(data: $data) {
    deleted
  }
}
    `;
export const useDeletedCareerMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeletedCareerMutation,
    TError,
    IDeletedCareerMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeletedCareerMutation, TError, IDeletedCareerMutationVariables, TContext>(
    ['DeletedCareer'],
    (variables?: IDeletedCareerMutationVariables) =>
      fetcher<IDeletedCareerMutation, IDeletedCareerMutationVariables>(
        client,
        DeletedCareerDocument,
        variables,
        headers
      )(),
    options
  );
useDeletedCareerMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeletedCareerMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeletedCareerMutation, IDeletedCareerMutationVariables>(
    client,
    DeletedCareerDocument,
    variables,
    headers
  );
export const GetAllCareersDocument = /*#__PURE__*/ `
    query GetAllCareers($filter: CareerArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllCareers(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      abbreviationCareer
      createdAt
      credits
      deletedAt
      description
      duration
      isCertified
      isDeleted
      name
      updatedAt
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllCareersQuery = <TData = IGetAllCareersQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllCareersQueryVariables,
  options?: UseQueryOptions<IGetAllCareersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllCareersQuery, TError, TData>(
    variables === undefined ? ['GetAllCareers'] : ['GetAllCareers', variables],
    fetcher<IGetAllCareersQuery, IGetAllCareersQueryVariables>(
      client,
      GetAllCareersDocument,
      variables,
      headers
    ),
    options
  );

useGetAllCareersQuery.getKey = (variables?: IGetAllCareersQueryVariables) =>
  variables === undefined ? ['GetAllCareers'] : ['GetAllCareers', variables];
useGetAllCareersQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllCareersQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllCareersQuery, IGetAllCareersQueryVariables>(
    client,
    GetAllCareersDocument,
    variables,
    headers
  );
export const GetCareerByIdDocument = /*#__PURE__*/ `
    query GetCareerById($id: ID) {
  getCareerById(_id: $id) {
    _id
    abbreviationCareer
    createdAt
    credits
    deletedAt
    description
    duration
    isCertified
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useGetCareerByIdQuery = <TData = IGetCareerByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetCareerByIdQueryVariables,
  options?: UseQueryOptions<IGetCareerByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetCareerByIdQuery, TError, TData>(
    variables === undefined ? ['GetCareerById'] : ['GetCareerById', variables],
    fetcher<IGetCareerByIdQuery, IGetCareerByIdQueryVariables>(
      client,
      GetCareerByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetCareerByIdQuery.getKey = (variables?: IGetCareerByIdQueryVariables) =>
  variables === undefined ? ['GetCareerById'] : ['GetCareerById', variables];
useGetCareerByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetCareerByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetCareerByIdQuery, IGetCareerByIdQueryVariables>(
    client,
    GetCareerByIdDocument,
    variables,
    headers
  );
export const CreateClassroomDocument = /*#__PURE__*/ `
    mutation CreateClassroom($data: UpsertClassroomInput!) {
  createClassroom(data: $data) {
    _id
    building
    createdAt
    deletedAt
    identifier
    isDeleted
    picturePath
    updatedAt
  }
}
    `;
export const useCreateClassroomMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateClassroomMutation,
    TError,
    ICreateClassroomMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateClassroomMutation, TError, ICreateClassroomMutationVariables, TContext>(
    ['CreateClassroom'],
    (variables?: ICreateClassroomMutationVariables) =>
      fetcher<ICreateClassroomMutation, ICreateClassroomMutationVariables>(
        client,
        CreateClassroomDocument,
        variables,
        headers
      )(),
    options
  );
useCreateClassroomMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateClassroomMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateClassroomMutation, ICreateClassroomMutationVariables>(
    client,
    CreateClassroomDocument,
    variables,
    headers
  );
export const UpdateClassroomDocument = /*#__PURE__*/ `
    mutation UpdateClassroom($data: UpdateClassroomInput!) {
  updateClassroom(data: $data) {
    _id
    building
    createdAt
    deletedAt
    identifier
    isDeleted
    updatedAt
  }
}
    `;
export const useUpdateClassroomMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateClassroomMutation,
    TError,
    IUpdateClassroomMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateClassroomMutation, TError, IUpdateClassroomMutationVariables, TContext>(
    ['UpdateClassroom'],
    (variables?: IUpdateClassroomMutationVariables) =>
      fetcher<IUpdateClassroomMutation, IUpdateClassroomMutationVariables>(
        client,
        UpdateClassroomDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateClassroomMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateClassroomMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateClassroomMutation, IUpdateClassroomMutationVariables>(
    client,
    UpdateClassroomDocument,
    variables,
    headers
  );
export const UploadClassroomPictureDocument = /*#__PURE__*/ `
    mutation UploadClassroomPicture($data: UploadPictureClassroomInput!) {
  uploadClassroomPicture(data: $data) {
    _id
    building
    createdAt
    deletedAt
    identifier
    isDeleted
    picturePath
    updatedAt
  }
}
    `;
export const useUploadClassroomPictureMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUploadClassroomPictureMutation,
    TError,
    IUploadClassroomPictureMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    IUploadClassroomPictureMutation,
    TError,
    IUploadClassroomPictureMutationVariables,
    TContext
  >(
    ['UploadClassroomPicture'],
    (variables?: IUploadClassroomPictureMutationVariables) =>
      fetcher<IUploadClassroomPictureMutation, IUploadClassroomPictureMutationVariables>(
        client,
        UploadClassroomPictureDocument,
        variables,
        headers
      )(),
    options
  );
useUploadClassroomPictureMutation.fetcher = (
  client: GraphQLClient,
  variables: IUploadClassroomPictureMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUploadClassroomPictureMutation, IUploadClassroomPictureMutationVariables>(
    client,
    UploadClassroomPictureDocument,
    variables,
    headers
  );
export const DeleteClassroomDocument = /*#__PURE__*/ `
    mutation DeleteClassroom($data: ClassroomIdArgs!) {
  deleteClassroom(data: $data) {
    deleted
  }
}
    `;
export const useDeleteClassroomMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteClassroomMutation,
    TError,
    IDeleteClassroomMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteClassroomMutation, TError, IDeleteClassroomMutationVariables, TContext>(
    ['DeleteClassroom'],
    (variables?: IDeleteClassroomMutationVariables) =>
      fetcher<IDeleteClassroomMutation, IDeleteClassroomMutationVariables>(
        client,
        DeleteClassroomDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteClassroomMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteClassroomMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteClassroomMutation, IDeleteClassroomMutationVariables>(
    client,
    DeleteClassroomDocument,
    variables,
    headers
  );
export const GetAllClassroomsDocument = /*#__PURE__*/ `
    query GetAllClassrooms($filter: ClassroomArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllClassrooms(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      building
      createdAt
      deletedAt
      identifier
      isDeleted
      updatedAt
      picturePath
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllClassroomsQuery = <TData = IGetAllClassroomsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllClassroomsQueryVariables,
  options?: UseQueryOptions<IGetAllClassroomsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllClassroomsQuery, TError, TData>(
    variables === undefined ? ['GetAllClassrooms'] : ['GetAllClassrooms', variables],
    fetcher<IGetAllClassroomsQuery, IGetAllClassroomsQueryVariables>(
      client,
      GetAllClassroomsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllClassroomsQuery.getKey = (variables?: IGetAllClassroomsQueryVariables) =>
  variables === undefined ? ['GetAllClassrooms'] : ['GetAllClassrooms', variables];
useGetAllClassroomsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllClassroomsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllClassroomsQuery, IGetAllClassroomsQueryVariables>(
    client,
    GetAllClassroomsDocument,
    variables,
    headers
  );
export const GetClassroomByIdDocument = /*#__PURE__*/ `
    query GetClassroomById($id: ID) {
  getClassroomById(_id: $id) {
    _id
    building
    createdAt
    deletedAt
    identifier
    isDeleted
    updatedAt
    picturePath
  }
}
    `;
export const useGetClassroomByIdQuery = <TData = IGetClassroomByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetClassroomByIdQueryVariables,
  options?: UseQueryOptions<IGetClassroomByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetClassroomByIdQuery, TError, TData>(
    variables === undefined ? ['GetClassroomById'] : ['GetClassroomById', variables],
    fetcher<IGetClassroomByIdQuery, IGetClassroomByIdQueryVariables>(
      client,
      GetClassroomByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetClassroomByIdQuery.getKey = (variables?: IGetClassroomByIdQueryVariables) =>
  variables === undefined ? ['GetClassroomById'] : ['GetClassroomById', variables];
useGetClassroomByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetClassroomByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetClassroomByIdQuery, IGetClassroomByIdQueryVariables>(
    client,
    GetClassroomByIdDocument,
    variables,
    headers
  );
export const CreateDepartmentDocument = /*#__PURE__*/ `
    mutation CreateDepartment($data: createDepartmentInput!) {
  createDepartment(data: $data) {
    _id
    areaKey
    createdAt
    deletedAt
    departmentBoss
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useCreateDepartmentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateDepartmentMutation,
    TError,
    ICreateDepartmentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateDepartmentMutation, TError, ICreateDepartmentMutationVariables, TContext>(
    ['CreateDepartment'],
    (variables?: ICreateDepartmentMutationVariables) =>
      fetcher<ICreateDepartmentMutation, ICreateDepartmentMutationVariables>(
        client,
        CreateDepartmentDocument,
        variables,
        headers
      )(),
    options
  );
useCreateDepartmentMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateDepartmentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateDepartmentMutation, ICreateDepartmentMutationVariables>(
    client,
    CreateDepartmentDocument,
    variables,
    headers
  );
export const UpdateDepartmentDocument = /*#__PURE__*/ `
    mutation UpdateDepartment($data: UpdateDepartmentInput!) {
  updateDepartment(data: $data) {
    _id
    areaKey
    createdAt
    deletedAt
    departmentBoss
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useUpdateDepartmentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateDepartmentMutation,
    TError,
    IUpdateDepartmentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateDepartmentMutation, TError, IUpdateDepartmentMutationVariables, TContext>(
    ['UpdateDepartment'],
    (variables?: IUpdateDepartmentMutationVariables) =>
      fetcher<IUpdateDepartmentMutation, IUpdateDepartmentMutationVariables>(
        client,
        UpdateDepartmentDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateDepartmentMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateDepartmentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateDepartmentMutation, IUpdateDepartmentMutationVariables>(
    client,
    UpdateDepartmentDocument,
    variables,
    headers
  );
export const DeleteDepartmentDocument = /*#__PURE__*/ `
    mutation DeleteDepartment($data: DepartmentIdArgs!) {
  deleteDepartment(data: $data) {
    deleted
  }
}
    `;
export const useDeleteDepartmentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteDepartmentMutation,
    TError,
    IDeleteDepartmentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteDepartmentMutation, TError, IDeleteDepartmentMutationVariables, TContext>(
    ['DeleteDepartment'],
    (variables?: IDeleteDepartmentMutationVariables) =>
      fetcher<IDeleteDepartmentMutation, IDeleteDepartmentMutationVariables>(
        client,
        DeleteDepartmentDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteDepartmentMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteDepartmentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteDepartmentMutation, IDeleteDepartmentMutationVariables>(
    client,
    DeleteDepartmentDocument,
    variables,
    headers
  );
export const GetAllDepartmentsDocument = /*#__PURE__*/ `
    query GetAllDepartments($filter: DepartmentArgs, $page: Int, $offset: Int, $limit: Int) {
  getAllDepartments(filter: $filter, page: $page, offset: $offset, limit: $limit) {
    docs {
      _id
      areaKey
      createdAt
      deletedAt
      departmentBoss
      isDeleted
      name
      updatedAt
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllDepartmentsQuery = <TData = IGetAllDepartmentsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllDepartmentsQueryVariables,
  options?: UseQueryOptions<IGetAllDepartmentsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllDepartmentsQuery, TError, TData>(
    variables === undefined ? ['GetAllDepartments'] : ['GetAllDepartments', variables],
    fetcher<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>(
      client,
      GetAllDepartmentsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllDepartmentsQuery.getKey = (variables?: IGetAllDepartmentsQueryVariables) =>
  variables === undefined ? ['GetAllDepartments'] : ['GetAllDepartments', variables];
useGetAllDepartmentsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllDepartmentsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>(
    client,
    GetAllDepartmentsDocument,
    variables,
    headers
  );
export const GetDepartmentByIdDocument = /*#__PURE__*/ `
    query GetDepartmentById($id: ID) {
  getDepartmentById(_id: $id) {
    _id
    areaKey
    createdAt
    deletedAt
    departmentBoss
    isDeleted
    name
    updatedAt
  }
}
    `;
export const useGetDepartmentByIdQuery = <TData = IGetDepartmentByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetDepartmentByIdQueryVariables,
  options?: UseQueryOptions<IGetDepartmentByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetDepartmentByIdQuery, TError, TData>(
    variables === undefined ? ['GetDepartmentById'] : ['GetDepartmentById', variables],
    fetcher<IGetDepartmentByIdQuery, IGetDepartmentByIdQueryVariables>(
      client,
      GetDepartmentByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetDepartmentByIdQuery.getKey = (variables?: IGetDepartmentByIdQueryVariables) =>
  variables === undefined ? ['GetDepartmentById'] : ['GetDepartmentById', variables];
useGetDepartmentByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetDepartmentByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetDepartmentByIdQuery, IGetDepartmentByIdQueryVariables>(
    client,
    GetDepartmentByIdDocument,
    variables,
    headers
  );
export const CreateEventDocument = /*#__PURE__*/ `
    mutation CreateEvent($data: UpsertEventInput!) {
  createEvent(data: $data) {
    _id
    activity
    createdAt
    deletedAt
    finishDate
    groupsIncluded
    isDeleted
    period
    startDate
    updatedAt
    uploadedBy
  }
}
    `;
export const useCreateEventMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateEventMutation,
    TError,
    ICreateEventMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateEventMutation, TError, ICreateEventMutationVariables, TContext>(
    ['CreateEvent'],
    (variables?: ICreateEventMutationVariables) =>
      fetcher<ICreateEventMutation, ICreateEventMutationVariables>(
        client,
        CreateEventDocument,
        variables,
        headers
      )(),
    options
  );
useCreateEventMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateEventMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateEventMutation, ICreateEventMutationVariables>(
    client,
    CreateEventDocument,
    variables,
    headers
  );
export const UpdateEventDocument = /*#__PURE__*/ `
    mutation UpdateEvent($data: UpdateEventInput!) {
  updateEvent(data: $data) {
    _id
    activity
    createdAt
    deletedAt
    finishDate
    groupsIncluded
    isDeleted
    period
    startDate
    updatedAt
    uploadedBy
  }
}
    `;
export const useUpdateEventMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateEventMutation,
    TError,
    IUpdateEventMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateEventMutation, TError, IUpdateEventMutationVariables, TContext>(
    ['UpdateEvent'],
    (variables?: IUpdateEventMutationVariables) =>
      fetcher<IUpdateEventMutation, IUpdateEventMutationVariables>(
        client,
        UpdateEventDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateEventMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateEventMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateEventMutation, IUpdateEventMutationVariables>(
    client,
    UpdateEventDocument,
    variables,
    headers
  );
export const DeleteEventDocument = /*#__PURE__*/ `
    mutation DeleteEvent($data: EventIdArgs!) {
  deleteEvent(data: $data) {
    deleted
  }
}
    `;
export const useDeleteEventMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteEventMutation,
    TError,
    IDeleteEventMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteEventMutation, TError, IDeleteEventMutationVariables, TContext>(
    ['DeleteEvent'],
    (variables?: IDeleteEventMutationVariables) =>
      fetcher<IDeleteEventMutation, IDeleteEventMutationVariables>(
        client,
        DeleteEventDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteEventMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteEventMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteEventMutation, IDeleteEventMutationVariables>(
    client,
    DeleteEventDocument,
    variables,
    headers
  );
export const GetAllEventsDocument = /*#__PURE__*/ `
    query GetAllEvents($filter: EventArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllEvents(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      activity
      createdAt
      deletedAt
      finishDate
      groupsIncluded
      isDeleted
      period
      startDate
      updatedAt
      uploadedBy
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllEventsQuery = <TData = IGetAllEventsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllEventsQueryVariables,
  options?: UseQueryOptions<IGetAllEventsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllEventsQuery, TError, TData>(
    variables === undefined ? ['GetAllEvents'] : ['GetAllEvents', variables],
    fetcher<IGetAllEventsQuery, IGetAllEventsQueryVariables>(
      client,
      GetAllEventsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllEventsQuery.getKey = (variables?: IGetAllEventsQueryVariables) =>
  variables === undefined ? ['GetAllEvents'] : ['GetAllEvents', variables];
useGetAllEventsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllEventsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllEventsQuery, IGetAllEventsQueryVariables>(
    client,
    GetAllEventsDocument,
    variables,
    headers
  );
export const GetEventByIdDocument = /*#__PURE__*/ `
    query GetEventById($id: ID) {
  getEventById(_id: $id) {
    _id
    activity
    createdAt
    deletedAt
    finishDate
    groupsIncluded
    isDeleted
    period
    startDate
    updatedAt
    uploadedBy
  }
}
    `;
export const useGetEventByIdQuery = <TData = IGetEventByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetEventByIdQueryVariables,
  options?: UseQueryOptions<IGetEventByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetEventByIdQuery, TError, TData>(
    variables === undefined ? ['GetEventById'] : ['GetEventById', variables],
    fetcher<IGetEventByIdQuery, IGetEventByIdQueryVariables>(
      client,
      GetEventByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetEventByIdQuery.getKey = (variables?: IGetEventByIdQueryVariables) =>
  variables === undefined ? ['GetEventById'] : ['GetEventById', variables];
useGetEventByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetEventByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetEventByIdQuery, IGetEventByIdQueryVariables>(
    client,
    GetEventByIdDocument,
    variables,
    headers
  );
export const UpdateFileDocument = /*#__PURE__*/ `
    mutation UpdateFile($data: UpdateFile!) {
  updateFile(data: $data) {
    _id
    approvedBy
    comments {
      _id
      comment
      createdAt
      createdBy
    }
    createdAt
    deletedAt
    extension
    isDeleted
    nameFile
    path
    size
    type
    updatedAt
    uploadedBy {
      _id
      createdAt
      deletedAt
      department
      email
      firstName
      gender
      isDeleted
      lastName
      middleName
      password
      rfc
      roles
      updatedAt
    }
  }
}
    `;
export const useUpdateFileMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IUpdateFileMutation, TError, IUpdateFileMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateFileMutation, TError, IUpdateFileMutationVariables, TContext>(
    ['UpdateFile'],
    (variables?: IUpdateFileMutationVariables) =>
      fetcher<IUpdateFileMutation, IUpdateFileMutationVariables>(
        client,
        UpdateFileDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateFileMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateFileMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateFileMutation, IUpdateFileMutationVariables>(
    client,
    UpdateFileDocument,
    variables,
    headers
  );
export const UploadFileDocument = /*#__PURE__*/ `
    mutation UploadFile($data: UploadFileInput!) {
  uploadFile(data: $data) {
    _id
    createdAt
    deletedAt
    extension
    isDeleted
    nameFile
    path
    size
    type
    updatedAt
    uploadedBy {
      _id
      email
      firstName
      lastName
      middleName
    }
  }
}
    `;
export const useUploadFileMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IUploadFileMutation, TError, IUploadFileMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IUploadFileMutation, TError, IUploadFileMutationVariables, TContext>(
    ['UploadFile'],
    (variables?: IUploadFileMutationVariables) =>
      fetcher<IUploadFileMutation, IUploadFileMutationVariables>(
        client,
        UploadFileDocument,
        variables,
        headers
      )(),
    options
  );
useUploadFileMutation.fetcher = (
  client: GraphQLClient,
  variables: IUploadFileMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUploadFileMutation, IUploadFileMutationVariables>(
    client,
    UploadFileDocument,
    variables,
    headers
  );
export const CreateFileCommentDocument = /*#__PURE__*/ `
    mutation CreateFileComment($data: CreateFileCommentInput!) {
  createFileComment(data: $data) {
    _id
    approvedBy
    comments {
      _id
      comment
      createdAt
      createdBy
    }
    createdAt
    deletedAt
    extension
    attendanceJustified
    isDeleted
    nameFile
    path
    size
    type
    updatedAt
    uploadedBy {
      _id
      createdAt
      deletedAt
      department
      email
      firstName
      gender
      isDeleted
      lastName
      middleName
      password
      rfc
      roles
      updatedAt
    }
  }
}
    `;
export const useCreateFileCommentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateFileCommentMutation,
    TError,
    ICreateFileCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateFileCommentMutation, TError, ICreateFileCommentMutationVariables, TContext>(
    ['CreateFileComment'],
    (variables?: ICreateFileCommentMutationVariables) =>
      fetcher<ICreateFileCommentMutation, ICreateFileCommentMutationVariables>(
        client,
        CreateFileCommentDocument,
        variables,
        headers
      )(),
    options
  );
useCreateFileCommentMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateFileCommentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateFileCommentMutation, ICreateFileCommentMutationVariables>(
    client,
    CreateFileCommentDocument,
    variables,
    headers
  );
export const ApproveFileDocument = /*#__PURE__*/ `
    mutation ApproveFile($data: ApproveFileInput!) {
  approveFile(data: $data) {
    _id
    approvedBy
    comments {
      _id
      comment
      createdAt
      createdBy
    }
    createdAt
    deletedAt
    extension
    isDeleted
    nameFile
    path
    size
    type
    updatedAt
    uploadedBy {
      _id
      createdAt
      deletedAt
      department
      email
      firstName
      gender
      isDeleted
      lastName
      middleName
      password
      rfc
      roles
      updatedAt
    }
  }
}
    `;
export const useApproveFileMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IApproveFileMutation,
    TError,
    IApproveFileMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IApproveFileMutation, TError, IApproveFileMutationVariables, TContext>(
    ['ApproveFile'],
    (variables?: IApproveFileMutationVariables) =>
      fetcher<IApproveFileMutation, IApproveFileMutationVariables>(
        client,
        ApproveFileDocument,
        variables,
        headers
      )(),
    options
  );
useApproveFileMutation.fetcher = (
  client: GraphQLClient,
  variables: IApproveFileMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IApproveFileMutation, IApproveFileMutationVariables>(
    client,
    ApproveFileDocument,
    variables,
    headers
  );
export const GetAllFilesDocument = /*#__PURE__*/ `
    query GetAllFiles($filter: FileArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllFiles(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      approvedBy
      comments {
        _id
        comment
        createdAt
        createdBy
      }
      createdAt
      deletedAt
      extension
      isDeleted
      nameFile
      attendanceJustified
      path
      size
      type
      updatedAt
      uploadedBy {
        _id
        createdAt
        deletedAt
        department
        email
        firstName
        gender
        isDeleted
        lastName
        middleName
        password
        rfc
        roles
        updatedAt
      }
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllFilesQuery = <TData = IGetAllFilesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllFilesQueryVariables,
  options?: UseQueryOptions<IGetAllFilesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllFilesQuery, TError, TData>(
    variables === undefined ? ['GetAllFiles'] : ['GetAllFiles', variables],
    fetcher<IGetAllFilesQuery, IGetAllFilesQueryVariables>(
      client,
      GetAllFilesDocument,
      variables,
      headers
    ),
    options
  );

useGetAllFilesQuery.getKey = (variables?: IGetAllFilesQueryVariables) =>
  variables === undefined ? ['GetAllFiles'] : ['GetAllFiles', variables];
useGetAllFilesQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllFilesQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllFilesQuery, IGetAllFilesQueryVariables>(
    client,
    GetAllFilesDocument,
    variables,
    headers
  );
export const GetFileByIdDocument = /*#__PURE__*/ `
    query GetFileById {
  getFileById {
    _id
    approvedBy
    comments {
      _id
      comment
      createdAt
      createdBy
    }
    createdAt
    deletedAt
    extension
    isDeleted
    nameFile
    path
    size
    type
    updatedAt
    uploadedBy {
      _id
      createdAt
      deletedAt
      department
      email
      firstName
      gender
      isDeleted
      lastName
      middleName
      password
      rfc
      roles
      updatedAt
    }
  }
}
    `;
export const useGetFileByIdQuery = <TData = IGetFileByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetFileByIdQueryVariables,
  options?: UseQueryOptions<IGetFileByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetFileByIdQuery, TError, TData>(
    variables === undefined ? ['GetFileById'] : ['GetFileById', variables],
    fetcher<IGetFileByIdQuery, IGetFileByIdQueryVariables>(
      client,
      GetFileByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetFileByIdQuery.getKey = (variables?: IGetFileByIdQueryVariables) =>
  variables === undefined ? ['GetFileById'] : ['GetFileById', variables];
useGetFileByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetFileByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetFileByIdQuery, IGetFileByIdQueryVariables>(
    client,
    GetFileByIdDocument,
    variables,
    headers
  );
export const CreateGroupDocument = /*#__PURE__*/ `
    mutation CreateGroup($data: UpsertGroupInput!) {
  createGroup(data: $data) {
    _id
    career
    createdAt
    deletedAt
    identifier
    isDeleted
    period
    semester
    updatedAt
  }
}
    `;
export const useCreateGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateGroupMutation,
    TError,
    ICreateGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateGroupMutation, TError, ICreateGroupMutationVariables, TContext>(
    ['CreateGroup'],
    (variables?: ICreateGroupMutationVariables) =>
      fetcher<ICreateGroupMutation, ICreateGroupMutationVariables>(
        client,
        CreateGroupDocument,
        variables,
        headers
      )(),
    options
  );
useCreateGroupMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateGroupMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateGroupMutation, ICreateGroupMutationVariables>(
    client,
    CreateGroupDocument,
    variables,
    headers
  );
export const UpdateGroupDocument = /*#__PURE__*/ `
    mutation UpdateGroup($data: UpdateGroupInput!) {
  updateGroup(data: $data) {
    _id
    career
    createdAt
    deletedAt
    identifier
    isDeleted
    period
    semester
    updatedAt
  }
}
    `;
export const useUpdateGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateGroupMutation,
    TError,
    IUpdateGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateGroupMutation, TError, IUpdateGroupMutationVariables, TContext>(
    ['UpdateGroup'],
    (variables?: IUpdateGroupMutationVariables) =>
      fetcher<IUpdateGroupMutation, IUpdateGroupMutationVariables>(
        client,
        UpdateGroupDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateGroupMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateGroupMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateGroupMutation, IUpdateGroupMutationVariables>(
    client,
    UpdateGroupDocument,
    variables,
    headers
  );
export const DeleteGroupDocument = /*#__PURE__*/ `
    mutation DeleteGroup($data: GroupIdArgs!) {
  deleteGroup(data: $data) {
    deleted
  }
}
    `;
export const useDeleteGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteGroupMutation,
    TError,
    IDeleteGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteGroupMutation, TError, IDeleteGroupMutationVariables, TContext>(
    ['DeleteGroup'],
    (variables?: IDeleteGroupMutationVariables) =>
      fetcher<IDeleteGroupMutation, IDeleteGroupMutationVariables>(
        client,
        DeleteGroupDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteGroupMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteGroupMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteGroupMutation, IDeleteGroupMutationVariables>(
    client,
    DeleteGroupDocument,
    variables,
    headers
  );
export const GetAllGroupsDocument = /*#__PURE__*/ `
    query GetAllGroups($filter: GroupArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllGroups(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      career
      createdAt
      deletedAt
      identifier
      isDeleted
      period
      semester
      updatedAt
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllGroupsQuery = <TData = IGetAllGroupsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllGroupsQueryVariables,
  options?: UseQueryOptions<IGetAllGroupsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllGroupsQuery, TError, TData>(
    variables === undefined ? ['GetAllGroups'] : ['GetAllGroups', variables],
    fetcher<IGetAllGroupsQuery, IGetAllGroupsQueryVariables>(
      client,
      GetAllGroupsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllGroupsQuery.getKey = (variables?: IGetAllGroupsQueryVariables) =>
  variables === undefined ? ['GetAllGroups'] : ['GetAllGroups', variables];
useGetAllGroupsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllGroupsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllGroupsQuery, IGetAllGroupsQueryVariables>(
    client,
    GetAllGroupsDocument,
    variables,
    headers
  );
export const GetGroupByIdDocument = /*#__PURE__*/ `
    query GetGroupById($id: ID) {
  getGroupById(_id: $id) {
    _id
    career
    createdAt
    deletedAt
    identifier
    isDeleted
    period
    semester
    updatedAt
  }
}
    `;
export const useGetGroupByIdQuery = <TData = IGetGroupByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetGroupByIdQueryVariables,
  options?: UseQueryOptions<IGetGroupByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetGroupByIdQuery, TError, TData>(
    variables === undefined ? ['GetGroupById'] : ['GetGroupById', variables],
    fetcher<IGetGroupByIdQuery, IGetGroupByIdQueryVariables>(
      client,
      GetGroupByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetGroupByIdQuery.getKey = (variables?: IGetGroupByIdQueryVariables) =>
  variables === undefined ? ['GetGroupById'] : ['GetGroupById', variables];
useGetGroupByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetGroupByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetGroupByIdQuery, IGetGroupByIdQueryVariables>(
    client,
    GetGroupByIdDocument,
    variables,
    headers
  );
export const ImportGroupsDocument = /*#__PURE__*/ `
    mutation ImportGroups {
  importGroups {
    _id
    career
    createdAt
    deletedAt
    identifier
    isDeleted
    period
    semester
    updatedAt
  }
}
    `;
export const useImportGroupsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IImportGroupsMutation,
    TError,
    IImportGroupsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IImportGroupsMutation, TError, IImportGroupsMutationVariables, TContext>(
    ['ImportGroups'],
    (variables?: IImportGroupsMutationVariables) =>
      fetcher<IImportGroupsMutation, IImportGroupsMutationVariables>(
        client,
        ImportGroupsDocument,
        variables,
        headers
      )(),
    options
  );
useImportGroupsMutation.fetcher = (
  client: GraphQLClient,
  variables?: IImportGroupsMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IImportGroupsMutation, IImportGroupsMutationVariables>(
    client,
    ImportGroupsDocument,
    variables,
    headers
  );
export const ImportPeriodsDocument = /*#__PURE__*/ `
    mutation ImportPeriods {
  importPeriods {
    _id
    createdAt
    deletedAt
    finalDate
    isDeleted
    largeIdentifier
    name
    shortIdentifier
    startDate
    updatedAt
  }
}
    `;
export const useImportPeriodsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IImportPeriodsMutation,
    TError,
    IImportPeriodsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IImportPeriodsMutation, TError, IImportPeriodsMutationVariables, TContext>(
    ['ImportPeriods'],
    (variables?: IImportPeriodsMutationVariables) =>
      fetcher<IImportPeriodsMutation, IImportPeriodsMutationVariables>(
        client,
        ImportPeriodsDocument,
        variables,
        headers
      )(),
    options
  );
useImportPeriodsMutation.fetcher = (
  client: GraphQLClient,
  variables?: IImportPeriodsMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IImportPeriodsMutation, IImportPeriodsMutationVariables>(
    client,
    ImportPeriodsDocument,
    variables,
    headers
  );
export const ImportSchedulesDocument = /*#__PURE__*/ `
    mutation ImportSchedules {
  importSchedules {
    _id
    classGroup
    classroom
    createdAt
    deletedAt
    finalTime
    isDeleted
    period
    startTime
    subject
    teacher
    updatedAt
    weekday
  }
}
    `;
export const useImportSchedulesMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IImportSchedulesMutation,
    TError,
    IImportSchedulesMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IImportSchedulesMutation, TError, IImportSchedulesMutationVariables, TContext>(
    ['ImportSchedules'],
    (variables?: IImportSchedulesMutationVariables) =>
      fetcher<IImportSchedulesMutation, IImportSchedulesMutationVariables>(
        client,
        ImportSchedulesDocument,
        variables,
        headers
      )(),
    options
  );
useImportSchedulesMutation.fetcher = (
  client: GraphQLClient,
  variables?: IImportSchedulesMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IImportSchedulesMutation, IImportSchedulesMutationVariables>(
    client,
    ImportSchedulesDocument,
    variables,
    headers
  );
export const ImportSubjectsDocument = /*#__PURE__*/ `
    mutation ImportSubjects {
  importSubjects {
    _id
    areaKey
    createdAt
    deletedAt
    isDeleted
    largeName
    schoolarLevel
    shortName
    subjectType
    updatedAt
  }
}
    `;
export const useImportSubjectsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IImportSubjectsMutation,
    TError,
    IImportSubjectsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IImportSubjectsMutation, TError, IImportSubjectsMutationVariables, TContext>(
    ['ImportSubjects'],
    (variables?: IImportSubjectsMutationVariables) =>
      fetcher<IImportSubjectsMutation, IImportSubjectsMutationVariables>(
        client,
        ImportSubjectsDocument,
        variables,
        headers
      )(),
    options
  );
useImportSubjectsMutation.fetcher = (
  client: GraphQLClient,
  variables?: IImportSubjectsMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IImportSubjectsMutation, IImportSubjectsMutationVariables>(
    client,
    ImportSubjectsDocument,
    variables,
    headers
  );
export const ImportTeachersDocument = /*#__PURE__*/ `
    mutation ImportTeachers {
  importTeachers {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    photo
    rfc
    roles
    updatedAt
  }
}
    `;
export const useImportTeachersMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IImportTeachersMutation,
    TError,
    IImportTeachersMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IImportTeachersMutation, TError, IImportTeachersMutationVariables, TContext>(
    ['ImportTeachers'],
    (variables?: IImportTeachersMutationVariables) =>
      fetcher<IImportTeachersMutation, IImportTeachersMutationVariables>(
        client,
        ImportTeachersDocument,
        variables,
        headers
      )(),
    options
  );
useImportTeachersMutation.fetcher = (
  client: GraphQLClient,
  variables?: IImportTeachersMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IImportTeachersMutation, IImportTeachersMutationVariables>(
    client,
    ImportTeachersDocument,
    variables,
    headers
  );
export const CreatePeriodDocument = /*#__PURE__*/ `
    mutation CreatePeriod($data: UpsertPeriodInput!) {
  createPeriod(data: $data) {
    _id
    createdAt
    deletedAt
    finalDate
    isDeleted
    largeIdentifier
    name
    shortIdentifier
    startDate
    updatedAt
  }
}
    `;
export const useCreatePeriodMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreatePeriodMutation,
    TError,
    ICreatePeriodMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreatePeriodMutation, TError, ICreatePeriodMutationVariables, TContext>(
    ['CreatePeriod'],
    (variables?: ICreatePeriodMutationVariables) =>
      fetcher<ICreatePeriodMutation, ICreatePeriodMutationVariables>(
        client,
        CreatePeriodDocument,
        variables,
        headers
      )(),
    options
  );
useCreatePeriodMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreatePeriodMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreatePeriodMutation, ICreatePeriodMutationVariables>(
    client,
    CreatePeriodDocument,
    variables,
    headers
  );
export const UpdatePeriodDocument = /*#__PURE__*/ `
    mutation UpdatePeriod($data: UpdatePeriodInput!) {
  updatePeriod(data: $data) {
    _id
    createdAt
    deletedAt
    finalDate
    isDeleted
    largeIdentifier
    name
    shortIdentifier
    startDate
    updatedAt
  }
}
    `;
export const useUpdatePeriodMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdatePeriodMutation,
    TError,
    IUpdatePeriodMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdatePeriodMutation, TError, IUpdatePeriodMutationVariables, TContext>(
    ['UpdatePeriod'],
    (variables?: IUpdatePeriodMutationVariables) =>
      fetcher<IUpdatePeriodMutation, IUpdatePeriodMutationVariables>(
        client,
        UpdatePeriodDocument,
        variables,
        headers
      )(),
    options
  );
useUpdatePeriodMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdatePeriodMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdatePeriodMutation, IUpdatePeriodMutationVariables>(
    client,
    UpdatePeriodDocument,
    variables,
    headers
  );
export const DeletePeriodDocument = /*#__PURE__*/ `
    mutation DeletePeriod($data: PeriodIdArgs!) {
  deletePeriod(data: $data) {
    deleted
  }
}
    `;
export const useDeletePeriodMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeletePeriodMutation,
    TError,
    IDeletePeriodMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeletePeriodMutation, TError, IDeletePeriodMutationVariables, TContext>(
    ['DeletePeriod'],
    (variables?: IDeletePeriodMutationVariables) =>
      fetcher<IDeletePeriodMutation, IDeletePeriodMutationVariables>(
        client,
        DeletePeriodDocument,
        variables,
        headers
      )(),
    options
  );
useDeletePeriodMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeletePeriodMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeletePeriodMutation, IDeletePeriodMutationVariables>(
    client,
    DeletePeriodDocument,
    variables,
    headers
  );
export const GetAllPeriodsDocument = /*#__PURE__*/ `
    query GetAllPeriods($filter: PeriodArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllPeriods(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      createdAt
      deletedAt
      finalDate
      isDeleted
      largeIdentifier
      name
      shortIdentifier
      startDate
      updatedAt
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllPeriodsQuery = <TData = IGetAllPeriodsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllPeriodsQueryVariables,
  options?: UseQueryOptions<IGetAllPeriodsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllPeriodsQuery, TError, TData>(
    variables === undefined ? ['GetAllPeriods'] : ['GetAllPeriods', variables],
    fetcher<IGetAllPeriodsQuery, IGetAllPeriodsQueryVariables>(
      client,
      GetAllPeriodsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllPeriodsQuery.getKey = (variables?: IGetAllPeriodsQueryVariables) =>
  variables === undefined ? ['GetAllPeriods'] : ['GetAllPeriods', variables];
useGetAllPeriodsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllPeriodsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllPeriodsQuery, IGetAllPeriodsQueryVariables>(
    client,
    GetAllPeriodsDocument,
    variables,
    headers
  );
export const GetPeriodByIdDocument = /*#__PURE__*/ `
    query GetPeriodById($id: ID) {
  getPeriodById(_id: $id) {
    _id
    createdAt
    deletedAt
    finalDate
    isDeleted
    largeIdentifier
    name
    shortIdentifier
    startDate
    updatedAt
  }
}
    `;
export const useGetPeriodByIdQuery = <TData = IGetPeriodByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetPeriodByIdQueryVariables,
  options?: UseQueryOptions<IGetPeriodByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetPeriodByIdQuery, TError, TData>(
    variables === undefined ? ['GetPeriodById'] : ['GetPeriodById', variables],
    fetcher<IGetPeriodByIdQuery, IGetPeriodByIdQueryVariables>(
      client,
      GetPeriodByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetPeriodByIdQuery.getKey = (variables?: IGetPeriodByIdQueryVariables) =>
  variables === undefined ? ['GetPeriodById'] : ['GetPeriodById', variables];
useGetPeriodByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetPeriodByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetPeriodByIdQuery, IGetPeriodByIdQueryVariables>(
    client,
    GetPeriodByIdDocument,
    variables,
    headers
  );
export const CreateScheduleDocument = /*#__PURE__*/ `
    mutation CreateSchedule($data: UpsertScheduleInput!) {
  createSchedule(data: $data) {
    _id
    classGroup
    classroom
    createdAt
    deletedAt
    finalTime
    isDeleted
    period
    startTime
    subject
    teacher
    updatedAt
    weekday
  }
}
    `;
export const useCreateScheduleMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateScheduleMutation,
    TError,
    ICreateScheduleMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateScheduleMutation, TError, ICreateScheduleMutationVariables, TContext>(
    ['CreateSchedule'],
    (variables?: ICreateScheduleMutationVariables) =>
      fetcher<ICreateScheduleMutation, ICreateScheduleMutationVariables>(
        client,
        CreateScheduleDocument,
        variables,
        headers
      )(),
    options
  );
useCreateScheduleMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateScheduleMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateScheduleMutation, ICreateScheduleMutationVariables>(
    client,
    CreateScheduleDocument,
    variables,
    headers
  );
export const UpdateScheduleDocument = /*#__PURE__*/ `
    mutation UpdateSchedule($data: UpdateScheduleInput!) {
  updateSchedule(data: $data) {
    _id
    classGroup
    classroom
    createdAt
    deletedAt
    finalTime
    isDeleted
    period
    startTime
    subject
    teacher
    updatedAt
    weekday
  }
}
    `;
export const useUpdateScheduleMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateScheduleMutation,
    TError,
    IUpdateScheduleMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateScheduleMutation, TError, IUpdateScheduleMutationVariables, TContext>(
    ['UpdateSchedule'],
    (variables?: IUpdateScheduleMutationVariables) =>
      fetcher<IUpdateScheduleMutation, IUpdateScheduleMutationVariables>(
        client,
        UpdateScheduleDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateScheduleMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateScheduleMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateScheduleMutation, IUpdateScheduleMutationVariables>(
    client,
    UpdateScheduleDocument,
    variables,
    headers
  );
export const DeleteScheduleDocument = /*#__PURE__*/ `
    mutation DeleteSchedule($data: ScheduleIdArgs!) {
  deleteSchedule(data: $data) {
    deleted
  }
}
    `;
export const useDeleteScheduleMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteScheduleMutation,
    TError,
    IDeleteScheduleMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteScheduleMutation, TError, IDeleteScheduleMutationVariables, TContext>(
    ['DeleteSchedule'],
    (variables?: IDeleteScheduleMutationVariables) =>
      fetcher<IDeleteScheduleMutation, IDeleteScheduleMutationVariables>(
        client,
        DeleteScheduleDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteScheduleMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteScheduleMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteScheduleMutation, IDeleteScheduleMutationVariables>(
    client,
    DeleteScheduleDocument,
    variables,
    headers
  );
export const GetAllSchedulesDocument = /*#__PURE__*/ `
    query GetAllSchedules($filter: ScheduleArgs, $limit: Int, $offset: Int, $page: Int, $sort: JSON) {
  getAllSchedules(
    filter: $filter
    limit: $limit
    offset: $offset
    page: $page
    sort: $sort
  ) {
    docs {
      _id
      classroom
      createdAt
      deletedAt
      finalTime
      classGroup
      isDeleted
      period
      teacher
      startTime
      subject
      updatedAt
      weekday
    }
  }
}
    `;
export const useGetAllSchedulesQuery = <TData = IGetAllSchedulesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllSchedulesQueryVariables,
  options?: UseQueryOptions<IGetAllSchedulesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllSchedulesQuery, TError, TData>(
    variables === undefined ? ['GetAllSchedules'] : ['GetAllSchedules', variables],
    fetcher<IGetAllSchedulesQuery, IGetAllSchedulesQueryVariables>(
      client,
      GetAllSchedulesDocument,
      variables,
      headers
    ),
    options
  );

useGetAllSchedulesQuery.getKey = (variables?: IGetAllSchedulesQueryVariables) =>
  variables === undefined ? ['GetAllSchedules'] : ['GetAllSchedules', variables];
useGetAllSchedulesQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllSchedulesQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllSchedulesQuery, IGetAllSchedulesQueryVariables>(
    client,
    GetAllSchedulesDocument,
    variables,
    headers
  );
export const GetScheduleByIdDocument = /*#__PURE__*/ `
    query GetScheduleById($id: ID) {
  getScheduleById(_id: $id) {
    _id
    classGroup
    classroom
    createdAt
    deletedAt
    finalTime
    classGroup
    isDeleted
    period
    teacher
    weekday
    startTime
    subject
    updatedAt
  }
}
    `;
export const useGetScheduleByIdQuery = <TData = IGetScheduleByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetScheduleByIdQueryVariables,
  options?: UseQueryOptions<IGetScheduleByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetScheduleByIdQuery, TError, TData>(
    variables === undefined ? ['GetScheduleById'] : ['GetScheduleById', variables],
    fetcher<IGetScheduleByIdQuery, IGetScheduleByIdQueryVariables>(
      client,
      GetScheduleByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetScheduleByIdQuery.getKey = (variables?: IGetScheduleByIdQueryVariables) =>
  variables === undefined ? ['GetScheduleById'] : ['GetScheduleById', variables];
useGetScheduleByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetScheduleByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetScheduleByIdQuery, IGetScheduleByIdQueryVariables>(
    client,
    GetScheduleByIdDocument,
    variables,
    headers
  );
export const GetSchedulesFormattedDocument = /*#__PURE__*/ `
    query GetSchedulesFormatted($teacher: ID, $schedule: ID) {
  getSchedulesFormatted(teacher: $teacher, schedule: $schedule) {
    _id
    classroomIdentifier
    finalTime
    groupIdentifier
    startTime
    subjectLargeName
    subjectShortName
    teacherId
    teacherFirstName
    teacherLastName
    teacherMiddleName
    teacherRfc
    weekday
  }
}
    `;
export const useGetSchedulesFormattedQuery = <
  TData = IGetSchedulesFormattedQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: IGetSchedulesFormattedQueryVariables,
  options?: UseQueryOptions<IGetSchedulesFormattedQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetSchedulesFormattedQuery, TError, TData>(
    variables === undefined ? ['GetSchedulesFormatted'] : ['GetSchedulesFormatted', variables],
    fetcher<IGetSchedulesFormattedQuery, IGetSchedulesFormattedQueryVariables>(
      client,
      GetSchedulesFormattedDocument,
      variables,
      headers
    ),
    options
  );

useGetSchedulesFormattedQuery.getKey = (variables?: IGetSchedulesFormattedQueryVariables) =>
  variables === undefined ? ['GetSchedulesFormatted'] : ['GetSchedulesFormatted', variables];
useGetSchedulesFormattedQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetSchedulesFormattedQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetSchedulesFormattedQuery, IGetSchedulesFormattedQueryVariables>(
    client,
    GetSchedulesFormattedDocument,
    variables,
    headers
  );
export const GetUniqueOptionsCareerDocument = /*#__PURE__*/ `
    query GetUniqueOptionsCareer {
  getUniqueOptionsCareer {
    careers {
      label
      value
    }
    semesters
  }
}
    `;
export const useGetUniqueOptionsCareerQuery = <
  TData = IGetUniqueOptionsCareerQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: IGetUniqueOptionsCareerQueryVariables,
  options?: UseQueryOptions<IGetUniqueOptionsCareerQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetUniqueOptionsCareerQuery, TError, TData>(
    variables === undefined ? ['GetUniqueOptionsCareer'] : ['GetUniqueOptionsCareer', variables],
    fetcher<IGetUniqueOptionsCareerQuery, IGetUniqueOptionsCareerQueryVariables>(
      client,
      GetUniqueOptionsCareerDocument,
      variables,
      headers
    ),
    options
  );

useGetUniqueOptionsCareerQuery.getKey = (variables?: IGetUniqueOptionsCareerQueryVariables) =>
  variables === undefined ? ['GetUniqueOptionsCareer'] : ['GetUniqueOptionsCareer', variables];
useGetUniqueOptionsCareerQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetUniqueOptionsCareerQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetUniqueOptionsCareerQuery, IGetUniqueOptionsCareerQueryVariables>(
    client,
    GetUniqueOptionsCareerDocument,
    variables,
    headers
  );
export const GetAttendanceStatisticsDocument = /*#__PURE__*/ `
    query GetAttendanceStatistics($career: ID, $department: ID, $period: ID, $semester: String, $teacher: ID) {
  getAttendanceStatistics(
    career: $career
    department: $department
    period: $period
    semester: $semester
    teacher: $teacher
  ) {
    classAbsentDay
    classAbsentMonth
    classAbsentPeriod
    classAbsentSemester
    classAbsentYear
    classJustifyDay
    classJustifyMonth
    classJustifyPeriod
    classJustifySemester
    classJustifyYear
    classPresentDay
    classPresentMonth
    classPresentPeriod
    classPresentSemester
    classPresentYear
    weekday1
    weekday2
    weekday3
    weekday4
    weekday5
    weekday6
    weekday7
  }
}
    `;
export const useGetAttendanceStatisticsQuery = <
  TData = IGetAttendanceStatisticsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: IGetAttendanceStatisticsQueryVariables,
  options?: UseQueryOptions<IGetAttendanceStatisticsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAttendanceStatisticsQuery, TError, TData>(
    variables === undefined ? ['GetAttendanceStatistics'] : ['GetAttendanceStatistics', variables],
    fetcher<IGetAttendanceStatisticsQuery, IGetAttendanceStatisticsQueryVariables>(
      client,
      GetAttendanceStatisticsDocument,
      variables,
      headers
    ),
    options
  );

useGetAttendanceStatisticsQuery.getKey = (variables?: IGetAttendanceStatisticsQueryVariables) =>
  variables === undefined ? ['GetAttendanceStatistics'] : ['GetAttendanceStatistics', variables];
useGetAttendanceStatisticsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAttendanceStatisticsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAttendanceStatisticsQuery, IGetAttendanceStatisticsQueryVariables>(
    client,
    GetAttendanceStatisticsDocument,
    variables,
    headers
  );
export const CreateSubjectDocument = /*#__PURE__*/ `
    mutation CreateSubject($data: UpsertSubjectInput!) {
  createSubject(data: $data) {
    _id
    areaKey
    createdAt
    deletedAt
    isDeleted
    largeName
    schoolarLevel
    shortName
    subjectType
    updatedAt
  }
}
    `;
export const useCreateSubjectMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateSubjectMutation,
    TError,
    ICreateSubjectMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateSubjectMutation, TError, ICreateSubjectMutationVariables, TContext>(
    ['CreateSubject'],
    (variables?: ICreateSubjectMutationVariables) =>
      fetcher<ICreateSubjectMutation, ICreateSubjectMutationVariables>(
        client,
        CreateSubjectDocument,
        variables,
        headers
      )(),
    options
  );
useCreateSubjectMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateSubjectMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateSubjectMutation, ICreateSubjectMutationVariables>(
    client,
    CreateSubjectDocument,
    variables,
    headers
  );
export const UpdateSubjectDocument = /*#__PURE__*/ `
    mutation UpdateSubject($data: UpdateSubjectInput!) {
  updateSubject(data: $data) {
    _id
    areaKey
    createdAt
    deletedAt
    isDeleted
    largeName
    schoolarLevel
    shortName
    subjectType
    updatedAt
  }
}
    `;
export const useUpdateSubjectMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateSubjectMutation,
    TError,
    IUpdateSubjectMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateSubjectMutation, TError, IUpdateSubjectMutationVariables, TContext>(
    ['UpdateSubject'],
    (variables?: IUpdateSubjectMutationVariables) =>
      fetcher<IUpdateSubjectMutation, IUpdateSubjectMutationVariables>(
        client,
        UpdateSubjectDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateSubjectMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateSubjectMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateSubjectMutation, IUpdateSubjectMutationVariables>(
    client,
    UpdateSubjectDocument,
    variables,
    headers
  );
export const DeleteSubjectDocument = /*#__PURE__*/ `
    mutation DeleteSubject($data: SubjectIdArgs!) {
  deleteSubject(data: $data) {
    deleted
  }
}
    `;
export const useDeleteSubjectMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IDeleteSubjectMutation,
    TError,
    IDeleteSubjectMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteSubjectMutation, TError, IDeleteSubjectMutationVariables, TContext>(
    ['DeleteSubject'],
    (variables?: IDeleteSubjectMutationVariables) =>
      fetcher<IDeleteSubjectMutation, IDeleteSubjectMutationVariables>(
        client,
        DeleteSubjectDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteSubjectMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteSubjectMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteSubjectMutation, IDeleteSubjectMutationVariables>(
    client,
    DeleteSubjectDocument,
    variables,
    headers
  );
export const GetAllSubjectsDocument = /*#__PURE__*/ `
    query GetAllSubjects($filter: SubjectArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllSubjects(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      areaKey
      createdAt
      deletedAt
      isDeleted
      largeName
      schoolarLevel
      shortName
      subjectType
      updatedAt
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllSubjectsQuery = <TData = IGetAllSubjectsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllSubjectsQueryVariables,
  options?: UseQueryOptions<IGetAllSubjectsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllSubjectsQuery, TError, TData>(
    variables === undefined ? ['GetAllSubjects'] : ['GetAllSubjects', variables],
    fetcher<IGetAllSubjectsQuery, IGetAllSubjectsQueryVariables>(
      client,
      GetAllSubjectsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllSubjectsQuery.getKey = (variables?: IGetAllSubjectsQueryVariables) =>
  variables === undefined ? ['GetAllSubjects'] : ['GetAllSubjects', variables];
useGetAllSubjectsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllSubjectsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllSubjectsQuery, IGetAllSubjectsQueryVariables>(
    client,
    GetAllSubjectsDocument,
    variables,
    headers
  );
export const GetSubjectByIdDocument = /*#__PURE__*/ `
    query GetSubjectById($id: ID) {
  getSubjectById(_id: $id) {
    _id
    areaKey
    createdAt
    deletedAt
    isDeleted
    largeName
    schoolarLevel
    shortName
    subjectType
    updatedAt
  }
}
    `;
export const useGetSubjectByIdQuery = <TData = IGetSubjectByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetSubjectByIdQueryVariables,
  options?: UseQueryOptions<IGetSubjectByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetSubjectByIdQuery, TError, TData>(
    variables === undefined ? ['GetSubjectById'] : ['GetSubjectById', variables],
    fetcher<IGetSubjectByIdQuery, IGetSubjectByIdQueryVariables>(
      client,
      GetSubjectByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetSubjectByIdQuery.getKey = (variables?: IGetSubjectByIdQueryVariables) =>
  variables === undefined ? ['GetSubjectById'] : ['GetSubjectById', variables];
useGetSubjectByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetSubjectByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetSubjectByIdQuery, IGetSubjectByIdQueryVariables>(
    client,
    GetSubjectByIdDocument,
    variables,
    headers
  );
export const DeleteUserDocument = /*#__PURE__*/ `
    mutation DeleteUser($data: UserIdArgs!) {
  deleteUser(data: $data) {
    deleted
  }
}
    `;
export const useDeleteUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IDeleteUserMutation, TError, IDeleteUserMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IDeleteUserMutation, TError, IDeleteUserMutationVariables, TContext>(
    ['DeleteUser'],
    (variables?: IDeleteUserMutationVariables) =>
      fetcher<IDeleteUserMutation, IDeleteUserMutationVariables>(
        client,
        DeleteUserDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteUserMutation.fetcher = (
  client: GraphQLClient,
  variables: IDeleteUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IDeleteUserMutation, IDeleteUserMutationVariables>(
    client,
    DeleteUserDocument,
    variables,
    headers
  );
export const UpdateUserDocument = /*#__PURE__*/ `
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    rfc
    roles
    photo
    updatedAt
  }
}
    `;
export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IUpdateUserMutation, TError, IUpdateUserMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateUserMutation, TError, IUpdateUserMutationVariables, TContext>(
    ['UpdateUser'],
    (variables?: IUpdateUserMutationVariables) =>
      fetcher<IUpdateUserMutation, IUpdateUserMutationVariables>(
        client,
        UpdateUserDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateUserMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateUserMutation, IUpdateUserMutationVariables>(
    client,
    UpdateUserDocument,
    variables,
    headers
  );
export const UpsertUserDocument = /*#__PURE__*/ `
    mutation UpsertUser($data: UpsertUserInput!) {
  upsertUser(data: $data) {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    rfc
    roles
    photo
    updatedAt
  }
}
    `;
export const useUpsertUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IUpsertUserMutation, TError, IUpsertUserMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpsertUserMutation, TError, IUpsertUserMutationVariables, TContext>(
    ['UpsertUser'],
    (variables?: IUpsertUserMutationVariables) =>
      fetcher<IUpsertUserMutation, IUpsertUserMutationVariables>(
        client,
        UpsertUserDocument,
        variables,
        headers
      )(),
    options
  );
useUpsertUserMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpsertUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpsertUserMutation, IUpsertUserMutationVariables>(
    client,
    UpsertUserDocument,
    variables,
    headers
  );
export const GetAllUsersDocument = /*#__PURE__*/ `
    query GetAllUsers($filter: UserArgs, $limit: Int, $offset: Int, $page: Int) {
  getAllUsers(filter: $filter, limit: $limit, offset: $offset, page: $page) {
    docs {
      _id
      createdAt
      deletedAt
      department
      email
      firstName
      gender
      isDeleted
      lastName
      middleName
      password
      rfc
      roles
      photo
      updatedAt
      photo
    }
    hasNextPage
    hasPrevPage
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetAllUsersQuery = <TData = IGetAllUsersQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllUsersQueryVariables,
  options?: UseQueryOptions<IGetAllUsersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllUsersQuery, TError, TData>(
    variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables],
    fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(
      client,
      GetAllUsersDocument,
      variables,
      headers
    ),
    options
  );

useGetAllUsersQuery.getKey = (variables?: IGetAllUsersQueryVariables) =>
  variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables];
useGetAllUsersQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllUsersQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(
    client,
    GetAllUsersDocument,
    variables,
    headers
  );
export const GetUserByIdDocument = /*#__PURE__*/ `
    query GetUserById($id: ID) {
  getUserById(_id: $id) {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    rfc
    roles
    photo
    updatedAt
    photo
  }
}
    `;
export const useGetUserByIdQuery = <TData = IGetUserByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetUserByIdQueryVariables,
  options?: UseQueryOptions<IGetUserByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetUserByIdQuery, TError, TData>(
    variables === undefined ? ['GetUserById'] : ['GetUserById', variables],
    fetcher<IGetUserByIdQuery, IGetUserByIdQueryVariables>(
      client,
      GetUserByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetUserByIdQuery.getKey = (variables?: IGetUserByIdQueryVariables) =>
  variables === undefined ? ['GetUserById'] : ['GetUserById', variables];
useGetUserByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetUserByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetUserByIdQuery, IGetUserByIdQueryVariables>(
    client,
    GetUserByIdDocument,
    variables,
    headers
  );
export const MeDocument = /*#__PURE__*/ `
    query Me {
  me {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    rfc
    roles
    photo
    updatedAt
  }
}
    `;
export const useMeQuery = <TData = IMeQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IMeQueryVariables,
  options?: UseQueryOptions<IMeQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IMeQuery, TError, TData>(
    variables === undefined ? ['Me'] : ['Me', variables],
    fetcher<IMeQuery, IMeQueryVariables>(client, MeDocument, variables, headers),
    options
  );

useMeQuery.getKey = (variables?: IMeQueryVariables) =>
  variables === undefined ? ['Me'] : ['Me', variables];
useMeQuery.fetcher = (
  client: GraphQLClient,
  variables?: IMeQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<IMeQuery, IMeQueryVariables>(client, MeDocument, variables, headers);
export const UserAddedDocument = /*#__PURE__*/ `
    subscription UserAdded {
  userAdded {
    _id
    createdAt
    deletedAt
    department
    email
    firstName
    gender
    isDeleted
    lastName
    middleName
    password
    rfc
    roles
    updatedAt
  }
}
    `;
