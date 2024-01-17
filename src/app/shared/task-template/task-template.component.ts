import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/tasks/tasks.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss'],
})
export class TaskTemplateComponent implements OnInit {
  @Input() tasklist: any[] = [];
  @Input() noedit: any;
  @Input() isList: string = '';
  @Output() taskUpdate = new EventEmitter();
  @Output() taskId = new EventEmitter<any>();

  public user:any;
  public env:any;

  constructor(private _taskService: TasksService, private _router:Router) {}

  ngOnInit(): void {
    this.env = environment.base_url;
    this.user = JSON.parse(sessionStorage.getItem('user') as any);
    console.log("tasklist-----------",this.tasklist);
  }

  checkDetails(id:any){
    this.taskId.emit(id);
  }

  task_edit(taskId: string, newTaskName: any, task:any) {
    let obj = {
      email : this.user.email,
      id: taskId,
      newTaskName: newTaskName
    }
    console.log("task-edt",task);
    this._taskService.userTaskEdit(obj).subscribe({
      next: (w:any) => {console.log(w);},
      error: (err:Error) => {},
      complete:() => {this._taskService.bs.next('task_edited');}
    });
  }

  task_delete(taskId: string) {
    console.log(`task to be deleted is ${taskId}`);
    this._taskService.taskDelete(taskId).subscribe(
      (next: any) => {},
      (error: Error) => {},
      () => {
        this._taskService.bs.next('task_deleted');
      }
    );
  }

  // delete_last(taskIdToDelete: number) {
  //   this._taskService.taskDelete(taskIdToDelete).subscribe((task: any) => {
  //     console.log(`${task} is deleted`);
  //     this.task_list();
  //   });
  // }

  goto(cat:string) {
    console.log("cate : ",cat);
    let ght = cat.toString().toLowerCase();
    this._router.navigate([`./tasks/${ght}`], { queryParamsHandling : 'merge'});
  }

  task_status(taskId: string, isOver: boolean) {
    this._taskService.userTaskStatusChange(taskId, isOver).subscribe({
      next: (w:any) => {
        console.log(w);
      },
      error: (err:Error) => {
        console.error;
      },
      complete: () => {
        this._taskService.bs.next('task_status_updated');
        this.taskUpdate.emit('task_status_updated')
      }
   } );
  }
}
