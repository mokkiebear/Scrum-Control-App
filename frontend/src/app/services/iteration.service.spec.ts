import { TestBed } from '@angular/core/testing';

import { IterationService } from '../services/iteration.service';

describe('IterationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IterationService = TestBed.get(IterationService);
    expect(service).toBeTruthy();
  });
});
