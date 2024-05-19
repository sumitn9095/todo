import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/tasks/tasks.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Infomodal } from 'src/app/utility/infomodal';
import { CommonConstants } from 'src/app/utility/CommonConstants';
import { CommonService } from 'src/app/common.service';
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


  infoModalType : string = '';
  infoModal : Infomodal = {show:false, message:''}
  public user:any;
  public env:any;

  constructor(private _cs:CommonService, private _taskService: TasksService, private _router:Router) {}

  ngOnInit(): void {
    this.env = environment.base_url;
    this.user = JSON.parse(sessionStorage.getItem('user') as any);
    console.log("tasklist-----------",this.tasklist);
  }

  checkDetails(id:any){
    this.taskId.emit(id);
  }

  closeInfoModal(data:any){
    console.log("closeInfoModal",data);
    this.infoModal = {show : false};
  }

  removeImg = (taskId: string) => {
    this._cs.openSnackBar("Processing...");
    this._taskService.userRemoveImg(taskId).subscribe({
      next: (a:any) => {
        this._cs.openSnackBar("Task Photo Removed", "Success");
      },
      error: (err:any) => {
        let errorMssg = err?.error?.message;
        let keywordHasAuth = CommonConstants.matchKeywordUnAuth(errorMssg.toLowerCase());
        console.log("keywordHasAuth",errorMssg,keywordHasAuth)
        if(keywordHasAuth) this.infoModal = {show: true, message: errorMssg};
        else {this._cs.openSnackBar(errorMssg, "Error");}
      },
      complete:() => {
        this.taskUpdate.emit('task_status_updated')
      }
    })
  }

  task_edit(taskId: string, newTaskName: any, task:any) {
    let obj = {
      email : this.user.email,
      id: taskId,
      newTaskName: newTaskName
    }
    console.log("task-edt",task);
    this._cs.openSnackBar("Processing...",);
    this._taskService.userTaskEdit(obj).subscribe({
      next: (w:any) => {
        this._cs.openSnackBar("Updated Task name", "Success");
      },
      error: (err:any) => {
        let errorMssg = err?.error?.message;
        let keywordHasAuth = CommonConstants.matchKeywordUnAuth(errorMssg.toLowerCase());
        console.log("keywordHasAuth",errorMssg,keywordHasAuth)
    
        if(keywordHasAuth) {
          this.infoModalType = 'loginTimeOut';
          this.infoModal = {show: true, message: errorMssg};
        } else {this._cs.openSnackBar(errorMssg, "Error");}
      },
      complete:() => {
        this._taskService.bs.next('task_edited');
        this.taskUpdate.emit('task_status_updated')
      }
    });
  }

  task_delete(taskId: string) {
    this._cs.openSnackBar("Processing...");
    this._taskService.taskDelete(taskId).subscribe({
      next: (a:any) => {
        this._cs.openSnackBar("Task is Deleted", "Success");
      },
      error: (err:any) => {
        let errorMssg = err?.error?.message;
        let keywordHasAuth = CommonConstants.matchKeywordUnAuth(errorMssg.toLowerCase());
        console.log("keywordHasAuth",errorMssg,keywordHasAuth)
        if(keywordHasAuth) {
          this.infoModalType = 'loginTimeOut';
          this.infoModal = {show: true, message: errorMssg};
        } else {this._cs.openSnackBar(errorMssg, "Error");}
      },
      complete: () => {
        this._taskService.bs.next('task_deleted');
        this.taskUpdate.emit('task_status_updated')
      }
    });
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
    this._cs.openSnackBar('Processing...');
    this._taskService.userTaskStatusChange(taskId, isOver).subscribe({
      next: (w:any) => {
        this._cs.openSnackBar(`Task Status Updated to ${isOver ? 'Over' : 'Resumed'}`, "Success");
      },
      error: (err:any) => {
        let errorMssg = err?.error?.message;
        let keywordHasAuth = CommonConstants.matchKeywordUnAuth(errorMssg.toLowerCase());
        console.log("keywordHasAuth",errorMssg,keywordHasAuth)

        if(keywordHasAuth) {
          this.infoModalType = 'loginTimeOut';
          this.infoModal = {show: true, message: errorMssg};
        } else {this._cs.openSnackBar(errorMssg, "Error");}

      },
      complete: () => {
        this._taskService.bs.next('task_status_updated');
        this.taskUpdate.emit('task_status_updated')
      }

   } );
  }
}
