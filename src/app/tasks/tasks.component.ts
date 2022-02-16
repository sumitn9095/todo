import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
} from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { formatDate } from '@angular/common';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  tskOver: any[];
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks_limit = 14;
  public is_task_details_displayed: boolean = false;
  public tasks: any[] = [];
  public tasks_over: any[] = [];
  public tasks_loaded: any = '';
  public errorMsg: any;
  private snack_bar_expiry: number = 4400;
  public tasksChartOpened: boolean = false;
  public chartType: string = '';
  constructor(
    private _taskService: TasksService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild('userData') 'userData': ElementRef;

  openChartLine(dialogTempRef: any) {
    this.tasksChartOpened = true;
    this.chartType = 'line';
    const tasksOverDialog = this._dialog.open(dialogTempRef, {
      width: '550px',
    });
  }
  openChartBar(dialogTempRef: any) {
    this.tasksChartOpened = true;
    this.chartType = 'bar';
    const tasksOverDialog = this._dialog.open(dialogTempRef, {
      width: '550px',
    });
  }

  ngOnInit(): void {
    this.task_list();
    console.log('this.tasks', this.tasks);
    this._taskService.bs.subscribe((w) => {
      //this.task_list();
      console.log('task >>>>', w);

      if (
        w == `task_status_updated` ||
        w == `task_edited` ||
        w == `task_deleted`
      ) {
        this.task_list();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.snack_bar_expiry,
    });
  }

  catchError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('this is client side error');
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      console.log('this is server side error');
      this.errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    return throwError(this.errorMsg);
  }

  delete_last(taskIdToDelete: number) {
    this._taskService.taskDelete(taskIdToDelete).subscribe((task: any) => {
      console.log(`${task} is deleted`);
      this.task_list();
    });
  }

  task_edit(taskId: string, newTaskName: any) {
    this._taskService.taskEdit(taskId, newTaskName).subscribe((w) => {
      this.task_list();
    });
  }

  tasks_l(task_list_container: any) {
    this.tasks = [];
    this.tasks_over = [];
    task_list_container.filter((d: any) => {
      if (d.isOver == false) {
        this.tasks.push(d);
        // ------------------------------
        let date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        let date2 = formatDate(d.date, 'yyyy-MM-dd', 'en_US');
        if (date1 > date2) {
          console.log(d.taskname, ' is ---date1 is greater----');
        } else {
          console.log(d.taskname, ' is ---date1 is lesser-----');
        }
      } else {
        this.tasks_over.push(d);
      }
    });
    this.tasks.reverse();
    this.tasks_over.reverse();
  }

  task_list() {
    this._taskService.tasks().subscribe(
      (tasks: any) => {
        if (tasks.body) {
          this.tasks_l(tasks.body);
          console.log('tasks , tasks_over', this.tasks, this.tasks_over);
        }
      },
      (err: any) => {
        this.tasks_loaded = 'err';
        this.catchError(err);
      },
      () => {
        this.tasks_loaded = 'success';
      }
    );
    console.log('this.tasks 123 >', this.tasks);
  }

  // -- handle for NEW task (created) & most OLDEST task (deleted) --
  taskListHandle() {
    this.task_list();
    let bothTasks_length = this.tasks.length + this.tasks_over.length;
    if (
      (this.tasks.length || this.tasks_over.length) &&
      bothTasks_length > this.tasks_limit
    ) {
      this.delete_last(this.tasks[0]._id);
    }
  }

  // handle for edited task
  taskEditedHandle() {
    this.task_list();
  }

  // handle for edited task
  handleSearchTerm(task_list: any[]) {
    if (task_list.length) {
      if (!task_list[0]) {
        // If NO results found, with search term
        this.is_task_details_displayed = false;
        this.task_list();
      } else {
        // If results FOUND, with search term
        this.is_task_details_displayed = true;
        this.tasks_l(task_list);
        // console.log(
        //   'task_list, tasks , tasks_over',
        //   task_list,
        //   this.tasks,
        //   this.tasks_over
        // );
      }
    } else {
      // If search term CLEARED
      this.is_task_details_displayed = false;
      this.task_list();
      this.openSnackBar('Tasks not found', 'close');
    }
  }
}

// @Component({
//   selector: 'dialog-from-menu-dialog',
//   templateUrl: 'dialog-from-menu-example-dialog.html',
// })
// export class DialogFromMenuExampleDialog {
//   constructor(
//     public tasksOverDialog: MatDialogRef<DialogFromMenuExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {}
// }
