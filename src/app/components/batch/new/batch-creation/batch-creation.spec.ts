import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreation } from './batch-creation';

describe('BatchCreation', () => {
  let component: BatchCreation;
  let fixture: ComponentFixture<BatchCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
