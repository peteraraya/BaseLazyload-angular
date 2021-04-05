import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes : Routes = [
  {
    path:'',
    // Configuración de rutas hijas ** IMPORTANTE **
    component: HomeComponent,
    children:[
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      },
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class HeroesRoutingModule { }
