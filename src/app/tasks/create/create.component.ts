import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { CommonService } from 'src/app/common.service';
import { Store } from '@ngxs/store';
import { SetTask } from 'src/app/shared/task.actions';
import { ITask } from 'src/app/utility/model/ITask';

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
  public task_add! : FormGroup;
  public value = '';
  public selectedPriority: string = '';
  public createdTask: ITask = {email:'',date: new Date(),priority:0, taskname:''};
  public priorityList: PriorityType[] = [
    { value: 0, viewValue: 'Sml' },
    { value: 1, viewValue: 'Med' },
    { value: 2, viewValue: 'High' },
  ];
  @Output() public tasklist_create = new EventEmitter();
  @Output() public taskCountError = new EventEmitter<any>();
  constructor(private _cs : CommonService, private _fb: FormBuilder, private _taskService: TasksService, private store: Store) {
    this.task_add = this._fb.group({
      taskname: ['', [Validators.required]],
      date: [''],
      priority: [''],
    });
  }
  

  ngOnInit(): void {}

  task_create() {
    var user = JSON.parse(sessionStorage.getItem('user') || {} as any);
    if (!this.task_add.valid) {
      return;
    }
    this.task_add.value.priority = Number(this.task_add.value.priority);
    let createdDate = new Date();
    this.task_add.value.date = createdDate;
    //console.log('this.task_add.value', this.task_add.value);
    var obj = this.task_add.value;
    obj.email = user.email;
    obj.imagePath = "";
    this._taskService.countDocuments(user.email).subscribe({
      next: (taskCount:any) => {
        //console.log("result count docs",taskCount)

        // this._taskService.userTaskAdd(obj).subscribe({
        //   next: (w:any) => {
        //     this._cs.openSnackBar("Task Created", "Success");
        //   },
        //   error: (err:any) => {
        //     this._cs.openSnackBar(err.error.message, "Error");
        //   },
        //   complete: () => {
        //     this.tasklist_create.emit('get_task_list');
        //     this.value = '';
        //     this.selectedPriority = '';
        //   }
        // });

        this.store.dispatch(new SetTask(obj)).subscribe({
            next: (w:any) => {
              this._cs.openSnackBar("Task Created", "Success");
              this.createdTask = w;
              console.log("newky created Task is", this.createdTask);
            },
            error: (err:any) => {
              this._cs.openSnackBar(err.error.message, "Error");
            },
            complete: () => {
              // this.tasklist_create.emit('get_task_list');
              // this.value = '';
              // this.selectedPriority = '';
            }
        });
      },
      error: (err:any) => {
        // console.log("countDocuments error",err);
        this.taskCountError.emit(err);
      },
      complete: () => {}
    }) 
  }
}
