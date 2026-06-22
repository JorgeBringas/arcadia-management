import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchNew } from './batch-new';

describe('BatchNew', () => {
  let component: BatchNew;
  let fixture: ComponentFixture<BatchNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchNew],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
