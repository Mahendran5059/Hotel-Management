import { TestBed } from '@angular/core/testing';

import { PostBookingService } from './post-booking.service';

describe('PostBookingService', () => {
  let service: PostBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
