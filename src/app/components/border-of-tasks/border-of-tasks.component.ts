import { Component, OnInit } from '@angular/core';
import { TodosDataService } from "../../services/todosData.service"
import { Task } from "../../models/Models"

@Component({
  selector: 'app-border-of-tasks',
  templateUrl: './border-of-tasks.component.html',
  styleUrls: ['./border-of-tasks.component.css'],
})
export class BorderOfTasksComponent implements OnInit {

  localArray: Task[] = [];

  constructor(private todosDataService: TodosDataService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
      this.todosDataService.getTasks().subscribe((subscriber) => {
      this.localArray = subscriber
    });
  }

}
