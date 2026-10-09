import { Injectable, signal } from '@angular/core';
import { APiError } from '../../types/error';

@Injectable({ providedIn: 'root' })
export class ServerErrorStateService {
  private readonly latestError = signal<APiError | undefined>(undefined);

  set(error: APiError): void {
    this.latestError.set(error);
  }

  get(): APiError | undefined {
    return this.latestError();
  }
}
