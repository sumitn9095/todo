import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TestService } from 'src/app/test/test.service';
import { environment } from 'src/environments/environment';
import {
  pipe,
  from,
  fromEvent,
  of,
  forkJoin,
  Observable,
  interval,
} from 'rxjs';
import {
  map,
  first,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements AfterViewInit {
  public users: any[] = [];
  public sinp: any;
  public arr: Array<any> = ['hey', 'jo', 'tim', 'boo'];
  constructor(private _test: TestService, private _ar: ActivatedRoute) {}

  @ViewChild('clickme') 'clickme': ElementRef;

  ngOnInit(): void {
    this._test.rs.subscribe((data) => {
      console.log(`This is me >>`, data);
    });

    this._test
      .testmock()
      .pipe(
        // map(a=> a )
        first()
      )
      .subscribe((d: any) => {
        // console.log('w', w);
        this.users = d.body;
        console.log('test Mock', this.users);
      });

    // ------------- of
    const of$ = of('rx', 'js', 'of');

    of$.subscribe((data) => {
      console.log('Rxjs Op > Of', data);
    });

    // -------------- from array
    const we = from(this.arr);
    we.subscribe((data) => {
      console.log(`Rxjs Op > From`, data);
    });

    // ------------- Fork Join
    const fj = forkJoin([of(3, 5, 7, 9), from(['ser', 'ser', 'wop', 'bnm'])]);

    fj.subscribe((data) => {
      console.log(`Rxjs Op > ForkJoin`, data);
    });

    this.sinp = document.getElementById('searchInp');

    //--------------- search after some time, after search input keyup
    const kp$ = fromEvent(this.sinp, 'keyup');

    kp$
      .pipe(
        map((r: any) => r.currentTarget.value),
        debounceTime(2500),
        distinctUntilChanged()
      )
      .subscribe((w) => console.log(w));

    // ------------------- switchmap -- (ActivatedRoute)
    this._ar.params
      .pipe(
        switchMap((params: any): any => {
          this._test.testDetails(+params['id']);
        })
      )
      .subscribe((data) => console.log(data));
  }

  ngAfterViewInit() {
    // ------------ SwitchMap -- simple
    var startTimer = fromEvent(this.clickme.nativeElement, 'click');
    var intvl = interval(2100);

    const switched = startTimer
      .pipe(
        switchMap((ev) => {
          return intvl;
        })
      )
      .subscribe((x) => console.log(x));

    // ---------------- switchmap --- API call
    this._test
      .getSingleUser(102)
      .pipe(switchMap((ev: any): any => of(this._test.testDetails(ev.id))))
      .subscribe((data) => console.log(data));

    // ----------------- switchmap -- from ---

    // let ss1 = from([1, 102]);

    // ss1
    //   .pipe(switchMap((x: any): any => this._test.testDetails(x)))
    //   .subscribe((data) => console.log(data));
  }

  getRsData() {
    this._test.rs.subscribe((data) => {
      console.log(`This is me again >> `, data);
    });
  }

  getFirstUser() {
    this._test
      .testmock()
      .pipe(first())
      .subscribe((data: any) => {
        console.log(`The FIRST user is `, data);
      });
  }
}
