import {Task} from "../models/TaskModel"
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from "./localStorage.service"
import {LoginService} from "./login.service"
import {FilterTypeEnum} from "../models/filterTypeEnum";

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private localStorageService: LocalStorageService) {

    this.localStorageService.getTokens().subscribe(data => {
      this.token = data.token
      this.refToken = data.refToken
    })
  }

  arrayOfTasks: Partial<Task>[] = []
  filterType: FilterTypeEnum = FilterTypeEnum.All
  allSelected: boolean = false
  selectedCount: number = 0
  userId: string | undefined = ""
  baseUrl: string = "http://localhost:3000"
  token: string | undefined = ""
  refToken: string | undefined = ""

  filterType$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  length$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  left$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  tasks$: BehaviorSubject<any> = new BehaviorSubject<any>([])
  selectedCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  public init() {
    this.userId = this.token
    this.getTasksDb().subscribe((data) => {
      this.arrayOfTasks = data
      this.tasks$.next(this.arrayOfTasks)
      this.length$.next(this.arrayOfTasks.length)
      this.selectedCount = (this.arrayOfTasks.filter(a => a?.completed === true)).length
      this.selectedCount$.next(this.selectedCount)
      this.allSelected = this.arrayOfTasks.every(a => a?.completed === true)
      this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////

  public getTasksDb(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/tasks/`);
  }

  public delete(task: Partial<Task>): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/tasks/${task?._id}`)
  }

  public addTaskDb(task: Partial<Task>): Observable<Task> {
    const body = {
      text: task.text,
      completed: task.completed,
    }
    return this.httpClient.put<Task>(`${this.baseUrl}/tasks`, body)
  }

  public update(task: Partial<Task>) {
    delete task.userId
    return this.httpClient.post(`${this.baseUrl}/tasks/${task._id}`, task)
  }

  public toggleComplete() {
    return this.httpClient.post(`${this.baseUrl}/tasks/${this.token}/toggle?allSelected=${this.allSelected}`, "")
  }

  public clear() {
    const body = {token: this.token}
    return this.httpClient.patch(`${this.baseUrl}/tasks/${this.userId}`, body)
  }

///////////////////////////////////////////////////////////////////////////////////////////////////

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


  private findElement(task: Partial<Task>): number {
    return this.arrayOfTasks.findIndex(a => a.text === task.text)
  }

  public howManyLeft(): void {
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
  }

  public getSelectedCount(): Observable<number> {
    return this.selectedCount$
  }

  /////////////////////////////////////////////////

  public addTask(str: string): void {
    str = str.trim();
    if (str === "" || this.findElement({text: str, completed: false, userId: this.userId}) !== -1) {
      return;
    }
    let newTask: Partial<Task> = {
      text: str,
      completed: false,
      userId: this.userId
    }

    this.addTaskDb(newTask).subscribe((data) => {
      newTask._id = data._id
    })
    this.arrayOfTasks.push(newTask)
    this.tasks$.next(this.arrayOfTasks)
    this.length$.next(this.arrayOfTasks.length)
    this.howManyLeft()
    this.changeFilter(this.filterType)
  }

  public taskCompleted(task: Partial<Task>): void {
    task.completed = !task.completed

    this.allSelected = this.arrayOfTasks.every(a => a?.completed === true)
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    this.selectedCount = (this.arrayOfTasks.filter(a => a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
    this.changeFilter(this.filterType)
    task.userId = this.token
    this.update(task).subscribe()
    this.howManyLeft()
  }

  public deleteTask(task: Partial<Task>): void {
    this.arrayOfTasks.splice(this.findElement(task), 1)
    this.selectedCount$.next(this.selectedCount)
    this.left$.next(this.arrayOfTasks.filter(task => task?.completed === false).length)
    this.selectedCount = (this.arrayOfTasks.filter(task => task?.completed === true)).length
    this.changeFilter(this.filterType)
    this.howManyLeft()
    task.userId = this.token
    this.length$.next(this.arrayOfTasks.length)
    this.delete(task).subscribe()
  }

  public selectAll(): void {
    if (!this.allSelected) {
      this.arrayOfTasks.forEach(a => a.completed = true)
      this.allSelected = true
    } else {
      this.arrayOfTasks.forEach(a => a.completed = false)
      this.allSelected = false
    }
    this.left$.next(this.arrayOfTasks.filter(a => a?.completed === false).length)
    this.selectedCount = (this.arrayOfTasks.filter(a => a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
    this.changeFilter(this.filterType)
    this.howManyLeft()
    this.toggleComplete().subscribe(data => {
    })
  }

  public clearSelected(): void {
    this.arrayOfTasks.filter(a => a?.completed === true).forEach(a => this.arrayOfTasks.splice(this.findElement(a), 1))
    this.selectedCount = (this.arrayOfTasks.filter(a => a?.completed === true)).length
    this.selectedCount$.next(this.selectedCount)
    this.changeFilter(this.filterType)
    this.length$.next(this.arrayOfTasks.length)
    this.clear().subscribe(data => {
    })
  }

  public changeFilter(type: FilterTypeEnum): void {
    this.filterType = type
    this.filterType$.next(this.filterType)
    switch (this.filterType) {
      case FilterTypeEnum.All:
        this.tasks$.next(this.arrayOfTasks)
        break
      case FilterTypeEnum.Active:
        this.tasks$.next(this.arrayOfTasks.filter(task => task?.completed === false))
        break
      case FilterTypeEnum.Completed:
        this.tasks$.next(this.arrayOfTasks.filter(task => task?.completed === true))
        break
    }
  }

  public changeTask(task: Partial<Task>, str: string) {
    if ((this.arrayOfTasks.filter(a => a.text === str)).length === 0) {
      this.arrayOfTasks[this.findElement(task)].text = str
    }
    this.tasks$.next(this.arrayOfTasks)
    task.userId = this.token
    this.update(task).subscribe(data => {
    })
  }
}

