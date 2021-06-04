import {Component, OnInit, Input} from '@angular/core';
import {Task} from '../../models/TaskModel'
import {TodosDataService} from "../../services/todosData.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  value: string = ""
  isChanging: Boolean = false

  @Input() task: Task | undefined

  constructor(private todosDataService: TodosDataService) {
  }

  ngOnInit(): void {
  }


  public deleteTask(task: Partial<Task> | undefined): void {
    if (task === undefined) return
    this.todosDataService.deleteTask(task)
  }

  public redactTask(str: string | undefined) {
    if (str === undefined) return
    this.value = str
    this.isChanging = true
  }

  public changeTask(task: Partial<Task> | undefined, event: any) {
    if (!task) return

    this.todosDataService.changeTask(task, event.target.value)
    this.isChanging = false
  }

  public taskCompleted(task: Partial<Task> | undefined): void {
    if (!task) return
    this.todosDataService.taskCompleted(task)
  }

}
