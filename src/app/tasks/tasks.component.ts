import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: any[] = [];
  public tasks_over: any[] = [];
  constructor(private _taskService: TasksService) {}

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
          } else {
            this.tasks_over.push(d);
          }
        });
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
