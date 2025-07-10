import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-service.service";
import { tap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

export const roleCanActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);

  return authService.checkRole().pipe(
    tap((isAdmin) => {
      if (!isAdmin) {
        router.navigate(['/auth/login'])
        snackbar.open(
          'Para acceder Countries debe iniciar sesión como Administrador', 'OK',{
          duration:4000,
          }
        )
      }
    })
  );
};
