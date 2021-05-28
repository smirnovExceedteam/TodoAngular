import {Component, OnInit} from '@angular/core';
import {TodosDataService} from '../../services/todosData.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  localLength:number = 0
  localLeft:number = 0
  localFilterType: number = 0
  localSelectedCounter: number = 0

  constructor(private todosDataService: TodosDataService) {}

  ngOnInit(): void {
    this.getLeft();
  }

  clearSelected():void{
    this.todosDataService.clearSelected()
  }

  getLeft():void {
    this.todosDataService.getLeft().subscribe((subscriber) => {
      this.localLeft = subscriber
    });
    this.todosDataService.getLength().subscribe((subscriber) => {
      this.localLength = subscriber
    });
    this.todosDataService.getFilterType().subscribe((subscriber) => {
      this.localFilterType = subscriber
    });
    this.todosDataService.getSelectedCount().subscribe((subscriber) => {
      this.localSelectedCounter = subscriber
    });
  }

  changeFilterType(type:number):void{
    this.todosDataService.changeFilterType(type)
  }


}
