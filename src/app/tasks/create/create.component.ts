import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

interface PriorityType {
  value: Number;
  viewValue: String;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public task_add: any;
  public value = '';
  public selectedPriority: string = '';
  public priorityList: PriorityType[] = [
    { value: 0, viewValue: 'Sml' },
    { value: 1, viewValue: 'Med' },
    { value: 2, viewValue: 'High' },
  ];
  @Output() public tasklist_create: any = new EventEmitter();
  constructor(private _fb: FormBuilder, private _taskService: TasksService) {
    this.task_add = this._fb.group({
      taskname: ['', [Validators.required]],
      date: [''],
      priority: [''],
    });
  }

  ngOnInit(): void {}

  task_create() {
    if (!this.task_add.valid) {
      return;
    }

    this.task_add.value.priority = Number(this.task_add.value.priority);
    let createdDate = new Date();
    this.task_add.value.date = createdDate;
    console.log('this.task_add.value', this.task_add.value);
    this._taskService.tasksAdd(this.task_add.value).subscribe(
      (next: any) => {
        console.log(next);
      },
      (error: Error) => {},
      () => {
        this.tasklist_create.emit('get_task_list');
      }
    );
  }
}
