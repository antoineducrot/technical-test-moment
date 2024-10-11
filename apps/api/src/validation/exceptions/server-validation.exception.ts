import { HttpStatus } from "@nestjs/common";
import { type ValidationError } from "class-validator";

import { DefaultException } from "@/exceptions/default.exception";
import { isEnumValue } from "@/utils/is-enum-value.utils";
import {
  type ValidationErrorCodes,
  validationErrorCodes,
} from "@/validation/validation.error-codes";

class ServerValidationException extends DefaultException {
  constructor(validationErrors: ValidationError[]) {
    const errors: Record<string, ValidationErrorCodes[]> = {};

    for (const validationError of validationErrors) {
      const { property, constraints } = validationError;

      if (!constraints) {
        continue;
      }

      errors[property] = [];

      for (const constraint of Object.values(constraints)) {
        if (isEnumValue(validationErrorCodes, constraint)) {
          errors[property].push(constraint);
        } else {
          errors[property].push(validationErrorCodes.unknown);
        }
      }
    }

    super(
      {
        type: "ServerValidation",
        errors,
        message: `Validation failed`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
export { ServerValidationException };
