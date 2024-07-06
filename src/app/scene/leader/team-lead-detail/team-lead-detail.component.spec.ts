import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadDetailComponent } from './team-lead-detail.component';

describe('TeamLeadDetailComponent', () => {
  let component: TeamLeadDetailComponent;
  let fixture: ComponentFixture<TeamLeadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLeadDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
