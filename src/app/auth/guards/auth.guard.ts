import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";



const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);


  return authService.checkAuthentication()
  .pipe(
    tap((isAuth) => {
      if( !isAuth ) {
        router.navigate(['./auth/login']);
        snackbar.open(
          'Debe iniciar sesión para acceder', 'OK',{
          duration:4000,
          }
        )
      }
    })
  )
};

export const authMatch: CanMatchFn = (route: Route, urlSegments: UrlSegment[]) => {
  return checkAuthStatus()
}

export const authCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus()
}
