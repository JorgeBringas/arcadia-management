import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBatch } from './new-batch';

describe('NewBatch', () => {
  let component: NewBatch;
  let fixture: ComponentFixture<NewBatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBatch],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
