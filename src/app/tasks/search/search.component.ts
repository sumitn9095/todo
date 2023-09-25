import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  public searchFormGroup: any;
  public searchValue = '';
  public options: any[] = ['qqq', 'www', 'rrr'];
  public st: any;
  public filteredOptions: any[] = [];
  @Output() public searchTerm = new EventEmitter<string>();
  constructor(private _fb: FormBuilder, private _taskService: TasksService) {}

  // @ViewChild('searchTerm') 'searchTerm': ElementRef;

  ngOnInit(): void {
    //this.filteredOptions = ['df'];
    this.searchFormGroup = this._fb.group({
      searchTerm: [''],
    });
  }

  ngAfterViewInit() {
    this.st = document.getElementById(`searchTerm`);

    let searchEvent = fromEvent(this.st, 'keyup');

    searchEvent
      .pipe(
        map((x: any) => x.currentTarget.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchedTerm) => {
        let st = searchedTerm.toLowerCase()
        this.searchTerm.emit(st);
        // this._taskService.taskSearch(searchedTerm).subscribe((data: any) => {
        //   let fval = searchedTerm.toLowerCase();
        //   console.log('taskSearch-taskSearch', data, fval);
        //   this.filteredOptions = data.filter((x: any) =>
        //     x.taskname.toLowerCase().includes(fval)
        //   );
        //   this.searchTerm.emit(this.filteredOptions);
        // });

        // return this.options.filter((option) =>
        //   option.toLowerCase().includes(filterValue)
        // );
      });
  }

  clearSearch() {
    this.searchValue = '';
    this.searchTerm.emit('');
  }

  // optionSelected(task_id: number) {
  //   this.searchTerm.emit(task_id);
  //   console.log('optionSelected --', task_id);
  // }
}
