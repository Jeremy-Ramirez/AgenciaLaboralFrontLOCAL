import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPaqueteComponent } from './nuevo-paquete.component';

describe('NuevoPaqueteComponent', () => {
  let component: NuevoPaqueteComponent;
  let fixture: ComponentFixture<NuevoPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
