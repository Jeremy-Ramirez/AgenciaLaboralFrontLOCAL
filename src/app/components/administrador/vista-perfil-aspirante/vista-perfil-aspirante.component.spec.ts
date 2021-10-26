import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPerfilAspiranteComponent } from './vista-perfil-aspirante.component';

describe('VistaPerfilAspiranteComponent', () => {
  let component: VistaPerfilAspiranteComponent;
  let fixture: ComponentFixture<VistaPerfilAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPerfilAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPerfilAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
