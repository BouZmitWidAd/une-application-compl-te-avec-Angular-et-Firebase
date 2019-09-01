import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//on ajouter la configuartion de firebase sur app.components
export class AppComponent {
 constructor(){
   const config ={
    
      apiKey: "AIzaSyA0O7tWrxy7F7UMmCIrmrhmOFcBLBJMOfg",
      authDomain: "bibilio-825ea.firebaseapp.com",
      databaseURL: "https://bibilio-825ea.firebaseio.com",
      projectId: "bibilio-825ea",
      storageBucket: "",
      messagingSenderId: "64883372309",
      appId: "1:64883372309:web:f1c948afd07a3a33"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
   }
 }

