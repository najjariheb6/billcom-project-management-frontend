import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTaskStatisticComponent } from './member-task-statistic.component';

describe('MemberTaskStatisticComponent', () => {
  let component: MemberTaskStatisticComponent;
  let fixture: ComponentFixture<MemberTaskStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTaskStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTaskStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
