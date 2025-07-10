import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivate, authMatch } from './auth/guards/auth.guard';
import { publicCanActivate, publicMatch } from './auth/guards/public.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule), },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [ publicCanActivate ], canMatch: [ publicMatch ], },
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '404', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
