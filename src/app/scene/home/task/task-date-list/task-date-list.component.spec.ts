import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDateListComponent } from './task-date-list.component';

describe('TaskDateListComponent', () => {
  let component: TaskDateListComponent;
  let fixture: ComponentFixture<TaskDateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
