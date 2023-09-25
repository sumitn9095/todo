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
  @Output() selectedTaskId = new EventEmitter<any>();
  constructor() {} // private _taskService: TasksService

  ngOnInit(): void {}

  fetchDetailsById(id:any) {
    if(id) this.selectedTaskId.emit(id);
    if(id) console.log("selectedTaskId",id);
  }
}
