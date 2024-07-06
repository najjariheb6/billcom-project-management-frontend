import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChargeDetailComponent } from './project-charge-detail.component';

describe('ProjectChargeDetailComponent', () => {
  let component: ProjectChargeDetailComponent;
  let fixture: ComponentFixture<ProjectChargeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectChargeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChargeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
