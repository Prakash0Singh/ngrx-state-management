import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeMessage, customIncrement } from '../state/counter.action';
import { getMessage } from '../state/counter.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-custome-input',
  templateUrl: './custome-input.component.html',
  styleUrls: ['./custome-input.component.css']
})
export class CustomeInputComponent implements OnInit {

  value!:number
  message!:string

  constructor(private store:Store<AppState>) {
    
  }
  ngOnInit(){
    this.store.select(getMessage).subscribe((data)=>{
      console.log('Only For Message')
      this.message=data
    })
  }

  onAdd(){
    console.log(this.value,'User Input')
    console.log(+this.value,'2')
    this.store.dispatch(customIncrement({value: +this.value}))
  }

  onupdateMessage(){
    this.store.dispatch(changeMessage())
  }
}
