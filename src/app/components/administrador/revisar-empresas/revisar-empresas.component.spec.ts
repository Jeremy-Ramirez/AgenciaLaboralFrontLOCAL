import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarEmpresasComponent } from './revisar-empresas.component';

describe('RevisarEmpresasComponent', () => {
  let component: RevisarEmpresasComponent;
  let fixture: ComponentFixture<RevisarEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
