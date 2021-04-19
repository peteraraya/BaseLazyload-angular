import { Component, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [``],
})
export class ListadoComponent implements OnInit {
  // Variables
  heroes!: Heroe[]; // negamos directamente la declaración

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    // para que se dispare necesitamos poner el subscribe
    this.heroesService.getHeroes().subscribe((data) => (this.heroes = data));
  }
}

/***
 * Los observables tienen mucho más control que las promesas
 * Es recomendable utilizar tipado para TS utilizando interfaces
 *
 */
