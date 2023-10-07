import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountermoduleRoutingModule } from './countermodule-routing.module';
import { CountermoduleComponent } from './countermodule.component';
import { CounterButtonsComponent } from '../counter/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from '../counter/counter-output/counter-output.component';
import { CounterComponent } from '../counter/counter/counter.component';
import { CustomeInputComponent } from '../counter/custome-input/custome-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../counter/state/counter.reducer';


@NgModule({
  declarations: [
    CountermoduleComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomeInputComponent,
  ],
  imports: [
    StoreModule.forFeature('counter',counterReducer),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CountermoduleRoutingModule
  ]
})
export class CountermoduleModule { }
