import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/services/lugares/lugares.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  title = 'Crear nuevo negocio';
  lugar: any = {};
  results$: Observable<any>;
  private searchField = new Subject<string>();

  constructor(private router: Router, private routeActivated: ActivatedRoute, private lugaresService: LugaresService) {
    const id = this.routeActivated.snapshot.params.id;
    if (id !== 'new') {
      this.title = 'Actualizar negocio';
      this.lugar = this.lugaresService.getById(id)
        .then(lugar => this.lugar = lugar);
    }
  }

  ngOnInit() {
    this.results$ = this.searchField.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.lugaresService.obtenerGeoData(term)),
      map((response: any) => {
        return response;
      })
    );
  }

  search(term: string): void {
    this.searchField.next(term);
  }

  guardarLugar() {
    const direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((res: any) => {
        this.lugar.lat = res[0].geometry.location.lat;
        this.lugar.lng = res[0].geometry.location.lng;

        if (!this.lugar.id) {
          this.lugaresService.create(this.lugar);
          this.lugar = {};
        } else {
          this.lugaresService.edit(this.lugar);
        }
        alert('Negocio guardado.');
        this.router.navigate(['lugares']);
      });
  }

  seleccionarDireccion(result) {
    const addressComponents = result.address_components;
    const adrressParams: any = {};
    for (let i = 0, len = addressComponents.length; i < len; i++) {
      const type = addressComponents[i].types[0].toString();
      switch (type) {
        case 'street_number':
          adrressParams.street_number = addressComponents[i].long_name;
          break;
        case 'route':
          adrressParams.route = addressComponents[i].long_name;
          break;
        case 'locality':
          adrressParams.locality = addressComponents[i].long_name;
          break;
        case 'country':
          adrressParams.country = addressComponents[i].long_name;
          break;
      }
    }

    this.lugar.calle = '';
    if (adrressParams.route && adrressParams.street_number) {
      this.lugar.calle = `${adrressParams.route}, ${adrressParams.street_number}`;
    }

    this.lugar.ciudad = adrressParams.locality;
    this.lugar.pais = adrressParams.country;
  }

}
