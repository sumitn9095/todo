import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoryInp:any;
  public categories:Array<any>=[];
  constructor(private _task : TasksService) { }
  // @ViewChild('categoryInp') 'categoryInp' : ElementRef;
  ngOnInit(): void {
  }
  fetchAll(){
    this._task.fetchUserCategories().subscribe({
      next: (w:any)=>{
        console.log("Category",w);
        this.categories = w.data;
      },
      error: (err:Error)=>{

      }
    })
  }

  categoryAdd() {
    let obj = {
      name: this.categoryInp,
      priority: 2
    }
    this._task.category_add(obj).subscribe({
      next: (w:any) => {
        console.log("Category-Add",w);
        console.log(obj);
        this.fetchAll();
      },
      error: (err:any)=>{
        var errMessage='';
        if(err.error.err.code == 11000) {
          errMessage = "Duplicate Category name";
          console.log(errMessage);
        }
      }
    })
  }

  categoryRemove(id:any){
    this._task.category_remove(id).subscribe({
      next: (w:any)=>{
          console.log('removed',w)
      },
      error: (err:Error)=>{
        console.log('removed',err)
      }
    })
  }
}
