import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from '../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  
  private authSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }

  canActivate():  Observable<boolean>{
    return this.isAuthenticated().pipe(
      map(res => {
        if(res){
          return true
        }else{
          this.router.navigate(['']);
          return false
        }
      })
    )
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
        this.authSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authSubject.next(false);
    });
  }

  isAuthenticated():Observable<boolean> {
    Auth.currentUserInfo().then(
      user => {
        if(user){
          this.authSubject.next(true);
        }else {
          this.authSubject.next(false);
        }
      }
    );
    return this.authSubject.asObservable();
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getUserRoles = async () => {
    try{
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});
      console.log("User info: ", userInfo);
  
      if(userInfo){
        return userInfo.signInUserSession.idToken.payload["cognito:groups"];
      }

    }catch(err){
      console.log('error: ', err);
    }

  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}