import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeceficDashboardProjectLeaderComponent } from './specefic-dashboard-project-leader.component';

describe('SpeceficDashboardProjectLeaderComponent', () => {
  let component: SpeceficDashboardProjectLeaderComponent;
  let fixture: ComponentFixture<SpeceficDashboardProjectLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeceficDashboardProjectLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeceficDashboardProjectLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
