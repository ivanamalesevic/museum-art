import { Component, OnDestroy } from '@angular/core';
import {Router} from '@angular/router'
import { Subscription } from 'rxjs';
import { StateServiceService } from './services/state-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'museum-art-angular';
  hideTree = false;
  subscription: Subscription;

  constructor(public router: Router, private stateService: StateServiceService){
    this.subscription = this.stateService.hideTree.subscribe(
      res => this.hideTree = res
    )
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  
}
