import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigModalComponent } from './dialog-config-modal.component';

describe('DialogConfigModalComponent', () => {
  let component: DialogConfigModalComponent;
  let fixture: ComponentFixture<DialogConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfigModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
