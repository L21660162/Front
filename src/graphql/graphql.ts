import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/src/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
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
  Present = 'PRESENT'
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
  ReportePdf = 'REPORTE_PDF'
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
  File = 'FILE'
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
  Subdirector = 'SUBDIRECTOR'
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
}

/** vacancy */
export interface IVacancy {
  _id: Scalars['ID']['output'];
  /** ESTADO ACTUAL DE LA VACANTE */
  actuallyStatus: IVacancyStatus;
  /** BENEFICIOS QUE PUEDE RECIBIR - | OPCIONAL | - */
  benefits?: Maybe<Scalars['String']['output']>;
  /** FORMAS DE CONTACTAR A LA ORGANIZACION */
  contact: IContact;
  createdAt: Scalars['DateTime']['output'];
  /** FECHA LIMITE DE LA VACANTE */
  deadline: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** DESCRIPCION DE LA VACANTE */
  description: Scalars['String']['output'];
  /** NIVEL DE EXPERIENCIA REQUERIDO POR LA ORGANIZACION */
  experienceLevel: IExperienceLevels;
  isDeleted: Scalars['Boolean']['output'];
  /** LOCALICACION DEL LUGAR DE TRABAJO */
  location: ILocation;
  /** CANTIDAD MAXIMA DE ALUMNOS A ACEPTAR */
  maxCapacity: Scalars['Int']['output'];
  /** ID DE LA ORGANIZACION QUE GENERO LA VACANTE */
  organizationId: Scalars['ID']['output'];
  /** POSICION A LA CUAL SE VA A POSTULAR */
  position: Scalars['String']['output'];
  /** POSTULACIONES REALIZADAS A LA VACANTE */
  postulation: Array<IPostulation>;
  /** REQUISITOS ESPERADOS DE LOS SOLICITANTES */
  requirements: Scalars['String']['output'];
  /** INFORMACION MAS DETALLADAS DE LAS ACTIVIDADES A REALIZAR */
  responsibilities: Scalars['String']['output'];
  /** SALARIO QUE PUEDE RECIBIR - | OPCIONAL | - */
  salary: Scalars['Float']['output'];
  /** COMPETENCIAS DESEADAS PARA EL TRABAJO */
  skills: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}

export interface IVacancyArgs {
  keyword?: InputMaybe<Scalars['String']['input']>;
}

export interface IVacancyIdArgs {
  _id?: InputMaybe<Scalars['ID']['input']>;
}

/** Define the different vacancy status */
export enum IVacancyStatus {
  /** Concluded */
  Concluded = 'CONCLUDED',
  /** Finish */
  Finish = 'FINISH',
  /** In progress */
  InProgress = 'IN_PROGRESS',
  /** Started */
  Started = 'STARTED',
}

/** Create organization */
export interface ICreateOrganizationInput {
  abbreviationOrg: Scalars['String']['input'];
  emailOrg?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<ILocationInput>;
  name: Scalars['String']['input'];
  numProyect?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  vacancyNumbers?: InputMaybe<Scalars['Float']['input']>;
}

export type ISignUpMutationVariables = Exact<{
  data: ISignUpInput;
}>;


export type ISignUpMutation = { signUp: { _id?: string | null, createdAt?: any | null, email: string, firstName: string, lastName: string, middleName?: string | null, roles: Array<IRoles> } };

export type ISignInMutationVariables = Exact<{
  data: ISignInInput;
}>;


export type ISignInMutation = { signIn: { accessToken: string, accessTokenExpiresIn: string, refreshToken: string, refreshTokenExpiresIn: string, type: string } };

export type ISignOutMutationVariables = Exact<{
  data: IRefreshTokenInput;
}>;


export type ISignOutMutation = { signOut: boolean };

export type IChangePasswordMutationVariables = Exact<{
  data: IChangePasswordInput;
}>;


export type IChangePasswordMutation = { changePassword: { _id?: string | null, email: string, firstName: string, lastName: string, middleName?: string | null, updatedAt?: any | null } };

export type IPasswordRecoveryMutationVariables = Exact<{
  data: IPasswordRecoveryInput;
}>;


export type IPasswordRecoveryMutation = { passwordRecovery: string };

export type IPasswordResetMutationVariables = Exact<{
  data: IPasswordResetInput;
}>;


export type IPasswordResetMutation = { passwordReset: { _id?: string | null, email: string, firstName: string, lastName: string, middleName?: string | null, updatedAt?: any | null } };

export type IRefreshTokenQueryVariables = Exact<{
  data: IRefreshTokenInput;
}>;

export type IRefreshTokenQuery = {
  refreshToken: { accessToken: string; accessTokenExpiresIn: string; type: string };
};

export type ICreateCareerMutationVariables = Exact<{
  data: ICreateCareerInput;
}>;


export type ICreateCareerMutation = { createCareer: { _id: string, abbreviationCareer: string, createdAt: any, credits: number, deletedAt?: any | null, description: string, duration: string, isCertified: boolean, isDeleted: boolean, name: string, updatedAt: any } };

export type IUpdateCareerMutationVariables = Exact<{
  data: IUpdateCareerInput;
}>;


export type IUpdateCareerMutation = { updateCareer: { _id: string, abbreviationCareer: string, createdAt: any, credits: number, deletedAt?: any | null, description: string, duration: string, isCertified: boolean, isDeleted: boolean, name: string, updatedAt: any } };

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


export type IGetAllCareersQuery = { getAllCareers: { hasNextPage: boolean, hasPrevPage: boolean, limit: number, nextPage?: number | null, offset?: number | null, page: number, pagingCounter: number, prevPage?: number | null, totalDocs: number, totalPages: number, docs: Array<{ _id: string, abbreviationCareer: string, createdAt: any, credits: number, deletedAt?: any | null, description: string, duration: string, isCertified: boolean, isDeleted: boolean, name: string, updatedAt: any }> } };

export type IGetCareerByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetCareerByIdQuery = {
  getFileById: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    description: string;
    extension: IFile_Extension;
    isDeleted: boolean;
    nameFile: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    uploadedBy: string;
  };
};

export type IUploadClassroomPictureMutationVariables = Exact<{
  data: IUploadPictureClassroomInput;
}>;


export type IUpdateFileMutation = {
  updateFile: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    description: string;
    extension: IFile_Extension;
    isDeleted: boolean;
    nameFile: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    uploadedBy: string;
    approvedBy: Array<{ status: IFileStatus; userId: string }>;
  };
};

export type ICreateFileMutationVariables = Exact<{
  data: ICreateFile;
}>;

