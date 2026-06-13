import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchConfirmation } from './batch-confirmation';

describe('BatchConfirmation', () => {
  let component: BatchConfirmation;
  let fixture: ComponentFixture<BatchConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
