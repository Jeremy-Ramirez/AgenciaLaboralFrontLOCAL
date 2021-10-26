import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionRepresentanteComponent } from './sesion-representante.component';

describe('SesionRepresentanteComponent', () => {
  let component: SesionRepresentanteComponent;
  let fixture: ComponentFixture<SesionRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionRepresentanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
