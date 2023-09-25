import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HobbyService } from './hobby.service';
@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss']
})
export class HobbyComponent implements OnInit {
  public hobbyInp:any;
  public hobbies:Array<any>=[];
  constructor(private _hobby : HobbyService) { }
  // @ViewChild('hobbyInp') 'hobbyInp' : ElementRef;
  ngOnInit(): void {
  }
  fetchAll(){
    this._hobby.fetch_all().subscribe({
      next: (w:any)=>{
        console.log("Hobby",w);
        this.hobbies = w.data;
      },
      error: (err:Error)=>{

      }
    })
  }

  hobbyAdd() {
    let obj = {
      name: this.hobbyInp,
      priority: 2
    }
    this._hobby.hobby_add(obj).subscribe({
      next: (w:any) => {
        console.log("Hobby-Add",w);
        console.log(obj);
        this.fetchAll();
      },
      error: (err:Error)=>{
        console.log(obj);
      }
    })
  }

  hobbyRemove(id:any){
    this._hobby.hobby_remove(id).subscribe({
      next: (w:any)=>{
          console.log('removed',w)
      },
      error: (err:Error)=>{
        console.log('removed',err)
      }
    })
  }
}
