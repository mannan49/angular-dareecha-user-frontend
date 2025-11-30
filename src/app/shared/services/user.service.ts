import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { UserModel } from '@models/response/user-model.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserModel>(null);
  user$: Observable<UserModel> = this.userSubject.asObservable();

  setUserDetails(user: UserModel) {
    this.userSubject.next(user);
  }

  getUserDetails(): UserModel {
    return this.userSubject.getValue();
  }

  emptyQuizQuestions() {
    this.userSubject.next(null);
  }
}
