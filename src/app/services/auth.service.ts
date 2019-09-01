
// Dans  AuthService , vous allez créer trois méthodes :

// une méthode permettant de créer un nouvel utilisateur ;

// une méthode permettant de connecter un utilisateur existant ;

// une méthode permettant la déconnexion de l'utilisateur.

// Puisque les opérations de création, de connexion et de déconnexion sont asynchrones,
//  c'est-à-dire qu'elles n'ont pas un résultat instantané, 
//  les méthodes que vous allez créer pour les gérer retourneront des Promise, 
//  \ce qui permettra également de gérer les situations d'erreur.

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

// Ensuite, créez la méthode  createNewUser()  pour créer un nouvel utilisateur, qui prendra comme argument une adresse mail et un mot de passe, et qui retournera une Promise
//  qui résoudra si la création réussit, et sera rejetée avec le message d'erreur si elle ne réussit pas :
createNewUser(email: string, password: string) {
  return new Promise(
    (resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
  }
  // Créez également  signInUser() , méthode très similaire, qui s'occupera de connecter un utilisateur déjà existant :
signInUser(email: string, password: string) {
  return new Promise(
    (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );

  }
  // Créez une méthode simple  signOutUser()  :
  signOutUser() {
    firebase.auth().signOut();
}
}
