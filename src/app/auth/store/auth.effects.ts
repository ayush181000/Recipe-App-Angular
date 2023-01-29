import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { enviornment } from 'src/enviornments/enviornment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as AuthAction from './auth.actions';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  idToken: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthAction.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: idToken,
    expirationDate,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unkonwn error occurred!';
  if (errorRes.error && errorRes.error.error) {
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too may attempts. Try Later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect Password';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
  }
  return of(new AuthAction.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.SIGNUP_START),
      switchMap((signupAction: AuthAction.SignupStart) =>
        this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${enviornment.firebaseAPIKey}`,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) =>
              handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              )
            ),
            catchError((errorRes) => handleError(errorRes))
          )
      )
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LOGIN_START),
      switchMap((authData: AuthAction.LoginStart) =>
        this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${enviornment.firebaseAPIKey}`,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) =>
              handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              )
            ),
            catchError((errorRes) => handleError(errorRes))
          )
      )
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.LOGOUT, AuthAction.AUTHENTICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
