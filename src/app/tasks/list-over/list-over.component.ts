import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-over',
  templateUrl: './list-over.component.html',
  styleUrls: ['./list-over.component.scss'],
})
export class ListOverComponent implements OnInit {
  @Input() tasklist_over: any;
  @Output() selectedTaskId = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}
  fetchDetailsById(id:any) {
    if(id) this.selectedTaskId.emit(id);
    if(id) console.log("selectedTaskId",id);
  }
}
