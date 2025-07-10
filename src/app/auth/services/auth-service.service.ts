import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { VerifyTokenResponse } from '../interfaces/tokenResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private user?: User;

  constructor( private http: HttpClient ) {
    this.checkSession()
   }


  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }



  get savedUsers(): User[] {
    if(!localStorage.getItem('Users')) return [];
    return JSON.parse(localStorage.getItem('Users')!)
  }

  checkAuthentication(): Observable<boolean> {

    this.checkSession()

    if ( this.user ) return of(!!this.user);

    return of(false)
  }

  checkSession():void {
    if ( !sessionStorage.getItem('userToken') ) return;

    const token = sessionStorage.getItem('userToken');

    this.user = this.savedUsers.find(u => u.userName === token)

  }

  logout() {
    this.user = undefined;
    sessionStorage.clear();
  }


  checkRole(): Observable<boolean> {
    const role = sessionStorage.getItem('userRole');

    //Si hay rol devuelve true si es admin
    if (role) {
        console.log('Rol encontrado en sessionStorage:', role);
        return of(role === 'admin');
    }

    return this.verifyToken();


}

  verifyToken(): Observable<boolean> {
    return this.http.get<VerifyTokenResponse>('https://8rkrz.wiremockapi.cloud/verifyToken')
    .pipe(
        tap(response => this.storeUserRole(response)),
        map(response => response.result.userLogin.rol === 1), //Devuelve true si es admin
        catchError(() => {
            return of(false);
        })
    );
}

  private storeUserRole(resp: VerifyTokenResponse): void {

    if (resp.status === 200 && resp.result?.userLogin?.rol !== undefined) { //Si la respuesta es acceptada y hay rol

      const userRole = resp.result.userLogin.rol === 1 ? 'admin' : 'normalUser'; //Determina el user rol
      sessionStorage.setItem('userRole', userRole); //Lo guarda en el sesion storage para no tener que volver a comprobarlo
    }
  }

}
