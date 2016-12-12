import { Component,OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private sub: any;
  users: FirebaseListObservable<any[]>;

  constructor(private slimLoader: SlimLoadingBarService, private router: Router,af: AngularFire) {
    // Listen the navigation events to start or complete the slim bar loading
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        //this.slimLoader.visible = false;
        this.slimLoader.start();
      } else if ( event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        this.slimLoader.complete();
       // this.slimLoader.visible = false;
      }
    }, (error: any) => {
      this.slimLoader.complete();
     // this.slimLoader.visible = false;
    });
    this.users = af.database.list('/users');
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}
