import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditioningPhase } from './conditioning-phase';

describe('ConditioningPhase', () => {
  let component: ConditioningPhase;
  let fixture: ComponentFixture<ConditioningPhase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditioningPhase],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditioningPhase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
