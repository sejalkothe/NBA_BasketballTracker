import { TestBed } from '@angular/core/testing';

import { TrackteamService } from './trackteam.service';

describe('TrackteamService', () => {
  let service: TrackteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
