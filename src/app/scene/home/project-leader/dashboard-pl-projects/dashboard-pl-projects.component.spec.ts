import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPLProjectsComponent } from './dashboard-pl-projects.component';

describe('DashboardPLProjectsComponent', () => {
  let component: DashboardPLProjectsComponent;
  let fixture: ComponentFixture<DashboardPLProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPLProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPLProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
