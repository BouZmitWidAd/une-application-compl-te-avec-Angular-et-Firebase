// Ensuite, vous allez modifier  HeaderComponent  pour afficher de manière contextuelle 
// les liens de connexion, de création d'utilisateur et de déconnexion :
// Ici, vous utilisez  onAuthStateChanged() , qui permet d'observer l'état de l'authentification de l'utilisateur : à chaque changement d'état, la fonction que vous passez en argument est exécutée.  Si l'utilisateur est bien authentifié,  onAuthStateChanged()  reçoit l'objet de type  firebase.User  correspondant à l'utilisateur.  Vous pouvez ainsi baser la valeur de la variable locale  isAuth  selon l'état 
// d'authentification de l'utilisateur, et afficher les liens correspondant à cet état.

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
        }else{
          this.isAuth=false;
        }
      }

    );
  }
  onSignOut(){
    this.authService.signOutUser();
  }

}
