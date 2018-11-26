import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarDestacadoComponent } from './lugar-destacado.component';

describe('LugarDestacadoComponent', () => {
  let component: LugarDestacadoComponent;
  let fixture: ComponentFixture<LugarDestacadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarDestacadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
