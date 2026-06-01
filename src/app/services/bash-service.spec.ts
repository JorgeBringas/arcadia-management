import { TestBed } from '@angular/core/testing';

import { BashService } from './bash-service';

describe('BashService', () => {
  let service: BashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
