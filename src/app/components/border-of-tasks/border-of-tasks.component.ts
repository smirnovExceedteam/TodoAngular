import { Component, OnInit,Input } from '@angular/core';
import { TodosDataService } from "../../services/todosData.service"
import { Task } from "../../models/Models"
import {Observable} from "rxjs";



@Component({
  selector: 'app-border-of-tasks',
  templateUrl: './border-of-tasks.component.html',
  styleUrls: ['./border-of-tasks.component.css'],
})
export class BorderOfTasksComponent implements OnInit {

  localArray: Task[] = [];
  tasks: Observable<any> | undefined;
  constructor(private todosDataService: TodosDataService) {
    this.localArray = this.todosDataService.getData()
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.todosDataService.getTasks();
    this.tasks.subscribe((subscriber) => {
      console.log("test")
      console.log(subscriber)
      this.localArray = subscriber
    });
  }

}
