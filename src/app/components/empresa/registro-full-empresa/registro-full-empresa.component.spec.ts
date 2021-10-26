import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFullEmpresaComponent } from './registro-full-empresa.component';

describe('RegistroFullEmpresaComponent', () => {
  let component: RegistroFullEmpresaComponent;
  let fixture: ComponentFixture<RegistroFullEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFullEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFullEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
