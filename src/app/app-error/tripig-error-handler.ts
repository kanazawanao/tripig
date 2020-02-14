import { ErrorHandler } from '@angular/core';
import { AppError } from './app-error';

export class TripigErrorHandler implements ErrorHandler {
  handleError(e: any): void {
    if (e instanceof AppError) {
      // エラー発生したらスラック通知する
    } else {
      // エラー発生したらスラック通知する
    }
  }
}
