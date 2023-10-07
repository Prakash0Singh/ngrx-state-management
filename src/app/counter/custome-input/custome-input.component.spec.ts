import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeInputComponent } from './custome-input.component';

describe('CustomeInputComponent', () => {
  let component: CustomeInputComponent;
  let fixture: ComponentFixture<CustomeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
