import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-over',
  templateUrl: './list-over.component.html',
  styleUrls: ['./list-over.component.scss'],
})
export class ListOverComponent implements OnInit {
  @Input() tasklist_over: any;

  constructor() {}

  ngOnInit(): void {}
}
