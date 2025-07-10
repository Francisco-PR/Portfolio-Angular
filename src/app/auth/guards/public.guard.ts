import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";



const checkLoginStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap((isAuth) => {
      if( isAuth ) router.navigate(['./']);
    }),
    map( isAuth => !isAuth)
  )
};

export const publicMatch: CanMatchFn = (route: Route, urlSegments: UrlSegment[]) => {
  return checkLoginStatus()
}

export const publicCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkLoginStatus()
}
