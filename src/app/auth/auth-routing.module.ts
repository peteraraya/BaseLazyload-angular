import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    // defino el path vacio para trabajar en este modulo
    path: '',
    // aquí definimos las rutas hijas que vamos a utilizar
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    // debemos exportar el modulo si no funcionaría de forma interna en el moduloje
    RouterModule
  ]
})
export class AuthRoutingModule { }
