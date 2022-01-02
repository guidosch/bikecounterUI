import { TestBed } from '@angular/core/testing';

import { CloudFunctionAPIService } from './cloud-function-api.service';

describe('CloudFunctionAPIServiceService', () => {
  let service: CloudFunctionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudFunctionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
