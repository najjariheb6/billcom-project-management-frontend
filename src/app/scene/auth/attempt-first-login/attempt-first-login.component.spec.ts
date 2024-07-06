import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptFirstLoginComponent } from './attempt-first-login.component';

describe('AttemptFirstLoginComponent', () => {
  let component: AttemptFirstLoginComponent;
  let fixture: ComponentFixture<AttemptFirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptFirstLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
