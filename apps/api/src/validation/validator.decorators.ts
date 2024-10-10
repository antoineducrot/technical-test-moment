import {
  IsDefined as isDefinedCA,
  IsEmail as isEmailCA,
  isNotEmpty as isNotEmptyCA,
  IsString as isStringCA,
  Length as lengthCA,
} from "class-validator";

import { validationErrorCodes } from "./validation.error-codes";

const IsDefined = () =>
  isDefinedCA({ message: validationErrorCodes.isNotDefined });

const IsNotEmpty = () =>
  isNotEmptyCA({ message: validationErrorCodes.isEmpty });

const IsEmail = () =>
  isEmailCA({}, { message: validationErrorCodes.isNotValidEmail });

const IsString = () =>
  isStringCA({ message: validationErrorCodes.isNotString });

const Length8And255 = () =>
  lengthCA(8, 255, { message: validationErrorCodes.lengthBetween8And255 });

export { IsDefined, IsEmail, IsNotEmpty, IsString, Length8And255 };
