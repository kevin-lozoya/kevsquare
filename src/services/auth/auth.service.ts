import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFireDatabase) { }

  login(email, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        return this.afDB.database.ref(`/user/${result.user.uid}`).once('value');
      })
      .then(snapshot => {
        const typeUser = (snapshot.val() && snapshot.val().type) || 'C';
        localStorage.setItem('typeUser', typeUser);
        this.router.navigate(['lugares']);
      })
      .catch(err => alert(err));
  }

  registro(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = {
          userUid: result.user.uid,
          type: 'C'
        };
        return this.afDB.object(`/user/${user.userUid}`).set(user);
      })
      .then(() => {
        alert('Usuario registrado.');
        this.router.navigate(['lugares']);
      })
      .catch(err => alert(err));
  }

  isLogged() {
    return this.angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['lugares']);
  }

  getUser() {
    return this.angularFireAuth.auth;
  }

}
