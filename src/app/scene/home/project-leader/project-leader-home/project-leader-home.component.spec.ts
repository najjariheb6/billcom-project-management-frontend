import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeaderHomeComponent } from './project-leader-home.component';

describe('ProjectLeaderHomeComponent', () => {
  let component: ProjectLeaderHomeComponent;
  let fixture: ComponentFixture<ProjectLeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLeaderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
