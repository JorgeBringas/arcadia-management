import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingPhaseComponent } from './packaging-phase-component';

describe('PackagingPhaseComponent', () => {
  let component: PackagingPhaseComponent;
  let fixture: ComponentFixture<PackagingPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingPhaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackagingPhaseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
