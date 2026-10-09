import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APiError } from '../../../types/error';
import { ServerErrorStateService } from '../../../core/services/server-error-state-service';

@Component({
  imports: [],
  selector: 'app-server-error',
  styleUrl: './server-error.css',
  templateUrl: './server-error.html',
})
export class ServerError {
  protected error?: APiError;
  private router = inject(Router);
  private serverErrorState = inject(ServerErrorStateService);
  protected showDetails = false;

  constructor(){
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras.state?.['error']
      ?? history.state['error']
      ?? this.serverErrorState.get();
  }

  detailsToggle(){
    this.showDetails = !this.showDetails;
  }
}
