import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'shared-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styles: `
  h1 {
    color: white;
  }
  `
})
export class ThemeSwitcherComponent {

  constructor( @Inject(DOCUMENT) private documet: Document ){ }
  public darkTheme: boolean = this.documet.body.classList.contains('dark-theme');
  changeTheme(): void {
    this.darkTheme = !this.darkTheme
    if (this.darkTheme) {
      this.documet.body.classList.add('dark-theme');
    }
    else {
      this.documet.body.classList.remove('dark-theme');
    }
  }

}
