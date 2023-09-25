import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from './task';
import { CommonConstants } from '../utility/CommonConstants';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
  HttpEvent,
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlConstants } from '../utility/UrlConstants';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public user:any;
  public uri: string = environment.app_url;
  public header = new HttpHeaders();
  public bs = new BehaviorSubject<string>('');
  public categorySelected = new BehaviorSubject<any[]>([]);
  public categorySelectedByDefault = new BehaviorSubject<any[]>([]);
  constructor(private _http: HttpClient) {
    this.header.append('Content-type', 'application/json');
    this.user = CommonConstants.getUser();
  }
  tasks(): Observable<HttpEvent<Task>> {
    let req = new HttpRequest('GET', `${this.uri}`, {
      Headers: this.header,
    });
    return this._http.request<Task>(req);
  }
  tasks_details(taskId:string){
    return this._http.get<Task>(`${this.uri}task/${taskId}`, { headers: this.header });
  }

  // bsAdd() {
  //   this.bs.next('task_edited');
  // }

  tasksAdd(taskObj: Task): Observable<Task> {
    taskObj.isOver = false;
    taskObj.email = this.user.email;
    console.log('taskObj', taskObj);
    return this._http.post<Task>(`${this.uri}add`, taskObj);
  }

  taskEdit(taskId: string, newTaskname: any) {
    let taskname = { taskname: newTaskname };
    console.log('task service checking task edit', taskId, newTaskname);
    return this._http.put<Task>(`${this.uri}edit/${taskId}`, taskname, {
      headers: this.header,
    });
  }

  taskStatus(taskId: string, isOver: boolean) {
    let task_status = { isOver: isOver };
    return this._http.put<Task>(`${this.uri}status/${taskId}`, task_status);
  }

  taskDelete(taskIdToDelete: any): Observable<Task> {
    console.log(`task to be deleted is ${taskIdToDelete}`);
    return this._http.delete<Task>(`${this.uri}delete/${taskIdToDelete}`);
  }

  taskSearch(taskName: any): Observable<Task> {
    return this._http.get<Task>(`${this.uri}`, { headers: this.header });
  }

  //---------------------------------------

  userTasks(obj:{}): Observable<any> {
    return this._http.post<any>(`${this.uri}${UrlConstants.userTasks}`, obj, { headers: this.header });
  }
  userTaskAdd(obj:any): Observable<any> {
    // obj.email = this.user.email;
    return this._http.post<any>(`${this.uri}${UrlConstants.userTaskAdd}`, obj, {headers: this.header});
  }
  userTaskEdit(obj:{}): Observable<any> {
    return this._http.put<any>(`${this.uri}${UrlConstants.userTaskEdit}`, obj, {headers: this.header});
  }
  userTaskStatusChange(id: string, isOver: boolean): Observable<any> {
    let obj = {id, isOver}
    return this._http.put<any>(`${this.uri}${UrlConstants.userStatusToggle}`, obj, {headers: this.header});
  }
  userTaskDetail(id:any): Observable<any> {
    return this._http.get<any>(`${this.uri}${UrlConstants.userTaskDetail}/${id}`, {headers: this.header});
  }
  userTaskInfoAndDetail(id:any): Observable<any> {
    return this._http.get<any>(`${this.uri}${UrlConstants.userTaskInfoAndDetail}/${id}`, {headers: this.header});
  }
  userTaskDetailsSave(obj:any): Observable<any> {
    return this._http.post<any>(`${this.uri}${UrlConstants.userTaskDetailsSave}`, obj, {headers: this.header});
  }

  // --------------- Category --------------
  fetchUserCategories(){
    let obj = {
      email : this.user.email
    }
    return this._http.post<any>(`${this.uri}${UrlConstants.userCategories}`,obj);
  }

  doesCategoryExists(cat:string): any {
    this.fetchUserCategories().subscribe(o => {
      console.log("fetchUserCategories--o",o)
      let categoryExists = o.data.some((r:any) => r.name == cat);
      return categoryExists;
    });
  }

  category_add(obj:any) {
    obj.email = this.user.email
    return this._http.post<any>(`${this.uri}${UrlConstants.userCategoryAdd}`, obj);
  }

  category_remove(id:any) {
    let obj = {
      id: id
    }
    return this._http.post<any>(`${this.uri}${UrlConstants.userCategoryRemove}`, obj);
  }
}
