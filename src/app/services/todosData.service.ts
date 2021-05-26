import {Task} from "../models/Models"
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  arrayOfTasks: Task[] = []
  id:number = 0
  left: number = 0
  left$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  tasks$: BehaviorSubject<any> = new BehaviorSubject<any>([])

  private findElement(task: Task) {
    return this.arrayOfTasks.find(item => task.text === item.text)
  }

  public getData() {
    return this.arrayOfTasks
  }

  public getLeft():Observable<number>{
    this.howManyLeft()
    return this.left$
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  public howManyLeft() {
    let counter = 0
    for (let item of this.arrayOfTasks) if(item?.completed === false) counter ++
    this.left = counter
    this.left$.next(this.left)
  }

  public makeTask(str: string) {

    let newTask: Task =
      {
        id: this.id,
        text: str,
        completed: false
      }
    if (!this.findElement(newTask)) {
      this.arrayOfTasks.push(newTask)
      this.tasks$.next(this.arrayOfTasks)
      this.id++
    }
    this.howManyLeft()
  }

  public taskCompleted(task: Task) {
    for (let item of this.arrayOfTasks){
      if(item.text === task.text) item.completed = !(item.completed)
    }
    this.howManyLeft()
  }
}
