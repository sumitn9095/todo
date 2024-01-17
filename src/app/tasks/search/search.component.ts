import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Renderer2,
  Output, Input
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { fromEvent, Observable } from 'rxjs';
import { map, takeUntil , catchError, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
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
  @Input() public searchKeyword:string='';
  @Output() public searchTerm = new EventEmitter<any>();
  constructor(private _fb: FormBuilder, private _r2 : Renderer2, private _taskService: TasksService) {}

  @ViewChild('icon_close', { static: false }) 'icon_close': ElementRef;
  @ViewChild('icon_refresh', { static: false }) 'icon_refresh': ElementRef;
  @ViewChild('searchInp', { static: false }) 'searchInp': ElementRef;
  @ViewChild('clearSearch', { static: false }) 'clearSearch': ElementRef;

  ngOnInit(): void {
    //this.filteredOptions = ['df'];
    this.searchFormGroup = this._fb.group({
      searchTerm: [''],
    });
    this.searchValue = this.searchKeyword;
  }

  ngAfterViewInit() {
    this._r2.setStyle(this.icon_refresh.nativeElement,'display','none');
    let searchEvent = fromEvent(this.searchInp.nativeElement, 'keyup');
    searchEvent.subscribe(as => {
      this._r2.setStyle(this.icon_refresh.nativeElement,'display','inline-block');
      this._r2.setStyle(this.icon_close.nativeElement,'display',' none');
      this.searchTerm.emit('loading');
    });
    
    searchEvent
      .pipe(
        map((x: any) => x.currentTarget.value),
        filter(w => w.length > 2 || w.length == 0),
        debounceTime(1400),
        distinctUntilChanged(),
        //takeUntil(clearEvent)
      )
      .subscribe((searchedTerm) => {
        this._r2.setStyle(this.icon_refresh.nativeElement,'display','none');
        this._r2.setStyle(this.icon_close.nativeElement,'display','inline-block');
        let st = searchedTerm.toLowerCase()
        this.searchTerm.emit(st);
      });
  }

  btnClearSearch() {
    this.searchValue = '';
    this.searchTerm.emit(null);
  }

}
