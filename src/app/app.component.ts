import {Component, OnDestroy} from '@angular/core';
import {TodosDataService} from './services/todosData.service'
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnDestroy {


  constructor(private todosDataService: TodosDataService) {
  }

  localLength: number = 0
  length: Observable<any> | undefined;
  text: string = ""
  subscription: Subscription = new Subscription()

  ngOnInit(): void {
    this.getLeft();
  }

  ngOnDestroy() {
   this.subscription.unsubscribe()
  }

  getLeft(): void {
    this.length = this.todosDataService.getLength()
   this.subscription = this.length.subscribe((subscriber) => {
      this.localLength = subscriber
    });
  }


}
