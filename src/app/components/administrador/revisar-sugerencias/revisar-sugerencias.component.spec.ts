import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarSugerenciasComponent } from './revisar-sugerencias.component';

describe('RevisarSugerenciasComponent', () => {
  let component: RevisarSugerenciasComponent;
  let fixture: ComponentFixture<RevisarSugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarSugerenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
