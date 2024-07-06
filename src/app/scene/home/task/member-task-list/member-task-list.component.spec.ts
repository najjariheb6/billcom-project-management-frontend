import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTaskListComponent } from './member-task-list.component';

describe('MemberTaskListComponent', () => {
  let component: MemberTaskListComponent;
  let fixture: ComponentFixture<MemberTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
