import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
//lintegration des routes 
// application comporte un système d'authentification complet, permettant l'inscription et la connexion/déconnexion des utilisateurs, et qui protège les routes concernées.  Vous pouvez maintenant ajouter les fonctionnalités à votre application en sachant que les accès à la
//  base de données et au stockage, qui nécessitent l'authentification, fonctionneront correctement.
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
 
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
providers: [AuthService, AuthGuardService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
