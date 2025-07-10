import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../interfaces/user.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
    userName: [ '',[Validators.required] ],
    password: [ '',[Validators.required, Validators.minLength(6)] ],
    password2: [ '',[Validators.required] ],
    email: [ '',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)] ],
  },
  {
    validators:[
      this.validatorsService.isFieldOneEqualsFieldTwo('password', 'password2')
    ]
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  onRegister(): void {
    this.registerForm.markAllAsTouched();

    if ( this.registerForm.invalid ) return;

    const { password2, ...user }  = this.registerForm.value;
    user.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2wiOiIyIiwibmFtZSI6IkFuYSBKaW1lbmV6IiwiaWRfdXNlciI6MTExLCJleHAiOjE2MjU5NzU5OX0.7-V89w9j7-H4NTdZUOOb-Y1W5jJ00sknbA6Pa9U8igE'

    const userExist = this.authService.savedUsers.find(u => u.userName === user.userName || u.email === u.userName);
    if ( !userExist ) {

      const newUsers:User[] = this.authService.savedUsers;
      newUsers.push( user );
      localStorage.setItem('Users', JSON.stringify(newUsers));
      sessionStorage.setItem('userToken', user.userName);
      sessionStorage.setItem('userTokenJWT', user.token)
      this.authService.checkSession();
      this.router.navigateByUrl('/');
    } else {
      this.registerForm.reset()
      this.showErrorSnackbar()
    }

  }
  private showErrorSnackbar():void {
    const message: string = 'El usuario ya existe'
    this.snackbar.open( message, 'OK',{
      duration:4000,
    })
  }

  isValidField( field: string) {
    return this.validatorsService.isValidField( this.registerForm, field);
  }

}
