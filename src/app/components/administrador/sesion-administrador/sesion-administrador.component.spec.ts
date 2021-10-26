import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionAdministradorComponent } from './sesion-administrador.component';

describe('SesionAdministradorComponent', () => {
  let component: SesionAdministradorComponent;
  let fixture: ComponentFixture<SesionAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
