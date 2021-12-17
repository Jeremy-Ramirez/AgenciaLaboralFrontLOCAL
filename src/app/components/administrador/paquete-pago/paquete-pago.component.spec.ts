import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetePagoComponent } from './paquete-pago.component';

describe('PaquetePagoComponent', () => {
  let component: PaquetePagoComponent;
  let fixture: ComponentFixture<PaquetePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaquetePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaquetePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
