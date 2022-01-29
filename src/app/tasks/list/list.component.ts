import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() tasklist: any[] = [];
  // @Output() taskEdit = new EventEmitter();
  constructor() {} // private _taskService: TasksService

  ngOnInit(): void {}

  // task_edit(taskId: string, newTaskName: any) {
  //   this._taskService.taskEdit(taskId, newTaskName).subscribe(
  //     (next: any) => {
  //       console.log(next);
  //     },
  //     (error: Error) => {},
  //     () => {
  //       this.taskEdit.emit('task_edited');
  //     }
  //   );
  // }

  // task_status(taskId: string, isOver: boolean) {
  //   this._taskService.taskStatus(taskId, isOver).subscribe(
  //     (next: any) => {
  //       console.log(next);
  //     },
  //     (error: Error) => {
  //       console.error;
  //     },
  //     () => {
  //       this.taskEdit.emit('task_status_updated');
  //     }
  //   );
  // }
}
