import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionAspiranteComponent } from './sesion-aspirante.component';

describe('SesionAspiranteComponent', () => {
  let component: SesionAspiranteComponent;
  let fixture: ComponentFixture<SesionAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
