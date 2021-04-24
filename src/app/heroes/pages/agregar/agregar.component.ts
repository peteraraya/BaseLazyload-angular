import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `],
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  // definimos el heroe a utilizar
  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  }

  constructor(
    // Inyectamos nuestro servicio
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Validación --> si no incluye editar en la ruta
    if(!this.router.url.includes('editar')){
      return;
    }

   // verificamos el url por ende necesitamos el id
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.HeroesService.getHeroesPorId(id)) // este obs retorna un heroe
      )
      .subscribe(heroe => this.heroe = heroe);
  
  }

  guardar() {

    // validaciones
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    console.log(this.heroe.id);
    if (this.heroe.id) {
      // Actualizar
      this.HeroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackbar('Registro Actualizado'));
    } else {
      // crear un nuevo registro
      // Agregamos Heroe y para quer se dispare debo poner el subscribe
      this.HeroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnackbar('Registro creado');
        });
    }
  }

  borrarHeroe(){
      // enviar un componente para el dialog 
      const dialog = this.dialog.open( ConfirmarComponent, {
        width: '250px',
        data: { ...this.heroe}
      });

      // cuando se cierra , si se borra recibe un true si no se borra es undefined
      dialog.afterClosed().subscribe(
        (result)=>{
          console.log(result);
          if (result) {
              this.HeroesService.borrarHeroe( this.heroe.id!)
                .subscribe( resp =>{
                  this.router.navigate(['/heroes'])
                });
          }
        }
      )

 
  }

  mostrarSnackbar(mensaje:string){
    // envio mensaje , opciones y configuración
    this.snackBar.open( mensaje, 'cerrar', {
      duration:2500
    });
  }


}


/***
 * Para hacer el llamado a la bd hay que hacer este mediante nuestro servicio
 *  porque hay que hacer una peticion post
 *  angular no tiene una forma de conectarse a base de datos
 *
 * Hacemos llamado  desde el servicio --> a nuestro rest api
 *  rest api es quien hace la insercción de la base de datos
 *
 * this.activatedRoute está en undefined significa que estoy editando
 *
 * switchMap : nos permite hacer la transformación
 *
 * Logica
 *   si tiene id estamos editando un registro
 *   si no tiene id entonces estamos creando
 * 
 *  para poder navegar a otro lugar utilizamos router de @angular/router
 *
 *  ! al final --> fuerzo a que siempre tendra un valor
 */