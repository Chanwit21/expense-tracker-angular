import { TestBed } from '@angular/core/testing';

import { CetagoriesService } from './cetagories.service';

describe('CetagoriesService', () => {
  let service: CetagoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CetagoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
