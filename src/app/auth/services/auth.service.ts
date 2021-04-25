import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  // como tengo la variable privada utilizaremos get
  get auth():Auth{
    return { ...this._auth! }
  }

  constructor( private http: HttpClient) { }


  verificaAutenticacion():Observable<boolean> {

    // verifico si existe el token
    if ( !localStorage.getItem('token') ) {
      return of(false); 
      // of(false) transformamos el false en un obs y lo resuelve
    }
    
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          // console.log('map', auth);
          this._auth = auth; // recargo info
          return true;
        })
      );
    // return of(true);
    }
  




  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
               .pipe(
                //  tap( resp => console.log('AUTHSERVICE : ',resp))
                 tap( auth => this._auth = auth ),
                 tap( auth => localStorage.setItem('token', auth.id ) ),
               );
  }

  logout(){
    localStorage.removeItem('token');
    this._auth = undefined;
  }
}


/**
 * Debemos hacer nuestra sesion persistente 
 *   - necesitamos almacenar el resultado de la autenticación get 
 * 
 *   - el tap es utilizado para generar efectos secundarios , antes de llegar al subscribe va pasar por el tap
 * 
 *   - cuando _auth tiene un valor quiere decir que esta autenticado  
 * 
 *   - of  : sirve para crear obs dependiendo al argumento que le ponemos
 * 
 *   - map : sirve para transformar lo que se reciba del operador anterior y retornar un nuevo valor igual que la funcion de los arreglos
 */