import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit,OnDestroy {
//  @Input() count: any;
counter$!:Observable<{counter:number}>
constructor(private store:Store<AppState>){
  
 }
 counter!:number

 ngOnInit(): void {

  // this.counter$=this.store.select('counter')

   this.store.select(getCounter).subscribe({
    next:(res:any)=>{
      console.log('Only For Counter')
      this.counter=res 
    }
   })
 }

 ngOnDestroy(): void {
 
 }
}
