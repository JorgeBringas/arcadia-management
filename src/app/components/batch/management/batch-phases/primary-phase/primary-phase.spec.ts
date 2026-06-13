import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryPhase } from './primary-phase';

describe('PrimaryPhase', () => {
  let component: PrimaryPhase;
  let fixture: ComponentFixture<PrimaryPhase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryPhase],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryPhase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
