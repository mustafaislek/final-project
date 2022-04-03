import { TestBed } from '@angular/core/testing';

import { LoadguardGuard } from './loadguard.guard';

describe('LoadguardGuard', () => {
  let guard: LoadguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
