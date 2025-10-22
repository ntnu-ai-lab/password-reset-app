import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  credentialsValid: boolean = false;

  constructor(private http: HttpClient, private config: ConfigService) { }

  validateCredentials(email: string | null, userId: string | null): Observable<any> {
    // Create request body with available credentials
    const requestBody: any = {};
    if (email) requestBody.email = email;
    if (userId) requestBody.userId = userId;

    return this.http.post(`${this.config.endpoints.forgotPasswordUrl}`, requestBody)
      .pipe(
        map((response: any) => {
          this.credentialsValid = true;
          return response;
        }),
        catchError(error => {
          this.credentialsValid = false;
          throw error; // Rethrow to be caught in the component
        })
      );
  }

isEmailValid(): boolean {
  return this.credentialsValid;
}
}
