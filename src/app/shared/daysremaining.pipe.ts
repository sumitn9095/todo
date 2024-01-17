import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'daysremaining'
})
export class DaysremainingPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    let f = moment(value).fromNow(true);
    //moment([2007, 0, 29]).fromNow(true);
    let w = moment(value).toNow(true);
    return w;
  }
}
