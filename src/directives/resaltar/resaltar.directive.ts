import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective implements OnInit {
  @Input('appResaltar') plan = '';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.plan === 'pagado') {
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
    }
  }

}