export type ICreateFileMutation = {
  createFile: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    description: string;
    extension: IFile_Extension;
    isDeleted: boolean;
    nameFile: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    uploadedBy: string;
    approvedBy: Array<{ status: IFileStatus; userId: string }>;
  };
};

export type IGetAllFilesQueryVariables = Exact<{
  filter?: InputMaybe<IFileArgs>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
  populate?: InputMaybe<Scalars['String']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
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
      createdAt: any;
      deletedAt?: any | null;
      description: string;
      extension: IFile_Extension;
      isDeleted: boolean;
      nameFile: string;
      size: number;
      type: IFileType;
      updatedAt: any;
      uploadedBy: string;
      approvedBy: Array<{ status: IFileStatus; userId: string }>;
    }>;
  };
};

export type IGetDepartmentByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetFileByIdQuery = {
  getFileById: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    description: string;
    extension: IFile_Extension;
    isDeleted: boolean;
    nameFile: string;
    size: number;
    type: IFileType;
    updatedAt: any;
    uploadedBy: string;
    approvedBy: Array<{ status: IFileStatus; userId: string }>;
  };
};

export type IUpdateInstituteInputMutationVariables = Exact<{
  data: IUpdateInstituteInput;
}>;


export type IUpdateInstituteInputMutation = {
  UpdateInstituteInput: {
    Logo: string;
    _id: string;
    abbreviation: string;
    createdAt: any;
    deletedAt?: any | null;
    isDeleted: boolean;
    level: IInstitutionlevel;
    name: string;
    totalHours: number;
    updatedAt: any;
    adress: { address: string; city: string; postalCode: number; state: string; suburb: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    principallName: { firstName: string; lastName: string; secondLastName: string };
  };
};

export type ICreateInstituteMutationVariables = Exact<{
  data: IInsertInstituteInput;
}>;

export type ICreateInstituteMutation = {
  createInstitute: {
    Logo: string;
    _id: string;
    abbreviation: string;
    createdAt: any;
    deletedAt?: any | null;
    isDeleted: boolean;
    level: IInstitutionlevel;
    name: string;
    totalHours: number;
    updatedAt: any;
    adress: { address: string; city: string; postalCode: number; state: string; suburb: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    principallName: { firstName: string; lastName: string; secondLastName: string };
  };
};

export type IRemoveInstituteMutationVariables = Exact<{
  data: IInstituteIdArgs;
}>;

export type IRemoveInstituteMutation = { removeInstitute: { deleted: number } };

export type IGetInstituteByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetInstituteByIdQuery = {
  getInstituteById: {
    Logo: string;
    _id: string;
    abbreviation: string;
    createdAt: any;
    deletedAt?: any | null;
    isDeleted: boolean;
    level: IInstitutionlevel;
    name: string;
    totalHours: number;
    updatedAt: any;
    adress: { address: string; city: string; postalCode: number; state: string; suburb: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    principallName: { firstName: string; lastName: string; secondLastName: string };
  };
};

export type ICreateOrganizationMutationVariables = Exact<{
  data: ICreateOrganizationInput;
}>;

export type ICreateOrganizationMutation = {
  createOrganization: {
    name: string;
    abbreviationOrg: string;
    vacancyNumbers: number;
    phoneNumber: string;
    numProyect: number;
    emailOrg: string;
    location: { suburb: string; state: string; postalCode: number; city: string; address: string };
  };
};

export type IRemoveOrganizationMutationVariables = Exact<{
  data: IOrganizationIdArgs;
}>;


export type IRemoveOrganizationMutation = { removeOrganization: { deleted: number } };

export type IUpdateOrganizationMutationVariables = Exact<{
  data: IUpdateOrganizationInput;
}>;

export type IUpdateOrganizationMutation = {
  updateOrganization: {
    abbreviationOrg: string;
    createdAt: any;
    deletedAt?: any | null;
    emailOrg: string;
    isDeleted: boolean;
    name: string;
    numProyect: number;
    phoneNumber: string;
    updatedAt: any;
    vacancyNumbers: number;
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
  };
};

export type IQueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IQueryQuery = { getOrganizationById: { name: string; abbreviationOrg: string } };

export type IGetOrganizationByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetOrganizationByIdQuery = {
  getOrganizationById: { name: string; phoneNumber: string; numProyect: number };
};

export type IGetAllOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllOrganizationsQuery = {
  getAllOrganizations: {
    docs: Array<{
      name: string;
      _id: string;
      vacancyNumbers: number;
      updatedAt: any;
      phoneNumber: string;
      numProyect: number;
      isDeleted: boolean;
      emailOrg: string;
      deletedAt?: any | null;
      createdAt: any;
      abbreviationOrg: string;
      location: {
        state: string;
        suburb: string;
        postalCode: number;
        city: string;
        address: string;
      };
    }>;
  };
};

export type IRemoveUserMutationVariables = Exact<{
  data: IUserIdArgs;
  signInData2: ISignInInput;
}>;


export type IRemoveUserMutation = {
  removeUser: { deleted: number };
  signIn: {
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
    type: string;
  };
};

export type IUpdateUserMutationVariables = Exact<{
  data: IUpdateUserInput;
}>;


export type IUpdateUserMutation = {
  updateUser: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    email: string;
    firstName: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    roles: Array<IRoles>;
    updatedAt: any;
  };
};

export type IUpsertUserMutationVariables = Exact<{
  data: IUpsertUserInput;
}>;


export type IUpsertUserMutation = {
  upsertUser: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    email: string;
    firstName: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    roles: Array<IRoles>;
    updatedAt: any;
  };
};

export type IGetAllUsersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<IUserArgs>;
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
      _id: string;
      createdAt: any;
      deletedAt?: any | null;
      email: string;
      firstName: string;
      isDeleted: boolean;
      lastName: string;
      middleName?: string | null;
      password: string;
      roles: Array<IRoles>;
      updatedAt: any;
    }>;
  };
};

export type IGetScheduleByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetByIdQuery = {
  getById: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    email: string;
    firstName: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    roles: Array<IRoles>;
    updatedAt: any;
  };
};

export type IMeQueryVariables = Exact<{ [key: string]: never }>;

export type IMeQuery = {
  me: {
    _id: string;
    createdAt: any;
    deletedAt?: any | null;
    email: string;
    firstName: string;
    isDeleted: boolean;
    lastName: string;
    middleName?: string | null;
    password: string;
    roles: Array<IRoles>;
    updatedAt: any;
  };
};

