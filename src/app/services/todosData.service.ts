import {Task} from "../models/Models"
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {

  arrayOfTasks: Task[] = []
  filterType: number = 1
  id: number = 0
  allSelected: boolean = false
  selectedCount: number = 0


  filterType$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  length$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  left$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  tasks$: BehaviorSubject<any> = new BehaviorSubject<any>([])
  selectedCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  public getLeft(): Observable<number> {
    this.howManyLeft()
    return this.left$
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  public getLength(): Observable<number> {
    this.length$.next(this.arrayOfTasks.length)
    return this.length$
  }

  public getFilterType(): Observable<number> {
    this.filterType$.next(this.filterType)
    return this.filterType$
  }

  public getSelectedCount(): Observable<number>{
    return this.selectedCount$
  }

  private findElement(task: Task): number {
    return this.arrayOfTasks.findIndex(a => a.text === task.text)
  }

  public howManyLeft() :void {
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
  }

  /////////////////////////////////////////////////

  public addTask(str: string):void {
    if (str.trim() != "") {
      let newTask: Task = {id: this.id, text: str, completed: false}
      if (this.findElement(newTask) === -1) {
        this.arrayOfTasks.push(newTask)
        this.tasks$.next(this.arrayOfTasks)
        this.length$.next(this.arrayOfTasks.length)
        this.id++
      }
      this.changeFilterType(this.filterType)
      this.howManyLeft()
    }
  }

  public taskCompleted(task: Task):void {
    this.arrayOfTasks[this.findElement(task)].completed = !(this.arrayOfTasks[this.findElement(task)].completed)
    this.allSelected = this.arrayOfTasks.every(a => a?.completed === true)
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    this.changeFilterType(this.filterType)
    this.selectedCount = (this.arrayOfTasks.filter(a=>a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
  }

  public deleteTask(task: Task):void {
    this.arrayOfTasks.splice(this.findElement(task), 1)
    this.length$.next(this.arrayOfTasks.length)
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    this.changeFilterType(this.filterType)
    this.selectedCount = (this.arrayOfTasks.filter(a=>a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
  }

  public selectAll(): void{
    if (!this.allSelected) {
      this.arrayOfTasks.forEach(a => a.completed = true)
      this.allSelected = true
    } else {
      this.arrayOfTasks.forEach(a => a.completed = false)
      this.allSelected = false
    }
    this.changeFilterType(this.filterType)
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    this.selectedCount = (this.arrayOfTasks.filter(a=>a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
  }

  public clearSelected():void {
    this.arrayOfTasks.filter(a => a?.completed === true).forEach(a => this.arrayOfTasks.splice(this.findElement(a), 1))
    this.selectedCount = (this.arrayOfTasks.filter(a=>a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
    this.changeFilterType(this.filterType)
  }

  public changeFilterType(type: number):void {
    this.filterType = type
    this.filterType$.next(this.filterType)
    switch (this.filterType) {
      case 1:
        this.tasks$.next(this.arrayOfTasks)
        break
      case 2:
        this.tasks$.next(this.arrayOfTasks.filter(task => task?.completed === false))
        break
      case 3:
        this.tasks$.next(this.arrayOfTasks.filter(task => task?.completed === true))
        break
    }
  }

  public changeTask(task:Task,str:string){
    if((this.arrayOfTasks.filter(a=>a.text === str)).length === 0){
      this.arrayOfTasks[this.findElement(task)].text = str
    }
    this.tasks$.next(this.arrayOfTasks)
  }
}

