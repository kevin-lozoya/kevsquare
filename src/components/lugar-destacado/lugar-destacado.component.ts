import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lugar-destacado',
  templateUrl: './lugar-destacado.component.html',
  styleUrls: ['./lugar-destacado.component.scss']
})
export class LugarDestacadoComponent {
  @Input() lugar: any = {};

  constructor() { }

}
