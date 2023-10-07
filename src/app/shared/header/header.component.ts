import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autologoutUser } from 'src/app/auth/state/auth.actions';
import { isAuthenicated } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated!:Observable<boolean>
 constructor(private store:Store<AppState>) {}

 ngOnInit(): void {
   this.isAuthenticated=this.store.select(isAuthenicated)

 }

 onLogoutUser(event:Event)
 {
  event.preventDefault();
  this.store.dispatch(autologoutUser())
 }
}
