import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public sidebarItems = [
    { label: 'Home', icon: 'home', url: ''},
    { label: 'Task list', icon: 'task_alt', url: 'tasklist' },
    { label: 'Weather', icon: 'cloud_queue', url: 'weather' },
    { label: 'Countries', icon: 'outlined_flag', url: 'countries' },
    { label: 'Poblaciones España', icon:'explore' , url: 'poblaciones-esp'}, //icon:'map'
  ]

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout():void {
    this.authService.logout()
  }
}


