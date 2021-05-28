import { Component, Input } from '@angular/core';
import {TodosDataService} from './services/todosData.service'
import {Observable} from "rxjs";

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  constructor(private todosDataService: TodosDataService) {}
  localLength:number = 0
  length: Observable<any> | undefined;
  text: string = ""

  ngOnInit(): void {
    this.getLeft();
  }
  public onKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.text = String(event.target.value).trim()
      event.target.value = ""
    }
  }

  getLeft(): void {
    this.length = this.todosDataService.getLength()
    this.length.subscribe((subscriber) => {
      this.localLength = subscriber
    });
  }


}
