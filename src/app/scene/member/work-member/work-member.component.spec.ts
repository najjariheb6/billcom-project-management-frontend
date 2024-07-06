import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMemberComponent } from './work-member.component';

describe('WorkMemberComponent', () => {
  let component: WorkMemberComponent;
  let fixture: ComponentFixture<WorkMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
