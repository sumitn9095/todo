import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoryInp:any;
  public categories:Array<any>=[];
  constructor(private _task : TasksService, private _cs : CommonService) { }
  // @ViewChild('categoryInp') 'categoryInp' : ElementRef;
  ngOnInit(): void {
    this.fetchAll()
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
        this._cs.openSnackBar(`Category Added : ${this.categoryInp}`, "Success");
      },
      error: (err:any)=>{
        var errMessage='';
        this._cs.openSnackBar(err.message ?? err, "Error");
        if(err.error.err.code == 11000) {
          errMessage = "Duplicate Category name";
          console.log(errMessage);
          this._cs.openSnackBar(errMessage ?? err.message ?? err, "Error");
        }
      }
    })
  }

  categoryRemove(id:any, name:string){
    this._task.category_remove(id).subscribe({
      next: (w:any)=>{
          console.log('removed',w);
          this.fetchAll();
          this._cs.openSnackBar(`Category Removed : ${name}`, "Success");
      },
      error: (err:Error)=>{
        this._cs.openSnackBar(err.message ?? err, "Error");
      }
    })
  }
}
