import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // proveeidos en toda la aplicación
})
export class HeroesService {
  // Utilización de variables de entorno
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}
  // Metodo GET
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesPorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }
  // un obs que retorna un arreglo de heroe
  getSugerencias( termino: string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  // Llamada post
  agregarHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  //actualizar heroe
  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${ heroe.id }`, heroe);
  }
  //borrar heroe
  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${ id }`);
  }
}

// Trabajaremos con peticioes http  --> importaremos de manera global @angular/common/http HttpModule
