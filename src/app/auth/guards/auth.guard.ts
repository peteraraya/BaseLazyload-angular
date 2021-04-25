import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad , CanActivate{

  constructor( 
              private authService : AuthService,
              private router: Router
              ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutenticacion()
               .pipe(
                 tap( estaAutenticado =>{
                   if (!estaAutenticado) {
                        this.router.navigate(['./auth/login']); 
                    }
                 })
               );

    // if (this.authService.auth.id) {
    //   return true;
    // }

    // console.log('Bloqueado por AuthGuard - CanActivate');
    // return false;
  }

  // si puede el cargar un modulo
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean>  | boolean {

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );

    // si esto existe
    //   if ( this.authService.auth.id) {
    //       return true;
    //   }

    // console.log('Bloqueado por AuthGuard - CanLoad ');
    // return false;
  }
}


/**
 * canLoad :      solo sirve para prevenir que se muestre el modulo
 *                si ya estaba cargado la persona va prevenir que el usuario carge el modulo
 *                puede activar el modulo no si puede activar esa ruta
 * 
 * canActivarte
 * 
 */




      // console.log('canload', false);
      // console.log(route);
      // console.log(segments);

