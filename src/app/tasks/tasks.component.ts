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

import { formatDate } from '@angular/common';

export interface DialogData {
  tskOver: any[];
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: any[] = [];
  public tasks_over: any[] = [];
  constructor(private _taskService: TasksService, private _dialog: MatDialog) {}

  openTasksOverDialog() {
    const tasksOverDialog = this._dialog.open(DialogFromMenuExampleDialog, {
      width: '250px',
      data: { tskOver: this.tasks_over, name: 'sumit1' },
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

  task_list() {
    this._taskService.tasks().subscribe((tasks: any) => {
      if (tasks.body) {
        this.tasks = [];
        this.tasks_over = [];
        tasks.body.filter((d: any) => {
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
      }
    });
    console.log('this.tasks 123 >', this.tasks);
  }

  // -- handle for NEW task (created) & most OLDEST task (deleted) --
  taskListHandle() {
    this.task_list();
    let bothTasks_length = this.tasks.length + this.tasks_over.length;
    if ((this.tasks.length || this.tasks_over.length) && bothTasks_length > 5) {
      this.delete_last(this.tasks[0]._id);
    }
  }

  // handle for edited task
  taskEditedHandle() {
    this.task_list();
  }
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'dialog-from-menu-example-dialog.html',
})
export class DialogFromMenuExampleDialog {
  constructor(
    public tasksOverDialog: MatDialogRef<DialogFromMenuExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
