import {
  Component,
  OnInit, AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  EventEmitter,
} from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { catchError, filter, map, startWith, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject} from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import * as moment from 'moment';
import { CommonConstants } from '../utility/CommonConstants';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { saveAs } from 'file-saver';
export interface DialogData {
  taskDetails: any;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  public tasks_limit = 14;
  public is_task_details_displayed: boolean = false;
  public tasks: any[] = [];
  public tasks_over: any[] = [];
  public tasks_today: any[] = [];
  public tasks_loaded: any = '';
  public errorMsg: any;
  private snack_bar_expiry: number = 4400;
  public tasksChartOpened: boolean = false;
  public chartType: string = '';
  public user:any={};
  public token:string='';
  public categories:any;
  public fetchUserTasksPiped = new Observable<any>();
  public contentLoading:boolean=false;
  // -- filters
  public query:string='';
  public category:string='';
  public categoryCapitalized:string='';

  public task_download_progress:number = 0;
  
  public isCategoriesLoaded = new BehaviorSubject<boolean>(false);

  public taskPayload:{}={}

  constructor(
    private _taskService: TasksService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router : Router,
    private _ar : ActivatedRoute
  ) {
   
  }

  @ViewChild('userData') 'userData': ElementRef;

  openChartLine(dialogTempRef: any) {
    this.tasksChartOpened = true;
    this.chartType = 'line';
    const tasksOverDialog = this._dialog.open(dialogTempRef, {
      width: '550px',
    });
  }
  openChartBar(dialogTempRef: any) {
    this.tasksChartOpened = true;
    this.chartType = 'bar';
    const tasksOverDialog = this._dialog.open(dialogTempRef, {
      width: '550px',
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || {} as any);
    this.token = sessionStorage.getItem('token') as string;
    console.log('this.tasks', this.tasks);
    this.fetchCategories();
  }
  ngAfterViewInit() : void {
    this._ar.params.subscribe((params: Params) => {
    var slug = params['slug'];
       // console.log("----this.categories----",this.categories);
     if(slug){
        this.isCategoriesLoaded.subscribe(state => {
          if(state){
            let categoryExists = this.categories.data.some((r:any) => r.name.toLowerCase() === slug);
            //console.log("categoryExists",categoryExists);
            if(!categoryExists) {
              this.category = '';
              this._router.navigate(['./tasks']);
            }
            if(categoryExists) {
              this.category = slug;
              this.categoryCapitalized = CommonConstants.capitalize(this.category);
              this.getUserTasks();
            }
          }
        })
     } else {
      this.category = '';
     }
        this._ar.queryParams.subscribe((params: Params)=>{
          this.query = params['q'];
          this.getUserTasks();
        })
    });
  }
  fetchCategories(){
    this._taskService.fetchUserCategories().subscribe((o:any) => {
      this.categories = o;
      this.isCategoriesLoaded.next(true);
    });
    //console.log("--------this.categories",this.categories);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.snack_bar_expiry,
    });
  }

  catchError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('this is client side error');
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      console.log('this is server side error');
      this.errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    return throwError(this.errorMsg);
  }

  delete_last(taskIdToDelete: number) {
    this._taskService.taskDelete(taskIdToDelete).subscribe((task: any) => {
      console.log(`${task} is deleted`);
      this.getUserTasks();
    });
  }

  task_edit(taskId: string, newTaskName: any) {
    this._taskService.taskEdit(taskId, newTaskName).subscribe((w) => {
      this.getUserTasks();
    });
  }

  tasks_l(task_list_container: any) {
    this.tasks = [];
    this.tasks_over = [];
    this.tasks_today = [];
    console.log(task_list_container, 'task_list_container');
    task_list_container.map((d: any) => {
      if (d.isOver == false) {
        
        let isTaskToday = moment().isSame(d.dueDate, 'day');
        if(isTaskToday) {
          this.tasks_today.push(d);
         // console.log("Task-->>",d)
           console.log(d.taskname, 'is Today');
        } else {
          this.tasks.push(d);
          // ------------------------------
          let date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
          let date2 = formatDate(d.date, 'yyyy-MM-dd', 'en_US');
          // if (date1 > date2) {
          //   console.log(d.taskname, ' is ---date1 is greater----');
          // } else {
          //   console.log(d.taskname, ' is ---date1 is lesser-----');
          // }
        }
      } else {
        this.tasks_over.push(d);
      }
    });
    this.tasks.reverse();
    this.tasks_over.reverse();
    this.tasks_today.reverse();
  }

  querySearched(query?:any){
    if(query == 'loading'){
      this.contentLoading = true;
    } else {
      this.contentLoading = false;
      this._router.navigate([`./`],{  queryParams : {q : query}, queryParamsHandling : 'merge', relativeTo : this._ar});
    }
  }

  downloadTasks(){
    //let obj = { email: this.user?.email }
    this._taskService.downloadTasks(this.taskPayload).subscribe({
      next: (w:any) => {
        if (w.type === HttpEventType.Sent) {
          this.task_download_progress = 0;
        } else if (w.type === HttpEventType.DownloadProgress) {
          this.task_download_progress = Math.round(
            (100 * w.loaded) / w.total
          );
        } else if (w instanceof HttpResponse) {
          var file = new File([w.body], "MyTasks", {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          saveAs(file);
        }
        // var blob = new Blob([w], {
        //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // });
        
      },
      error: (err:any)=>{
        console.log("downloadTasks",err);
      }
    })
  }




  uploadFile() {
    let ff:any = document.getElementById('browse_btn');
    ff.click();
  }


  selectFiles(e:any): void {
    let selectedFiles = e.target.files[0];
    console.log("selectFiles----",selectedFiles);
    this._taskService.uploadTasks(selectedFiles).subscribe({
      next: (w:any) => {
        console.log("selectFiles",w)
      },
      error: (err:any)=>{
        console.log("downloadTasks",err);
      }
    })
  }

  getUserTasks(){
    var categoryCapitalized = CommonConstants.capitalize(this.category);
    this.taskPayload = { email: this.user?.email, query : this.query, category : categoryCapitalized };
    var fetchUserTasks = this._taskService.userTasks(this.taskPayload);
    this.fetchUserTasksPiped = fetchUserTasks;
    this.fetchUserTasksPiped.subscribe({
      next: (w:any)=>{
        //console.log("-------------w",w,this.query);
        // if(!this.category?.length) this.tasks_l(w.data);
        // if(this.category?.length) this.tasks_l(w);
        this.tasks_l(w.data);
      },
      error: (err:any)=>{
        this.tasks_loaded = 'err';
        this.catchError(err);
      },
      complete: ()=>{
        this.tasks_loaded = 'success';
      }
    })
  }

  // getUserTasks() {
  //   var obj={};
  //   ///else if(query == null) this.query = '';
  //   //if(query) obj = { email : this.user?.email, query : this.query };
  //   //if(!query) obj = { email : this.user?.email };
  //   console.log("------------------",this.category,this.query);
  //   //----------
  //   var categoryCapitalized = CommonConstants.capitalize(this.category);
  //   obj = { email: this.user?.email, query : this.query, category : categoryCapitalized };
  //   console.log("QUERY---------",this.query);
  //   var fetchUserTasks = this._taskService.userTasks(obj);
  //   if(this.category?.length){
  //     //var categoryCapitalized = CommonConstants.capitalize(this.category);

  //     // this.fetchUserTasksPiped = fetchUserTasks.pipe(
  //     //   map((q:any) => q.data.filter((g:any) => g.taskDetails.length > 0 && g.taskDetails[0].category.includes(categoryCapitalized)))
  //     // );

  //     this.fetchUserTasksPiped = fetchUserTasks;

  //   } else {
  //     this.fetchUserTasksPiped = fetchUserTasks;
  //   }

  //   this.fetchUserTasksPiped.subscribe({
  //     next: (w:any)=>{
  //       console.log("-------------w",w,this.query);
  //       if(!this.category?.length) w.data.map((f:any, i:number) => this.tasks_l(w.data));
  //       if(this.category?.length) this.tasks_l(w);
  //     },
  //     error: (err:any)=>{
  //       this.tasks_loaded = 'err';
  //       this.catchError(err);
  //     },
  //     complete: ()=>{
  //       this.tasks_loaded = 'success';
  //     }
  //   }
  //     // (tasks: any) => {
  //     //   if (tasks.body) {
  //     //     this.tasks_l(tasks.body);
  //     //     console.log('tasks , tasks_over', this.tasks, this.tasks_over);
  //     //   }
  //     // },
  //     // (err: any) => {
  //     //   this.tasks_loaded = 'err';
  //     //   this.catchError(err);
  //     // },
  //     // () => {
  //     //   this.tasks_loaded = 'success';
  //     // }
  //   );
  //   console.log('this.tasks 123 >', this.tasks);
  // }

  // -- handle for NEW task (created) & most OLDEST task (deleted) --
  taskListHandle() {
    this.getUserTasks();
    let bothTasks_length = this.tasks.length + this.tasks_over.length;
    if (
      (this.tasks.length || this.tasks_over.length) &&
      bothTasks_length > this.tasks_limit
    ) {
      this.delete_last(this.tasks[0]._id);
    }
  }

  // handle for edited task
  taskEditedHandle() {
    this.getUserTasks();
  }

  // handle for edited task
  // handleSearchTerm(task_list: any[]) {
  //   if (task_list.length) {
  //     if (!task_list[0]) {
  //       // If NO results found, with search term
  //       this.is_task_details_displayed = false;
  //       this.task_list();
  //     } else {
  //       // If results FOUND, with search term
  //       this.is_task_details_displayed = true;
  //       this.tasks_l(task_list);
  //       // console.log(
  //       //   'task_list, tasks , tasks_over',
  //       //   task_list,
  //       //   this.tasks,
  //       //   this.tasks_over
  //       // );
  //     }
  //   } else {
  //     // If search term CLEARED
  //     this.is_task_details_displayed = false;
  //     this.getUserTasks();
  //     this.openSnackBar('Tasks not found', 'close');
  //   }
  // }

  checkDetailsById(id:any){
    console.log('Task ID',id);
    this.openTaskDetails(id);
  }

  openTaskDetails(id:any) {
    //var taskDetailsModal:any;
    var taskDetails:any={};
    var dialogRef:any;
    var categories:any[]=[];
    this._taskService.fetchUserCategories().subscribe({
      next: (w:any)=>{
        w.data.map((nms:any)=>{
          categories.push(nms);
        });
        this._taskService.userTaskInfoAndDetail(id).subscribe({
          next: (q:any)=>{
            if(q.taskDetails && q.taskDetails.category.length) this._taskService.categorySelectedByDefault.next(q.taskDetails.category);
            q.data.categories = categories;
            dialogRef = this._dialog.open(TaskDetails, {
              data: {
                taskDetails : q.data
              },
              width: '550px',
            });
            dialogRef.afterClosed().subscribe((result:any) => {
              console.log("taskDetailsModal - result",result);
              if (result != undefined) {
                this._taskService.categorySelected.subscribe({
                  next: (q:any) => {
                      result.taskDetails.category = q;
                      this._taskService.taskPhotoBs.subscribe({
                        next: (file:any) => {
                          if(result.taskDetails !== null) this.saveTaskDetails(result.taskDetails, file);
                        }, error: (err:any) => {
                          
                        }, complete: ()=>{
                          this.getUserTasks();
                        }
                      })
                    
                  }, error: (err:any) => {
                    
                  }, complete: ()=>{
                   // this.getUserTasks();
                  }
                });
                result = null;
              }
            });
            dialogRef.afterOpened().subscribe((result:any) => {
              console.log("taskDetailsModal - afterOpened", q.data.category);
              this._taskService.categorySelectedByDefault.next(q.data.category);
            });
          },
          error: (err:any)=>{
            console.log("task-details", err);
          }
        });
      },
      error: (err:Error)=>{
        //---
      }
    })
  }

  saveTaskDetails(result:any, file:any){
    this._taskService.userTaskDetailsSave(result, file).subscribe({
      next: (w:any)=>{
        this.getUserTasks();
      },
      error: (err:Error)=>{

      },
      complete: ()=>{

      }
    })
  }
  viewCategory(selectedCat:any){
    console.log("category----",selectedCat.value);
    var sv = selectedCat.value;
    if(sv == null) {
      //this.category = null;
      this._router.navigate([`./tasks`], { queryParamsHandling : 'merge'});
    }
    else if(sv != '') {
     let category = sv.toLowerCase();
      this._router.navigate([`./tasks/${category}`], {queryParamsHandling : 'merge'});
    }
  }
  //--------------------------------------------------

  signOut(){
    this._router.navigate(["../auth/signout"]);
  }
}


// ------------------------------------------
@Component({
  selector: 'dialog-task-details',
  templateUrl: 'dialog-task-details.html',
})
export class TaskDetails {
  public taskDetailsForm! : FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];
  //allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = Inject(LiveAnnouncer);
  public taskPhoto:any;
  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(2));

  constructor(
    private _fb : FormBuilder,
    private _task : TasksService,
    public dialogRef: MatDialogRef<TaskDetails>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.taskDetailsForm = this._fb.group({
      taskPhoto: [''],
      taskname: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      dueDate: ['',[Validators.required]],
      priority: ['',[Validators.required]],
      isOver: ['',[Validators.required]],
    });

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

    this._task.categorySelectedByDefault.subscribe({
      next: (q:any) => {
        this.fruits = q;
        console.log('fruits', this.fruits)
      }, error: (err:any) => {

      }
    });
  }

  handleTaskPhoto(e :any) {
    console.log("file <<>>", e.target.files[0]);
    //this._task.taskPhotoBs.next(this.taskPhoto);
    this._task.taskPhotoBs.next( e.target.files[0]);

    var newFile = new File([e.target.files[0]], "taskPhoto", {type: ".png"});
    //this.taskPhoto = e.target.files.file.item(0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();

  //   this.fruitCtrl.setValue(null);
  // }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this._task.categorySelected.next(this.fruits);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
