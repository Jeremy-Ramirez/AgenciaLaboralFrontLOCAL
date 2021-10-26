import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionEmpresaComponent } from './sesion-empresa.component';

describe('SesionEmpresaComponent', () => {
  let component: SesionEmpresaComponent;
  let fixture: ComponentFixture<SesionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
