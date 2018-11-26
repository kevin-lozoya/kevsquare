import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/services/lugares/lugares.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(2000)),
    ])
  ]
})
export class LugaresComponent implements OnInit {
  state = 'inicial';
  isAdmin = false;
  lat = 39.4323352;
  lng = -0.4752015;
  lugares: any[];
  destacados: any[];
  dateNow: string;

  constructor(private lugaresService: LugaresService) {
    this.dateNow = this.getDateToday();
    this.isAdmin = (localStorage.getItem('typeUser') === 'A');
  }

  ngOnInit() {
    this.lugaresService.getLugares().valueChanges()
      .subscribe(lugares => {
        const destacados = this.getLugaresDestacados(lugares);
        this.destacados = destacados;
        this.lugares = this.firstDestacados(lugares, destacados);
        setTimeout(() => {
          this.state = 'final';
        }, 100);
      });
  }

  private firstDestacados(lugares: any, destacados: any): any[] {
    destacados = destacados.slice();
    lugares = lugares.slice();

    destacados = this.shuffleArray(destacados).slice(0, 3);
    const temp = [].concat(destacados);

    for (const lugar of lugares) {
      let existe = false;
      for (const destacado of destacados) {
        if (lugar.id === destacado.id) {
          existe = true;
          break;
        }
      }

      if (!existe) {
        temp.push(lugar);
      }
    }

    return temp;
  }

  private getLugaresDestacados(lugares: any[]): any[] {
    const temp = [];
    for (const item of lugares) {
      if (item.plan === 'PAGADO' && this.dateNow >= item.startDate && this.dateNow <= item.endDate) {
        temp.push(item);
      }
    }

    return this.shuffleArray(temp);
  }

  private getDateToday(): string {
    const datetime = new Date();
    const year = datetime.getFullYear();
    let month = (datetime.getMonth() + 1).toString();
    let day = datetime.getDate().toString();

    if (month.length === 1) {
      month = '0' + month;
    }

    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  private shuffleArray(arr): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

}
