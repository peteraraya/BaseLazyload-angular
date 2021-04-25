import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
              private router: Router,
              private authService: AuthService  
              ) { }

  // cuando utilize el boton de login 
  login(){
    // ir al backend y confirmar que el usuario exista
    this.authService.login()
        .subscribe( resp =>{
          console.log(resp);
          if (resp.id) {
            this.router.navigate(['./heroes']);
            }  
        })
    // deberiamos tener un usuario , en todo momento yo necesito saber que usuario esta usando mi app
    // this.router.navigate(['./heroes']);
  }

  IngresarLogin(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
