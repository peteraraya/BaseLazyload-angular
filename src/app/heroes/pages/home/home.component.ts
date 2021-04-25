import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin:10px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  // auth!: Auth; // undefined

  get auth(){
    return this.authService.auth
  }

  constructor( private router:Router,
               private authService:AuthService) 
               { }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./auth']);
  }
}


/**
 * auth : tendra la info de authservice
 * 
 * cuando se recarga el navegador web se pierde lo que estaba en memoria 
 * 
 */