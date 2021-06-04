import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TodosDataService} from "../../services/todosData.service";
import {FilterTypeEnum} from "../../models/filterTypeEnum";

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnDestroy{

  constructor(private todosDataService: TodosDataService) {
  }
  left$ = new Observable<number>();
  length$ = new Observable<number>();
  selected$ = new Observable<number>();
  text: string = ""

  ngOnInit(): void {
    this.todosDataService.init()
    this.length$ = this.todosDataService.getLength()
    this.left$ = this.todosDataService.getLeft()
    this.selected$ = this.todosDataService.getSelectedCount()
  }

  ngOnDestroy() {
  }
  changeFilter(filter:FilterTypeEnum){
    this.todosDataService.changeFilter(filter)
  }
  clearSelected(){
    this.todosDataService.clearSelected()
  }
}
