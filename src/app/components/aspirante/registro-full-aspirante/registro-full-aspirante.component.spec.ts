import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFullAspiranteComponent } from './registro-full-aspirante.component';

describe('RegistroFullAspiranteComponent', () => {
  let component: RegistroFullAspiranteComponent;
  let fixture: ComponentFixture<RegistroFullAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFullAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFullAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
