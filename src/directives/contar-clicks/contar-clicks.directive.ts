import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { AnalyticsService } from 'src/services/analytics/analytics.service';
import { LugaresService } from 'src/services/lugares/lugares.service';

@Directive({
  selector: '[appContarClicks]'
})
export class ContarClicksDirective {
  @Input() lugar: any;
  @HostListener('click', ['$event.target']) onclick(btn) {
    this.analyticsService.create(this.lugar.id);

    if (isNaN(this.lugar.visitas)) {
      this.lugar.visitas = 1;
    } else {
      this.lugar.visitas += 1;
    }

    this.lugaresService.edit(this.lugar);
  }

  constructor(private analyticsService: AnalyticsService, private lugaresService: LugaresService) { }

}
