import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from 'src/services/lugares/lugares.service';
import { AnalyticsService } from 'src/services/analytics/analytics.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  lugar: any = {};
  destacados: any[] = [];
  isPlanPagado = false;

  constructor(
    private route: ActivatedRoute,
    private lugaresService: LugaresService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lugaresService.getById(params.id)
        .then((lugar: any) => {
          this.lugar = lugar;
          if (!this.comprobarPlanPagado(lugar)) {
            this.lugaresService.getByTipo(this.lugar.tipo)
              .then(snapshot => {
                this.destacados = [];
                let resultado = snapshot.val();
                resultado = Object.keys(resultado).map(function (key) { return resultado[key]; });
                for (const item of resultado) {
                  if (this.comprobarPlanPagado(item)) {
                    this.destacados.push(item);
                  }
                }
              });
          }
        });
    });
  }

  private comprobarPlanPagado(lugar: any) {
    const dateNow = this.getDateToday();
    return lugar.plan === 'PAGADO' && dateNow >= lugar.startDate && dateNow <= lugar.endDate;
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

}
