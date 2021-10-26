import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRepresentanteComponent } from './registro-representante.component';

describe('RegistroRepresentanteComponent', () => {
  let component: RegistroRepresentanteComponent;
  let fixture: ComponentFixture<RegistroRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroRepresentanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
