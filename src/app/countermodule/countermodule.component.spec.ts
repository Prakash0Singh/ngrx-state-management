import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermoduleComponent } from './countermodule.component';

describe('CountermoduleComponent', () => {
  let component: CountermoduleComponent;
  let fixture: ComponentFixture<CountermoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountermoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountermoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
