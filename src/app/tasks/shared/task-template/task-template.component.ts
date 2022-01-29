import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/tasks/tasks.service';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss'],
})
export class TaskTemplateComponent implements OnInit {
  @Input() tasklist: any[] = [];
  @Input() noedit: any;
  @Output() taskEdit = new EventEmitter();

  constructor(private _taskService: TasksService) {}

  ngOnInit(): void {}

  task_edit(taskId: string, newTaskName: any) {
    this._taskService.taskEdit(taskId, newTaskName).subscribe(
      (next: any) => {
        console.log(next);
      },
      (error: Error) => {},
      () => {
        this._taskService.bs.next('task_edited');
      }
    );
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

  task_status(taskId: string, isOver: boolean) {
    this._taskService.taskStatus(taskId, isOver).subscribe(
      (next: any) => {
        console.log(next);
      },
      (error: Error) => {
        console.error;
      },
      () => {
        this._taskService.bs.next('task_status_updated');
      }
    );
  }
}
