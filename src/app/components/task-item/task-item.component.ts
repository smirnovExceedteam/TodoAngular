import { Component, OnInit,Input } from '@angular/core';
import {Task} from '../../models/Models'
import {Observable} from "rxjs";
import {TodosDataService} from "../../services/todosData.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  tasks: Observable<any> | undefined;

  constructor(private todosDataService: TodosDataService) {}
  @Input() task:Task = {id:1,text:"123",completed:false}

  ngOnInit(): void {
  }
  taskCompleted(task:Task){
    this.todosDataService.taskCompleted(task)
  }
}
