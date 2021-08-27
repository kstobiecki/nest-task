import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageEnum } from '../enums/error-message.enum';

export function handleErrorHelper(error: {
  statusCode: HttpStatus;
  name: string;
  message: ErrorMessageEnum;
}): void {
  throw new HttpException(
    {
      statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.name || error,
      message: error.message || null,
    },
    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
