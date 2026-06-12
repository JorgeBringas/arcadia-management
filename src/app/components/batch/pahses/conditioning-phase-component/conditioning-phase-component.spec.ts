import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditioningPhaseComponent } from './conditioning-phase-component';

describe('ConditioningPhaseComponent', () => {
  let component: ConditioningPhaseComponent;
  let fixture: ComponentFixture<ConditioningPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditioningPhaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditioningPhaseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
