import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TodosDataService} from '../../services/todosData.service'
import {Task} from '../../models/Models'
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  subcription: Subscription = new Subscription()

  constructor(private todosDataService: TodosDataService) {
  }

  sendTaskText(event: any) {
    this.todosDataService.makeTask(event.target.value)
    event.target.value = ""
  }
  inputStyle = {'color': 'rgb(129, 129, 129)'}
  onFocus(){
    this.inputStyle = {'color':'black'}
  }
  ngOnInit(): void {

  }

  getTasks(): void {
    const tasks = this.todosDataService.getTasks();
    this.subcription = tasks.subscribe((subscriber) => {
      console.log(subscriber)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes && changes.uns && changes.uns.currentValue === true) {
    }
  }
}