export type ISubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ISubscriptionSubscription = {
  userAdded: {
    _id: string;
    createdAt: any;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    roles: Array<IRoles>;
  };
};

export type IInsertVacancyMutationVariables = Exact<{
  data: IInsertVacancyInput;
}>;

export type IInsertVacancyMutation = {
  createVacancy: {
    _id: string;
    actuallyStatus: IVacancyStatus;
    benefits?: string | null;
    createdAt: any;
    deadline: any;
    deletedAt?: any | null;
    description: string;
    experienceLevel: IExperienceLevels;
    isDeleted: boolean;
    maxCapacity: number;
    organizationId: string;
    position: string;
    requirements: string;
    responsibilities: string;
    salary: number;
    skills: Array<string>;
    updatedAt: any;
    contact: { email: string; person: string; phone: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    postulation: Array<{ status: IPostulationStatus; userId: string }>;
  };
};

export type IUpdateVacancyMutationVariables = Exact<{
  data: IUpdateVacancyInput;
}>;


export type IGetSubjectByIdQuery = { getSubjectById: { _id?: string | null, areaKey: string, createdAt?: any | null, deletedAt?: any | null, isDeleted: boolean, largeName: string, schoolarLevel: string, shortName: string, subjectType: number, updatedAt?: any | null } };

export type IDeleteUserMutationVariables = Exact<{
  data: IUserIdArgs;
}>;


export type IDeleteUserMutation = { deleteUser: { deleted: number } };

export type IUpdateUserMutationVariables = Exact<{
  data: IUpdateUserInput;
}>;


export type IUpdateVacancyStatusMutation = {
  updateVacancyStatus: {
    _id: string;
    actuallyStatus: IVacancyStatus;
    benefits?: string | null;
    createdAt: any;
    deadline: any;
    deletedAt?: any | null;
    description: string;
    experienceLevel: IExperienceLevels;
    isDeleted: boolean;
    maxCapacity: number;
    organizationId: string;
    position: string;
    requirements: string;
    responsibilities: string;
    salary: number;
    skills: Array<string>;
    updatedAt: any;
    contact: { email: string; person: string; phone: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    postulation: Array<{ status: IPostulationStatus; userId: string }>;
  };
};

export type IUpsertPostulationMutationVariables = Exact<{
  data: IAddPostulationIntoVacancyInput;
}>;


export type IUpsertPostulationMutation = {
  upsertPostulation: {
    _id: string;
    actuallyStatus: IVacancyStatus;
    benefits?: string | null;
    createdAt: any;
    deadline: any;
    deletedAt?: any | null;
    description: string;
    experienceLevel: IExperienceLevels;
    isDeleted: boolean;
    maxCapacity: number;
    organizationId: string;
    position: string;
    requirements: string;
    responsibilities: string;
    salary: number;
    skills: Array<string>;
    updatedAt: any;
    contact: { email: string; person: string; phone: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    postulation: Array<{ status: IPostulationStatus; userId: string }>;
  };
};

export type IRemoveVacancyMutationVariables = Exact<{
  data: IVacancyIdArgs;
}>;

export type IRemoveVacancyMutation = { removeVacancy: { deleted: number } };

export type IGetAllVacancyQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllVacancyQuery = {
  getAllVacancies: {
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
      actuallyStatus: IVacancyStatus;
      benefits?: string | null;
      createdAt: any;
      deadline: any;
      deletedAt?: any | null;
      description: string;
      experienceLevel: IExperienceLevels;
      isDeleted: boolean;
      maxCapacity: number;
      organizationId: string;
      position: string;
      requirements: string;
      responsibilities: string;
      salary: number;
      skills: Array<string>;
      updatedAt: any;
      contact: { email: string; person: string; phone: string };
      location: {
        address: string;
        city: string;
        postalCode: number;
        state: string;
        suburb: string;
      };
      postulation: Array<{ status: IPostulationStatus; userId: string }>;
    }>;
  };
};

export type IGetByIdVacancyQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IGetByIdVacancyQuery = {
  getVacancyById: {
    _id: string;
    actuallyStatus: IVacancyStatus;
    benefits?: string | null;
    createdAt: any;
    deadline: any;
    deletedAt?: any | null;
    description: string;
    experienceLevel: IExperienceLevels;
    isDeleted: boolean;
    maxCapacity: number;
    organizationId: string;
    position: string;
    requirements: string;
    responsibilities: string;
    salary: number;
    skills: Array<string>;
    updatedAt: any;
    contact: { email: string; person: string; phone: string };
    location: { address: string; city: string; postalCode: number; state: string; suburb: string };
    postulation: Array<{ status: IPostulationStatus; userId: string }>;
  };
};

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
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ISignUpMutation, TError, ISignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ISignUpMutation, TError, ISignUpMutationVariables, TContext>(
      ['SignUp'],
      (variables?: ISignUpMutationVariables) => fetcher<ISignUpMutation, ISignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
useSignUpMutation.fetcher = (client: GraphQLClient, variables: ISignUpMutationVariables, headers?: RequestInit['headers']) => fetcher<ISignUpMutation, ISignUpMutationVariables>(client, SignUpDocument, variables, headers);
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
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ISignInMutation, TError, ISignInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ISignInMutation, TError, ISignInMutationVariables, TContext>(
      ['SignIn'],
      (variables?: ISignInMutationVariables) => fetcher<ISignInMutation, ISignInMutationVariables>(client, SignInDocument, variables, headers)(),
      options
    );
useSignInMutation.fetcher = (client: GraphQLClient, variables: ISignInMutationVariables, headers?: RequestInit['headers']) => fetcher<ISignInMutation, ISignInMutationVariables>(client, SignInDocument, variables, headers);
export const SignOutDocument = /*#__PURE__*/ `
    mutation SignOut($data: RefreshTokenInput!) {
  signOut(data: $data)
}
    `;
export const useSignOutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ISignOutMutation, TError, ISignOutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ISignOutMutation, TError, ISignOutMutationVariables, TContext>(
      ['SignOut'],
      (variables?: ISignOutMutationVariables) => fetcher<ISignOutMutation, ISignOutMutationVariables>(client, SignOutDocument, variables, headers)(),
      options
    );
useSignOutMutation.fetcher = (client: GraphQLClient, variables: ISignOutMutationVariables, headers?: RequestInit['headers']) => fetcher<ISignOutMutation, ISignOutMutationVariables>(client, SignOutDocument, variables, headers);
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
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<IChangePasswordMutation, TError, IChangePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<IChangePasswordMutation, TError, IChangePasswordMutationVariables, TContext>(
      ['ChangePassword'],
      (variables?: IChangePasswordMutationVariables) => fetcher<IChangePasswordMutation, IChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers)(),
      options
    );
useChangePasswordMutation.fetcher = (client: GraphQLClient, variables: IChangePasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<IChangePasswordMutation, IChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers);
export const PasswordRecoveryDocument = /*#__PURE__*/ `
    mutation PasswordRecovery($data: PasswordRecoveryInput!) {
  passwordRecovery(data: $data)
}
    `;
export const usePasswordRecoveryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<IPasswordRecoveryMutation, TError, IPasswordRecoveryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<IPasswordRecoveryMutation, TError, IPasswordRecoveryMutationVariables, TContext>(
      ['PasswordRecovery'],
      (variables?: IPasswordRecoveryMutationVariables) => fetcher<IPasswordRecoveryMutation, IPasswordRecoveryMutationVariables>(client, PasswordRecoveryDocument, variables, headers)(),
      options
    );
usePasswordRecoveryMutation.fetcher = (client: GraphQLClient, variables: IPasswordRecoveryMutationVariables, headers?: RequestInit['headers']) => fetcher<IPasswordRecoveryMutation, IPasswordRecoveryMutationVariables>(client, PasswordRecoveryDocument, variables, headers);
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
export const usePasswordResetMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<IPasswordResetMutation, TError, IPasswordResetMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<IPasswordResetMutation, TError, IPasswordResetMutationVariables, TContext>(
      ['PasswordReset'],
      (variables?: IPasswordResetMutationVariables) => fetcher<IPasswordResetMutation, IPasswordResetMutationVariables>(client, PasswordResetDocument, variables, headers)(),
      options
    );
usePasswordResetMutation.fetcher = (client: GraphQLClient, variables: IPasswordResetMutationVariables, headers?: RequestInit['headers']) => fetcher<IPasswordResetMutation, IPasswordResetMutationVariables>(client, PasswordResetDocument, variables, headers);
export const RefreshTokenDocument = /*#__PURE__*/ `
    query RefreshToken($data: RefreshTokenInput!) {
  refreshToken(data: $data) {
    accessToken
    accessTokenExpiresIn
    type
  }
}
    `;
export const useRefreshTokenQuery = <
      TData = IRefreshTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: IRefreshTokenQueryVariables,
      options?: UseQueryOptions<IRefreshTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IRefreshTokenQuery, TError, TData>(
      ['RefreshToken', variables],
      fetcher<IRefreshTokenQuery, IRefreshTokenQueryVariables>(client, RefreshTokenDocument, variables, headers),
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
export const useCreateCareerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ICreateCareerMutation, TError, ICreateCareerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ICreateCareerMutation, TError, ICreateCareerMutationVariables, TContext>(
      ['CreateCareer'],
      (variables?: ICreateCareerMutationVariables) => fetcher<ICreateCareerMutation, ICreateCareerMutationVariables>(client, CreateCareerDocument, variables, headers)(),
      options
    );
useCreateCareerMutation.fetcher = (client: GraphQLClient, variables: ICreateCareerMutationVariables, headers?: RequestInit['headers']) => fetcher<ICreateCareerMutation, ICreateCareerMutationVariables>(client, CreateCareerDocument, variables, headers);
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
export const useUpdateCareerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<IUpdateCareerMutation, TError, IUpdateCareerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<IUpdateCareerMutation, TError, IUpdateCareerMutationVariables, TContext>(
      ['UpdateCareer'],
      (variables?: IUpdateCareerMutationVariables) => fetcher<IUpdateCareerMutation, IUpdateCareerMutationVariables>(client, UpdateCareerDocument, variables, headers)(),
      options
    );
useUpdateCareerMutation.fetcher = (client: GraphQLClient, variables: IUpdateCareerMutationVariables, headers?: RequestInit['headers']) => fetcher<IUpdateCareerMutation, IUpdateCareerMutationVariables>(client, UpdateCareerDocument, variables, headers);
export const DeletedCareerDocument = /*#__PURE__*/ `
    mutation DeletedCareer($data: CareerIdArgs!) {
  deletedCareer(data: $data) {
    deleted
  }
}
    `;
export const useDeletedCareerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<IDeletedCareerMutation, TError, IDeletedCareerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<IDeletedCareerMutation, TError, IDeletedCareerMutationVariables, TContext>(
      ['DeletedCareer'],
      (variables?: IDeletedCareerMutationVariables) => fetcher<IDeletedCareerMutation, IDeletedCareerMutationVariables>(client, DeletedCareerDocument, variables, headers)(),
      options
    );
useDeletedCareerMutation.fetcher = (client: GraphQLClient, variables: IDeletedCareerMutationVariables, headers?: RequestInit['headers']) => fetcher<IDeletedCareerMutation, IDeletedCareerMutationVariables>(client, DeletedCareerDocument, variables, headers);
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
export const useGetAllCareersQuery = <
      TData = IGetAllCareersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: IGetAllCareersQueryVariables,
      options?: UseQueryOptions<IGetAllCareersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IGetAllCareersQuery, TError, TData>(
      variables === undefined ? ['GetAllCareers'] : ['GetAllCareers', variables],
      fetcher<IGetAllCareersQuery, IGetAllCareersQueryVariables>(client, GetAllCareersDocument, variables, headers),
      options
    );

useGetAllCareersQuery.getKey = (variables?: IGetAllCareersQueryVariables) => variables === undefined ? ['GetAllCareers'] : ['GetAllCareers', variables];
;

useGetAllCareersQuery.fetcher = (client: GraphQLClient, variables?: IGetAllCareersQueryVariables, headers?: RequestInit['headers']) => fetcher<IGetAllCareersQuery, IGetAllCareersQueryVariables>(client, GetAllCareersDocument, variables, headers);
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
export const useGetCareerByIdQuery = <
      TData = IGetCareerByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: IGetCareerByIdQueryVariables,
      options?: UseQueryOptions<IGetCareerByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IGetCareerByIdQuery, TError, TData>(
      variables === undefined ? ['GetCareerById'] : ['GetCareerById', variables],
      fetcher<IGetCareerByIdQuery, IGetCareerByIdQueryVariables>(client, GetCareerByIdDocument, variables, headers),
      options
    );

useGetCareerByIdQuery.getKey = (variables?: IGetCareerByIdQueryVariables) =>
  variables === undefined ? ['getCareerById'] : ['getCareerById', variables];
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
export const UpdateFileDocument = /*#__PURE__*/ `
    mutation UpdateFile($data: UpdateFile!) {
  updateFile(data: $data) {
    _id
    approvedBy {
      status
      userId
    }
    createdAt
    deletedAt
    description
    extension
    isDeleted
    nameFile
    size
    type
    updatedAt
    uploadedBy
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
export const CreateFileDocument = /*#__PURE__*/ `
    mutation CreateFile($data: CreateFile!) {
  createFile(data: $data) {
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
export const useCreateFileMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<ICreateFileMutation, TError, ICreateFileMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateFileMutation, TError, ICreateFileMutationVariables, TContext>(
    ['CreateFile'],
    (variables?: ICreateFileMutationVariables) =>
      fetcher<ICreateFileMutation, ICreateFileMutationVariables>(
        client,
        CreateFileDocument,
        variables,
        headers
      )(),
    options
  );
useCreateFileMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateFileMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateFileMutation, ICreateFileMutationVariables>(
    client,
    CreateFileDocument,
    variables,
    headers
  );
export const GetAllFilesDocument = /*#__PURE__*/ `
    query GetAllFiles($filter: FileArgs, $lean: Boolean, $leanWithId: Boolean, $limit: Int!, $offset: Int, $page: Int!, $populate: String, $select: String, $sort: JSON) {
  getAllFiles(
    filter: $filter
    lean: $lean
    leanWithId: $leanWithId
    limit: $limit
    offset: $offset
    page: $page
    populate: $populate
    select: $select
    sort: $sort
  ) {
    docs {
      _id
      approvedBy {
        status
        userId
      }
      createdAt
      deletedAt
      description
      extension
      isDeleted
      nameFile
      size
      type
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
export const useGetAllFilesQuery = <TData = IGetAllFilesQuery, TError = unknown>(
  client: GraphQLClient,
  variables: IGetAllFilesQueryVariables,
  options?: UseQueryOptions<IGetAllFilesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllFilesQuery, TError, TData>(
    ['GetAllFiles', variables],
    fetcher<IGetAllFilesQuery, IGetAllFilesQueryVariables>(
      client,
      GetAllFilesDocument,
      variables,
      headers
    ),
    options
  );

useGetAllFilesQuery.getKey = (variables: IGetAllFilesQueryVariables) => ['GetAllFiles', variables];
useGetAllFilesQuery.fetcher = (
  client: GraphQLClient,
  variables: IGetAllFilesQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllFilesQuery, IGetAllFilesQueryVariables>(
    client,
    GetAllFilesDocument,
    variables,
    headers
  );
export const GetFileByIdDocument = /*#__PURE__*/ `
    query GetFileById($id: ID) {
  getFileById(_id: $id) {
    _id
    approvedBy {
      status
      userId
    }
    createdAt
    deletedAt
    description
    extension
    isDeleted
    nameFile
    size
    type
    updatedAt
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
export const UpdateInstituteInputDocument = /*#__PURE__*/ `
    mutation UpdateInstituteInput($data: UpdateInstituteInput!) {
  UpdateInstituteInput(data: $data) {
    Logo
    _id
    abbreviation
    adress {
      address
      city
      postalCode
      state
      suburb
    }
    createdAt
    deletedAt
    isDeleted
    level
    location {
      address
      city
      postalCode
      state
      suburb
    }
    name
    principallName {
      firstName
      lastName
      secondLastName
    }
    totalHours
    updatedAt
    uploadedBy
  }
}
    `;
export const useUpdateInstituteInputMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateInstituteInputMutation,
    TError,
    IUpdateInstituteInputMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    IUpdateInstituteInputMutation,
    TError,
    IUpdateInstituteInputMutationVariables,
    TContext
  >(
    ['UpdateInstituteInput'],
    (variables?: IUpdateInstituteInputMutationVariables) =>
      fetcher<IUpdateInstituteInputMutation, IUpdateInstituteInputMutationVariables>(
        client,
        UpdateInstituteInputDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateInstituteInputMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateInstituteInputMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateInstituteInputMutation, IUpdateInstituteInputMutationVariables>(
    client,
    UpdateInstituteInputDocument,
    variables,
    headers
  );
export const CreateInstituteDocument = /*#__PURE__*/ `
    mutation CreateInstitute($data: InsertInstituteInput!) {
  createInstitute(data: $data) {
    Logo
    _id
    abbreviation
    adress {
      address
      city
      postalCode
      state
      suburb
    }
    createdAt
    deletedAt
    isDeleted
    level
    location {
      address
      city
      postalCode
      state
      suburb
    }
    name
    principallName {
      firstName
      lastName
      secondLastName
    }
    totalHours
    updatedAt
  }
}
    `;
export const useCreateInstituteMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateInstituteMutation,
    TError,
    ICreateInstituteMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateInstituteMutation, TError, ICreateInstituteMutationVariables, TContext>(
    ['CreateInstitute'],
    (variables?: ICreateInstituteMutationVariables) =>
      fetcher<ICreateInstituteMutation, ICreateInstituteMutationVariables>(
        client,
        CreateInstituteDocument,
        variables,
        headers
      )(),
    options
  );
useCreateInstituteMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateInstituteMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateInstituteMutation, ICreateInstituteMutationVariables>(
    client,
    CreateInstituteDocument,
    variables,
    headers
  );
export const RemoveInstituteDocument = /*#__PURE__*/ `
    mutation RemoveInstitute($data: InstituteIdArgs!) {
  removeInstitute(data: $data) {
    deleted
  }
}
    `;
export const useRemoveInstituteMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IRemoveInstituteMutation,
    TError,
    IRemoveInstituteMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IRemoveInstituteMutation, TError, IRemoveInstituteMutationVariables, TContext>(
    ['RemoveInstitute'],
    (variables?: IRemoveInstituteMutationVariables) =>
      fetcher<IRemoveInstituteMutation, IRemoveInstituteMutationVariables>(
        client,
        RemoveInstituteDocument,
        variables,
        headers
      )(),
    options
  );
useRemoveInstituteMutation.fetcher = (
  client: GraphQLClient,
  variables: IRemoveInstituteMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IRemoveInstituteMutation, IRemoveInstituteMutationVariables>(
    client,
    RemoveInstituteDocument,
    variables,
    headers
  );
export const GetInstituteByIdDocument = /*#__PURE__*/ `
    query GetInstituteById($id: ID) {
  getInstituteById(_id: $id) {
    Logo
    _id
    abbreviation
    adress {
      address
      city
      postalCode
      state
      suburb
    }
    createdAt
    deletedAt
    isDeleted
    level
    location {
      address
      city
      postalCode
      state
      suburb
    }
    name
    principallName {
      firstName
      lastName
      secondLastName
    }
    totalHours
    updatedAt
  }
}
    `;
export const useGetInstituteByIdQuery = <TData = IGetInstituteByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetInstituteByIdQueryVariables,
  options?: UseQueryOptions<IGetInstituteByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetInstituteByIdQuery, TError, TData>(
    variables === undefined ? ['GetInstituteById'] : ['GetInstituteById', variables],
    fetcher<IGetInstituteByIdQuery, IGetInstituteByIdQueryVariables>(
      client,
      GetInstituteByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetInstituteByIdQuery.getKey = (variables?: IGetInstituteByIdQueryVariables) =>
  variables === undefined ? ['GetInstituteById'] : ['GetInstituteById', variables];
useGetInstituteByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetInstituteByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetInstituteByIdQuery, IGetInstituteByIdQueryVariables>(
    client,
    GetInstituteByIdDocument,
    variables,
    headers
  );
export const CreateOrganizationDocument = /*#__PURE__*/ `
    mutation CreateOrganization($data: createOrganizationInput!) {
  createOrganization(data: $data) {
    name
    abbreviationOrg
    vacancyNumbers
    phoneNumber
    numProyect
    location {
      suburb
      state
      postalCode
      city
      address
    }
    emailOrg
  }
}
    `;
export const useCreateOrganizationMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ICreateOrganizationMutation,
    TError,
    ICreateOrganizationMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<ICreateOrganizationMutation, TError, ICreateOrganizationMutationVariables, TContext>(
    ['CreateOrganization'],
    (variables?: ICreateOrganizationMutationVariables) =>
      fetcher<ICreateOrganizationMutation, ICreateOrganizationMutationVariables>(
        client,
        CreateOrganizationDocument,
        variables,
        headers
      )(),
    options
  );
useCreateOrganizationMutation.fetcher = (
  client: GraphQLClient,
  variables: ICreateOrganizationMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ICreateOrganizationMutation, ICreateOrganizationMutationVariables>(
    client,
    CreateOrganizationDocument,
    variables,
    headers
  );
export const RemoveOrganizationDocument = /*#__PURE__*/ `
    mutation RemoveOrganization($data: OrganizationIdArgs!) {
  removeOrganization(data: $data) {
    deleted
  }
}
    `;
export const useRemoveOrganizationMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IRemoveOrganizationMutation,
    TError,
    IRemoveOrganizationMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IRemoveOrganizationMutation, TError, IRemoveOrganizationMutationVariables, TContext>(
    ['RemoveOrganization'],
    (variables?: IRemoveOrganizationMutationVariables) =>
      fetcher<IRemoveOrganizationMutation, IRemoveOrganizationMutationVariables>(
        client,
        RemoveOrganizationDocument,
        variables,
        headers
      )(),
    options
  );
useRemoveOrganizationMutation.fetcher = (
  client: GraphQLClient,
  variables: IRemoveOrganizationMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IRemoveOrganizationMutation, IRemoveOrganizationMutationVariables>(
    client,
    RemoveOrganizationDocument,
    variables,
    headers
  );
export const UpdateOrganizationDocument = /*#__PURE__*/ `
    mutation UpdateOrganization($data: UpdateOrganizationInput!) {
  updateOrganization(data: $data) {
    abbreviationOrg
    createdAt
    deletedAt
    emailOrg
    isDeleted
    location {
      address
      city
      postalCode
      state
      suburb
    }
    name
    numProyect
    phoneNumber
    updatedAt
    vacancyNumbers
  }
}
    `;
export const useUpdateOrganizationMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateOrganizationMutation,
    TError,
    IUpdateOrganizationMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateOrganizationMutation, TError, IUpdateOrganizationMutationVariables, TContext>(
    ['UpdateOrganization'],
    (variables?: IUpdateOrganizationMutationVariables) =>
      fetcher<IUpdateOrganizationMutation, IUpdateOrganizationMutationVariables>(
        client,
        UpdateOrganizationDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateOrganizationMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateOrganizationMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateOrganizationMutation, IUpdateOrganizationMutationVariables>(
    client,
    UpdateOrganizationDocument,
    variables,
    headers
  );
export const QueryDocument = /*#__PURE__*/ `
    query Query($id: ID) {
  getOrganizationById(_id: $id) {
    name
    abbreviationOrg
  }
}
    `;
export const useQueryQuery = <TData = IQueryQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IQueryQueryVariables,
  options?: UseQueryOptions<IQueryQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IQueryQuery, TError, TData>(
    variables === undefined ? ['Query'] : ['Query', variables],
    fetcher<IQueryQuery, IQueryQueryVariables>(client, QueryDocument, variables, headers),
    options
  );

useQueryQuery.getKey = (variables?: IQueryQueryVariables) =>
  variables === undefined ? ['Query'] : ['Query', variables];
useQueryQuery.fetcher = (
  client: GraphQLClient,
  variables?: IQueryQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<IQueryQuery, IQueryQueryVariables>(client, QueryDocument, variables, headers);
export const GetOrganizationByIdDocument = /*#__PURE__*/ `
    query GetOrganizationById($id: ID) {
  getOrganizationById(_id: $id) {
    name
    phoneNumber
    numProyect
  }
}
    `;
export const useGetOrganizationByIdQuery = <TData = IGetOrganizationByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetOrganizationByIdQueryVariables,
  options?: UseQueryOptions<IGetOrganizationByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetOrganizationByIdQuery, TError, TData>(
    variables === undefined ? ['GetOrganizationById'] : ['GetOrganizationById', variables],
    fetcher<IGetOrganizationByIdQuery, IGetOrganizationByIdQueryVariables>(
      client,
      GetOrganizationByIdDocument,
      variables,
      headers
    ),
    options
  );

useGetOrganizationByIdQuery.getKey = (variables?: IGetOrganizationByIdQueryVariables) =>
  variables === undefined ? ['GetOrganizationById'] : ['GetOrganizationById', variables];
useGetOrganizationByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetOrganizationByIdQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetOrganizationByIdQuery, IGetOrganizationByIdQueryVariables>(
    client,
    GetOrganizationByIdDocument,
    variables,
    headers
  );
export const GetAllOrganizationsDocument = /*#__PURE__*/ `
    query GetAllOrganizations {
  getAllOrganizations {
    docs {
      name
      _id
      vacancyNumbers
      updatedAt
      phoneNumber
      numProyect
      location {
        state
        suburb
        postalCode
        city
        address
      }
      isDeleted
      emailOrg
      deletedAt
      createdAt
      abbreviationOrg
    }
  }
}
    `;
export const useGetAllOrganizationsQuery = <TData = IGetAllOrganizationsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetAllOrganizationsQueryVariables,
  options?: UseQueryOptions<IGetAllOrganizationsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllOrganizationsQuery, TError, TData>(
    variables === undefined ? ['GetAllOrganizations'] : ['GetAllOrganizations', variables],
    fetcher<IGetAllOrganizationsQuery, IGetAllOrganizationsQueryVariables>(
      client,
      GetAllOrganizationsDocument,
      variables,
      headers
    ),
    options
  );

useGetAllOrganizationsQuery.getKey = (variables?: IGetAllOrganizationsQueryVariables) =>
  variables === undefined ? ['GetAllOrganizations'] : ['GetAllOrganizations', variables];
useGetAllOrganizationsQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetAllOrganizationsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllOrganizationsQuery, IGetAllOrganizationsQueryVariables>(
    client,
    GetAllOrganizationsDocument,
    variables,
    headers
  );
export const RemoveUserDocument = /*#__PURE__*/ `
    mutation RemoveUser($data: UserIdArgs!, $signInData2: SignInInput!) {
  removeUser(data: $data) {
    deleted
  }
  signIn(data: $signInData2) {
    accessToken
    accessTokenExpiresIn
    refreshToken
    refreshTokenExpiresIn
    type
  }
}
    `;
export const useRemoveUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<IRemoveUserMutation, TError, IRemoveUserMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<IRemoveUserMutation, TError, IRemoveUserMutationVariables, TContext>(
    ['RemoveUser'],
    (variables?: IRemoveUserMutationVariables) =>
      fetcher<IRemoveUserMutation, IRemoveUserMutationVariables>(
        client,
        RemoveUserDocument,
        variables,
        headers
      )(),
    options
  );
useRemoveUserMutation.fetcher = (
  client: GraphQLClient,
  variables: IRemoveUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IRemoveUserMutation, IRemoveUserMutationVariables>(
    client,
    RemoveUserDocument,
    variables,
    headers
  );
export const UpdateUserDocument = /*#__PURE__*/ `
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    _id
    createdAt
    deletedAt
    email
    firstName
    isDeleted
    lastName
    middleName
    password
    roles
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
    email
    firstName
    isDeleted
    lastName
    middleName
    password
    roles
    updatedAt
    weekday
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
    query GetAllUsers($page: Int!, $limit: Int!, $offset: Int, $filter: UserArgs) {
  getAllUsers(page: $page, limit: $limit, offset: $offset, filter: $filter) {
    docs {
      _id
      classGroup
      classroom
      createdAt
      deletedAt
      email
      firstName
      isDeleted
      lastName
      middleName
      password
      roles
      updatedAt
      weekday
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
  variables: IGetAllUsersQueryVariables,
  options?: UseQueryOptions<IGetAllUsersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetAllUsersQuery, TError, TData>(
    ['GetAllUsers', variables],
    fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(
      client,
      GetAllUsersDocument,
      variables,
      headers
    ),
    options
  );

useGetAllUsersQuery.getKey = (variables: IGetAllUsersQueryVariables) => ['GetAllUsers', variables];
useGetAllUsersQuery.fetcher = (
  client: GraphQLClient,
  variables: IGetAllUsersQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(
    client,
    GetAllUsersDocument,
    variables,
    headers
  );
export const GetByIdDocument = /*#__PURE__*/ `
    query GetById($id: ID) {
  getById(_id: $id) {
    _id
    classGroup
    classroom
    createdAt
    deletedAt
    email
    firstName
    isDeleted
    lastName
    middleName
    password
    roles
    updatedAt
    weekday
  }
}
    `;
export const useGetByIdQuery = <TData = IGetByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: IGetByIdQueryVariables,
  options?: UseQueryOptions<IGetByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IGetByIdQuery, TError, TData>(
    variables === undefined ? ['GetById'] : ['GetById', variables],
    fetcher<IGetByIdQuery, IGetByIdQueryVariables>(client, GetByIdDocument, variables, headers),
    options
  );

useGetByIdQuery.getKey = (variables?: IGetByIdQueryVariables) =>
  variables === undefined ? ['GetById'] : ['GetById', variables];
useGetByIdQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetByIdQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<IGetByIdQuery, IGetByIdQueryVariables>(client, GetByIdDocument, variables, headers);
export const MeDocument = /*#__PURE__*/ `
    query Me {
  me {
    _id
    areaKey
    createdAt
    deletedAt
    email
    firstName
    isDeleted
    lastName
    middleName
    password
    roles
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
export const SubscriptionDocument = /*#__PURE__*/ `
    subscription Subscription {
  userAdded {
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
export const InsertVacancyDocument = /*#__PURE__*/ `
    mutation InsertVacancy($data: InsertVacancyInput!) {
  createVacancy(data: $data) {
    _id
    actuallyStatus
    benefits
    contact {
      email
      person
      phone
    }
    createdAt
    deadline
    deletedAt
    description
    experienceLevel
    isDeleted
    location {
      address
      city
      postalCode
      state
      suburb
    }
    maxCapacity
    organizationId
    position
    postulation {
      status
      userId
    }
    requirements
    responsibilities
    salary
    skills
    updatedAt
  }
}
    `;
export const useInsertVacancyMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IInsertVacancyMutation,
    TError,
    IInsertVacancyMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IInsertVacancyMutation, TError, IInsertVacancyMutationVariables, TContext>(
    ['InsertVacancy'],
    (variables?: IInsertVacancyMutationVariables) =>
      fetcher<IInsertVacancyMutation, IInsertVacancyMutationVariables>(
        client,
        InsertVacancyDocument,
        variables,
        headers
      )(),
    options
  );
useInsertVacancyMutation.fetcher = (
  client: GraphQLClient,
  variables: IInsertVacancyMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IInsertVacancyMutation, IInsertVacancyMutationVariables>(
    client,
    InsertVacancyDocument,
    variables,
    headers
  );
export const UpdateVacancyDocument = /*#__PURE__*/ `
    mutation UpdateVacancy($data: UpdateVacancyInput!) {
  updateVacancy(data: $data) {
    _id
    actuallyStatus
    benefits
    contact {
      email
      person
      phone
    }
    createdAt
    deadline
    deletedAt
    description
    experienceLevel
    isDeleted
    location {
      address
      city
      postalCode
      state
      suburb
    }
    maxCapacity
    organizationId
    position
    postulation {
      status
      userId
    }
    requirements
    responsibilities
    salary
    skills
    updatedAt
  }
}
    `;
export const useUpdateVacancyMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateVacancyMutation,
    TError,
    IUpdateVacancyMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpdateVacancyMutation, TError, IUpdateVacancyMutationVariables, TContext>(
    ['UpdateVacancy'],
    (variables?: IUpdateVacancyMutationVariables) =>
      fetcher<IUpdateVacancyMutation, IUpdateVacancyMutationVariables>(
        client,
        UpdateVacancyDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateVacancyMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateVacancyMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateVacancyMutation, IUpdateVacancyMutationVariables>(
    client,
    UpdateVacancyDocument,
    variables,
    headers
  );
export const UpdateVacancyStatusDocument = /*#__PURE__*/ `
    mutation UpdateVacancyStatus($data: ChangeVacancyStatusInput!) {
  updateVacancyStatus(data: $data) {
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
export const useUpdateVacancyStatusMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpdateVacancyStatusMutation,
    TError,
    IUpdateVacancyStatusMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    IUpdateVacancyStatusMutation,
    TError,
    IUpdateVacancyStatusMutationVariables,
    TContext
  >(
    ['UpdateVacancyStatus'],
    (variables?: IUpdateVacancyStatusMutationVariables) =>
      fetcher<IUpdateVacancyStatusMutation, IUpdateVacancyStatusMutationVariables>(
        client,
        UpdateVacancyStatusDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateVacancyStatusMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpdateVacancyStatusMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpdateVacancyStatusMutation, IUpdateVacancyStatusMutationVariables>(
    client,
    UpdateVacancyStatusDocument,
    variables,
    headers
  );
export const UpsertPostulationDocument = /*#__PURE__*/ `
    mutation UpsertPostulation($data: AddPostulationIntoVacancyInput!) {
  upsertPostulation(data: $data) {
    _id
    actuallyStatus
    benefits
    contact {
      email
      person
      phone
    }
    createdAt
    deadline
    deletedAt
    description
    experienceLevel
    isDeleted
    location {
      address
      city
      postalCode
      state
      suburb
    }
    maxCapacity
    organizationId
    position
    postulation {
      status
      userId
    }
    requirements
    responsibilities
    salary
    skills
    updatedAt
  }
}
    `;
export const useUpsertPostulationMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IUpsertPostulationMutation,
    TError,
    IUpsertPostulationMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IUpsertPostulationMutation, TError, IUpsertPostulationMutationVariables, TContext>(
    ['UpsertPostulation'],
    (variables?: IUpsertPostulationMutationVariables) =>
      fetcher<IUpsertPostulationMutation, IUpsertPostulationMutationVariables>(
        client,
        UpsertPostulationDocument,
        variables,
        headers
      )(),
    options
  );
useUpsertPostulationMutation.fetcher = (
  client: GraphQLClient,
  variables: IUpsertPostulationMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IUpsertPostulationMutation, IUpsertPostulationMutationVariables>(
    client,
    UpsertPostulationDocument,
    variables,
    headers
  );
export const RemoveVacancyDocument = /*#__PURE__*/ `
    mutation RemoveVacancy($data: VacancyIdArgs!) {
  removeVacancy(data: $data) {
    deleted
  }
}
    `;
export const useRemoveVacancyMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    IRemoveVacancyMutation,
    TError,
    IRemoveVacancyMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<IRemoveVacancyMutation, TError, IRemoveVacancyMutationVariables, TContext>(
    ['RemoveVacancy'],
    (variables?: IRemoveVacancyMutationVariables) =>
      fetcher<IRemoveVacancyMutation, IRemoveVacancyMutationVariables>(
        client,
        RemoveVacancyDocument,
        variables,
        headers
      )(),
    options
  );
useRemoveVacancyMutation.fetcher = (
  client: GraphQLClient,
  variables: IRemoveVacancyMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IRemoveVacancyMutation, IRemoveVacancyMutationVariables>(
    client,
    RemoveVacancyDocument,
    variables,
    headers
  );
export const GetAllVacancyDocument = /*#__PURE__*/ `
    query GetAllVacancy {
  getAllVacancies {
    docs {
      _id
      actuallyStatus
      benefits
      contact {
        email
        person
        phone
      }
      createdAt
      deadline
      deletedAt
      description
      experienceLevel
      isDeleted
      location {
        address
        city
        postalCode
        state
        suburb
      }
      maxCapacity
      organizationId
      position
      postulation {
        status
        userId
      }
      requirements
      responsibilities
      salary
      skills
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
export const useGetAllUsersQuery = <
      TData = IGetAllUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: IGetAllUsersQueryVariables,
      options?: UseQueryOptions<IGetAllUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IGetAllUsersQuery, TError, TData>(
      variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables],
      fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(client, GetAllUsersDocument, variables, headers),
      options
    );

useGetAllUsersQuery.getKey = (variables?: IGetAllUsersQueryVariables) => variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables];
;

useGetAllUsersQuery.fetcher = (client: GraphQLClient, variables?: IGetAllUsersQueryVariables, headers?: RequestInit['headers']) => fetcher<IGetAllUsersQuery, IGetAllUsersQueryVariables>(client, GetAllUsersDocument, variables, headers);
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
    location {
      address
      city
      postalCode
      state
      suburb
    }
    maxCapacity
    organizationId
    position
    postulation {
      status
      userId
    }
    requirements
    responsibilities
    salary
    skills
    updatedAt
    photo
  }
}
    `;
export const useGetUserByIdQuery = <
      TData = IGetUserByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: IGetUserByIdQueryVariables,
      options?: UseQueryOptions<IGetUserByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IGetUserByIdQuery, TError, TData>(
      variables === undefined ? ['GetUserById'] : ['GetUserById', variables],
      fetcher<IGetUserByIdQuery, IGetUserByIdQueryVariables>(client, GetUserByIdDocument, variables, headers),
      options
    );

useGetByIdVacancyQuery.getKey = (variables?: IGetByIdVacancyQueryVariables) =>
  variables === undefined ? ['GetByIdVacancy'] : ['GetByIdVacancy', variables];
useGetByIdVacancyQuery.fetcher = (
  client: GraphQLClient,
  variables?: IGetByIdVacancyQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IGetByIdVacancyQuery, IGetByIdVacancyQueryVariables>(
    client,
    GetByIdVacancyDocument,
    variables,
    headers
  );
