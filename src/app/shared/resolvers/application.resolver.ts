import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { catchError, EMPTY, filter, Observable, take, tap } from 'rxjs';

import { UserModel } from '@models/response/user-model.model';

import { UserService } from '@shared/services/user.service';
import { ApiHttpService } from '@shared/services/api-http.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationResolver implements Resolve<any> {

  constructor(private apiHttpService: ApiHttpService, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) : Observable<UserModel> {
    console.log('In rsolver', route);
    return this.apiHttpService
      .getUserById('688f42481d14c87e8a753863')
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: UserModel) => {
          this.userService.setUserDetails(res);
        }),
        catchError(() => EMPTY)
      )
    }
}
