import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspiranteProfesionalComponent } from './aspirante-profesional.component';

describe('AspiranteProfesionalComponent', () => {
  let component: AspiranteProfesionalComponent;
  let fixture: ComponentFixture<AspiranteProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspiranteProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspiranteProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
