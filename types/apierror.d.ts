interface IOriginalError {
  statusCode: number;
  message: string[];
  error: string;
}

interface IExtension {
  code: string;
  stacktrace: string[];
  originalError: IOriginalError;
}

interface IError {
  message: string;
  extensions: IExtension;
}

interface IErrors {
  errors: IError[];
}

export interface IApiError {
  response: IErrors;
}
