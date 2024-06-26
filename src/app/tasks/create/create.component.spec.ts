import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ITask } from 'src/app/utility/model/ITask';
import { TasksService } from '../tasks.service';
import { By } from '@angular/platform-browser';

fdescribe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let wqq = 1;

  let tasksContainer: ITask[]=[];
  let newlyCreatedTask:any = [];

  class createTaskService extends TasksService {
    ttt(){
      return 'dd';
    }

    addTask(task: ITask): void {
      tasksContainer.push(task);
    }
    removeTask() {
      tasksContainer.pop();
    }


    addTask1() {
      let task: ITask = {
        email: "saa@gmail.com",
        date: new Date(),
        priority: 1,
        taskname: 'this is a task 1',
        imagePath: 'images/wer.png',
      }
      newlyCreatedTask = task;
      this.addTask(task)
    }

    addTask2() {
      let task: ITask = {
        email: "Sumit@gmail.com",
        date: new Date(),
        priority: 0,
        taskname: 'Task 2',
        imagePath: 'images/ooo.png',
      }
      newlyCreatedTask = task;
      this.addTask(task)
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, NgxsModule.forRoot()],
      providers: [
        // TasksService,
        { provide: createTaskService, useClass: createTaskService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    wqq++;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create ttt is dd', () => {
    //expect(component).toBeTruthy();
    const taskService = fixture.debugElement.injector.get(createTaskService);
    fixture.detectChanges();
    expect(taskService.ttt()).toBe('dd')
  });

  it('should add Task1 & Task2, and their length to be 2', () => {
    const taskService = fixture.debugElement.injector.get(createTaskService);
    fixture.detectChanges();
    taskService.addTask1();
    taskService.addTask2();
    expect(tasksContainer.length).toBeGreaterThanOrEqual(2);
  })

  it('should remove any task from TasksContainer',()=>{
    const taskService = fixture.debugElement.injector.get(createTaskService);
    fixture.detectChanges();
    expect(tasksContainer.length).toEqual(2);
    taskService.removeTask();
    expect(tasksContainer.length).toEqual(1);
  })

  it('should create "NewlyCreatedTask" from service in the componets property of "createdTask" ',()=>{
    const taskService = fixture.debugElement.injector.get(createTaskService);
    fixture.detectChanges();
    taskService.addTask2();
    component.createdTask = newlyCreatedTask;
    expect(component.createdTask).toEqual(jasmine.any(Object));
  });

  it('should have text entered in the taskname input',() => {
    component.task_add.patchValue({
      taskname: 'fff',
      date: new Date(),
      priority: 1
    });
    expect(component.task_add.value.taskname).toBe('fff');
      // component.task_add.patchValue = {
      // taskname: 'fff',
      // date: new Date(),
      // priority: 1

    // }
  });


  it('should have some entered text in task name input', ()=> {
    component.value = "new Task 1012";
    fixture.detectChanges();
    const kkk = fixture.debugElement.query(By.css(`.taskNameClass`)).nativeElement.value;
    expect(kkk).toEqual('new Task 1012');
  })

  xit('should create 22', () => {
    wqq++;
    expect(wqq).toEqual(3);
  });

  xit("should create www", () => {
    expect(wqq).toEqual(5);
  })
});




// it('your test', inject([HttpTestingController, MembershipService],
//   (httpMock: HttpTestingController, configshipService: ConfigService ) => 
// { 
//   ...
// })
// )