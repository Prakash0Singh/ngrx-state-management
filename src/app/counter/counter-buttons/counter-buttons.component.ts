import { Component,EventEmitter,OnInit,Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {

  // @Output() increment=new EventEmitter<void>();
  // @Output() decrement=new EventEmitter<void>();
  // @Output() reset=new EventEmitter<void>();

  constructor(private store:Store<AppState>){

  }
 
  ngOnInit(): void {
    
  }

  onIncrement(){
    this.store.dispatch(increment())
    // this.increment.emit()
  }
  onDecrement(){
    this.store.dispatch(decrement())
    // this.decrement.emit()
  }
  onReset(){
    this.store.dispatch(reset())
    // this.reset.emit()
  }

}
