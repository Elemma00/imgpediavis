import { TestBed, inject } from '@angular/core/testing';

import { CompCommunicationService } from './comp-communication.service';

describe('CompCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompCommunicationService]
    });
  });

  it('should be created', inject([CompCommunicationService], (service: CompCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
