import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoggedUserComponent } from './update-logged-user.component';

describe('UpdateLoggedUserComponent', () => {
  let component: UpdateLoggedUserComponent;
  let fixture: ComponentFixture<UpdateLoggedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLoggedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLoggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
