import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentationPhase } from './fermentation-phase';

describe('FermentationPhase', () => {
  let component: FermentationPhase;
  let fixture: ComponentFixture<FermentationPhase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermentationPhase],
    }).compileComponents();

    fixture = TestBed.createComponent(FermentationPhase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
