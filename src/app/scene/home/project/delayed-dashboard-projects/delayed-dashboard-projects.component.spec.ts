import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedDashboardProjectsComponent } from './delayed-dashboard-projects.component';

describe('DelayedDashboardProjectsComponent', () => {
  let component: DelayedDashboardProjectsComponent;
  let fixture: ComponentFixture<DelayedDashboardProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelayedDashboardProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedDashboardProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
