import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryPhaseComponent } from './primary-phase-component';

describe('PrimaryPhaseComponent', () => {
  let component: PrimaryPhaseComponent;
  let fixture: ComponentFixture<PrimaryPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryPhaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryPhaseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
