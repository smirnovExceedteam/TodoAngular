import {Component, OnInit} from '@angular/core';
import {TodosDataService} from '../../services/todosData.service'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  localLeft:number = 0
  constructor(private todosDataService: TodosDataService) { }

  sendTaskText(event:any) {
    this.todosDataService.addTask(event.target.value)
    event.target.value = ""
  }

  ngOnInit(): void {
    this.getLeft();
  }

  getLeft():void {
    this.todosDataService.getLength().subscribe((subscriber) => {
      this.localLeft = subscriber
    });
  }

  selectAll(){
    this.todosDataService.selectAll()
  }
}
