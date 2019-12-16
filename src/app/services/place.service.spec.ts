import { TestBed } from '@angular/core/testing';

import { PlaceService } from './place.service';

describe('PlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceService = TestBed.inject(PlaceService);
    expect(service).toBeTruthy();
  });
});
