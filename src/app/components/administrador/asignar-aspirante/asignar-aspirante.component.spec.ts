import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAspiranteComponent } from './asignar-aspirante.component';

describe('AsignarAspiranteComponent', () => {
  let component: AsignarAspiranteComponent;
  let fixture: ComponentFixture<AsignarAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
