import { TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapService } from './map.service';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Geolocation,
    ]
  }));

  it('should be created', () => {
    const service: MapService = TestBed.inject(MapService);
    expect(service).toBeTruthy();
  });
});
