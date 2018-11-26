import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private afDB: AngularFireDatabase) { }

  create(id: number) {

    const object = {
      idLugar: id,
      datetime: Date.now()
    };

    this.afDB.database.ref('/analytics/').push(object);
  }
}
