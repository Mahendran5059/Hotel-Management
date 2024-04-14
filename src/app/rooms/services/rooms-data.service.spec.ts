import { TestBed } from '@angular/core/testing';

import { RoomsDataService } from './rooms-data.service';

describe('RoomsDataService', () => {
  let service: RoomsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
