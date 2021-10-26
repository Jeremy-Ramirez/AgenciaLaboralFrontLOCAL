import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirantesAceptadosComponent } from './aspirantes-aceptados.component';

describe('AspirantesAceptadosComponent', () => {
  let component: AspirantesAceptadosComponent;
  let fixture: ComponentFixture<AspirantesAceptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspirantesAceptadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirantesAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
