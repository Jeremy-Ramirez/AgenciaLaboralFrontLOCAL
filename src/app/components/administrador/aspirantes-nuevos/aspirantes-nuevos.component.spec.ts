import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirantesNuevosComponent } from './aspirantes-nuevos.component';

describe('AspirantesNuevosComponent', () => {
  let component: AspirantesNuevosComponent;
  let fixture: ComponentFixture<AspirantesNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspirantesNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirantesNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
