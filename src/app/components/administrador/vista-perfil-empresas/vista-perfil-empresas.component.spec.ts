import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPerfilEmpresasComponent } from './vista-perfil-empresas.component';

describe('VistaPerfilEmpresasComponent', () => {
  let component: VistaPerfilEmpresasComponent;
  let fixture: ComponentFixture<VistaPerfilEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPerfilEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPerfilEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
