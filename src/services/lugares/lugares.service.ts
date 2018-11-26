import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  apiKeyGeocode = 'xxxxxxxxxxxxxxxxxxxx';

  constructor(private afDB: AngularFireDatabase, private http: HttpClient) { }

  getLugares() {
    return this.afDB.list('lugares');
  }

  getById(id: string) {
    return this.afDB.database.ref(`lugares/${id}`).once('value').then(res => res.val());
  }

  getByTipo(tipo: string) {
    console.log(tipo);
    return this.afDB.database.ref('/lugares/')
      .orderByChild('tipo')
      .equalTo(tipo)
      .once('value');
  }

  create(lugar) {
    lugar.id = Date.now();
    this.afDB.database.ref(`lugares/${lugar.id}`).set(lugar);
  }

  edit(lugar) {
    this.afDB.object(`lugares/${lugar.id}`).set(lugar);
  }

  obtenerGeoData(direccion: string) {
    if (direccion !== '') {
      return this.http.get(`https://maps.google.com/maps/api/geocode/json?key=${this.apiKeyGeocode}&address=${direccion}`)
        .pipe(map((res: any) => res.results));
    } else {
      return of([]);
    }
  }

}
