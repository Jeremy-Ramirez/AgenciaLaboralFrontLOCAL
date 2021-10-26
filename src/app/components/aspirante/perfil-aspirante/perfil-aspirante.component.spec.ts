import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAspiranteComponent } from './perfil-aspirante.component';

describe('PerfilAspiranteComponent', () => {
  let component: PerfilAspiranteComponent;
  let fixture: ComponentFixture<PerfilAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
