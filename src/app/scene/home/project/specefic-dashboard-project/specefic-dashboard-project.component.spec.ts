import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeceficDashboardProjectComponent } from './specefic-dashboard-project.component';

describe('SpeceficDashboardProjectComponent', () => {
  let component: SpeceficDashboardProjectComponent;
  let fixture: ComponentFixture<SpeceficDashboardProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeceficDashboardProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeceficDashboardProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
