import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterComponent } from '../counter/counter/counter.component';

const routes: Routes = [
  {path:'',component:CounterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountermoduleRoutingModule { }
