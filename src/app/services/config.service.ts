import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private env = (window as any).env || {};

  get endpoints() {
    return {
      forgotPasswordUrl: this.env.FORGOT_PASSWORD_URL || 'http://localhost:8014/dashboard/forgotPassword',
   };
  }
}
