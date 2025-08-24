import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { Result } from '@models/entities/result.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { CheckTestRequest } from '@models/payload/check-test-request.model';
import { TestRequestResponse } from '@models/response/test-request.response.model';

import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  // login(payload: LoginPayload): Observable<LoginApiResponse> {
  //   return this.httpClient.post<LoginApiResponse>(ApiUrlService.loginUrl(), payload);
  // }

  // signup(payload: SignupPayload): Observable<SignupApiResponse> {
  //   return this.httpClient.post<SignupApiResponse>(ApiUrlService.signupUrl(), payload);
  // }

  // signupOtpVerification(payload: OtpVerificationPayload): Observable<LoginApiResponse> {
  //   return this.httpClient.post<LoginApiResponse>(ApiUrlService.verifySignupOtpUrl(), payload);
  // }

  // resendSignupOtp(email: string): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.resendSignupOtpUrl(), { email });
  // }

  // requestForgotPasswordOtp(email: string): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.sendForgotOtpUrl(), { email });
  // }

  // forgotOtpVerification(payload: OtpVerificationPayload): Observable<ForgotOtpVerificationApiResponse> {
  //   return this.httpClient.post<ForgotOtpVerificationApiResponse>(ApiUrlService.verirfyForgotOtpUrl(), payload);
  // }

  // resetPassword(payload: ResetPasswordPayload): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.resetPasswordUrl(), payload);
  // }

  getNotesByFilter(filter: EntityFilter): Observable<PagedResponse<Note>> {
    return this.httpClient.post<PagedResponse<Note>>(ApiUrlService.getNotesByFilter(), filter);
  }

  getChaptersByFilter(filter: EntityFilter): Observable<PagedResponse<Chapter>> {
    return this.httpClient.post<PagedResponse<Chapter>>(ApiUrlService.getChaptersByFilterUrl(), filter);
  }

  generateTest(filter: EntityFilter): Observable<TestRequestResponse> {
    return this.httpClient.post<TestRequestResponse>(ApiUrlService.generateTestUrl(), filter);
  }

  getTestRequestById(id: string): Observable<TestRequestResponse> {
    return this.httpClient.get<TestRequestResponse>(ApiUrlService.getTestRequestByIdUrl(id));
  }

  getResultById(id: string): Observable<Result> {
    return this.httpClient.get<Result>(ApiUrlService.getResultByIdUrl(id));
  }

  checkTest(payload: CheckTestRequest): Observable<Result> {
    return this.httpClient.post<Result>(ApiUrlService.checkTestUrl(), payload);
  }
}
