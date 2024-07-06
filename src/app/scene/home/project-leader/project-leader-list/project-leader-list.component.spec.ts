import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeaderListComponent } from './project-leader-list.component';

describe('ProjectLeaderListComponent', () => {
  let component: ProjectLeaderListComponent;
  let fixture: ComponentFixture<ProjectLeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLeaderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
