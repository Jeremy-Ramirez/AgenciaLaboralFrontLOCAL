import { TestBed } from '@angular/core/testing';

import { AsignarAspirantesService } from './asignar-aspirantes.service';

describe('AsignarAspirantesService', () => {
  let service: AsignarAspirantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignarAspirantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
