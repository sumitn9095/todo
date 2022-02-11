import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test/test.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private _test: TestService) {}
  ngOnInit(): void {
    this._test.testmock().subscribe((d: any) => {
      console.log('test Mock', d.body);
    });
  }
}
