import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodosDataService} from '../../services/todosData.service'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnDestroy{

  localLeft: number = 0

  constructor(private todosDataService: TodosDataService) {
  }

  ngOnInit(): void {
    this.getLeft();
  }
  ngOnDestroy() {

  }

  sendTaskText(event: any) {
    this.todosDataService.addTask(event.target.value)
    event.target.value = ""
  }

  getLeft(): void {
    this.todosDataService.getLength().subscribe((subscriber) => {
      this.localLeft = subscriber
    });
  }

  selectAll() {
    this.todosDataService.selectAll()
  }
}
