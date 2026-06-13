import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingPhase } from './packaging-phase';

describe('PackagingPhase', () => {
  let component: PackagingPhase;
  let fixture: ComponentFixture<PackagingPhase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingPhase],
    }).compileComponents();

    fixture = TestBed.createComponent(PackagingPhase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
