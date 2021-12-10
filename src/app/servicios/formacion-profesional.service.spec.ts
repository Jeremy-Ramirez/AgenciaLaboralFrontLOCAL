import { TestBed } from '@angular/core/testing';

import { FormacionProfesionalService } from './formacion-profesional.service';

describe('FormacionProfesionalService', () => {
  let service: FormacionProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormacionProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
