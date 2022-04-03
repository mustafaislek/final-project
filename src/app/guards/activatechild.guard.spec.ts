import { TestBed } from '@angular/core/testing';

import { ActivatechildGuard } from './activatechild.guard';

describe('ActivatechildGuard', () => {
  let guard: ActivatechildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivatechildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
