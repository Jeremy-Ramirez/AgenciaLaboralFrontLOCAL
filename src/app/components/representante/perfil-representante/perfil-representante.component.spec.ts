import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilRepresentanteComponent } from './perfil-representante.component';

describe('PerfilRepresentanteComponent', () => {
  let component: PerfilRepresentanteComponent;
  let fixture: ComponentFixture<PerfilRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilRepresentanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
