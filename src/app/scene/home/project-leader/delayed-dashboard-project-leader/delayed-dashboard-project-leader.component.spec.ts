import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedDashboardProjectLeaderComponent } from './delayed-dashboard-project-leader.component';

describe('DelayedDashboardProjectLeaderComponent', () => {
  let component: DelayedDashboardProjectLeaderComponent;
  let fixture: ComponentFixture<DelayedDashboardProjectLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelayedDashboardProjectLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedDashboardProjectLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
