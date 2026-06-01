import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchManagentComponent } from './batch-managent-component';

describe('BatchManagentComponent', () => {
  let component: BatchManagentComponent;
  let fixture: ComponentFixture<BatchManagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchManagentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchManagentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
