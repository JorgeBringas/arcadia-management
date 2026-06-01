import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBatchComponent } from './new-batch-component';

describe('NewBatchComponent', () => {
  let component: NewBatchComponent;
  let fixture: ComponentFixture<NewBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBatchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBatchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
