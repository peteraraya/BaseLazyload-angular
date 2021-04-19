import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
                private activateRoute:ActivatedRoute,
                private heroesService:HeroesService,
                private router:Router
                ) { }

  ngOnInit(): void {

    // Estar pendiente de los parametros que llegan a este componente
    this.activateRoute.params
        .pipe(
          switchMap( ({ id }) => this.heroesService.getHeroesPorId(id))
        )
        .subscribe( data => this.heroe = data);
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}


/**
 * Inyectamos : activatedRoute para capturar parametros
 * switchMap  : recibe lo que el servicio esta emitiendo y regreso un nuevo observable
 * 
 * Para utilizar boton de regresar utilizaremos Router
 */