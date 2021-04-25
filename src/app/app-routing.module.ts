
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    // Detectar otras rutas en la aplicación  para cargar un modulo
    path: 'auth',
    // cuando entre a este path carga sus hijos --> este viene del producto de ./auth/auth-routing.module
    // y cuando se cargue en memoria , como es una promesa regresará el AuthModule
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]


@NgModule({
  imports: [
    // forRoot : porque son las rutas principales
    RouterModule.forRoot(routes)
  ],
  exports: [
    // Lo exportamos para que esté a disposición de toda la aplicación
    RouterModule
  ]
})
export class AppRoutingModule { }


/**
 *   Puedo definir tantos guard como quiera y estos se ejecutan de forma secuencial 
 */