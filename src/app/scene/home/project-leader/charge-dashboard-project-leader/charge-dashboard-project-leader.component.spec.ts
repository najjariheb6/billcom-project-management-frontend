import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDashboardProjectLeaderComponent } from './charge-dashboard-project-leader.component';

describe('ChargeDashboardProjectLeaderComponent', () => {
  let component: ChargeDashboardProjectLeaderComponent;
  let fixture: ComponentFixture<ChargeDashboardProjectLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeDashboardProjectLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeDashboardProjectLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
