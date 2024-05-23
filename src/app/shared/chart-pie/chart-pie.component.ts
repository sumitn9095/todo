import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TasksService } from 'src/app/tasks/tasks.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  public chart: any;
  public selectedChartGroupedUngrouped: number = 2;
  public selectedChartType: number = 2;
  // public tasks_today: any[]=[];
  // public tasks: any[]=[];
  // public tasks_over: any[]=[];

  public chart_data_labels: any[]=[];
  public chart_data_data: any[]=[];
  public chart_data_color: any[]=[];

  public taskGroups:any[]=[];

  constructor(private _taskService : TasksService) { }

  ngOnInit(): void {
    this._taskService.tasks_for_chartBs.subscribe({
      next: (taskGroups:any)=>{
        console.log("tasks_for_chartBs",taskGroups);
        this.taskGroups = taskGroups;
        setTimeout(() => {
          // init Chart 'Grouped/Un-grouped type' and 'type' 
          this.init_updateSetting_type(this.selectedChartType); 
          this.init_updateSetting_GroupedUngrouped(this.selectedChartGroupedUngrouped);         
        }, 1000);

      }
    })
  }


  updateSetting_GroupedUngrouped(data:any) {
    console.log("updateSetting_GroupedUngrouped",data);
    this.chart.clear();
    this.chart.destroy();
    setTimeout(() => {
      if(this.selectedChartType == 1) this.createPieChart();
      if(this.selectedChartType == 2) this.createBarChart();
      if(data.value == 1) this.updateSetting_takeAction_grouped();
      if(data.value == 2) this.updateSetting_takeAction_ungrouped();
    }, 900);
  }

  init_updateSetting_GroupedUngrouped(data:any) {
    if(data == 1) this.updateSetting_takeAction_grouped();
    if(data == 2) this.updateSetting_takeAction_ungrouped();
  }


  // updateSetting_takeAction_ungrouped(){
  //   this.taskGroups.map((taskGroup:any, i:number)=>{
  //     taskGroup.map((task:any, z:number)=>{
  //       if(i==0) this.chart_data_color.push('#7777c5');
  //       if(i==1) this.chart_data_color.push('#deb887');
  //       if(i==2) this.chart_data_color.push('white');
  //       this.chart_data_labels.push(task.taskname);
  //       this.chart_data_data.push(1);
  //     })
  //   });

  //   console.log("chart_data",this.chart_data_labels, this.chart_data_data, this.chart_data_color);
    
  //   this.chart.data.labels = this.chart_data_labels;
  //   this.chart.data.datasets[0].data = this.chart_data_data;
  //   this.chart.data.datasets[0].backgroundColor = this.chart_data_color;
  //   this.chart.update();
  // }

  updateSetting_takeAction_ungrouped(){
    this.chart_data_labels = [];
    this.chart.data.labels = [];
    this.chart.data.datasets = [];

    this.chart.clear();
    this.chart.reset();

    let nd:any[] = [];
    let bg:string[] = [];
    let dt:number[] = [];
    nd[0] = {
      backgroundColor : bg,
      label:  '',
      data: dt
    }
    
    this.taskGroups.map((taskGroup:any, i:number)=>{
        nd[0].label = 'Tasks';
        taskGroup.map((task:any, z:number)=>{
          if(i==0) nd[0].backgroundColor.push('#7777c5');
          if(i==1) nd[0].backgroundColor.push('#deb887');
          if(i==2) nd[0].backgroundColor.push('#c8c8c8');
          this.chart.data.labels.push(`Task: ${task.taskname}`);
          nd[0].data.push(1);
        })
    })

    console.log("this.chart_data_labels",nd);

    this.chart.data.datasets = nd;
    this.chart.update();
  }

  updateSetting_takeAction_grouped(){
    this.chart_data_labels = [];
    this.chart.data.labels = [];
    this.chart.data.datasets = [];

    this.chart.clear();
    this.chart.reset();

    let nd:any[] = [];
    this.taskGroups.map((taskGroup:any, i:number)=>{
      //this.chart.data.datasets = [];
      //  this.chart.data.datasets[i].backgroundColor = [];
      //  this.chart.data.datasets[i].data = [];
      
      let bg:string[] = [];
      let dt:number[] = [];

      nd[i] = {
        backgroundColor : bg,
        label:  '',
        data: dt
      }

      if(i==0) nd[i].label = 'Tasks Today';
      if(i==1) nd[i].label = 'Tasks';
      if(i==2) nd[i].label = 'Tasks Over';
    
      taskGroup.map((task:any, z:number)=>{
        if(i==0) nd[i].backgroundColor.push('#7777c5');
        if(i==1) nd[i].backgroundColor.push('#deb887');
        if(i==2) nd[i].backgroundColor.push('#c8c8c8');
        this.chart.data.labels.push(task.taskname);
        nd[i].data.push(1);
      })
    });

    console.log("this.chart_data_labels", nd);

    this.chart.data.datasets = nd;
   // this.chart.data.labels = this.chart_data_labels;
    this.chart.update();

    // console.log("chart_data",this.chart_data_labels, this.chart_data_data, this.chart_data_color);
    
    
    // this.chart.data.datasets[0].data = this.chart_data_data;
    // this.chart.data.datasets[0].backgroundColor = this.chart_data_color;
  }

  updateSetting_type(data:any){
    console.log("updateSetting_type",data);
    this.chart.clear();
    this.chart.destroy();
    setTimeout(() => {
        if(data.value == 1) this.createPieChart();
        if(data.value == 2) this.createBarChart();

        setTimeout(() => {
          if(this.selectedChartGroupedUngrouped == 1) this.updateSetting_takeAction_grouped();
          if(this.selectedChartGroupedUngrouped == 2) this.updateSetting_takeAction_ungrouped();
          this.chart.update();
        }, 300);

    }, 900);
  }

  init_updateSetting_type(data:any){
    if(data == 1) this.createPieChart();
    if(data == 2) this.createBarChart();
  }

  createPieChart(){
    this.chart = new Chart("pieChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
      }
    });
  }
  createBarChart(){
    this.chart = new Chart("barChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: [],
        datasets: []
      },
      options: {
        plugins: {
          legend: {
              display: false,
              labels: {
                  color: 'rgb(255, 99, 132)'
              }
          }
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            beginAtZero: true
          }
        }
      }
    });
  }

  chartToImg(){
    let chartImg = this.chart.toBase64Image('image/png', 1);
    console.log("chartImg", chartImg);
    let chartType = this.selectedChartType === 1 ? 'pie' : 'bar';
    let user = JSON.parse(sessionStorage.getItem("user") as any);
    saveAs(chartImg, `${user.username}-tasks-status-${chartType}-chart.png`);
  }
}
