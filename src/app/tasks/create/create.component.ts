import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public task_add: any;
  @Output() public tasklist_create: any = new EventEmitter();
  constructor(private _fb: FormBuilder, private _taskService: TasksService) {
    this.task_add = this._fb.group({
      taskname: ['', [Validators.required]],
      date: [''],
    });
  }

  ngOnInit(): void {}

  task_create() {
    if (!this.task_add.valid) {
      return;
    }
    this._taskService.tasksAdd(this.task_add.value).subscribe(
      (next: any) => {
        console.log(next);
      },
      (error: Error) => {},
      () => {
        //this._taskService.tasks().subscribe((f: any) => {
        this.tasklist_create.emit('get_task_list');
        //});
      }
    );
  }
}
