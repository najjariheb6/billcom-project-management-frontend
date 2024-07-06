import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDetailComponent } from './general-detail.component';

describe('GeneralDetailComponent', () => {
  let component: GeneralDetailComponent;
  let fixture: ComponentFixture<GeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
