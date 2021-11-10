import { TestBed } from '@angular/core/testing';

import { ArchivosAspiranteService } from './archivos-aspirante.service';

describe('ArchivosAspiranteService', () => {
  let service: ArchivosAspiranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosAspiranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
