const exceptionTypes = {
  // Auth
  authAuthorizationHeaderNotFound: "AuthAuthorizationHeaderNotFound",
  authInvalidCredentials: "AuthInvalidCredentials",
  authInvalidToken: "AuthInvalidToken",
  authInvalidTokenFormat: "AuthInvalidTokenFormat",
  // Users
  usersEmailAlreadyExist: "UsersEmailAlreadyExist",
  usersUsernameAlreadyExist: "UsersUsernameAlreadyExist",
  // Server validation
  serverValidation: "ServerValidation",
} as const;

type ExceptionType = (typeof exceptionTypes)[keyof typeof exceptionTypes];

export { type ExceptionType, exceptionTypes };
