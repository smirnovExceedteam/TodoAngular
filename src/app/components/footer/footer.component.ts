import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterTypeEnum} from "../../models/filterTypeEnum";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})


export class FooterComponent{
  FilterTypeEnumTemp = FilterTypeEnum

  @Input()  selectedLength: number | null = 0
  @Input()  length: number | null = 0
  @Input()  howManySelected: number | null = 0

  @Input()  filter: FilterTypeEnum = FilterTypeEnum.All
  @Output() filterChange = new EventEmitter<FilterTypeEnum>()
  @Output() clearSelected = new EventEmitter<MouseEvent>()

  constructor() {
  }

  onClearSelected(): void {
    this.clearSelected.emit()
  }

  changeFilterType(filter: FilterTypeEnum): void {
    this.filterChange.emit(filter)
    this.filter = filter
  }


}
