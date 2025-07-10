import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('userTokenJWT');

    if (token && request.url.includes('/verifyToken')) {
        const clonedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });

        return next.handle(clonedRequest);
    }

    return next.handle(request);
}
}
