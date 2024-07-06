import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeceficTaskComponent } from './specefic-task.component';

describe('SpeceficTaskComponent', () => {
  let component: SpeceficTaskComponent;
  let fixture: ComponentFixture<SpeceficTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeceficTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeceficTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
