import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpen : boolean = false;

  constructor(private _r2 : Renderer2, private _router: Router) { }

  @ViewChild('menuDropdown') menuDropdown! : ElementRef;

  @Input() page : string = '';
  @Output() tasklist_create = new EventEmitter<any>();
  @Output() taskCountError = new EventEmitter<any>();
  @Output() signOutEvent = new EventEmitter<any>();
  @Output() openChartModalEvent = new EventEmitter<any>();

  ngOnInit(): void {

  }

  menuListAppear(){
    this.menuOpen = !this.menuOpen;
    // setTimeout(() => {
    //   if(this.menuOpen && this.menuDropdown !== undefined) this._r2.addClass(this.menuDropdown.nativeElement,"animate__fadeInUp");
    // }, 20);
  }

  navigateTo(route:string){
    this._router.navigate([`${route}`]);
  }

  taskListHandle(){
    this.tasklist_create.emit();
  }

  checkTaskCountError(data:any){
    this.taskCountError.emit(data);
  }

  signOut(){
    this.signOutEvent.emit();
  }

  openChartModal(){
    this.openChartModalEvent.emit();
  }

}
