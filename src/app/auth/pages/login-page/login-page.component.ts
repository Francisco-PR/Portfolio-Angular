import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent  implements OnInit{


  public loginForm: FormGroup = this.fb.group({
    userName: [ '',[Validators.required] ],
    password: [ '',[Validators.required] ],
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.adminAccount()
  }

  onLogin(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const { userName, password } = this.loginForm.value;

    const user = this.authService.savedUsers.find(u => u.userName === userName && u.password === password);

    if ( user ) {
      sessionStorage.setItem('userToken', user.userName)
      sessionStorage.setItem('userTokenJWT', user.token)
      this.router.navigateByUrl('/')
      this.authService.checkSession()
    } else {
      this.loginForm.reset()
      this.showErrorSnackbar()
    }
  }

  private showErrorSnackbar():void {
    const message: string = 'Usuario o contraseña incorrectos'
    this.snackbar.open( message, 'OK',{
      duration:4000,
    })
  }

   adminAccount() {
    const prevAdmin= this.authService.savedUsers.find(u => u.userName = 'admin');
    if ( !prevAdmin ) {
      const newAdmin: User = {
        userName: 'admin',
        password: 'admin123',
        email: 'admin@ad.min',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2wiOiIxIiwibmFtZSI6Ikp1YW4gUGVycmUiLCJpZF91c2VyIjoxMjMsImV4cCI6MTYyNTk3NTk5fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      }
      const users:User[] = this.authService.savedUsers;
      users.push( newAdmin );
      localStorage.setItem('Users', JSON.stringify(users));
    }
  }

}
