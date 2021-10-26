import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFullRepresentanteComponent } from './registro-full-representante.component';

describe('RegistroFullRepresentanteComponent', () => {
  let component: RegistroFullRepresentanteComponent;
  let fixture: ComponentFixture<RegistroFullRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFullRepresentanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFullRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
