import { Component, OnInit,Input } from '@angular/core';
import {Task} from '../../models/Models'
import {TodosDataService} from "../../services/todosData.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  filterType: number = 1
  value:string = ""
  isChanging:Boolean = false

  @Input() task:Task = {id:-1,text:"",completed:false}

  constructor(private todosDataService: TodosDataService) {}

  ngOnInit(): void {
    this.getFilter()
  }

  public getFilter():void{
      this.todosDataService.getFilterType().subscribe((subscriber) => {
      this.filterType = subscriber
    });
  }

  public deleteTask(task:Task):void{
    this.todosDataService.deleteTask(task)
  }

  public redactTask(str:string){
    this.value = str
    this.isChanging = true
  }
  public changeTask(task:Task,event:any){
    this.todosDataService.changeTask(task,event.target.value)
    this.isChanging = false
  }

  public taskCompleted(task:Task):void{
    this.todosDataService.taskCompleted(task)
  }

}
