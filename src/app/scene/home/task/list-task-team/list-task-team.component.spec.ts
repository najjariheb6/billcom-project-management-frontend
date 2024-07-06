import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskTeamComponent } from './list-task-team.component';

describe('ListTaskTeamComponent', () => {
  let component: ListTaskTeamComponent;
  let fixture: ComponentFixture<ListTaskTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaskTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaskTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
