import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public fireAuth:AngularFireAuth){
  }
  title = 'LoginFire';

  // two-way-data binding variables ng-model 
  email:string ="" 
  password:string= ""

  //log de respuesta
  resetInfo =''
  successMessage =''
  errorMessage =''
  loginMessage=""

  crearUsuarioPorEmail(){

    //if(this.email.trim() == "" || this.password.trim() == ""){ return false;}// si hay campos vacios no creamos usuario
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(res=>{
      // este metodo retorna una promesa javascript, metodo que usamos en vez de try catch
      // el response de firebase es un objeto con todos los atributos de este mismo, como displayname, email, idToken, etc
      console.log(`email desde firebase: ${res.user.email}`)
      this.successMessage ='Usuario creado con exito'

      //de imendiato podemos mandar el link de verificacion al correo del usurio inscrito
      res.user.sendEmailVerification()
      .then( (success) => {console.log("se envio el email de verificacion al usuario")} )
      .catch((err) => {
        console.log(`Error, ${err.message}`);
      });
    }).catch(error=>{
      //si ocurrio un error lo tratamsos aqui
      console.log(error.message)
    })
  }

  resetarContrasena(){
    this.successMessage ='' //limpio el label
    this.fireAuth.auth.sendPasswordResetEmail(this.email)
		.then(()=>{
			//email sent
			this.resetInfo =`peticion de contrasena enviada, habre tu email: ${this.email}`
		})
		.catch(error=>{
			//error ocurrido
			this.resetInfo= `Error al enviar link de reset password ,${ error.message}`
		});
  }
  loguear(){
    this.fireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(res=>{
      this.loginMessage = 'usuario logueado con exito'
    })
  }

}
