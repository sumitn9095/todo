import { Directive, ElementRef, Input, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonConstants } from 'src/app/utility/CommonConstants';
import { ActivatedRoute, Params } from '@angular/router';
@Directive({
  selector: '[categoryRefForTask]'
})

export class CategoryRefForTaskDirective implements OnInit,AfterViewInit {
  @Input() 'categoryRefForTask':string;
  constructor(private el : ElementRef, private r2: Renderer2, private _ar:ActivatedRoute) { }
  ngOnInit(): void {
    if(this.categoryRefForTask !== ''){
    let borderClr = CommonConstants.genColorForCategory(this.categoryRefForTask);
    console.log("Categories-color",borderClr)
    this.r2.setStyle(this.el.nativeElement, 'background', `${borderClr}`);}
  }
  ngAfterViewInit() : void {
    if(this.categoryRefForTask === ''){
      this._ar.params.subscribe((params: Params) => {
        var slug = params['slug'];
        if(slug !== undefined) {
          // let catColor = CommonConstants.genColorForCategory(slug);
          // console.log("route---SLUG",catColor);
          this.r2.setStyle(this.el.nativeElement, 'background', `#b1b0ac`);
        }
      })
    }
  }
}