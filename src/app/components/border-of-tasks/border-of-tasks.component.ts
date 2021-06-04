import {Component, OnDestroy, OnInit} from '@angular/core';
import { TodosDataService } from "../../services/todosData.service"
import { Task } from "../../models/TaskModel"
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-border-of-tasks',
  templateUrl: './border-of-tasks.component.html',
  styleUrls: ['./border-of-tasks.component.css'],
})
export class BorderOfTasksComponent implements OnInit {


  localArray$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private todosDataService: TodosDataService) {
  }

  ngOnInit(): void {
    this.localArray$ = this.todosDataService.getTasks();
  }
}
