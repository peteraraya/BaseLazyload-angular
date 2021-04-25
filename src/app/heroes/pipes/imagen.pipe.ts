import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: true
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string{
    let path ="assets";

    // console.log('Pipe imagen se proceso');
    // si el id no existe y tampoco alt_img
    if ( !heroe.id && !heroe.alt_img ) {
      return `${path}/no-image.png`;

    }else if ( heroe.alt_img) {
      // ya trae el url completo
      return heroe.alt_img;
      
    }else{

      return `${path}/heroes/${heroe.id}.jpg`;
    }


  }

}

/**
 * Utilizaremos pipes puros : para que se vuelvan a ejecutar
 *  pure: el pipe se va incoar cada vez que el argumento cambie
 * 
 * pure en false ---> cada vez que haga un cambio en anguilar este se va disparar
 */