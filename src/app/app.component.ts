import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/state/app.state';
import { getErrorMessage, getLoading } from './store/Shared/shared.selectors';
import { autoUserLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-angualr';
  showLoading!:Observable<boolean>
  showErrorMessage!: Observable<string>;

  constructor(private store:Store<AppState>) {
    
  }

  ngOnInit(): void {
    this.showLoading=this.store.select(getLoading)
    this.showErrorMessage=this.store.select(getErrorMessage)
    this.store.dispatch(autoUserLogin())
  }
}
