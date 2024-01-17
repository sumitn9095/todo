import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, Renderer2, ElementRef, QueryList } from '@angular/core';
import { combineLatest, first, fromEvent, interval, map, skipUntil,takeWhile, skipWhile, takeLast, takeUntil, timer, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})

export class SnakeComponent implements OnInit , AfterViewInit{
  public snake_body : any = [];
  public block_size:number = 80;
  public block_spacing: number = this.block_size * 0.2;
  public block_move: number = this.block_size + this.block_spacing;
  public leadPos: Array<any> = [{ left: 0, top: 0}];
  public leadDirection: string = '';
  public timer:number=15;
  public isSettingsPanelOpen:boolean=false;
  constructor(private _r2 : Renderer2) { }

@ViewChild('snake') 'snake' : ElementRef;
@ViewChild('settings_panel') 'settings_panel' : ElementRef;
@ViewChildren('blk') 'blk' : QueryList<ElementRef>;
// @ViewChild('blk2') 'blk2' : ElementRef;
  ngOnInit(): void {
    this.addSnakeBody();
    this.addSnakeBody();
    this.addSnakeBody();
    
    // this.addSnakeBody();
  }

  ngAfterViewInit(): void {
    this.initBlocks();
    let gg = timer(0,800);
    gg
    .pipe(
      map(w => 40 - w),
      takeWhile(r => r >= 0)
    )
    .subscribe(ff => {
      var nextPos:number=0
      console.log("tick",ff);
      // let w = `${(this.block_spacing + 100) * ff}px`;
      // let g = (this.block_spacing + 100) * ff;
      //console.log("this.blk",this.blk);
      // this.blk.map(rf => {
        // let bgh = rf.nativeElement;
        const bgh = this.blk.first.nativeElement;
        //console.log("------------",ff,this.leadDirection,this.leadPos);

        if(this.leadDirection == 'top' || this.leadDirection == 'down') {
          const cdv = this.leadPos[0].top;
          if(this.leadDirection == 'top') nextPos = cdv - this.block_move;
          if(this.leadDirection == 'down') nextPos = cdv + this.block_move;
          this._r2.setStyle(bgh, 'top', nextPos+'px');
          this.leadPos.unshift({ left: bgh.offsetLeft, top: nextPos });
        }
        else if(this.leadDirection == 'left' || this.leadDirection == 'right') {
          const cdv = this.leadPos[0].left;
          if(this.leadDirection == 'left') nextPos = cdv - this.block_move;
          if(this.leadDirection == 'right') nextPos = cdv + this.block_move;
          this._r2.setStyle(bgh, 'left', nextPos+'px');
         // console.log("nextPos",nextPos);
          this.leadPos.unshift({ left: nextPos, top: bgh.offsetTop });
        }

        this.followTrail();
       // console.log(this.leadPos)
      //});
    });

    let qqw = fromEvent(document, 'keyup');
      qqw
      .subscribe((key:any) => {
       // console.log(key);
        if(key.keyCode == 38) this.leadDirection = 'top';
        if(key.keyCode == 40) this.leadDirection = 'down';
        if(key.keyCode == 37) this.leadDirection = 'left';
        if(key.keyCode == 39) this.leadDirection = 'right';
      });


      // timer(0,1000).pipe(
      //   map((r:number) => 10 - r),
      //   takeWhile((t:number) => t >= 0),
      //   catchError(w => of(console.log(w)))
      // )
      // .subscribe(q => {
      //   console.log("timer",q);
      // })

    //------------
    // let w = `${(this.block_spacing + 400)}px`;
    // this._r2.setStyle(this.blk2.nativeElement, 'margin-left', w);
  }

  followTrail(){
    this.blk.map((r:ElementRef, i:number) => {
      let bgh = r.nativeElement;
      let ppp = this.leadPos[i];
      if(ppp != undefined) {
        const {left, top} = this.leadPos[i];
        this._r2.setStyle(bgh, 'left', left+'px');
        this._r2.setStyle(bgh, 'top', top+'px');
      }
    })
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }


  initBlocks(){
    this.blk.map((r:ElementRef, i:number) => {
      let bgh = r.nativeElement;
      this._r2.setStyle(bgh, 'width', this.block_size+'px')
      this._r2.setStyle(bgh, 'height', this.block_size+'px')
    })
  }

  settingsOpen(){
    if(!this.isSettingsPanelOpen) {this._r2.addClass(this.settings_panel.nativeElement, 'open'); this.isSettingsPanelOpen = true;}
    else {this._r2.removeClass(this.settings_panel.nativeElement, 'open'); this.isSettingsPanelOpen = false;}
  }
  // addBlock(){
  //   const bk = this._r2.createElement('div');
  //   const text = this._r2.createText('Inserted at bottom');
  //   console.log("bk",bk);
  //   this._r2.addClass(bk, 'block');
  //   this._r2.appendChild(bk,text);
  //   this._r2.appendChild(this.snake.nativeElement, bk);
  // }

  addSnakeBody(){
    this.snake_body.push('1');
  }
}
