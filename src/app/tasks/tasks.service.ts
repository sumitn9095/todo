import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from './task';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public uri: string = environment.app_url;
  public header = new HttpHeaders();
  public bs = new BehaviorSubject<string>('');
  constructor(private _http: HttpClient) {
    this.header.append('Content-type', 'application/json');
  }

  tasks(): Observable<HttpEvent<Task>> {
    let req = new HttpRequest('GET', `${this.uri}`, {
      Headers: this.header,
    });
    return this._http.request<Task>(req);
  }

  // bsAdd() {
  //   this.bs.next('task_edited');
  // }

  tasksAdd(taskObj: Task): Observable<Task> {
    // let header = new HttpHeaders();
    // header.append('Content-type', 'multipart/form-data');
    // const formData = new FormData();
    // formData.append('name', taskObj.taskname);
    // formData.append('remind', taskObj.date);
    // let req = new HttpRequest('POST', `${this.uri}/add`, formData, {
    //   headers: header,
    // });
    // return this._http.request(req);
    taskObj.isOver = false;
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
}
