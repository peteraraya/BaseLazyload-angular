import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe): string{
    
    let path ="assets/heroes/";

    return `${path}${value.id}.jpg`;
  }

}
