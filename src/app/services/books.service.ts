import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
// An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast 
// (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
import {Subject} from '../../../node_modules/rxjs';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[]=[];
  booksSubject=new Subject<Book[]>();
  
  constructor() {
    this.getBooks();
}

  emitBooks(){
    this.booksSubject.next(this.books);
  }
  // Ensuite, vous allez utiliser une méthode mise à disposition par Firebase pour enregistrer 
  // la liste sur un node de la base de données — la méthode  set() 
  // La méthode  ref()  retourne une référence au node demandé de la base de données, et  set()  fonctionne plus ou moins comme  
  // put()  pour le HTTP : il écrit et remplace les données au node donné. 
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
}
getBooks() {
  firebase.database().ref('/books')
    .on('value', (data: Datasnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
}

getSingleBook(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data:  Datasnapshot) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}
createNewBook(newBook: Book) {
  this.books.push(newBook);
  this.saveBooks();
  this.emitBooks();
}

removeBook(book: Book) {
  if(book.photo) {
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
    }
  );
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
}
uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
  );
}

}



