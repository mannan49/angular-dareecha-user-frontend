import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  static apiBaseUrl = environment.apiBaseUrl;

  static getUserByIdUrl(id : string) : string {
    return `${this.apiBaseUrl}/user/${id}`;
  }

  static loginUrl(): string {
    return `${this.apiBaseUrl}/user/login`;
  }
  static signupUrl(): string {
    return `${this.apiBaseUrl}/user/register`;
  }
  static verifySignupOtpUrl(): string {
    return `${this.apiBaseUrl}/user/verify-otp`;
  }
  static resendSignupOtpUrl(): string {
    return `${this.apiBaseUrl}/user/resend-otp`;
  }
  static sendForgotOtpUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/send-otp`;
  }
  static verirfyForgotOtpUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/verify-otp`;
  }
  static resetPasswordUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/reset`;
  }
  static updateProfileUrl(): string {
    return `${this.apiBaseUrl}/user/update-profile`;
  }
  static verifyPasswordUrl(): string {
    return `${this.apiBaseUrl}/user/verify-password`;
  }
  static changePasswordUrl(): string {
    return `${this.apiBaseUrl}/user/change-password`;
  }
  
  static getNotesByFilter() : string{
    return `${this.apiBaseUrl}/Note/advance-search`;
  }

  static getChaptersByFilterUrl(): string {
    return `${this.apiBaseUrl}/Chapter/advance-search`;
  }

  static generateTestUrl(): string {
    return `${this.apiBaseUrl}/TestRequest`;
  }

  static getTestRequestByIdUrl(id: string): string {
    return `${this.apiBaseUrl}/TestRequest/${id}`;
  }

  static getResultByIdUrl(id: string): string {
    return `${this.apiBaseUrl}/Result/${id}`;
  }

  static checkTestUrl(): string {
    return `${this.apiBaseUrl}/Result`;
  }
}
