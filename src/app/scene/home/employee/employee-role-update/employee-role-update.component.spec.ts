import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleUpdateComponent } from './employee-role-update.component';

describe('EmployeeRoleUpdateComponent', () => {
  let component: EmployeeRoleUpdateComponent;
  let fixture: ComponentFixture<EmployeeRoleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRoleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
