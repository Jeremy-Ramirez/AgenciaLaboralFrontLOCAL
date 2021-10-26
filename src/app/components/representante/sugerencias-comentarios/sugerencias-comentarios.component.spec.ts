import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciasComentariosComponent } from './sugerencias-comentarios.component';

describe('SugerenciasComentariosComponent', () => {
  let component: SugerenciasComentariosComponent;
  let fixture: ComponentFixture<SugerenciasComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerenciasComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerenciasComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
