import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Task } from '../task';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksService } from '../tasks.service';

//import DataLabelsPlugin from 'chachartjs-';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  public tasks: any[] = [];
  public tasks_over: any[] = [];
  tasks_loaded: string = '';
  errorMsg: string = '';
  public task_name: string[] = [];
  public task_over_name: string[] = [];
  public task_both_names: any[] = [];
  public task_priority: number[] = [];
  public task_over_priority: number[] = [];
  public task_both_priority: any[] = [];
  constructor(private _taskService: TasksService) {}

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ngOnInit(): void {}

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

  tasks_l(task_list_container: any) {
    this.tasks = [];
    this.tasks_over = [];
    task_list_container.filter((d: any) => {
      if (d.isOver == false) {
        this.tasks.push(d);
      } else {
        this.tasks_over.push(d);
      }
    });
    this.tasks.reverse();
    this.tasks_over.reverse();
  }

  task_list() {
    this._taskService.tasks().subscribe(
      (tasks: any) => {
        if (tasks.body) {
          this.tasks_l(tasks.body);
          this.task_priority = this.tasks.map((w) => w.priority);
          this.task_over_priority = this.tasks_over.map((w) => w.priority);
          this.task_both_priority.push(this.task_priority);
          this.task_both_priority.push(this.task_over_priority);
          this.task_name = this.tasks.map((w) => w.taskname);
          this.task_over_name = this.tasks_over.map((w) => w.taskname);
          this.task_both_names.push(this.task_name);
          this.task_both_names.push(this.task_over_name);

          this.chart?.update();
        }
      },
      (err: any) => {
        this.tasks_loaded = 'err';
        this.catchError(err);
      },
      () => {
        this.tasks_loaded = 'success';
      }
    );
    console.log('this.tasks 123 >', this.tasks);
  }

  addDataToChart(data_id: number, dataset_label: string): void {
    this._taskService.tasks().subscribe(
      (tasks: any) => {
        if (tasks.body) {
          this.tasks_l(tasks.body);
          this.task_priority = this.tasks.map((w) => w.priority);
          this.task_over_priority = this.tasks_over.map((w) => w.priority);
          this.task_both_priority.push(this.task_priority);
          this.task_both_priority.push(this.task_over_priority);
          this.task_name = this.tasks.map((w) => w.taskname);
          this.task_over_name = this.tasks_over.map((w) => w.taskname);
          this.task_both_names.push(this.task_name);
          this.task_both_names.push(this.task_over_name);

          // ----
          this.barChartData.datasets.map((w) => {
            w.data = [];
          });

          var lblCnt = 0;
          this.barChartData?.labels?.map((r: any) => {
            lblCnt++;
          });

          for (let q = 0; q < lblCnt; q++) {
            this.barChartData?.labels?.pop();
          }

          this.task_both_names[data_id].map((r: any) => {
            this.barChartData?.labels?.push(r);
          });

          if (data_id == 0) {
            this.barChartData.datasets[0] = {
              data: this.task_both_priority[data_id],
              label: dataset_label,
              backgroundColor: 'rgb(88,147,223)',
              borderColor: 'rgb(88,147,223)',
            };
          } else {
            this.barChartData.datasets[0] = {
              data: this.task_both_priority[data_id],
              label: dataset_label,
              backgroundColor: 'rgb(214,111,111)',
              borderColor: 'rgb(214,111,111)',
            };
          }

          console.log(this.task_name, this.task_over_name);

          this.chart?.update();
        }
      },
      (err: any) => {
        this.tasks_loaded = 'err';
        this.catchError(err);
      },
      () => {
        this.tasks_loaded = 'success';
      }
    );
  }

  fetch_data() {
    this.task_list();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        //min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      // },
    },
  };
  public barChartType: ChartType = 'bar';
  //public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    //labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [{ data: this.task_priority, label: 'Tasks' }],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
