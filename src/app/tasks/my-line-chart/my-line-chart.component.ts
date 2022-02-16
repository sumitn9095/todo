import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  ChartOptions,
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartDataset,
  ChartData,
  Chart,
  Plugin,
  PluginOptionsByType,
  PluginChartOptions,
} from 'chart.js';
import { TasksService } from '../tasks.service';
import { BaseChartDirective } from 'ng2-charts';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Task } from '../task';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss'],
})
export class MyLineChartComponent implements OnInit {
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
  @Input() public opened: boolean = false;
  constructor(private _taskService: TasksService) {}

  ngOnInit(): void {
    if (this.opened) {
      this.task_list();
    }
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

          // -----
          this.lineChartData.datasets.map((w) => {
            w.data = [];
          });

          var lblCnt = 0;
          this.lineChartData?.labels?.map((r: any) => {
            lblCnt++;
          });

          for (let q = 0; q < lblCnt; q++) {
            this.lineChartData?.labels?.pop();
          }

          // this.lineChartData.datasets[0].data = this.task_both_priority[data_id];
          // this.lineChartData.datasets[0].label = dataset_label;

          this.task_both_names[data_id].map((r: any) => {
            this.lineChartData?.labels?.push(r);
          });

          if (data_id == 0) {
            this.lineChartData.datasets[0] = {
              data: this.task_both_priority[data_id],
              label: dataset_label,
              backgroundColor: 'rgb(88,147,223)',
              borderColor: 'rgb(88,147,223)',
              pointBackgroundColor: '#3abd4a',
              pointBorderColor: '#222222',
              pointHoverBackgroundColor: '#256d2e',
              pointHoverBorderColor: '#256d2e',
              fill: 'origin',
            };
          } else {
            this.lineChartData.datasets[0] = {
              data: this.task_both_priority[data_id],
              label: dataset_label,
              backgroundColor: 'rgba(214,111,111,0.5)',
              borderColor: 'rgba(214,111,111,0.9)',
              pointBackgroundColor: '#fcd3d3',
              pointBorderColor: '#942424',
              pointHoverBackgroundColor: '#942424',
              pointHoverBorderColor: '#000000',
              fill: 'origin',
            };
          }
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
          // console.log(
          //   'tasks , tasks_over',
          //   this.tasks,
          //   this.tasks_over,
          //   this.task_both_priority,
          //   this.task_name,
          //   this.task_over_name
          // );
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

  fetch_data() {
    this.task_list();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.task_priority,
        label: 'Tasks',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    responsive: true,

    // scales: {
    //   x: {},
    //   'y-axis-0': {
    //     display: true,
    //     position: 'left',
    //   },
    //   'y-axis-1': {
    //     position: 'right',
    //     grid: {
    //       color: 'rgba(255,0,0,0.3)',
    //     },
    //     ticks: {
    //       color: 'red',
    //     },
    //   },
    // },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          MyLineChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

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

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = MyLineChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );
    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
    }

    this.chart?.update();
  }
}
