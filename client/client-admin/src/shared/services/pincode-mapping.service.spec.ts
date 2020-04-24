import { TestBed } from '@angular/core/testing';

import { PincodeMappingService } from './pincode-mapping.service';

describe('PincodeMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PincodeMappingService = TestBed.get(PincodeMappingService);
    expect(service).toBeTruthy();
  });
});
