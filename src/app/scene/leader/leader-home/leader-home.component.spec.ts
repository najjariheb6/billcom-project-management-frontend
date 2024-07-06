import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderHomeComponent } from './leader-home.component';

describe('LeaderHomeComponent', () => {
  let component: LeaderHomeComponent;
  let fixture: ComponentFixture<LeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
