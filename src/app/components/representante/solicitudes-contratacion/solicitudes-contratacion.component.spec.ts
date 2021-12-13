import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesContratacionComponent } from './solicitudes-contratacion.component';

describe('SolicitudesContratacionComponent', () => {
  let component: SolicitudesContratacionComponent;
  let fixture: ComponentFixture<SolicitudesContratacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesContratacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesContratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
