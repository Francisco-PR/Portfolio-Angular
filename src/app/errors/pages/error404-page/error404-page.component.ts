import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrl: './error404-page.component.css'
})

export class Error404PageComponent implements OnInit {

  public time = 5;

  ngOnInit(): void {
    this.redirectToHome();
  }
  constructor(
    private router: Router
  ){}
  redirectToHome(){
    const delay = setInterval(() => {
      this.time--
      if( this.time < 0){ clearInterval(delay);  this.router.navigateByUrl('')}
    }, 1000);
  }
}
